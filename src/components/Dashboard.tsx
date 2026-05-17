import { useState } from "react";
import { Database, Calendar, Trash2, Eye, Search as SearchIcon, TrendingUp } from "lucide-react";
import type { ReflectionRecord } from "../types";

interface DashboardProps {
  records: ReflectionRecord[];
  onViewRecord: (record: ReflectionRecord) => void;
  onDeleteRecord: (id: string) => void;
}

export default function Dashboard({ records, onViewRecord, onDeleteRecord }: DashboardProps) {
  const [query, setQuery] = useState("");

  const displayedRecords = query.trim().length > 1
    ? records.filter(r =>
        r.subject.toLowerCase().includes(query.toLowerCase()) ||
        r.topic.toLowerCase().includes(query.toLowerCase()))
    : records;

  const subjectCounts: Record<string, number> = {};
  const difficultyCounts: Record<string, number> = {};
  const avgConfidence =
    records.length > 0
      ? Math.round((records.reduce((sum, r) => sum + r.confidenceScore, 0) / records.length) * 100)
      : 0;

  records.forEach((r) => {
    subjectCounts[r.subject] = (subjectCounts[r.subject] || 0) + 1;
    difficultyCounts[r.difficultyLevel] = (difficultyCounts[r.difficultyLevel] || 0) + 1;
  });

  if (records.length === 0) {
    return (
      <div className="w-full text-center py-16">
        <div className="w-16 h-16 bg-gradient-to-br from-primary-100 to-primary-200 rounded-2xl flex items-center justify-center mx-auto mb-4 animate-float">
          <Database className="w-8 h-8 text-primary-400" />
        </div>
        <h2 className="text-xl font-semibold text-surface-800">Hafizada Kayit Yok</h2>
        <p className="text-sm text-surface-500 mt-2 font-light">Bir yansima girerek pedagojik hafizanizi olusturmaya baslayin.</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-surface-900 mb-2">Pedagojik Hafiza Paneli</h2>
        <p className="text-surface-500 font-light text-sm">Tum analiz sonuclari ve istatistikler.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard label="Toplam Kayit" value={records.length} gradient="from-primary-500 to-primary-600" />
        <StatCard label="Ders Sayisi" value={Object.keys(subjectCounts).length} gradient="from-accent-500 to-accent-600" />
        <StatCard label="Ort. Guven" value={`%${avgConfidence}`} gradient="from-primary-600 to-primary-700" />
        <StatCard label="Guvenli Kayit" value={records.filter((r) => r.privacyStatus === "Safe" || r.privacyStatus === "Anonimleştirildi" || r.privacyStatus === "Kişisel Veri Yok").length} gradient="from-accent-600 to-accent-700" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="glass rounded-2xl p-6 shadow-lg shadow-primary-500/5">
          <h3 className="text-sm font-semibold text-surface-700 mb-4 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-primary-500" />
            Ders Dagilimi
          </h3>
          <div className="space-y-3">
            {Object.entries(subjectCounts).sort(([, a], [, b]) => b - a).map(([subject, count]) => (
              <div key={subject} className="flex items-center gap-3">
                <span className="text-sm text-surface-600 font-light w-32 truncate">{subject}</span>
                <div className="flex-1 h-2 bg-surface-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-primary-400 to-primary-600 transition-all duration-500"
                    style={{ width: `${(count / records.length) * 100}%` }}
                  />
                </div>
                <span className="text-sm font-semibold text-surface-900 w-6 text-right">{count}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="glass rounded-2xl p-6 shadow-lg shadow-primary-500/5">
          <h3 className="text-sm font-semibold text-surface-700 mb-4 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-accent-500" />
            Zorluk Dagilimi
          </h3>
          <div className="space-y-3">
            {["Kolay", "Orta", "Zor", "Cok Zor"].map((level) => (
              <div key={level} className="flex items-center gap-3">
                <span className="text-sm text-surface-600 font-light w-16">{level}</span>
                <div className="flex-1 h-2 bg-surface-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-accent-400 to-accent-600 transition-all duration-500"
                    style={{ width: `${((difficultyCounts[level] || 0) / records.length) * 100}%` }}
                  />
                </div>
                <span className="text-sm font-semibold text-surface-900 w-6 text-right">{difficultyCounts[level] || 0}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Records Table */}
      <div className="glass rounded-2xl shadow-lg shadow-primary-500/5 overflow-hidden">
        <div className="px-6 py-5 border-b border-white/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h3 className="text-sm font-semibold text-surface-700">
            Kayit Listesi
            <span className="ml-2 px-2 py-0.5 rounded-md bg-primary-50 text-primary-600 text-xs">{displayedRecords.length}</span>
          </h3>
          <div className="relative w-full sm:w-72">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ders veya konu ara..."
              className="w-full pl-9 pr-3 py-2.5 bg-white/60 border border-surface-200 rounded-xl text-sm text-surface-900 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-400 placeholder:text-surface-400 font-light transition-all"
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-surface-50/50">
                <Th>Tarih</Th><Th>Ders</Th><Th>Konu</Th><Th>Zorluk</Th><Th>Guven</Th><Th>Gizlilik</Th><Th align="right">Islemler</Th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-100/50">
              {displayedRecords.map((record: ReflectionRecord) => (
                <tr key={record.id} className="hover:bg-primary-50/20 transition-colors">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2 text-sm text-surface-600">
                      <Calendar className="w-3.5 h-3.5 text-surface-400" />
                      {new Date(record.timestamp).toLocaleDateString("tr-TR")}
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="text-sm font-medium text-surface-900">{record.subject}</span>
                  </td>
                  <td className="px-5 py-3.5 text-sm font-light text-surface-500 max-w-[200px] truncate">{record.topic}</td>
                  <td className="px-5 py-3.5">
                    <DifficultyBadge level={record.difficultyLevel} />
                  </td>
                  <td className="px-5 py-3.5 text-sm font-semibold text-surface-900">%{Math.round(record.confidenceScore * 100)}</td>
                  <td className="px-5 py-3.5">
                    <PrivacyBadge status={record.privacyStatus} />
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button onClick={() => onViewRecord(record)} className="p-2 text-surface-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all" title="Detay">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button onClick={() => onDeleteRecord(record.id)} className="p-2 text-surface-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all" title="Sil">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {displayedRecords.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-5 py-8 text-center text-sm text-surface-500">
                    Arama kriterlerine uygun kayit bulunamadi.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, gradient }: { label: string; value: string | number; gradient: string }) {
  return (
    <div className="glass rounded-2xl p-5 shadow-lg relative overflow-hidden group hover:scale-[1.02] transition-transform">
      <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${gradient} rounded-full blur-2xl opacity-10 group-hover:opacity-20 transition-opacity`} />
      <p className="text-[10px] font-semibold text-surface-400 tracking-widest uppercase mb-2">{label}</p>
      <p className="text-3xl font-bold tracking-tight text-surface-900">{value}</p>
    </div>
  );
}

function Th({ children, align }: { children: React.ReactNode; align?: string }) {
  return <th className={`${align === "right" ? "text-right" : "text-left"} px-5 py-3 text-[10px] font-semibold text-surface-400 uppercase tracking-widest`}>{children}</th>;
}

function DifficultyBadge({ level }: { level: string }) {
  const classes = level === "Çok Zor" ? "bg-red-50 text-red-600 border-red-200" :
    level === "Zor" ? "bg-amber-50 text-amber-600 border-amber-200" :
    level === "Orta" ? "bg-blue-50 text-blue-600 border-blue-200" :
    "bg-green-50 text-green-600 border-green-200";
  return <span className={`text-xs font-medium px-2 py-0.5 rounded-md border ${classes}`}>{level}</span>;
}

function PrivacyBadge({ status }: { status: string }) {
  const isGreen = status === "Safe" || status === "Anonimleştirildi" || status === "Kişisel Veri Yok";
  return (
    <span className={`text-xs font-medium px-2 py-0.5 rounded-md border ${
      isGreen ? "bg-accent-50 text-accent-600 border-accent-200" :
      status === "Needs Review" ? "bg-amber-50 text-amber-600 border-amber-200" :
      "bg-red-50 text-red-600 border-red-200"
    }`}>
      {isGreen ? "Anonim" : status}
    </span>
  );
}
