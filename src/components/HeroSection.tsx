import { ArrowRight, BookOpen, Shield, Brain, Search } from "lucide-react";

interface HeroSectionProps {
  onStartDemo: () => void;
  recordCount: number;
}

export default function HeroSection({ onStartDemo, recordCount }: HeroSectionProps) {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-surface-50 via-primary-50/30 to-accent-50/20 animate-gradient" />

      {/* Light beams */}
      <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-primary-300/30 via-transparent to-transparent" />
      <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-accent-300/20 via-transparent to-transparent" />

      {/* Floating orbs */}
      <div className="absolute top-20 right-20 w-72 h-72 bg-primary-200/30 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-accent-200/20 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-100/20 rounded-full blur-3xl animate-glow-pulse" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8 shadow-lg shadow-primary-500/5">
          <div className="w-2 h-2 rounded-full bg-accent-500 animate-pulse" />
          <span className="text-xs font-medium text-surface-600">SKA 4: Nitelikli Egitim</span>
          <span className="text-xs text-surface-400">|</span>
          <span className="text-xs font-medium text-surface-600">KVKK Duyarli</span>
        </div>

        {/* Main headline */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-surface-900 mb-6 leading-[0.9]">
          <span className="block">Maarif</span>
          <span className="block bg-gradient-to-r from-primary-600 via-primary-500 to-accent-500 bg-clip-text text-transparent">
            Hafiza
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-surface-500 font-light max-w-3xl mx-auto mb-4 leading-relaxed tracking-wide">
          Yapay Zeka Destekli Anonim Egitim Hafizasi
        </p>
        <p className="text-base md:text-lg text-surface-400 font-light max-w-2xl mx-auto mb-12">
          Ogrenciyi izleyen degil, ogretmen deneyimini gorunur kilan sistem.
          <br />
          <span className="text-surface-500 font-normal">Sinifta dogan bilgi kaybolmaz.</span>
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <button
            onClick={onStartDemo}
            className="group flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-2xl text-base font-medium shadow-xl shadow-primary-500/25 hover:shadow-2xl hover:shadow-primary-500/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            Demoyu Baslat
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <button
            onClick={onStartDemo}
            className="flex items-center gap-3 px-8 py-4 glass rounded-2xl text-base font-medium text-surface-700 hover:bg-white/80 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg"
          >
            Nasil Calisir?
          </button>
        </div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          <FeatureCard
            icon={<BookOpen className="w-5 h-5" />}
            title="Mikro-Refleksiyon"
            description="15-20 saniyelik ders notu"
            color="primary"
          />
          <FeatureCard
            icon={<Shield className="w-5 h-5" />}
            title="Anonimleştirme"
            description="Kisisel veriler temizlenir"
            color="accent"
          />
          <FeatureCard
            icon={<Brain className="w-5 h-5" />}
            title="YZ Analizi"
            description="Kavram yanilgisi tespiti"
            color="primary"
          />
          <FeatureCard
            icon={<Search className="w-5 h-5" />}
            title="Aranabilir Hafiza"
            description="Benzer ders notlari bulunur"
            color="accent"
          />
        </div>

        {/* Stats */}
        {recordCount > 0 && (
          <div className="mt-12 flex items-center justify-center gap-8">
            <div className="text-center">
              <p className="text-3xl font-bold text-surface-900">{recordCount}</p>
              <p className="text-xs text-surface-500 mt-1">Pedagojik Kayit</p>
            </div>
            <div className="w-px h-10 bg-surface-200" />
            <div className="text-center">
              <p className="text-3xl font-bold text-accent-600">%100</p>
              <p className="text-xs text-surface-500 mt-1">Anonim</p>
            </div>
            <div className="w-px h-10 bg-surface-200" />
            <div className="text-center">
              <p className="text-3xl font-bold text-primary-600">YZ</p>
              <p className="text-xs text-surface-500 mt-1">Destekli</p>
            </div>
          </div>
        )}
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-xs text-surface-400">Kesfet</span>
        <div className="w-5 h-8 rounded-full border-2 border-surface-300 flex items-start justify-center p-1">
          <div className="w-1 h-2 rounded-full bg-surface-400 animate-pulse" />
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ icon, title, description, color }: { icon: React.ReactNode; title: string; description: string; color: "primary" | "accent" }) {
  const colorClasses = color === "primary"
    ? "from-primary-50 to-primary-100/50 border-primary-100 text-primary-600"
    : "from-accent-50 to-accent-100/50 border-accent-100 text-accent-600";

  return (
    <div className={`glass rounded-2xl p-5 text-left hover:scale-[1.03] transition-transform cursor-default shadow-lg shadow-${color}-500/5`}>
      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${colorClasses} flex items-center justify-center mb-3`}>
        {icon}
      </div>
      <h3 className="text-sm font-semibold text-surface-800 mb-1">{title}</h3>
      <p className="text-xs text-surface-500 font-light">{description}</p>
    </div>
  );
}
