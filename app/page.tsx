'use client';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { 
  Zap, 
  Shield, 
  Users, 
  ChevronRight, 
  ArrowRight, 
  Play, 
  Layers, 
  Workflow,
  Sparkles,
  MousePointer2,
  Cpu
} from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white overflow-x-hidden selection:bg-blue-600/20">
      <Navbar dark />

      {/* ── Hero Section ────────────────────────────────────────── */}
      <section className="relative pt-80 pb-40 lg:pt-96 lg:pb-64 bg-[#030712] text-white overflow-hidden">
        {/* Advanced Background System */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-[30%] -left-[10%] w-[80%] h-[80%] rounded-full bg-blue-600/10 blur-[160px] animate-pulse" />
          <div className="absolute top-[20%] -right-[15%] w-[70%] h-[70%] rounded-full bg-indigo-600/10 blur-[160px] animate-pulse" style={{ animationDelay: '3s' }} />
          <div className="absolute -bottom-[20%] left-1/4 w-[60%] h-[60%] rounded-full bg-violet-600/10 blur-[160px] animate-pulse" style={{ animationDelay: '5s' }} />
          
          {/* Animated Mesh Grid */}
          <div className="absolute inset-0 opacity-[0.05]" 
               style={{ 
                 backgroundImage: 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)',
                 backgroundSize: '60px 60px'
               }} />
          
          <div className="absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-t from-[#030712] to-transparent z-10" />
        </div>

        <div className="relative max-w-7xl mx-auto px-8 lg:px-12 flex flex-col items-center text-center z-20">
          <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full glass-morphism border border-white/10 mb-16 animate-reveal shadow-2xl">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span className="text-[12px] font-black tracking-[0.3em] uppercase text-white/90">
              The Next Era of HR Ops
            </span>
          </div>

          <h1 className="display-xl mb-14 animate-reveal tracking-[-0.05em] leading-[0.95]" style={{ animationDelay: '0.1s' }}>
            Design HR Workflows <br />
            <span className="bg-gradient-to-r from-blue-400 via-violet-400 to-blue-600 bg-clip-text text-transparent">
              Without Limits.
            </span>
          </h1>

          <p className="body-lg max-w-3xl text-white/40 mb-20 animate-reveal text-balance leading-relaxed font-medium" style={{ animationDelay: '0.2s' }}>
            FlowHR is the ultimate visual playground for enterprise HR teams. Build, simulate, and automate complex 
            onboarding, performance reviews, and global workflows with zero code.
          </p>

          <div className="flex flex-col sm:flex-row gap-8 animate-reveal items-center justify-center" style={{ animationDelay: '0.3s' }}>
            <Link href="/designer" className="btn-primary h-18 px-14 text-lg group">
              Get Started for Free
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform ml-2" />
            </Link>
            <button className="btn-secondary h-18 px-14 text-lg">
              Watch Experience
            </button>
          </div>

          {/* Premium Preview Device */}
          <div className="mt-24 w-full max-w-6xl rounded-[2.5rem] border border-white/10 bg-white/5 p-4 shadow-[0_0_100px_rgba(37,99,235,0.15)] animate-reveal" style={{ animationDelay: '0.4s' }}>
            <div className="aspect-[16/10] rounded-[2rem] bg-[#0A0F1E] relative overflow-hidden border border-white/5">
              {/* Canvas Mockup Content */}
              <div className="absolute inset-0 opacity-20 bg-mesh" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-full h-full flex items-center justify-center gap-12 p-20">
                  <div className="w-72 h-48 rounded-2xl glass-morphism-dark p-6 flex flex-col gap-4 border-blue-500/30 animate-float">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                        <Users className="w-5 h-5 text-blue-400" />
                      </div>
                      <div className="space-y-1.5">
                        <div className="h-2 w-24 bg-white/40 rounded" />
                        <div className="h-1.5 w-16 bg-white/20 rounded" />
                      </div>
                    </div>
                    <div className="h-px w-full bg-white/10" />
                    <div className="space-y-2">
                      <div className="h-2 w-full bg-white/10 rounded" />
                      <div className="h-2 w-4/5 bg-white/10 rounded" />
                    </div>
                  </div>
                  
                  <div className="w-12 h-px bg-gradient-to-r from-blue-500/50 to-transparent" />

                  <div className="w-72 h-48 rounded-2xl glass-morphism-dark p-6 flex flex-col gap-4 border-white/10 animate-float" style={{ animationDelay: '1s' }}>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-indigo-500/20 flex items-center justify-center">
                        <Shield className="w-5 h-5 text-indigo-400" />
                      </div>
                      <div className="space-y-1.5">
                        <div className="h-2 w-24 bg-white/40 rounded" />
                        <div className="h-1.5 w-16 bg-white/20 rounded" />
                      </div>
                    </div>
                    <div className="h-px w-full bg-white/10" />
                    <div className="space-y-2">
                      <div className="h-2 w-full bg-white/10 rounded" />
                      <div className="h-2 w-3/4 bg-white/10 rounded" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Features Grid ───────────────────────────────────────── */}
      <section id="features" className="py-32 lg:py-48 bg-white relative">
        <div className="max-w-7xl mx-auto px-8 lg:px-12">
          <div className="text-center max-w-3xl mx-auto mb-24">
            <p className="label-sm mb-6">Unrivaled Power</p>
            <h2 className="headline-lg text-[#03071d] text-balance">
              Everything you need to automate HR at scale.
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                icon: Workflow,
                title: 'Infinite Canvas',
                desc: 'Drag, drop, and connect nodes to create complex HR logic. From simple approvals to multi-step onboarding.',
                color: 'blue'
              },
              {
                icon: Play,
                title: 'Sandbox Simulator',
                desc: 'Test your workflows instantly in a safe environment. See step-by-step execution logs before deploying live.',
                color: 'emerald'
              },
              {
                icon: Zap,
                title: 'Automated Actions',
                desc: 'Trigger emails, generate documents, and sync with your HRIS automatically when steps are completed.',
                color: 'violet'
              }
            ].map((feature, idx) => (
              <div key={idx} className="card-premium group">
                <div className={`w-14 h-14 rounded-2xl bg-${feature.color}-500/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500`}>
                  <feature.icon className={`w-7 h-7 text-${feature.color}-600`} />
                </div>
                <h3 className="title-lg mb-4 text-[#03071d]">{feature.title}</h3>
                <p className="body-md text-[#515f74]">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Visual Proof Section ────────────────────────────────── */}
      <section className="py-32 lg:py-48 bg-[#f8fafc] border-y border-slate-200 relative overflow-hidden">
        {/* Background blobs */}
        <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-blue-500/5 blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-[40%] h-[40%] bg-indigo-500/5 blur-[100px]" />

        <div className="max-w-7xl mx-auto px-8 lg:px-12 flex flex-col lg:flex-row items-center gap-24 relative z-10">
          <div className="lg:w-1/2">
            <p className="label-sm mb-6">Engineered for Performance</p>
            <h2 className="headline-lg text-[#03071d] mb-8 text-balance">
              Built for the complexity of modern enterprises.
            </h2>
            <p className="body-lg mb-10 text-balance">
              FlowHR isn't just a designer. It's a high-performance engine capable of handling thousands 
              of concurrent workflows with built-in validation, error recovery, and enterprise security.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { icon: MousePointer2, label: 'Real-time Graph Validation' },
                { icon: Cpu, label: 'Topological Sort Execution' },
                { icon: Shield, label: 'MSW-powered API Mocking' },
                { icon: Layers, label: 'Advanced Type Safety' }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
                  <item.icon className="w-5 h-5 text-blue-600" />
                  <span className="text-sm font-semibold text-[#03071d]">{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:w-1/2 w-full">
            <div className="relative aspect-square rounded-[3rem] bg-[#03071d] overflow-hidden shadow-[0_40px_80px_rgba(3,7,29,0.15)] group">
              <div className="absolute inset-0 opacity-20 bg-mesh group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="grid grid-cols-2 gap-6 scale-125">
                  <div className="w-24 h-24 rounded-3xl bg-white/5 border border-white/10 animate-float" />
                  <div className="w-24 h-24 rounded-3xl bg-blue-500/20 border border-blue-500/30 animate-float" style={{ animationDelay: '0.5s' }} />
                  <div className="w-24 h-24 rounded-3xl bg-white/10 border border-white/10 animate-float" style={{ animationDelay: '1s' }} />
                  <div className="w-24 h-24 rounded-3xl bg-white/5 border border-white/10 animate-float" style={{ animationDelay: '1.5s' }} />
                </div>
              </div>
              
              {/* Floating Badge */}
              <div className="absolute bottom-12 left-12 right-12 p-6 glass-morphism-dark rounded-2xl border border-white/10">
                <div className="flex items-center gap-4">
                  <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-sm font-bold tracking-wide uppercase">System Optimal • 99.9% Recall</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA Section ─────────────────────────────────────────── */}
      <section className="py-32 lg:py-48 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="rounded-[4rem] bg-[#03071d] p-16 lg:p-32 text-center relative overflow-hidden shadow-[0_60px_120px_rgba(3,7,29,0.3)]">
            <div className="absolute top-0 right-0 w-[60%] h-[60%] bg-blue-600/30 blur-[120px] -mr-[20%] -mt-[20%]" />
            <div className="absolute bottom-0 left-0 w-[60%] h-[60%] bg-indigo-600/30 blur-[120px] -ml-[20%] -mb-[20%]" />
            
            <div className="relative z-10 max-w-4xl mx-auto">
              <h2 className="display-lg text-white mb-10 text-balance">
                Ready to transform <br />
                your HR operations?
              </h2>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link href="/designer" className="btn-blue h-18 px-14 text-xl">
                  Launch App Now
                </Link>
                <Link href="/docs" className="btn-secondary h-18 px-14 text-xl bg-white/5 border-white/10 text-white hover:bg-white/10">
                  Explore Docs
                </Link>
              </div>
              <p className="mt-12 text-sm font-medium text-white/40 tracking-widest uppercase">
                Free for teams up to 10 members • No setup required
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
