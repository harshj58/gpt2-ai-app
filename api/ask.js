import fetch from 'node-fetch';

export default async function handler(req, res) {
  const question = req.body?.question;

  if (!question) {
    return res.status(400).json({ error: "No question provided" });
  }

  const response = await fetch("https://api-inference.huggingface.co/models/YOUR_USERNAME/YOUR_MODEL_NAME", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.HF_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ inputs: question })
  });

  const data = await response.json();

  if (data.error) {
    return res.status(500).json({ error: data.error });
  }

  const output = data?.[0]?.generated_text || "Sorry, I couldn't understand.";
  res.status(200).json({ answer: output });
}
