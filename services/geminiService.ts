
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function interpretNoteAI(note: string) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `User medicine list note: "${note}".
      Identify the medicines mentioned and the QUANTITY specified for each (e.g., "5 pieces", "১০টা", "5 pish"). 
      If no quantity is mentioned, default to 1.
      For each medicine, identify its per-unit price (for 1 single tablet/piece). 
      Return a list of items with name, per-piece price, category, and the quantity found in the text.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            items: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  price: { type: Type.NUMBER, description: "Price for 1 single tablet/piece" },
                  category: { type: Type.STRING },
                  quantity: { type: Type.NUMBER, description: "Quantity requested by the user. Default to 1 if not specified." }
                },
                required: ["name", "price", "category", "quantity"]
              }
            }
          },
          required: ["items"]
        }
      }
    });

    return JSON.parse(response.text);
  } catch (error) {
    console.error("AI Note Interpretation Error:", error);
    return null;
  }
}

export async function searchMedicinesAI(query: string) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `You are a helpful pharmacist in Bangladesh. Query: "${query}". 
      Respond in Bengali. Provide 3-5 medicines with per-unit price estimates.
      Include a disclaimer.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            medicines: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  description: { type: Type.STRING },
                  category: { type: Type.STRING }
                },
                required: ["name", "description", "category"]
              }
            },
            disclaimer: { type: Type.STRING }
          },
          required: ["medicines", "disclaimer"]
        }
      }
    });

    return JSON.parse(response.text);
  } catch (error) {
    console.error("AI Search Error:", error);
    return null;
  }
}
