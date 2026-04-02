"use client";
import { CLUSTER_STATS, MOCK_ORDERS, formatVND } from "@/lib/data";
import type { OrderStatus } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { PackageOpen, Users2, Wallet, CheckCircle2, ChevronRight, Activity } from "lucide-react";

// Muted, high-contrast status map for Midnight Premium UI
const MINIMAL_STATUS: Record<OrderStatus, { label: string, color: string, bg: string }> = {
  CREATED: { label: "Created", color: "#52525b", bg: "rgba(255, 255, 255, 0.03)" }, // zinc-600
  PICKED_UP: { label: "In Transit", color: "#71717a", bg: "rgba(255, 255, 255, 0.05)" }, // zinc-500
  IN_WORKSHOP: { label: "Workshop", color: "#a1a1aa", bg: "rgba(255, 255, 255, 0.07)" }, // zinc-400
  IN_PROCESS: { label: "Washing", color: "#d4d4d8", bg: "rgba(255, 255, 255, 0.09)" }, // zinc-300
  QC_STAGE: { label: "QC Check", color: "#e4e4e7", bg: "rgba(255, 255, 255, 0.12)" }, // zinc-200
  READY_TO_DELIVER: { label: "Ready", color: "#f4f4f5", bg: "rgba(255, 255, 255, 0.15)" }, // zinc-100
  OUT_FOR_DELIVERY: { label: "Delivering", color: "#ffffff", bg: "rgba(255, 255, 255, 0.2)" }, // white
  COMPLETED: { label: "Complete", color: "#ffffff", bg: "rgba(255, 255, 255, 0.1)" }, // white
};

function StatCard({ label, value, sub, icon }: { label: string; value: string; sub?: string; icon: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-border/50 bg-card p-5 hover:bg-card/80 transition-colors">
      <div className="flex items-start justify-between mb-3">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{label}</p>
        <div className="text-foreground shrink-0 mt-0.5">
          {icon}
        </div>
      </div>
      <div>
        <p className="text-3xl font-bold tracking-tight text-foreground">{value}</p>
        {sub && <p className="text-xs text-muted-foreground mt-1.5 font-medium">{sub}</p>}
      </div>
    </div>
  );
}

function StatusDot({ status }: { status: OrderStatus }) {
  const conf = MINIMAL_STATUS[status];
  return (
    <div 
      className="flex items-center gap-2 px-2.5 py-1 rounded-md border border-white/5" 
      style={{ backgroundColor: conf.bg }}
    >
      <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: conf.color }} />
      <span className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: conf.color }}>
        {conf.label}
      </span>
    </div>
  );
}

function OrderPipeline() {
  const statusCounts: Record<string, number> = {};
  MOCK_ORDERS.forEach((o) => {
    statusCounts[o.status] = (statusCounts[o.status] || 0) + 1;
  });

  const statuses: OrderStatus[] = [
    "CREATED", "PICKED_UP", "IN_WORKSHOP", "IN_PROCESS",
    "QC_STAGE", "READY_TO_DELIVER", "OUT_FOR_DELIVERY", "COMPLETED",
  ];

  return (
    <div className="rounded-xl border border-border/50 bg-card overflow-hidden">
      <div className="px-5 py-4 border-b border-border/50 bg-muted/10">
        <div className="flex justify-between items-center">
          <h2 className="text-sm font-semibold tracking-tight text-foreground">Live Pipeline</h2>
          <Activity className="w-4 h-4 text-muted-foreground" />
        </div>
      </div>
      <div className="p-5">
        <div className="grid grid-cols-4 lg:grid-cols-8 gap-3">
          {statuses.map((s) => {
            const count = statusCounts[s] || 0;
            const pct = count > 0 ? 100 : 0;
            const conf = MINIMAL_STATUS[s];
            return (
              <div key={s} className="flex flex-col items-center p-3 rounded-lg hover:bg-muted/30 transition-colors">
                <p className="text-xl font-bold mb-3" style={{ color: count > 0 ? conf.color : 'rgba(255,255,255,0.2)' }}>
                  {count}
                </p>
                <div className="w-full h-1 bg-border rounded-full mb-3 overflow-hidden">
                  <div className="h-full transition-all" style={{ width: `${pct}%`, backgroundColor: conf.color }} />
                </div>
                <p className="text-[9px] uppercase font-semibold tracking-wider text-center text-muted-foreground">
                  {conf.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function RecentOrders() {
  return (
    <div className="rounded-xl border border-border/50 bg-card overflow-hidden">
      <div className="px-5 py-4 border-b border-border/50 bg-muted/10 flex items-center justify-between">
        <h2 className="text-sm font-semibold tracking-tight text-foreground">Latest Logs</h2>
        <Link href="/dashboard/orders" className="text-xs font-medium text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors">
          View all <ChevronRight className="w-3 h-3" />
        </Link>
      </div>
      <div className="divide-y divide-border/50">
        {MOCK_ORDERS.slice(0, 5).map((order) => (
          <Link href={`/dashboard/orders?id=${order.id}`} key={order.id} className="block">
            <div className="flex items-center justify-between p-4 hover:bg-muted/30 transition-colors cursor-pointer group">
              <div className="flex items-center gap-4">
                <div className="w-9 h-9 rounded-md border border-border/50 bg-muted/20 flex items-center justify-center text-xs font-semibold text-foreground">
                  {order.bagSize}
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground mb-0.5 group-hover:underline decoration-border underline-offset-4">
                    {order.code}
                  </p>
                  <p className="text-xs text-muted-foreground font-medium">
                    {order.userName} • {order.building}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <StatusDot status={order.status} />
                <span className="text-sm text-foreground w-20 text-right font-medium tracking-tight">
                  {order.isSubscription ? "SUB" : formatVND(order.price)}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default function DashboardOverview() {
  const s = CLUSTER_STATS;
  return (
    <div className="space-y-6 max-w-6xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">Dashboard</h1>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={<PackageOpen className="w-4 h-4" />} label="Orders Today" value={String(s.ordersToday)} sub={`${s.ordersPending} pending`} />
        <StatCard icon={<Users2 className="w-4 h-4" />} label="Active Subs" value={String(s.activeSubscribers)} sub={`Of ${s.totalCustomers} total clients`} />
        <StatCard icon={<Wallet className="w-4 h-4" />} label="Revenue" value={formatVND(s.revenue)} sub="Today" />
        <StatCard icon={<CheckCircle2 className="w-4 h-4" />} label="QC Rate" value={s.qcPassRate + "%"} sub="vs 95% target" />
      </div>

      {/* Pipeline */}
      <OrderPipeline />

      {/* Recent */}
      <RecentOrders />
    </div>
  );
}
