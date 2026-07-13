import crypto from 'node:crypto';
import { config } from '../config.js';
import {
  getDestinationById,
  getDestinations,
  getExchangeRatePayload,
  getFeaturedDestinations,
  getFeaturedPackages,
  getPackageById,
  getPackages,
  getPackagesByTourType,
  getTestimonials,
} from '../services/catalogService.js';
import {
  createBookingOrderRecord,
  markBookingPaidByOrderId,
  savePendingBooking,
  verifyAndPersistBooking,
} from '../services/paymentService.js';
import { AppError, json, readJsonBody, readRawBody } from '../utils/http.js';
import { validateBookingRequest } from '../validators/bookingValidator.js';
import { persistEnquiry } from '../services/paymentStore.js';

const rateWindowMs = 60 * 1000;
const rateLimits = new Map();

const isRateLimited = (req, key, limit = 30) => {
  const ip = req.socket?.remoteAddress || 'unknown';
  const bucketKey = `${ip}:${key}`;
  const now = Date.now();
  const bucket = rateLimits.get(bucketKey) || { count: 0, resetAt: now + rateWindowMs };

  if (now > bucket.resetAt) {
    bucket.count = 0;
    bucket.resetAt = now + rateWindowMs;
  }

  bucket.count += 1;
  rateLimits.set(bucketKey, bucket);

  return bucket.count > limit;
};

const parsePositiveNumber = (value, fieldName) => {
  if (value == null || value === '') {
    return null;
  }

  const parsed = Number(value);
  if (!Number.isFinite(parsed)) {
    throw new AppError(400, `${fieldName} must be a valid number`);
  }

  return parsed;
};

const getPackageResponse = async (idOrSlug) => {
  const pkg = await getPackageById(idOrSlug);
  if (!pkg) {
    throw new AppError(404, 'Package not found');
  }
  return pkg;
};

const getDestinationResponse = async (idOrSlug) => {
  const destination = await getDestinationById(idOrSlug);
  if (!destination) {
    throw new AppError(404, 'Destination not found');
  }
  return destination;
};

export const handleApiRoute = async ({ req, res, path, query }) => {
  if (req.method === 'GET' && path === '/api/health') {
    json(res, 200, {
      success: true,
      message: 'API is healthy',
      mockPaymentMode: config.mockPaymentMode,
    });
    return true;
  }

  if (req.method === 'GET' && path === '/api/exchange-rate') {
    json(res, 200, { success: true, ...(await getExchangeRatePayload()) });
    return true;
  }

  if (req.method === 'GET' && path === '/api/packages/featured') {
    json(res, 200, { success: true, data: await getFeaturedPackages() });
    return true;
  }

  if (req.method === 'GET' && path.startsWith('/api/packages/tour-type/')) {
    const tourType = decodeURIComponent(path.replace('/api/packages/tour-type/', ''));
    json(res, 200, { success: true, data: await getPackagesByTourType(tourType) });
    return true;
  }

  if (req.method === 'GET' && path.startsWith('/api/packages/')) {
    const idOrSlug = decodeURIComponent(path.replace('/api/packages/', ''));
    if (idOrSlug) {
      json(res, 200, { success: true, data: await getPackageResponse(idOrSlug) });
      return true;
    }
  }

  if (req.method === 'GET' && path === '/api/packages') {
    const filters = {
      category: query.category,
      minPrice: parsePositiveNumber(query.minPrice, 'minPrice'),
      maxPrice: parsePositiveNumber(query.maxPrice, 'maxPrice'),
      duration: parsePositiveNumber(query.duration, 'duration'),
      sort: query.sort,
      tourType: query.tourType,
    };

    json(res, 200, { success: true, data: await getPackages(filters) });
    return true;
  }

  if (req.method === 'GET' && path === '/api/destinations/featured') {
    json(res, 200, { success: true, data: await getFeaturedDestinations() });
    return true;
  }

  if (req.method === 'GET' && path.startsWith('/api/destinations/')) {
    const idOrSlug = decodeURIComponent(path.replace('/api/destinations/', ''));
    if (idOrSlug) {
      json(res, 200, { success: true, data: await getDestinationResponse(idOrSlug) });
      return true;
    }
  }

  if (req.method === 'GET' && path === '/api/destinations') {
    json(res, 200, { success: true, data: await getDestinations(query.type || null) });
    return true;
  }

  if (req.method === 'GET' && path === '/api/testimonials') {
    json(res, 200, { success: true, data: await getTestimonials() });
    return true;
  }

  if (req.method === 'POST' && path === '/api/contact') {
    if (isRateLimited(req, 'contact', 10)) {
      throw new AppError(429, 'Too many contact requests. Please try again later.');
    }

    const body = await readJsonBody(req);
    const payload = {
      name: String(body.name || '').trim(),
      email: String(body.email || '').trim(),
      phone: String(body.phone || '').trim(),
      destination_interest: String(body.destination || body.destination_interest || '').trim(),
      country: String(body.country || '').trim(),
      noOfPersons: String(body.noOfPersons || body.no_of_persons || '').trim(),
      travelDates: String(body.travelDates || body.startDate || '').trim() || null,
      duration: String(body.duration || '').trim(),
      message: String(body.message || '').trim(),
      source: String(body.source || 'website').trim(),
    };

    if (!payload.name || !payload.email || !payload.phone) {
      throw new AppError(400, 'Name, email, and phone are required');
    }

    await persistEnquiry(payload);

    try {
      const { sendInquiryEmail } = await import('../services/emailService.js');
      await sendInquiryEmail({
        name: payload.name,
        email: payload.email,
        phone: payload.phone,
        destination: payload.destination_interest,
        country: payload.country,
        startDate: payload.travelDates,
        noOfPersons: payload.noOfPersons,
        duration: payload.duration,
        message: payload.message,
        source: payload.source,
      });
    } catch (emailError) {
      console.error('Email send failed:', emailError);
    }

    json(res, 201, {
      success: true,
      message: 'Your inquiry has been received successfully!',
    });
    return true;
  }

  if (req.method === 'POST' && path === '/api/bookings/orders') {
    if (isRateLimited(req, 'booking-orders', 15)) {
      throw new AppError(429, 'Too many booking attempts. Please try again later.');
    }

    const body = await readJsonBody(req);
    const { customer, packageId } = validateBookingRequest(body);
    const pkg = await getPackageResponse(packageId);
    const ratePayload = await getExchangeRatePayload();

    const order = await createBookingOrderRecord({
      pkg,
      customer,
      rate: ratePayload.rate,
    });

    await savePendingBooking({
      bookingReference: order.bookingReference,
      pkg,
      customer,
      order,
    });

    const mockPaymentId = order.mockPaymentId || `pay_mock_${crypto.randomBytes(8).toString('hex')}`;
    const mockSignature = crypto
      .createHmac('sha256', config.razorpayKeySecret)
      .update(`${order.razorpayOrderId}|${mockPaymentId}`)
      .digest('hex');

    json(res, 201, {
      success: true,
      data: {
        bookingReference: order.bookingReference,
        orderId: order.razorpayOrderId,
        amount: order.amountMinor,
        currency: 'USD',
        keyId: config.razorpayKeyId,
        testMode: order.testMode,
        mockPaymentId: order.testMode ? mockPaymentId : undefined,
        mockSignature: order.testMode ? mockSignature : undefined,
        package: pkg,
        customer,
      },
    });
    return true;
  }

  if (req.method === 'POST' && path === '/api/webhooks/razorpay') {
    const rawBody = await readRawBody(req);
    const webhookSignature = req.headers['x-razorpay-signature'];
    if (!config.razorpayWebhookSecret) {
      throw new AppError(503, 'Webhook secret is not configured');
    }

    const expectedSignature = crypto
      .createHmac('sha256', config.razorpayWebhookSecret)
      .update(rawBody)
      .digest('hex');

    if (!webhookSignature || webhookSignature !== expectedSignature) {
      throw new AppError(401, 'Invalid webhook signature');
    }

    const event = rawBody ? JSON.parse(rawBody) : {};
    const eventType = event?.event;
    const payment = event?.payload?.payment?.entity;
    const order = event?.payload?.order?.entity;

    if (eventType === 'payment.captured' && payment?.order_id) {
      await markBookingPaidByOrderId({
        orderId: payment.order_id,
        paymentId: payment.id,
        signature: webhookSignature,
        paymentMethod: payment.method || null,
        rawPayload: event,
        provider: 'razorpay',
      });
    } else if (eventType === 'order.paid' && order?.id) {
      await markBookingPaidByOrderId({
        orderId: order.id,
        paymentId: payment?.id || order.id,
        signature: webhookSignature,
        paymentMethod: payment?.method || null,
        rawPayload: event,
        provider: 'razorpay',
      });
    }

    json(res, 200, { success: true });
    return true;
  }

  if (req.method === 'POST' && path === '/api/bookings/verify') {
    const body = await readJsonBody(req);
    const bookingReference = String(body.bookingReference || body.booking_reference || '').trim();
    const orderId = String(body.orderId || body.order_id || '').trim();
    const paymentId = String(body.paymentId || body.payment_id || '').trim();
    const signature = String(body.signature || '').trim();
    const mockSignature = String(body.mockSignature || '').trim() || null;

    if (!bookingReference || !orderId || !paymentId || !signature) {
      throw new AppError(400, 'bookingReference, orderId, paymentId, and signature are required');
    }

    const booking = await verifyAndPersistBooking({
      bookingReference,
      orderId,
      paymentId,
      signature,
      mockSignature,
      paymentMethod: body.paymentMethod || body.payment_method || null,
      rawPayload: body,
    });

    json(res, 200, {
      success: true,
      message: 'Payment verified successfully',
      data: booking,
    });
    return true;
  }

  return false;
};
