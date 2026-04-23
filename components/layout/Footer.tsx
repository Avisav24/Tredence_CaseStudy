'use client';
import Link from 'next/link';
import { Workflow, Globe, Mail, Twitter, Github, Linkedin, ArrowRight } from 'lucide-react';

export function Footer() {
  const cols = [
    { title: 'Product', links: ['Features', 'Pricing', 'Changelog', 'Roadmap'] },
    { title: 'Developers', links: ['Documentation', 'API Reference', 'GitHub', 'Status'] },
    { title: 'Company', links: ['About', 'Blog', 'Careers', 'Contact'] },
    { title: 'Legal', links: ['Privacy', 'Terms', 'Security', 'Cookies'] },
  ];

  return (
    <footer className="bg-[#03071d] text-white/40 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-8 lg:px-12 py-24">
        {/* Top row */}
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          {/* Brand */}
          <div className="lg:w-80 flex-shrink-0">
            <Link href="/" className="flex items-center gap-3 mb-8 no-underline group">
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Workflow className="w-5 h-5 text-white" />
              </div>
              <span className="text-white font-bold text-xl tracking-tighter" style={{ fontFamily: 'var(--font-display)' }}>
                FlowHR
              </span>
            </Link>
            <p className="text-[15px] leading-relaxed mb-8 text-white/50">
              The modern standard for visual HR automation. Empowers teams to build, simulate, and automate complex human resource workflows with zero code.
            </p>
            <div className="flex gap-4">
              {[Github, Twitter, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-xl flex items-center justify-center bg-white/5 border border-white/10 text-white/40 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all shadow-sm"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          <div className="flex-1 grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
            {cols.map(col => (
              <div key={col.title}>
                <p className="text-[11px] font-black uppercase tracking-[0.2em] mb-6 text-white/20">
                  {col.title}
                </p>
                <ul className="flex flex-col gap-4">
                  {col.links.map(link => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-sm no-underline text-white/50 hover:text-white transition-colors flex items-center group"
                      >
                        {link}
                        <ArrowRight className="w-3 h-3 ml-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-24 pt-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-[13px] border-t border-white/5 text-white/30 font-medium">
          <p>© 2026 FlowHR, Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <p className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Systems Operational
            </p>
            <p className="hidden sm:block">Built for Tredence Engineering</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
