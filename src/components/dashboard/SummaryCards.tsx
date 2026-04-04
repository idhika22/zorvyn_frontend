import { fmt } from "../../utils/format";

interface SummaryCardsProps {
  balance: number;
  totalIncome: number;
  totalExpenses: number;
  transactionCount: number;
}

export default function SummaryCards({ balance, totalIncome, totalExpenses, transactionCount }: SummaryCardsProps) {
  const cards = [
    { label: "Total Balance", value: fmt(balance), icon: "◈", colorClass: "text-[#1fa67a]", trend: "+24.17%" },
    { label: "Total Income", value: fmt(totalIncome), icon: "↑", colorClass: "text-[#4caf7d]" },
    { label: "Total Expenses", value: fmt(totalExpenses), icon: "↓", colorClass: "text-[#e05a5a]" },
    { label: "Transactions", value: String(transactionCount), icon: "≡", colorClass: "text-[#5a7bd4]" },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <div key={card.label} className="rounded-[14px] border border-white/10 bg-[#1a1f2e] p-5">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-[11px] text-white/40 font-medium">{card.label}</span>
            <span className={`text-[16px] ${card.colorClass}`}>
              {card.icon}
            </span>
          </div>
          <div className="text-[22px] font-extrabold tracking-[-0.03em] text-white">{card.value}</div>
          {card.trend ? <div className="mt-2 text-[11px] font-semibold text-[#1fa67a]">{card.trend} vs last month</div> : null}
        </div>
      ))}
    </div>
  );
}
