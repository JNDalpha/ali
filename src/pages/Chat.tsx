import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, AlertCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { chatWithAI } from '@/services/api';
import MedicineDialog from '@/components/MedicineDialog';
import type { Message } from '@/types/medicine';

const medicineKeywords = [
  '布洛芬', '阿莫西林', '头孢', '感冒药', '止咳糖浆', '退烧药', '消炎药',
  '维生素', '板蓝根', '云南白药', '藿香正气', '双黄连', '连花清瘟',
  '阿司匹林', '扑热息痛', '对乙酰氨基酚', '氨溴索', '止痛药', '降压药',
  '降糖药', '胃药', '抗生素', '抗过敏药', '钙片', '鱼肝油'
];

function detectMedicineKeywords(text: string): string[] {
  const detected: string[] = [];
  for (const keyword of medicineKeywords) {
    if (text.includes(keyword) && !detected.includes(keyword)) {
      detected.push(keyword);
    }
  }
  return detected;
}

function renderMessageWithLinks(
  content: string,
  onMedicineClick: (medicine: string) => void
): React.ReactNode {
  const keywords = detectMedicineKeywords(content);
  if (keywords.length === 0) {
    return content;
  }

  let result: React.ReactNode[] = [];
  let lastIndex = 0;
  const parts: Array<{ text: string; isMedicine: boolean; medicine?: string }> = [];

  keywords.forEach((keyword) => {
    const index = content.indexOf(keyword, lastIndex);
    if (index !== -1) {
      if (index > lastIndex) {
        parts.push({ text: content.substring(lastIndex, index), isMedicine: false });
      }
      parts.push({ text: keyword, isMedicine: true, medicine: keyword });
      lastIndex = index + keyword.length;
    }
  });

  if (lastIndex < content.length) {
    parts.push({ text: content.substring(lastIndex), isMedicine: false });
  }

  return parts.map((part, index) => {
    if (part.isMedicine) {
      return (
        <button
          key={index}
          onClick={() => onMedicineClick(part.medicine!)}
          className="text-health-green underline hover:text-health-green-dark font-medium cursor-pointer"
        >
          {part.text}
        </button>
      );
    }
    return <span key={index}>{part.text}</span>;
  });
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: '您好!我是AI药师助手,很高兴为您服务。您可以向我咨询疾病症状、用药建议等问题。请注意,我的建议仅供参考,如需处方药或病情严重,请及时就医。',
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedMedicine, setSelectedMedicine] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleMedicineClick = (medicine: string) => {
    setSelectedMedicine(medicine);
    setDialogOpen(true);
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      role: 'user',
      content: input.trim(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setError('');

    const assistantMessage: Message = {
      role: 'assistant',
      content: '',
    };
    setMessages((prev) => [...prev, assistantMessage]);

    try {
      const conversationMessages: Message[] = [
        {
          role: 'system',
          content: '你是一位专业的AI药师助手,负责为用户提供疾病科普、用药建议等健康咨询服务。请注意:1. 提供的建议仅供参考,不能替代专业医生诊断 2. 对于需要处方药的情况,提醒用户咨询医生 3. 回答要专业、准确、易懂 4. 关注用药安全 5. 避免重复相同的词语和句子',
        },
        ...messages.filter((m) => m.role !== 'system'),
        userMessage,
      ];

      await chatWithAI(
        conversationMessages,
        (chunk) => {
          setMessages((prev) => {
            const newMessages = [...prev];
            const lastMessage = newMessages[newMessages.length - 1];
            if (lastMessage.role === 'assistant') {
              lastMessage.content += chunk;
            }
            return newMessages;
          });
        },
        () => {
          setIsLoading(false);
        }
      );
    } catch (err) {
      setError('抱歉,发生了错误,请稍后重试');
      setIsLoading(false);
      setMessages((prev) => prev.slice(0, -1));
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const quickQuestions = [
    '感冒了应该吃什么药?',
    '头痛的常见原因有哪些?',
    '如何预防高血压?',
    '胃痛应该注意什么?',
  ];

  const handleQuickQuestion = (question: string) => {
    setInput(question);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-3 sm:px-4 py-4">
        <div className="mb-4 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-taobao-orange to-taobao-orange-light rounded-xl mb-2 shadow-md">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-xl font-bold text-gray-900 mb-1">AI智能问答</h1>
          <p className="text-xs text-gray-600">专业健康咨询,随时为您解答</p>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-3">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="text-sm">{error}</AlertDescription>
          </Alert>
        )}

        <Card className="mb-3 border-none shadow-lg">
          <CardContent className="p-3">
            <div className="h-[400px] overflow-y-auto mb-3 space-y-3">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`flex items-start space-x-2 max-w-[85%] ${
                      message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                    }`}
                  >
                    <div
                      className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                        message.role === 'user'
                          ? 'bg-gradient-to-br from-health-green to-health-green-light'
                          : 'bg-gradient-to-br from-taobao-orange to-taobao-orange-light'
                      }`}
                    >
                      {message.role === 'user' ? (
                        <User className="w-4 h-4 text-white" />
                      ) : (
                        <Bot className="w-4 h-4 text-white" />
                      )}
                    </div>
                    <div
                      className={`px-3 py-2 rounded-xl text-sm ${
                        message.role === 'user'
                          ? 'bg-gradient-to-br from-health-green to-health-green-light text-white'
                          : 'bg-gray-100 text-gray-900'
                      }`}
                    >
                      <p className="whitespace-pre-wrap break-words leading-relaxed">
                        {message.role === 'assistant'
                          ? renderMessageWithLinks(message.content, handleMedicineClick)
                          : message.content}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-taobao-orange to-taobao-orange-light flex items-center justify-center">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                    <div className="px-3 py-2 rounded-xl bg-gray-100">
                      <Loader2 className="w-4 h-4 animate-spin text-gray-600" />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {messages.length === 1 && (
              <div className="mb-3">
                <p className="text-xs text-gray-600 mb-2">快速提问:</p>
                <div className="flex flex-wrap gap-1.5">
                  {quickQuestions.map((question, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuickQuestion(question)}
                      className="text-xs hover:bg-orange-50 hover:border-taobao-orange h-7 px-2"
                    >
                      {question}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-end space-x-2">
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="输入您的问题..."
                className="min-h-[50px] max-h-[120px] resize-none rounded-lg border-2 focus:border-taobao-orange text-sm"
                disabled={isLoading}
              />
              <Button
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className="bg-taobao-orange hover:bg-taobao-orange-dark text-white px-4 h-[50px] rounded-lg shadow-md"
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        <Alert className="border-orange-200 bg-orange-50">
          <AlertCircle className="h-4 w-4 text-taobao-orange" />
          <AlertDescription className="text-orange-800 text-xs">
            <strong>重要提示:</strong> AI助手提供的建议仅供参考,不能替代专业医生的诊断和治疗。
            如需处方药或病情严重,请及时就医。
          </AlertDescription>
        </Alert>
      </div>

      <MedicineDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        medicineName={selectedMedicine || ''}
      />
    </div>
  );
}
