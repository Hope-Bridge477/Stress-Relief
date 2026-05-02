export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ reply: 'Method not allowed' });
  }

  const { message } = req.body;
  const API_KEY = process.env.GEMINI_API_KEY;

  // Error check if the API key is missing in Vercel
  if (!API_KEY) {
    return res.status(500).json({ reply: "API Key is missing in settings." });
  }

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{
          parts: [{ 
            text: `You are a calm, professional stress-relief coach. 
                   Someone is sharing their stress with you. 
                   Provide a short, 2-3 sentence soothing and motivational response.
                   
                   User message: ${message}` 
          }]
        }]
      })
    });

    const data = await response.json();
    
    // Safety check for Gemini's response structure
    if (data.candidates && data.candidates[0].content) {
      const reply = data.candidates[0].content.parts[0].text;
      res.status(200).json({ reply });
    } else {
      throw new Error('Invalid response from AI');
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ reply: "I am listening. Please try sharing again in a moment." });
  }
}
