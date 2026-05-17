import { useState } from "react";
import { Send, Zap } from "lucide-react";

const DEMO_SCENARIO = `Bugün fizik dersinde bir ogrenci "Mutlak sifirda zaman durur mu?" diye sordu. Bazi ogrenciler sicaklik ve enerji farkini karistirdi. Sicakligin parcacik hareketi oldugunu, zamanin farkli bir fiziksel buyukluk oldugunu anlattim. Ancak sinifin cogu hala "her sey donarsa zaman da donar" diye dusunuyor.`;

const samples = [
  { label: "Fizik", text: "Bugün 10-A sinifinda fizik dersinde Newton'un ikinci yasasini isledik. Mehmet, uzayda astronotlar neden havada suzuluyor diye sordu. Asansor ornegiyle serbest dusus kavramini anlattim ama sinifin yarisi hala yercekiminin sifir olduguna inaniyor." },
  { label: "Matematik", text: "Matematik dersinde limit kavramina giris yaptik. Ayse israrla sifira bolduğumuzde neden tanimsiz diyoruz sonsuz olmasi gerekmez mi diye sordu. Sonsuzun bir sayi degil yonelim oldugunu grafikler cizerek gosterdim." },
  { label: "Biyoloji", text: "Biyoloji dersinde hucre bolunmesini anlatirken Elif cok guzel bir soru sordu: Madem hucreler yaslanip oluyor kanser hucreleri nasil olumsuz oluyor? Apoptozis mekanizmasini basit dille anlattim." },
  { label: "Tarih", text: "Tarih dersinde Kurtulus Savasi'nin orgutlenme donemini islerken Ali, Mustafa Kemal padisahin emrine karsi geldiginde isyan etmis olmuyor mu dedi. Tarihsel olaylari o gunun kosullariyla degerlendirmemiz gerektigini kaynaklar okutarak anlattim." },
  { label: "Edebiyat", text: "Edebiyat dersinde Divan siirini islerken Zeynep, bu sairler halktan bu kadar kopuksa neden edebiyatimizda bu kadar onemliler diye itiraz etti. Estetik degerin tarihsel mirasimizin parcasi oldugunu Fuzuli ornekleriyle anlattim." },
  { label: "Kimya", text: "Kimya dersinde mol kavramina giris yaptim. Burak, 6.02 carpi 10 uzeri 23 sayisi tamamen uydurma bir sayi mi neden duz bir sayi degil diye sordu. Karbon-12 izotopu uzerinden Avogadro sayisinin nasil hesaplandığını anlattim." },
];

interface Props {
  onSubmit: (text: string) => void;
  isAnalyzing: boolean;
}

export default function ReflectionInput({ onSubmit, isAnalyzing }: Props) {
  const [text, setText] = useState("");

  const submit = () => {
    if (text.trim().length < 50 || isAnalyzing) return;
    onSubmit(text.trim());
    setText("");
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold text-apple-text mb-1">Ders Yansimasi</h2>
      <p className="text-sm text-apple-text-tertiary mb-5">Ders sonrasi gozlemlerinizi yazin.</p>

      {/* Demo button */}
      <button
        onClick={() => setText(DEMO_SCENARIO)}
        disabled={isAnalyzing}
        className="w-full flex items-center gap-3 px-4 py-3 mb-4 rounded-xl bg-apple-bg-secondary border border-apple-border-light hover:border-apple-blue transition-colors text-left group"
      >
        <div className="w-8 h-8 rounded-lg bg-apple-blue flex items-center justify-center flex-shrink-0">
          <Zap className="w-4 h-4 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-apple-text">Sunum Demo Senaryosu</p>
          <p className="text-xs text-apple-text-tertiary truncate">"Mutlak sifirda zaman durur mu?"</p>
        </div>
      </button>

      {/* Textarea */}
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Bugün derste ne oldu? Ogrenciler hangi sorularla zorlandi?"
        className="w-full h-32 p-4 mb-2 rounded-xl bg-apple-bg-secondary border border-apple-border-light text-sm text-apple-text leading-relaxed resize-none focus:outline-none focus:ring-2 focus:ring-apple-blue/30 focus:border-apple-blue placeholder:text-apple-text-tertiary transition-all"
        disabled={isAnalyzing}
      />

      <div className="flex items-center justify-between mb-4">
        {text.trim().length > 0 && text.trim().length < 50 && (
          <span className="text-xs text-orange-500">{text.trim().length}/50 karakter</span>
        )}
        <span className="text-xs text-apple-text-tertiary ml-auto">{text.length}</span>
      </div>

      {/* Samples */}
      <div className="flex flex-wrap gap-1.5 mb-5">
        {samples.map((s, i) => (
          <button
            key={i}
            onClick={() => setText(s.text)}
            disabled={isAnalyzing}
            className="px-3 py-1.5 rounded-full text-xs font-medium bg-apple-bg-secondary text-apple-text-secondary border border-apple-border-light hover:border-apple-blue hover:text-apple-blue transition-colors"
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* Submit */}
      <button
        onClick={submit}
        disabled={text.trim().length < 50 || isAnalyzing}
        className="w-full flex items-center justify-center gap-2 py-3.5 bg-apple-blue text-white text-sm font-medium rounded-full hover:bg-apple-blue-hover transition-colors disabled:bg-apple-border disabled:text-apple-text-tertiary disabled:cursor-not-allowed"
      >
        {isAnalyzing ? (
          <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Analiz ediliyor...</>
        ) : (
          <><Send className="w-4 h-4" /> Analiz Et</>
        )}
      </button>
    </div>
  );
}
