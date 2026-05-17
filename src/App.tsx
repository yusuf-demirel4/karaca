import { useState, useCallback, useEffect, useRef } from "react";
import type { ReflectionRecord } from "./types";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import ReflectionInput from "./components/ReflectionInput";
import AnalysisResult from "./components/AnalysisResult";
import AnalysisProgress from "./components/AnalysisProgress";
import Dashboard from "./components/Dashboard";

export default function App() {
  const [records, setRecords] = useState<ReflectionRecord[]>([]);
  const [currentAnalysis, setCurrentAnalysis] = useState<ReflectionRecord | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [analysisStep, setAnalysisStep] = useState(0);
  const workspaceRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("http://localhost:3000/api/records")
      .then(r => r.json())
      .then(setRecords)
      .catch(() => {});
  }, []);

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
      const res = await fetch("http://localhost:3000/api/analyze-reflection", {
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
      alert("Analiz basarisiz oldu. Backend calistigini kontrol edin.");
      setIsAnalyzing(false);
      setAnalysisStep(0);
    }

    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  const handleSave = useCallback(async () => {
    if (!currentAnalysis || isSaved) return;
    try {
      await fetch("http://localhost:3000/api/records", {
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
      await fetch(`http://localhost:3000/api/records/${id}`, { method: "DELETE" });
      setRecords(prev => prev.filter(r => r.id !== id));
      if (currentAnalysis?.id === id) setCurrentAnalysis(null);
    } catch {}
  }, [currentAnalysis]);

  return (
    <div className="min-h-screen bg-white">
      <Header recordCount={records.length} />
      <HeroSection onStartDemo={scrollToWorkspace} recordCount={records.length} />

      {/* Workspace — always visible */}
      <section ref={workspaceRef} className="bg-white py-16">
        <div className="max-w-[980px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            {/* Input */}
            <div className="rounded-2xl border border-apple-border-light bg-white shadow-sm sticky top-16">
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
                  <p className="text-sm text-apple-text-tertiary max-w-xs">Sol panelden bir yansima girin veya ornek secin.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Dashboard */}
      <section className="bg-apple-bg py-16 border-t border-apple-border-light">
        <div className="max-w-[980px] mx-auto px-6">
          <Dashboard records={records} onViewRecord={handleViewRecord} onDeleteRecord={handleDeleteRecord} />
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-apple-border-light py-6">
        <div className="max-w-[980px] mx-auto px-6 flex items-center justify-between text-xs text-apple-text-tertiary">
          <span>Maarif Hafiza v1.0 — Java Takimi</span>
          <div className="flex gap-3">
            <span>KVKK Uyumlu</span>
            <span>SKA 4</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
