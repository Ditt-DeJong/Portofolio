export const generateGeminiContent = async (prompt: string, systemInstruction: string = ""): Promise<string | null> => {
  const apiKey = ""; // Masukkan API Key jika ada. Jika kosong, mode demo aktif.
  
  if (!apiKey) {
    console.warn("API Key missing. Returning null for demo mode.");
    return null;
  }

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;
  
  try {
    const payload = {
      contents: [{ parts: [{ text: prompt }] }],
      systemInstruction: systemInstruction ? { parts: [{ text: systemInstruction }] } : undefined
    };

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!response.ok) throw new Error(`API Error: ${response.status}`);

    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || null;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return null;
  }
};
