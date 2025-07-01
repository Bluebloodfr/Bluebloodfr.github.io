import OpenAI from 'openai';
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async (req, res) => {
  // allow requests from your GH Pages origin
  res.setHeader('Access-Control-Allow-Origin', 'https://bluebloodfr.github.io');
  // allow the POST + JSON header
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // handle the CORS preflight
  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  const { message } = req.body;
  const chat = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [
      { role: 'system', content: 'You are Louis-Melchior: a friendly data-science student.' },
      { role: 'user',   content: message }
    ]
  });
  res.json({ reply: chat.choices[0].message.content });
};