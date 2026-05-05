import { GoogleGenAI } from "@google/genai";
import { SYSTEM_PROMPT } from "./prompt";

export async function scanFoodLabel(
  profileText: string,
  textInput: string,
  imageInput: string | null
): Promise<string> {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

  const fullPrompt = `
Here is my current profile:
${profileText || "General Adult (No declared allergies/intolerances)"}

Please analyze the following product:
${textInput}
`;

  const parts: any[] = [];
  
  if (imageInput) {
    // Expected to be a base64 string, something like "data:image/jpeg;base64,..."
    const base64Data = imageInput.split(",")[1] || imageInput;
    const mimeType = imageInput.split(";")[0].split(":")[1] || "image/jpeg";
    parts.push({
      inlineData: {
        mimeType,
        data: base64Data,
      },
    });
  }
  
  parts.push({ text: fullPrompt });

  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash", // using gemini-2.0-flash as it is the currently supported flash model
    contents: { parts },
    config: {
      systemInstruction: SYSTEM_PROMPT,
      temperature: 0.2, // low temperature for analytical output
      responseMimeType: "application/json",
    },
  });

  return response.text || "";
}
