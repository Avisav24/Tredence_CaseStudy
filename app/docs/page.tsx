'use client';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { BookOpen, Shield, Zap, Search, ArrowRight, FileText, Code, Users, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function DocsPage() {
  const categories = [
    {
      title: 'Getting Started',
      icon: <Zap className="w-5 h-5 text-blue-500" />,
      links: ['Introduction', 'Core Concepts', 'Quick Start Guide', 'First Workflow'],
      color: 'blue'
    },
    {
      title: 'Designer Canvas',
      icon: <BookOpen className="w-5 h-5 text-emerald-500" />,
      links: ['Nodes & Handles', 'Connecting Steps', 'Validation Rules', 'Keyboard Shortcuts'],
      color: 'emerald'
    },
    {
      title: 'Advanced Logic',
      icon: <Code className="w-5 h-5 text-amber-500" />,
      links: ['Simulation Sandbox', 'Dynamic Parameters', 'API Integration', 'Variables'],
      color: 'amber'
    },
    {
      title: 'Management',
      icon: <Users className="w-5 h-5 text-violet-500" />,
      links: ['User Roles', 'Audit Logs', 'Export/Import', 'Version Control'],
      color: 'violet'
    }
  ];

  return (
    <div className="min-h-screen bg-white selection:bg-blue-600/10">
      <Navbar dark />
      
      {/* --- Hero --- */}
      <section className="pt-48 pb-32 bg-[#03071d] relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[50%] h-[100%] bg-blue-600/10 blur-[120px]" />
          <div className="absolute bottom-0 left-0 w-[30%] h-[50%] bg-indigo-600/10 blur-[100px]" />
          <div className="absolute inset-0 opacity-[0.05]" 
               style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        </div>

        <div className="max-w-7xl mx-auto px-8 lg:px-12 relative z-10 text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-10 animate-reveal shadow-2xl backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-white/80">Documentation</span>
          </div>

          <h1 className="display-lg mb-10 text-white animate-reveal text-balance">
            Architecting the <br /><span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">Future of HR.</span>
          </h1>
          
          <p className="body-lg max-w-2xl text-white/50 mb-16 animate-reveal text-balance" style={{ animationDelay: '0.1s' }}>
            Comprehensive guides, API references, and best practices to help you build high-performance HR orchestrations.
          </p>

          <div className="relative w-full max-w-2xl animate-reveal group" style={{ animationDelay: '0.2s' }}>
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30 group-focus-within:text-blue-500 transition-colors" />
            <input 
              type="text" 
              placeholder="Search documentation, nodes, or API endpoints..." 
              className="w-full h-18 bg-white/5 border border-white/10 rounded-[2rem] pl-16 pr-8 text-white text-lg outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all shadow-2xl backdrop-blur-md"
            />
          </div>
        </div>
      </section>

      {/* --- Content Grid --- */}
      <section className="py-32 max-w-7xl mx-auto px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-32">
          {categories.map((cat, i) => (
            <div key={i} className="animate-reveal" style={{ animationDelay: `${i * 0.1}s` }}>
              <div className={`w-14 h-14 rounded-2xl bg-${cat.color}-500/10 flex items-center justify-center mb-8 shadow-sm`}>
                {cat.icon}
              </div>
              <h3 className="text-xl font-bold text-[#03071d] mb-6 tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>{cat.title}</h3>
              <ul className="space-y-4">
                {cat.links.map(link => (
                  <li key={link}>
                    <Link href="#" className="text-[15px] font-medium text-slate-500 hover:text-blue-600 transition-colors flex items-center gap-3 group">
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-200 group-hover:bg-blue-600 transition-colors" />
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* --- Featured Guides --- */}
        <div className="border-t border-slate-100 pt-32">
          <div className="flex items-center justify-between mb-16">
            <h2 className="headline-md text-[#03071d]">Featured Guides</h2>
            <Link href="#" className="text-sm font-bold text-blue-600 uppercase tracking-widest flex items-center gap-2 hover:gap-3 transition-all">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { title: 'Best Practices for Onboarding', desc: 'How to structure a seamless 30-day employee journey with automated checkpoints.' },
              { title: 'API Integration Masterclass', desc: 'Step-by-step guide to connecting FlowHR to your existing enterprise HRIS systems.' },
              { title: 'Optimizing Approval Chains', desc: 'Advanced techniques for reducing bottlenecks in multi-layer global approval steps.' }
            ].map((guide, i) => (
              <Link key={i} href="#" className="card-premium group !p-10">
                <h4 className="text-xl font-bold text-[#03071d] mb-4 group-hover:text-blue-600 transition-colors tracking-tight leading-snug">{guide.title}</h4>
                <p className="body-md text-slate-500 mb-10 line-clamp-3">{guide.desc}</p>
                <div className="flex items-center gap-2 text-xs font-black text-blue-600 uppercase tracking-[0.2em]">
                  Read Full Guide <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1.5" />
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
