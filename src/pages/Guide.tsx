import { Shield, AlertTriangle, Clock, Pill, Heart, Baby, Users, Sun } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function Guide() {
  const safetyTips = [
    {
      icon: <AlertTriangle className="w-5 h-5 text-white" />,
      title: '遵医嘱用药',
      description: '严格按照医生处方或药品说明书使用药物,不可随意增减剂量或更改用药时间。',
      color: 'from-taobao-orange to-taobao-orange-light',
    },
    {
      icon: <Clock className="w-5 h-5 text-white" />,
      title: '注意用药时间',
      description: '按时服药,饭前、饭后、睡前等时间要求要严格遵守,以确保药效。',
      color: 'from-health-green to-health-green-light',
    },
    {
      icon: <Pill className="w-5 h-5 text-white" />,
      title: '避免药物相互作用',
      description: '同时服用多种药物时,要注意药物之间的相互作用,必要时咨询医生或药师。',
      color: 'from-taobao-orange to-taobao-orange-light',
    },
    {
      icon: <Heart className="w-5 h-5 text-white" />,
      title: '关注不良反应',
      description: '用药期间如出现不适,应及时停药并就医,不要忍耐或自行处理。',
      color: 'from-health-green to-health-green-light',
    },
  ];

  const specialGroups = [
    {
      icon: <Baby className="w-6 h-6 text-white" />,
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
      icon: <Users className="w-6 h-6 text-white" />,
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
      icon: <Sun className="w-6 h-6 text-white" />,
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
      title: '混合用药',
      description: '同时服用多种相似功效的药物,增加不良反应风险。',
      solution: '咨询医生或药师,避免重复用药。',
    },
    {
      title: '用饮料送服',
      description: '用茶水、果汁等送服药物,可能影响药效。',
      solution: '使用温开水送服药物,避免使用其他饮料。',
    },
  ];

  const storageGuidelines = [
    {
      title: '避光保存',
      description: '许多药物对光敏感,应存放在避光处或使用深色容器。',
    },
    {
      title: '防潮防热',
      description: '药物应存放在干燥、阴凉处,避免高温和潮湿环境。',
    },
    {
      title: '分类存放',
      description: '内服药和外用药分开存放,避免误用。',
    },
    {
      title: '定期检查',
      description: '定期检查药品有效期,及时清理过期药品。',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-4">
        <div className="mb-4 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-taobao-orange to-taobao-orange-light rounded-xl mb-2 shadow-md">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-xl font-bold text-gray-900 mb-1">用药指南</h1>
          <p className="text-xs text-gray-600">安全用药知识,保障健康生活</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-3">
          {safetyTips.map((tip, index) => (
            <Card key={index} className="border-none shadow-md hover:shadow-lg transition-all duration-300">
              <div className={`h-1 bg-gradient-to-r ${tip.color}`} />
              <CardHeader className="p-3">
                <div className="flex items-center space-x-2">
                  <div className={`w-8 h-8 bg-gradient-to-br ${tip.color} rounded-lg flex items-center justify-center shadow-sm`}>
                    {tip.icon}
                  </div>
                  <CardTitle className="text-sm">{tip.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-3 pt-0">
                <CardDescription className="text-xs leading-relaxed">
                  {tip.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="mb-3 border-none shadow-lg">
          <CardHeader className="p-3">
            <CardTitle className="text-base flex items-center">
              <Users className="w-5 h-5 mr-2 text-taobao-orange" />
              特殊人群用药
            </CardTitle>
          </CardHeader>
          <CardContent className="p-3 pt-0">
            <Tabs defaultValue="children" className="w-full">
              <TabsList className="grid w-full grid-cols-3 h-8">
                <TabsTrigger value="children" className="text-xs">儿童</TabsTrigger>
                <TabsTrigger value="pregnant" className="text-xs">孕妇</TabsTrigger>
                <TabsTrigger value="elderly" className="text-xs">老年人</TabsTrigger>
              </TabsList>

              {specialGroups.map((group, index) => (
                <TabsContent
                  key={index}
                  value={index === 0 ? 'children' : index === 1 ? 'pregnant' : 'elderly'}
                  className="mt-3"
                >
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="w-10 h-10 bg-gradient-to-br from-taobao-orange to-taobao-orange-light rounded-lg flex items-center justify-center">
                        {group.icon}
                      </div>
                      <h3 className="text-sm font-semibold text-gray-900">{group.title}</h3>
                    </div>
                    <ul className="space-y-1.5">
                      {group.tips.map((tip, tipIndex) => (
                        <li key={tipIndex} className="flex items-start">
                          <span className="inline-block w-1.5 h-1.5 bg-health-green rounded-full mt-1.5 mr-2 flex-shrink-0" />
                          <span className="text-xs text-gray-700">{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>

        <Card className="mb-3 border-none shadow-lg">
          <CardHeader className="p-3">
            <CardTitle className="text-base flex items-center">
              <AlertTriangle className="w-5 h-5 mr-2 text-taobao-orange" />
              常见用药误区
            </CardTitle>
          </CardHeader>
          <CardContent className="p-3 pt-0">
            <div className="space-y-2">
              {commonMistakes.map((mistake, index) => (
                <div key={index} className="p-2 bg-orange-50 rounded-lg border border-orange-100">
                  <h4 className="text-sm font-semibold text-taobao-orange mb-1">{mistake.title}</h4>
                  <p className="text-xs text-gray-700 mb-1">{mistake.description}</p>
                  <p className="text-xs text-health-green font-medium">✓ {mistake.solution}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="mb-3 border-none shadow-lg">
          <CardHeader className="p-3">
            <CardTitle className="text-base flex items-center">
              <Shield className="w-5 h-5 mr-2 text-health-green" />
              药品存储指南
            </CardTitle>
          </CardHeader>
          <CardContent className="p-3 pt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {storageGuidelines.map((guideline, index) => (
                <div key={index} className="p-2 bg-green-50 rounded-lg border border-green-100">
                  <h4 className="text-sm font-semibold text-health-green mb-1">{guideline.title}</h4>
                  <p className="text-xs text-gray-700">{guideline.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Alert className="border-orange-200 bg-orange-50">
          <Shield className="h-4 w-4 text-taobao-orange" />
          <AlertDescription className="text-orange-800 text-xs">
            <strong>重要提示:</strong> 以上信息仅供参考,具体用药请遵医嘱。如有疑问,请咨询专业医生或药师。
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}
