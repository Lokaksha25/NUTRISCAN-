import Groq from "groq-sdk";
import { SYSTEM_PROMPT } from "./prompt";

export async function scanFoodLabel(
  profileText: string,
  textInput: string,
  imageInput: string | null
): Promise<string> {
  const groq = new Groq({ 
    apiKey: process.env.GROQ_API_KEY,
    dangerouslyAllowBrowser: true 
  });

  const fullPrompt = `
Here is my current profile:
${profileText || "General Adult (No declared allergies/intolerances)"}

Please analyze the following product:
${textInput}
`;

  const content: any[] = [];
  
  if (imageInput) {
    // Groq vision models support base64 data URLs.
    content.push({
      type: "image_url",
      image_url: {
        url: imageInput,
      },
    });
  }
  
  content.push({
    type: "text",
    text: fullPrompt,
  });

  const chatCompletion = await groq.chat.completions.create({
    messages: [
      {
        role: "system",
        content: SYSTEM_PROMPT,
      },
      {
        role: "user",
        content: content,
      }
    ],
    model: "llama-3.2-90b-vision-preview",
    temperature: 0.2,
    response_format: { type: "json_object" },
  });

  return chatCompletion.choices[0]?.message?.content || "";
}
