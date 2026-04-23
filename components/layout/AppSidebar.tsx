'use client';
import { Home, Layout, BookOpen, Settings, LogOut, ChevronLeft, ChevronRight, PieChart, Workflow } from 'lucide-react';
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
      "h-screen bg-[#030712] border-r border-white/[0.03] flex flex-col transition-all duration-700 relative z-50",
      collapsed ? "w-24" : "w-80"
    )}>
      {/* Header - Aligned with Topbar */}
      <div className={clsx(
        "h-20 flex items-center justify-between transition-all duration-500 border-b border-white/[0.03]",
        collapsed ? "px-6" : "px-10"
      )}>
        {!collapsed && (
          <div className="flex items-center gap-4 animate-reveal">
             <div className="w-10 h-10 rounded-xl bg-grad-brand flex items-center justify-center shadow-[0_0_20px_rgba(37,99,235,0.3)]" style={{ background: 'var(--grad-brand)' }}>
                <Workflow className="w-5 h-5 text-white" />
             </div>
             <span className="text-2xl font-black tracking-tighter text-white" style={{ fontFamily: 'var(--font-display)' }}>
                FlowHR
             </span>
          </div>
        )}
        <button 
          onClick={() => setCollapsed(!collapsed)}
          className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white/30 hover:text-white transition-all duration-500 shadow-sm"
        >
          {collapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
        </button>
      </div>

      {/* Nav Items */}
      <nav className="flex-1 px-6 py-12 space-y-3">
        {NAV_ITEMS.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                "flex items-center gap-5 px-6 py-5 rounded-[1.5rem] transition-all duration-500 group relative overflow-hidden",
                active 
                  ? "bg-white/5 text-white shadow-xl" 
                  : "text-white/25 hover:text-white hover:bg-white/[0.02]"
              )}
            >
              {active && (
                <div className="absolute inset-0 bg-grad-brand opacity-[0.08]" style={{ background: 'var(--grad-brand)' }} />
              )}
              {active && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-8 bg-blue-500 rounded-r-full shadow-[0_0_20px_rgba(37,99,235,0.8)]" />
              )}
              <item.icon className={clsx("w-6 h-6 flex-shrink-0 transition-all duration-500", active ? "text-blue-400 scale-110" : "group-hover:text-white group-hover:scale-110")} />
              {!collapsed && <span className="text-[15px] font-black tracking-tight">{item.label}</span>}
              {active && !collapsed && (
                <div className="ml-auto w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_12px_rgba(37,99,235,0.6)] animate-pulse" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-8 border-t border-white/[0.03] space-y-3">
        <Link
          href="#"
          className="flex items-center gap-5 px-6 py-5 rounded-[1.5rem] text-white/20 hover:text-white hover:bg-white/5 transition-all duration-500 group"
        >
          <Settings className="w-6 h-6 flex-shrink-0 group-hover:rotate-45 transition-transform duration-500" />
          {!collapsed && <span className="text-[15px] font-black">Settings</span>}
        </Link>
        <Link
          href="/"
          className="flex items-center gap-5 px-6 py-5 rounded-[1.5rem] text-white/20 hover:text-rose-400 hover:bg-rose-500/5 transition-all duration-500"
        >
          <LogOut className="w-6 h-6 flex-shrink-0" />
          {!collapsed && <span className="text-[15px] font-black">Sign Out</span>}
        </Link>
      </div>
    </aside>
  );
}

