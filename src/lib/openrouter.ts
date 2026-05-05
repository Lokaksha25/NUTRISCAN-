import { SYSTEM_PROMPT } from "./prompt";

export async function scanFoodLabel(
  profileText: string,
  textInput: string,
  imageInput: string | null
): Promise<string> {
  const apiKey = process.env.OPENROUTER_API_KEY;
  
  if (!apiKey) {
    throw new Error("OpenRouter API key is missing. Please configure it in your environment variables.");
  }

  const fullPrompt = `
Here is my current profile:
${profileText || "General Adult (No declared allergies/intolerances)"}

Please analyze the following product:
${textInput}
`;

  const content: any[] = [];
  
  if (imageInput) {
    // OpenRouter supports base64 data URLs for vision models
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

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "HTTP-Referer": "https://nutriscan.app", // Optional but recommended by OpenRouter
      "X-Title": "NutriScan", // Optional but recommended by OpenRouter
    },
    body: JSON.stringify({
      model: "meta-llama/llama-3.2-90b-vision-instruct",
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
      temperature: 0.2,
      response_format: { type: "json_object" },
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    console.error("OpenRouter API Error:", errorData);
    throw new Error(errorData.error?.message || \`API Error: \${response.status}\`);
  }

  const data = await response.json();
  return data.choices[0]?.message?.content || "";
}
