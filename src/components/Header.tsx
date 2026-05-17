import { Shield, Database } from "lucide-react";

interface HeaderProps {
  recordCount: number;
}

export default function Header({ recordCount }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-apple-border-light">
      <div className="max-w-[980px] mx-auto px-6">
        <div className="flex items-center justify-between h-12">
          <span className="text-sm font-semibold text-apple-text">Maarif Hafıza</span>
          <div className="flex items-center gap-4 text-xs text-apple-text-tertiary">
            <span className="flex items-center gap-1"><Shield className="w-3 h-3" /> KVKK</span>
            <span className="flex items-center gap-1"><Database className="w-3 h-3" /> {recordCount} kayıt</span>
          </div>
        </div>
      </div>
    </header>
  );
}
