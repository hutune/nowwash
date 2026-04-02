"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { LayoutDashboard, PackageSearch, Users, Tags } from "lucide-react";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Overview", icon: <LayoutDashboard className="w-4 h-4" /> },
  { href: "/dashboard/orders", label: "Orders", icon: <PackageSearch className="w-4 h-4" /> },
  { href: "/dashboard/subscribers", label: "Subscribers", icon: <Users className="w-4 h-4" /> },
  { href: "/dashboard/inventory", label: "Inventory", icon: <Tags className="w-4 h-4" /> },
];

function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-64 border-r border-border/50 bg-background z-40 hidden md:flex md:flex-col">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-3 px-6 h-14 border-b border-border/50">
        <div className="w-6 h-6 rounded bg-foreground flex items-center justify-center text-background text-[10px] font-black tracking-tighter">
          NW
        </div>
        <span className="text-sm font-semibold tracking-tight text-foreground">
          NowWash
        </span>
      </Link>

      {/* Nav */}
      <nav className="flex-1 py-6 px-3 space-y-1">
        <p className="px-3 text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-2">Core</p>
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive
                  ? "bg-muted/50 text-foreground"
                  : "text-muted-foreground hover:bg-muted/30 hover:text-foreground"
              }`}
            >
              <span className={`${isActive ? "text-foreground" : "text-muted-foreground"}`}>
                {item.icon}
              </span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Cluster Status Box */}
      <div className="p-4 border-t border-border/50">
        <div className="p-3 rounded-md border border-border/50 bg-card/30">
          <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1">Active Node</p>
          <p className="text-sm font-medium text-foreground tracking-tight">Vinhomes Central</p>
          <div className="flex items-center gap-2 mt-2">
            <div className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </div>
            <p className="text-xs text-muted-foreground">127 Connected</p>
          </div>
        </div>
      </div>
    </aside>
  );
}

function TopBar() {
  return (
    <header className="h-14 border-b border-border/50 bg-background/80 backdrop-blur-md sticky top-0 z-30 flex items-center justify-between px-8">
      <div className="flex items-center gap-3">
        <span className="text-muted-foreground font-light">/</span>
        <p className="text-sm font-medium text-muted-foreground">Admin Workspace</p>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 px-3 py-1 rounded-md border border-border/50 bg-muted/20 text-xs font-medium text-foreground">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          Prototype Mode
        </div>
        <Avatar className="h-8 w-8 rounded-md border border-border/50 cursor-pointer">
          <AvatarFallback className="bg-muted text-foreground text-xs font-semibold">AD</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 md:ml-64 flex flex-col relative z-10">
        <TopBar />
        <main className="flex-1 p-6 md:p-8 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
