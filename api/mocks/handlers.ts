import { http, HttpResponse, delay } from 'msw';
import { simulateWorkflow } from '@/lib/simulationEngine';
import { type AutomationAction } from '@/types/workflow';

const AUTOMATION_ACTIONS: AutomationAction[] = [
  { id: 'send_email',      label: 'Send Email',           params: ['to', 'subject', 'body'] },
  { id: 'generate_doc',    label: 'Generate Document',    params: ['template', 'recipient'] },
  { id: 'send_slack',      label: 'Send Slack Message',   params: ['channel', 'message'] },
  { id: 'create_ticket',   label: 'Create JIRA Ticket',   params: ['project', 'summary', 'priority'] },
  { id: 'trigger_webhook', label: 'Trigger Webhook',      params: ['url', 'payload'] },
  { id: 'update_hris',     label: 'Update HRIS Record',   params: ['employeeId', 'field', 'value'] },
  { id: 'schedule_meeting',label: 'Schedule Meeting',     params: ['attendees', 'title', 'date'] },
  { id: 'send_sms',        label: 'Send SMS',             params: ['phone', 'message'] },
];

export const handlers = [
  // GET /api/automations
  http.get('/api/automations', async () => {
    await delay(300);
    return HttpResponse.json(AUTOMATION_ACTIONS);
  }),

  // POST /api/simulate
  http.post('/api/simulate', async ({ request }) => {
    await delay(500);
    const body = await request.json() as { nodes: unknown[]; edges: unknown[] };
    const result = await simulateWorkflow(
      body.nodes as Parameters<typeof simulateWorkflow>[0],
      body.edges as Parameters<typeof simulateWorkflow>[1]
    );
    return HttpResponse.json(result);
  }),

  // POST /api/validate
  http.post('/api/validate', async ({ request }) => {
    await delay(200);
    const body = await request.json() as { nodes: unknown[]; edges: unknown[] };
    const { validateWorkflowGraph } = await import('@/lib/graphUtils');
    const result = validateWorkflowGraph(
      body.nodes as Parameters<typeof validateWorkflowGraph>[0],
      body.edges as Parameters<typeof validateWorkflowGraph>[1]
    );
    return HttpResponse.json(result);
  }),
];
