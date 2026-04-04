import type { Transaction } from "../../types";
import  {catColor} from "../../utils/format"
import { fmt } from "../../utils/format";
export function MiniBarChart({data,labels}:{data:number[];labels:string[]}){
    const max=Math.max(...data);
    return (
      <div className="flex items-end gap-1.5 h-16 px-1">
        {data.map((v,i)=>(
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
            <div className={`w-full rounded 
               ${i === data.length - 1 ? "bg-[#1fa67a]" : "bg-[rgba(31,166,122,0.3)]"}
               transition-all duration-300 ease-in-out`}
               style={{ height: `${(v / max) * 52}px` }}/>
             <span className="text-[9px] text-white/40 tracking-[0.03em]">{labels[i]}</span>
             </div>
        ))}
      </div>
    );
}

export function BalanceTrendChart({data,labels}:{data:number[],labels:string[]}){
    const w=480,h=110;
    const min=Math.min(...data)*0.97;
    const max=Math.max(...data)*1.02;
    const pts=data.map((v,i)=>({
        x:(i/(data.length-1))*(w-40)+20,
        y:h-20-((v-min)/(max-min))*(h-40),
    }))
    const d = pts.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
    const area = `${d} L ${pts[pts.length - 1].x} ${h} L ${pts[0].x} ${h} Z`;
    return(
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-auto overflow-visible">
        <defs>
            <linearGradient id="trendGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1fa67a" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#1fa67a" stopOpacity="0" />
            </linearGradient>
        </defs>
        <path d={area} fill="url(#trendGrad)"/>
        <path d={d} fill="none" stroke="#1fa67a" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round"/>
        {pts.map((p,i)=>(
            <g key={i}>
                <circle cx={p.x} cy={p.y} r={i==pts.length-1?5:3} fill={i==pts.length-1? "#1fa67a":"rgba(31,166,122,0.5)"}></circle>
                <text x={p.x} y={h - 2} textAnchor="middle" fontSize={9} fill="rgba(255,255,255,0.35)">{labels[i]}</text>
            </g>
        ))}
      </svg> 
    );
}

export function SpendingDonut({transactions}:{transactions:Transaction[]}){
 const expenses=transactions.filter(t=>t.type==="expense");
 const byCategory:Record<string,number>={};
 expenses.forEach(t=>{byCategory[t.category]=(byCategory[t.category]??0)+t.amount});
 const total=Object.values(byCategory).reduce((a,b)=>a+b,0);
 const entries=Object.entries(byCategory).sort((a,b)=>b[1]- a[1]);

 const r = 36, cx = 44, cy = 44;
 let cumAngle = -Math.PI / 2;
 const slices=entries.map(([cat,val])=>{
    const angle=(val / total) * 2 * Math.PI;
    const x1 = cx + r * Math.cos(cumAngle);
    const y1 = cy + r * Math.sin(cumAngle);
    cumAngle+=angle;
    const x2 = cx + r * Math.cos(cumAngle);
    const y2 = cy + r * Math.sin(cumAngle);
    const large = angle > Math.PI ? 1 : 0;
    return {cat, val, x1, y1, x2, y2, large, color: catColor(cat)};
 }) 
 return (
    <div className="flex items-center gap-4">
    <svg width={88} height={88} className="shrink-0">
      {slices.map((s, i) => (
        <path
          key={i}
          d={`M ${cx} ${cy} L ${s.x1} ${s.y1} A ${r} ${r} 0 ${s.large} 1 ${s.x2} ${s.y2} Z`}
          fill={s.color}
          opacity={0.9}
        />
      ))}
  
      <circle cx={cx} cy={cy} r={22} fill="#1a1f2e" />
  
      <text
        x={cx}
        y={cy + 4}
        textAnchor="middle"
        className="text-[9px] font-semibold fill-white/70"
      >
        {fmt(total)}
      </text>
    </svg>
  
    <div className="flex flex-col gap-1 flex-1">
      {entries.slice(0, 5).map(([cat, val]) => (
        <div key={cat} className="flex items-center gap-1.5 text-[11px]">
          <span
            className="w-2 h-2 rounded-[2px] shrink-0"
            style={{ background: catColor(cat) }}
          />
          <span className="text-white/60 flex-1">{cat}</span>
          <span className="text-white/85 font-semibold">{fmt(val)}</span>
        </div>
      ))}
    </div>
  </div>
 );


}