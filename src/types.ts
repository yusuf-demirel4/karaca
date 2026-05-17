export interface ReflectionRecord {
  id: string;
  timestamp: string;
  originalText: string;
  anonymizedText: string;
  subject: string;
  topic: string;
  difficultQuestion: string;
  questionType: "Kavramsal" | "Olgusal" | "Yordamsal" | "Üstbilişsel" | "Eleştirel Düşünme";
  misconception: string;
  teacherResponse: string;
  teacherObservation: string;
  difficultyLevel: "Kolay" | "Orta" | "Zor" | "Çok Zor";
  recommendedMethod: string;
  privacyStatus: "Safe" | "Needs Review" | "High Risk" | "Anonimleştirildi" | "Kişisel Veri Yok";
  privacyExplanation?: string;
  detectedSensitiveData?: string[];
  confidenceScore: number;
}

