import type { VercelRequest, VercelResponse } from "@vercel/node";
import { GoogleGenAI } from "@google/genai";
import { analyzeReflection } from "../server/lib/mockAI.js";
import type { ReflectionRecord } from "../src/types.js";

const apiKey = process.env.GEMINI_API_KEY;
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

function normalizeResult(result: any, originalText: string): ReflectionRecord {
  const recommendedMethod = result.recommendedMethod ?? result.recommendedTeachingMethod ?? "";
  const confidenceScore = typeof result.confidenceScore === "number" && !Number.isNaN(result.confidenceScore)
    ? result.confidenceScore
    : 0.65;

  return {
    id: Date.now().toString(36) + Math.random().toString(36).substring(2),
    timestamp: new Date().toISOString(),
    originalText,
    anonymizedText: result.anonymizedText ?? originalText,
    subject: result.subject ?? "Genel Eğitim",
    topic: result.topic ?? "Belirlenmemiş Konu",
    difficultQuestion: result.difficultQuestion ?? "Soru metinden otomatik çıkarılamadı.",
    questionType: result.questionType ?? "Kavramsal",
    misconception: result.misconception ?? "Belirgin bir yanılgı tespit edilemedi.",
    teacherResponse: result.teacherResponse ?? "Öğretmen yanıtı belirtilmedi.",
    teacherObservation: result.teacherObservation ?? "Öğretmen gözlemi belirtilmedi.",
    difficultyLevel: result.difficultyLevel ?? "Orta",
    recommendedMethod,
    privacyStatus: result.privacyStatus ?? "Needs Review",
    privacyExplanation: result.privacyExplanation,
    detectedSensitiveData: result.detectedSensitiveData ?? [],
    confidenceScore,
  };
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  try {
    const { text } = req.body ?? {};
    if (!text || typeof text !== "string") {
      res.status(400).json({ error: "Invalid text input" });
      return;
    }

    if (!ai) {
      const mock = analyzeReflection(text);
      res.status(200).json(mock);
      return;
    }

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
  "recommendedMethod": string,
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

    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          temperature: 0.2,
        },
      });

      const jsonStr = response.text;
      if (!jsonStr) {
        throw new Error("Empty response from LLM");
      }

      const parsed = JSON.parse(jsonStr);
      const normalized = normalizeResult(parsed, text);
      res.status(200).json(normalized);
      return;
    } catch (llmError) {
      console.error("LLM request failed, falling back to mock analysis:", llmError);
      const mock = analyzeReflection(text);
      res.status(200).json(mock);
      return;
    }
  } catch (error) {
    console.error("Analysis Error:", error);
    res.status(500).json({ error: "Failed to analyze reflection" });
  }
}
