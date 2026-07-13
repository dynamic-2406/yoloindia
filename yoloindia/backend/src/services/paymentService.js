// import crypto from 'node:crypto';
// import { config, hasSupabaseCredentials } from '../config.js';
// import { insertRow, selectRowsWhere, updateRows } from './supabase.js';

// const PAYMENT_TABLE = 'payments';

// const toNumber = (value) => {
//   const parsed = Number(value);
//   return Number.isFinite(parsed) ? parsed : 0;
// };

// const generateReference = (prefix) => `${prefix}_${crypto.randomBytes(6).toString('hex')}`.toUpperCase();

// const buildOrderReceipt = (bookingReference) => `booking_${bookingReference}`;

// const createMockSignature = (orderId, paymentId) =>
//   crypto.createHmac('sha256', config.razorpayKeySecret).update(`${orderId}|${paymentId}`).digest('hex');

// const isMockVerification = (signature, expectedSignature) =>
//   config.mockPaymentMode && signature === expectedSignature;

// const requireSupabaseForProduction = () => {
//   if (config.isProduction && !hasSupabaseCredentials()) {
//     throw new Error('Production mode requires Supabase credentials');
//   }
// };

// export const createBookingOrderRecord = async ({ pkg, customer, rate }) => {
//   const bookingReference = generateReference('BK');
//   const amountInInr = toNumber(pkg.priceInr);
//   const amountInUsd = amountInInr > 0 ? amountInInr / rate : toNumber(pkg.price);
//   const amountMinor = Math.max(1, Math.round(amountInUsd * 100));
//   const orderId = config.mockPaymentMode
//     ? `order_mock_${crypto.randomBytes(8).toString('hex')}`
//     : null;

//   if (!config.mockPaymentMode) {
//     const auth = Buffer.from(`${config.razorpayKeyId}:${config.razorpayKeySecret}`).toString('base64');
//     const response = await fetch(`${config.razorpayApiBaseUrl.replace(/\/$/, '')}/v1/orders`, {
//       method: 'POST',
//       headers: {
//         Authorization: `Basic ${auth}`,
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         amount: amountMinor,
//         currency: config.razorpayCurrency,
//         receipt: buildOrderReceipt(bookingReference),
//         notes: {
//           booking_reference: bookingReference,
//           package_id: pkg.id,
//           package_slug: pkg.slug,
//           customer_email: customer.email,
//         },
//       }),
//     });

//     const payload = await response.json().catch(() => ({}));
//     if (!response.ok) {
//       throw new Error(payload?.error?.description || payload?.error || 'Failed to create Razorpay order');
//     }

//     return {
//       bookingReference,
//       razorpayOrderId: payload.id,
//       amountMinor,
//       amountInUsd,
//       amountInInr,
//       orderPayload: payload,
//       testMode: false,
//     };
//   }

//   return {
//     bookingReference,
//     razorpayOrderId: orderId,
//     amountMinor,
//     amountInUsd,
//     amountInInr,
//     orderPayload: {
//       id: orderId,
//       amount: amountMinor,
//       currency: config.razorpayCurrency,
//     },
//     testMode: true,
//     mockPaymentId: `pay_mock_${crypto.randomBytes(8).toString('hex')}`,
//   };
// };

// export const savePendingBooking = async ({ bookingReference, pkg, customer, order }) => {
//   requireSupabaseForProduction();

//   const payload = {
//     booking_reference: bookingReference,
//     package_id: pkg.id,
//     package_slug: pkg.slug,
//     package_title: pkg.title,
//     customer_name: customer.name,
//     customer_email: customer.email,
//     customer_phone: customer.phone,
//     amount_inr: toNumber(pkg.priceInr).toFixed(2),
//     amount_usd: order.amountInUsd.toFixed(2),
//     currency: config.razorpayCurrency,
//     payment_status: 'created',
//     razorpay_order_id: order.razorpayOrderId,
//     razorpay_payment_id: null,
//     provider: config.mockPaymentMode ? 'mock' : 'razorpay',
//   };

//   const { data, error } = await insertRow(PAYMENT_TABLE, payload);
//   if (error) {
//     throw new Error(error.message || 'Failed to store booking');
//   }

//   return Array.isArray(data) ? data[0] : data;
// };

// export const verifyAndPersistBooking = async ({ bookingReference, orderId, paymentId, signature, paymentMethod = null, rawPayload = {}, mockSignature = null }) => {
//   requireSupabaseForProduction();

//   const expectedSignature = createMockSignature(orderId, paymentId);
//   const isMockVerified = isMockVerification(signature, mockSignature || expectedSignature);
//   const isVerified = isMockVerified || signature === expectedSignature;

//   if (!isVerified) {
//     throw new Error('Payment signature verification failed');
//   }

//   const { data: bookingRows, error: bookingLookupError } = await selectRowsWhere(PAYMENT_TABLE, {
//     booking_reference: `eq.${bookingReference}`,
//   });

//   if (bookingLookupError) {
//     throw new Error(bookingLookupError.message || 'Failed to load booking for verification');
//   }

//   const existing = Array.isArray(bookingRows) ? bookingRows[0] : bookingRows;
//   if (!existing) {
//     throw new Error('Booking record was not found for verification');
//   }

//   const patch = {
//     payment_status: 'paid',
//     razorpay_payment_id: paymentId,
//     updated_at: new Date().toISOString(),
//     provider: config.mockPaymentMode ? 'mock' : 'razorpay',
//   };

//   const { data, error } = await updateRows(
//     PAYMENT_TABLE,
//     `booking_reference=eq.${encodeURIComponent(bookingReference)}`,
//     patch,
//   );

//   if (error) {
//     throw new Error(error.message || 'Failed to update booking');
//   }

//   return Array.isArray(data) ? data[0] : data;
// };

// export const findBookingByOrderId = async (orderId) => {
//   const { data, error } = await selectRowsWhere(PAYMENT_TABLE, { razorpay_order_id: `eq.${orderId}` });
//   if (error) {
//     throw new Error(error.message || 'Failed to load booking by order id');
//   }

//   return Array.isArray(data) ? data[0] || null : data;
// };

// export const markBookingPaidByOrderId = async ({ orderId, paymentId, signature, paymentMethod = null, rawPayload = {}, provider = 'razorpay' }) => {
//   requireSupabaseForProduction();

//   const existing = await findBookingByOrderId(orderId);
//   if (!existing) {
//     throw new Error('Booking record was not found for webhook update');
//   }

//   const patch = {
//     payment_status: 'paid',
//     razorpay_payment_id: paymentId,
//     updated_at: new Date().toISOString(),
//     provider,
//   };

//   const { data, error } = await updateRows(
//     PAYMENT_TABLE,
//     `razorpay_order_id=eq.${encodeURIComponent(orderId)}`,
//     patch,
//   );

//   if (error) {
//     throw new Error(error.message || 'Failed to update booking via webhook');
//   }

//   return Array.isArray(data) ? data[0] : data;
// };


import crypto from 'node:crypto';
import { config, hasSupabaseCredentials } from '../config.js';
import { insertRow, selectRowsWhere, updateRows } from './supabase.js';
import { sendBookingConfirmationEmail } from './emailService.js';
const PAYMENT_TABLE = 'payments';

const toNumber = (value) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
};

const generateReference = (prefix) => `${prefix}_${crypto.randomBytes(6).toString('hex')}`.toUpperCase();

const buildOrderReceipt = (bookingReference) => `booking_${bookingReference}`;

const createMockSignature = (orderId, paymentId) =>
  crypto.createHmac('sha256', config.razorpayKeySecret).update(`${orderId}|${paymentId}`).digest('hex');

const isMockVerification = (signature, expectedSignature) =>
  config.mockPaymentMode && signature === expectedSignature;

const requireSupabaseForProduction = () => {
  if (config.isProduction && !hasSupabaseCredentials()) {
    throw new Error('Production mode requires Supabase credentials');
  }
};

export const createBookingOrderRecord = async ({ pkg, customer, rate }) => {
  const bookingReference = generateReference('BK');
  const amountInInr = toNumber(pkg.priceInr);
  const amountInUsd = amountInInr > 0 ? amountInInr / rate : toNumber(pkg.price);
  const amountMinor = Math.max(1, Math.round(amountInUsd * 100));
  const orderId = config.mockPaymentMode
    ? `order_mock_${crypto.randomBytes(8).toString('hex')}`
    : null;

  if (!config.mockPaymentMode) {
    const auth = Buffer.from(`${config.razorpayKeyId}:${config.razorpayKeySecret}`).toString('base64');
    const response = await fetch(`${config.razorpayApiBaseUrl.replace(/\/$/, '')}/v1/orders`, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${auth}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: amountMinor,
        currency: config.razorpayCurrency,
        receipt: buildOrderReceipt(bookingReference),
        notes: {
          booking_reference: bookingReference,
          package_id: pkg.id,
          package_slug: pkg.slug,
          customer_email: customer.email,
        },
      }),
    });

    const payload = await response.json().catch(() => ({}));
    if (!response.ok) {
      throw new Error(payload?.error?.description || payload?.error || 'Failed to create Razorpay order');
    }

    return {
      bookingReference,
      razorpayOrderId: payload.id,
      amountMinor,
      amountInUsd,
      amountInInr,
      orderPayload: payload,
      testMode: false,
    };
  }

  return {
    bookingReference,
    razorpayOrderId: orderId,
    amountMinor,
    amountInUsd,
    amountInInr,
    orderPayload: {
      id: orderId,
      amount: amountMinor,
      currency: config.razorpayCurrency,
    },
    testMode: true,
    mockPaymentId: `pay_mock_${crypto.randomBytes(8).toString('hex')}`,
  };
};

export const savePendingBooking = async ({ bookingReference, pkg, customer, order }) => {
  requireSupabaseForProduction();

  const payload = {
    booking_reference: bookingReference,
    package_id: pkg.id,
    package_slug: pkg.slug,
    package_title: pkg.title,
    customer_name: customer.name,
    customer_email: customer.email,
    customer_phone: customer.phone,
    amount_inr: toNumber(pkg.priceInr).toFixed(2),
    amount_usd: order.amountInUsd.toFixed(2),
    currency: config.razorpayCurrency,
    payment_status: 'created',
    razorpay_order_id: order.razorpayOrderId,
    razorpay_payment_id: null,
    provider: config.mockPaymentMode ? 'mock' : 'razorpay',
  };

  const { data, error } = await insertRow(PAYMENT_TABLE, payload);
  if (error) {
    throw new Error(error.message || 'Failed to store booking');
  }

  return Array.isArray(data) ? data[0] : data;
};

export const verifyAndPersistBooking = async ({ bookingReference, orderId, paymentId, signature, paymentMethod = null, rawPayload = {}, mockSignature = null }) => {
  requireSupabaseForProduction();

  const expectedSignature = createMockSignature(orderId, paymentId);
  const isMockVerified = isMockVerification(signature, mockSignature || expectedSignature);
  const isVerified = isMockVerified || signature === expectedSignature;

  if (!isVerified) {
    throw new Error('Payment signature verification failed');
  }

  const { data: bookingRows, error: bookingLookupError } = await selectRowsWhere(PAYMENT_TABLE, {
    booking_reference: `eq.${bookingReference}`,
  });

  if (bookingLookupError) {
    throw new Error(bookingLookupError.message || 'Failed to load booking for verification');
  }

  const existing = Array.isArray(bookingRows) ? bookingRows[0] : bookingRows;
  if (!existing) {
    throw new Error('Booking record was not found for verification');
  }

  const patch = {
    payment_status: 'paid',
    razorpay_payment_id: paymentId,
    updated_at: new Date().toISOString(),
    provider: config.mockPaymentMode ? 'mock' : 'razorpay',
  };

  const { data, error } = await updateRows(
    PAYMENT_TABLE,
    `booking_reference=eq.${encodeURIComponent(bookingReference)}`,
    patch,
  );

  if (error) {
    throw new Error(error.message || 'Failed to update booking');
  }

  const updatedBooking = Array.isArray(data) ? data[0] : data;

  if (existing.payment_status !== 'paid' && updatedBooking.payment_status === 'paid') {
    try {
      await sendBookingConfirmationEmail({
        name: updatedBooking.customer_name,
        email: updatedBooking.customer_email,
        phone: updatedBooking.customer_phone,
        packageName: updatedBooking.package_title,
        amount: `${updatedBooking.currency} ${updatedBooking.amount_usd}`,
        transactionId: updatedBooking.razorpay_payment_id,
        bookingId: updatedBooking.booking_reference,
      });
    } catch (err) {
      console.error('Failed to send confirmation email on verification:', err);
    }
  }

  return updatedBooking;
};

export const findBookingByOrderId = async (orderId) => {
  const { data, error } = await selectRowsWhere(PAYMENT_TABLE, { razorpay_order_id: `eq.${orderId}` });
  if (error) {
    throw new Error(error.message || 'Failed to load booking by order id');
  }

  return Array.isArray(data) ? data[0] || null : data;
};

export const markBookingPaidByOrderId = async ({ orderId, paymentId, signature, paymentMethod = null, rawPayload = {}, provider = 'razorpay' }) => {
  requireSupabaseForProduction();

  const existing = await findBookingByOrderId(orderId);
  if (!existing) {
    throw new Error('Booking record was not found for webhook update');
  }

  const patch = {
    payment_status: 'paid',
    razorpay_payment_id: paymentId,
    updated_at: new Date().toISOString(),
    provider,
  };

  const { data, error } = await updateRows(
    PAYMENT_TABLE,
    `razorpay_order_id=eq.${encodeURIComponent(orderId)}`,
    patch,
  );

  if (error) {
    throw new Error(error.message || 'Failed to update booking via webhook');
  }

  const updatedBooking = Array.isArray(data) ? data[0] : data;

  if (existing.payment_status !== 'paid' && updatedBooking.payment_status === 'paid') {
    try {
      await sendBookingConfirmationEmail({
        name: updatedBooking.customer_name,
        email: updatedBooking.customer_email,
        phone: updatedBooking.customer_phone,
        packageName: updatedBooking.package_title,
        amount: `${updatedBooking.currency} ${updatedBooking.amount_usd}`,
        transactionId: updatedBooking.razorpay_payment_id,
        bookingId: updatedBooking.booking_reference,
      });
    } catch (err) {
      console.error('Failed to send confirmation email on webhook:', err);
    }
  }

  return updatedBooking;
};