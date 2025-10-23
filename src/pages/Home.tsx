import { Link } from 'react-router-dom';
import { MessageCircle, Search, BookOpen, Shield, Pill, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function Home() {
  const features = [
    {
      icon: <MessageCircle className="w-8 h-8 text-blue-600" />,
      title: 'AI智能问答',
      description: '基于先进AI技术,理解您的症状描述,提供专业的健康咨询',
      link: '/chat',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: <Search className="w-8 h-8 text-green-600" />,
      title: '药品检索',
      description: '快速搜索药品信息,了解药品功效、用法用量和注意事项',
      link: '/search',
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: <BookOpen className="w-8 h-8 text-purple-600" />,
      title: '疾病科普',
      description: '提供常见疾病的详细介绍、预防措施和治疗建议',
      link: '/diseases',
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: <Shield className="w-8 h-8 text-orange-600" />,
      title: '用药指南',
      description: '安全用药知识,帮助您正确使用药物,避免用药风险',
      link: '/guide',
      color: 'from-orange-500 to-red-500',
    },
  ];

  const stats = [
    { label: '服务用户', value: '100万+', icon: <TrendingUp className="w-5 h-5" /> },
    { label: '药品数据', value: '50000+', icon: <Pill className="w-5 h-5" /> },
    { label: '疾病科普', value: '1000+', icon: <BookOpen className="w-5 h-5" /> },
    { label: '满意度', value: '98%', icon: <Shield className="w-5 h-5" /> },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl mb-6 shadow-xl">
            <Pill className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            AI药师助手
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            您的智能健康顾问,提供专业的用药指导和健康咨询服务
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link to="/chat">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-6 text-lg rounded-xl shadow-lg">
                <MessageCircle className="w-5 h-5 mr-2" />
                开始咨询
              </Button>
            </Link>
            <Link to="/search">
              <Button size="lg" variant="outline" className="px-8 py-6 text-lg rounded-xl border-2 hover:bg-gray-50">
                <Search className="w-5 h-5 mr-2" />
                搜索药品
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl flex items-center justify-center text-blue-600">
                    {stat.icon}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {features.map((feature, index) => (
            <Link key={index} to={feature.link}>
              <Card className="h-full border-none shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 cursor-pointer overflow-hidden group">
                <div className={`h-2 bg-gradient-to-r ${feature.color}`} />
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                      {feature.icon}
                    </div>
                    <div>
                      <CardTitle className="text-2xl">{feature.title}</CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base text-gray-600">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <Card className="border-none shadow-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <CardContent className="py-12">
            <div className="text-center max-w-3xl mx-auto">
              <Shield className="w-16 h-16 mx-auto mb-6" />
              <h2 className="text-3xl font-bold mb-4">安全用药提醒</h2>
              <p className="text-lg mb-6 text-blue-50">
                本应用提供的信息仅供参考,不能替代专业医生的诊断和治疗。
                对于需要处方药治疗的病症,请务必咨询专业医生并获得医生处方后购买。
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm">
                <div className="flex items-center space-x-2 bg-white/20 px-4 py-2 rounded-full">
                  <Shield className="w-4 h-4" />
                  <span>专业可靠</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/20 px-4 py-2 rounded-full">
                  <Shield className="w-4 h-4" />
                  <span>安全保障</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/20 px-4 py-2 rounded-full">
                  <Shield className="w-4 h-4" />
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
