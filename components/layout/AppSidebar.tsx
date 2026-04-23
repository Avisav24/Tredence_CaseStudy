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
      "h-screen bg-[#03071d] border-r border-white/5 flex flex-col transition-all duration-300 relative z-50",
      collapsed ? "w-20" : "w-64"
    )}>
      {/* Header */}
      <div className="p-6 flex items-center justify-between">
        {!collapsed && (
          <span className="text-xl font-bold tracking-tighter text-white" style={{ fontFamily: 'var(--font-display)' }}>
            FlowHR
          </span>
        )}
        <button 
          onClick={() => setCollapsed(!collapsed)}
          className="p-1.5 rounded-lg hover:bg-white/5 text-white/30 hover:text-white transition-colors"
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Nav Items */}
      <nav className="flex-1 px-3 py-8 space-y-1">
        {NAV_ITEMS.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                "flex items-center gap-3.5 px-4 py-3.5 rounded-xl transition-all duration-300 group relative",
                active 
                  ? "bg-blue-600 text-white shadow-[0_8px_20px_rgba(37,99,235,0.3)]" 
                  : "text-white/40 hover:text-white hover:bg-white/5"
              )}
            >
              <item.icon className={clsx("w-5 h-5 flex-shrink-0 transition-transform group-hover:scale-110", active ? "text-white" : "group-hover:text-white")} />
              {!collapsed && <span className="text-[14px] font-bold tracking-tight">{item.label}</span>}
              {active && (
                <div className="absolute right-3 w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-white/5 space-y-2">
        <Link
          href="#"
          className="flex items-center gap-4 px-4 py-3 rounded-xl text-white/40 hover:text-white hover:bg-white/5 transition-all"
        >
          <Settings className="w-5 h-5 flex-shrink-0" />
          {!collapsed && <span className="text-sm font-semibold">Settings</span>}
        </Link>
        <Link
          href="/"
          className="flex items-center gap-4 px-4 py-3 rounded-xl text-white/40 hover:text-rose-400 hover:bg-rose-400/5 transition-all"
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          {!collapsed && <span className="text-sm font-semibold">Sign Out</span>}
        </Link>
      </div>
    </aside>
  );
}
