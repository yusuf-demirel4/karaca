import { useState } from "react";
import { Send, FileText, Sparkles, AlertCircle, Zap } from "lucide-react";

const DEMO_SCENARIO = `Bugün fizik dersinde bir ogrenci "Mutlak sıfırda zaman durur mu?" diye sordu. Bazı ogrenciler sicaklik ve enerji farkini karistirdi. Sicakligin parcacik hareketi oldugunu, zamanin farkli bir fiziksel buyukluk oldugunu anlattim. Ancak sinifin cogu hala "her sey donarsa zaman da donar" diye dusunuyor.`;

const sampleReflections = [
  "Bugün 10-A sinifinda fizik dersinde Newton'un ikinci yasasini isledik. Mehmet, uzayda astronotlar neden havada suzuluyor diye sordu. Asansor ornegiyle serbest dusus kavramini anlattim ama sinifin yarisi hala yercekiminin sifir olduguna inaniyor.",
  "Matematik dersinde limit kavramina giris yaptik. Ayse israrla sifira bolduğumuzde neden tanimsiz diyoruz sonsuz olmasi gerekmez mi diye sordu. Sonsuzun bir sayi degil yonelim oldugunu grafikler cizerek gosterdim.",
  "Biyoloji dersinde hucre bolunmesini anlatirken Elif cok guzel bir soru sordu: Madem hucreler yaslanip oluyor kanser hucreleri nasil olumsuz oluyor? Apoptozis mekanizmasini basit dille anlattim.",
  "Tarih dersinde Kurtulus Savasi'nin orgutlenme donemini islerken Ali, Mustafa Kemal padisahin emrine karsi geldiginde isyan etmis olmuyor mu dedi. Tarihsel olaylari o gunun kosullariyla degerlendirmemiz gerektigini kaynaklar okutarak anlattim.",
  "Edebiyat dersinde Divan siirini islerken Zeynep, bu sairler halktan bu kadar kopuksa neden edebiyatimizda bu kadar onemliler diye itiraz etti. Estetik degerin tarihsel mirasimizin parcasi oldugunu Fuzuli ornekleriyle anlattim.",
  "Kimya dersinde mol kavramina giris yaptim. Burak, 6.02 carpi 10 uzeri 23 sayisi tamamen uydurma bir sayi mi neden duz bir sayi degil diye sordu. Karbon-12 izotopu uzerinden Avogadro sayisinin nasil hesaplandığını anlattim.",
  "Bilgisayar bilimi dersinde Python dongülerini anlattim. Selin, bilgisayar sonsuz donguye girince neden bozulmuyor da sadece donuyor icinde fiziksel bir cark mi sikisiyor diye sordu. Gorev Yoneticisi uzerinden CPU kullanimini gosterdim."
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

  const loadDemoScenario = () => {
    setText(DEMO_SCENARIO);
    setSelectedSample(null);
  };

  const sampleLabels = [
    "Fizik — Newton",
    "Matematik — Limit",
    "Biyoloji — Hucre",
    "Tarih — Kurtulus",
    "Edebiyat — Divan",
    "Kimya — Mol",
    "Bilgisayar — Dongu"
  ];

  return (
    <div className="w-full p-6">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold tracking-tight text-surface-900 mb-2">Ders Yansimasi</h2>
        <p className="text-surface-500 font-light text-sm">
          Ders sonrasi kisa bir yansima yazin. Ogrencilerin zorlandigi sorulari ve verdiginiz cevaplari icerebilir.
        </p>
      </div>

      {/* Demo Scenario Button - Featured */}
      <button
        onClick={loadDemoScenario}
        disabled={isAnalyzing}
        className="w-full mb-5 flex items-center gap-3 px-5 py-4 rounded-2xl bg-gradient-to-r from-primary-500/10 to-accent-500/10 border border-primary-200 hover:border-primary-300 transition-all hover:shadow-md group"
      >
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center shadow-lg shadow-primary-500/20 group-hover:scale-110 transition-transform">
          <Zap className="w-5 h-5 text-white" />
        </div>
        <div className="text-left flex-1">
          <p className="text-sm font-semibold text-surface-800">Sunum Demo Senaryosu</p>
          <p className="text-xs text-surface-500">"Mutlak sifirda zaman durur mu?" — Fizik dersi ornegi</p>
        </div>
        <ArrowIcon />
      </button>

      {/* Text Input */}
      <div className="rounded-2xl border border-surface-200 bg-white/80 p-5 mb-5">
        <div className="flex items-center gap-2 mb-3">
          <FileText className="w-4 h-4 text-surface-400" />
          <h3 className="text-sm font-medium text-surface-700">Yansima Metni</h3>
        </div>
        <textarea
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            setSelectedSample(null);
          }}
          placeholder="Bugün derste ne oldu? Ogrenciler hangi sorularla zorlandi? Nasil bir aciklama yaptiniz?"
          className="w-full h-40 p-4 bg-surface-50 border border-surface-200 rounded-xl text-sm text-surface-900 leading-relaxed resize-none focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-400 placeholder:text-surface-400 transition-all font-light"
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

      {/* Sample Reflections */}
      <div className="rounded-2xl border border-surface-200 bg-white/80 p-5 mb-5">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-4 h-4 text-surface-400" />
          <h3 className="text-sm font-medium text-surface-700">Ornek Yansimalar</h3>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {sampleLabels.map((label, index) => (
            <button
              key={index}
              onClick={() => loadSample(index)}
              disabled={isAnalyzing}
              className={`text-left px-3 py-2.5 rounded-xl border text-xs transition-all ${
                selectedSample === index
                  ? "border-primary-400 bg-primary-50 text-primary-700 shadow-sm"
                  : "border-surface-200 bg-white text-surface-600 hover:bg-surface-50 hover:border-surface-300"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        disabled={text.trim().length < 50 || isAnalyzing}
        className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-2xl text-sm font-medium shadow-lg shadow-primary-500/20 hover:shadow-xl hover:shadow-primary-500/25 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:from-surface-200 disabled:to-surface-300 disabled:text-surface-400 disabled:shadow-none disabled:cursor-not-allowed disabled:hover:scale-100"
      >
        {isAnalyzing ? (
          <>
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Analiz ediliyor...
          </>
        ) : (
          <>
            <Send className="w-4 h-4" />
            Yapay Zeka ile Analiz Et
          </>
        )}
      </button>
    </div>
  );
}

function ArrowIcon() {
  return (
    <svg className="w-5 h-5 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  );
}
