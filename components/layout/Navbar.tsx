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
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-700 px-8 lg:px-12 ${
        scrolled ? 'pt-6' : 'pt-10'
      }`}
    >
      <div 
        className={`max-w-7xl mx-auto transition-all duration-700 ${
          scrolled 
            ? 'glass-morphism rounded-[2.5rem] px-8 py-4 shadow-[0_20px_50px_rgba(0,0,0,0.3)]' 
            : 'px-4 py-2'
        }`}
      >
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-4 group no-underline">
            <div
              className="w-11 h-11 rounded-2xl flex items-center justify-center shadow-2xl transition-all duration-500 group-hover:rotate-[15deg] group-hover:scale-110"
              style={{ background: 'var(--grad-brand)' }}
            >
              <Workflow className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-tighter text-white" style={{ fontFamily: 'var(--font-display)' }}>
                FlowHR
              </span>
              <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest -mt-1 opacity-80">Automation</span>
            </div>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-16">
            {[
              { name: 'Designer', href: '/' },
              { name: 'Templates', href: '/templates' },
              { name: 'Docs', href: '/docs' }
            ].map(item => (
              <Link
                key={item.name}
                href={item.href}
                className="text-[14px] font-black text-white/40 hover:text-white transition-all hover:translate-y-[-2px] no-underline tracking-[0.1em] uppercase"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Right CTAs */}
          <div className="hidden md:flex items-center gap-8">
            <Link 
              href="/" 
              className="btn-primary !py-4 !px-10 !text-[14px] !rounded-2xl shadow-[0_20px_40px_rgba(37,99,235,0.2)] active:scale-95"
            >
              Start Designing
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform ml-2" />
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden w-11 h-11 rounded-2xl flex items-center justify-center bg-white/5 hover:bg-white/10 transition-colors border border-white/10"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-5 h-5 text-white" /> : <Menu className="w-5 h-5 text-white" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden absolute top-[120px] left-8 right-8 rounded-[2.5rem] glass-morphism p-10 flex flex-col gap-8 shadow-2xl animate-reveal border border-white/10">
          {['Features', 'Solutions', 'Pricing', 'Docs'].map(item => (
            <Link 
              key={item} 
              href={`#${item.toLowerCase()}`} 
              className="text-2xl font-black text-white no-underline tracking-tighter"
              onClick={() => setMobileOpen(false)}
            >
              {item}
            </Link>
          ))}
          <div className="h-px w-full bg-white/10" />
          <Link href="/designer" className="btn-primary w-full justify-center !rounded-2xl py-5 text-lg">
            Launch Designer
          </Link>
        </div>
      )}
    </nav>
  );
}
