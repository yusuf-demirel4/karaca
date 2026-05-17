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
          <p className="text-sm text-surface-500">ID: {record.id}</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={onNewReflection}
            className="px-4 py-2 text-sm font-medium tracking-wide text-surface-600 bg-white border border-surface-200 rounded-full hover:bg-surface-50 transition-colors"
          >
            Yeni Yansıma
          </button>
          <button
            onClick={onSave}
            disabled={isSaved}
            className={`flex items-center gap-2 px-5 py-2 text-sm font-medium tracking-wide rounded-full transition-colors ${
              isSaved
                ? "bg-surface-100 text-surface-500 cursor-not-allowed"
                : "bg-surface-900 text-white hover:bg-black"
            }`}
          >
            {isSaved ? (
              <>
                <CheckCircle2 className="w-4 h-4" />
                Hafızaya Kaydedildi
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                Hafızaya Kaydet
              </>
            )}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-2xl border border-surface-100 p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <BookOpen className="w-4 h-4 text-surface-400" />
            <span className="text-xs font-medium text-surface-500 uppercase tracking-wider">Ders / Konu</span>
          </div>
          <p className="text-lg font-medium tracking-tight text-surface-900">{record.subject}</p>
          <p className="text-sm font-light tracking-wide text-surface-500 mt-1">{record.topic}</p>
        </div>

        <div className="bg-white rounded-2xl border border-surface-100 p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <BarChart3 className="w-4 h-4 text-surface-400" />
            <span className="text-xs font-medium text-surface-500 uppercase tracking-wider">Zorluk Seviyesi</span>
          </div>
          <span className="inline-flex px-3 py-1 rounded-full text-sm font-light tracking-wide text-surface-600 border border-surface-200 bg-[#fbfbfd]">
            {record.difficultyLevel}
          </span>
        </div>

        <div className="bg-white rounded-2xl border border-surface-100 p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle2 className="w-4 h-4 text-surface-400" />
            <span className="text-xs font-medium text-surface-500 uppercase tracking-wider">Güven Skoru</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-2xl font-medium tracking-tight text-surface-900">%{confidencePercent}</span>
            <div className="flex-1 h-1 bg-surface-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-surface-900 rounded-full transition-all duration-500"
                style={{ width: `${confidencePercent}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-surface-200 p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-red-500" />
              <span className="text-xs font-semibold text-surface-500 uppercase tracking-wide">Zor Öğrenci Sorusu</span>
            </div>
            <span className="inline-flex px-2.5 py-1 rounded-full text-[10px] font-semibold bg-indigo-100 text-indigo-700 border border-indigo-200">
              {record.questionType}
            </span>
          </div>
          <p className="text-sm text-surface-800 leading-relaxed bg-[#fbfbfd] border border-surface-100 rounded-xl p-5 font-light tracking-wide">
            "{record.difficultQuestion}"
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-surface-100 p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="w-4 h-4 text-surface-400" />
            <span className="text-xs font-medium text-surface-500 uppercase tracking-wider">Tespit Edilen Yanılgı</span>
          </div>
          <p className="text-sm text-surface-800 leading-relaxed bg-[#fbfbfd] border border-surface-100 rounded-xl p-5 font-light tracking-wide">
            {record.misconception}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        <div className="bg-white rounded-2xl border border-surface-100 p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <MessageSquare className="w-4 h-4 text-surface-400" />
            <span className="text-xs font-medium text-surface-500 uppercase tracking-wider">Öğretmen Yanıtı</span>
          </div>
          <p className="text-sm text-surface-700 leading-relaxed font-light tracking-wide">{record.teacherResponse}</p>
        </div>

        <div className="bg-white rounded-2xl border border-surface-100 p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Eye className="w-4 h-4 text-surface-400" />
            <span className="text-xs font-medium text-surface-500 uppercase tracking-wider">Öğretmen Gözlemi</span>
          </div>
          <p className="text-sm text-surface-700 leading-relaxed font-light tracking-wide">{record.teacherObservation}</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-surface-100 p-6 mb-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <Lightbulb className="w-4 h-4 text-surface-400" />
          <span className="text-xs font-medium text-surface-500 uppercase tracking-wider">Önerilen Öğretim Yöntemi</span>
        </div>
        <p className="text-sm text-surface-700 leading-relaxed font-light tracking-wide">{record.recommendedMethod}</p>
      </div>

      <div className="bg-white rounded-2xl border border-surface-100 p-6 mb-6 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-accent-500" />
            <span className="text-xs font-semibold text-surface-500 uppercase tracking-wide">
              Gizlilik / KVKK Anonimleştirme
            </span>
          </div>
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${
              record.privacyStatus === "Safe" || record.privacyStatus === "Anonimleştirildi"
                ? "bg-green-50 text-green-700 border-green-200"
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
          <p className="text-sm text-surface-600 mb-4">{record.privacyExplanation}</p>
        )}

        {record.detectedSensitiveData && record.detectedSensitiveData.length > 0 && (
          <div className="mb-4">
            <p className="text-xs font-semibold text-surface-500 uppercase tracking-wide mb-2">Tespit Edilen Hassas Veriler:</p>
            <div className="flex flex-wrap gap-2">
              {record.detectedSensitiveData.map((data, idx) => (
                <span key={idx} className="inline-flex px-2 py-1 bg-surface-100 border border-surface-200 text-surface-700 text-xs rounded">
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
          {showAnonymized ? (
            <>
              <ChevronUp className="w-4 h-4" />
              Anonimleştirilmiş metni gizle
            </>
          ) : (
            <>
              <ChevronDown className="w-4 h-4" />
              Anonimleştirilmiş metni göster
            </>
          )}
        </button>

        {showAnonymized && (
          <div className="mt-4 p-4 bg-surface-50 border border-surface-200 rounded-lg">
            <p className="text-sm text-surface-700 leading-relaxed whitespace-pre-wrap">
              {record.anonymizedText}
            </p>
          </div>
        )}
      </div>

      <div className="bg-surface-50 rounded-xl border border-surface-200 p-5">
        <button
          onClick={() => setShowJSON(!showJSON)}
          className="flex items-center gap-2 text-sm text-surface-600 hover:text-surface-900 font-medium"
        >
          <Code className="w-4 h-4" />
          {showJSON ? "Geliştirici Görünümünü Gizle (JSON)" : "Geliştirici Görünümünü Aç (JSON)"}
        </button>

        {showJSON && (
          <div className="mt-4 p-4 bg-surface-900 rounded-lg overflow-x-auto">
            <pre className="text-xs text-surface-50 font-mono">
              {JSON.stringify(record, null, 2)}
            </pre>
          </div>
        )}
      </div>

    </div>
  );
}
