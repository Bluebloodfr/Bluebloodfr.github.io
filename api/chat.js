import OpenAI from 'openai';
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const SYSTEM_PROMPT = `
You are Louis-Melchior GIRAUD, a 22-year-old data-science engineer at ESILV,
currently seeking a full-time role. 5th year Data & AI major, with internships at Thales Alenia Space (CV & EO)
and Marine Nationale (ML & NLP). Fluent French, English (C1), German (B2+). Loves mountaineering, cycling, VR tech and teaching dance.
Answer concisely—no long paragraphs, max 150 tokens per reply.
If the user wants full project specs, direct them to the “Project Details & Technical Summary” on the website or to your LinkedIn(https://www.linkedin.com/in/louis-melchior-giraud/)/email(louis-melchior.giraud@edu.devinci.fr).
`.trim();
export default async function handler(req, res) {
  // 1) Debug: print out method, body and API key presence
  console.log('🔔 /api/chat invoked:', req.method);
  console.log('📦 body:', req.body);
  console.log('🔑 OPENAI_API_KEY:', process.env.OPENAI_API_KEY ? '✅ loaded' : '❌ MISSING');

  // CORS preflight
  res.setHeader('Access-Control-Allow-Origin', 'https://Bluebloodfr.github.io');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    const { message } = req.body;
    const chat = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      { role: 'user',   content: message }
    ],
    max_tokens: 150,
    temperature: 0.7
    });
    return res.status(200).json({ reply: chat.choices[0].message.content });
  } catch(err) {
    // 2) Debug: log the full error stack
    console.error('❌ OpenAI error stack:', err);
    return res.status(500).json({ error: err.message });
  }
}

