import type{ Transaction,TransactionType} from "../../types";
import { useState } from "react";
export function AddTransactionModal({onClose,onAdd}:{onClose:()=>void;onAdd:(t:Transaction)=>void}){
    const [form, setForm] = useState({ description: "", category: "Food", amount: "", type: "expense" as TransactionType, method: "Credit Card", methodLast4: "0000" });
    const categories=["Food", "Entertainment", "Business", "Utilities", "Gifts", "Transfer", "Income", "Other"];
    const handleSubmit=()=>{
        if(!form.description || !form.amount)return;
        const t:Transaction={
            id:`${Date.now()}`,
            date:new Date().toISOString().split("T")[0],
            description:form.description,
            category:form.category,
            amount:parseFloat(form.amount),
            type:form.type,
            status:"success",
            method:form.method,
            methodLast4:form.methodLast4
        };
        onAdd(t);
        onClose();
    }
    return(
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70" onClick={onClose}>
           <div className="w-[360px] rounded-2xl border border-white/10 bg-[#1a1f2e] p-6 shadow-xl"
             onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-5">
                <h3 className="text-white text-base font-bold">Add Transaction</h3>
                <button className="text-white/50 hover:text-white text-xl leading-none" onClick={onClose}>x</button>
            </div>
            {/*Form*/}
            <div className="flex flex-col gap-4">
                <div>
                    <label className="block text-[11px] text-white/50 mb-1">Description</label>
                    <input value={form.description} onChange={(e)=>setForm({...form,description:e.target.value})} 
                     placeholder="eg.Netflix" className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm 
                     text-white outline-none focus:border-[#1fa67a]"/>
                </div>
                

                <div className="grid grid-cols-2 gap-2.5">
                    <div>
                        <label className="block text-[11px] text-white/50 mb-1">Amount(₹)</label> 
                        <input type="number" value={form.amount} onChange={(e)=>setForm({...form,amount:e.target.value})}
                        placeholder="0.00" className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm 
                        text-white outline-none focus:border-[#1fa67a]"/>
                    </div>

                    <div>
                        <label className="block text-[11px] text-white/50 mb-1">Type</label>
                        <select value={form.type} onChange={(e)=>setForm({...form,type:e.target.value as TransactionType})} className=" appearence-none w-full rounded-lg border border-white/10 bg-white/5 
                         px-3 py-2 text-sm text-white outline-none focus:border-[#1fa67a]">
                            <option value="income" className="bg-dark text-white">Income</option>
                            <option value="expense" className="bg-dark text-white">Expense</option>
                        </select>
                    </div>
                </div>
                   
                <div>
                    <label className="block text-[11px] text-white/50 mb-1">Category</label>
                    <select value={form.category} onChange={(e)=>setForm({...form,category:e.target.value})} className=" appearence-none w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 
                     text-sm text-white outline-none focus:border-[#1fa67a]">
                        {categories.map((c)=>(
                            <option key={c} value={c} className="bg-dark text-white">{c}</option>
                        ))}
                    </select>
                </div>

                <div className="grid grid-cols-[1fr_auto] gap-2.5">
                    <div>
                        <label className="block text-[11px] text-white/50 mb-1">Payment Method</label>
                        <select value={form.method} onChange={(e)=>setForm({...form,method:e.target.value})} className=" appearence-none w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm 
                         text-white outline-none focus:border-[#1fa67a]" >
                         <option className="bg-dark text-white">Credit Card</option>
                         <option className="bg-dark text-white">Bank Transfer</option>
                         <option className="bg-dark text-white">Debit Card</option>
                         <option className="bg-dark text-white">Cash</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-[11px] text-white/50 mb-1">Last 4</label>
                        <input maxLength={4} value={form.methodLast4} placeholder="0000" onChange={(e)=>setForm({...form,methodLast4:e.target.value})} className="w-[64px] rounded-lg border border-white/10 bg-white/5 px-2 py-2 text-sm 
                         text-white outline-none focus:border-[#1fa67a]"/>
                    </div>
                </div>

                <button
                onClick={handleSubmit}
                className="mt-1 w-full rounded-xl bg-[#1fa67a] py-3 text-sm font-bold text-white hover:bg-[#189e72] transition"
                >
                 Add Transaction
                </button>
                
            </div>
           </div>
        </div>
    );
}