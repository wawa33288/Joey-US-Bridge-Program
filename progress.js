const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export async function onRequestGet(context) {
  const data = await context.env.JOEY_PROGRESS.get('joey_data');
  return new Response(data || '{}', {
    headers: { ...CORS, 'Content-Type': 'application/json' },
  });
}

export async function onRequestPost(context) {
  try {
    const body = await context.request.json();
    await context.env.JOEY_PROGRESS.put('joey_data', JSON.stringify(body));
    return new Response('OK', { headers: CORS });
  } catch (e) {
    return new Response(e.message, { status: 500, headers: CORS });
  }
}

export async function onRequestOptions() {
  return new Response(null, { headers: CORS });
}
