import { FileText, Shield, Brain, Lightbulb, Check } from "lucide-react";

const steps = [
  { icon: FileText, label: "Not alindi" },
  { icon: Shield, label: "Anonimleştirme" },
  { icon: Brain, label: "YZ analizi" },
  { icon: Lightbulb, label: "Oneri uretimi" },
];

export default function AnalysisProgress({ step }: { step: number }) {
  return (
    <div className="rounded-2xl bg-apple-bg-secondary border border-apple-border-light p-8 min-h-[300px] flex flex-col items-center justify-center">
      <div className="w-12 h-12 rounded-full bg-apple-blue/10 flex items-center justify-center mb-6">
        <div className="w-5 h-5 border-2 border-apple-blue border-t-transparent rounded-full animate-spin" />
      </div>

      <div className="w-full max-w-xs space-y-3">
        {steps.map((s, i) => {
          const num = i + 1;
          const done = step > num;
          const active = step === num;
          const Icon = s.icon;
          return (
            <div key={i} className="flex items-center gap-3">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium ${
                done ? "bg-green-500 text-white" :
                active ? "bg-apple-blue text-white" :
                "bg-apple-border-light text-apple-text-tertiary"
              }`}>
                {done ? <Check className="w-3.5 h-3.5" /> : <Icon className="w-3.5 h-3.5" />}
              </div>
              <span className={`text-sm ${active ? "text-apple-text font-medium" : done ? "text-green-600" : "text-apple-text-tertiary"}`}>
                {s.label}
              </span>
            </div>
          );
        })}
      </div>

      <div className="w-full max-w-xs mt-6 h-1 bg-apple-border-light rounded-full overflow-hidden">
        <div className="h-full bg-apple-blue rounded-full transition-all duration-500" style={{ width: `${(step / 4) * 100}%` }} />
      </div>
    </div>
  );
}
