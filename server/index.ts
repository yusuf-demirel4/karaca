import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { analyzeReflection } from "./lib/mockAI";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3000;
const DATA_FILE = path.join(process.cwd(), "server", "data", "records.json");

// Initialize Google Gen AI if key exists
const apiKey = process.env.GEMINI_API_KEY;
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

// Ensure data file exists
if (!fs.existsSync(path.dirname(DATA_FILE))) {
  fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true });
}
if (!fs.existsSync(DATA_FILE)) {
  fs.writeFileSync(DATA_FILE, JSON.stringify([]));
}

app.post("/api/analyze-reflection", async (req, res) => {
  try {
    const { text } = req.body;
    if (!text || typeof text !== "string") {
      return res.status(400).json({ error: "Invalid text input" });
    }

    if (ai) {
      console.log("Using real LLM (Gemini) for analysis...");
      const prompt = `
You are an educational analysis assistant. Your job is to transform Turkish teacher reflections into anonymized pedagogical memory records. You must protect privacy, avoid overclaiming, and never treat subjective teacher observations as objective student success measurements.

User input:
${text}

Return only this JSON schema:
{
  "subject": string,
  "topic": string,
  "difficultQuestion": string,
  "questionType": string,
  "misconception": string,
  "teacherResponse": string,
  "teacherObservation": string,
  "difficultyLevel": "Kolay" | "Orta" | "Zor" | "Çok Zor",
  "recommendedTeachingMethod": string,
  "privacyStatus": "Safe" | "Needs Review" | "High Risk",
  "anonymizedText": string,
  "detectedSensitiveData": string[],
  "confidenceScore": number
}

Rules:
- Do not include markdown.
- Do not include explanations outside JSON.
- If the input contains names, class IDs, school names, or locations, anonymize them.
- If the input is too vague, return a lower confidence score.
- If scientific accuracy is uncertain, recommend teacher review.
- Keep all field values in Turkish.
      `;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          temperature: 0.2,
        }
      });

      const jsonStr = response.text;
      if (!jsonStr) {
        throw new Error("Empty response from LLM");
      }
      
      const result = JSON.parse(jsonStr);
      // Ensure ID and timestamp exist
      result.id = Date.now().toString(36) + Math.random().toString(36).substring(2);
      result.timestamp = new Date().toISOString();
      result.originalText = text;
      
      return res.json(result);
    } else {
      console.log("No GEMINI_API_KEY found. Falling back to mock AI logic...");
      const result = analyzeReflection(text);
      return res.json(result);
    }
  } catch (error) {
    console.error("Analysis Error:", error);
    res.status(500).json({ error: "Failed to analyze reflection" });
  }
});

app.post("/api/records", (req, res) => {
  try {
    const { record } = req.body;
    if (!record || !record.id) {
      return res.status(400).json({ error: "Invalid record data" });
    }

    const records = JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));
    
    // Prevent duplicates
    if (!records.find((r: any) => r.id === record.id)) {
      records.unshift(record);
      fs.writeFileSync(DATA_FILE, JSON.stringify(records, null, 2));
    }
    
    res.json({ success: true, record });
  } catch (error) {
    console.error("Save Error:", error);
    res.status(500).json({ error: "Failed to save record" });
  }
});

app.get("/api/records", (req, res) => {
  try {
    const records = JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));
    res.json(records);
  } catch (error) {
    console.error("Fetch Error:", error);
    res.status(500).json({ error: "Failed to fetch records" });
  }
});

app.delete("/api/records/:id", (req, res) => {
  try {
    const { id } = req.params;
    let records = JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));
    records = records.filter((r: any) => r.id !== id);
    fs.writeFileSync(DATA_FILE, JSON.stringify(records, null, 2));
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete record" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`LLM Mode: ${ai ? "Real (Gemini API)" : "Mock (Fallback)"}`);
});
