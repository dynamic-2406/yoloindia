import { config, hasSupabaseCredentials } from '../config.js';
import { selectRows } from './supabase.js';
import { getInrToUsdRate } from './exchangeRate.js';

const isUuid = (value) =>
  /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(String(value || ''));

const toNumber = (value, fallback = 0) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

const requireSupabaseCatalog = () => {
  if (!hasSupabaseCredentials()) {
    throw new Error('Supabase credentials are required to load catalog data');
  }
};

const getSupabasePackages = async () => {
  requireSupabaseCatalog();

  const { data, error } = await selectRows('packages', 'select=*');
  if (error) {
    throw new Error(error.message || 'Failed to load packages from Supabase');
  }

  return Array.isArray(data) ? data : [];
};

const getSupabaseDestinations = async () => {
  requireSupabaseCatalog();

  const { data, error } = await selectRows('destinations', 'select=*');
  if (error) {
    throw new Error(error.message || 'Failed to load destinations from Supabase');
  }

  return Array.isArray(data) ? data : [];
};

const getSupabasePackageLinks = async () => {
  requireSupabaseCatalog();

  const { data, error } = await selectRows('package_destinations', 'select=package_id,destination_id');
  if (error) {
    throw new Error(error.message || 'Failed to load package links from Supabase');
  }

  return Array.isArray(data) ? data : [];
};

const getSupabaseTestimonials = async () => {
  requireSupabaseCatalog();

  const { data, error } = await selectRows('testimonials', 'select=*');
  if (error) {
    throw new Error(error.message || 'Failed to load testimonials from Supabase');
  }

  return Array.isArray(data) ? data : [];
};

const normalizePackage = (pkg, rate) => {
  const priceInr = toNumber(pkg.priceInr ?? pkg.price, 0);
  const originalPriceInr = toNumber(pkg.originalPriceInr ?? pkg.originalPrice ?? pkg.original_price ?? priceInr, priceInr);

  return {
    ...pkg,
    priceInr,
    originalPriceInr,
    original_price: originalPriceInr,
    price: priceInr > 0 ? priceInr / rate : 0,
    originalPrice: originalPriceInr > 0 ? originalPriceInr / rate : 0,
    destination: pkg.destination_text ?? pkg.destination,
    image: pkg.image_url ?? pkg.image,
    reviews: toNumber(pkg.reviews ?? pkg.reviews_count, 0),
    tourType: pkg.tourType ?? pkg.tourtype ?? pkg.tour_type,
    gallery: Array.isArray(pkg.gallery) ? pkg.gallery : [],
    highlights: Array.isArray(pkg.highlights) ? pkg.highlights : [],
    inclusions: Array.isArray(pkg.inclusions) ? pkg.inclusions : [],
    exclusions: Array.isArray(pkg.exclusions) ? pkg.exclusions : [],
    itinerary: Array.isArray(pkg.itinerary) ? pkg.itinerary : [],
  };
};

const normalizeDestination = (dest) => ({
  ...dest,
  bestTime: dest.bestTime ?? dest.best_time,
  banner: dest.banner ?? dest.banner_url,
  image: dest.image ?? dest.image_url,
  packages: Array.isArray(dest.packages) ? dest.packages : [],
  attractions: Array.isArray(dest.attractions) ? dest.attractions : [],
  gallery: Array.isArray(dest.gallery) ? dest.gallery : [],
});

const getSupabasePackageLinkMap = async () => {
  const packageLinks = await getSupabasePackageLinks();
  const linksByDestination = new Map();

  packageLinks.forEach((link) => {
    const destinationKey = String(link.destination_id);

    if (!linksByDestination.has(destinationKey)) {
      linksByDestination.set(destinationKey, []);
    }
    linksByDestination.get(destinationKey).push(link.package_id);
  });

  return linksByDestination;
};

const getPackagesFromSupabase = async () => {
  const [supabasePackages, rate] = await Promise.all([
    getSupabasePackages(),
    getInrToUsdRate(),
  ]);

  return supabasePackages.map((pkg) => normalizePackage(pkg, rate));
};

const getDestinationsFromSupabase = async () => {
  const [supabaseDestinations, packageLinks] = await Promise.all([
    getSupabaseDestinations(),
    getSupabasePackageLinkMap(),
  ]);

  return supabaseDestinations.map((dest) => {
    const normalized = normalizeDestination(dest);
    const destinationKey = String(dest.id);
    return {
      ...normalized,
      packages: normalized.packages.length ? normalized.packages : packageLinks.get(destinationKey) || [],
    };
  });
};

export const getExchangeRatePayload = async () => {
  const rate = await getInrToUsdRate();
  return {
    rate,
    source: 'frankfurter',
    fallbackRate: config.exchangeRateFallback,
    updatedAt: new Date().toISOString(),
  };
};

export const getPackages = async (filters = {}) => {
  const packages = await getPackagesFromSupabase();
  return applyPackageFilters(packages, filters);
};

export const getPackageById = async (idOrSlug) => {
  const packages = await getPackagesFromSupabase();
  const target = String(idOrSlug);
  return packages.find((pkg) => String(pkg.id) === target || String(pkg.slug) === target) || null;
};

export const getPackagesByTourType = async (tourType) => {
  const packages = await getPackagesFromSupabase();
  return packages.filter((pkg) => pkg.tourType === tourType || pkg.tourtype === tourType || pkg.category === tourType);
};

export const getFeaturedPackages = async () => {
  const packages = await getPackagesFromSupabase();
  return [...packages].sort((a, b) => toNumber(b.popularity) - toNumber(a.popularity)).slice(0, 6);
};

export const getDestinations = async (type = null) => {
  const destinations = await getDestinationsFromSupabase();
  if (!type) {
    return destinations;
  }
  return destinations.filter((dest) => dest.type === type);
};

export const getDestinationById = async (idOrSlug) => {
  const destinations = await getDestinationsFromSupabase();
  const target = String(idOrSlug);
  return destinations.find((dest) => String(dest.id) === target || String(dest.slug) === target) || null;
};

export const getFeaturedDestinations = async () => {
  const destinations = await getDestinationsFromSupabase();
  return destinations.filter((dest) => Boolean(dest.featured));
};

export const getTestimonials = async () => {
  return getSupabaseTestimonials();
};

const applyPackageFilters = (packages, filters = {}) => {
  const category = filters.category && filters.category !== 'All' ? String(filters.category).trim() : null;
  const tourType = filters.tourType ? String(filters.tourType).trim() : null;
  const minPrice = filters.minPrice != null && filters.minPrice !== '' ? Number(filters.minPrice) : null;
  const maxPrice = filters.maxPrice != null && filters.maxPrice !== '' ? Number(filters.maxPrice) : null;
  const duration = filters.duration != null && filters.duration !== '' ? Number(filters.duration) : null;

  let filtered = packages;

  if (category) {
    filtered = filtered.filter((pkg) => pkg.category === category);
  }

  if (tourType) {
    filtered = filtered.filter((pkg) => pkg.tourType === tourType || pkg.tourtype === tourType);
  }

  if (Number.isFinite(minPrice)) {
    filtered = filtered.filter((pkg) => pkg.price >= minPrice);
  }

  if (Number.isFinite(maxPrice)) {
    filtered = filtered.filter((pkg) => pkg.price <= maxPrice);
  }

  if (Number.isFinite(duration)) {
    filtered = filtered.filter((pkg) => toNumber(pkg.days) <= duration);
  }

  switch (filters.sort) {
    case 'price-asc':
      filtered = [...filtered].sort((a, b) => a.price - b.price);
      break;
    case 'price-desc':
      filtered = [...filtered].sort((a, b) => b.price - a.price);
      break;
    case 'popularity':
      filtered = [...filtered].sort((a, b) => toNumber(b.popularity) - toNumber(a.popularity));
      break;
    case 'rating':
      filtered = [...filtered].sort((a, b) => toNumber(b.rating) - toNumber(a.rating));
      break;
    default:
      break;
  }

  return filtered;
};
