export class AppError extends Error {
  constructor(statusCode, message, details = undefined) {
    super(message);
    this.name = 'AppError';
    this.statusCode = statusCode;
    this.details = details;
  }
}

export const json = (res, statusCode, payload) => {
  const body = JSON.stringify(payload);
  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Content-Length': Buffer.byteLength(body),
  });
  res.end(body);
};

export const readRawBody = async (req, maxBytes = 1024 * 1024) => {
  const chunks = [];
  let total = 0;

  for await (const chunk of req) {
    total += chunk.length;
    if (total > maxBytes) {
      throw new AppError(413, 'Request body is too large');
    }
    chunks.push(chunk);
  }

  return chunks.length ? Buffer.concat(chunks).toString('utf8') : '';
};

export const readJsonBody = async (req) => {
  const text = await readRawBody(req);
  try {
    return text ? JSON.parse(text) : {};
  } catch {
    throw new AppError(400, 'Request body must be valid JSON');
  }
};

export const withCors = (res, origin) => {
  res.setHeader('Access-Control-Allow-Origin', origin);
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
};

export const createNotFound = (res) => json(res, 404, { success: false, message: 'Route not found' });
