'use client';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { useWorkflowStore } from '@/store/workflowStore';
import { useRouter } from 'next/navigation';
import { Layout, Users, Zap, Briefcase, ShieldCheck, Mail, ArrowRight, Sparkles } from 'lucide-react';
import { type Node, type Edge } from '@xyflow/react';
import { type WorkflowNodeData } from '@/types/workflow';

interface Template {
  id: string;
  title: string;
  description: string;
  category: string;
  icon: React.ReactNode;
  nodes: Node<WorkflowNodeData>[];
  edges: Edge[];
}

const TEMPLATES: Template[] = [
  {
    id: 'onboarding',
    title: 'Standard Onboarding',
    description: 'A 5-step journey for new hires including document collection and manager approval.',
    category: 'Human Resources',
    icon: <Users className="w-7 h-7 text-blue-500" />,
    nodes: [
      { id: 'start', type: 'start', position: { x: 250, y: 50 }, data: { nodeType: 'start', label: 'Start', title: 'New Hire Start', status: 'idle', validationErrors: [], metadata: [] } },
      { id: 't1', type: 'task', position: { x: 250, y: 180 }, data: { nodeType: 'task', label: 'Task', title: 'Submit Documents', description: 'Collect all required documents.', assignee: 'New Hire', dueDate: '', customFields: [], status: 'idle', validationErrors: [] } },
      { id: 'a1', type: 'approval', position: { x: 250, y: 310 }, data: { nodeType: 'approval', label: 'Approval', title: 'Verify IDs', approverRole: 'HRBP', autoApproveThreshold: 0, status: 'idle', validationErrors: [] } },
      { id: 'end', type: 'end', position: { x: 250, y: 440 }, data: { nodeType: 'end', label: 'End', endMessage: 'Onboarding Complete', showSummary: true, status: 'idle', validationErrors: [] } }
    ],
    edges: [
      { id: 'e1', source: 'start', target: 't1' },
      { id: 'e2', source: 't1', target: 'a1' },
      { id: 'e3', source: 'a1', target: 'end' }
    ]
  },
  {
    id: 'it-request',
    title: 'IT Hardware Request',
    description: 'Automated workflow for laptop and peripheral requests with manager approval.',
    category: 'IT Operations',
    icon: <Zap className="w-7 h-7 text-emerald-500" />,
    nodes: [
      { id: 'start', type: 'start', position: { x: 250, y: 50 }, data: { nodeType: 'start', label: 'Start', title: 'Request Initiated', status: 'idle', validationErrors: [], metadata: [] } },
      { id: 'a1', type: 'approval', position: { x: 250, y: 180 }, data: { nodeType: 'approval', label: 'Approval', title: 'Budget Approval', approverRole: 'Manager', autoApproveThreshold: 0, status: 'idle', validationErrors: [] } },
      { id: 'auto1', type: 'automated', position: { x: 250, y: 310 }, data: { nodeType: 'automated', label: 'Automated', title: 'Provision Laptop', actionId: 'generate_doc', actionParams: {}, status: 'idle', validationErrors: [] } },
      { id: 'end', type: 'end', position: { x: 250, y: 440 }, data: { nodeType: 'end', label: 'End', endMessage: 'Hardware Ready', showSummary: true, status: 'idle', validationErrors: [] } }
    ],
    edges: [
      { id: 'e1', source: 'start', target: 'a1' },
      { id: 'e2', source: 'a1', target: 'auto1' },
      { id: 'e3', source: 'auto1', target: 'end' }
    ]
  },
  {
    id: 'leave-approval',
    title: 'Leave Approval',
    description: 'Simple leave request flow with policy check and team notification.',
    category: 'Human Resources',
    icon: <Briefcase className="w-7 h-7 text-amber-500" />,
    nodes: [
      { id: 'start', type: 'start', position: { x: 250, y: 50 }, data: { nodeType: 'start', label: 'Start', title: 'Leave Requested', status: 'idle', validationErrors: [], metadata: [] } },
      { id: 'a1', type: 'approval', position: { x: 250, y: 180 }, data: { nodeType: 'approval', label: 'Approval', title: 'Manager Sign-off', approverRole: 'Manager', autoApproveThreshold: 0, status: 'idle', validationErrors: [] } },
      { id: 'auto1', type: 'automated', position: { x: 250, y: 310 }, data: { nodeType: 'automated', label: 'Automated', title: 'Update Calendar', actionId: 'send_email', actionParams: {}, status: 'idle', validationErrors: [] } },
      { id: 'end', type: 'end', position: { x: 250, y: 440 }, data: { nodeType: 'end', label: 'End', endMessage: 'Leave Approved', showSummary: true, status: 'idle', validationErrors: [] } }
    ],
    edges: [
      { id: 'e1', source: 'start', target: 'a1' },
      { id: 'e2', source: 'a1', target: 'auto1' },
      { id: 'e3', source: 'auto1', target: 'end' }
    ]
  }
];

export default function TemplatesPage() {
  const { loadWorkflow } = useWorkflowStore();
  const router = useRouter();

  const handleUseTemplate = (template: Template) => {
    loadWorkflow(template.title, template.nodes, template.edges);
    router.push('/designer');
  };

  return (
    <div className="min-h-screen bg-white selection:bg-blue-600/10">
      <Navbar dark />
      
      <header className="pt-64 pb-32 bg-[#03071d] relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[50%] h-[100%] bg-blue-600/10 blur-[120px]" />
          <div className="absolute bottom-0 left-0 w-[30%] h-[50%] bg-indigo-600/10 blur-[100px]" />
          <div className="absolute inset-0 opacity-[0.05]" 
               style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        </div>

        <div className="max-w-7xl mx-auto px-8 lg:px-12 text-center relative z-10 flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-10 animate-reveal shadow-2xl backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-white/80">Workflow Presets</span>
          </div>

          <h1 className="display-lg text-white mb-10 animate-reveal text-balance">
            Start with a <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">Template.</span>
          </h1>
          
          <p className="body-lg text-white/50 max-w-2xl mx-auto animate-reveal text-balance" style={{ animationDelay: '0.1s' }}>
            Don't start from scratch. Use our pre-built, industry-standard HR workflows and customize them to fit your specific needs in seconds.
          </p>
        </div>
      </header>

      <main className="py-32 max-w-7xl mx-auto px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {TEMPLATES.map((template, i) => (
            <div 
              key={template.id} 
              className="card-premium group !p-12 animate-reveal"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="w-16 h-16 rounded-[2rem] bg-slate-50 flex items-center justify-center mb-10 group-hover:scale-110 group-hover:bg-blue-600/10 transition-all duration-500 shadow-sm border border-slate-100">
                {template.icon}
              </div>
              
              <div className="inline-flex px-4 py-1.5 rounded-full bg-blue-50 text-[10px] font-black text-blue-600 uppercase tracking-[0.2em] mb-6">
                {template.category}
              </div>
              
              <h3 className="text-2xl font-bold text-[#03071d] mb-6 tracking-tight leading-tight" style={{ fontFamily: 'var(--font-display)' }}>
                {template.title}
              </h3>
              
              <p className="body-md text-slate-500 mb-12 line-clamp-3 leading-relaxed">
                {template.description}
              </p>
              
              <button 
                onClick={() => handleUseTemplate(template)}
                className="btn-primary w-full justify-center !rounded-2xl py-4 group"
              >
                Use This Template 
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1.5 transition-transform" />
              </button>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
