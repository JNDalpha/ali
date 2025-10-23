import { Shield, AlertTriangle, Clock, Pill, Heart, Baby, Users, Sun } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function Guide() {
  const safetyTips = [
    {
      icon: <AlertTriangle className="w-6 h-6 text-red-600" />,
      title: '遵医嘱用药',
      description: '严格按照医生处方或药品说明书使用药物,不可随意增减剂量或更改用药时间。',
      color: 'from-red-500 to-orange-500',
    },
    {
      icon: <Clock className="w-6 h-6 text-blue-600" />,
      title: '注意用药时间',
      description: '按时服药,饭前、饭后、睡前等时间要求要严格遵守,以确保药效。',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: <Pill className="w-6 h-6 text-green-600" />,
      title: '避免药物相互作用',
      description: '同时服用多种药物时,要注意药物之间的相互作用,必要时咨询医生或药师。',
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: <Heart className="w-6 h-6 text-purple-600" />,
      title: '关注不良反应',
      description: '用药期间如出现不适,应及时停药并就医,不要忍耐或自行处理。',
      color: 'from-purple-500 to-pink-500',
    },
  ];

  const specialGroups = [
    {
      icon: <Baby className="w-8 h-8 text-blue-600" />,
      title: '儿童用药',
      tips: [
        '严格按照儿童剂量使用,不可用成人药物代替',
        '选择儿童专用剂型,如糖浆、颗粒等',
        '注意药物的适用年龄范围',
        '避免使用含有禁用成分的药物',
        '用药后密切观察反应',
      ],
    },
    {
      icon: <Users className="w-8 h-8 text-pink-600" />,
      title: '孕妇用药',
      tips: [
        '孕期用药需特别谨慎,必须在医生指导下使用',
        '避免使用孕妇禁用或慎用的药物',
        '优先选择对胎儿影响小的药物',
        '注意用药时间,孕早期尤其要小心',
        '如需用药,权衡利弊后再决定',
      ],
    },
    {
      icon: <Sun className="w-8 h-8 text-orange-600" />,
      title: '老年人用药',
      tips: [
        '从小剂量开始,逐渐调整到合适剂量',
        '注意肝肾功能,必要时调整用药',
        '避免同时使用过多药物',
        '定期复查,监测药物效果和副作用',
        '注意药物对认知功能的影响',
      ],
    },
  ];

  const commonMistakes = [
    {
      title: '随意停药',
      description: '症状缓解后就自行停药,可能导致疾病复发或产生耐药性。',
      solution: '按照疗程完成治疗,停药前咨询医生。',
    },
    {
      title: '超量服药',
      description: '认为多吃药好得快,擅自增加药量,可能导致药物中毒。',
      solution: '严格按照规定剂量服药,不可随意增减。',
    },
    {
      title: '用饮料送服',
      description: '用茶水、果汁等饮料送服药物,可能影响药效。',
      solution: '一般用温开水送服,特殊要求遵医嘱。',
    },
    {
      title: '保存不当',
      description: '药品存放环境不当,导致药物变质失效。',
      solution: '按照说明书要求存放,注意温度、湿度和光照。',
    },
    {
      title: '过期药物',
      description: '使用过期药物,可能无效甚至有害。',
      solution: '定期检查药品有效期,及时清理过期药物。',
    },
    {
      title: '凭经验用药',
      description: '根据以往经验自行用药,可能延误病情。',
      solution: '不同疾病症状可能相似,应就医确诊后用药。',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-600 to-red-600 rounded-2xl mb-4 shadow-lg">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">用药指南</h1>
          <p className="text-gray-600">安全用药,健康生活</p>
        </div>

        <Alert className="mb-8 border-orange-200 bg-gradient-to-r from-orange-50 to-red-50">
          <Shield className="h-5 w-5 text-orange-600" />
          <AlertDescription className="text-orange-900 text-base">
            <strong>重要提示:</strong> 本指南仅供参考,具体用药请遵医嘱。
            处方药必须凭医生处方购买和使用。
          </AlertDescription>
        </Alert>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {safetyTips.map((tip, index) => (
            <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-all duration-300">
              <div className={`h-2 bg-gradient-to-r ${tip.color}`} />
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <div className={`w-14 h-14 bg-gradient-to-br ${tip.color} rounded-2xl flex items-center justify-center shadow-lg`}>
                    {tip.icon}
                  </div>
                  <CardTitle className="text-xl">{tip.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base text-gray-700">
                  {tip.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="mb-8 border-none shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center">
              <Users className="w-7 h-7 mr-3 text-purple-600" />
              特殊人群用药
            </CardTitle>
            <CardDescription>不同人群用药需要特别注意</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="children" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="children">儿童用药</TabsTrigger>
                <TabsTrigger value="pregnant">孕妇用药</TabsTrigger>
                <TabsTrigger value="elderly">老年人用药</TabsTrigger>
              </TabsList>

              {specialGroups.map((group, index) => (
                <TabsContent
                  key={index}
                  value={index === 0 ? 'children' : index === 1 ? 'pregnant' : 'elderly'}
                  className="mt-6"
                >
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center">
                      {group.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">{group.title}</h3>
                  </div>
                  <div className="space-y-3">
                    {group.tips.map((tip, tipIndex) => (
                      <div
                        key={tipIndex}
                        className="flex items-start space-x-3 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-100"
                      >
                        <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold mt-0.5">
                          {tipIndex + 1}
                        </div>
                        <span className="text-gray-800">{tip}</span>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>

        <Card className="border-none shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center">
              <AlertTriangle className="w-7 h-7 mr-3 text-red-600" />
              常见用药误区
            </CardTitle>
            <CardDescription>避免这些错误,确保用药安全</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {commonMistakes.map((mistake, index) => (
                <div key={index} className="p-6 bg-gradient-to-br from-red-50 to-orange-50 rounded-xl border border-red-100">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">{mistake.title}</h3>
                  </div>
                  <p className="text-gray-700 mb-3">{mistake.description}</p>
                  <div className="flex items-start space-x-2 p-3 bg-white rounded-lg">
                    <Shield className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-green-800 mb-1">正确做法:</p>
                      <p className="text-sm text-gray-700">{mistake.solution}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
