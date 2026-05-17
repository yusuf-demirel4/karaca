import { ArrowRight } from "lucide-react";

interface HeroSectionProps {
  onStartDemo: () => void;
  recordCount: number;
}

export default function HeroSection({ onStartDemo }: HeroSectionProps) {
  return (
    <section className="pt-20 pb-16 text-center" style={{ background: 'linear-gradient(180deg, #fbfbfd 0%, #f5f5f7 100%)' }}>
      <div className="max-w-[980px] mx-auto px-6">
        <p className="text-apple-text-tertiary text-sm font-medium mb-4 fade-up">
          Yapay Zeka Destekli Anonim Egitim Hafizasi
        </p>

        <h1 className="text-[56px] md:text-[80px] font-semibold tracking-[-0.015em] leading-[1.05] text-apple-text mb-6 fade-up fade-up-1">
          Maarif Hafiza
        </h1>

        <p className="text-xl md:text-2xl text-apple-text-secondary font-normal max-w-[600px] mx-auto mb-3 leading-relaxed fade-up fade-up-2">
          Ogretmen deneyimini okulun ortak hafizasina donusturur.
        </p>

        <p className="text-lg text-apple-text-tertiary font-normal mb-10 fade-up fade-up-2">
          Sinifta dogan bilgi kaybolmaz.
        </p>

        <div className="flex items-center justify-center gap-4 mb-16 fade-up fade-up-3">
          <button
            onClick={onStartDemo}
            className="inline-flex items-center gap-2 px-7 py-3 bg-apple-blue text-white text-sm font-medium rounded-full hover:bg-apple-blue-hover transition-colors"
          >
            Demoyu Baslat <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={onStartDemo}
            className="inline-flex items-center gap-2 px-7 py-3 text-apple-blue text-sm font-medium rounded-full border border-apple-blue hover:bg-apple-blue hover:text-white transition-colors"
          >
            Nasil Calisir?
          </button>
        </div>

        {/* Process flow — the core value prop */}
        <div className="grid grid-cols-4 gap-0 max-w-[720px] mx-auto fade-up fade-up-4">
          {[
            { step: "1", title: "Ogretmen notu", desc: "Ders sonunda 15 saniyelik not" },
            { step: "2", title: "Anonimleştirme", desc: "Kisisel veriler temizlenir" },
            { step: "3", title: "YZ analizi", desc: "Yanilgi ve zor soru tespiti" },
            { step: "4", title: "Hafiza", desc: "Aranabilir pedagojik kayit" },
          ].map((item, i) => (
            <div key={i} className="relative text-center px-2">
              {i < 3 && (
                <div className="absolute top-5 left-[60%] w-[80%] h-px bg-apple-border" />
              )}
              <div className="relative w-10 h-10 rounded-full bg-apple-blue text-white text-sm font-semibold flex items-center justify-center mx-auto mb-3">
                {item.step}
              </div>
              <p className="text-xs font-semibold text-apple-text mb-1">{item.title}</p>
              <p className="text-[11px] text-apple-text-tertiary leading-snug">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
