import { useState } from "react";
import { Send, Zap } from "lucide-react";

const DEMO_SCENARIO = `Bugün fizik dersinde bir öğrenci "Mutlak sıfırda zaman durur mu?" diye sordu. Bazı öğrenciler sıcaklık ve enerji farkını karıştırdı. Sıcaklığın parçacık hareketi olduğunu, zamanın farklı bir fiziksel büyüklük olduğunu anlattım. Ancak sınıfın çoğu hala "her şey donarsa zaman da donar" diye düşünüyor.`;

const samples = [
  { label: "Fizik", text: "Bugün 10-A sınıfında fizik dersinde Newton'un ikinci yasasını işledik. Mehmet, uzayda astronotlar neden havada süzülüyor diye sordu. Asansör örneğiyle serbest düşüş kavramını anlattım ama sınıfın yarısı hala yerçekiminin sıfır olduğuna inanıyor." },
  { label: "Matematik", text: "Matematik dersinde limit kavramına giriş yaptık. Ayşe ısrarla sıfıra böldüğümüzde neden tanımsız diyoruz, sonsuz olması gerekmez mi diye sordu. Sonsuzun bir sayı değil yönelim olduğunu grafikler çizerek gösterdim." },
  { label: "Biyoloji", text: "Biyoloji dersinde hücre bölünmesini anlatırken Elif çok güzel bir soru sordu: Madem hücreler yaşlanıp ölüyorsa, kanser hücreleri nasıl ölümsüz oluyor? Apoptozis mekanizmasını basit dille anlattım." },
  { label: "Tarih", text: "Tarih dersinde Kurtuluş Savaşı'nın örgütlenme dönemini işlerken Ali, Mustafa Kemal padişahın emrine karşı geldiğinde isyan etmiş olmuyor mu dedi. Tarihsel olayları o günün koşullarıyla değerlendirmemiz gerektiğini kaynaklar okutarak anlattım." },
  { label: "Edebiyat", text: "Edebiyat dersinde Divan şiirini işlerken Zeynep, bu şairler halktan bu kadar kopuksa neden edebiyatımızda bu kadar önemliler diye itiraz etti. Estetik değerin tarihsel mirasımızın parçası olduğunu Fuzuli örnekleriyle anlattım." },
  { label: "Kimya", text: "Kimya dersinde mol kavramına giriş yaptım. Burak, 6.02 çarpı 10 üzeri 23 sayısı tamamen uydurma bir sayı mı, neden düz bir sayı değil diye sordu. Karbon-12 izotopu üzerinden Avogadro sayısının nasıl hesaplandığını anlattım." },
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
      <h2 className="text-2xl font-semibold text-apple-text mb-1">Ders Yansıması</h2>
      <p className="text-sm text-apple-text-tertiary mb-5">Ders sonrası gözlemlerinizi yazın.</p>

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
          <p className="text-xs text-apple-text-tertiary truncate">"Mutlak sıfırda zaman durur mu?"</p>
        </div>
      </button>

      {/* Textarea */}
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Bugün derste ne oldu? Öğrenciler hangi sorularla zorlandı?"
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
