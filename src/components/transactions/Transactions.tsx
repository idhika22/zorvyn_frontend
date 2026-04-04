import type { Dispatch, SetStateAction } from "react";
import type { Role, Transaction, TransactionType, TransactionStatus } from "../../types";
import StatusBadge from "../common/StatusBadge";
import { fmt } from "../../utils/format";

function getCategoryStyles(category: string) {
  switch (category) {
    case "Food":
      return "bg-[#1fa67a]/20 text-[#1fa67a]";
    case "Entertainment":
      return "bg-[#e07b39]/20 text-[#e07b39]";
    case "Business":
      return "bg-[#5a7bd4]/20 text-[#5a7bd4]";
    case "Utilities":
      return "bg-[#9b6fb5]/20 text-[#9b6fb5]";
    case "Gifts":
      return "bg-[#d4607a]/20 text-[#d4607a]";
    case "Transfer":
      return "bg-[#50b8a0]/20 text-[#50b8a0]";
    case "Income":
      return "bg-[#4caf7d]/20 text-[#4caf7d]";
    default:
      return "bg-white/10 text-white/80";
  }
}

interface TransactionsProps {
  role: Role;
  transactions: Transaction[];
  filteredTxns: Transaction[];
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  filterType: "all" | TransactionType;
  setFilterType: Dispatch<SetStateAction<"all" | TransactionType>>;
  filterStatus: "all" | TransactionStatus;
  setFilterStatus: Dispatch<SetStateAction<"all" | TransactionStatus>>;
  sortBy: "date" | "amount";
  setSortBy: Dispatch<SetStateAction<"date" | "amount">>;
  sortDir: "asc" | "desc";
  setSortDir: Dispatch<SetStateAction<"asc" | "desc">>;
  onOpenAdd: () => void;
  onDelete: (id: string) => void;
}

export default function Transactions({
  role,
  transactions,
  filteredTxns,
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
  onOpenAdd,
  onDelete,
}: TransactionsProps) {
  return (
    <div className="rounded-[16px] border border-white/10 bg-[#1a1f2e] overflow-hidden">
      <div className="flex flex-wrap items-center gap-3 border-b border-white/10 p-5">
        <div>
          <div className="text-base font-bold">Recent Transactions</div>
          <div className="text-[11px] text-white/35">
            {filteredTxns.length} of {transactions.length} shown
          </div>
        </div>

        <div className="flex-1" />

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search..."
          className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none placeholder:text-white/30"
        />

        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value as "all" | TransactionType)}
          className=" appearence-none rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none"
        >
          <option className="bg-dark text-white" value="all">All Types</option>
          <option className="bg-dark text-white" value="income">Income</option>
          <option  className="bg-dark text-white" value="expense">Expense</option>
        </select>

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value as "all" | TransactionStatus)}
          className=" appearence-none rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none"
        >
          <option value="all" className="bg-dark text-white">All Status</option>
          <option value="success" className="bg-dark text-white">Success</option>
          <option value="waiting" className="bg-dark text-white">Waiting</option>
          <option value="due_date" className="bg-dark text-white">Due Date</option>
          <option value="disabled" className="bg-dark text-white">Disabled</option>
        </select>

        <select
          value={`${sortBy}_${sortDir}`}
          onChange={(e) => {
            const [by, dir] = e.target.value.split("_") as ["date" | "amount", "asc" | "desc"];
            setSortBy(by);
            setSortDir(dir);
          }}
          className="appearence-none rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none"
        >
          <option value="date_desc" className="bg-dark text-white">Newest First</option>
          <option value="date_asc" className="bg-dark text-white">Oldest First</option>
          <option value="amount_desc" className="bg-dark text-white">Highest Amount</option>
          <option value="amount_asc" className="bg-dark text-white">Lowest Amount</option>
        </select>

        {role === "admin" && (
          <button
            onClick={onOpenAdd}
            className="rounded-xl bg-[#1fa67a] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#189e72]"
          >
            + Add
          </button>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-white/5">
              {['Date', 'Description', 'Category', 'Amount', 'Status', 'Method'].map((col) => (
                <th
                  key={col}
                  className="whitespace-nowrap px-5 py-3 text-left text-[10px] font-semibold uppercase tracking-[0.08em] text-white/35"
                >
                  {col}
                </th>
              ))}
              {role === "admin" && <th className="px-5 py-3" />}
            </tr>
          </thead>
          <tbody>
            {filteredTxns.length === 0 ? (
              <tr>
                <td colSpan={role === "admin" ? 7 : 6} className="px-5 py-10 text-center text-sm text-white/30">
                  No transactions found
                </td>
              </tr>
            ) : (
              filteredTxns.map((t) => (
                <tr
                  key={t.id}
                  className="border-t border-white/5 transition hover:bg-white/5"
                >
                  <td className="px-5 py-4 text-white/45 whitespace-nowrap">
                    {new Date(t.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </td>
                  <td className="px-5 py-4">
                    <div className="font-medium">{t.description}</div>
                    <div className="text-[11px] text-white/35">{t.type === "income" ? "Receive" : "Sent"}</div>
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-[11px] font-semibold ${getCategoryStyles(t.category)}`}
                    >
                      {t.category}
                    </span>
                  </td>
                  <td className={`px-5 py-4 font-semibold ${t.type === "income" ? "text-[#1fa67a]" : "text-[#e05a5a]"}`}>
                    {t.type === "income" ? "+" : "-"}
                    {fmt(t.amount)}
                  </td>
                  <td className="px-5 py-4">
                    <StatusBadge status={t.status} />
                  </td>
                  <td className="px-5 py-4 text-[12px] text-white/45">
                    <div>{t.method}</div>
                    <div className="text-[11px] text-white/25">**** {t.methodLast4}</div>
                  </td>
                  {role === "admin" && (
                    <td className="px-5 py-4">
                      <button
                        onClick={() => onDelete(t.id)}
                        className="rounded-lg border border-[#e05a5a]/30 bg-[#e05a5a]/10 px-3 py-2 text-[11px] font-semibold text-[#e05a5a] transition hover:bg-[#e05a5a]/15"
                      >
                        Delete
                      </button>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {role === "viewer" && (
        <div className="flex items-center gap-2 border-t border-white/10 bg-[#121726] p-4 text-[12px] text-white/55">
          <span className="text-[#5a7bd4]">ℹ</span>
          You are viewing as <strong className="text-[#5a7bd4]">Viewer</strong>. Switch to <strong className="text-[#5a7bd4]">Admin</strong> using the role selector above to add or delete transactions.
        </div>
      )}
    </div>
  );
}
