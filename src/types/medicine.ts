export interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface ChatResponse {
  id: string;
  choices: Array<{
    index: number;
    delta: {
      role?: string;
      content?: string;
    };
    finish_reason: string | null;
  }>;
}

export interface SearchReference {
  id: string;
  title: string;
  content: string;
  url: string;
  web_anchor?: string;
  date?: string;
  type?: 'web' | 'image' | 'video';
  icon?: string;
  image?: {
    url: string;
  };
  video?: {
    hover_pic?: string;
  };
}

export interface SearchResult {
  summary: string;
  references: SearchReference[];
  followupQueries?: string[];
}

export interface Disease {
  id: string;
  name: string;
  category: string;
  description: string;
  symptoms: string[];
  prevention: string[];
  treatment: string[];
}
