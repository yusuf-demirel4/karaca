import { useState, useCallback, useEffect, useRef } from "react";
import { Routes, Route } from "react-router-dom";
import type { ReflectionRecord } from "./types";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import ReflectionInput from "./components/ReflectionInput";
import AnalysisResult from "./components/AnalysisResult";
import AnalysisProgress from "./components/AnalysisProgress";
import Dashboard from "./components/Dashboard";
import KvkkPage from "./pages/KvkkPage";

export default function App() {
  const apiBase = import.meta.env.VITE_API_BASE_URL ?? "";
  const [records, setRecords] = useState<ReflectionRecord[]>([]);
  const [currentAnalysis, setCurrentAnalysis] = useState<ReflectionRecord | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [analysisStep, setAnalysisStep] = useState(0);
  const workspaceRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch(`${apiBase}/api/records`)
      .then(r => r.json())
      .then(setRecords)
      .catch(() => {});
  }, [apiBase]);

  const scrollToWorkspace = () => {
    workspaceRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleSubmit = useCallback(async (text: string) => {
    setIsAnalyzing(true);
    setCurrentAnalysis(null);
    setAnalysisStep(1);

    const t1 = setTimeout(() => setAnalysisStep(2), 700);
    const t2 = setTimeout(() => setAnalysisStep(3), 1500);

    try {
      const res = await fetch(`${apiBase}/api/analyze-reflection`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      const data = await res.json();
      setAnalysisStep(4);
      setTimeout(() => {
        setCurrentAnalysis(data);
        setIsSaved(false);
        setIsAnalyzing(false);
        setAnalysisStep(0);
      }, 500);
    } catch {
      alert("Analiz başarısız oldu. Backend'in çalıştığını kontrol edin.");
      setIsAnalyzing(false);
      setAnalysisStep(0);
    }

    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  const handleSave = useCallback(async () => {
    if (!currentAnalysis || isSaved) return;
    try {
      await fetch(`${apiBase}/api/records`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ record: currentAnalysis }),
      });
      setRecords(prev => [currentAnalysis, ...prev]);
      setIsSaved(true);
    } catch {}
  }, [currentAnalysis, isSaved]);

  const handleViewRecord = useCallback((record: ReflectionRecord) => {
    setCurrentAnalysis(record);
    setIsSaved(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleDeleteRecord = useCallback(async (id: string) => {
    try {
      await fetch(`${apiBase}/api/records/${id}`, { method: "DELETE" });
      setRecords(prev => prev.filter(r => r.id !== id));
      if (currentAnalysis?.id === id) setCurrentAnalysis(null);
    } catch {}
  }, [currentAnalysis]);

  return (
    <div className="min-h-screen bg-white">
      <Header recordCount={records.length} />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <HeroSection onStartDemo={scrollToWorkspace} recordCount={records.length} />

              {/* Workspace — always visible */}
              <section ref={workspaceRef} className="bg-white py-8 sm:py-16">
                <div className="max-w-[980px] mx-auto px-4 sm:px-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
                    {/* Input */}
                    <div className="rounded-2xl border border-apple-border-light bg-white shadow-sm lg:sticky lg:top-16">
                      <ReflectionInput onSubmit={handleSubmit} isAnalyzing={isAnalyzing} />
                    </div>

                    {/* Output */}
                    <div>
                      {isAnalyzing ? (
                        <AnalysisProgress step={analysisStep} />
                      ) : currentAnalysis ? (
                        <div className="rounded-2xl border border-apple-border-light bg-white shadow-sm">
                          <AnalysisResult
                            record={currentAnalysis}
                            onSave={handleSave}
                            onNewReflection={() => { setCurrentAnalysis(null); setIsSaved(false); }}
                            isSaved={isSaved}
                          />
                        </div>
                      ) : (
                        <div className="rounded-2xl border border-apple-border-light bg-apple-bg-secondary min-h-[300px] flex flex-col items-center justify-center text-center p-8">
                          <div className="w-14 h-14 rounded-2xl bg-apple-blue/10 flex items-center justify-center mb-4">
                            <svg className="w-7 h-7 text-apple-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                          </div>
                          <p className="text-lg font-semibold text-apple-text mb-1">Analiz Bekleniyor</p>
                          <p className="text-sm text-apple-text-tertiary max-w-xs">Yukarıdan bir yansıma girin veya örnek seçin.</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </section>

              {/* Dashboard */}
              <section className="bg-apple-bg py-8 sm:py-16 border-t border-apple-border-light">
                <div className="max-w-[980px] mx-auto px-4 sm:px-6">
                  <Dashboard records={records} onViewRecord={handleViewRecord} onDeleteRecord={handleDeleteRecord} />
                </div>
              </section>
            </>
          }
        />
        <Route path="/kvkk" element={<KvkkPage />} />
      </Routes>

      {/* Footer */}
      <footer className="border-t border-apple-border-light py-4 sm:py-6">
        <div className="max-w-[980px] mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-apple-text-tertiary">
          <span>Maarif Hafıza v1.0 — Java Takımı</span>
          <div className="flex gap-3">
            <span>KVKK Uyumlu</span>
            <span>SKA 4</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
