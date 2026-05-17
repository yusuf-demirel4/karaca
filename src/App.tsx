import { useState, useCallback, useEffect } from "react";
import type { ReflectionRecord } from "./types";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import ReflectionInput from "./components/ReflectionInput";
import AnalysisResult from "./components/AnalysisResult";
import Dashboard from "./components/Dashboard";

export default function App() {
  const [records, setRecords] = useState<ReflectionRecord[]>([]);
  const [currentAnalysis, setCurrentAnalysis] = useState<ReflectionRecord | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [showWorkspace, setShowWorkspace] = useState(false);

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
      alert("Analiz basarisiz oldu.");
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

  const handleStartDemo = useCallback(() => {
    setShowWorkspace(true);
    setTimeout(() => {
      document.getElementById("workspace")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, []);

  const handleViewRecord = useCallback((record: ReflectionRecord) => {
    setCurrentAnalysis(record);
    setIsSaved(true);
    setShowWorkspace(true);
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 100);
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
    <div className="min-h-screen bg-surface-50 relative overflow-hidden">
      {/* Background orbs for Apple-style ambient lighting */}
      <div className="orb w-[600px] h-[600px] bg-primary-300 top-[-200px] right-[-100px] fixed" />
      <div className="orb w-[500px] h-[500px] bg-accent-300 bottom-[-200px] left-[-100px] fixed" />
      <div className="orb w-[400px] h-[400px] bg-primary-200 top-[50%] left-[50%] fixed" />

      <div className="relative z-10">
        <Header recordCount={records.length} />

        {/* Hero Section */}
        <HeroSection onStartDemo={handleStartDemo} recordCount={records.length} />

        {/* Workspace */}
        {showWorkspace && (
          <main id="workspace" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            {/* Section Title */}
            <div className="mb-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-surface-900">
                Ogretmen Paneli
              </h2>
              <p className="mt-3 text-lg text-surface-500 max-w-2xl mx-auto font-light">
                Ders sonrasi yansimalarinizi anonimleştirerek kurumsal bir pedagojik hafizaya donusturun.
              </p>
            </div>

            {/* Main Workspace */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16 items-start">
              {/* Left Column: Input */}
              <div className="glass rounded-3xl shadow-xl shadow-primary-500/5 sticky top-24">
                <ReflectionInput
                  onSubmit={handleSubmit}
                  isAnalyzing={isAnalyzing}
                />
              </div>

              {/* Right Column: Analysis Output */}
              <div>
                {currentAnalysis ? (
                  <div className="glass rounded-3xl shadow-xl shadow-primary-500/5">
                    <AnalysisResult
                      record={currentAnalysis}
                      onSave={handleSave}
                      onNewReflection={() => { setCurrentAnalysis(null); setIsSaved(false); }}
                      isSaved={isSaved}
                    />
                  </div>
                ) : (
                  <div className="h-full min-h-[400px] flex flex-col items-center justify-center text-center p-8 rounded-3xl border-2 border-dashed border-surface-200 bg-white/40 backdrop-blur-sm">
                    <div className="w-20 h-20 bg-gradient-to-br from-primary-100 to-primary-200 rounded-2xl flex items-center justify-center mb-6 animate-float">
                      <svg className="w-10 h-10 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold tracking-tight text-surface-900">Analiz Bekleniyor</h3>
                    <p className="text-sm text-surface-500 max-w-sm mt-3 font-light leading-relaxed">
                      Sol taraftaki panele bir ders yansimasi girerek yapay zeka analizini baslatin.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Dashboard */}
            <div className="pt-12">
              <Dashboard
                records={records}
                onViewRecord={handleViewRecord}
                onDeleteRecord={handleDeleteRecord}
              />
            </div>
          </main>
        )}

        {/* Footer */}
        <footer className="glass border-t border-white/20 mt-12 relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-md bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center">
                  <span className="text-[10px] font-bold text-white">MH</span>
                </div>
                <span className="text-sm font-semibold text-surface-700">Maarif Hafiza</span>
                <span className="text-xs text-surface-400 px-2 py-0.5 rounded-full bg-surface-100">v1.0 MVP</span>
              </div>
              <p className="text-xs text-surface-500 text-center">
                Yapay zeka destekli anonim egitim hafizasi — Java Takimi
              </p>
              <div className="flex items-center gap-3 text-xs text-surface-400">
                <span className="px-2 py-1 rounded-md bg-accent-50 text-accent-600 font-medium">KVKK Uyumlu</span>
                <span className="px-2 py-1 rounded-md bg-primary-50 text-primary-600 font-medium">SKA 4</span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
