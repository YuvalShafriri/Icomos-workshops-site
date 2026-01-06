
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { MODEL_NAME } from "../constants";

/**
 * Calls the Gemini API to generate content based on a text prompt.
 */
export const callGemini = async (prompt: string): Promise<string> => {
  // Always use a named parameter with process.env.API_KEY directly.
  const apiKey = process.env.API_KEY;
  console.log("Calling Gemini with Key:", apiKey ? `${apiKey.substring(0, 5)}...` : "UNDEFINED");
  const ai = new GoogleGenAI({ apiKey });

  try {
    // Use ai.models.generateContent to query GenAI with model and prompt.
    // For basic text tasks, passing prompt as string directly to contents is correct.
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
      config: {
        temperature: 0.7,
        topP: 0.95,
        topK: 40,
      }
    });

    // Directly access the .text property (it is a property, not a method).
    return response.text || "No response received from the model.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};
