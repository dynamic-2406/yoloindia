import { config, hasSupabaseCredentials } from '../config.js';

const buildHeaders = () => ({
  apikey: config.supabaseServiceRoleKey,
  Authorization: `Bearer ${config.supabaseServiceRoleKey}`,
  'Content-Type': 'application/json',
  Accept: 'application/json',
});

const buildUrl = (path, query = '') => {
  const suffix = query ? `?${query}` : '';
  return `${config.supabaseUrl.replace(/\/$/, '')}/rest/v1/${path}${suffix}`;
};

const supabaseRequest = async (path, { method = 'GET', query = '', body, prefer = 'return=representation' } = {}) => {
  if (!hasSupabaseCredentials()) {
    return { data: null, error: new Error('Supabase credentials are not configured') };
  }

  try {
    const response = await fetch(buildUrl(path, query), {
      method,
      headers: {
        ...buildHeaders(),
        ...(prefer ? { Prefer: prefer } : {}),
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    const text = await response.text();
    const data = text ? JSON.parse(text) : null;

    if (!response.ok) {
      const message = data?.message || data?.error || `Supabase request failed with status ${response.status}`;
      return {
        data: null,
        error: new Error(
          response.status === 401 || response.status === 403
            ? `Invalid Supabase API key or insufficient permissions: ${message}`
            : message,
        ),
      };
    }

    return { data, error: null };
  } catch (error) {
    return {
      data: null,
      error: new Error(`Supabase request failed: ${error?.message || 'network error'}`),
    };
  }
};

export const supabaseAvailable = hasSupabaseCredentials();

export const selectRows = async (table, query = 'select=*') => supabaseRequest(table, { query });

export const selectRowsWhere = async (table, filters = {}, select = '*') => {
  const params = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      params.set(key, value);
    }
  });
  params.set('select', select);
  return supabaseRequest(table, { query: params.toString() });
};

export const insertRow = async (table, row) => supabaseRequest(table, {
  method: 'POST',
  body: [row],
});

export const updateRows = async (table, query, patch) => supabaseRequest(table, {
  method: 'PATCH',
  query,
  body: patch,
});
