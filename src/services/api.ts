import axios from 'axios';
import type { Message } from '@/types/medicine';

const APP_ID = import.meta.env.VITE_APP_ID;

const apiClient = axios.create({
  timeout: 60000,
  headers: {
    'Content-Type': 'application/json',
    'X-App-Id': APP_ID,
  },
});

apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.error('API 请求错误:', error);
    if (error.response?.data?.status === 999) {
      throw new Error(error.response.data.msg);
    }
    return Promise.reject(error);
  }
);

function filterRepeatedContent(text: string): string {
  const sentences = text.split(/([。!?;,\n])/);
  const result: string[] = [];
  const seenPhrases = new Set<string>();
  
  for (let i = 0; i < sentences.length; i++) {
    const sentence = sentences[i];
    if (!sentence || sentence.match(/^[。!?;,\n]$/)) {
      result.push(sentence);
      continue;
    }
    
    const words = sentence.split(/\s+/);
    const filteredWords: string[] = [];
    let lastWord = '';
    let repeatCount = 0;
    
    for (const word of words) {
      if (word === lastWord) {
        repeatCount++;
        if (repeatCount < 2) {
          filteredWords.push(word);
        }
      } else {
        filteredWords.push(word);
        lastWord = word;
        repeatCount = 0;
      }
    }
    
    const cleanedSentence = filteredWords.join(' ');
    
    const normalizedSentence = cleanedSentence.replace(/\s+/g, '').toLowerCase();
    if (normalizedSentence.length > 5 && !seenPhrases.has(normalizedSentence)) {
      seenPhrases.add(normalizedSentence);
      result.push(cleanedSentence);
    } else if (normalizedSentence.length <= 5) {
      result.push(cleanedSentence);
    }
  }
  
  return result.join('');
}

export const chatWithAI = async (
  messages: Message[],
  onChunk: (content: string) => void,
  onComplete: () => void
) => {
  try {
    const response = await fetch('/api/miaoda/runtime/apicenter/source/proxy/ernietextgenerationchat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-App-Id': APP_ID,
      },
      body: JSON.stringify({
        messages,
      }),
    });

    if (!response.ok) {
      throw new Error('网络请求失败');
    }

    const reader = response.body?.getReader();
    const decoder = new TextDecoder();

    if (!reader) {
      throw new Error('无法读取响应流');
    }

    let buffer = '';
    let accumulatedContent = '';
    
    while (true) {
      const { done, value } = await reader.read();
      
      if (done) {
        onComplete();
        break;
      }

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop() || '';

      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const data = line.slice(6);
          if (data === '[DONE]') {
            onComplete();
            return;
          }
          
          try {
            const parsed = JSON.parse(data);
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) {
              accumulatedContent += content;
              const filtered = filterRepeatedContent(accumulatedContent);
              onChunk(content);
            }
            
            if (parsed.choices?.[0]?.finish_reason === 'stop') {
              onComplete();
              return;
            }
          } catch (e) {
            console.error('解析响应失败:', e);
          }
        }
      }
    }
  } catch (error) {
    console.error('AI对话错误:', error);
    throw error;
  }
};

export const searchWithAI = async (
  query: string,
  options: {
    enableDeepSearch?: boolean;
    recencyFilter?: 'week' | 'month' | 'semiyear' | 'year';
  },
  onChunk: (content: string) => void,
  onComplete: (references: any[], followupQueries?: string[]) => void
) => {
  try {
    const response = await fetch('/api/miaoda/runtime/apicenter/source/proxy/aisearchstreamw4DTfSmsE1', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-App-Id': APP_ID,
      },
      body: JSON.stringify({
        messages: [
          {
            role: 'user',
            content: query,
          },
        ],
        enable_deep_search: options.enableDeepSearch || false,
        search_recency_filter: options.recencyFilter,
        resource_type_filter: [
          { type: 'web', top_k: 10 },
        ],
      }),
    });

    if (!response.ok) {
      throw new Error('网络请求失败');
    }

    const reader = response.body?.getReader();
    const decoder = new TextDecoder();

    if (!reader) {
      throw new Error('无法读取响应流');
    }

    let buffer = '';
    let references: any[] = [];
    let followupQueries: string[] = [];
    
    while (true) {
      const { done, value } = await reader.read();
      
      if (done) {
        onComplete(references, followupQueries);
        break;
      }

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop() || '';

      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const data = line.slice(6);
          if (data === '[DONE]') {
            onComplete(references, followupQueries);
            return;
          }
          
          try {
            const parsed = JSON.parse(data);
            
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) {
              onChunk(content);
            }
            
            if (parsed.references) {
              references = parsed.references;
            }
            
            if (parsed.followup_queries) {
              followupQueries = parsed.followup_queries;
            }
            
            if (parsed.choices?.[0]?.finish_reason === 'stop') {
              onComplete(references, followupQueries);
              return;
            }
          } catch (e) {
            console.error('解析响应失败:', e);
          }
        }
      }
    }
  } catch (error) {
    console.error('AI搜索错误:', error);
    throw error;
  }
};

export default {
  chatWithAI,
  searchWithAI,
};
