import OpenAI from 'openai';
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function handler(req, res) {
  const { message } = await req.body;
  const completion = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [
      { role: 'system', content: 'You are Louis-Melchior: a data-engineering & AI student. Keep answers friendly, concise.' },
      { role: 'user',  content: message }
    ]
  });
  res.status(200).json({ reply: completion.choices[0].message.content });
}
