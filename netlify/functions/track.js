if (!globalThis.__visitors) globalThis.__visitors = [];

exports.handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  };

  if (event.httpMethod === 'OPTIONS') return { statusCode: 204, headers, body: '' };
  if (event.httpMethod !== 'POST')
    return { statusCode: 405, headers, body: 'Method not allowed' };

  let data = {};
  try { data = JSON.parse(event.body || '{}'); } catch {}

  const ip = (event.headers['x-nf-client-connection-ip'] ||
              event.headers['x-forwarded-for'] ||
              'unknown').split(',')[0].trim();

  const record = {
    id: Date.now() + '-' + Math.random().toString(36).slice(2, 8),
    ip,
    page_url:  (data.page_url  || '').slice(0, 300),
    referrer:  (data.referrer  || 'Direct').slice(0, 300),
    user_agent:(data.user_agent|| '').slice(0, 300),
    time: new Date().toISOString()
  };

  globalThis.__visitors.unshift(record);
  if (globalThis.__visitors.length > 500) globalThis.__visitors.length = 500;

  return { statusCode: 200, headers, body: JSON.stringify({ success: true }) };
};
