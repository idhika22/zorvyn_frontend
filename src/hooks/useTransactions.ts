import { useState, useEffect, useMemo } from "react";
import type { Transaction, TransactionType, TransactionStatus } from "../types/index";
import { INITIAL_TRANSACTIONS, BASE_BALANCE } from "../data/mockData";

export function useTransactions(){
    const [transactions, setTransactions] = useState<Transaction[]>(() => {
        try {
          const stored = localStorage.getItem("fin_txns");
          return stored ? JSON.parse(stored) : INITIAL_TRANSACTIONS;
        } catch {
          return INITIAL_TRANSACTIONS;
        }
      });

      const [search,       setSearch]       = useState("");
      const [filterType,   setFilterType]   = useState<"all" | TransactionType>("all");
      const [filterStatus, setFilterStatus] = useState<"all" | TransactionStatus>("all");
      const [sortBy,       setSortBy]       = useState<"date" | "amount">("date");
      const [sortDir,      setSortDir]      = useState<"asc" | "desc">("desc");

      useEffect(() => {
        localStorage.setItem("fin_txns", JSON.stringify(transactions));
      }, [transactions]);
    
      const totalIncome = useMemo(
        () => transactions.filter((t) => t.type === "income").reduce((s, t) => s + t.amount, 0),
        [transactions]
      );
    
      const totalExpenses = useMemo(
        () => transactions.filter((t) => t.type === "expense").reduce((s, t) => s + t.amount, 0),
        [transactions]
      );

      const balance = useMemo(() => {
        const seedIncome   = INITIAL_TRANSACTIONS.filter((t) => t.type === "income").reduce((s, t) => s + t.amount, 0);
        const seedExpenses = INITIAL_TRANSACTIONS.filter((t) => t.type === "expense").reduce((s, t) => s + t.amount, 0);
        return BASE_BALANCE + (totalIncome - seedIncome) - (totalExpenses - seedExpenses);
      }, [totalIncome, totalExpenses]);

      const spendingByCategory = useMemo(() => {
        const map: Record<string, number> = {};
        transactions
          .filter((t) => t.type === "expense")
          .forEach((t) => { map[t.category] = (map[t.category] ?? 0) + t.amount; });
        return Object.entries(map).sort((a, b) => b[1] - a[1]);
      }, [transactions]);

      const thisMonthExpenses = useMemo(() => {
        const month = new Date().getMonth();
        return transactions
          .filter((t) => t.type === "expense" && new Date(t.date).getMonth() === month)
          .reduce((s, t) => s + t.amount, 0);
      }, [transactions]);
    
      const lastMonthExpenses = useMemo(() => {
        const month = new Date().getMonth();
        const last  = month === 0 ? 11 : month - 1;
        return transactions
          .filter((t) => t.type === "expense" && new Date(t.date).getMonth() === last)
          .reduce((s, t) => s + t.amount, 0);
      }, [transactions]);

      const filteredTxns = useMemo(() => {
        return transactions
          .filter((t) => {
            const q           = search.toLowerCase();
            const matchSearch = !q || [t.description, t.category, t.method].some((f) => f.toLowerCase().includes(q));
            const matchType   = filterType   === "all" || t.type   === filterType;
            const matchStatus = filterStatus === "all" || t.status === filterStatus;
            return matchSearch && matchType && matchStatus;
          })
          .sort((a, b) => {
            const cmp =
              sortBy === "date"
                ? new Date(a.date).getTime() - new Date(b.date).getTime()
                : a.amount - b.amount;
            return sortDir === "desc" ? -cmp : cmp;
          });
      }, [transactions, search, filterType, filterStatus, sortBy, sortDir]);
    
      const addTransaction    = (t: Transaction)  => setTransactions((prev) => [t, ...prev]);
      const deleteTransaction = (id: string)      => setTransactions((prev) => prev.filter((t) => t.id !== id));
    
      return {
        
        transactions, filteredTxns,
        totalIncome, totalExpenses, balance,
        spendingByCategory, thisMonthExpenses, lastMonthExpenses,
        search, setSearch,
        filterType, setFilterType,
        filterStatus, setFilterStatus,
        sortBy, setSortBy,
        sortDir, setSortDir,
        addTransaction, deleteTransaction,
      };
}