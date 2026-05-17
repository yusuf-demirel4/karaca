import { Shield, Database, Sparkles } from "lucide-react";

interface HeaderProps {
  recordCount: number;
}

export default function Header({ recordCount }: HeaderProps) {
  return (
    <header className="glass sticky top-0 z-50 border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center shadow-lg shadow-primary-500/20">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-semibold tracking-tight text-surface-900 leading-tight">
                Maarif Hafiza
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-5">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-accent-50 border border-accent-200">
              <Shield className="w-3.5 h-3.5 text-accent-600" />
              <span className="text-xs font-medium tracking-wide text-accent-700">KVKK Uyumlu</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary-50 border border-primary-200">
              <Database className="w-3.5 h-3.5 text-primary-600" />
              <span className="text-xs font-medium tracking-wide text-primary-700">{recordCount} Kayit</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
