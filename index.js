export default {
  async fetch(request, env, ctx) {
    if (request.method === 'POST') {
      const data = await request.json();
      const token = '5443998856:AAFCYopFnwp9EGXcQrC4gJwz4sHI9hwYbS4';
      const chatId = '-1002792790258';

      let text = '';

      if (data.type === 'application') {
        text = `💼 New Application:\\nName: ${data.name}\\nPhone: ${data.phone}`;
      } else if (data.type === 'activation') {
        text = `✅ Activation:\\nName: ${data.name}\\nPhone: ${data.phone}\\nCode: ${data.code}`;
      } else {
        return new Response('Invalid request', { status: 400 });
      }

      const telegramURL = `https://api.telegram.org/bot${token}/sendMessage`;
      await fetch(telegramURL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: chatId, text }),
      });

      return new Response('OK');
    }

    return new Response('Method Not Allowed', { status: 405 });
  },
};
