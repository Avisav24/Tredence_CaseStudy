'use client';
import Link from 'next/link';
import { Workflow, Globe, Mail, ArrowRight } from 'lucide-react';

const Github = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const Twitter = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

const Linkedin = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);


export function Footer() {
  const cols = [
    { title: 'Product', links: ['Features', 'Pricing', 'Changelog', 'Roadmap'] },
    { title: 'Developers', links: ['Documentation', 'API Reference', 'GitHub', 'Status'] },
    { title: 'Company', links: ['About', 'Blog', 'Careers', 'Contact'] },
    { title: 'Legal', links: ['Privacy', 'Terms', 'Security', 'Cookies'] },
  ];

  return (
    <footer className="bg-[#03071d] text-white/40 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-8 lg:px-16 py-48 flex flex-col items-center text-center">
        {/* Brand Section (CENTERED) */}
        <div className="max-w-2xl mb-32 flex flex-col items-center">
          <Link href="/" className="flex items-center gap-5 mb-12 no-underline group">
            <div className="w-16 h-16 rounded-[2rem] bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-3xl">
              <Workflow className="w-7 h-7 text-white" />
            </div>
            <span className="text-white font-black text-3xl tracking-tighter" style={{ fontFamily: 'var(--font-display)' }}>
              FlowHR
            </span>
          </Link>
          <p className="text-[19px] leading-relaxed mb-12 text-white/30 font-medium">
            The modern standard for visual HR automation. Empowers teams to build, simulate, and automate complex human resource workflows with zero code.
          </p>
          <div className="flex gap-8 justify-center">
            {[Github, Twitter, Linkedin].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="w-14 h-14 rounded-2xl flex items-center justify-center bg-white/5 border border-white/10 text-white/30 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all shadow-premium"
              >
                <Icon className="w-6 h-6" />
              </a>
            ))}
          </div>
        </div>

        {/* Link columns (CENTERED) */}
        <div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-20 lg:gap-32 mb-32 border-t border-white/5 pt-32">
          {cols.map(col => (
            <div key={col.title} className="flex flex-col items-center">
              <p className="text-[13px] font-black uppercase tracking-[0.4em] mb-12 text-white/20">
                {col.title}
              </p>
              <ul className="flex flex-col gap-8 items-center">
                {col.links.map(link => (
                  <li key={link}>
                    <Link
                      href="#"
                      className="text-[16px] no-underline text-white/40 hover:text-blue-400 transition-all flex items-center group/item font-bold"
                    >
                      {link}
                      <ArrowRight className="w-4 h-4 ml-3 opacity-0 -translate-x-3 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Metadata (CENTERED) */}
        <div className="w-full mt-32 pt-16 flex flex-col items-center gap-10 text-[15px] border-t border-white/5 text-white/20 font-black tracking-widest uppercase">
          <div className="flex flex-col sm:flex-row items-center gap-12">
            <p>© 2026 FlowHR, Inc. Global Automation</p>
            <div className="flex items-center gap-4">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
              System Core: Operational
            </div>
          </div>
          <p className="opacity-40">Architected for Tredence Engineering Excellence</p>
        </div>
      </div>
    </footer>
  );
}
