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
      <section id="features" className="py-40 lg:py-64 bg-white relative">
        <div className="max-w-7xl mx-auto px-8 lg:px-12">
          <div className="text-center max-w-4xl mx-auto mb-32">
            <p className="label-sm mb-8 tracking-[0.3em]">Unrivaled Power</p>
            <h2 className="headline-lg text-[#030712] text-balance leading-[1.1]">
              Everything you need to <br /> automate HR at scale.
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
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
              <div key={idx} className="card-premium group !p-12 flex flex-col items-center text-center">
                <div className={`w-20 h-20 rounded-[2rem] bg-${feature.color}-500/5 flex items-center justify-center mb-10 group-hover:scale-110 group-hover:rotate-6 transition-all duration-700 border border-${feature.color}-500/10`}>
                  <feature.icon className={`w-8 h-8 text-${feature.color}-600`} />
                </div>
                <h3 className="title-md mb-6 text-[#030712] font-black">{feature.title}</h3>
                <p className="body-md text-slate-500 leading-relaxed max-w-[280px]">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Visual Proof Section ────────────────────────────────── */}
      <section className="py-40 lg:py-64 bg-[#fcfdfe] border-y border-slate-100 relative overflow-hidden">
        {/* Background blobs */}
        <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-blue-500/[0.03] blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[50%] h-[50%] bg-violet-500/[0.03] blur-[120px]" />

        <div className="max-w-7xl mx-auto px-8 lg:px-12 flex flex-col items-center text-center relative z-10">
          <div className="max-w-4xl mx-auto mb-24">
            <p className="label-sm mb-8 tracking-[0.3em]">Engineered for Performance</p>
            <h2 className="headline-lg text-[#030712] mb-10 text-balance leading-[1.1]">
              Built for the complexity of <br /> modern enterprise teams.
            </h2>
            <p className="body-lg text-slate-500 max-w-3xl mx-auto text-balance font-medium leading-relaxed">
              FlowHR isn't just a designer. It's a high-performance engine capable of handling thousands 
              of concurrent workflows with built-in validation and enterprise security.
            </p>
          </div>
          
          <div className="w-full max-w-5xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-32">
            {[
              { icon: MousePointer2, label: 'Real-time Validation' },
              { icon: Cpu, label: 'Topological Engine' },
              { icon: Shield, label: 'Secure Sandbox' },
              { icon: Layers, label: 'Type Safety' }
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center gap-5 p-8 rounded-[2rem] bg-white border border-slate-100 shadow-[0_10px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.05)] transition-all duration-500">
                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
                  <item.icon className="w-6 h-6 text-blue-600" />
                </div>
                <span className="text-sm font-bold text-[#030712] tracking-tight">{item.label}</span>
              </div>
            ))}
          </div>

          <div className="w-full max-w-6xl">
            <div className="relative aspect-[21/9] rounded-[3rem] bg-[#030712] overflow-hidden shadow-[0_60px_120px_rgba(0,0,0,0.3)] group border border-white/5">
              <div className="absolute inset-0 opacity-20 bg-mesh group-hover:scale-110 transition-transform duration-1000" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex gap-12 scale-150">
                  <div className="w-20 h-20 rounded-2xl bg-white/5 border border-white/10 animate-float" />
                  <div className="w-20 h-20 rounded-2xl bg-blue-500/20 border border-blue-500/30 animate-float" style={{ animationDelay: '0.5s' }} />
                  <div className="w-20 h-20 rounded-2xl bg-white/10 border border-white/10 animate-float" style={{ animationDelay: '1s' }} />
                </div>
              </div>
              
              {/* Floating Badge */}
              <div className="absolute bottom-12 left-1/2 -translate-x-1/2 px-10 py-5 glass-morphism-dark rounded-full border border-white/10 flex items-center gap-4">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_#10b981]" />
                <span className="text-[12px] font-black tracking-[0.2em] uppercase">99.9% Recall • System Optimal</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA Section ─────────────────────────────────────────── */}
      <section className="py-40 lg:py-64 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="rounded-[4.5rem] bg-[#030712] p-20 lg:p-40 text-center relative overflow-hidden shadow-[0_80px_160px_rgba(0,0,0,0.5)] border border-white/5">
            <div className="absolute top-0 right-0 w-[70%] h-[70%] bg-blue-600/20 blur-[140px] -mr-[30%] -mt-[30%]" />
            <div className="absolute bottom-0 left-0 w-[70%] h-[70%] bg-violet-600/20 blur-[140px] -ml-[30%] -mb-[30%]" />
            
            <div className="relative z-10 max-w-4xl mx-auto">
              <h2 className="display-lg text-white mb-12 text-balance leading-[0.95]">
                Ready to transform <br />
                your HR operations?
              </h2>
              <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
                <Link href="/designer" className="btn-primary h-20 px-16 text-xl shadow-[0_20px_50px_rgba(37,99,235,0.4)]">
                  Launch Platform Now
                </Link>
                <Link href="/docs" className="btn-secondary h-20 px-16 text-xl">
                  View Architecture
                </Link>
              </div>
              <p className="mt-16 text-[12px] font-black text-white/30 tracking-[0.4em] uppercase">
                Enterprise Grade • Zero Setup • Cloud Native
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
