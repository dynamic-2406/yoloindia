import { createServer } from 'node:http';
import { dirname, extname, join, resolve } from 'node:path';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import {
  config,
  getSupabaseProjectRefFromKey,
  getSupabaseProjectRefFromUrl,
  validateProductionConfig,
} from './config.js';
import { handleApiRoute } from './routes/apiRoutes.js';
import { AppError, createNotFound, json, withCors } from './utils/http.js';

validateProductionConfig();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const repoRoot = resolve(__dirname, '..', '..');
const frontendDistDir = resolve(repoRoot, 'frontend', 'dist');

const staticTypes = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
};

const securityHeaders = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
};

const sendError = (res, error) => {
  const statusCode = error instanceof AppError ? error.statusCode : 500;
  const message = error instanceof AppError ? error.message : 'Internal server error';
  const payload = { success: false, message };

  if (error instanceof AppError && error.details) {
    payload.details = error.details;
  }

  if (statusCode >= 500) {
    console.error(error);
  }

  json(res, statusCode, payload);
};

const getPath = (req) => {
  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  return url.pathname;
};

const getQuery = (req) => {
  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  return Object.fromEntries(url.searchParams.entries());
};

const serveFrontend = async (req, res) => {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    return false;
  }

  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const requestedPath = (url.pathname === '/' ? 'index.html' : url.pathname).replace(/^\/+/, '');
  const filePath = join(frontendDistDir, requestedPath);

  try {
    const file = await readFile(filePath);
    const type = staticTypes[extname(filePath)] || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': type });
    res.end(file);
    return true;
  } catch {
    if (requestedPath.includes('.')) {
      return false;
    }

    try {
      const indexFile = await readFile(join(frontendDistDir, 'index.html'));
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(indexFile);
      return true;
    } catch {
      return false;
    }
  }
};

const handleRoute = async (req, res) => {
  const path = getPath(req);
  const query = getQuery(req);

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const matchedApiRoute = await handleApiRoute({ req, res, path, query });
  if (matchedApiRoute) {
    return;
  }

  if (!path.startsWith('/api')) {
    const served = await serveFrontend(req, res);
    if (served) {
      return;
    }
  }

  createNotFound(res);
};

const server = createServer((req, res) => {
  Object.entries(securityHeaders).forEach(([key, value]) => res.setHeader(key, value));
  const requestOrigin = req.headers.origin;
  const corsOrigin = config.frontendOrigin === '*'
    ? '*'
    : (!config.isProduction && requestOrigin)
      ? requestOrigin
      : config.frontendOrigin;
  withCors(res, corsOrigin);

  handleRoute(req, res).catch((error) => {
    sendError(res, error);
  });
});

server.listen(config.port, () => {
  console.log(`Backend API running on http://localhost:${config.port}`);
  if (!config.isProduction) {
    console.log(`Frontend dist: ${frontendDistDir}`);
  }
  if (config.supabaseUrl && config.supabaseServiceRoleKey) {
    console.log(`Supabase project ref (url): ${getSupabaseProjectRefFromUrl() || 'unavailable'}`);
    console.log(`Supabase project ref (key): ${getSupabaseProjectRefFromKey() || 'unavailable'}`);
  }
  if (config.mockPaymentMode) {
    console.log('Payment gateway running in mock mode');
  }
});
