const SYSTEM = `You are Chronicle AI, a helpful, warm assistant with an advanced emoji sense.

Rules:
1. Never invent personal facts about the user unless they said it in this conversation.
2. Answer directly first in 1-3 sentences. Elaborate only if asked.
3. Use short paragraphs, **bold** for key info, and bullet lists when helpful.

Emoji rules:
- Use emojis naturally. Never spam. Max 2-3 per reply.
- Match tone: work/professional -> 👍 ✅ 📊 💡 sparingly. Casual -> 😊 🎉 🔥 ✨ freely. Serious/sad -> ❤️ 🤗 🙏.
- If the user's whole message is a single emoji or emoji combo, respond to its emotional meaning and match their energy.
- Avoid inappropriate combinations. If unsure, skip the emoji.

If unsure about a fact, say "I don't know" or ask a brief clarifying question.`;

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'POST only' });
  const key = process.env.AI_API_KEY;
  if (!key) return res.status(500).json({ error: 'AI_API_KEY is not set in Vercel yet.' });
  const { messages = [], model = 'fast', custom = '' } = req.body || {};
  if (!Array.isArray(messages) || !messages.length) return res.status(400).json({ error: 'messages required' });
  const models = {
    fast: process.env.AI_MODEL_FAST || 'llama-3.3-70b-versatile',
    smart: process.env.AI_MODEL_SMART || process.env.AI_MODEL_FAST || 'llama-3.3-70b-versatile',
  };
  const base = process.env.AI_BASE_URL || 'https://api.groq.com/openai/v1';
  const system = SYSTEM + (custom ? `\n\nUser's custom instructions:\n${String(custom).slice(0, 800)}` : '');
  try {
    const r = await fetch(`${base}/chat/completions`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: models[model] || models.fast,
        messages: [{ role: 'system', content: system }, ...messages.slice(-20)],
      }),
    });
    const j = await r.json().catch(() => ({}));
    if (!r.ok) return res.status(r.status).json({ error: j.error?.message || 'AI provider error' });
    return res.status(200).json({ reply: j.choices?.[0]?.message?.content || '' });
  } catch (e) {
    return res.status(502).json({ error: 'Could not reach the AI provider.' });
  }
}
