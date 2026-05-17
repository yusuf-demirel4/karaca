import { Shield, Database } from "lucide-react";
import { Link } from "react-router-dom";

interface HeaderProps {
  recordCount: number;
}

export default function Header({ recordCount }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-apple-border-light">
      <div className="max-w-[980px] mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between h-auto sm:h-12 py-2 sm:py-0 gap-1.5 sm:gap-4">
          <span className="text-sm font-semibold text-apple-text">Maarif Hafıza</span>
          <div className="flex items-center gap-3 text-xs text-apple-text-tertiary">
            <Link to="/kvkk" className="flex items-center gap-1 hover:text-apple-blue transition-colors">
              <Shield className="w-3 h-3" /> KVKK
            </Link>
            <span className="flex items-center gap-1"><Database className="w-3 h-3" /> {recordCount} kayıt</span>
          </div>
        </div>
      </div>
    </header>
  );
}
