'use client';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { useWorkflowStore } from '@/store/workflowStore';
import { useRouter } from 'next/navigation';
import { Users, Zap, Briefcase, ArrowRight, Sparkles } from 'lucide-react';
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
    icon: <Users className="w-8 h-8 text-blue-500" />,
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
    icon: <Zap className="w-8 h-8 text-emerald-500" />,
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
    icon: <Briefcase className="w-8 h-8 text-amber-500" />,
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
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-[#030712] selection:bg-blue-600/20">
      <Navbar dark />
      
      <header className="pt-64 pb-48 relative overflow-hidden border-b border-white/[0.03]">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[60%] h-[100%] bg-blue-600/10 blur-[150px] opacity-60" />
          <div className="absolute bottom-0 left-0 w-[40%] h-[60%] bg-indigo-600/10 blur-[120px] opacity-60" />
          <div className="absolute inset-0 opacity-[0.03]" 
               style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '60px 60px' }} />
        </div>

        <div className="max-w-7xl mx-auto px-8 lg:px-16 text-center relative z-10 flex flex-col items-center">
          <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-white/5 border border-white/10 mb-12 animate-reveal shadow-2xl backdrop-blur-xl">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span className="text-[12px] font-black tracking-[0.3em] uppercase text-white/90">Curated Blueprints</span>
          </div>

          <h1 className="display-xl text-white mb-12 animate-reveal text-balance">
            Deploy in <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-violet-400 bg-clip-text text-transparent">Seconds.</span>
          </h1>
          
          <p className="body-lg text-white/40 max-w-3xl mx-auto animate-reveal text-balance leading-relaxed" style={{ animationDelay: '0.1s' }}>
            Accelerate your transformation with pre-configured, battle-tested workflow templates designed for modern HR organizations.
          </p>
        </div>
      </header>

      <main className="py-48 max-w-7xl mx-auto px-8 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
          {TEMPLATES.map((template, i) => (
            <div 
              key={template.id} 
              className="card-premium group relative !p-16 animate-reveal flex flex-col h-full"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="w-20 h-20 rounded-[2.5rem] bg-white/[0.02] border border-white/10 flex items-center justify-center mb-12 group-hover:scale-110 group-hover:border-blue-500/30 transition-all duration-700 shadow-2xl">
                {template.icon}
              </div>
              
              <div className="inline-flex self-start px-5 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-[11px] font-black text-blue-400 uppercase tracking-[0.3em] mb-10">
                {template.category}
              </div>
              
              <h3 className="text-3xl font-black text-white mb-8 tracking-tight leading-tight">
                {template.title}
              </h3>
              
              <p className="text-lg text-white/40 mb-16 line-clamp-3 leading-relaxed font-medium flex-grow">
                {template.description}
              </p>
              
              <button 
                onClick={() => handleUseTemplate(template)}
                className="btn-primary w-full justify-center !rounded-[1.5rem] py-6 group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="relative flex items-center gap-3">
                  Instantiate Template 
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-3 transition-transform" />
                </span>
              </button>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
