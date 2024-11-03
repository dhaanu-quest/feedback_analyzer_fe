import { ReactNode } from 'react';

export interface User {
  email: string;
  userId: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

export interface APIResponse {
  sentiment_analysis: {
    positive: {
      count: number;
      userIds: string[];
      feedbacks: string[];
    };
    negative: {
      count: number;
      userIds: string[];
      feedbacks: string[];
    };
    neutral: {
      count: number;
      userIds: string[];
      feedbacks: string[];
    };
  };
  theme_category: {
    performance_issues: string[];
    feature_requests: string[];
    onboarding_and_usability: string[];
    customer_support: string[];
    pricing: string[];
  };
  priority: {
    high: string[];
    moderate: string[];
    low: string[];
  };
  feature_requests: Array<{
    request: string;
    priority: string;
  }>;
  key_problems: string[];
  churn_prediction: Array<{
    userId: string;
    reason: string;
  }>;
  retention_strategies: string[];
}

export interface TransformedData {
  sentiment: Array<{
    category: string;
    count: number;
    percentage: number;
  }>;

  userSegments: {
    satisfied: Array<{
      userId: string;
      sentiment: string;
      feedbacks: string;
    }>;
    dissatisfied: Array<{
      userId: string;
      sentiment: string;
      feedbacks: string;
    }>;
  };
  themes: Array<{
    category: string;
    items: string[];
  }>;
  priorities: Array<{
    level: string;
    items: string[];
  }>;
  features: Array<{
    request: string;
    priority: string;
  }>;
  problems: Array<{
    issue: string;
  }>;
  churnPrediction: Array<{
    userId: string;
    reason: string;
  }>;
  retention: Array<{
    strategy: string;
  }>;
}

export interface IntegrationConfig {
  jira?: {
    apiToken?: string;  // Make these optional
    domain?: string;
    key?: string;
  };
  clickup?: {
    apiToken?: string;
    listId?: string;
  };
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title: string;
}