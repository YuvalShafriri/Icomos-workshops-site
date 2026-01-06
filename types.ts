
import { ReactNode } from 'react';

export enum AgentStatus {
  IDLE = 'idle',
  LOADING = 'loading',
  COMPLETE = 'complete',
  ERROR = 'error'
}

export interface AgentConfig {
  id: number;
  name: string;
  role: string;
  color: string;
  icon: ReactNode;
}

export interface SupportAgent {
  id: string;
  name: string;
  icon: ReactNode;
}

export type ViewMode = 'run' | 'prompt';
