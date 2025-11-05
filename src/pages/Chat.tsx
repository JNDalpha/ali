import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, AlertCircle, Loader2, Stethoscope, Dumbbell, Sparkles, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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

  const parts: Array<{ text: string; isMedicine: boolean; medicine?: string }> = [];
  let lastIndex = 0;

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
    if (part.isMedicine && part.medicine) {
      return (
        <span
          key={index}
          onClick={() => onMedicineClick(part.medicine!)}
          className="text-taobao-orange underline cursor-pointer hover:text-taobao-orange-dark font-medium"
        >
          {part.text}
        </span>
      );
    }
    return <span key={index}>{part.text}</span>;
  });
}

const sceneConfigs = {
  medical: {
    icon: <Stethoscope className="w-5 h-5" />,
    title: '疾病问诊',
    color: 'taobao-orange',
    systemPrompt: '你是一位专业的AI医生助手。根据用户描述的症状,分析可能的疾病,提供专业的诊疗建议和用药指导。对于处方药,务必提醒用户咨询医生并获得处方。回答要专业、准确、易懂。',
    welcomeMessage: '您好!我是AI医生助手。请描述您的症状,我会为您分析可能的疾病并提供诊疗建议。',
    quickQuestions: [
      '感冒发烧怎么办?',
      '头痛的原因有哪些?',
      '肠胃不适如何缓解?',
      '高血压如何控制?',
    ],
  },
  sports: {
    icon: <Dumbbell className="w-5 h-5" />,
    title: '运动健康',
    color: 'health-green',
    systemPrompt: '你是一位专业的运动健康顾问。根据用户的身体状况和运动目标,提供个性化的运动方案、运动损伤咨询和康复建议。注重科学性和安全性。',
    welcomeMessage: '您好!我是运动健康顾问。无论是制定运动计划还是咨询运动损伤,我都能为您提供专业建议。',
    quickQuestions: [
      '我想减脂,如何制定运动计划?',
      '跑步后膝盖疼痛怎么办?',
      '初学者如何开始力量训练?',
      '如何预防运动损伤?',
    ],
  },
  beauty: {
    icon: <Sparkles className="w-5 h-5" />,
    title: '医疗美容',
    color: 'health-green',
    systemPrompt: '你是一位专业的医美咨询顾问。提供医美项目(整形、微创注射、光电类、皮肤管理)的适用性评估、风险提示、术后护理建议,以及医美产品的合规性筛查和推荐。强调安全性和合规性。',
    welcomeMessage: '您好!我是医美咨询顾问。我可以为您提供医美项目咨询、产品推荐、机构选择等专业建议。',
    quickQuestions: [
      '光子嫩肤适合我的肤质吗?',
      '玻尿酸填充效果能维持多久?',
      '如何选择正规医美机构?',
      '医美术后如何护理?',
    ],
  },
  health: {
    icon: <Heart className="w-5 h-5" />,
    title: '健康管理',
    color: 'taobao-orange',
    systemPrompt: '你是一位专业的健康管理顾问。提供饮食管理、健康数据分析、疫苗接种、体检解读等健康管理建议。帮助用户建立健康的生活方式。',
    welcomeMessage: '您好!我是健康管理顾问。我可以为您提供饮食管理、健康数据分析等全方位健康管理建议。',
    quickQuestions: [
      '如何制定健康饮食计划?',
      '高血压患者饮食注意事项?',
      '需要接种哪些疫苗?',
      '体检报告异常指标如何解读?',
    ],
  },
};

type SceneType = keyof typeof sceneConfigs;

export default function Chat() {
  const [activeScene, setActiveScene] = useState<SceneType>('medical');
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: sceneConfigs.medical.welcomeMessage,
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

  useEffect(() => {
    setMessages([
      {
        role: 'assistant',
        content: sceneConfigs[activeScene].welcomeMessage,
      },
    ]);
  }, [activeScene]);

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
          content: sceneConfigs[activeScene].systemPrompt,
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

  const handleQuickQuestion = (question: string) => {
    setInput(question);
  };

  const currentConfig = sceneConfigs[activeScene];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-3 sm:px-4 py-4">
        <div className="mb-4 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-taobao-orange to-taobao-orange-light rounded-xl mb-2 shadow-md">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-xl font-bold text-gray-900 mb-1">AI智能问诊</h1>
          <p className="text-xs text-gray-600">多场景健康咨询,一站式解决您的健康问题</p>
        </div>

        <Tabs value={activeScene} onValueChange={(v) => setActiveScene(v as SceneType)} className="mb-3">
          <TabsList className="grid w-full grid-cols-4 h-10">
            {Object.entries(sceneConfigs).map(([key, config]) => (
              <TabsTrigger key={key} value={key} className="text-xs flex items-center gap-1">
                {config.icon}
                <span className="hidden sm:inline">{config.title}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value={activeScene} className="mt-3">
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
                              : `bg-gradient-to-br from-${currentConfig.color} to-${currentConfig.color}-light`
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
                            {message.role === 'assistant' && activeScene === 'medical'
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
                        <div className={`w-8 h-8 rounded-full bg-gradient-to-br from-${currentConfig.color} to-${currentConfig.color}-light flex items-center justify-center`}>
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
                      {currentConfig.quickQuestions.map((question, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          onClick={() => handleQuickQuestion(question)}
                          className={`text-xs hover:bg-${currentConfig.color === 'taobao-orange' ? 'orange' : 'green'}-50 hover:border-${currentConfig.color} h-7 px-2`}
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
                    placeholder={`输入您的${currentConfig.title}问题...`}
                    className={`min-h-[50px] max-h-[120px] resize-none rounded-lg border-2 focus:border-${currentConfig.color} text-sm`}
                    disabled={isLoading}
                  />
                  <Button
                    onClick={handleSend}
                    disabled={!input.trim() || isLoading}
                    className={`bg-${currentConfig.color} hover:bg-${currentConfig.color}-dark text-white px-4 h-[50px] rounded-lg shadow-md`}
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
          </TabsContent>
        </Tabs>
      </div>

      <MedicineDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        medicineName={selectedMedicine || ''}
      />
    </div>
  );
}
