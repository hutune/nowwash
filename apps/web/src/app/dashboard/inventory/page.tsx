"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Package, Lock, RefreshCcw } from "lucide-react";

const MOCK_BAGS = [
  { id: "bag-1", qr: "BAG-VM-001-A", size: "M", status: "AT_CUSTOMER", holder: "Nguyễn Thị Mai" },
  { id: "bag-2", qr: "BAG-VS-101-A", size: "S", status: "IN_WORKSHOP", holder: "NowWash" },
  { id: "bag-3", qr: "BAG-VL-045-C", size: "L", status: "OUT_FOR_DELIVERY", holder: "Shipper: Bảo" },
  { id: "bag-4", qr: "BAG-VM-012-B", size: "M", status: "IN_WORKSHOP", holder: "NowWash" },
  { id: "bag-5", qr: "BAG-VM-088-X", size: "M", status: "AVAILABLE", holder: "Kho Trung Tâm" },
];

const MOCK_SEALS = [
  { id: "seal-1", qr: "SEAL-7890-XYZ", status: "LOCKED", assignedTo: "BAG-VM-001-A" },
  { id: "seal-2", qr: "SEAL-1234-ABC", status: "BROKEN", assignedTo: "BAG-VL-045-C (Delivered)" },
  { id: "seal-3", qr: "SEAL-4567-DEF", status: "LOCKED", assignedTo: "BAG-VM-012-B" },
  { id: "seal-4", qr: "SEAL-8901-GHI", status: "BROKEN", assignedTo: "BAG-VS-101-A (Washing)" },
  { id: "seal-5", qr: "SEAL-9999-NEW", status: "AVAILABLE", assignedTo: "Kho Trung Tâm" },
];

export default function InventoryPage() {
  return (
    <div className="space-y-8 max-w-6xl">
      <div className="flex items-end justify-between mb-4">
        <div>
          <h1 className="text-2xl font-black tracking-tighter text-slate-900 drop-shadow-sm mb-2">Inventory Management</h1>
          <p className="text-sm font-semibold text-slate-500 tracking-wide">Tracking heavy-duty assets & single-use seals.</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-card glass-card-hover rounded-[2rem] overflow-hidden group">
          <div className="p-6 h-full flex flex-col justify-between bg-white/40">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-sky-600 text-white flex items-center justify-center shadow-lg shadow-sky-600/30 group-hover:scale-110 transition-transform">
                  <Package className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-black tracking-tight text-slate-900">Heavy-duty Bags</h3>
                  <p className="text-xs font-semibold text-slate-500">Total in circulation</p>
                </div>
              </div>
              <span className="text-4xl font-black tracking-tighter text-sky-700 bg-white/80 px-4 py-1 rounded-full shadow-inner border border-white">842</span>
            </div>
            <div className="flex gap-4">
              <div className="flex-1 bg-white/60 p-3 rounded-xl border border-white/80 shrink-0 text-center">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Available</p>
                <p className="text-xl font-black text-slate-700">120</p>
              </div>
              <div className="flex-1 bg-sky-50 p-3 rounded-xl border border-sky-100 shrink-0 text-center">
                <p className="text-[10px] font-bold text-sky-600/70 uppercase tracking-widest mb-1">In Use</p>
                <p className="text-xl font-black text-sky-700">722</p>
              </div>
            </div>
          </div>
        </div>

        <div className="glass-card glass-card-hover rounded-[2rem] overflow-hidden group">
          <div className="p-6 h-full flex flex-col justify-between bg-white/40">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-lg shadow-indigo-600/30 group-hover:scale-110 transition-transform flex-shrink-0">
                  <Lock className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-black tracking-tight text-slate-900">Crypto Seals</h3>
                  <p className="text-xs font-semibold text-slate-500">Single-use stock</p>
                </div>
              </div>
              <span className="text-4xl font-black tracking-tighter text-indigo-700 bg-white/80 px-4 py-1 rounded-full shadow-inner border border-white">5K+</span>
            </div>
            <div className="flex gap-4">
              <div className="flex-1 bg-white/60 p-3 rounded-xl border border-white/80 shrink-0 text-center">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Available</p>
                <p className="text-xl font-black text-slate-700">4,250</p>
              </div>
              <div className="flex-1 bg-indigo-50 p-3 rounded-xl border border-indigo-100 shrink-0 text-center">
                <p className="text-[10px] font-bold text-indigo-600/70 uppercase tracking-widest mb-1">Locked</p>
                <p className="text-xl font-black text-indigo-700">82</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Tabs defaultValue="bags" className="w-full">
        <TabsList className="glass-card bg-white/40 h-14 p-1.5 rounded-full mb-6 max-w-sm">
          <TabsTrigger value="bags" className="rounded-full rounded-r-none flex-1 data-[state=active]:bg-white data-[state=active]:text-sky-700 data-[state=active]:shadow-sm font-bold transition-all">Heavy Bags</TabsTrigger>
          <TabsTrigger value="seals" className="rounded-full flex-1 data-[state=active]:bg-white data-[state=active]:text-indigo-700 data-[state=active]:shadow-sm font-bold transition-all">Crypto Seals</TabsTrigger>
        </TabsList>

        <TabsContent value="bags">
          <div className="glass-card rounded-[2rem] overflow-hidden bg-white/40">
            <Table>
              <TableHeader className="bg-white/60">
                <TableRow className="border-white/50 hover:bg-transparent">
                  <TableHead className="text-[10px] uppercase font-bold tracking-widest text-slate-500 h-14">QR Identity</TableHead>
                  <TableHead className="text-[10px] uppercase font-bold tracking-widest text-slate-500 text-center">Size</TableHead>
                  <TableHead className="text-[10px] uppercase font-bold tracking-widest text-slate-500 text-center">Status</TableHead>
                  <TableHead className="text-[10px] uppercase font-bold tracking-widest text-slate-500">Current Holder</TableHead>
                  <TableHead className="text-[10px] uppercase font-bold tracking-widest text-slate-500 text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="divide-y divide-white/50">
                {MOCK_BAGS.map((bag) => (
                  <TableRow key={bag.id} className="border-white/50 hover:bg-white/80 transition-colors">
                    <TableCell className="font-mono font-bold text-xs text-sky-700">{bag.qr}</TableCell>
                    <TableCell className="text-center">
                      <span className="inline-flex w-7 h-7 items-center justify-center rounded-lg bg-white border border-slate-200 text-xs font-black shadow-sm text-slate-700">
                        {bag.size}
                      </span>
                    </TableCell>
                    <TableCell className="text-center">
                      <span className={`inline-flex px-3 py-1 text-[10px] font-bold tracking-widest uppercase rounded-full border shadow-sm ${
                        bag.status === 'AVAILABLE' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                        bag.status === 'AT_CUSTOMER' ? 'bg-sky-50 text-sky-700 border-sky-200' :
                        'bg-amber-50 text-amber-700 border-amber-200'
                      }`}>
                        {bag.status.replace("_", " ")}
                      </span>
                    </TableCell>
                    <TableCell className="text-sm font-semibold text-slate-700">{bag.holder}</TableCell>
                    <TableCell className="text-right">
                      <button className="p-2 rounded-full hover:bg-sky-100 text-sky-600 transition-colors">
                        <RefreshCcw className="w-4 h-4" />
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="seals">
           <div className="glass-card rounded-[2rem] overflow-hidden bg-white/40">
            <Table>
              <TableHeader className="bg-white/60">
                <TableRow className="border-white/50 hover:bg-transparent">
                  <TableHead className="text-[10px] uppercase font-bold tracking-widest text-slate-500 h-14">Seal CryptQR</TableHead>
                  <TableHead className="text-[10px] uppercase font-bold tracking-widest text-slate-500 text-center">Status</TableHead>
                  <TableHead className="text-[10px] uppercase font-bold tracking-widest text-slate-500">Assigned To</TableHead>
                  <TableHead className="text-[10px] uppercase font-bold tracking-widest text-slate-500 text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="divide-y divide-white/50">
                {MOCK_SEALS.map((seal) => (
                  <TableRow key={seal.id} className="border-white/50 hover:bg-white/80 transition-colors">
                    <TableCell className="font-mono font-bold text-xs text-indigo-700">{seal.qr}</TableCell>
                     <TableCell className="text-center">
                      <span className={`inline-flex px-3 py-1 text-[10px] font-bold tracking-widest uppercase rounded-full border shadow-sm ${
                        seal.status === 'AVAILABLE' ? 'bg-slate-100 text-slate-500 border-slate-200' :
                        seal.status === 'LOCKED' ? 'bg-indigo-50 text-indigo-700 border-indigo-200' :
                        'bg-rose-50 text-rose-700 border-rose-200'
                      }`}>
                        {seal.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-sm font-semibold text-slate-700 font-mono tracking-tight">{seal.assignedTo}</TableCell>
                    <TableCell className="text-right">
                      <button className="p-2 rounded-full hover:bg-indigo-100 text-indigo-600 transition-colors">
                        <RefreshCcw className="w-4 h-4" />
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
