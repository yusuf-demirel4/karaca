export interface PrivacyAnalysisResult {
  detectedSensitiveData: string[];
  anonymizedText: string;
  privacyStatus: "Safe" | "Needs Review" | "High Risk";
  privacyExplanation: string;
}

const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
const phoneRegex = /(?:\+90|0)?\s*5\d{2}\s*\d{3}\s*\d{2}\s*\d{2}/g;
const classRegex = /\b(?:[1-9]|1[0-2])\s*[-/]?\s*[A-Z]\b/gi;
const schoolRegex = /[A-ZÇĞİÖŞÜ][a-zçğıöşü]+\s+(?:Lisesi|Ortaokulu|İlkokulu|Koleji|Fen Lisesi|Anadolu Lisesi)\b/g;
const healthKeywords = ["DEHB", "disleksi", "otizm", "kaynaştırma", "astım", "diyabet", "kriz", "engelli"];

// Mock names dictionary for MVP
const knownNames = [
  "Mehmet", "Ayşe", "Elif", "Ali", "Zeynep", "Burak", "Fatma", "Emre", "Ahmet", "Selin", 
  "Mustafa", "Hüseyin", "Kemal", "Hasan", "İbrahim", "Can", "Canan", "Veli"
];

// Names that should NOT be anonymized in an educational context
const historicalNames = ["Mustafa Kemal", "Atatürk", "Fuzuli", "Yunus Emre", "Avogadro", "Newton", "Einstein"];

const knownLocations = [
  "İstanbul", "Ankara", "İzmir", "Bursa", "Antalya", "Adana", "Konya", "Kadıköy", "Çankaya", "Keçiören", "Şişli", "Beşiktaş"
];

export function analyzePrivacy(text: string): PrivacyAnalysisResult {
  let anonymizedText = text;
  const detectedData = new Set<string>();
  let hasHealthData = false;
  let hasDirectContact = false;

  // 1. Phone numbers
  const phones = text.match(phoneRegex);
  if (phones) {
    phones.forEach(p => {
      detectedData.add(p);
      anonymizedText = anonymizedText.replace(p, "[TELEFON]");
      hasDirectContact = true;
    });
  }

  // 2. Emails
  const emails = text.match(emailRegex);
  if (emails) {
    emails.forEach(e => {
      detectedData.add(e);
      anonymizedText = anonymizedText.replace(e, "[E-POSTA]");
      hasDirectContact = true;
    });
  }

  // 3. Schools
  const schools = text.match(schoolRegex);
  if (schools) {
    schools.forEach(s => {
      detectedData.add(s);
      anonymizedText = anonymizedText.replace(s, "[OKUL]");
    });
  }

  // 4. Locations
  knownLocations.forEach(loc => {
    const locRegex = new RegExp(`\\b${loc}\\b`, "gi");
    const matches = anonymizedText.match(locRegex);
    if (matches) {
      matches.forEach(m => {
        detectedData.add(m);
        // Replace all occurrences of this location
        anonymizedText = anonymizedText.replace(locRegex, "[KONUM]");
      });
    }
  });

  // 5. Class identifiers
  const classes = text.match(classRegex);
  if (classes) {
    classes.forEach(c => {
      detectedData.add(c);
      anonymizedText = anonymizedText.replace(c, "[SINIF]");
    });
  }

  // 6. Names
  // Protect historical names first by temporarily replacing them
  historicalNames.forEach(hn => {
    anonymizedText = anonymizedText.replaceAll(hn, `__HISTORICAL_${hn.replace(/\s+/g, "")}__`);
  });

  knownNames.forEach(name => {
    const nameRegex = new RegExp(`\\b${name}\\b`, "g"); // Match exact word
    const matches = anonymizedText.match(nameRegex);
    if (matches) {
      matches.forEach(m => {
        detectedData.add(m);
        // Simple heuristic: we replace with [ÖĞRENCİ] for this MVP
        anonymizedText = anonymizedText.replace(m, "[ÖĞRENCİ]");
      });
    }
  });

  // Restore historical names
  historicalNames.forEach(hn => {
    anonymizedText = anonymizedText.replaceAll(`__HISTORICAL_${hn.replace(/\s+/g, "")}__`, hn);
  });

  // 7. Health Info
  healthKeywords.forEach(kw => {
    const kwRegex = new RegExp(`\\b${kw}\\b`, "gi");
    if (kwRegex.test(anonymizedText)) {
      hasHealthData = true;
      const matches = anonymizedText.match(kwRegex);
      if (matches) {
        matches.forEach(m => detectedData.add(m));
        anonymizedText = anonymizedText.replace(kwRegex, "[SAĞLIK/ÖZEL DURUM]");
      }
    }
  });

  // Determine privacy status and explanation
  let privacyStatus: "Safe" | "Needs Review" | "High Risk" = "Safe";
  let privacyExplanation = "Kişisel veri tespit edilmedi.";

  if (hasHealthData) {
    privacyStatus = "High Risk";
    privacyExplanation = "Öğrenci sağlık veya özel durum bilgisi tespit edildi. Bu verilerin saklanması yüksek risklidir.";
  } else if (hasDirectContact || schools) {
    privacyStatus = "Needs Review";
    privacyExplanation = "Doğrudan iletişim bilgisi veya kurum adı tespit edildi ve anonimleştirildi, ancak gözden geçirilmesi önerilir.";
  } else if (detectedData.size > 0) {
    privacyStatus = "Safe";
    privacyExplanation = "Öğrenci, sınıf veya konum gibi kişisel veriler saklanmadan önce başarıyla anonimleştirildi.";
  }

  return {
    detectedSensitiveData: Array.from(detectedData),
    anonymizedText,
    privacyStatus,
    privacyExplanation
  };
}
