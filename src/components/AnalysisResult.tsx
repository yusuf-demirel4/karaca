import { BookOpen, HelpCircle, AlertTriangle, MessageSquare, Eye, Lightbulb, Shield, CheckCircle2, Save, ChevronDown, ChevronUp } from "lucide-react";
import type { ReflectionRecord } from "../types";
import { useState } from "react";
import AnonymizedTextView from "./AnonymizedTextView";

interface Props {
  record: ReflectionRecord;
  onSave: () => void;
  onNewReflection: () => void;
  isSaved: boolean;
}

export default function AnalysisResult({ record, onSave, onNewReflection, isSaved }: Props) {
  const [showPrivacy, setShowPrivacy] = useState(false);
  const pct = Math.round(record.confidenceScore * 100);

  return (
    <div className="p-4 sm:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
        <h2 className="text-xl sm:text-2xl font-semibold text-apple-text">Analiz Sonucu</h2>
        <div className="flex gap-2">
          <button onClick={onNewReflection} className="px-4 py-2 text-sm text-apple-text-secondary rounded-full border border-apple-border hover:bg-apple-bg-secondary transition-colors">
            Yeni
          </button>
          <button
            onClick={onSave}
            disabled={isSaved}
            className={`flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-full transition-colors ${
              isSaved ? "bg-green-50 text-green-600 border border-green-200" : "bg-apple-blue text-white hover:bg-apple-blue-hover"
            }`}
          >
            {isSaved ? <><CheckCircle2 className="w-3.5 h-3.5" /> Kaydedildi</> : <><Save className="w-3.5 h-3.5" /> Kaydet</>}
          </button>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
        <div className="bg-apple-bg-secondary rounded-xl p-4">
          <div className="flex items-center gap-1.5 mb-2">
            <BookOpen className="w-3.5 h-3.5 text-apple-blue" />
            <span className="text-[11px] font-medium text-apple-text-tertiary uppercase tracking-wider">Ders</span>
          </div>
          <p className="text-sm font-semibold text-apple-text">{record.subject}</p>
          <p className="text-xs text-apple-text-tertiary mt-0.5">{record.topic}</p>
        </div>
        <div className="bg-apple-bg-secondary rounded-xl p-4">
          <div className="flex items-center gap-1.5 mb-2">
            <AlertTriangle className="w-3.5 h-3.5 text-apple-blue" />
            <span className="text-[11px] font-medium text-apple-text-tertiary uppercase tracking-wider">Zorluk</span>
          </div>
          <DiffBadge level={record.difficultyLevel} />
        </div>
        <div className="bg-apple-bg-secondary rounded-xl p-4">
          <div className="flex items-center gap-1.5 mb-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-apple-blue" />
            <span className="text-[11px] font-medium text-apple-text-tertiary uppercase tracking-wider">Güven</span>
          </div>
          <p className="text-lg font-semibold text-apple-text">%{pct}</p>
          <div className="mt-1.5 h-1 bg-apple-border-light rounded-full"><div className="h-full bg-apple-blue rounded-full" style={{ width: `${pct}%` }} /></div>
        </div>
      </div>

      {/* Question */}
      <Section icon={<HelpCircle className="w-4 h-4 text-red-500" />} title="Zor Soru" badge={record.questionType}>
        <p className="text-sm text-apple-text italic leading-relaxed">"{record.difficultQuestion}"</p>
      </Section>

      {/* Misconception */}
      <Section icon={<AlertTriangle className="w-4 h-4 text-amber-500" />} title="Kavram Yanılgısı">
        <p className="text-sm text-apple-text-secondary leading-relaxed">{record.misconception}</p>
      </Section>

      {/* Teacher response + observation */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
        <Section icon={<MessageSquare className="w-4 h-4 text-apple-blue" />} title="Öğretmen Yanıtı" compact>
          <p className="text-sm text-apple-text-secondary leading-relaxed">{record.teacherResponse}</p>
        </Section>
        <Section icon={<Eye className="w-4 h-4 text-apple-blue" />} title="Gözlem" compact>
          <p className="text-sm text-apple-text-secondary leading-relaxed">{record.teacherObservation}</p>
        </Section>
      </div>

      {/* Recommendation */}
      <Section icon={<Lightbulb className="w-4 h-4 text-apple-blue" />} title="Sonraki Ders İçin Öneri" highlight>
        <p className="text-sm text-apple-text leading-relaxed">{record.recommendedMethod}</p>
      </Section>

      {/* Privacy */}
      <div className="rounded-xl border border-apple-border-light p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-green-600" />
            <span className="text-sm font-medium text-apple-text">KVKK Anonimleştirme</span>
          </div>
          <PrivBadge status={record.privacyStatus} />
        </div>

        {record.detectedSensitiveData && record.detectedSensitiveData.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3">
            {record.detectedSensitiveData.map((d, i) => (
              <span key={i} className="px-2 py-0.5 bg-red-50 text-red-600 text-xs rounded-md border border-red-200 font-mono">{d}</span>
            ))}
          </div>
        )}

        <button onClick={() => setShowPrivacy(!showPrivacy)} className="flex items-center gap-1 mt-3 text-xs text-apple-link font-medium">
          {showPrivacy ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          {showPrivacy ? "Gizle" : "Anonimleştirilmiş metni göster"}
        </button>

        {showPrivacy && (
          <div className="mt-3">
            <AnonymizedTextView originalText={record.originalText} anonymizedText={record.anonymizedText} detectedData={record.detectedSensitiveData || []} />
          </div>
        )}
      </div>
    </div>
  );
}

function Section({ icon, title, badge, children, highlight, compact }: { icon: React.ReactNode; title: string; badge?: string; children: React.ReactNode; highlight?: boolean; compact?: boolean }) {
  return (
    <div className={`rounded-xl p-4 ${compact ? '' : 'mb-4'} ${highlight ? 'bg-blue-50 border border-blue-100' : 'bg-apple-bg-secondary'}`}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-1.5">
          {icon}
          <span className="text-[11px] font-medium text-apple-text-tertiary uppercase tracking-wider">{title}</span>
        </div>
        {badge && <span className="px-2 py-0.5 text-[10px] font-medium bg-purple-50 text-purple-600 rounded-md border border-purple-200">{badge}</span>}
      </div>
      {children}
    </div>
  );
}

function DiffBadge({ level }: { level: string }) {
  const c = level === "Çok Zor" ? "bg-red-50 text-red-600 border-red-200" :
    level === "Zor" ? "bg-orange-50 text-orange-600 border-orange-200" :
    level === "Orta" ? "bg-blue-50 text-blue-600 border-blue-200" :
    "bg-green-50 text-green-600 border-green-200";
  return <span className={`inline-block px-2.5 py-1 text-xs font-medium rounded-md border ${c}`}>{level}</span>;
}

function PrivBadge({ status }: { status: string }) {
  const ok = status === "Safe" || status === "Anonimleştirildi" || status === "Kişisel Veri Yok";
  return <span className={`px-2.5 py-1 text-xs font-medium rounded-md border ${ok ? "bg-green-50 text-green-600 border-green-200" : "bg-orange-50 text-orange-600 border-orange-200"}`}>{ok ? "Güvende" : status}</span>;
}
