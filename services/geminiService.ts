
import { GoogleGenAI, Chat, GenerateContentResponse as GeminiGenerateContentResponseSDK } from "@google/genai";
import { BOT_SYSTEM_INSTRUCTION } from '../constants';
import { GeminiGenerateContentResponse, Candidate } from '../types'; // Ensure Candidate is imported if used in GeminiGenerateContentResponse

// IMPORTANT: API_KEY must be set as an environment variable
const API_KEY = process.env.API_KEY;

export class GeminiService {
  private ai: GoogleGenAI;
  private chat: Chat | null = null;
  private modelName = 'gemini-2.5-flash-preview-04-17';

  constructor() {
    if (!API_KEY) {
      console.error("API_KEY for Gemini is not set. Please ensure process.env.API_KEY is available.");
      throw new Error("Gemini API Key is not configured.");
    }
    this.ai = new GoogleGenAI({ apiKey: API_KEY });
  }

  private async initializeChat(): Promise<void> {
    if (!this.chat) {
      // Check if ai object is initialized, though constructor should handle it
      if (!this.ai) {
        throw new Error("GoogleGenAI instance not initialized before creating chat.");
      }
      this.chat = this.ai.chats.create({
        model: this.modelName,
        config: {
          systemInstruction: BOT_SYSTEM_INSTRUCTION,
          // Example: to enable Google Search grounding
          // tools: [{googleSearch: {}}],
          // Note: If using googleSearch, do not set responseMimeType to "application/json"
          // For general IT support, systemInstruction and prompt engineering are primary.
        },
      });
    }
  }

  public async sendMessage(message: string): Promise<GeminiGenerateContentResponse> {
    await this.initializeChat();
    if (!this.chat) {
      // This should ideally not happen if initializeChat is awaited properly and succeeds.
      throw new Error("Chat session not initialized. Cannot send message.");
    }

    try {
      const result: GeminiGenerateContentResponseSDK = await this.chat.sendMessage({message: message});
      // Ensure the result structure matches what GeminiGenerateContentResponse expects.
      // The SDK's GenerateContentResponse has a `text` accessor for the main text.
      // Candidates are also part of the SDK response.
      return {
        text: result.text, // Access text directly via the accessor
        candidates: result.candidates as Candidate[] | undefined // Cast to our local Candidate type if necessary
      };
    } catch (error) {
      console.error("Error sending message to Gemini:", error);
      if (error instanceof Error) {
        // More specific error handling could be added here for different error types from Gemini
        throw new Error(`Gemini API Error: ${error.message}`);
      }
      throw new Error("An unexpected error occurred while communicating with the AI.");
    }
  }

  // Example of a one-off generation if not using chat history
  public async generateContent(prompt: string): Promise<GeminiGenerateContentResponse> {
    if (!this.ai) {
        throw new Error("GoogleGenAI instance not initialized.");
    }
    try {
      const result: GeminiGenerateContentResponseSDK = await this.ai.models.generateContent({
        model: this.modelName,
        contents: prompt,
        config: {
          systemInstruction: BOT_SYSTEM_INSTRUCTION,
        }
      });
      return {
        text: result.text,
        candidates: result.candidates as Candidate[] | undefined
      };
    } catch (error) {
      console.error("Error generating content from Gemini:", error);
      if (error instanceof Error) {
        throw new Error(`Gemini API Error: ${error.message}`);
      }
      throw new Error("An unexpected error occurred while generating content.");
    }
  }
}
