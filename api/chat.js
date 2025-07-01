import OpenAI from 'openai';
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async (req, res) => {
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