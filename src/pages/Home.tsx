import { Link } from 'react-router-dom';
import { MessageCircle, Search, BookOpen, Shield, Pill } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function Home() {
  const features = [
    {
      icon: <MessageCircle className="w-6 h-6 text-taobao-orange" />,
      title: 'AI智能问答',
      description: '基于AI技术,理解症状并提供专业健康咨询',
      link: '/chat',
      color: 'from-taobao-orange to-taobao-orange-light',
    },
    {
      icon: <Search className="w-6 h-6 text-health-green" />,
      title: '药品检索',
      description: '快速搜索药品信息,了解功效和用法用量',
      link: '/search',
      color: 'from-health-green to-health-green-light',
    },
    {
      icon: <BookOpen className="w-6 h-6 text-taobao-orange" />,
      title: '疾病科普',
      description: '常见疾病介绍、预防措施和治疗建议',
      link: '/diseases',
      color: 'from-taobao-orange to-health-green',
    },
    {
      icon: <Shield className="w-6 h-6 text-health-green" />,
      title: '用药指南',
      description: '安全用药知识,正确使用药物避免风险',
      link: '/guide',
      color: 'from-health-green to-taobao-orange',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-4">
        <div className="text-center mb-4">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-taobao-orange to-health-green rounded-2xl mb-3 shadow-lg">
            <Pill className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            AI药师助手
          </h1>
          <p className="text-sm text-gray-600 max-w-2xl mx-auto">
            智能健康顾问,提供专业用药指导和健康咨询
          </p>
          <div className="mt-4 flex justify-center gap-2">
            <Link to="/chat">
              <Button size="sm" className="bg-taobao-orange hover:bg-taobao-orange-dark text-white px-4 py-2 text-sm rounded-lg shadow-md">
                <MessageCircle className="w-4 h-4 mr-1.5" />
                开始咨询
              </Button>
            </Link>
            <Link to="/search">
              <Button size="sm" variant="outline" className="px-4 py-2 text-sm rounded-lg border-health-green text-health-green hover:bg-green-50">
                <Search className="w-4 h-4 mr-1.5" />
                搜索药品
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
          {features.map((feature, index) => (
            <Link key={index} to={feature.link}>
              <Card className="h-full border-none shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 cursor-pointer overflow-hidden">
                <div className={`h-1 bg-gradient-to-r ${feature.color}`} />
                <CardHeader className="p-3">
                  <div className="flex flex-col items-center text-center space-y-2">
                    <div className={`w-10 h-10 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center shadow-md`}>
                      {feature.icon}
                    </div>
                    <CardTitle className="text-sm">{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="p-3 pt-0">
                  <CardDescription className="text-xs text-gray-600 text-center line-clamp-2">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <Card className="border-none shadow-lg bg-gradient-to-r from-taobao-orange to-health-green text-white mb-4">
          <CardContent className="py-4 px-4">
            <div className="text-center">
              <Shield className="w-10 h-10 mx-auto mb-2" />
              <h2 className="text-lg font-bold mb-2">安全用药提醒</h2>
              <p className="text-xs mb-3 text-white/90">
                本应用信息仅供参考,不能替代专业医生诊断。处方药需咨询医生并获得处方后购买。
              </p>
              <div className="flex flex-wrap justify-center gap-2 text-xs">
                <div className="flex items-center space-x-1 bg-white/20 px-2 py-1 rounded-full">
                  <Shield className="w-3 h-3" />
                  <span>专业可靠</span>
                </div>
                <div className="flex items-center space-x-1 bg-white/20 px-2 py-1 rounded-full">
                  <Shield className="w-3 h-3" />
                  <span>安全保障</span>
                </div>
                <div className="flex items-center space-x-1 bg-white/20 px-2 py-1 rounded-full">
                  <Shield className="w-3 h-3" />
                  <span>隐私保护</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
