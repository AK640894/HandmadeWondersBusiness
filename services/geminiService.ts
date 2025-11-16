import { GoogleGenAI, Type, Modality } from "@google/genai";

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const schema = {
  type: Type.OBJECT,
  properties: {
    fontFamily: {
      type: Type.STRING,
      description: "A font family name compatible with Google Fonts. e.g., 'Roboto', 'Montserrat', 'Lobster'."
    },
    description: {
      type: Type.STRING,
      description: "A brief, evocative description of the design style concept."
    },
    colorPalette: {
      type: Type.ARRAY,
      description: "An array of 3-5 hex color codes that complement the design. e.g., ['#FFFFFF', '#000000']",
      items: {
        type: Type.STRING
      }
    }
  },
  required: ['fontFamily', 'description', 'colorPalette'],
};

export interface DesignSuggestion {
    fontFamily: string;
    description: string;
    colorPalette: string[];
}

export const getDesignIdeas = async (name: string, stylePrompt: string): Promise<DesignSuggestion> => {
  try {
    const prompt = `You are an expert designer specializing in personalized nameplates. A customer wants a nameplate with the name "${name}". Their desired style is "${stylePrompt}". Based on this, generate a creative and appealing design concept. Provide your response in a JSON format that adheres to the provided schema. Suggest a font that is available on Google Fonts. The description should be exciting for the customer.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-pro",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: schema,
        temperature: 0.8,
      },
    });

    const jsonText = response.text.trim();
    const parsedJson = JSON.parse(jsonText);
    
    // Basic validation
    if (
      !parsedJson.fontFamily || 
      !parsedJson.description || 
      !Array.isArray(parsedJson.colorPalette)
    ) {
      throw new Error("Invalid JSON structure from API.");
    }

    return parsedJson as DesignSuggestion;

  } catch (error) {
    console.error("Error fetching design ideas from Gemini:", error);
    throw new Error("Failed to generate design ideas. Please try again.");
  }
};

export const generateImage = async (prompt: string): Promise<string> => {
  try {
    const fullPrompt = `Generate a high-quality, professional product photograph of a handmade craft item based on the following description: "${prompt}". The image should be on a clean, minimalist background (like light gray, beige, or off-white) to emphasize the product. The lighting should be soft and natural.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            text: fullPrompt,
          },
        ],
      },
      config: {
          responseModalities: [Modality.IMAGE],
      },
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return part.inlineData.data;
      }
    }
    
    throw new Error("No image data found in the API response.");

  } catch (error) {
    console.error("Error generating image with Gemini:", error);
    throw new Error("Failed to generate the image. Please try a different prompt.");
  }
};