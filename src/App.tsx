import { useState, useCallback } from "react";
import type { ReflectionRecord } from "./types";
import { useEffect } from "react";
import Header from "./components/Header";
import ReflectionInput from "./components/ReflectionInput";
import AnalysisResult from "./components/AnalysisResult";
import Dashboard from "./components/Dashboard";

export default function App() {
  const [records, setRecords] = useState<ReflectionRecord[]>([]);
  const [currentAnalysis, setCurrentAnalysis] = useState<ReflectionRecord | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3000/api/records")
      .then((res) => res.json())
      .then((data) => setRecords(data))
      .catch((err) => console.error("Failed to fetch records:", err));
  }, []);

  const handleSubmit = useCallback(async (text: string) => {
    setIsAnalyzing(true);
    try {
      const res = await fetch("http://localhost:3000/api/analyze-reflection", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      const data = await res.json();
      setCurrentAnalysis(data);
      setIsSaved(false);
    } catch (error) {
      console.error("Analysis failed:", error);
      alert("Analiz başarısız oldu.");
    } finally {
      setIsAnalyzing(false);
    }
  }, []);

  const handleSave = useCallback(async () => {
    if (currentAnalysis && !isSaved) {
      try {
        await fetch("http://localhost:3000/api/records", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ record: currentAnalysis }),
        });
        setRecords((prev) => [currentAnalysis, ...prev]);
        setIsSaved(true);
      } catch (error) {
        console.error("Save failed:", error);
      }
    }
  }, [currentAnalysis, isSaved]);

  const handleLoadSampleData = useCallback(async () => {
    // For testing purposes since sampleReflections is removed from App.tsx, we rely on the ReflectionInput buttons
    alert("Lütfen demo verisini yüklemek için sol paneldeki yansıma butonlarını kullanın.");
  }, []);

  const handleViewRecord = useCallback((record: ReflectionRecord) => {
    setCurrentAnalysis(record);
    setIsSaved(true);
    // Scroll to top to see analysis
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleDeleteRecord = useCallback(async (id: string) => {
    try {
      await fetch(`http://localhost:3000/api/records/${id}`, { method: "DELETE" });
      setRecords((prev) => prev.filter((r) => r.id !== id));
      setCurrentAnalysis((prev) => prev?.id === id ? null : prev);
    } catch (error) {
      console.error("Delete failed:", error);
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#fbfbfd]">
      <Header recordCount={records.length} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Hero Section */}
        <div className="mb-16 text-center">
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-surface-900">
            Öğretmen Paneli
          </h2>
          <p className="mt-4 text-xl text-surface-500 max-w-2xl mx-auto font-light tracking-wide">
            Ders sonrası yansımalarınızı anonimleştirerek kurumsal bir pedagojik hafızaya dönüştürün.
          </p>
          <div className="mt-6 flex justify-center items-center gap-2 text-xs font-medium tracking-wide text-surface-400">
            Sistem öğrencileri izlemez veya ses kaydı tutmaz. Yalnızca öğretmen yansımaları işlenir.
          </div>
        </div>

        {/* Main Workspace (Split Pane) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16 items-start">
          
          {/* Left Column: Input */}
          <div className="bg-white rounded-2xl shadow-sm border border-surface-200 overflow-hidden sticky top-24">
            <ReflectionInput
              onSubmit={handleSubmit}
              isAnalyzing={isAnalyzing}
            />
            <div className="px-6 pb-6 pt-2">
              <button 
                onClick={handleLoadSampleData}
                className="w-full text-sm text-surface-500 hover:text-primary-600 transition-colors font-medium text-center"
              >
                + Demo Verilerini Yükle
              </button>
            </div>
          </div>

          {/* Right Column: Analysis Output */}
          <div>
            {currentAnalysis ? (
              <div className="bg-white rounded-2xl shadow-sm border border-surface-200">
                <AnalysisResult
                  record={currentAnalysis}
                  onSave={handleSave}
                  onNewReflection={() => { setCurrentAnalysis(null); setIsSaved(false); }}
                  isSaved={isSaved}
                />
              </div>
            ) : (
              <div className="h-full min-h-[400px] flex flex-col items-center justify-center text-center p-8 bg-surface-100 rounded-2xl border-2 border-dashed border-surface-300">
                <div className="w-16 h-16 bg-surface-200 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-surface-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium tracking-tight text-surface-900">Analiz Bekleniyor</h3>
                <p className="text-sm text-surface-500 max-w-sm mt-2 font-light tracking-wide">
                  Sol taraftaki panele bir ders yansıması girerek veya "Demo Verilerini Yükle" butonunu kullanarak yapay zekâ analizini başlatın.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Section: Memory Table */}
        <div className="border-t border-surface-200 pt-12">
          <Dashboard
            records={records}
            onViewRecord={handleViewRecord}
            onDeleteRecord={handleDeleteRecord}
          />
        </div>

      </main>
      <footer className="border-t border-surface-200 bg-white mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-surface-700">PedagoHafıza</span>
              <span className="text-xs text-surface-400">v1.0 MVP</span>
            </div>
            <p className="text-xs text-surface-500 text-center">
              Yapay zekâ destekli pedagojik hafıza sistemi — Hackathon / Promptathon Demo
            </p>
            <div className="flex items-center gap-2 text-xs text-surface-400">
              <span>KVKK Uyumlu</span>
              <span>•</span>
              <span>Anonim Veri</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
