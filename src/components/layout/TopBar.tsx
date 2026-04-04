import type { Role } from "../../types";
import { useState } from "react";
interface TopBarProps {
  role: Role;
  isAdmin: boolean;
  onToggleSidebar: () => void;
  onRoleChange: (value: Role) => void;
  onExport: () => void;
}

export default function TopBar({ role, isAdmin, onToggleSidebar, onRoleChange, onExport }: TopBarProps) {
  const [name] = useState(() => localStorage.getItem("name") ?? "User");
  return (
    <header className="sticky top-0 z-40 flex items-center gap-3 border-b border-white/6 bg-[#131720] px-5 py-4">
      <button
        onClick={onToggleSidebar}
        className="rounded-lg border border-white/10 bg-transparent px-3 py-2 text-lg text-white/60 transition hover:text-white"
      >
        ☰
      </button>
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[#f5a623] to-[#e07b39] text-sm font-bold">
          {name.charAt(0).toUpperCase()}
        </div>
        <div>
          <div className="text-sm font-semibold">{name}</div>
          <div className="text-[11px] text-white/40">Hello, Welcome back!</div>
        </div>
      </div>

      <div className="flex-1" />

      <div className="flex items-center gap-2">
        <span className="text-[11px] text-white/40">Role:</span>
        <select
          value={role}
          onChange={(e) => onRoleChange(e.target.value as Role)}
          className={`appearance-none rounded-lg border px-3 py-2 text-sm outline-none ${
            role === "admin"
              ? "border-[#1fa67a]/40 bg-[#1fa67a]/15 text-[#1fa67a]"
              : "border-white/10 bg-white/5 text-white/70"
          }`}
        >
          <option className="bg-dark text-white" value="admin">Admin</option>
          <option className="bg-dark text-white" value="viewer">Viewer</option>
        </select>
      </div>

      {isAdmin && (
        <button
          onClick={onExport}
          className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-[11px] font-semibold text-white/70 transition hover:text-white"
        >
          ↓ Export CSV
        </button>
      )}
    </header>
  );
}
