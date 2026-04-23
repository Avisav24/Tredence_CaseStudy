'use client';
import { Home, Layout, BookOpen, Settings, LogOut, ChevronLeft, ChevronRight, PieChart } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { useState } from 'react';

const NAV_ITEMS = [
  { icon: Home, label: 'Dashboard', href: '/' },
  { icon: Layout, label: 'Designer', href: '/designer' },
  { icon: PieChart, label: 'Templates', href: '/templates' },
  { icon: BookOpen, label: 'Library', href: '/docs' },
];

export function AppSidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside className={clsx(
      "h-screen bg-[#030712] border-r border-white/[0.03] flex flex-col transition-all duration-500 relative z-50",
      collapsed ? "w-24" : "w-72"
    )}>
      {/* Header */}
      <div className="p-8 flex items-center justify-between">
        {!collapsed && (
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 rounded-lg bg-grad-brand flex items-center justify-center" style={{ background: 'var(--grad-brand)' }}>
                <Workflow className="w-4 h-4 text-white" />
             </div>
             <span className="text-xl font-black tracking-tighter text-white" style={{ fontFamily: 'var(--font-display)' }}>
                FlowHR
             </span>
          </div>
        )}
        <button 
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/30 hover:text-white transition-all duration-300"
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Nav Items */}
      <nav className="flex-1 px-4 py-10 space-y-2">
        {NAV_ITEMS.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                "flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-500 group relative overflow-hidden",
                active 
                  ? "bg-white/5 text-white" 
                  : "text-white/30 hover:text-white hover:bg-white/[0.02]"
              )}
            >
              {active && (
                <div className="absolute inset-0 bg-grad-brand opacity-10" style={{ background: 'var(--grad-brand)' }} />
              )}
              {active && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-blue-500 rounded-r-full shadow-[0_0_15px_rgba(37,99,235,0.8)]" />
              )}
              <item.icon className={clsx("w-5 h-5 flex-shrink-0 transition-all duration-500", active ? "text-blue-400 scale-110" : "group-hover:text-white")} />
              {!collapsed && <span className="text-[14px] font-bold tracking-tight">{item.label}</span>}
              {active && !collapsed && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(37,99,235,0.6)]" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-6 border-t border-white/[0.03] space-y-2">
        <Link
          href="#"
          className="flex items-center gap-4 px-5 py-4 rounded-2xl text-white/20 hover:text-white hover:bg-white/5 transition-all duration-500"
        >
          <Settings className="w-5 h-5 flex-shrink-0" />
          {!collapsed && <span className="text-[14px] font-bold">Settings</span>}
        </Link>
        <Link
          href="/"
          className="flex items-center gap-4 px-5 py-4 rounded-2xl text-white/20 hover:text-rose-400 hover:bg-rose-500/5 transition-all duration-500"
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          {!collapsed && <span className="text-[14px] font-bold">Sign Out</span>}
        </Link>
      </div>
    </aside>
  );
}
