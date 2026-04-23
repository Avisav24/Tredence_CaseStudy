'use client';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { BookOpen, Zap, Search, ArrowRight, Code, Users, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function DocsPage() {
  const categories = [
    {
      title: 'Getting Started',
      icon: <Zap className="w-6 h-6 text-blue-500" />,
      links: ['Introduction', 'Core Concepts', 'Quick Start Guide', 'First Workflow'],
      color: 'blue'
    },
    {
      title: 'Designer Canvas',
      icon: <BookOpen className="w-6 h-6 text-emerald-500" />,
      links: ['Nodes & Handles', 'Connecting Steps', 'Validation Rules', 'Keyboard Shortcuts'],
      color: 'emerald'
    },
    {
      title: 'Advanced Logic',
      icon: <Code className="w-6 h-6 text-amber-500" />,
      links: ['Simulation Sandbox', 'Dynamic Parameters', 'API Integration', 'Variables'],
      color: 'amber'
    },
    {
      title: 'Management',
      icon: <Users className="w-6 h-6 text-violet-500" />,
      links: ['User Roles', 'Audit Logs', 'Export/Import', 'Version Control'],
      color: 'violet'
    }
  ];

  return (
    <div className="min-h-screen bg-[#030712] selection:bg-blue-600/20">
      <Navbar dark />
      
      {/* --- Cinematic Hero --- */}
      <section className="pt-64 pb-48 relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[60%] h-[100%] bg-blue-600/10 blur-[150px] opacity-60" />
          <div className="absolute bottom-0 left-0 w-[40%] h-[60%] bg-indigo-600/10 blur-[120px] opacity-60" />
          <div className="absolute inset-0 opacity-[0.03]" 
               style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '60px 60px' }} />
        </div>

        <div className="max-w-7xl mx-auto px-8 lg:px-16 relative z-10 text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-white/5 border border-white/10 mb-12 animate-reveal shadow-2xl backdrop-blur-xl">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span className="text-[12px] font-black tracking-[0.3em] uppercase text-white/90">Documentation & Resources</span>
          </div>

          <h1 className="display-xl mb-12 text-white animate-reveal text-balance">
            Orchestrate <br /><span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-violet-400 bg-clip-text text-transparent">Complex Workflows.</span>
          </h1>
          
          <p className="body-lg max-w-3xl text-white/40 mb-24 animate-reveal text-balance leading-relaxed" style={{ animationDelay: '0.1s' }}>
            The definitive guide to building enterprise-grade HR automations. Explore our comprehensive libraries, node definitions, and architectural blueprints.
          </p>

          <div className="relative w-full max-w-3xl animate-reveal group" style={{ animationDelay: '0.2s' }}>
            <div className="absolute inset-0 bg-blue-600/20 blur-[40px] opacity-0 group-focus-within:opacity-100 transition-opacity duration-700" />
            <div className="relative">
              <Search className="absolute left-8 top-1/2 -translate-y-1/2 w-6 h-6 text-white/20 group-focus-within:text-blue-400 transition-colors duration-500" />
              <input 
                type="text" 
                placeholder="Search documentation, nodes, or API endpoints..." 
                className="w-full h-24 bg-white/[0.03] border border-white/10 rounded-[3rem] pl-20 pr-12 text-white text-xl outline-none focus:border-blue-500/40 focus:bg-white/[0.05] transition-all duration-500 shadow-3xl backdrop-blur-2xl placeholder:text-white/20"
              />
            </div>
          </div>
        </div>
      </section>

      {/* --- Knowledge Hub Grid (CENTERED) --- */}
      <section className="py-48 max-w-7xl mx-auto px-8 lg:px-16 border-t border-white/[0.03]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20 mb-48">
          {categories.map((cat, i) => (
            <div key={i} className="animate-reveal group flex flex-col items-center text-center" style={{ animationDelay: `${i * 0.1}s` }}>
              <div className={`w-20 h-20 rounded-[2.5rem] bg-white/[0.02] border border-white/5 flex items-center justify-center mb-10 group-hover:scale-110 group-hover:border-white/20 transition-all duration-500 shadow-xl`}>
                {cat.icon}
              </div>
              <h3 className="text-2xl font-black text-white mb-10 tracking-tight">{cat.title}</h3>
              <ul className="space-y-6 flex flex-col items-center">
                {cat.links.map(link => (
                  <li key={link}>
                    <Link href="#" className="text-[16px] font-bold text-white/30 hover:text-blue-400 transition-all duration-300 flex items-center gap-4 group/item">
                      <div className="w-1.5 h-1.5 rounded-full bg-white/10 group-hover/item:bg-blue-400 group-hover/item:scale-150 transition-all" />
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* --- Featured Guides (CENTERED) --- */}
        <div className="border-t border-white/[0.05] pt-48">
          <div className="flex flex-col items-center text-center mb-24">
            <p className="text-blue-500 text-[12px] font-black tracking-[0.4em] uppercase mb-4">Case Studies</p>
            <h2 className="display-lg text-white mb-10">Featured Guides</h2>
            <Link href="#" className="group flex items-center gap-4 px-10 py-5 rounded-2xl bg-white/5 border border-white/10 text-sm font-black text-white uppercase tracking-widest hover:bg-white/10 transition-all">
              View All Resources <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            {[
              { title: 'Best Practices for Onboarding', desc: 'How to structure a seamless 30-day employee journey with automated checkpoints and multi-layer validation.', category: 'OPERATIONS' },
              { title: 'API Integration Masterclass', desc: 'Step-by-step guide to connecting FlowHR to your existing enterprise HRIS systems using dynamic variables.', category: 'ENGINEERING' },
              { title: 'Optimizing Approval Chains', desc: 'Advanced techniques for reducing bottlenecks in multi-layer global approval steps with conditional logic.', category: 'STRATEGY' }
            ].map((guide, i) => (
              <Link key={i} href="#" className="card-premium group relative !p-16 flex flex-col items-center text-center overflow-hidden">
                <p className="text-[11px] font-black text-blue-500 tracking-[0.3em] uppercase mb-8">{guide.category}</p>
                <h4 className="text-3xl font-black text-white mb-8 group-hover:text-blue-400 transition-colors tracking-tight leading-tight">{guide.title}</h4>
                <p className="text-lg text-white/40 mb-12 line-clamp-3 leading-relaxed font-medium">{guide.desc}</p>
                
                <div className="flex items-center gap-3 text-xs font-black text-blue-400 uppercase tracking-[0.2em] pt-8 border-t border-white/5 w-full justify-center">
                  Read Full Guide <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-3" />
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
