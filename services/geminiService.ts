
import { GoogleGenAI, Type } from "@google/genai";
import type { Joke } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const schema = {
  type: Type.OBJECT,
  properties: {
    joke_darija: {
      type: Type.STRING,
      description: 'The joke in Moroccan Darija using Arabic script.'
    },
    joke_transliteration: {
      type: Type.STRING,
      description: 'Transliteration of the Darija joke into Latin characters.'
    },
    joke_english: {
      type: Type.STRING,
      description: 'English translation of the joke.'
    }
  },
  required: ['joke_darija', 'joke_transliteration', 'joke_english']
};


export const generateDarijaJoke = async (): Promise<Joke> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: "Generate a short, family-friendly, and culturally appropriate joke in Moroccan Darija. The joke should be simple and easy to understand. Provide the output as a JSON object with three keys: 'joke_darija' (the joke in Arabic script), 'joke_transliteration' (a simple Latin alphabet transliteration), and 'joke_english' (an English translation).",
      config: {
        responseMimeType: "application/json",
        responseSchema: schema,
      },
    });

    const jokeText = response.text.trim();
    const parsedJoke = JSON.parse(jokeText);

    // Basic validation to ensure the parsed object matches the Joke structure
    if (
        typeof parsedJoke.joke_darija === 'string' &&
        typeof parsedJoke.joke_transliteration === 'string' &&
        typeof parsedJoke.joke_english === 'string'
    ) {
        return parsedJoke as Joke;
    } else {
        throw new Error("AI response did not match the expected format.");
    }
  } catch (error) {
    console.error("Error generating joke from Gemini API:", error);
    throw new Error("Failed to fetch or parse joke from the AI service.");
  }
};
