import { useState } from "react";
import { Database, Calendar, Trash2, Eye, Search as SearchIcon } from "lucide-react";
import type { ReflectionRecord } from "../types";


interface DashboardProps {
  records: ReflectionRecord[];
  onViewRecord: (record: ReflectionRecord) => void;
  onDeleteRecord: (id: string) => void;
}

export default function Dashboard({ records, onViewRecord, onDeleteRecord }: DashboardProps) {
  const [query, setQuery] = useState("");
  
  const displayedRecords = query.trim().length > 1 ? records.filter(r => r.subject.toLowerCase().includes(query.toLowerCase()) || r.topic.toLowerCase().includes(query.toLowerCase())) : records;
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
      <div className="w-full text-center py-12">
        <Database className="w-12 h-12 text-surface-300 mx-auto mb-3" />
        <h2 className="text-lg font-semibold text-surface-700">Hafızada Kayıt Yok</h2>
        <p className="text-sm text-surface-500 mt-1">Önce bir yansıma girin veya demo verilerini yükleyin.</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="mb-10 text-center md:text-left">
        <h2 className="text-2xl font-medium tracking-tight text-surface-900 mb-2">Pedagojik Hafıza Paneli</h2>
        <p className="text-surface-500 font-light tracking-wide text-sm">Tüm analiz sonuçları ve istatistikler.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard label="Toplam Kayıt" value={records.length} />
        <StatCard label="Ders Sayısı" value={Object.keys(subjectCounts).length} />
        <StatCard label="Ort. Güven" value={`%${avgConfidence}`} />
        <StatCard label="Güvenli Kayıt" value={records.filter((r) => r.privacyStatus === "Safe" || r.privacyStatus === "Anonimleştirildi" || r.privacyStatus === "Kişisel Veri Yok").length} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-2xl border border-surface-100 p-6 shadow-sm">
          <h3 className="text-sm font-medium tracking-wide text-surface-700 mb-4">Ders Dağılımı</h3>
          <div className="space-y-3">
            {Object.entries(subjectCounts).sort(([, a], [, b]) => b - a).map(([subject, count]) => (
              <div key={subject} className="flex items-center justify-between">
                <span className="text-sm text-surface-600 font-light tracking-wide">{subject}</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 h-1 bg-surface-100 rounded-full overflow-hidden">
                    <div className="h-full bg-surface-900 rounded-full" style={{ width: `${(count / records.length) * 100}%` }} />
                  </div>
                  <span className="text-sm font-medium text-surface-900 w-6 text-right">{count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-surface-100 p-6 shadow-sm">
          <h3 className="text-sm font-medium tracking-wide text-surface-700 mb-4">Zorluk Dağılımı</h3>
          <div className="space-y-3">
            {["Kolay", "Orta", "Zor", "Çok Zor"].map((level) => (
              <div key={level} className="flex items-center justify-between">
                <span className="text-sm text-surface-600 font-light tracking-wide w-16">{level}</span>
                <div className="flex items-center gap-2 flex-1 ml-4">
                  <div className="flex-1 h-1 bg-surface-100 rounded-full overflow-hidden">
                    <div className="h-full rounded-full bg-surface-900" style={{ width: `${((difficultyCounts[level] || 0) / records.length) * 100}%` }} />
                  </div>
                  <span className="text-sm font-medium text-surface-900 w-6 text-right">{difficultyCounts[level] || 0}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-surface-100 shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-surface-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h3 className="text-sm font-medium tracking-wide text-surface-700">Kayıt Listesi ({displayedRecords.length})</h3>
          <div className="relative w-full sm:w-72">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ders, konu veya anahtar kelime ara..."
              className="w-full pl-9 pr-3 py-2 bg-[#fbfbfd] border border-surface-200 rounded-lg text-sm text-surface-900 focus:outline-none focus:ring-1 focus:ring-surface-900 focus:border-surface-900 placeholder:text-surface-400 font-light tracking-wide"
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-surface-50">
                <Th>Tarih</Th><Th>Ders</Th><Th>Konu</Th><Th>Zorluk</Th><Th>Güven</Th><Th>Gizlilik</Th><Th align="right">İşlemler</Th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-100">
              {displayedRecords.map((record: ReflectionRecord) => (
                <tr key={record.id} className="hover:bg-surface-50 transition-colors">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2 text-sm text-surface-600">
                      <Calendar className="w-3.5 h-3.5 text-surface-400" />
                      {new Date(record.timestamp).toLocaleDateString("tr-TR")}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-light tracking-wide text-surface-900">{record.subject}</span>
                  </td>
                  <td className="px-6 py-4 text-sm font-light tracking-wide text-surface-500">{record.topic}</td>
                  <td className="px-6 py-4">
                    <DifficultyBadge level={record.difficultyLevel} />
                  </td>
                  <td className="px-6 py-4 text-sm font-medium tracking-tight text-surface-900">%{Math.round(record.confidenceScore * 100)}</td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-light tracking-wide text-surface-500 border border-surface-200 px-2 py-1 rounded-md">
                      {record.privacyStatus === "Anonimleştirildi" ? "✓ Anonim" : record.privacyStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => onViewRecord(record)} className="p-2 text-surface-400 hover:text-surface-900 hover:bg-surface-100 rounded-lg transition-colors" title="Detay"><Eye className="w-4 h-4" /></button>
                      <button onClick={() => onDeleteRecord(record.id)} className="p-2 text-surface-400 hover:text-surface-900 hover:bg-surface-100 rounded-lg transition-colors" title="Sil"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {displayedRecords.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-5 py-8 text-center text-sm text-surface-500">
                    Arama kriterlerine uygun kayıt bulunamadı.
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

function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="bg-white rounded-2xl border border-surface-100 p-6 shadow-sm">
      <p className="text-xs font-medium text-surface-500 tracking-wider uppercase mb-1">{label}</p>
      <p className="text-3xl font-medium tracking-tight text-surface-900">{value}</p>
    </div>
  );
}

function Th({ children, align }: { children: React.ReactNode; align?: string }) {
  return <th className={`${align === "right" ? "text-right" : "text-left"} px-5 py-3 text-xs font-semibold text-surface-500 uppercase tracking-wide`}>{children}</th>;
}

function DifficultyBadge({ level }: { level: string }) {
  return <span className="text-xs font-light tracking-wide text-surface-600 border border-surface-200 px-2 py-1 rounded-md">{level}</span>;
}
