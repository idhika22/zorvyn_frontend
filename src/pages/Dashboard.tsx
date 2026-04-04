import { useEffect, useState } from "react";
import { useTransactions } from "../hooks/useTransactions";
import SideBar from "../components/layout/SideBar";
import TopBar from "../components/layout/TopBar";
import SummaryCards from "../components/dashboard/SummaryCards";
import { BalanceTrendChart, MiniBarChart, SpendingDonut } from "../components/dashboard/Charts";
import { InsightCard } from "../components/dashboard/Insights";
import Transactions from "../components/transactions/Transactions";
import { AddTransactionModal } from "../components/transactions/AddTransactionModal";
import { BALANCE_TREND, MONTH_LABELS } from "../data/mockData";
import type { Role } from "../types";

export default function Dashboard() {
  const [role, setRole] = useState<Role>(() => (localStorage.getItem("role") as Role) ?? "viewer");
  const [activeNav, setActiveNav] = useState("Dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(() => window.innerWidth >= 768);
  const [showModal, setShowModal] = useState(false);
  const [narrow, setNarrow] = useState(() => window.innerWidth < 768);

  const {
    transactions,
    filteredTxns,
    totalIncome,
    totalExpenses,
    balance,
    spendingByCategory,
    thisMonthExpenses,
    lastMonthExpenses,
    search,
    setSearch,
    filterType,
    setFilterType,
    filterStatus,
    setFilterStatus,
    sortBy,
    setSortBy,
    sortDir,
    setSortDir,
    addTransaction,
    deleteTransaction,
  } = useTransactions();

  useEffect(() => {
    const handleResize = () => {
      const isNowNarrow = window.innerWidth < 768;
      setNarrow(isNowNarrow);
      if (isNowNarrow) {
        setSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const exportCSV = () => {
    const header = "Date,Description,Category,Type,Amount,Status,Method";
    const rows = transactions.map(
      (t) => `${t.date},${t.description},${t.category},${t.type},${t.amount},${t.status},${t.method}`
    );
    const blob = new Blob([[header, ...rows].join("\n")], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "transactions.csv";
    link.click();
  };

  return (
    <div className="flex min-h-screen bg-[#0f1219] text-white relative">
      <aside
        className={`bg-[#131720] border-r border-white/6 flex flex-col transition-all duration-200 ease-in-out overflow-hidden ${
          sidebarOpen ? "w-[220px] min-w-[220px]" : "w-0 min-w-0"
        } ${narrow ? "fixed left-0 top-0 h-full z-30" : "relative"}`}
      >
        <SideBar activeNav={activeNav} onChange={setActiveNav} />
      </aside>

      {narrow && sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <main className="flex-1 min-w-0 flex flex-col overflow-auto">
        <TopBar
          role={role}
          onToggleSidebar={() => setSidebarOpen((prev) => !prev)}
          onRoleChange={(value) => {
            setRole(value);
            localStorage.setItem("role", value);
          }}
          onExport={exportCSV}
          isAdmin={role === "admin"}
        />

        <div className="p-5 md:p-6 flex flex-col gap-5">
          <SummaryCards
            balance={balance}
            totalIncome={totalIncome}
            totalExpenses={totalExpenses}
            transactionCount={transactions.length}
          />

          <div className="grid gap-5 xl:grid-cols-3">
            <div className="rounded-[14px] border border-white/10 bg-[#1a1f2e] p-5">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="text-[12px] text-white/40 mb-1">Balance Trend</div>
                  <div className="text-[20px] font-extrabold">{balance.toLocaleString("en-IN", { style: "currency", currency: "INR" })}</div>
                </div>
                <span className="rounded-lg bg-[#1fa67a]/20 px-3 py-1 text-[11px] font-semibold text-[#1fa67a]">
                  6 months
                </span>
              </div>
              <BalanceTrendChart data={BALANCE_TREND} labels={MONTH_LABELS} />
            </div>

            <div className="rounded-[14px] border border-white/10 bg-[#1a1f2e] p-5">
              <div className="text-[12px] text-white/40 mb-1">Spending Breakdown</div>
              <div className="text-[14px] font-bold mb-4">By Category</div>
              <SpendingDonut transactions={transactions} />
            </div>

            <div className="rounded-[14px] border border-white/10 bg-[#1a1f2e] p-5">
              <div className="text-[12px] text-white/40 mb-1">Monthly Overview</div>
              <div className="text-[14px] font-bold mb-4">Income vs Expenses</div>
              <MiniBarChart data={[3200, 4100, 2800, 5500, 4800, totalIncome]} labels={MONTH_LABELS} />
              <div className="mt-3 flex gap-4 text-[11px] text-white/60">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-sm bg-[#1fa67a]" /> Income
                </div>
              </div>
            </div>
          </div>

          <section>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-sm font-bold text-white/80">Insights</h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <InsightCard
                icon="🏆"
                title="Highest Spending Category"
                value={spendingByCategory[0]?.[0] ?? "—"}
                sub={spendingByCategory[0] ? spendingByCategory[0][1].toLocaleString("en-IN", { style: "currency", currency: "INR" }) : "No data"}
                accentClass="text-[#e07b39]"
              />
              <InsightCard
                icon="📅"
                title="This Month's Expenses"
                value={thisMonthExpenses.toLocaleString("en-IN", { style: "currency", currency: "INR" })}
                sub={
                  lastMonthExpenses > 0
                    ? `${thisMonthExpenses > lastMonthExpenses ? "+" : ""}${Math.round(((thisMonthExpenses - lastMonthExpenses) / lastMonthExpenses) * 100)}% vs last month`
                    : "First month"
                }
                accentClass={thisMonthExpenses > lastMonthExpenses ? "text-[#e05a5a]" : "text-[#1fa67a]"}
              />
              <InsightCard
                icon="💰"
                title="Savings Ratio"
                value={totalIncome > 0 ? `${Math.max(0, Math.round(((totalIncome - totalExpenses) / totalIncome) * 100))}%` : "—"}
                sub="Income minus expenses"
                accentClass="text-[#5a7bd4]"
              />
              <InsightCard
                icon="⚡"
                title="Pending Transactions"
                value={String(transactions.filter((t) => t.status === "waiting" || t.status === "due_date").length)}
                sub="Waiting or due date"
                accentClass="text-[#e0993a]"
              />
            </div>
          </section>

          <Transactions
            role={role}
            transactions={transactions}
            filteredTxns={filteredTxns}
            search={search}
            setSearch={setSearch}
            filterType={filterType}
            setFilterType={setFilterType}
            filterStatus={filterStatus}
            setFilterStatus={setFilterStatus}
            sortBy={sortBy}
            setSortBy={setSortBy}
            sortDir={sortDir}
            setSortDir={setSortDir}
            onOpenAdd={() => setShowModal(true)}
            onDelete={deleteTransaction}
          />
        </div>
      </main>

      {showModal && (
        <AddTransactionModal
          onClose={() => setShowModal(false)}
          onAdd={(t) => {
            addTransaction(t);
            setShowModal(false);
          }}
        />
      )}
    </div>
  );
}
