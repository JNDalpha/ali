import { useState } from 'react';
import { Dumbbell, Heart, Activity, AlertCircle, Send, Bot, User, Loader2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { chatWithAI } from '@/services/api';
import type { Message } from '@/types/medicine';

export default function Sports() {
  const [activeTab, setActiveTab] = useState('plan');
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: '您好!我是运动健康顾问。我可以为您提供个性化运动方案、运动损伤咨询等服务。请告诉我您的需求。',
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

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
      const systemPrompt = activeTab === 'plan' 
        ? '你是一位专业的运动健康顾问。根据用户的身体数据和运动目标,提供个性化的运动方案,包括运动类型、强度、时长等。同时推荐相关的运动器材和装备。'
        : '你是一位专业的运动康复顾问。分析用户的运动损伤症状,提供专业的康复建议和护理方案,推荐合适的康复器械和护具。';

      const conversationMessages: Message[] = [
        {
          role: 'system',
          content: systemPrompt,
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

  const quickQuestions = {
    plan: [
      '我想减脂,请给我制定运动计划',
      '适合在家做的健身运动有哪些?',
      '初学者如何开始力量训练?',
      '每天运动多久比较合适?',
    ],
    injury: [
      '跑步后膝盖疼痛怎么办?',
      '肌肉拉伤如何快速恢复?',
      '运动后肌肉酸痛正常吗?',
      '如何预防运动损伤?',
    ],
  };

  const products = [
    {
      name: '瑜伽垫',
      desc: '防滑加厚,适合居家运动',
      price: '¥89',
      icon: <Activity className="w-5 h-5 text-taobao-orange" />,
    },
    {
      name: '哑铃套装',
      desc: '可调节重量,适合力量训练',
      price: '¥299',
      icon: <Dumbbell className="w-5 h-5 text-taobao-orange" />,
    },
    {
      name: '运动护膝',
      desc: '专业防护,预防运动损伤',
      price: '¥59',
      icon: <Heart className="w-5 h-5 text-health-green" />,
    },
    {
      name: '筋膜枪',
      desc: '深层按摩,缓解肌肉疲劳',
      price: '¥399',
      icon: <Activity className="w-5 h-5 text-health-green" />,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-3 sm:px-4 py-4">
        <div className="mb-4 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-taobao-orange to-taobao-orange-light rounded-xl mb-2 shadow-md">
            <Dumbbell className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-xl font-bold text-gray-900 mb-1">运动健康</h1>
          <p className="text-xs text-gray-600">个性化运动方案与损伤康复指导</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-3">

          <TabsContent value="plan" className="mt-3">

          </TabsContent>
          <TabsContent value="injury" className="mt-3">
            <Card className="border-none shadow-lg mb-3">
              <CardContent className="p-3">
                <div className="h-[350px] overflow-y-auto mb-3 space-y-3">
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
                            {message.content}
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
                </div>

                {messages.length === 1 && (
                  <div className="mb-3">
                    <p className="text-xs text-gray-600 mb-2">快速提问:</p>
                    <div className="flex flex-wrap gap-1.5">
                      {quickQuestions.injury.map((question, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          onClick={() => setInput(question)}
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
                    placeholder="描述您的运动损伤症状..."
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
          </TabsContent>
        </Tabs>

        <Card className="border-none shadow-lg mb-3">
          <CardHeader className="p-3">
            <CardTitle className="text-sm">推荐商品</CardTitle>
          </CardHeader>
          <CardContent className="p-3 pt-0">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {products.map((product, index) => (
                <Card key={index} className="border shadow-sm hover:shadow-md transition-all cursor-pointer">
                  <CardContent className="p-3">
                    <div className="flex flex-col items-center text-center space-y-2">
                      <div className="w-10 h-10 bg-gradient-to-br from-orange-100 to-green-100 rounded-lg flex items-center justify-center">
                        {product.icon}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{product.name}</p>
                        <p className="text-xs text-gray-600 mt-1">{product.desc}</p>
                        <p className="text-sm font-bold text-taobao-orange mt-2">{product.price}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {error && (
          <Alert variant="destructive" className="mb-3">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="text-sm">{error}</AlertDescription>
          </Alert>
        )}

        <Alert className="border-orange-200 bg-orange-50">
          <AlertCircle className="h-4 w-4 text-taobao-orange" />
          <AlertDescription className="text-orange-800 text-xs">
            <strong>温馨提示:</strong> 运动建议仅供参考,如有严重损伤请及时就医。运动前请做好热身准备。
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}
