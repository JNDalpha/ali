import { useState } from 'react';
import { Sparkles, Heart, AlertCircle, Send, Bot, User, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { chatWithAI } from '@/services/api';
import type { Message } from '@/types/medicine';

export default function Beauty() {
  const [activeTab, setActiveTab] = useState('consult');
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: '您好!我是医美咨询顾问。我可以为您提供医美项目咨询、产品推荐等服务。请告诉我您的需求。',
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
      const systemPrompt = activeTab === 'consult' 
        ? '你是一位专业的医美咨询顾问。评估医美项目的适用性,提示潜在风险,推荐合规医美机构和术后护理产品。注意强调安全性和合规性。'
        : '你是一位专业的医美产品顾问。筛查医美产品合规性,根据用户肤质推荐合适的护肤品和医美耗材。重点关注产品成分和效果。';

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
    consult: [
      '光子嫩肤适合我的肤质吗?',
      '双眼皮手术有哪些风险?',
      '医美项目术后如何护理?',
      '如何选择正规医美机构?',
    ],
    product: [
      '医用面膜和普通面膜的区别?',
      '玻尿酸原液如何选购?',
      '敏感肌适合什么护肤品?',
      '如何辨别医美产品真伪?',
    ],
  };

  const products = [
    {
      name: '医用面膜',
      desc: '术后修复,舒缓镇静',
      price: '¥128',
      tag: '械字号',
    },
    {
      name: '玻尿酸原液',
      desc: '深层补水,改善肤质',
      price: '¥299',
      tag: '合规认证',
    },
    {
      name: '家用美容仪',
      desc: '射频紧致,提拉抗衰',
      price: '¥1299',
      tag: '热销',
    },
    {
      name: '医美套餐',
      desc: '光子嫩肤3次体验',
      price: '¥2999',
      tag: '限时优惠',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-3 sm:px-4 py-4">
        <div className="mb-4 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-health-green to-health-green-light rounded-xl mb-2 shadow-md">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-xl font-bold text-gray-900 mb-1">医美咨询</h1>
          <p className="text-xs text-gray-600">专业医美项目咨询与产品推荐</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-3">
          <TabsList className="grid w-full grid-cols-2 h-10">
            <TabsTrigger value="consult" className="text-sm">项目咨询</TabsTrigger>
            <TabsTrigger value="product" className="text-sm">产品推荐</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-3">
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
                              ? 'bg-gradient-to-br from-taobao-orange to-taobao-orange-light'
                              : 'bg-gradient-to-br from-health-green to-health-green-light'
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
                              ? 'bg-gradient-to-br from-taobao-orange to-taobao-orange-light text-white'
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
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-health-green to-health-green-light flex items-center justify-center">
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
                      {quickQuestions[activeTab as keyof typeof quickQuestions].map((question, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          onClick={() => setInput(question)}
                          className="text-xs hover:bg-green-50 hover:border-health-green h-7 px-2"
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
                    placeholder={activeTab === 'consult' ? '描述您想了解的医美项目...' : '描述您的肤质和需求...'}
                    className="min-h-[50px] max-h-[120px] resize-none rounded-lg border-2 focus:border-health-green text-sm"
                    disabled={isLoading}
                  />
                  <Button
                    onClick={handleSend}
                    disabled={!input.trim() || isLoading}
                    className="bg-health-green hover:bg-health-green-dark text-white px-4 h-[50px] rounded-lg shadow-md"
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
                    <div className="flex flex-col space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs bg-green-100 text-health-green px-2 py-0.5 rounded-full font-medium">
                          {product.tag}
                        </span>
                        <Heart className="w-4 h-4 text-gray-400" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{product.name}</p>
                        <p className="text-xs text-gray-600 mt-1">{product.desc}</p>
                        <p className="text-sm font-bold text-health-green mt-2">{product.price}</p>
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

        <Alert className="border-green-200 bg-green-50">
          <AlertCircle className="h-4 w-4 text-health-green" />
          <AlertDescription className="text-green-800 text-xs">
            <strong>安全提示:</strong> 医美项目需选择正规机构,术前充分沟通,了解风险。产品需认准械字号等合规标识。
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}
