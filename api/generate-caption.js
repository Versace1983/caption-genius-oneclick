import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Metodo non consentito' });
    return;
  }

  const { prompt } = req.body;
  if (!prompt || prompt.trim().length === 0) {
    res.status(400).json({ error: 'Prompt mancante o vuoto' });
    return;
  }

  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      max_tokens: 100,
      temperature: 0.7,
      n: 3,
    });

    // Controlla se la risposta è valida
    if (!completion.data || !completion.data.choices) {
      throw new Error('Risposta non valida da OpenAI');
    }

    // Unisci le 3 caption ricevute in un unico testo
    const captions = completion.data.choices.map(c => c.text.trim()).join('\n\n');

    res.status(200).json({ caption: captions });
  } catch (error) {
    console.error('Errore OpenAI:', error);
    res.status(500).json({ error: 'Errore interno con OpenAI' });
  }
}
