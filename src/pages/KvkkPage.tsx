import type { ReactNode } from "react";
import { ShieldCheck, UserX, FileCheck2, Eye, Target, Layers, ArrowLeft, Info } from "lucide-react";
import { Link } from "react-router-dom";

export default function KvkkPage() {
  return (
    <main className="bg-white">
      <section className="py-10 sm:py-16">
        <div className="max-w-[980px] mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-10 h-10 rounded-xl bg-green-100 text-green-700 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </span>
            <div>
              <p className="text-xs text-apple-text-tertiary uppercase tracking-wider">KVKK Bilgilendirme</p>
              <h1 className="text-2xl sm:text-3xl font-semibold text-apple-text">KVKK ile Neden Uyumlu?</h1>
            </div>
          </div>

          <p className="text-sm sm:text-base text-apple-text-secondary leading-relaxed mb-6">
            Maarif Hafıza, ders yansımalarını işlerken kişisel verileri otomatik olarak tespit eder ve anonimleştirir.
            Amaç, pedagojik içgörüyü korurken kişisel veri riskini azaltmaktır.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            <Card icon={<ShieldCheck className="w-4 h-4" />} title="Otomatik maskeleme" tone="green">
              Öğrenci, sınıf, okul ve iletişim bilgileri tespit edilip gizlenir.
            </Card>
            <Card icon={<UserX className="w-4 h-4" />} title="Veri minimizasyonu" tone="blue">
              Analiz için gerekli olmayan kişisel veriler ayıklanır.
            </Card>
            <Card icon={<FileCheck2 className="w-4 h-4" />} title="Anonim çıktı" tone="purple">
              Raporlar ve kayıtlar yalnızca anonim içerik üzerinden sunulur.
            </Card>
            <Card icon={<Eye className="w-4 h-4" />} title="Şeffaf görünürlük" tone="amber">
              Anonimleştirilmiş metin kullanıcıya açık şekilde gösterilir.
            </Card>
            <Card icon={<Target className="w-4 h-4" />} title="Amaç sınırlılığı" tone="rose">
              İşleme, pedagojik analiz amacıyla sınırlandırılır.
            </Card>
            <Card icon={<Layers className="w-4 h-4" />} title="Ayrıştırılmış içerik" tone="slate">
              Kişisel veri ve pedagojik içerik ayrıştırılarak işlenir.
            </Card>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <InfoCard>
              Hassas veri etiketleri (öğrenci, sınıf, okul vb.) görünür biçimde işaretlenir.
            </InfoCard>
            <InfoCard>
              Kullanıcı, anonimleştirilmiş içerik üzerinden analiz sonuçlarını doğrulayabilir.
            </InfoCard>
            <InfoCard>
              Analizler, kişisel verilerden arındırılmış metin üzerinde çalışır.
            </InfoCard>
            <InfoCard>
              Gerekli olmayan kişisel veriler saklanmaz veya kalıcı hale getirilmez.
            </InfoCard>
          </div>

          <div className="mt-8 rounded-2xl border border-apple-border-light bg-apple-bg-secondary p-5">
            <div className="flex items-start gap-3">
              <span className="w-9 h-9 rounded-xl bg-white border border-apple-border-light flex items-center justify-center text-apple-text-tertiary">
                <Info className="w-4 h-4" />
              </span>
              <div>
                <p className="text-sm font-semibold text-apple-text">Not</p>
                <p className="text-xs text-apple-text-tertiary leading-relaxed">
                  Bu sayfa bilgilendirme amaçlıdır ve uygulamanın anonimleştirme yaklaşımını özetler.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <Link to="/" className="inline-flex items-center gap-2 text-sm font-medium text-apple-blue hover:text-apple-blue-hover transition-colors">
              <ArrowLeft className="w-4 h-4" /> Ana sayfaya dön
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

function Card({
  icon,
  title,
  tone,
  children,
}: {
  icon: ReactNode;
  title: string;
  tone: "green" | "blue" | "purple" | "amber" | "rose" | "slate";
  children: ReactNode;
}) {
  const toneMap: Record<typeof tone, string> = {
    green: "bg-green-50 text-green-700",
    blue: "bg-blue-50 text-apple-blue",
    purple: "bg-purple-50 text-purple-600",
    amber: "bg-amber-50 text-amber-600",
    rose: "bg-rose-50 text-rose-600",
    slate: "bg-slate-50 text-slate-600",
  };

  return (
    <div className="rounded-xl bg-white border border-apple-border-light p-4">
      <div className="flex items-center gap-2 mb-2">
        <span className={`w-8 h-8 rounded-lg flex items-center justify-center ${toneMap[tone]}`}>
          {icon}
        </span>
        <p className="text-sm font-semibold text-apple-text">{title}</p>
      </div>
      <p className="text-xs text-apple-text-tertiary">{children}</p>
    </div>
  );
}

function InfoCard({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-xl bg-white border border-apple-border-light p-4 text-xs text-apple-text-tertiary">
      {children}
    </div>
  );
}
