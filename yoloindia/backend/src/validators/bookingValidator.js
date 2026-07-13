import { AppError } from '../utils/http.js';

export const validateBookingRequest = (body) => {
  const name = String(body.name || '').trim();
  const email = String(body.email || '').trim();
  const phone = String(body.phone || '').trim();
  const packageId = String(body.packageId || body.packageSlug || '').trim();

  if (!name) throw new AppError(400, 'Customer name is required');
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new AppError(400, 'A valid customer email is required');
  }
  if (!phone) throw new AppError(400, 'Customer phone is required');
  if (!packageId) throw new AppError(400, 'Package selection is required');

  return {
    customer: { name, email, phone },
    packageId,
  };
};
