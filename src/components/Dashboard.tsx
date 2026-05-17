import { useState } from "react";
import { Database, Calendar, Trash2, Eye, Search } from "lucide-react";
import type { ReflectionRecord } from "../types";

interface Props {
  records: ReflectionRecord[];
  onViewRecord: (record: ReflectionRecord) => void;
  onDeleteRecord: (id: string) => void;
}

export default function Dashboard({ records, onViewRecord, onDeleteRecord }: Props) {
  const [query, setQuery] = useState("");
  const filtered = query.trim().length > 1
    ? records.filter(r => r.subject.toLowerCase().includes(query.toLowerCase()) || r.topic.toLowerCase().includes(query.toLowerCase()))
    : records;

  const subjects: Record<string, number> = {};
  records.forEach(r => { subjects[r.subject] = (subjects[r.subject] || 0) + 1; });
  const avg = records.length > 0 ? Math.round((records.reduce((s, r) => s + r.confidenceScore, 0) / records.length) * 100) : 0;

  if (!records.length) {
    return (
      <div className="text-center py-16">
        <Database className="w-10 h-10 text-apple-border mx-auto mb-3" />
        <p className="text-lg font-semibold text-apple-text">Henuz kayit yok</p>
        <p className="text-sm text-apple-text-tertiary mt-1">Bir yansima girerek baslayin.</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold text-apple-text text-center mb-2">Pedagojik Hafiza</h2>
      <p className="text-sm text-apple-text-tertiary text-center mb-8">Tum analiz kayitlari ve istatistikler.</p>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-3 mb-8">
        <Stat label="Toplam" value={records.length} />
        <Stat label="Ders" value={Object.keys(subjects).length} />
        <Stat label="Ort. Guven" value={`%${avg}`} />
        <Stat label="Anonim" value={records.filter(r => r.privacyStatus === "Safe" || r.privacyStatus === "Anonimleştirildi" || r.privacyStatus === "Kişisel Veri Yok").length} />
      </div>

      {/* Subject bars */}
      <div className="bg-apple-bg-secondary rounded-2xl p-5 mb-8">
        <p className="text-sm font-semibold text-apple-text mb-4">Ders Dagilimi</p>
        <div className="space-y-2.5">
          {Object.entries(subjects).sort(([,a],[,b]) => b - a).map(([subj, count]) => (
            <div key={subj} className="flex items-center gap-3">
              <span className="text-xs text-apple-text-secondary w-24 truncate">{subj}</span>
              <div className="flex-1 h-1.5 bg-apple-border-light rounded-full">
                <div className="h-full bg-apple-blue rounded-full" style={{ width: `${(count / records.length) * 100}%` }} />
              </div>
              <span className="text-xs font-medium text-apple-text w-4 text-right">{count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="rounded-2xl border border-apple-border-light overflow-hidden">
        <div className="px-5 py-4 bg-apple-bg-secondary flex items-center justify-between gap-4">
          <p className="text-sm font-semibold text-apple-text">Kayitlar <span className="text-apple-text-tertiary font-normal">({filtered.length})</span></p>
          <div className="relative w-60">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-apple-text-tertiary" />
            <input
              value={query} onChange={e => setQuery(e.target.value)}
              placeholder="Ara..."
              className="w-full pl-8 pr-3 py-2 text-sm bg-white border border-apple-border-light rounded-lg focus:outline-none focus:ring-2 focus:ring-apple-blue/20 focus:border-apple-blue placeholder:text-apple-text-tertiary"
            />
          </div>
        </div>
        <table className="w-full">
          <thead>
            <tr className="border-b border-apple-border-light text-left">
              <Th>Tarih</Th><Th>Ders</Th><Th>Konu</Th><Th>Zorluk</Th><Th>Guven</Th><Th>Durum</Th><Th></Th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(r => (
              <tr key={r.id} className="border-b border-apple-border-light last:border-0 hover:bg-apple-bg-secondary/50 transition-colors">
                <td className="px-5 py-3 text-xs text-apple-text-tertiary">
                  <span className="flex items-center gap-1.5"><Calendar className="w-3 h-3" />{new Date(r.timestamp).toLocaleDateString("tr-TR")}</span>
                </td>
                <td className="px-5 py-3 text-sm font-medium text-apple-text">{r.subject}</td>
                <td className="px-5 py-3 text-sm text-apple-text-secondary max-w-[180px] truncate">{r.topic}</td>
                <td className="px-5 py-3"><DiffBadge level={r.difficultyLevel} /></td>
                <td className="px-5 py-3 text-sm font-medium text-apple-text">%{Math.round(r.confidenceScore * 100)}</td>
                <td className="px-5 py-3"><StatusBadge status={r.privacyStatus} /></td>
                <td className="px-5 py-3 text-right">
                  <button onClick={() => onViewRecord(r)} className="p-1.5 text-apple-text-tertiary hover:text-apple-blue rounded-lg transition-colors"><Eye className="w-4 h-4" /></button>
                  <button onClick={() => onDeleteRecord(r.id)} className="p-1.5 text-apple-text-tertiary hover:text-red-500 rounded-lg transition-colors"><Trash2 className="w-4 h-4" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="bg-apple-bg-secondary rounded-2xl p-5 text-center">
      <p className="text-2xl font-semibold text-apple-text">{value}</p>
      <p className="text-[11px] text-apple-text-tertiary mt-1 uppercase tracking-wider">{label}</p>
    </div>
  );
}

function Th({ children }: { children?: React.ReactNode }) {
  return <th className="px-5 py-2.5 text-[11px] font-medium text-apple-text-tertiary uppercase tracking-wider">{children}</th>;
}

function DiffBadge({ level }: { level: string }) {
  const c = level === "Çok Zor" ? "bg-red-50 text-red-600" : level === "Zor" ? "bg-orange-50 text-orange-600" : level === "Orta" ? "bg-blue-50 text-blue-600" : "bg-green-50 text-green-600";
  return <span className={`px-2 py-0.5 text-[11px] font-medium rounded-md ${c}`}>{level}</span>;
}

function StatusBadge({ status }: { status: string }) {
  const ok = status === "Safe" || status === "Anonimleştirildi" || status === "Kişisel Veri Yok";
  return <span className={`px-2 py-0.5 text-[11px] font-medium rounded-md ${ok ? "bg-green-50 text-green-600" : "bg-orange-50 text-orange-600"}`}>{ok ? "Anonim" : status}</span>;
}
