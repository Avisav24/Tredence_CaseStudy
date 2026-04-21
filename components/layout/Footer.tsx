'use client';
import Link from 'next/link';
import { Workflow, Globe, Mail } from 'lucide-react';

export function Footer() {
  const cols = [
    { title: 'Product', links: ['Features', 'Pricing', 'Changelog', 'Roadmap'] },
    { title: 'Developers', links: ['Documentation', 'API Reference', 'GitHub', 'Status'] },
    { title: 'Company', links: ['About', 'Blog', 'Careers', 'Contact'] },
    { title: 'Legal', links: ['Privacy', 'Terms', 'Security', 'Cookies'] },
  ];

  return (
    <footer style={{ background: 'var(--primary)', color: 'rgba(255,255,255,0.6)' }}>
      <div className="max-w-7xl mx-auto px-8 lg:px-12 py-16">
        {/* Top row */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:w-72 flex-shrink-0">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                <Workflow className="w-4 h-4 text-white" />
              </div>
              <span className="text-white font-bold text-[17px]" style={{ fontFamily: 'var(--font-display)' }}>
                FlowHR
              </span>
            </div>
            <p className="text-sm leading-relaxed mb-6" style={{ color: 'rgba(255,255,255,0.5)' }}>
              The modern visual workflow designer for HR teams. Build, test, and deploy workflows without code.
            </p>
            <div className="flex gap-3">
              {[Globe, Mail].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-8 h-8 rounded-md flex items-center justify-center transition-all"
                  style={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.5)' }}
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          <div className="flex-1 grid grid-cols-2 lg:grid-cols-4 gap-8">
            {cols.map(col => (
              <div key={col.title}>
                <p className="label-sm mb-4" style={{ color: 'rgba(255,255,255,0.35)' }}>
                  {col.title}
                </p>
                <ul className="flex flex-col gap-2.5">
                  {col.links.map(link => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-sm no-underline transition-colors"
                        style={{ color: 'rgba(255,255,255,0.55)' }}
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div
          className="mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs"
          style={{ borderTop: '1px solid rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.3)' }}
        >
          <p>© 2025 FlowHR, Inc. All rights reserved.</p>
          <p>Built for the Tredence AI Engineering Internship · 2025</p>
        </div>
      </div>
    </footer>
  );
}
