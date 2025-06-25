interface UserInput {
  message: string;
  thread_id?: string;
  conversation_id?: string;
  chat_id?: string;
  context?: any;
  details?: any;
}

interface AgentResponse {
  content: string;
  thread_id: string;
  run_id: string;
}

interface AgentInfo {
  id: string;
  name: string;
  description: string;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_AGENTS_API_URL || 'http://localhost:8000';

export class AgentsAPI {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  async getAgents(): Promise<AgentInfo[]> {
    const response = await fetch(`${this.baseUrl}/agents`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  }

  async invokeAgent(agentId: string, input: UserInput): Promise<AgentResponse> {
    const response = await fetch(`${this.baseUrl}/${agentId}/invoke`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(input),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  async checkHealth(): Promise<any> {
    const response = await fetch(`${this.baseUrl}/health`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  }

  // Stream pour les réponses en temps réel
  async streamAgent(agentId: string, input: UserInput): Promise<ReadableStream> {
    const response = await fetch(`${this.baseUrl}/${agentId}/stream`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(input),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    if (!response.body) {
      throw new Error('Response body is null');
    }

    return response.body;
  }
}

export const agentsAPI = new AgentsAPI(); 