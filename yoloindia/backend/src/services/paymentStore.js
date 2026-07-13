import { hasSupabaseCredentials } from '../config.js';
import { appendRecord } from './localStore.js';
import { insertRow } from './supabase.js';

export const persistEnquiry = async (enquiry) => {
  const { source, ...storedEnquiry } = enquiry;

  if (!hasSupabaseCredentials()) {
    return appendRecord('enquiries.json', {
      ...storedEnquiry,
      created_at: new Date().toISOString(),
      storage: 'local',
    });
  }

  const { data, error } = await insertRow('enquiries', storedEnquiry);
  if (error) {
    return appendRecord('enquiries.json', {
      ...storedEnquiry,
      created_at: new Date().toISOString(),
      storage: 'local',
      storage_error: error.message || 'Supabase insert failed',
    });
  }

  return Array.isArray(data) ? data[0] : data;
};
