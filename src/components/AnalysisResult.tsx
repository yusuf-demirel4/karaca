import {
  BookOpen,
  HelpCircle,
  AlertTriangle,
  MessageSquare,
  Eye,
  BarChart3,
  Lightbulb,
  Shield,
  CheckCircle2,
  Save,
  ChevronDown,
  ChevronUp,
  Code
} from "lucide-react";
import type { ReflectionRecord } from "../types";
import { useState } from "react";

interface AnalysisResultProps {
  record: ReflectionRecord;
  onSave: () => void;
  onNewReflection: () => void;
  isSaved: boolean;
}

export default function AnalysisResult({ record, onSave, onNewReflection, isSaved }: AnalysisResultProps) {
  const [showAnonymized, setShowAnonymized] = useState(false);
  const [showJSON, setShowJSON] = useState(false);

  const confidencePercent = Math.round(record.confidenceScore * 100);

  return (
    <div className="w-full p-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-surface-900 mb-1">Analiz Sonucu</h2>
          <p className="text-xs text-surface-400 font-mono">ID: {record.id}</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={onNewReflection}
            className="px-4 py-2 text-sm font-medium text-surface-600 bg-white border border-surface-200 rounded-xl hover:bg-surface-50 transition-all"
          >
            Yeni Yansima
          </button>
          <button
            onClick={onSave}
            disabled={isSaved}
            className={`flex items-center gap-2 px-5 py-2 text-sm font-medium rounded-xl transition-all ${
              isSaved
                ? "bg-accent-50 text-accent-700 border border-accent-200 cursor-not-allowed"
                : "bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-lg shadow-primary-500/20 hover:shadow-xl hover:scale-[1.02]"
            }`}
          >
            {isSaved ? (
              <>
                <CheckCircle2 className="w-4 h-4" />
                Kaydedildi
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                Hafizaya Kaydet
              </>
            )}
          </button>
        </div>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="rounded-2xl border border-surface-100 bg-white/80 p-4">
          <div className="flex items-center gap-2 mb-2">
            <BookOpen className="w-3.5 h-3.5 text-primary-500" />
            <span className="text-[10px] font-semibold text-surface-400 uppercase tracking-widest">Ders</span>
          </div>
          <p className="text-base font-semibold text-surface-900">{record.subject}</p>
          <p className="text-xs text-surface-500 mt-0.5 font-light">{record.topic}</p>
        </div>

        <div className="rounded-2xl border border-surface-100 bg-white/80 p-4">
          <div className="flex items-center gap-2 mb-2">
            <BarChart3 className="w-3.5 h-3.5 text-primary-500" />
            <span className="text-[10px] font-semibold text-surface-400 uppercase tracking-widest">Zorluk</span>
          </div>
          <span className={`inline-flex px-3 py-1 rounded-lg text-xs font-medium ${
            record.difficultyLevel === "Çok Zor" ? "bg-red-50 text-red-700 border border-red-200" :
            record.difficultyLevel === "Zor" ? "bg-amber-50 text-amber-700 border border-amber-200" :
            record.difficultyLevel === "Orta" ? "bg-blue-50 text-blue-700 border border-blue-200" :
            "bg-green-50 text-green-700 border border-green-200"
          }`}>
            {record.difficultyLevel}
          </span>
        </div>

        <div className="rounded-2xl border border-surface-100 bg-white/80 p-4">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-primary-500" />
            <span className="text-[10px] font-semibold text-surface-400 uppercase tracking-widest">Guven</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-surface-900">%{confidencePercent}</span>
          </div>
          <div className="mt-1.5 h-1.5 bg-surface-100 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-primary-500 to-primary-600 transition-all duration-700"
              style={{ width: `${confidencePercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Question & Misconception */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <div className="rounded-2xl border border-red-100 bg-red-50/30 p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-red-500" />
              <span className="text-[10px] font-semibold text-red-400 uppercase tracking-widest">Zor Soru</span>
            </div>
            <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-primary-50 text-primary-600 border border-primary-200">
              {record.questionType}
            </span>
          </div>
          <p className="text-sm text-surface-800 leading-relaxed font-light italic">
            "{record.difficultQuestion}"
          </p>
        </div>

        <div className="rounded-2xl border border-amber-100 bg-amber-50/30 p-5">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="w-4 h-4 text-amber-500" />
            <span className="text-[10px] font-semibold text-amber-400 uppercase tracking-widest">Yanilgi</span>
          </div>
          <p className="text-sm text-surface-800 leading-relaxed font-light">
            {record.misconception}
          </p>
        </div>
      </div>

      {/* Teacher Response & Observation */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <div className="rounded-2xl border border-surface-100 bg-white/80 p-5">
          <div className="flex items-center gap-2 mb-3">
            <MessageSquare className="w-4 h-4 text-primary-500" />
            <span className="text-[10px] font-semibold text-surface-400 uppercase tracking-widest">Ogretmen Yaniti</span>
          </div>
          <p className="text-sm text-surface-700 leading-relaxed font-light">{record.teacherResponse}</p>
        </div>

        <div className="rounded-2xl border border-surface-100 bg-white/80 p-5">
          <div className="flex items-center gap-2 mb-3">
            <Eye className="w-4 h-4 text-primary-500" />
            <span className="text-[10px] font-semibold text-surface-400 uppercase tracking-widest">Gozlem</span>
          </div>
          <p className="text-sm text-surface-700 leading-relaxed font-light">{record.teacherObservation}</p>
        </div>
      </div>

      {/* Recommendation */}
      <div className="rounded-2xl border border-primary-100 bg-gradient-to-br from-primary-50/50 to-accent-50/30 p-5 mb-4">
        <div className="flex items-center gap-2 mb-3">
          <Lightbulb className="w-4 h-4 text-primary-600" />
          <span className="text-[10px] font-semibold text-primary-400 uppercase tracking-widest">Onerilen Yontem</span>
        </div>
        <p className="text-sm text-surface-800 leading-relaxed font-light">{record.recommendedMethod}</p>
      </div>

      {/* Privacy */}
      <div className="rounded-2xl border border-surface-100 bg-white/80 p-5 mb-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-accent-600" />
            <span className="text-[10px] font-semibold text-surface-400 uppercase tracking-widest">
              KVKK Anonimleştirme
            </span>
          </div>
          <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold border ${
              record.privacyStatus === "Safe" || record.privacyStatus === "Anonimleştirildi"
                ? "bg-accent-50 text-accent-700 border-accent-200"
                : record.privacyStatus === "Needs Review"
                ? "bg-amber-50 text-amber-700 border-amber-200"
                : record.privacyStatus === "High Risk"
                ? "bg-red-50 text-red-700 border-red-200"
                : "bg-blue-50 text-blue-700 border-blue-200"
            }`}
          >
            <Shield className="w-3 h-3" />
            {record.privacyStatus}
          </span>
        </div>

        {record.privacyExplanation && (
          <p className="text-sm text-surface-600 mb-3 font-light">{record.privacyExplanation}</p>
        )}

        {record.detectedSensitiveData && record.detectedSensitiveData.length > 0 && (
          <div className="mb-3">
            <p className="text-[10px] font-semibold text-surface-400 uppercase tracking-widest mb-2">Tespit Edilen Hassas Veriler:</p>
            <div className="flex flex-wrap gap-1.5">
              {record.detectedSensitiveData.map((data, idx) => (
                <span key={idx} className="inline-flex px-2 py-0.5 bg-red-50 border border-red-200 text-red-600 text-xs rounded-md font-mono">
                  {data}
                </span>
              ))}
            </div>
          </div>
        )}

        <button
          onClick={() => setShowAnonymized(!showAnonymized)}
          className="flex items-center gap-2 text-sm text-primary-600 hover:text-primary-700 font-medium"
        >
          {showAnonymized ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          {showAnonymized ? "Gizle" : "Anonimlestirilmis metni goster"}
        </button>

        {showAnonymized && (
          <div className="mt-3 p-4 bg-surface-50 border border-surface-200 rounded-xl">
            <p className="text-sm text-surface-700 leading-relaxed whitespace-pre-wrap font-mono text-xs">
              {record.anonymizedText}
            </p>
          </div>
        )}
      </div>

      {/* JSON Debug */}
      <div className="rounded-xl border border-surface-200 bg-surface-50 p-4">
        <button
          onClick={() => setShowJSON(!showJSON)}
          className="flex items-center gap-2 text-sm text-surface-500 hover:text-surface-700 font-medium transition-colors"
        >
          <Code className="w-4 h-4" />
          {showJSON ? "JSON Gizle" : "Gelistirici Gorunumu (JSON)"}
        </button>

        {showJSON && (
          <div className="mt-3 p-4 bg-surface-900 rounded-xl overflow-x-auto">
            <pre className="text-xs text-green-400 font-mono">
              {JSON.stringify(record, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
