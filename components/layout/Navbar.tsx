'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Workflow, Menu, X, ArrowRight } from 'lucide-react';

interface NavProps {
  dark?: boolean;
}

export function Navbar({ dark = false }: NavProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[100] h-20 flex items-center transition-all duration-500 ${
        scrolled 
          ? 'glass-morphism py-0 shadow-lg border-b border-slate-200/50' 
          : 'py-2 bg-transparent'
      }`}
    >
      <div className="w-full max-w-7xl mx-auto px-8 lg:px-12 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group no-underline">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform duration-300"
            style={{ background: 'var(--gradient-primary)' }}
          >
            <Workflow className="w-5 h-5 text-white" />
          </div>
          <span
            className={`text-xl font-extrabold tracking-tighter transition-colors ${
              dark && !scrolled ? 'text-white' : 'text-[#03071d]'
            }`}
            style={{ fontFamily: 'var(--font-display)' }}
          >
            FlowHR
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-10">
          {['Features', 'Solutions', 'Pricing', 'Docs'].map(item => (
            <Link
              key={item}
              href={`#${item.toLowerCase()}`}
              className={`text-[15px] font-semibold transition-all hover:translate-y-[-1px] no-underline ${
                dark && !scrolled ? 'text-white/70 hover:text-white' : 'text-slate-600 hover:text-blue-600'
              }`}
            >
              {item}
            </Link>
          ))}
        </div>

        {/* Right CTAs */}
        <div className="hidden md:flex items-center gap-6">
          <Link 
            href="/designer" 
            className={`btn-primary group !py-3 !px-7 !text-[13px] !font-bold !rounded-full shadow-xl shadow-blue-600/20 hover:shadow-blue-600/40 transition-all active:scale-95 ${
              dark && !scrolled ? 'bg-white !text-[#03071d] hover:bg-white/90 shadow-none' : ''
            }`}
          >
            Open App
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform ml-1" />
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden w-10 h-10 rounded-xl flex items-center justify-center bg-slate-100 hover:bg-slate-200 transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="w-5 h-5 text-slate-900" /> : <Menu className="w-5 h-5 text-slate-900" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden absolute top-[80px] left-4 right-4 rounded-3xl glass-morphism border border-slate-200/50 p-8 flex flex-col gap-6 shadow-2xl animate-reveal">
          {['Features', 'Solutions', 'Pricing', 'Docs'].map(item => (
            <Link 
              key={item} 
              href={`#${item.toLowerCase()}`} 
              className="text-lg font-bold text-slate-900 no-underline"
              onClick={() => setMobileOpen(false)}
            >
              {item}
            </Link>
          ))}
          <div className="h-px w-full bg-slate-200" />
          <Link href="/designer" className="btn-primary w-full justify-center !rounded-2xl py-4">
            Get Started
          </Link>
        </div>
      )}
    </nav>
  );
}
