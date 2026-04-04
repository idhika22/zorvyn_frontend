interface SideBarProps {
  activeNav: string;
  onChange: (label: string) => void;
}

const navItems = [
  { label: "Dashboard", icon: "▣" },
  { label: "Transactions", icon: "⇄" },
  { label: "My Goals", icon: "◎" },
  { label: "Investment", icon: "▦" },
  { label: "Bills & Payment", icon: "▤" },
  { label: "Analytics", icon: "▲" },
];

const supportItems = [
  { label: "Help", icon: "?" },
  { label: "Integrations", icon: "⊞" },
  { label: "Settings", icon: "⚙" },
];

export default function SideBar({ activeNav, onChange }: SideBarProps) {
  return (
    <div className="flex h-full flex-col overflow-hidden">
      <div className="p-5 pt-6">
        <div className="mb-8 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-[10px] bg-gradient-to-br from-[#1fa67a] to-[#0d5c46] text-base font-bold">
            $$
          </div>
          <div>
            <div className="text-sm font-semibold">FinSight</div>
            <div className="text-[10px] text-white/35">Financial Assistant</div>
          </div>
        </div>

        <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-white/30">Menu</div>
        <nav className="flex flex-col gap-2">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => onChange(item.label)}
              className={`flex items-center gap-3 rounded-[10px] px-3 py-2 text-left text-sm transition-all duration-150 ${
                activeNav === item.label
                  ? "bg-[#1fa67a]/15 text-[#1fa67a] font-semibold"
                  : "text-white/55 hover:text-white"
              }`}
            >
              <span className="inline-flex h-5 w-5 items-center justify-center text-base">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        <div className="mt-6 mb-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-white/30">Support</div>
        <nav className="flex flex-col gap-2">
          {supportItems.map((item) => (
            <button
              key={item.label}
              className="flex items-center gap-3 rounded-[10px] px-3 py-2 text-left text-sm text-white/45 hover:text-white"
            >
              <span className="inline-flex h-5 w-5 items-center justify-center text-base">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>
      </div>

      <div className="mt-auto p-4">
        <div className="rounded-[14px] border border-[#1fa67a]/20 bg-gradient-to-br from-[#1f9f72]/10 to-[#1f9f72]/05 p-4">
          <div className="mb-2 text-sm font-semibold">Become Pro Access</div>
          <div className="mb-3 text-[11px] text-white/50">Try your experience for using more features</div>
          <button className="w-full rounded-lg border border-[#1fa67a]/40 bg-[#1fa67a]/15 px-3 py-2 text-sm font-semibold text-[#1fa67a]">
            ♛ Upgrade Pro
          </button>
        </div>
      </div>
    </div>
  );
}
