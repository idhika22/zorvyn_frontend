import { CATEGORY_COLORS } from "../data/mockData";

export const fmt=(n:number)=>
    new Intl.NumberFormat("en-IN",{style:"currency",currency:"INR",minimumFractionDigits:2}).format(n);

export const fmtShort=(n:number)=>
    n>1000? `₹${(n/1000).toFixed(1)}k`:`₹${n.toFixed(0)}`;

export const catColor=(cat:string)=>
    CATEGORY_COLORS[cat]??"#888";