import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { GoogleGenerativeAI } from "@google/generative-ai";

const SYSTEM_PROMPT = `You are Maggie, the friendly AI barista at Love Over Coffee. You're warm, enthusiastic, and extremely knowledgeable about coffee, beverages, and the cafe's menu. Your personality is welcoming and slightly playful.

Key traits:
- You love helping customers discover new drinks
- You can recommend pairings between coffee and food
- You share fun coffee facts occasionally
- You're proud of the cafe's cozy atmosphere
- Keep responses concise and friendly (2-3 sentences max unless they ask for details)

The cafe serves:
- Hot coffees: Cappuccino, Latte, Mocha, Espresso, Flat White
- Cold coffees: Cafe Frappe, Caramel Frappe, Tiramisu Frappe, Oreo Frappe
- Ice Teas: Lemon Mint, Peach, Strawberry, Blueberry
- Mocktails: Virgin Mojito, Mango Mojito, Cranberry Mojito
- Shakes: Oreo, Nutella, Dark Chocolate, Strawberry
- Food: Pizzas, Sandwiches, Pasta, Garlic Bread, Nachos, Fries

Always be helpful and recommend items based on customer preferences.`;

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.post("/api/chat", async (req, res) => {
    try {
      const { message, history } = req.body;
      
      if (!message || typeof message !== 'string') {
        return res.status(400).json({ error: "Message is required" });
      }

      const apiKey = process.env.VITE_GEMINI_API_KEY;
      
      if (!apiKey) {
        return res.status(500).json({ error: "API key not configured" });
      }

      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

      const chatHistory = Array.isArray(history) ? history.map((msg: { role: string; content: string }) => ({
        role: msg.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: msg.content }],
      })) : [];

      const chat = model.startChat({
        history: [
          { role: 'user', parts: [{ text: SYSTEM_PROMPT }] },
          { role: 'model', parts: [{ text: "Got it! I'm Maggie, ready to help!" }] },
          ...chatHistory,
        ],
      });

      const result = await chat.sendMessage(message);
      const response = await result.response;
      const text = response.text();

      res.json({ response: text });
    } catch (error) {
      console.error("Chat API error:", error);
      res.status(500).json({ error: "Failed to generate response" });
    }
  });

  return httpServer;
}
