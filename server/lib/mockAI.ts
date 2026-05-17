import type { ReflectionRecord } from "../../src/types";
import { analyzePrivacy } from "./anonymizer";

export const sampleReflections: string[] = [
  `Bugün 10-A sınıfında fizik dersinde Newton yasalarını anlattım. Mehmet birden 'Hocam, uzayda astronotlar süzülüyorsa yerçekimi yok demek değil mi?' diye sordu. Çoğu öğrencinin aklında bu yanılgı vardı, asansör metaforuyla serbest düşüşü anlattım. Ancak sınıfın yarısı hâlâ yerçekiminin sıfır olduğuna inanıyor, haftaya bir PhET simülasyonu açmam gerekecek.`,

  `11-B ile türev öncesi limit kavramına giriş yaptık. Ayşe ısrarla 'Sıfıra böldüğümüzde neden tanımsız diyoruz, sonsuz olması gerekmez mi?' diye sordu. Sonsuzun bir sayı değil, yönelim olduğunu grafikler çizerek gösterdim. Yine de soyut düşünmekte zorlanıyorlar, konuyu daha fazla günlük hayat örneğiyle desteklemeliyim.`,

  `9-C sınıfındaki biyoloji dersinde hücre bölünmesini işlerken Elif çok güzel bir soru sordu: 'Madem hücreler yaşlanıp ölüyor, kanser hücreleri nasıl ölümsüz oluyor?' Apoptozis mekanizmasının bozulmasını ve telomerazı kısaca açıkladım. Sınıfın dikkati aniden arttı, bu tür hastalık temelli örneklerin merak uyandırdığını gözlemledim.`,

  `12-A'da Kurtuluş Savaşı'nın örgütlenme dönemini işliyorduk. Ali biraz da çekinerek 'Mustafa Kemal padişahın emrine karşı geldiğinde o dönemin kanunlarına göre isyan etmiş olmuyor mu?' dedi. Tarihsel olayları bugünün değil, o günün olağanüstü şartlarıyla (işgal vs.) değerlendirmemiz gerektiğini birincil kaynaklar okutarak anlattım. Sınıftaki tartışma çok verimliydi.`,

  `10-B sınıfında Divan şiirini işlerken Zeynep, 'Hocam, bu şairler halktan bu kadar kopuksa neden edebiyatımızda bu kadar önemliler?' diye itiraz etti. Estetik değerin ve saray kültürünün de tarihsel mirasımızın bir parçası olduğunu açıkladım. Fuzuli'den verdiğim örnekler tam anlaşılmadı, sanırım günümüz Türkçesiyle daha fazla karşılaştırma yapmalıyım.`,

  `11-A'daki kimya dersinde mol kavramına giriş yaptım. Burak 'Hocam 6.02 çarpı 10 üzeri 23 sayısı tamamen uydurma bir sayı mı, neden düz bir sayı değil?' diye sordu. Karbon-12 izotopu üzerinden Avogadro sayısının nasıl hesaplandığını anlattım. Öğrencilerin büyük sayılarla işlem yapma pratiği çok eksik, bu yüzden konudan koptular.`,

  `Bugün 9-B sınıfında Türkiye'nin iklim tiplerini işledik. Hasan, 'Hocam, küresel ısınma yüzünden Türkiye yakında çöl olacak diyorlar, o zaman Karadeniz'de de mi yağmur yağmayacak?' diye sordu. İklim değişikliğinin her bölgeyi farklı etkilediğini, Karadeniz'de ani sel riskinin artabileceğini harita üzerinden anlattım. Öğrencilerin çoğu felaket senaryolarına inanmaya çok meyilli, bilimsel verilere odaklanmalarını sağlamam lazım. Velisinin 0555 123 45 67 numaralı telefonundan arayıp bu konudaki endişelerini konuşacağım.`,

  `10-C sınıfında Python'da döngüleri (for/while) anlattım. Selin, 'Hocam, bilgisayar sonsuz döngüye girince neden bozulmuyor da sadece donuyor? İçinde fiziksel bir çark mı sıkışıyor?' diye çok ilginç bir soru sordu. İşlemci ve bellek çalışma mantığını, işletim sisteminin süreci nasıl durdurduğunu Görev Yöneticisi'ni açarak gösterdim. Somut bir donanım örneği verince kafalarında çok daha net oturduğunu fark ettim. Özel öğrenme güçlüğü (disleksi) olan öğrenciler bile bu görsel anlatımla konuyu hemen kavradı.`
];



interface AnalysisTemplate {
  subjectKeywords: string[];
  subject: string;
  topic: string;
  difficultQuestion: string;
  questionType: "Kavramsal" | "Olgusal" | "Yordamsal" | "Üstbilişsel" | "Eleştirel Düşünme";
  misconception: string;
  teacherResponse: string;
  teacherObservation: string;
  difficultyLevel: "Kolay" | "Orta" | "Zor" | "Çok Zor";
  recommendedMethod: string;
  confidenceScore: number;
}

const analysisTemplates: AnalysisTemplate[] = [
  {
    subjectKeywords: ["fizik", "newton", "yerçekimi", "kuvvet", "hareket", "ivme", "hız"],
    subject: "Fizik",
    topic: "Newton Yasaları ve Yerçekimi",
    difficultQuestion: "Uzayda astronotlar neden havada süzülüyor? Yerçekimi yok mu?",
    questionType: "Kavramsal",
    misconception: "Uzay istasyonunda yerçekimi olmadığı düşüncesi. Gerçekte uzay istasyonundaki yerçekimi yeryüzünün yaklaşık %90'ı kadardır; ağırlıksızlık serbest düşüşten kaynaklanır.",
    teacherResponse: "Asansör örneği üzerinden serbest düşüş kavramını açıklama, mikro-yerçekimi ve orbital mekaniği sezgisel düzeyde anlatma.",
    teacherObservation: "Sınıfın yarısı kavramı anlayamadı. Simülasyon videosu ile desteklenmesi gerekiyor.",
    difficultyLevel: "Zor",
    recommendedMethod: "Simülasyon destekli öğretim, analoji kullanımı (asansör düşme senaryosu), PhET simülasyonları",
    confidenceScore: 0.87,
  },
  {
    subjectKeywords: ["matematik", "limit", "türev", "integral", "fonksiyon", "sıfır", "bölme", "sonsuz"],
    subject: "Matematik",
    topic: "Limit Kavramı ve Belirsizlik",
    difficultQuestion: "Sıfıra bölmek neden tanımsız? Sonuç sonsuz olmuyor mu?",
    questionType: "Kavramsal",
    misconception: "Sonsuzun bir sayı olduğu ve sıfıra bölümün sonsuz sonuç verdiği yanılgısı.",
    teacherResponse: "Grafik üzerinde limit davranışını gösterme, sezgisel epsilon-delta yaklaşımı, sonsuzun bir sayı olmadığını somut örneklerle açıklama.",
    teacherObservation: "Öğrenciler sonsuz kavramını somut bir sayı olarak algılıyor. Ek alıştırma materyali gerekli.",
    difficultyLevel: "Zor",
    recommendedMethod: "Grafik destekli anlatım, GeoGebra kullanımı, kademeli zorluk artışıyla alıştırma serileri",
    confidenceScore: 0.91,
  },
  {
    subjectKeywords: ["biyoloji", "hücre", "dna", "gen", "kanser", "mitoz", "mayoz", "protein"],
    subject: "Biyoloji",
    topic: "Hücre Bölünmesi ve Kanser Biyolojisi",
    difficultQuestion: "Kanser hücreleri neden ölmüyor? Normal hücreler ölüyorsa kanser hücreleri nasıl ölümsüz oluyor?",
    questionType: "Kavramsal",
    misconception: "Kanser hücrelerinin tamamen farklı bir yapıda olduğu düşüncesi. Aslında normal hücrelerin kontrol mekanizmalarının bozulmasıdır.",
    teacherResponse: "Apoptozis mekanizması, telomeraz enzimi ve tümör baskılayıcı genlerin basit dille açıklanması.",
    teacherObservation: "Öğrenciler ileri düzey konulara ilgi gösterdi. Belgesel ve ek kaynaklar önerildi.",
    difficultyLevel: "Çok Zor",
    recommendedMethod: "Görselleştirme (animasyon/belgesel), soru-cevap yöntemi, güncel araştırma makaleleri ile bağlam oluşturma",
    confidenceScore: 0.82,
  },
  {
    subjectKeywords: ["tarih", "savaş", "osmanlı", "cumhuriyet", "kurtuluş", "atatürk", "padişah", "devrim"],
    subject: "Tarih",
    topic: "Kurtuluş Savaşı ve Millî Egemenlik",
    difficultQuestion: "Mustafa Kemal neden padişaha karşı geldi? Bu vatan hainliği sayılmaz mı?",
    questionType: "Eleştirel Düşünme",
    misconception: "Tarihsel olayları günümüz değer yargılarıyla yargılama, dönemin siyasi bağlamını göz ardı etme.",
    teacherResponse: "Kronolojik anlatım, birincil kaynaklardan alıntılar, dönemin koşullarının analizi, eleştirel düşünme tartışması.",
    teacherObservation: "Hassas konularda dikkatli ve çok perspektifli yaklaşım gerekiyor. Tartışma ortamı verimli oldu.",
    difficultyLevel: "Zor",
    recommendedMethod: "Birincil kaynak analizi, tartışma yöntemi, kronolojik çizelge kullanımı, empati haritası",
    confidenceScore: 0.85,
  },
  {
    subjectKeywords: ["edebiyat", "türkçe", "divan", "halk", "şiir", "roman", "hikaye", "dil"],
    subject: "Türk Dili ve Edebiyatı",
    topic: "Divan Edebiyatı vs. Halk Edebiyatı",
    difficultQuestion: "Divan edebiyatı halktan kopuksa neden onu öğreniyoruz?",
    questionType: "Eleştirel Düşünme",
    misconception: "Günümüz değerleriyle geçmiş edebiyat eserlerini yargılama, kültürel mirasın sadece popüler olandan ibaret olduğu düşüncesi.",
    teacherResponse: "Edebiyatın tarihsel bağlamda değerlendirilmesi, estetik değerin evrenselliği, karşılaştırmalı metin okuma.",
    teacherObservation: "Karşılaştırmalı okuma etkinliği öğrencilerin bakış açısını genişletti.",
    difficultyLevel: "Orta",
    recommendedMethod: "Karşılaştırmalı metin analizi, yaratıcı yazma atölyeleri, dönem bağlamı sunumu",
    confidenceScore: 0.89,
  },
  {
    subjectKeywords: ["kimya", "atom", "mol", "element", "bileşik", "reaksiyon", "avogadro"],
    subject: "Kimya",
    topic: "Mol Kavramı ve Avogadro Sayısı",
    difficultQuestion: "Bir mol neden 6.02 × 10²³? Bu sayı tamamen uydurma bir sayı mı?",
    questionType: "Olgusal",
    misconception: "Mol sayısının keyfi bir sayı olduğu düşüncesi. Aslında deneysel olarak belirlenmiş bir doğa sabitidir.",
    teacherResponse: "Avogadro sayısının tarihsel keşfi, 12 gram karbon-12 referansı.",
    teacherObservation: "Öğrenciler büyük sayılarla soyut düşünmekte ve işlem yapmakta zorlanıyor.",
    difficultyLevel: "Orta",
    recommendedMethod: "Analoji temelli öğretim, ölçek karşılaştırmaları",
    confidenceScore: 0.88,
  },
  {
    subjectKeywords: ["coğrafya", "iklim", "harita", "çöl", "küresel ısınma", "yağış", "deprem", "dağ"],
    subject: "Coğrafya",
    topic: "İklim Tipleri ve Küresel Isınma",
    difficultQuestion: "Küresel ısınma yüzünden Türkiye çöl olacaksa, Karadeniz'de yağmur yağmayacak mı?",
    questionType: "Kavramsal",
    misconception: "Küresel ısınmanın her yerde sadece kuraklık ve çölleşme yaratacağı yanılgısı. Aşırı hava olayları ve bölgesel sel riskleri göz ardı ediliyor.",
    teacherResponse: "İklim değişikliğinin bölgesel farklılıklarını harita üzerinden anlatma, Karadeniz'de sel riskinin artabileceğini belirtme.",
    teacherObservation: "Öğrenciler medyadan duydukları felaket senaryolarına eğilimli, bilimsel verilere odaklanmaları gerekiyor.",
    difficultyLevel: "Orta",
    recommendedMethod: "İnteraktif iklim haritaları kullanımı, bilimsel veri okuma etkinlikleri",
    confidenceScore: 0.88,
  },
  {
    subjectKeywords: ["bilgisayar", "python", "döngü", "while", "for", "algoritma", "kodlama", "yazılım"],
    subject: "Bilgisayar Bilimi",
    topic: "Algoritmalar ve Döngüler (Loops)",
    difficultQuestion: "Bilgisayar sonsuz döngüye girince neden bozulmuyor da sadece donuyor? İçinde çark mı sıkışıyor?",
    questionType: "Kavramsal",
    misconception: "Yazılımsal hataların (sonsuz döngü) doğrudan mekanik bir arıza olduğu (çark sıkışması gibi) algısı.",
    teacherResponse: "İşlemci (CPU) döngüleri ve RAM kullanımı hakkında temel açıklama, Görev Yöneticisi üzerinden canlı demonstrasyon.",
    teacherObservation: "Soyut yazılım kavramları (döngüler) donanım arayüzü üzerinden gösterildiğinde (CPU grafiği) daha kolay anlaşılıyor.",
    difficultyLevel: "Kolay",
    recommendedMethod: "Görev Yöneticisi / Activity Monitor ile uygulamalı demonstrasyon, CPU kullanım grafiği incelemesi",
    confidenceScore: 0.92,
  }
];

function detectSubject(text: string): AnalysisTemplate {
  const lowerText = text.toLowerCase();

  let bestMatch: AnalysisTemplate | null = null;
  let bestScore = 0;

  for (const template of analysisTemplates) {
    let score = 0;
    for (const keyword of template.subjectKeywords) {
      if (lowerText.includes(keyword)) {
        score++;
      }
    }
    if (score > bestScore) {
      bestScore = score;
      bestMatch = template;
    }
  }

  if (!bestMatch || bestScore === 0) {
    return {
      subjectKeywords: [],
      subject: "Genel Eğitim",
      topic: "Belirlenmemiş Konu",
      difficultQuestion: extractQuestion(text),
      questionType: "Kavramsal",
      misconception: "Belirgin bir yanılgı tespit edilemedi. Metin daha detaylı analiz gerektiriyor.",
      teacherResponse: "Öğretmenin verdiği yanıt metinden çıkarılmıştır.",
      teacherObservation: "Öğretmen gözlemi metinden çıkarılmıştır.",
      difficultyLevel: "Orta",
      recommendedMethod: "Aktif öğrenme yöntemleri, soru-cevap tekniği, grup tartışması",
      confidenceScore: 0.65,
    };
  }

  return bestMatch;
}

function extractQuestion(text: string): string {
  const questionPatterns = [
    /[""]([^""]*\?)[""]/g,
    /["""]([^"""]*\?)["""]/g,
    /"([^"]*\?)"/g,
  ];

  for (const pattern of questionPatterns) {
    const matches = [...text.matchAll(pattern)];
    if (matches.length > 0) {
      return matches[0][1];
    }
  }

  const sentences = text.split(/[.!]/);
  const questionSentence = sentences.find(s => s.includes("?"));
  if (questionSentence) {
    return questionSentence.trim();
  }

  return "Soru metinden otomatik çıkarılamadı.";
}

export function analyzeReflection(text: string): ReflectionRecord {
  const privacyResult = analyzePrivacy(text);
  const template = detectSubject(text);
  const extractedQuestion = extractQuestion(text);

  const id = `PH-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;

  return {
    id,
    timestamp: new Date().toISOString(),
    originalText: text,
    anonymizedText: privacyResult.anonymizedText,
    subject: template.subject,
    topic: template.topic,
    difficultQuestion: extractedQuestion !== "Soru metinden otomatik çıkarılamadı." ? extractedQuestion : template.difficultQuestion,
    questionType: template.questionType,
    misconception: template.misconception,
    teacherResponse: template.teacherResponse,
    teacherObservation: template.teacherObservation,
    difficultyLevel: template.difficultyLevel,
    recommendedMethod: template.recommendedMethod,
    privacyStatus: privacyResult.privacyStatus,
    privacyExplanation: privacyResult.privacyExplanation,
    detectedSensitiveData: privacyResult.detectedSensitiveData,
    confidenceScore: template.confidenceScore + (Math.random() * 0.06 - 0.03),
  };
}

export function searchRecords(records: ReflectionRecord[], query: string): ReflectionRecord[] {
  const lowerQuery = query.toLowerCase();
  return records.filter(
    (r) =>
      r.subject.toLowerCase().includes(lowerQuery) ||
      r.topic.toLowerCase().includes(lowerQuery) ||
      r.difficultQuestion.toLowerCase().includes(lowerQuery) ||
      r.misconception.toLowerCase().includes(lowerQuery) ||
      r.recommendedMethod.toLowerCase().includes(lowerQuery)
  );
}

export function findSimilarRecords(records: ReflectionRecord[], current: ReflectionRecord): ReflectionRecord[] {
  return records.filter(
    (r) => r.id !== current.id && (r.subject === current.subject || r.topic === current.topic)
  );
}
