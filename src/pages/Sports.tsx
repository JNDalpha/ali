import { useState } from 'react';
import { Dumbbell, Heart, Activity, TrendingUp, ShoppingCart, MessageCircle, ChevronDown, ChevronUp, Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function Sports() {
  const [expandedAction, setExpandedAction] = useState<string | null>(null);
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bmi, setBmi] = useState<number | null>(null);

  const calculateBMI = () => {
    const h = parseFloat(height) / 100;
    const w = parseFloat(weight);
    if (h > 0 && w > 0) {
      setBmi(parseFloat((w / (h * h)).toFixed(1)));
    }
  };

  const getBMIStatus = (bmi: number) => {
    if (bmi < 18.5) return { text: '偏瘦', color: 'text-blue-600', goal: '增肌' };
    if (bmi < 24) return { text: '正常', color: 'text-health-green', goal: '保持' };
    if (bmi < 28) return { text: '偏胖', color: 'text-taobao-orange', goal: '减脂' };
    return { text: '肥胖', color: 'text-red-600', goal: '减脂' };
  };

  const plans = [
    {
      id: 'fat-loss',
      name: '4周居家减脂计划',
      goal: '减脂',
      duration: '4周',
      time: '30分钟/天',
      level: '入门',
      desc: '有氧+轻度力量,适合减脂新手',
      details: [
        '第1-2周:每天20分钟有氧(开合跳、高抬腿)+10分钟核心训练',
        '第3-4周:每天25分钟有氧+15分钟全身力量训练',
        '配合饮食:控制碳水,增加蛋白质摄入',
        '预期效果:4周减重3-5kg,体脂率下降2-3%',
      ],
    },
    {
      id: 'muscle-gain',
      name: '6周分化增肌计划',
      goal: '增肌',
      duration: '6周',
      time: '60分钟/天',
      level: '进阶',
      desc: '胸背腿分化训练,适合有基础者',
      details: [
        '周一:胸部+三头(卧推、飞鸟、臂屈伸)',
        '周三:背部+二头(引体、划船、弯举)',
        '周五:腿部+肩部(深蹲、硬拉、推举)',
        '每组8-12次,4-5组,组间休息60-90秒',
        '配合饮食:高蛋白高碳水,增加热量摄入',
      ],
    },
    {
      id: 'shape',
      name: '8周塑形计划',
      goal: '塑形',
      duration: '8周',
      time: '45分钟/天',
      level: '中级',
      desc: '全身塑形,打造完美曲线',
      details: [
        '有氧+力量结合,每周5次训练',
        '重点训练:臀腿(深蹲、臀桥)、腰腹(卷腹、平板)',
        '配合拉伸和筋膜放松,避免肌肉僵硬',
        '预期效果:身材更紧致,线条更明显',
      ],
    },
  ];

  const actions = {
    upper: [
      {
        id: 'push-up',
        name: '俯卧撑',
        part: '胸部+三头',
        level: '入门',
        reps: '10-15次×3组',
        要点: '身体保持一条直线,下降时胸部接近地面',
        易错: '塌腰、撅屁股、手肘外展过大',
        器材: '无需器材,可用瑜伽垫',
      },
      {
        id: 'pull-up',
        name: '引体向上',
        part: '背部+二头',
        level: '进阶',
        reps: '5-10次×3组',
        要点: '肩胛骨下沉,背部发力,下巴过杠',
        易错: '借助摆动、耸肩、手臂代偿',
        器材: '引体向上器、弹力带辅助',
      },
    ],
    lower: [
      {
        id: 'squat',
        name: '深蹲',
        part: '臀腿',
        level: '入门',
        reps: '15-20次×4组',
        要点: '膝盖与脚尖同向,臀部向后坐,大腿平行地面',
        易错: '膝盖内扣、重心前倾、腰部过度弯曲',
        器材: '徒手或哑铃',
      },
      {
        id: 'glute-bridge',
        name: '臀桥',
        part: '臀部',
        level: '入门',
        reps: '20次×3组',
        要点: '臀部发力,顶峰收缩2秒,肩膀支撑',
        易错: '腰部代偿、膝盖外展、臀部未收紧',
        器材: '瑜伽垫、弹力带',
      },
    ],
    core: [
      {
        id: 'plank',
        name: '平板支撑',
        part: '核心',
        level: '入门',
        reps: '30-60秒×3组',
        要点: '身体一条直线,核心收紧,自然呼吸',
        易错: '塌腰、撅屁股、憋气',
        器材: '瑜伽垫',
      },
      {
        id: 'crunch',
        name: '卷腹',
        part: '腹部',
        level: '入门',
        reps: '15-20次×3组',
        要点: '腹部发力,肩胛骨离地,下背贴地',
        易错: '颈部发力、手臂拉头、动作幅度过大',
        器材: '瑜伽垫',
      },
    ],
  };

  const equipment = [
    {
      name: '可调节哑铃',
      price: '¥299',
      scene: '居家力量训练',
      desc: '5-25kg可调,节省空间',
      tag: '热销',
    },
    {
      name: '折叠跑步机',
      price: '¥1299',
      scene: '居家有氧',
      desc: '静音减震,可折叠收纳',
      tag: '推荐',
    },
    {
      name: '瑜伽垫加厚',
      price: '¥89',
      scene: '居家训练必备',
      desc: '10mm加厚,防滑耐用',
      tag: '必备',
    },
    {
      name: '弹力带套装',
      price: '¥59',
      scene: '阻力训练',
      desc: '5种阻力,适合各阶段',
      tag: '实用',
    },
    {
      name: '筋膜枪',
      price: '¥399',
      scene: '运动恢复',
      desc: '深层按摩,缓解酸痛',
      tag: '恢复',
    },
    {
      name: 'GPS运动手表',
      price: '¥899',
      scene: '户外跑步',
      desc: '心率监测,轨迹记录',
      tag: '专业',
    },
  ];

  const challenges = [
    {
      id: 'abs-30',
      name: '30天马甲线挑战',
      participants: '12.5万人',
      desc: '每天10分钟腹部训练,打造马甲线',
    },
    {
      id: 'run-100',
      name: '100公里跑步挑战',
      participants: '8.3万人',
      desc: '30天累计跑步100公里,提升心肺',
    },
    {
      id: 'stretch-7',
      name: '7天拉伸计划',
      participants: '15.2万人',
      desc: '改善身体柔韧性,缓解久坐疲劳',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-4">
        <div className="mb-4 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-taobao-orange to-taobao-orange-light rounded-xl mb-2 shadow-md">
            <Dumbbell className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-xl font-bold text-gray-900 mb-1">运动健康</h1>
          <p className="text-xs text-gray-600">AI个性化运动方案 + 智能商品推荐</p>
        </div>

        <div className="mb-3">
          <Link to="/chat">
            <Button className="w-full bg-taobao-orange hover:bg-taobao-orange-dark text-white shadow-md">
              <MessageCircle className="w-4 h-4 mr-2" />
              AI运动顾问 - 一对一专业指导
            </Button>
          </Link>
        </div>

        <Tabs defaultValue="check" className="mb-3">
          <TabsList className="grid w-full grid-cols-4 h-10">
            <TabsTrigger value="check" className="text-xs">健康检查</TabsTrigger>
            <TabsTrigger value="plans" className="text-xs">运动方案</TabsTrigger>
            <TabsTrigger value="actions" className="text-xs">动作库</TabsTrigger>
            <TabsTrigger value="shop" className="text-xs">装备推荐</TabsTrigger>
          </TabsList>

          <TabsContent value="check" className="mt-3 space-y-3">
            <Card className="border-none shadow-md">
              <CardHeader className="p-3">
                <CardTitle className="text-sm flex items-center">
                  <Activity className="w-4 h-4 mr-2 text-taobao-orange" />
                  身体数据评估
                </CardTitle>
                <CardDescription className="text-xs">输入基础数据,AI生成健康报告</CardDescription>
              </CardHeader>
              <CardContent className="p-3 pt-0 space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-xs text-gray-600 mb-1 block">身高(cm)</label>
                    <Input
                      type="number"
                      placeholder="170"
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                      className="h-9 text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-600 mb-1 block">体重(kg)</label>
                    <Input
                      type="number"
                      placeholder="65"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                      className="h-9 text-sm"
                    />
                  </div>
                </div>
                <Button
                  onClick={calculateBMI}
                  className="w-full bg-taobao-orange hover:bg-taobao-orange-dark text-white h-9 text-sm"
                >
                  生成健康报告
                </Button>

                {bmi !== null && (
                  <div className="mt-3 p-3 bg-orange-50 rounded-lg border border-orange-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold text-gray-900">BMI指数</span>
                      <span className={`text-2xl font-bold ${getBMIStatus(bmi).color}`}>{bmi}</span>
                    </div>
                    <div className="space-y-2 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">身体状态:</span>
                        <span className={`font-semibold ${getBMIStatus(bmi).color}`}>
                          {getBMIStatus(bmi).text}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">建议目标:</span>
                        <span className="font-semibold text-taobao-orange">{getBMIStatus(bmi).goal}</span>
                      </div>
                      <div className="mt-2 pt-2 border-t border-orange-200">
                        <p className="text-gray-700">
                          💡 <strong>AI建议:</strong> 根据您的身体状况,推荐查看
                          <span className="text-taobao-orange font-semibold"> {getBMIStatus(bmi).goal}方案</span>
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="border-none shadow-md">
              <CardHeader className="p-3">
                <CardTitle className="text-sm flex items-center">
                  <Heart className="w-4 h-4 mr-2 text-taobao-orange" />
                  运动能力评估
                </CardTitle>
              </CardHeader>
              <CardContent className="p-3 pt-0 space-y-2">
                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <span className="text-gray-700">是否有运动习惯?</span>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="h-7 px-3 text-xs">是</Button>
                      <Button size="sm" variant="outline" className="h-7 px-3 text-xs">否</Button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <span className="text-gray-700">是否有运动损伤?</span>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="h-7 px-3 text-xs">有</Button>
                      <Button size="sm" variant="outline" className="h-7 px-3 text-xs">无</Button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <span className="text-gray-700">是否有关节问题?</span>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="h-7 px-3 text-xs">有</Button>
                      <Button size="sm" variant="outline" className="h-7 px-3 text-xs">无</Button>
                    </div>
                  </div>
                </div>
                <Alert className="border-orange-200 bg-orange-50 mt-3">
                  <Activity className="h-4 w-4 text-taobao-orange" />
                  <AlertDescription className="text-orange-800 text-xs">
                    <strong>风险提示:</strong> 如有关节问题,建议避免深蹲跳、跑步等高冲击动作,选择游泳、椭圆机等低冲击运动。
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="plans" className="mt-3 space-y-2">
            {plans.map((plan) => (
              <Card key={plan.id} className="border-none shadow-md">
                <CardContent className="p-3">
                  <div
                    className="flex items-center justify-between cursor-pointer"
                    onClick={() => setExpandedAction(expandedAction === plan.id ? null : plan.id)}
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-sm font-semibold text-gray-900">{plan.name}</h3>
                        <span className="text-xs bg-orange-100 text-taobao-orange px-2 py-0.5 rounded-full">
                          {plan.level}
                        </span>
                      </div>
                      <p className="text-xs text-gray-600 mb-2">{plan.desc}</p>
                      <div className="flex items-center gap-3 text-xs text-gray-600">
                        <span>🎯 {plan.goal}</span>
                        <span>⏱ {plan.time}</span>
                        <span>📅 {plan.duration}</span>
                      </div>
                    </div>
                    {expandedAction === plan.id ? (
                      <ChevronUp className="w-5 h-5 text-gray-400 ml-2" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400 ml-2" />
                    )}
                  </div>
                  {expandedAction === plan.id && (
                    <div className="mt-3 pt-3 border-t space-y-2">
                      <p className="text-xs font-semibold text-gray-900 mb-2">训练详情:</p>
                      <ul className="space-y-1.5">
                        {plan.details.map((detail, index) => (
                          <li key={index} className="flex items-start text-xs text-gray-700">
                            <span className="inline-block w-1.5 h-1.5 bg-taobao-orange rounded-full mt-1.5 mr-2 flex-shrink-0" />
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                      <Button className="w-full mt-3 bg-taobao-orange hover:bg-taobao-orange-dark text-white h-9 text-sm">
                        开始训练
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}

            <Card className="border-none shadow-md bg-gradient-to-r from-taobao-orange to-taobao-orange-light text-white">
              <CardContent className="p-3">
                <div className="flex items-center space-x-3">
                  <TrendingUp className="w-8 h-8" />
                  <div>
                    <p className="text-sm font-semibold">热门挑战</p>
                    <p className="text-xs text-white/90 mt-0.5">加入社区,与好友一起运动</p>
                  </div>
                </div>
                <div className="mt-3 space-y-2">
                  {challenges.map((challenge) => (
                    <div key={challenge.id} className="bg-white/20 rounded-lg p-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-semibold">{challenge.name}</p>
                          <p className="text-xs text-white/90 mt-0.5">{challenge.desc}</p>
                        </div>
                        <Button size="sm" variant="outline" className="h-7 px-3 text-xs border-white text-white hover:bg-white/20">
                          加入
                        </Button>
                      </div>
                      <p className="text-xs text-white/80 mt-1">👥 {challenge.participants}参与</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="actions" className="mt-3 space-y-3">
            <Card className="border-none shadow-md">
              <CardHeader className="p-3">
                <CardTitle className="text-sm flex items-center">
                  <Dumbbell className="w-4 h-4 mr-2 text-taobao-orange" />
                  上肢训练
                </CardTitle>
              </CardHeader>
              <CardContent className="p-3 pt-0 space-y-2">
                {actions.upper.map((action) => (
                  <Card key={action.id} className="border shadow-sm">
                    <CardContent className="p-3">
                      <div
                        className="flex items-center justify-between cursor-pointer"
                        onClick={() => setExpandedAction(expandedAction === action.id ? null : action.id)}
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-sm font-semibold text-gray-900">{action.name}</h3>
                            <span className="text-xs bg-orange-100 text-taobao-orange px-2 py-0.5 rounded-full">
                              {action.level}
                            </span>
                          </div>
                          <div className="flex items-center gap-3 text-xs text-gray-600">
                            <span>💪 {action.part}</span>
                            <span>🔢 {action.reps}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Play className="w-5 h-5 text-taobao-orange" />
                          {expandedAction === action.id ? (
                            <ChevronUp className="w-5 h-5 text-gray-400" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-gray-400" />
                          )}
                        </div>
                      </div>
                      {expandedAction === action.id && (
                        <div className="mt-3 pt-3 border-t space-y-2 text-xs">
                          <div>
                            <span className="font-semibold text-gray-900">动作要点:</span>
                            <p className="text-gray-700 mt-1">{action.要点}</p>
                          </div>
                          <div>
                            <span className="font-semibold text-gray-900">常见错误:</span>
                            <p className="text-taobao-orange mt-1">{action.易错}</p>
                          </div>
                          <div>
                            <span className="font-semibold text-gray-900">推荐器材:</span>
                            <p className="text-gray-700 mt-1">{action.器材}</p>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>

            <Card className="border-none shadow-md">
              <CardHeader className="p-3">
                <CardTitle className="text-sm flex items-center">
                  <Activity className="w-4 h-4 mr-2 text-taobao-orange" />
                  下肢训练
                </CardTitle>
              </CardHeader>
              <CardContent className="p-3 pt-0 space-y-2">
                {actions.lower.map((action) => (
                  <Card key={action.id} className="border shadow-sm">
                    <CardContent className="p-3">
                      <div
                        className="flex items-center justify-between cursor-pointer"
                        onClick={() => setExpandedAction(expandedAction === action.id ? null : action.id)}
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-sm font-semibold text-gray-900">{action.name}</h3>
                            <span className="text-xs bg-orange-100 text-taobao-orange px-2 py-0.5 rounded-full">
                              {action.level}
                            </span>
                          </div>
                          <div className="flex items-center gap-3 text-xs text-gray-600">
                            <span>💪 {action.part}</span>
                            <span>🔢 {action.reps}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Play className="w-5 h-5 text-taobao-orange" />
                          {expandedAction === action.id ? (
                            <ChevronUp className="w-5 h-5 text-gray-400" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-gray-400" />
                          )}
                        </div>
                      </div>
                      {expandedAction === action.id && (
                        <div className="mt-3 pt-3 border-t space-y-2 text-xs">
                          <div>
                            <span className="font-semibold text-gray-900">动作要点:</span>
                            <p className="text-gray-700 mt-1">{action.要点}</p>
                          </div>
                          <div>
                            <span className="font-semibold text-gray-900">常见错误:</span>
                            <p className="text-taobao-orange mt-1">{action.易错}</p>
                          </div>
                          <div>
                            <span className="font-semibold text-gray-900">推荐器材:</span>
                            <p className="text-gray-700 mt-1">{action.器材}</p>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>

            <Card className="border-none shadow-md">
              <CardHeader className="p-3">
                <CardTitle className="text-sm flex items-center">
                  <Heart className="w-4 h-4 mr-2 text-taobao-orange" />
                  核心训练
                </CardTitle>
              </CardHeader>
              <CardContent className="p-3 pt-0 space-y-2">
                {actions.core.map((action) => (
                  <Card key={action.id} className="border shadow-sm">
                    <CardContent className="p-3">
                      <div
                        className="flex items-center justify-between cursor-pointer"
                        onClick={() => setExpandedAction(expandedAction === action.id ? null : action.id)}
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-sm font-semibold text-gray-900">{action.name}</h3>
                            <span className="text-xs bg-orange-100 text-taobao-orange px-2 py-0.5 rounded-full">
                              {action.level}
                            </span>
                          </div>
                          <div className="flex items-center gap-3 text-xs text-gray-600">
                            <span>💪 {action.part}</span>
                            <span>🔢 {action.reps}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Play className="w-5 h-5 text-taobao-orange" />
                          {expandedAction === action.id ? (
                            <ChevronUp className="w-5 h-5 text-gray-400" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-gray-400" />
                          )}
                        </div>
                      </div>
                      {expandedAction === action.id && (
                        <div className="mt-3 pt-3 border-t space-y-2 text-xs">
                          <div>
                            <span className="font-semibold text-gray-900">动作要点:</span>
                            <p className="text-gray-700 mt-1">{action.要点}</p>
                          </div>
                          <div>
                            <span className="font-semibold text-gray-900">常见错误:</span>
                            <p className="text-taobao-orange mt-1">{action.易错}</p>
                          </div>
                          <div>
                            <span className="font-semibold text-gray-900">推荐器材:</span>
                            <p className="text-gray-700 mt-1">{action.器材}</p>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="shop" className="mt-3">
            <Card className="border-none shadow-md mb-3">
              <CardHeader className="p-3">
                <CardTitle className="text-sm flex items-center">
                  <ShoppingCart className="w-4 h-4 mr-2 text-taobao-orange" />
                  运动装备推荐
                </CardTitle>
                <CardDescription className="text-xs">场景化智能推荐,一键购买</CardDescription>
              </CardHeader>
              <CardContent className="p-3 pt-0">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {equipment.map((item, index) => (
                    <Card key={index} className="border shadow-sm hover:shadow-md transition-all cursor-pointer">
                      <CardContent className="p-3">
                        <div className="flex flex-col space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-xs bg-orange-100 text-taobao-orange px-2 py-0.5 rounded-full font-medium">
                              {item.tag}
                            </span>
                            <ShoppingCart className="w-4 h-4 text-gray-400" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-gray-900">{item.name}</p>
                            <p className="text-xs text-gray-600 mt-1">{item.scene}</p>
                            <p className="text-xs text-gray-500 mt-1 line-clamp-2">{item.desc}</p>
                            <p className="text-sm font-bold text-taobao-orange mt-2">{item.price}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Alert className="border-orange-200 bg-orange-50">
              <ShoppingCart className="h-4 w-4 text-taobao-orange" />
              <AlertDescription className="text-orange-800 text-xs">
                <strong>购物提示:</strong> 根据您的训练方案智能推荐装备,支持一键加入购物车,享受组合优惠。
              </AlertDescription>
            </Alert>
          </TabsContent>
        </Tabs>

        <Alert className="border-orange-200 bg-orange-50">
          <Activity className="h-4 w-4 text-taobao-orange" />
          <AlertDescription className="text-orange-800 text-xs">
            <strong>温馨提示:</strong> 运动前请做好热身,运动中注意安全,如有不适请立即停止。建议咨询专业教练指导。
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}
