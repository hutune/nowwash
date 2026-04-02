"use client";
import { MOCK_ORDERS, ORDER_FLOW, formatVND } from "@/lib/data";
import type { Order, OrderStatus } from "@/lib/data";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Package, Clock, QrCode } from "lucide-react";

// Minimal status map
const MINIMAL_STATUS: Record<OrderStatus, { label: string, color: string, bg: string }> = {
  CREATED: { label: "Created", color: "#64748b", bg: "#f1f5f9" },
  PICKED_UP: { label: "In Transit", color: "#0ea5e9", bg: "#e0f2fe" },
  IN_WORKSHOP: { label: "Workshop", color: "#d97706", bg: "#fef3c7" },
  IN_PROCESS: { label: "Washing", color: "#ea580c", bg: "#ffedd5" },
  QC_STAGE: { label: "QC Check", color: "#e11d48", bg: "#ffe4e6" },
  READY_TO_DELIVER: { label: "Ready", color: "#059669", bg: "#d1fae5" },
  OUT_FOR_DELIVERY: { label: "Delivering", color: "#10b981", bg: "#ecfdf5" },
  COMPLETED: { label: "Complete", color: "#0369a1", bg: "#e0f2fe" },
};

function StatusDot({ status }: { status: OrderStatus }) {
  const conf = MINIMAL_STATUS[status];
  return (
    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full border shadow-sm" style={{ backgroundColor: conf.bg, borderColor: `${conf.color}40` }}>
      <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: conf.color, boxShadow: `0 0 6px ${conf.color}` }} />
      <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: conf.color }}>{conf.label}</span>
    </div>
  );
}

function OrderDetailDialog({ order, open, onClose }: { order: Order | null; open: boolean; onClose: () => void }) {
  if (!order) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="glass-card bg-white/90 border-white max-w-lg p-0 overflow-hidden shadow-2xl shadow-sky-900/20 rounded-[2rem]">
        <div className="p-8 border-b border-sky-100 bg-gradient-to-br from-white to-sky-50">
          <DialogHeader>
            <DialogTitle className="flex items-start justify-between">
              <div>
                <p className="text-2xl font-black tracking-tight text-slate-900 mb-1">{order.code}</p>
                <p className="text-sm font-semibold text-slate-500">
                  {order.userName} <span className="text-slate-300 mx-1">•</span> {order.building} {order.apartment}
                </p>
              </div>
              <StatusDot status={order.status} />
            </DialogTitle>
          </DialogHeader>
        </div>

        <div className="p-8 bg-white/60">
          {/* Info Grid */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="glass-card bg-white/80 p-5 rounded-2xl flex flex-col gap-2">
              <div className="flex items-center gap-2 text-sky-600">
                <Package className="w-4 h-4" />
                <p className="text-[10px] uppercase tracking-widest font-bold">Bag Details</p>
              </div>
              <p className="text-lg text-slate-900 font-bold">Size {order.bagSize}</p>
              <p className="text-xs text-slate-500 font-mono tracking-tight">{order.bagQr || 'Pending'}</p>
            </div>
            <div className="glass-card bg-white/80 p-5 rounded-2xl flex flex-col gap-2">
              <div className="flex items-center gap-2 text-indigo-500">
                <QrCode className="w-4 h-4" />
                <p className="text-[10px] uppercase tracking-widest font-bold">Seal Check</p>
              </div>
              <p className="text-lg text-slate-900 font-bold">Crypto Seal</p>
              <p className="text-xs text-slate-500 font-mono tracking-tight">{order.sealQr || 'Pending'}</p>
            </div>
          </div>

          {/* Event Timeline */}
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Event Logs</p>
            <div className="space-y-4">
              {order.events.map((event, i) => (
                <div key={i} className="flex gap-4 group">
                  <div className="flex flex-col items-center">
                    <div className="w-2.5 h-2.5 mt-1 rounded-full bg-sky-200 border-2 border-white group-hover:bg-sky-500 transition-colors shadow-sm" />
                    {i < order.events.length - 1 && (
                      <div className="w-0.5 flex-1 min-h-[20px] my-1 bg-sky-100 group-hover:bg-sky-200 transition-colors rounded-full" />
                    )}
                  </div>
                  <div className="pb-2">
                    <p className="text-sm font-bold text-slate-700 group-hover:text-slate-900 transition-colors">{event.label}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <p className="text-xs text-slate-500 font-medium flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-400" /> {event.time}
                      </p>
                      {event.staffName && (
                        <p className="text-[10px] text-sky-700 font-bold bg-sky-50 px-2 py-0.5 rounded-full tracking-wide">
                          {event.staffName}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function OrdersPage() {
  const [filter, setFilter] = useState<OrderStatus | "ALL">("ALL");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const filtered = filter === "ALL" ? MOCK_ORDERS : MOCK_ORDERS.filter((o) => o.status === filter);

  return (
    <div className="space-y-8 max-w-6xl">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-black tracking-tighter text-slate-900 drop-shadow-sm mb-2">Order Registry</h1>
          <p className="text-sm font-semibold text-slate-500">{MOCK_ORDERS.length} records found in active node.</p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 border-b border-white/50 pb-4 overflow-x-auto">
        <button
          onClick={() => setFilter("ALL")}
          className={`text-xs rounded-full h-9 px-5 font-bold transition-all ${
            filter === "ALL" ? "bg-sky-600 text-white shadow-md shadow-sky-600/20" : "text-slate-500 hover:text-slate-900 hover:bg-white/60 bg-white/30"
          }`}
        >
          All ({MOCK_ORDERS.length})
        </button>
        {ORDER_FLOW.map((status) => {
          const count = MOCK_ORDERS.filter((o) => o.status === status).length;
          if (count === 0) return null;
          const isActive = filter === status;
          return (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`text-xs rounded-full h-9 px-5 font-bold transition-all border border-transparent ${
                isActive ? "bg-white text-slate-900 shadow-sm border-white/80" : "text-slate-500 hover:text-slate-900 hover:bg-white/60 bg-white/30"
              }`}
            >
              {MINIMAL_STATUS[status].label} ({count})
            </button>
          );
        })}
      </div>

      {/* Datatable */}
      <div className="glass-card bg-white/40 rounded-[2rem] overflow-hidden">
        <Table>
          <TableHeader className="bg-white/60">
            <TableRow className="border-white/50 hover:bg-transparent">
              <TableHead className="text-[10px] uppercase font-bold tracking-widest text-slate-500 h-12">ID</TableHead>
              <TableHead className="text-[10px] uppercase font-bold tracking-widest text-slate-500">Client</TableHead>
              <TableHead className="text-[10px] uppercase font-bold tracking-widest text-slate-500 text-center">Bag</TableHead>
              <TableHead className="text-[10px] uppercase font-bold tracking-widest text-slate-500 text-center">State</TableHead>
              <TableHead className="text-[10px] uppercase font-bold tracking-widest text-slate-500 text-center">Type</TableHead>
              <TableHead className="text-[10px] uppercase font-bold tracking-widest text-slate-500 text-right">Value</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y divide-white/50">
            {filtered.map((order) => (
              <TableRow
                key={order.id}
                onClick={() => setSelectedOrder(order)}
                className="border-white/50 cursor-pointer hover:bg-white/80 transition-colors group"
              >
                <TableCell className="font-mono font-bold text-xs text-sky-700">{order.code}</TableCell>
                <TableCell>
                  <p className="text-sm font-bold text-slate-900 group-hover:text-sky-700 transition-colors">{order.userName}</p>
                  <p className="text-[11px] font-semibold text-slate-500">{order.building} {order.apartment}</p>
                </TableCell>
                <TableCell className="text-center">
                  <div className="inline-flex items-center justify-center w-8 h-8 rounded-xl bg-white border border-slate-200 text-xs font-black text-slate-700 shadow-sm">
                    {order.bagSize}
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  <div className="flex justify-center"><StatusDot status={order.status} /></div>
                </TableCell>
                <TableCell className="text-center">
                  {order.isSubscription ? (
                    <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-full tracking-wider uppercase border border-indigo-100">Sub</span>
                  ) : (
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Retail</span>
                  )}
                </TableCell>
                <TableCell className="text-right font-mono font-bold text-sm text-slate-700 group-hover:text-sky-700 transition-colors">
                  {order.isSubscription ? "—" : formatVND(order.price)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <OrderDetailDialog
        order={selectedOrder}
        open={!!selectedOrder}
        onClose={() => setSelectedOrder(null)}
      />
    </div>
  );
}
