import { useState } from "react";
import { Send, FileText, Sparkles, AlertCircle } from "lucide-react";
const sampleReflections = [
  "Bugün 10-A sınıfında fizik dersinde Newton'un ikinci yasasını işledik. Mehmet, uzayda astronotlar neden havada süzülüyor diye sordu.",
  "Matematik dersinde limit kavramına giriş yaptık. Öğrenciler x sıfıra yaklaşırken neden 0/0 belirsizliği olduğunu anlamakta çok zorlandı.",
  "Biyoloji dersinde hücre bölünmesini anlattım. Ayşe, mitoz ve mayoz arasındaki farkı sordu ama krossing over olayını tam kavrayamadı.",
  "Tarih dersinde Kurtuluş Savaşı cephelerini işledik. Ali, güney cephesinde neden düzenli ordu olmadığını sordu.",
  "Edebiyat dersinde Divan ve Halk edebiyatını karşılaştırdık. Öğrenciler aruz ölçüsünü anlamakta çok zorlanıyor.",
  "Kimya dersinde mol kavramını anlattım. 11-B sınıfı avogadro sayısının neden o kadar büyük bir sayı olduğunu sordu.",
  "Bilgisayar bilimi dersinde döngüleri işledik. For ve while arasındaki farkı anlamakta zorlandılar."
];

interface ReflectionInputProps {
  onSubmit: (text: string) => void;
  isAnalyzing: boolean;
}

export default function ReflectionInput({ onSubmit, isAnalyzing }: ReflectionInputProps) {
  const [text, setText] = useState("");
  const [selectedSample, setSelectedSample] = useState<number | null>(null);

  const handleSubmit = () => {
    if (text.trim().length < 50) return;
    onSubmit(text.trim());
    setText("");
    setSelectedSample(null);
  };

  const loadSample = (index: number) => {
    setText(sampleReflections[index]);
    setSelectedSample(index);
  };

  const sampleLabels = [
    "Fizik — Newton",
    "Matematik — Limit",
    "Biyoloji — Hücre",
    "Tarih — Kurtuluş",
    "Edebiyat — Divan",
    "Kimya — Mol",
    "Coğrafya — İklim",
    "Bilgisayar — Döngü"
  ];

  return (
    <div className="w-full p-6">
      <div className="mb-10 text-center md:text-left">
        <h2 className="text-2xl font-medium tracking-tight text-surface-900 mb-2">Ders Yansıması</h2>
        <p className="text-surface-500 font-light tracking-wide text-sm">
          Ders sonrası kısa bir yansıma yazın. Öğrencilerin zorlandığı soruları ve verdiğiniz cevapları içerebilir.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-surface-100 p-6 mb-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <FileText className="w-4 h-4 text-surface-400" />
          <h3 className="text-sm font-medium tracking-wide text-surface-700">Yansıma Metni</h3>
        </div>
        <textarea
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            setSelectedSample(null);
          }}
          placeholder="Bugün derste ne oldu? Öğrenciler hangi sorularla zorlandı? Nasıl bir açıklama yaptınız?&#10;&#10;Örnek: 'Bugün 10-A sınıfında fizik dersinde Newton'un ikinci yasasını işledik. Mehmet, uzayda astronotlar neden havada süzülüyor diye sordu...'"
          className="w-full h-48 p-4 bg-[#fbfbfd] border border-surface-200 rounded-xl text-sm text-surface-900 leading-relaxed resize-none focus:outline-none focus:ring-1 focus:ring-surface-900 focus:border-surface-900 placeholder:text-surface-400 transition-shadow font-light tracking-wide"
          disabled={isAnalyzing}
        />
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-2">
            {text.trim().length < 50 && text.trim().length > 0 && (
              <div className="flex items-center gap-1.5 text-warning-500">
                <AlertCircle className="w-3.5 h-3.5" />
                <span className="text-xs">En az 50 karakter gerekli ({text.trim().length}/50)</span>
              </div>
            )}
          </div>
          <span className="text-xs text-surface-400">{text.length} karakter</span>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-surface-100 p-6 mb-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-4 h-4 text-surface-400" />
          <h3 className="text-sm font-medium tracking-wide text-surface-700">Örnek Yansımalar</h3>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-2 gap-2">
          {sampleLabels.map((label, index) => (
            <button
              key={index}
              onClick={() => loadSample(index)}
              disabled={isAnalyzing}
              className={`text-left px-4 py-3 rounded-xl border text-sm transition-colors font-light tracking-wide ${
                selectedSample === index
                  ? "border-surface-900 bg-surface-900 text-white"
                  : "border-surface-200 bg-[#fbfbfd] text-surface-600 hover:bg-surface-100"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={handleSubmit}
        disabled={text.trim().length < 50 || isAnalyzing}
        className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-surface-900 text-white rounded-full text-sm font-medium tracking-wide hover:bg-black transition-colors disabled:bg-surface-200 disabled:text-surface-400 disabled:cursor-not-allowed"
      >
        {isAnalyzing ? (
          <>
            <div className="w-4 h-4 border-2 border-surface-400 border-t-white rounded-full animate-spin" />
            Analiz ediliyor...
          </>
        ) : (
          <>
            <Send className="w-4 h-4" />
            Yapay Zekâ ile Analiz Et
          </>
        )}
      </button>
    </div>
  );
}
