// import { Resend } from 'resend';
// import { AppError } from '../utils/http.js';

// const resendApiKey = process.env.RESEND_API_KEY;
// const resend = new Resend(resendApiKey);

// const getFromAddress = () => {
//   const from = String(process.env.EMAIL_FROM || '').trim();
//   if (!from) {
//     throw new AppError(500, 'Email sender address is not configured (EMAIL_FROM)');
//   }
//   return from;
// };

// const getOwnerEmail = () => {
//   return String(process.env.OWNER_EMAIL || '').trim();
// };

// export const sendInquiryEmail = async ({
//   name,
//   email,
//   phone,
//   destination,
//   country,
//   startDate,
//   noOfPersons,
//   duration,
//   message,
//   source,
// }) => {
//   if (!resendApiKey) {
//     throw new AppError(500, 'Email provider API key is not configured (RESEND_API_KEY)');
//   }

//   if (!email) {
//     throw new AppError(400, 'Recipient email is required');
//   }

//   const from = getFromAddress();
//   const ownerEmail = getOwnerEmail();
//   const bcc = ownerEmail && ownerEmail.toLowerCase() !== email.toLowerCase() ? ownerEmail : undefined;

//   const htmlMessage = `
//     <div style="font-family:Arial,Helvetica,sans-serif;color:#111;line-height:1.6;">
//       <h1 style="font-size:24px;margin-bottom:12px;">Thank you for contacting YOLO India Tours</h1>
//       <p style="margin:0 0 16px;">Hi ${name || 'Traveler'},</p>
//       <p style="margin:0 0 16px;">We have received your inquiry and will get back to you shortly.</p>
//       <p style="margin:0 0 16px;"><strong>Inquiry details</strong></p>
//       <table style="width:100%;border-collapse:collapse;margin-bottom:18px;">
//         <tbody>
//           <tr><td style="padding:8px;border:1px solid #ddd;font-weight:600;">Name</td><td style="padding:8px;border:1px solid #ddd;">${name || 'Not provided'}</td></tr>
//           <tr><td style="padding:8px;border:1px solid #ddd;font-weight:600;">Email</td><td style="padding:8px;border:1px solid #ddd;">${email || 'Not provided'}</td></tr>
//           <tr><td style="padding:8px;border:1px solid #ddd;font-weight:600;">Phone</td><td style="padding:8px;border:1px solid #ddd;">${phone || 'Not provided'}</td></tr>
//           <tr><td style="padding:8px;border:1px solid #ddd;font-weight:600;">Destination</td><td style="padding:8px;border:1px solid #ddd;">${destination || 'Not provided'}</td></tr>
//           <tr><td style="padding:8px;border:1px solid #ddd;font-weight:600;">Country</td><td style="padding:8px;border:1px solid #ddd;">${country || 'Not provided'}</td></tr>
//           <tr><td style="padding:8px;border:1px solid #ddd;font-weight:600;">Travel dates</td><td style="padding:8px;border:1px solid #ddd;">${startDate || 'Not provided'}</td></tr>
//           <tr><td style="padding:8px;border:1px solid #ddd;font-weight:600;">Number of persons</td><td style="padding:8px;border:1px solid #ddd;">${noOfPersons || 'Not provided'}</td></tr>
//           <tr><td style="padding:8px;border:1px solid #ddd;font-weight:600;">Duration</td><td style="padding:8px;border:1px solid #ddd;">${duration || 'Not provided'}</td></tr>
//           <tr><td style="padding:8px;border:1px solid #ddd;font-weight:600;">Source</td><td style="padding:8px;border:1px solid #ddd;">${source || 'Website'}</td></tr>
//         </tbody>
//       </table>
//       ${message ? `<p style="margin:0 0 16px;"><strong>Message:</strong><br/>${message}</p>` : ''}
//       <p style="margin:0;">If you need to reach us sooner, reply to this email or visit our website.</p>
//       <p style="margin:16px 0 0;">Warm regards,<br/>YOLO India Tours</p>
//     </div>
//   `;

//   return resend.emails.send({
//     from,
//     to: email,
//     bcc,
//     subject: 'Thanks for contacting YOLO India Tours',
//     html: htmlMessage,
//   });
// };


import { Resend } from 'resend';
import { AppError } from '../utils/http.js';

const resendApiKey = process.env.RESEND_API_KEY;
const resend = new Resend(resendApiKey);

const getFromAddress = () => {
  const from = String(process.env.EMAIL_FROM || '').trim();
  if (!from) {
    throw new AppError(500, 'Email sender address is not configured (EMAIL_FROM)');
  }
  return from;
};

const getOwnerEmail = () => {
  return String(process.env.OWNER_EMAIL || '').trim();
};

export const sendInquiryEmail = async ({
  name,
  email,
  phone,
  destination,
  country,
  startDate,
  noOfPersons,
  duration,
  message,
  source,
}) => {
  if (!resendApiKey) {
    throw new AppError(500, 'Email provider API key is not configured (RESEND_API_KEY)');
  }

  if (!email) {
    throw new AppError(400, 'Recipient email is required');
  }

  const from = getFromAddress();
  const ownerEmail = getOwnerEmail();
  const bcc = ownerEmail && ownerEmail.toLowerCase() !== email.toLowerCase() ? ownerEmail : undefined;

  const htmlMessage = `
    <div style="font-family:Arial,Helvetica,sans-serif;color:#111;line-height:1.6;">
      <h1 style="font-size:24px;margin-bottom:12px;">Thank you for contacting YOLO India Tours</h1>
      <p style="margin:0 0 16px;">Hi ${name || 'Traveler'},</p>
      <p style="margin:0 0 16px;">We have received your inquiry and will get back to you shortly.</p>
      <p style="margin:0 0 16px;"><strong>Inquiry details</strong></p>
      <table style="width:100%;border-collapse:collapse;margin-bottom:18px;">
        <tbody>
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:600;">Name</td><td style="padding:8px;border:1px solid #ddd;">${name || 'Not provided'}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:600;">Email</td><td style="padding:8px;border:1px solid #ddd;">${email || 'Not provided'}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:600;">Phone</td><td style="padding:8px;border:1px solid #ddd;">${phone || 'Not provided'}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:600;">Destination</td><td style="padding:8px;border:1px solid #ddd;">${destination || 'Not provided'}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:600;">Country</td><td style="padding:8px;border:1px solid #ddd;">${country || 'Not provided'}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:600;">Travel dates</td><td style="padding:8px;border:1px solid #ddd;">${startDate || 'Not provided'}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:600;">Number of persons</td><td style="padding:8px;border:1px solid #ddd;">${noOfPersons || 'Not provided'}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:600;">Duration</td><td style="padding:8px;border:1px solid #ddd;">${duration || 'Not provided'}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:600;">Source</td><td style="padding:8px;border:1px solid #ddd;">${source || 'Website'}</td></tr>
        </tbody>
      </table>
      ${message ? `<p style="margin:0 0 16px;"><strong>Message:</strong><br/>${message}</p>` : ''}
      <p style="margin:0;">If you need to reach us sooner, reply to this email or visit our website.</p>
      <p style="margin:16px 0 0;">Warm regards,<br/>YOLO India Tours</p>
    </div>
  `;

  return resend.emails.send({
    from,
    to: email,
    bcc,
    subject: 'Thanks for contacting YOLO India Tours',
    html: htmlMessage,
  });
};

export const sendBookingConfirmationEmail = async ({
  name,
  email,
  phone,
  packageName,
  amount,
  transactionId,
  bookingId,
}) => {
  if (!resendApiKey) {
    console.warn('RESEND_API_KEY is not configured. Skipping confirmation email.');
    return null;
  }

  if (!email) {
    throw new AppError(400, 'Recipient email is required for booking confirmation');
  }

  const from = getFromAddress();
  const ownerEmail = getOwnerEmail();
  const bcc = ownerEmail && ownerEmail.toLowerCase() !== email.toLowerCase() ? ownerEmail : undefined;
  
  const currentDate = new Date().toLocaleString('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short',
  });

  const htmlMessage = `
    <div style="font-family:'Inter',Arial,sans-serif;color:#333;line-height:1.6;background-color:#f9f9f9;padding:20px;">
      <div style="max-width:600px;margin:0 auto;background-color:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 6px rgba(0,0,0,0.05);">
        
        <!-- Header -->
        <div style="background-color:#f59e0b;padding:30px 20px;text-align:center;">
          <h1 style="color:#ffffff;font-size:28px;margin:0;font-weight:bold;letter-spacing:1px;">BOOKING CONFIRMED</h1>
          <p style="color:#fffbeb;margin:5px 0 0;font-size:16px;">Get ready for an amazing journey!</p>
        </div>

        <!-- Body -->
        <div style="padding:30px;">
          <h2 style="font-size:22px;margin:0 0 15px;color:#111;">Hello ${name},</h2>
          <p style="margin:0 0 25px;font-size:16px;color:#444;">
            Thank you for choosing YOLO India Tours. We are thrilled to confirm your booking for the <strong>${packageName}</strong> tour. 
            Your payment has been successfully verified, and your booking is now secure.
          </p>

          <!-- Ticket Details -->
          <div style="border:1px solid #e5e7eb;border-radius:8px;padding:20px;background-color:#fdfdfd;margin-bottom:25px;">
            <h3 style="margin:0 0 15px;font-size:14px;text-transform:uppercase;color:#f59e0b;letter-spacing:1px;border-bottom:1px solid #eee;padding-bottom:10px;">Booking Details</h3>
            
            <table style="width:100%;border-collapse:collapse;font-size:15px;">
              <tbody>
                <tr>
                  <td style="padding:8px 0;color:#666;width:40%;">Booking ID</td>
                  <td style="padding:8px 0;font-weight:600;color:#111;text-align:right;">${bookingId}</td>
                </tr>
                <tr>
                  <td style="padding:8px 0;color:#666;">Date & Time</td>
                  <td style="padding:8px 0;font-weight:600;color:#111;text-align:right;">${currentDate}</td>
                </tr>
                <tr>
                  <td style="padding:8px 0;color:#666;">Package</td>
                  <td style="padding:8px 0;font-weight:600;color:#111;text-align:right;">${packageName}</td>
                </tr>
                <tr>
                  <td style="padding:8px 0;color:#666;">Total Amount</td>
                  <td style="padding:8px 0;font-weight:600;color:#111;text-align:right;">${amount}</td>
                </tr>
                <tr>
                  <td style="padding:8px 0;color:#666;border-bottom:1px solid #eee;">Transaction ID</td>
                  <td style="padding:8px 0;font-weight:600;color:#111;text-align:right;border-bottom:1px solid #eee;">${transactionId}</td>
                </tr>
              </tbody>
            </table>

            <h3 style="margin:20px 0 15px;font-size:14px;text-transform:uppercase;color:#f59e0b;letter-spacing:1px;border-bottom:1px solid #eee;padding-bottom:10px;">Customer Info</h3>
            
            <table style="width:100%;border-collapse:collapse;font-size:15px;">
              <tbody>
                <tr>
                  <td style="padding:8px 0;color:#666;width:40%;">Name</td>
                  <td style="padding:8px 0;font-weight:600;color:#111;text-align:right;">${name}</td>
                </tr>
                <tr>
                  <td style="padding:8px 0;color:#666;">Email</td>
                  <td style="padding:8px 0;font-weight:600;color:#111;text-align:right;">${email}</td>
                </tr>
                <tr>
                  <td style="padding:8px 0;color:#666;">Phone</td>
                  <td style="padding:8px 0;font-weight:600;color:#111;text-align:right;">${phone}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p style="margin:0 0 15px;font-size:15px;">
            We will contact you shortly with further details about your itinerary and travel arrangements.
          </p>
        </div>

        <!-- Footer -->
        <div style="background-color:#1f2937;padding:25px;text-align:center;color:#9ca3af;">
          <p style="margin:0 0 10px;font-size:14px;color:#d1d5db;">Need assistance? We're here to help.</p>
          <p style="margin:0 0 15px;font-size:16px;font-weight:bold;color:#f59e0b;">
            <a href="tel:+919560235517" style="color:#f59e0b;text-decoration:none;">📞 +91 9560235517</a>
          </p>
          <p style="margin:0;font-size:12px;">© ${new Date().getFullYear()} YOLO India Tours. All rights reserved.</p>
        </div>
        
      </div>
    </div>
  `;

  try {
    return await resend.emails.send({
      from,
      to: email,
      bcc,
      subject: `Booking Confirmed: ${packageName} - ${bookingId}`,
      html: htmlMessage,
    });
  } catch (error) {
    console.error('Failed to send booking confirmation email:', error);
    return null;
  }
};