const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: CORS });
    }

    // API: AI writing feedback
    if (url.pathname === '/api/feedback' && request.method === 'POST') {
      try {
        const { prompt } = await request.json();
        if (!prompt) return new Response(JSON.stringify({ error: 'No prompt' }), { status: 400, headers: CORS });

        const resp = await fetch('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': env.ANTHROPIC_API_KEY,
            'anthropic-version': '2023-06-01',
          },
          body: JSON.stringify({
            model: 'claude-haiku-4-5-20251001',
            max_tokens: 350,
            messages: [{ role: 'user', content: prompt }],
          }),
        });

        const data = await resp.json();
        return new Response(JSON.stringify(data), {
          headers: { ...CORS, 'Content-Type': 'application/json' },
        });
      } catch (e) {
        return new Response(JSON.stringify({ error: e.message }), { status: 500, headers: CORS });
      }
    }

    // API: Progress sync (read)
    if (url.pathname === '/api/progress' && request.method === 'GET') {
      const data = await env.JOEY_PROGRESS.get('joey_data');
      return new Response(data || '{}', {
        headers: { ...CORS, 'Content-Type': 'application/json' },
      });
    }

    // API: Progress sync (write)
    if (url.pathname === '/api/progress' && request.method === 'POST') {
      try {
        const body = await request.json();
        await env.JOEY_PROGRESS.put('joey_data', JSON.stringify(body));
        return new Response('OK', { headers: CORS });
      } catch (e) {
        return new Response(e.message, { status: 500, headers: CORS });
      }
    }

    // API: Parent dashboard
    if (url.pathname === '/api/dashboard' && request.method === 'POST') {
      try {
        const { token } = await request.json();
        if (!token || token !== env.PARENT_TOKEN) {
          return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: CORS });
        }
        const data = await env.JOEY_PROGRESS.get('joey_data');
        return new Response(data || '{}', {
          headers: { ...CORS, 'Content-Type': 'application/json' },
        });
      } catch (e) {
        return new Response(JSON.stringify({ error: e.message }), { status: 500, headers: CORS });
      }
    }

    // All other requests → serve static assets
    return env.ASSETS.fetch(request);
  },
};
