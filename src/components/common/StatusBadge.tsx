import type { TransactionStatus } from "../../types";
function StatusBadge({status}:{status:TransactionStatus}){
  const map:Record<TransactionStatus,{label:string;className:string}>={
    success: { label: "Success", className: "text-[#2bca8c] bg-[#2bca8c]/10" },
    waiting: { label: "Waiting", className: "text-[#e0993a] bg-[#e0993a]/10" },
    due_date: { label: "Due Date", className: "text-[#e05a5a] bg-[#e05a5a]/10" },
    disabled: { label: "Disabled", className: "text-white/60 bg-white/10" },
  }
  const s=map[status];
  return (
    <span className={`text-[11px] font-semibold tracking-[0.04em] px-[10px] py-[3px] rounded-[20px] ${s.className}`}>
      {s.label}
    </span>
  );
}
export default StatusBadge;