import { existsSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const parseEnvFile = (filePath) => {
  if (!existsSync(filePath)) {
    return;
  }

  const contents = readFileSync(filePath, 'utf8');
  contents.split(/\r?\n/).forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) return;

    const equalsIndex = trimmed.indexOf('=');
    if (equalsIndex === -1) return;

    const key = trimmed.slice(0, equalsIndex).trim();
    const rawValue = trimmed.slice(equalsIndex + 1).trim();
    const value = rawValue.replace(/^(['"])(.*)\1$/, '$2').trim();

    if (key && process.env[key] == null) {
      process.env[key] = value;
    }
  });
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
parseEnvFile(resolve(__dirname, '..', '.env'));

const toNumber = (value, fallback) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

const isTruthy = (value) => {
  if (typeof value !== 'string') return false;
  return ['true', '1', 'yes', 'on'].includes(value.trim().toLowerCase());
};

const isPlaceholder = (value) => /placeholder/i.test(String(value || ''));
const isProduction = (process.env.NODE_ENV || '').toLowerCase() === 'production';
const loadedFrontendOrigin = process.env.FRONTEND_ORIGIN || 'http://localhost:3002';
const extractSupabaseProjectRefFromUrl = (supabaseUrl) => {
  try {
    const hostname = new URL(supabaseUrl).hostname;
    return hostname.split('.')[0] || '';
  } catch {
    return '';
  }
};

const extractSupabaseProjectRefFromKey = (serviceRoleKey) => {
  try {
    const [, payload] = String(serviceRoleKey || '').split('.');
    if (!payload) return '';
    const decoded = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'));
    return decoded.ref || '';
  } catch {
    return '';
  }
};

export const config = {
  port: toNumber(process.env.PORT, 3001),
  frontendOrigin: loadedFrontendOrigin,
  razorpayApiBaseUrl: process.env.RAZORPAY_API_BASE_URL || 'https://api.razorpay.com',
  supabaseUrl: process.env.SUPABASE_URL || '',
  supabaseServiceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY || '',
  razorpayKeyId: process.env.RAZORPAY_KEY_ID || 'rzp_test_placeholder',
  razorpayKeySecret: process.env.RAZORPAY_KEY_SECRET || 'test_secret_placeholder',
  razorpayWebhookSecret: process.env.RAZORPAY_WEBHOOK_SECRET || '',
  razorpayCurrency: process.env.RAZORPAY_CURRENCY || 'USD',
  exchangeRateFallback: toNumber(process.env.EXCHANGE_RATE_FALLBACK, 95),
  isProduction,
  mockPaymentMode: !isProduction && (
    isTruthy(process.env.MOCK_PAYMENT_MODE) ||
    isPlaceholder(process.env.RAZORPAY_KEY_ID) ||
    isPlaceholder(process.env.RAZORPAY_KEY_SECRET)
  ),
};

export const hasSupabaseCredentials = () =>
  Boolean(config.supabaseUrl && config.supabaseServiceRoleKey);

export const getSupabaseProjectRefFromUrl = () =>
  extractSupabaseProjectRefFromUrl(config.supabaseUrl);

export const getSupabaseProjectRefFromKey = () =>
  extractSupabaseProjectRefFromKey(config.supabaseServiceRoleKey);

export const validateSupabaseConfiguration = () => {
  if (!hasSupabaseCredentials()) {
    return;
  }

  const urlRef = getSupabaseProjectRefFromUrl();
  const keyRef = getSupabaseProjectRefFromKey();

  if (urlRef && keyRef && urlRef !== keyRef) {
    throw new Error(
      `Supabase URL and service role key do not match the same project (${urlRef} !== ${keyRef})`,
    );
  }
};

export const validateProductionConfig = () => {
  if (!config.isProduction) {
    return;
  }

  const missing = [];

  if (!config.supabaseUrl) missing.push('SUPABASE_URL');
  if (!config.supabaseServiceRoleKey) missing.push('SUPABASE_SERVICE_ROLE_KEY');
  if (!config.razorpayKeyId || isPlaceholder(config.razorpayKeyId)) missing.push('RAZORPAY_KEY_ID');
  if (!config.razorpayKeySecret || isPlaceholder(config.razorpayKeySecret)) missing.push('RAZORPAY_KEY_SECRET');

  if (missing.length) {
    throw new Error(`Missing production environment variables: ${missing.join(', ')}`);
  }

  validateSupabaseConfiguration();
};
