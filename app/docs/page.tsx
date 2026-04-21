'use client';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { BookOpen, Shield, Zap, Search, ArrowRight, FileText, Code, Users } from 'lucide-react';
import Link from 'next/link';

export default function DocsPage() {
  const categories = [
    {
      title: 'Getting Started',
      icon: <Zap className="w-5 h-5 text-blue-500" />,
      links: ['Introduction', 'Core Concepts', 'Quick Start Guide', 'First Workflow']
    },
    {
      title: 'Designer Canvas',
      icon: <BookOpen className="w-5 h-5 text-emerald-500" />,
      links: ['Nodes & Handles', 'Connecting Steps', 'Validation Rules', 'Keyboard Shortcuts']
    },
    {
      title: 'Advanced Logic',
      icon: <Code className="w-5 h-5 text-amber-500" />,
      links: ['Simulation Sandbox', 'Dynamic Parameters', 'API Integration', 'Variables']
    },
    {
      title: 'Management',
      icon: <Users className="w-5 h-5 text-violet-500" />,
      links: ['User Roles', 'Audit Logs', 'Export/Import', 'Version Control']
    }
  ];

  return (
    <div className="min-h-screen bg-white font-body">
      <Navbar />
      
      {/* --- Hero --- */}
      <section className="pt-32 pb-20 bg-[#03071d] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} />
        <div className="max-w-7xl mx-auto px-8 lg:px-12 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-[64px] leading-[1.05] font-extrabold text-white mb-8 tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
              Architecting the <br /><span className="text-blue-500">Future of HR.</span>
            </h1>
            <p className="text-xl text-white/50 leading-relaxed mb-10">
              Comprehensive guides, API references, and best practices to help you build high-performance HR orchestrations.
            </p>
            <div className="relative max-w-xl group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30 group-focus-within:text-blue-500 transition-colors" />
              <input 
                type="text" 
                placeholder="Search documentation..." 
                className="w-full h-14 bg-white/5 border border-white/10 rounded-2xl pl-12 pr-6 text-white outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all"
              />
            </div>
          </div>
        </div>
      </section>

      {/* --- Content Grid --- */}
      <section className="py-24 max-w-7xl mx-auto px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {categories.map((cat, i) => (
            <div key={i} className="animate-fade-in-up" style={{ animationDelay: `${i * 0.1}s` }}>
              <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center mb-6">
                {cat.icon}
              </div>
              <h3 className="text-lg font-bold text-[#03071d] mb-4" style={{ fontFamily: 'var(--font-display)' }}>{cat.title}</h3>
              <ul className="space-y-3">
                {cat.links.map(link => (
                  <li key={link}>
                    <Link href="#" className="text-sm text-[#515f74] hover:text-blue-600 transition-colors flex items-center gap-2">
                      <FileText className="w-3.5 h-3.5 opacity-30" />
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* --- Featured Guides --- */}
        <div className="border-t border-gray-100 pt-20">
          <h2 className="headline-md text-[#03071d] mb-12">Featured Guides</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Best Practices for Onboarding', desc: 'How to structure a seamless 30-day employee journey.' },
              { title: 'API Integration Masterclass', desc: 'Connecting FlowHR to your existing HRIS systems.' },
              { title: 'Optimizing Approval Chains', desc: 'Reducing bottlenecks in multi-layer approval steps.' }
            ].map((guide, i) => (
              <Link key={i} href="#" className="group p-8 rounded-3xl border border-gray-100 hover:border-blue-500/20 hover:bg-blue-50/30 transition-all">
                <h4 className="text-lg font-bold text-[#03071d] mb-3 group-hover:text-blue-600 transition-colors">{guide.title}</h4>
                <p className="text-sm text-[#515f74] leading-relaxed mb-6">{guide.desc}</p>
                <div className="flex items-center gap-2 text-xs font-bold text-blue-600 uppercase tracking-widest">
                  Read Guide <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
