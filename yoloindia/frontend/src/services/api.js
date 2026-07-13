const API_BASE = import.meta.env.VITE_API_BASE_URL || '';

const requestJson = async (path, options = {}) => {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    ...options,
  });

  const payload = await response.json().catch(() => ({}));

  if (!response.ok || payload?.success === false) {
    throw new Error(payload?.message || `Request failed with status ${response.status}`);
  }

  return payload;
};

const unwrap = (payload) => payload?.data ?? payload;

export const fetchPackagesByTourType = async (tourType) => {
  const payload = await requestJson(`/api/packages/tour-type/${encodeURIComponent(tourType)}`);
  return unwrap(payload);
};

export const fetchPackages = async (filters = {}) => {
  const params = new URLSearchParams();

  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      params.set(key, value);
    }
  });

  const payload = await requestJson(`/api/packages${params.toString() ? `?${params.toString()}` : ''}`);
  return unwrap(payload);
};

export const fetchPackageById = async (idOrSlug) => {
  const payload = await requestJson(`/api/packages/${encodeURIComponent(idOrSlug)}`);
  return unwrap(payload);
};

export const fetchFeaturedPackages = async () => {
  const payload = await requestJson('/api/packages/featured');
  return unwrap(payload);
};

export const fetchDestinations = async (type = null) => {
  const params = type ? `?type=${encodeURIComponent(type)}` : '';
  const payload = await requestJson(`/api/destinations${params}`);
  return unwrap(payload);
};

export const fetchDestinationById = async (id) => {
  const payload = await requestJson(`/api/destinations/${encodeURIComponent(id)}`);
  return unwrap(payload);
};

export const fetchFeaturedDestinations = async () => {
  const payload = await requestJson('/api/destinations/featured');
  return unwrap(payload);
};

export const fetchTestimonials = async () => {
  const payload = await requestJson('/api/testimonials');
  return unwrap(payload);
};

export const submitContactForm = async (formData) => {
  const payload = await requestJson('/api/contact', {
    method: 'POST',
    body: JSON.stringify(formData),
  });

  return unwrap(payload);
};

export const createBookingOrder = async (formData) => {
  const payload = await requestJson('/api/bookings/orders', {
    method: 'POST',
    body: JSON.stringify(formData),
  });

  return unwrap(payload);
};

export const verifyBookingPayment = async (formData) => {
  const payload = await requestJson('/api/bookings/verify', {
    method: 'POST',
    body: JSON.stringify(formData),
  });

  return unwrap(payload);
};
