import type { ReactNode } from "react";

interface InsightCardProps {
  icon: string;
  title: string;
  value: string | number | ReactNode;
  sub: string;
  accentClass: string;
}

export function InsightCard({ icon, title, value, sub, accentClass }: InsightCardProps) {
  return (
    <div className="flex items-start gap-3 rounded-[20px] border border-white/10 bg-white/5 p-4">
      <span className="text-[18px] leading-none">{icon}</span>
      <div>
        <div className="mb-1 text-[11px] text-white/40">{title}</div>
        <div className={`mb-1 text-base font-bold ${accentClass}`}>
          {value}
        </div>
        <div className="text-[11px] text-white/50">{sub}</div>
      </div>
    </div>
  );
}
