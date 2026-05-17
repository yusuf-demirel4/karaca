import { useState } from "react";
import { Play } from "lucide-react";

interface Props {
  originalText: string;
  anonymizedText: string;
  detectedData: string[];
}

export default function AnonymizedTextView({ originalText, anonymizedText, detectedData }: Props) {
  const [phase, setPhase] = useState<"idle" | "highlight" | "replace" | "done">("done");

  const run = () => {
    setPhase("highlight");
    setTimeout(() => setPhase("replace"), 1500);
    setTimeout(() => setPhase("done"), 2500);
  };

  const renderAnonymized = () => {
    const tagRegex = /\[(ÖĞRENCİ|OGRENCI|SINIF|OKUL|TELEFON|E-POSTA|KONUM|ÖĞRETMEN|SAĞLIK\/ÖZEL DURUM)(?:-\d+)?\]/g;
    const parts: React.ReactNode[] = [];
    let last = 0;
    let match;
    while ((match = tagRegex.exec(anonymizedText)) !== null) {
      if (match.index > last) parts.push(<span key={last}>{anonymizedText.substring(last, match.index)}</span>);
      parts.push(<span key={match.index} className="px-1 py-0.5 bg-green-100 text-green-700 rounded text-xs font-mono border border-green-200">{match[0]}</span>);
      last = match.index + match[0].length;
    }
    if (last < anonymizedText.length) parts.push(<span key="end">{anonymizedText.substring(last)}</span>);
    return parts;
  };

  const renderHighlighted = () => {
    let text = originalText;
    const sorted = [...detectedData].sort((a, b) => b.length - a.length);
    const marks: { s: number; e: number }[] = [];
    for (const d of sorted) {
      let from = 0;
      while (true) {
        const idx = text.indexOf(d, from);
        if (idx === -1) break;
        marks.push({ s: idx, e: idx + d.length });
        from = idx + d.length;
      }
    }
    marks.sort((a, b) => a.s - b.s);
    if (!marks.length) return <span>{originalText}</span>;

    const els: React.ReactNode[] = [];
    let pos = 0;
    marks.forEach((m, i) => {
      if (m.s > pos) els.push(<span key={`t${i}`}>{text.substring(pos, m.s)}</span>);
      els.push(<span key={`h${i}`} className="px-1 py-0.5 bg-red-100 text-red-600 rounded text-xs font-medium border border-red-200 animate-pulse">{text.substring(m.s, m.e)}</span>);
      pos = m.e;
    });
    if (pos < text.length) els.push(<span key="e">{text.substring(pos)}</span>);
    return els;
  };

  return (
    <div>
      <button onClick={run} className="flex items-center gap-1.5 px-3 py-1.5 mb-3 rounded-lg text-xs font-medium text-apple-blue bg-blue-50 border border-blue-200 hover:bg-blue-100 transition-colors">
        <Play className="w-3 h-3" /> Anonimleştirmeyi canlı göster
      </button>

      <div className="p-4 bg-apple-bg-secondary rounded-xl border border-apple-border-light">
        <p className="text-[10px] font-medium text-apple-text-tertiary uppercase tracking-wider mb-2">
          {phase === "highlight" ? "Hassas veriler tespit ediliyor..." : phase === "replace" ? "Anonimleştiriliyor..." : "Anonimleştirilmiş metin"}
        </p>
        <p className="text-sm text-apple-text-secondary leading-relaxed whitespace-pre-wrap">
          {phase === "highlight" ? renderHighlighted() : renderAnonymized()}
        </p>
      </div>
    </div>
  );
}
