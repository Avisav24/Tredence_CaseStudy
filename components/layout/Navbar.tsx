'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Workflow, Menu, X } from 'lucide-react';

interface NavProps {
  dark?: boolean;
}

export function Navbar({ dark = false }: NavProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-[100] h-16 flex items-center px-8 lg:px-12 transition-all duration-300"
      style={{
        background: scrolled
          ? 'rgba(247,249,251,0.92)'
          : dark ? 'transparent' : 'rgba(247,249,251,0.92)',
        backdropFilter: scrolled || !dark ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(3,7,29,0.06)' : 'none',
      }}
    >
      <div className="w-full max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 no-underline">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #03071d, #1a1f36)' }}
          >
            <Workflow className="w-4 h-4 text-white" />
          </div>
          <span
            className="text-[17px] font-bold tracking-tight"
            style={{
              fontFamily: 'var(--font-display)',
              color: dark && !scrolled ? 'white' : 'var(--primary)',
            }}
          >
            FlowHR
          </span>
        </Link>

        {/* Center links */}
        <div className="hidden md:flex items-center gap-8">
          {['Features', 'Pricing', 'Docs', 'Blog'].map(item => (
            <Link
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-sm font-medium transition-colors no-underline"
              style={{
                fontFamily: 'var(--font-body)',
                color: dark && !scrolled ? 'rgba(255,255,255,0.7)' : 'var(--on-surface-variant)',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = dark && !scrolled ? 'white' : 'var(--primary)')}
              onMouseLeave={e => (e.currentTarget.style.color = dark && !scrolled ? 'rgba(255,255,255,0.7)' : 'var(--on-surface-variant)')}
            >
              {item}
            </Link>
          ))}
        </div>

        {/* Right CTAs */}
        <div className="hidden md:flex items-center gap-3">
          <Link href="/designer" className="btn-primary" style={{ padding: '8px 18px', fontSize: '14px' }}>
            Open App →
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          style={{ color: dark && !scrolled ? 'white' : 'var(--primary)' }}
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          className="md:hidden absolute top-16 left-0 right-0 border-b p-6 flex flex-col gap-4"
          style={{ background: 'var(--surface-container-lowest)', borderColor: 'var(--surface-container)' }}
        >
          {['Features', 'Pricing', 'Docs', 'Blog'].map(item => (
            <Link key={item} href={`#${item.toLowerCase()}`} className="text-sm font-medium no-underline" style={{ color: 'var(--on-surface)' }}>
              {item}
            </Link>
          ))}
          <hr style={{ borderColor: 'var(--surface-container)' }} />
          <Link href="/designer" className="btn-primary w-full justify-center" style={{ fontSize: '14px' }}>Open App →</Link>
        </div>
      )}
    </nav>
  );
}
