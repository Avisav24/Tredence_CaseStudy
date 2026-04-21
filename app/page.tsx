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
  Workflow 
} from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white overflow-x-hidden">
      <Navbar dark />

      {/* ── Hero Section ────────────────────────────────────────── */}
      <section className="relative pt-48 pb-20 lg:pt-56 lg:pb-32 bg-[#03071d] text-white">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] rounded-full bg-violet-600/10 blur-[120px]" />
          <div className="absolute top-[10%] -right-[10%] w-[50%] h-[50%] rounded-full bg-blue-600/10 blur-[120px]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-8 lg:px-12 flex flex-col items-center text-center pt-24 lg:pt-32">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-8 animate-fade-in">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-[11px] font-bold tracking-widest uppercase text-white/60">
              New: Simulation Engine 2.0 is live
            </span>
          </div>

          <h1 className="display-xl mb-8 animate-fade-in-up">
            Design HR Workflows <br />
            <span className="text-blue-500">Visually.</span>
          </h1>

          <p className="body-lg max-w-2xl text-white/60 mb-12 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            The modern standard for HR automation. Build onboarding, approvals, and automated documents 
            with a powerful drag-and-drop canvas. No code required.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <Link href="/designer" className="btn-blue h-14 px-10 text-lg">
              Open Designer
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/docs" className="btn-secondary h-14 px-10 text-lg">
              Documentation
            </Link>
          </div>

          {/* Abstract Canvas Preview */}
          <div className="mt-20 w-full max-w-5xl rounded-2xl border border-white/10 bg-white/5 p-2 shadow-2xl animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <div className="aspect-[16/9] rounded-xl bg-[#0A0F1E] flex items-center justify-center relative overflow-hidden border border-white/5">
              <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
              <div className="relative z-10 flex flex-col items-center gap-6">
                <div className="w-64 h-16 rounded-xl border border-blue-500/50 bg-blue-500/10 flex items-center px-4 gap-3">
                  <Workflow className="w-5 h-5 text-blue-400" />
                  <div className="h-2 w-32 bg-blue-400/30 rounded" />
                </div>
                <div className="w-px h-12 bg-white/10" />
                <div className="w-64 h-16 rounded-xl border border-white/10 bg-white/5 flex items-center px-4 gap-3">
                  <Layers className="w-5 h-5 text-white/40" />
                  <div className="h-2 w-24 bg-white/20 rounded" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Features Grid ───────────────────────────────────────── */}
      <section id="features" className="py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-8 lg:px-12">
          <div className="max-w-3xl mb-16 lg:mb-24">
            <p className="label-sm mb-4 text-blue-600">Platform Features</p>
            <h2 className="headline-lg text-[#03071d]">
              Everything you need to automate HR at scale.
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="card group">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center mb-6 group-hover:bg-blue-500 group-hover:text-white transition-all">
                <Workflow className="w-6 h-6 text-blue-600 group-hover:text-white" />
              </div>
              <h3 className="title-lg mb-3 text-[#03071d]">Infinite Canvas</h3>
              <p className="text-sm leading-relaxed text-[#515f74]">
                Drag, drop, and connect nodes to create complex HR logic. From simple approvals to multi-step onboarding.
              </p>
            </div>

            <div className="card group">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-6 group-hover:bg-emerald-500 group-hover:text-white transition-all">
                <Play className="w-6 h-6 text-emerald-600 group-hover:text-white" />
              </div>
              <h3 className="title-lg mb-3 text-[#03071d]">Sandbox Simulator</h3>
              <p className="text-sm leading-relaxed text-[#515f74]">
                Test your workflows instantly in a safe environment. See step-by-step execution logs before deploying live.
              </p>
            </div>

            <div className="card group">
              <div className="w-12 h-12 rounded-xl bg-violet-500/10 flex items-center justify-center mb-6 group-hover:bg-violet-500 group-hover:text-white transition-all">
                <Zap className="w-6 h-6 text-violet-600 group-hover:text-white" />
              </div>
              <h3 className="title-lg mb-3 text-[#03071d]">Automated Actions</h3>
              <p className="text-sm leading-relaxed text-[#515f74]">
                Trigger emails, generate documents, and sync with your HRIS automatically when steps are completed.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Visual Proof Section ────────────────────────────────── */}
      <section className="py-24 lg:py-32 bg-[#f7f9fb] border-y border-[#eceef0]">
        <div className="max-w-7xl mx-auto px-8 lg:px-12 flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2">
            <p className="label-sm mb-4 text-blue-600">Built for Scale</p>
            <h2 className="headline-lg text-[#03071d] mb-6">
              Precision design for high-performance teams.
            </h2>
            <p className="body-lg mb-8">
              FlowHR is built for the complexity of modern enterprises. Handle thousands of 
              concurrent workflows with built-in validation and error recovery.
            </p>
            <ul className="space-y-4">
              {[
                'Real-time graph validation',
                'Topological sort execution',
                'MSW-powered API mocking',
                'Advanced type safety with TypeScript'
              ].map(item => (
                <li key={item} className="flex items-center gap-3 text-sm font-medium text-[#03071d]">
                  <div className="w-5 h-5 rounded-full bg-blue-500/10 flex items-center justify-center">
                    <ChevronRight className="w-3 h-3 text-blue-600" />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:w-1/2 w-full">
            <div className="relative aspect-square rounded-3xl bg-[#03071d] overflow-hidden shadow-2xl shadow-blue-900/20">
              <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="grid grid-cols-2 gap-4">
                  <div className="w-24 h-24 rounded-2xl bg-white/5 border border-white/10 animate-pulse" />
                  <div className="w-24 h-24 rounded-2xl bg-blue-500/20 border border-blue-500/30" />
                  <div className="w-24 h-24 rounded-2xl bg-white/10 border border-white/10" style={{ animationDelay: '0.5s' }} />
                  <div className="w-24 h-24 rounded-2xl bg-white/5 border border-white/10" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA Section ─────────────────────────────────────────── */}
      <section className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-8 lg:px-12">
          <div className="rounded-[2.5rem] bg-[#03071d] p-12 lg:p-24 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/20 blur-[100px] -mr-48 -mt-48" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-violet-600/20 blur-[100px] -ml-48 -mb-48" />
            
            <div className="relative z-10">
              <h2 className="headline-lg text-white mb-8">
                Ready to transform <br />
                your HR operations?
              </h2>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/designer" className="btn-blue h-14 px-10 text-lg">
                  Launch App Now
                </Link>
                <Link href="/docs" className="btn-secondary h-14 px-10 text-lg">
                  View Docs
                </Link>
              </div>
              <p className="mt-8 text-sm text-white/40">
                No credit card required. Setup takes 2 minutes.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
