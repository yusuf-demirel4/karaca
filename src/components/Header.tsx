import { Shield, Database } from "lucide-react";

interface HeaderProps {
  recordCount: number;
}

export default function Header({ recordCount }: HeaderProps) {
  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-surface-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div>
              <h1 className="text-xl font-medium tracking-tight text-surface-900 leading-tight">PedagoHafıza</h1>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-surface-500 hover:text-surface-900 transition-colors cursor-default">
              <Shield className="w-4 h-4" />
              <span className="text-xs font-medium tracking-wide">KVKK Uyumlu</span>
            </div>
            <div className="flex items-center gap-1.5 text-surface-500 hover:text-surface-900 transition-colors cursor-default">
              <Database className="w-4 h-4" />
              <span className="text-xs font-medium tracking-wide">{recordCount} Kayıt</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
