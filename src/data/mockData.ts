import type { Transaction } from "../types/index";
export const INITIAL_TRANSACTIONS: Transaction[] = [
    { id: "t1", date: "2024-06-24", description: "Company", category: "Business", amount: 1500, type: "expense", status: "waiting", method: "Credit Card", methodLast4: "3560" },
    { id: "t2", date: "2024-06-18", description: "Vera K.", category: "Transfer", amount: 800, type: "income", status: "success", method: "Bank Transfer", methodLast4: "4275" },
    { id: "t3", date: "2024-06-08", description: "Birthday Gift", category: "Gifts", amount: 240, type: "expense", status: "due_date", method: "Credit Card", methodLast4: "9052" },
    { id: "t4", date: "2024-06-02", description: "Rifqy A.", category: "Transfer", amount: 240, type: "income", status: "disabled", method: "Bank Transfer", methodLast4: "2093" },
    { id: "t5", date: "2024-05-28", description: "Netflix", category: "Entertainment", amount: 15.99, type: "expense", status: "success", method: "Credit Card", methodLast4: "3560" },
    { id: "t6", date: "2024-05-22", description: "Salary", category: "Income", amount: 5200, type: "income", status: "success", method: "Bank Transfer", methodLast4: "4275" },
    { id: "t7", date: "2024-05-18", description: "Grocery Store", category: "Food", amount: 132.5, type: "expense", status: "success", method: "Debit Card", methodLast4: "1122" },
    { id: "t8", date: "2024-05-10", description: "Electricity Bill", category: "Utilities", amount: 85, type: "expense", status: "success", method: "Bank Transfer", methodLast4: "4275" },
    { id: "t9", date: "2024-05-05", description: "Freelance Project", category: "Business", amount: 1200, type: "income", status: "success", method: "Bank Transfer", methodLast4: "4275" },
    { id: "t10", date: "2024-04-29", description: "Spotify", category: "Entertainment", amount: 9.99, type: "expense", status: "success", method: "Credit Card", methodLast4: "3560" },
    { id: "t11", date: "2024-04-20", description: "Dining Out", category: "Food", amount: 68.4, type: "expense", status: "success", method: "Credit Card", methodLast4: "9052" },
    { id: "t12", date: "2024-04-15", description: "Bonus", category: "Income", amount: 2000, type: "income", status: "success", method: "Bank Transfer", methodLast4: "4275" },
  ];

  export const MONTHS=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  export const BALANCE_TREND = [18200, 19100, 17800, 20500, 19300, 20088];
 export const MONTH_LABELS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
 export const BASE_BALANCE   = 20088.38;
 export const CATEGORY_COLORS: Record<string, string> = {
    Food: "#1fa67a",
    Entertainment: "#e07b39",
    Business: "#5a7bd4",
    Utilities: "#9b6fb5",
    Gifts: "#d4607a",
    Transfer: "#50b8a0",
    Income: "#4caf7d",
  };