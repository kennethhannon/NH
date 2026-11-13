// Local-only multi-estimate storage helpers. No remote service or account.
export const LIBRARY_CAP = 25;
export const LIBRARY_KEY = 'pk-quickquote-library-v1';

export function normalizeLibrary(raw) {
  if (!Array.isArray(raw)) return [];
  const seen = new Set();
  return raw.slice(0, LIBRARY_CAP).filter(row => {
    if (!row || typeof row !== 'object' || typeof row.id !== 'string' ||
        !row.id || seen.has(row.id) || !row.quote ||
        !Array.isArray(row.quote.items) || !row.quote.meta ||
        typeof row.quote.meta !== 'object') return false;
    seen.add(row.id);
    return true;
  }).map(row => ({
    id: row.id.slice(0, 80),
    savedAt: String(row.savedAt || '').slice(0, 40),
    customer: String(row.customer || '').slice(0, 160),
    job: String(row.job || '').slice(0, 160),
    quote: row.quote
  }));
}

export function saveEstimate(library, record) {
  if (!record || !record.id || !record.quote ||
      !Array.isArray(record.quote.items) || !record.quote.meta) {
    throw new Error('Invalid estimate.');
  }
  const rows = normalizeLibrary(library);
  const index = rows.findIndex(row => row.id === record.id);
  if (index === -1 && rows.length >= LIBRARY_CAP) {
    throw new Error('Saved estimate library is full (25). Delete an older estimate first.');
  }
  if (index >= 0) rows.splice(index, 1);
  rows.unshift(record);
  return rows;
}

export function deleteEstimate(library, id) {
  return normalizeLibrary(library).filter(row => row.id !== id);
}
