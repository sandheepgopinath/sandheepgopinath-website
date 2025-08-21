// This is the full code for the new file: /api/chat.js

export default async function handler(request, response) {
  // 1. Get the user's message from the request
  const { userMessage, resumeContext } = await request.json();

  // 2. Get the secret API key from Vercel's environment variables
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return response.status(500).json({ error: 'API key is not configured.' });
  }

  // 3. Construct the prompt for the Gemini API
  const prompt = `You are Sandheep Gopinath's AI Twin, a helpful assistant integrated into his personal website. Your purpose is to answer questions about Sandheep's professional background based ONLY on the information provided below. Do not invent any information or answer questions outside of this context. If a question cannot be answered from the context, politely state that you don't have that specific information. Keep your answers conversational and concise. Here is Sandheep's resume context: \n\n${resumeContext}\n\nNow, answer the following question: "${userMessage}"`;

  const payload = {
    contents: [{
      role: "user",
      parts: [{ text: prompt }]
    }]
  };

  try {
    // 4. Securely call the Gemini API from the server
    const geminiResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!geminiResponse.ok) {
      const errorText = await geminiResponse.text();
      console.error("Gemini API Error:", errorText);
      return response.status(geminiResponse.status).json({ error: `Gemini API request failed: ${errorText}` });
    }

    const result = await geminiResponse.json();
    
    // 5. Send the AI's response back to the website
    return response.status(200).json(result);

  } catch (error) {
    console.error('Error in serverless function:', error);
    return response.status(500).json({ error: 'An internal error occurred.' });
  }
}
