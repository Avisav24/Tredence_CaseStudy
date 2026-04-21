'use client';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { useWorkflowStore } from '@/store/workflowStore';
import { useRouter } from 'next/navigation';
import { Layout, Users, Zap, Briefcase, ShieldCheck, Mail, ArrowRight } from 'lucide-react';
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
    icon: <Users className="w-6 h-6 text-blue-500" />,
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
    icon: <Zap className="w-6 h-6 text-emerald-500" />,
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
    icon: <Briefcase className="w-6 h-6 text-amber-500" />,
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
    <div className="min-h-screen bg-white font-body">
      <Navbar />
      
      <header className="pt-48 pb-16 bg-[#03071d] relative">
        <div className="max-w-7xl mx-auto px-8 lg:px-12 text-center">
          <h1 className="text-[48px] font-extrabold text-white mb-6" style={{ fontFamily: 'var(--font-display)' }}>
            Start with a <span className="text-blue-500">Template.</span>
          </h1>
          <p className="text-lg text-white/50 max-w-2xl mx-auto">
            Don't start from scratch. Use our pre-built, industry-standard HR workflows and customize them to fit your needs.
          </p>
        </div>
      </header>

      <main className="py-20 max-w-7xl mx-auto px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {TEMPLATES.map((template, i) => (
            <div 
              key={template.id} 
              className="group bg-white rounded-[32px] border border-gray-100 p-10 hover:border-blue-500/20 hover:shadow-ambient transition-all animate-fade-in-up"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                {template.icon}
              </div>
              <div className="inline-flex px-3 py-1 rounded-full bg-blue-50 text-[10px] font-bold text-blue-600 uppercase tracking-widest mb-4">
                {template.category}
              </div>
              <h3 className="text-2xl font-bold text-[#03071d] mb-4" style={{ fontFamily: 'var(--font-display)' }}>
                {template.title}
              </h3>
              <p className="text-[#515f74] leading-relaxed mb-10 text-sm">
                {template.description}
              </p>
              <button 
                onClick={() => handleUseTemplate(template)}
                className="btn-primary w-full justify-center group-hover:shadow-blue transition-all"
              >
                Use Template <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
