"use client";
import { PLANS, formatVND, BAG_CAPACITY } from "@/lib/data";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus } from "lucide-react";

const MOCK_SUBSCRIBERS = [
  { id: "sub-001", name: "Nguyễn Thị Mai", phone: "0901xxx123", building: "P3", apt: "12A-05", plan: "Đôi", bagsUsed: 2, bagsTotal: 4, rollover: 1, since: "03/2026" },
  { id: "sub-002", name: "Lê Phương Anh", phone: "0912xxx456", building: "L4", apt: "15-03", plan: "Gia Đình", bagsUsed: 3, bagsTotal: 4, rollover: 0, since: "02/2026" },
  { id: "sub-003", name: "Phạm Đức Anh", phone: "0938xxx789", building: "P5", apt: "20-11", plan: "Đôi", bagsUsed: 4, bagsTotal: 4, rollover: 2, since: "01/2026" },
  { id: "sub-004", name: "Võ Thanh Hằng", phone: "0909xxx321", building: "L1", apt: "10-08", plan: "Cá Nhân", bagsUsed: 1, bagsTotal: 4, rollover: 0, since: "04/2026" },
  { id: "sub-005", name: "Đỗ Minh Quân", phone: "0987xxx654", building: "P3", apt: "08-02", plan: "Đôi", bagsUsed: 0, bagsTotal: 4, rollover: 3, since: "01/2026" },
];

export default function SubscribersPage() {
  return (
    <div className="space-y-8 max-w-6xl">
      <div className="flex items-end justify-between mb-2">
        <div>
          <h1 className="text-2xl font-black tracking-tighter text-slate-900 drop-shadow-sm mb-2">Subscribers</h1>
          <p className="text-sm font-semibold text-slate-500 tracking-wide">{MOCK_SUBSCRIBERS.length} active subscriptions.</p>
        </div>
      </div>

      {/* Plan Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {PLANS.map((plan) => {
          const count = MOCK_SUBSCRIBERS.filter((s) => s.plan === plan.name).length;
          return (
            <div key={plan.id} className="glass-card glass-card-hover rounded-[2rem] overflow-hidden group">
              <div className="p-6 bg-white/40 h-full flex flex-col justify-between">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold text-slate-500 group-hover:text-sky-700 transition-colors tracking-tight uppercase">Plan {plan.name}</h3>
                  <span className="text-4xl font-black tracking-tighter text-slate-900 bg-white/60 px-4 py-1 rounded-2xl shadow-inner border border-white">{count}</span>
                </div>
                <div className="flex items-center justify-between pt-5 border-t border-white/50">
                  <p className="text-xs font-bold font-mono text-slate-500">{formatVND(plan.price)}<span className="font-medium text-slate-400">/mo</span></p>
                  <p className="text-[10px] font-black uppercase tracking-widest text-sky-600 bg-sky-50 px-2 py-1 rounded-md">{BAG_CAPACITY[plan.bagSize]}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Subscribers Table */}
      <div className="glass-card rounded-[2rem] overflow-hidden bg-white/40">
        <Table>
          <TableHeader className="bg-white/60">
            <TableRow className="border-white/50 hover:bg-transparent">
              <TableHead className="text-[10px] uppercase font-bold tracking-widest text-slate-500 h-14">Client Info</TableHead>
              <TableHead className="text-[10px] uppercase font-bold tracking-widest text-slate-500">Location</TableHead>
              <TableHead className="text-[10px] uppercase font-bold tracking-widest text-slate-500">Tier</TableHead>
              <TableHead className="text-[10px] uppercase font-bold tracking-widest text-slate-500 text-center">Quota Usage</TableHead>
              <TableHead className="text-[10px] uppercase font-bold tracking-widest text-slate-500 text-center">Rollover</TableHead>
              <TableHead className="text-[10px] uppercase font-bold tracking-widest text-slate-500 text-right">Member Since</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y divide-white/50">
            {MOCK_SUBSCRIBERS.map((sub) => {
              const usagePct = (sub.bagsUsed / sub.bagsTotal) * 100;
              return (
                <TableRow key={sub.id} className="border-white/50 hover:bg-white/80 transition-colors group cursor-pointer">
                  <TableCell>
                    <p className="text-sm font-bold text-slate-900 group-hover:text-sky-700 transition-colors">{sub.name}</p>
                    <p className="text-xs font-mono font-semibold text-slate-500">{sub.phone}</p>
                  </TableCell>
                  <TableCell>
                    <p className="text-sm font-bold text-slate-700">{sub.building}</p>
                    <p className="text-xs font-semibold text-slate-500">Apt {sub.apt}</p>
                  </TableCell>
                  <TableCell>
                    <span className="text-[10px] font-black text-sky-800 bg-sky-100 border border-sky-200 px-2.5 py-1 rounded-full tracking-wide">
                      {sub.plan}
                    </span>
                  </TableCell>
                  <TableCell className="w-48 align-middle">
                    <div className="flex flex-col gap-2 px-4">
                      <div className="flex items-center justify-between text-xs font-mono font-bold text-slate-400">
                        <span className="text-slate-700">{sub.bagsUsed} used</span>
                        <span>{sub.bagsTotal}</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-200/50 rounded-full overflow-hidden shadow-inner flex">
                        <div className="h-full bg-sky-500 transition-all rounded-full" style={{ width: `${usagePct}%` }} />
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-center align-middle">
                    {sub.rollover > 0 ? (
                      <span className="inline-flex items-center gap-0.5 text-xs font-black text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-lg border border-indigo-100 shadow-sm">
                        <Plus className="w-3 h-3" />{sub.rollover}
                      </span>
                    ) : (
                      <span className="text-xs font-bold text-slate-300">—</span>
                    )}
                  </TableCell>
                  <TableCell className="text-right text-xs font-mono font-bold text-slate-400 group-hover:text-slate-600 transition-colors">
                    {sub.since}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
