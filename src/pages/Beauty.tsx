import { useState } from 'react';
import { Sparkles, Heart, AlertCircle, ChevronDown, ChevronUp, Shield, TrendingUp, BookOpen, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function Beauty() {
  const [expandedProject, setExpandedProject] = useState<string | null>(null);
  const [expandedService, setExpandedService] = useState<string | null>(null);
  const [expandedKnowledge, setExpandedKnowledge] = useState<string | null>(null);

  const toggleExpand = (id: string, category: 'project' | 'service' | 'knowledge') => {
    if (category === 'project') {
      setExpandedProject(expandedProject === id ? null : id);
    } else if (category === 'service') {
      setExpandedService(expandedService === id ? null : id);
    } else {
      setExpandedKnowledge(expandedKnowledge === id ? null : id);
    }
  };

  const projects = {
    plastic: [
      {
        id: 'eyelid',
        name: '双眼皮手术',
        types: '埋线 / 全切',
        price: '¥3000-15000',
        duration: '1-2小时',
        recovery: '7-30天',
        适用性: '单眼皮、内双、眼皮松弛者',
        手术流程: '1. 术前设计标记 2. 局部麻醉 3. 切开或埋线 4. 缝合固定 5. 术后包扎',
        恢复期: '埋线3-7天消肿,全切7-15天拆线,1-3个月完全恢复',
        风险评估: '可能出现:感染、疤痕增生、双眼不对称、效果不理想等',
      },
      {
        id: 'nose',
        name: '隆鼻手术',
        types: '假体 / 自体',
        price: '¥8000-50000',
        duration: '1-3小时',
        recovery: '7-90天',
        适用性: '鼻梁低平、鼻头肥大、鼻翼宽大者',
        手术流程: '1. 3D设计方案 2. 全麻或局麻 3. 切口植入假体/自体软骨 4. 塑形固定 5. 缝合',
        恢复期: '7天拆线,1个月基本消肿,3-6个月完全定型',
        风险评估: '假体移位、感染、排异反应、鼻部歪斜、呼吸困难等',
      },
      {
        id: 'liposuction',
        name: '吸脂塑形',
        types: '水动力 / 超声波',
        price: '¥5000-30000',
        duration: '1-3小时',
        recovery: '7-30天',
        适用性: '局部脂肪堆积、体重正常但身材不匀称者',
        手术流程: '1. 标记吸脂部位 2. 麻醉 3. 注入肿胀液 4. 负压吸脂 5. 塑形包扎',
        恢复期: '3-7天轻度活动,2-4周恢复正常,3个月看到最终效果',
        风险评估: '皮肤凹凸不平、血肿、感染、脂肪栓塞、皮肤松弛等',
      },
      {
        id: 'contour',
        name: '面部轮廓',
        types: '磨骨 / 填充',
        price: '¥20000-100000',
        duration: '2-4小时',
        recovery: '30-180天',
        适用性: '方脸、国字脸、颧骨高、下颌角肥大者',
        手术流程: '1. CT扫描设计 2. 全麻 3. 口内切口 4. 磨削或截骨 5. 固定缝合',
        恢复期: '1周流质饮食,2-4周消肿,3-6个月完全恢复',
        风险评估: '神经损伤、面部不对称、骨折、感染、大出血等',
      },
    ],
    injection: [
      {
        id: 'hyaluronic',
        name: '玻尿酸填充',
        parts: '苹果肌/泪沟/法令纹/唇部',
        price: '¥2000-8000/支',
        duration: '15-30分钟',
        维持时间: '6-18个月',
        适用部位: '面部凹陷、皱纹、唇部塑形、鼻部填充',
        效果维持: '大分子12-18个月,中分子8-12个月,小分子6-8个月',
        过敏风险: '极低,但需皮试。可能出现红肿、淤青、结节',
        术后护理: '24小时内避免化妆、按摩,一周内避免高温环境',
      },
      {
        id: 'botox',
        name: '肉毒素',
        parts: '除皱/瘦脸/瘦腿',
        price: '¥1500-5000/次',
        duration: '10-20分钟',
        维持时间: '4-6个月',
        适用部位: '抬头纹、鱼尾纹、咬肌肥大、小腿肌肉发达',
        效果维持: '3-7天起效,1个月达到最佳,维持4-6个月',
        过敏风险: '罕见。可能出现:局部无力、表情僵硬、眼睑下垂',
        术后护理: '4小时内保持直立,24小时避免按摩,一周避免剧烈运动',
      },
      {
        id: 'mesotherapy',
        name: '水光针',
        parts: '全脸补水',
        price: '¥1000-3000/次',
        duration: '20-30分钟',
        维持时间: '3-6个月',
        适用部位: '全脸、颈部、手部等需要补水美白的部位',
        效果维持: '建议3-4次为一疗程,每次间隔2-4周',
        过敏风险: '低。可能出现:红肿、针眼、轻微淤青',
        术后护理: '3天内避免化妆,一周内避免桑拿、游泳',
      },
      {
        id: 'lipolysis',
        name: '溶脂针',
        parts: '双下巴/腰腹',
        price: '¥2000-6000/次',
        duration: '15-30分钟',
        维持时间: '长期(脂肪细胞减少)',
        适用部位: '双下巴、腰腹、大腿等小面积脂肪堆积',
        效果维持: '3-5次为一疗程,每次间隔4-6周,效果可长期维持',
        过敏风险: '中等。可能出现:肿胀、疼痛、硬结、皮肤不平',
        术后护理: '一周内避免按摩,多喝水促进代谢,配合运动',
      },
    ],
    photoelectric: [
      {
        id: 'ipl',
        name: '光子嫩肤',
        price: '¥1000-3000/次',
        sessions: '3-5次',
        pain: '轻微刺痛',
        功效原理: '强脉冲光作用于皮肤,改善色斑、红血丝、毛孔粗大',
        疗程次数: '3-5次为一疗程,每次间隔3-4周',
        疼痛感: '轻微刺痛感,类似橡皮筋弹到皮肤',
        禁忌人群: '孕妇、光敏性皮肤、近期暴晒、服用光敏药物者',
      },
      {
        id: 'laser',
        name: '激光祛斑/脱毛',
        price: '¥500-5000/次',
        sessions: '3-8次',
        pain: '中度刺痛',
        功效原理: '激光选择性破坏黑色素或毛囊,达到祛斑脱毛效果',
        疗程次数: '祛斑3-5次,脱毛5-8次,间隔4-8周',
        疼痛感: '中度刺痛,可涂抹麻药缓解',
        禁忌人群: '瘢痕体质、皮肤感染、深色皮肤、孕妇',
      },
      {
        id: 'thermage',
        name: '热玛吉',
        price: '¥15000-30000/次',
        sessions: '1-2次',
        pain: '中度疼痛',
        功效原理: '射频能量加热真皮层,刺激胶原蛋白再生,紧致提拉',
        疗程次数: '单次即可见效,维持1-2年,可重复治疗',
        疼痛感: '中度疼痛,可调节能量降低疼痛',
        禁忌人群: '孕妇、心脏起搏器、金属植入物、严重皮肤病',
      },
      {
        id: 'ultherapy',
        name: '超声刀',
        price: '¥12000-25000/次',
        sessions: '1次',
        pain: '中度疼痛',
        功效原理: '超声波能量作用于筋膜层,提拉紧致,改善松弛',
        疗程次数: '单次治疗,2-3个月达到最佳效果,维持1-2年',
        疼痛感: '中度疼痛,骨骼部位较明显',
        禁忌人群: '孕妇、严重皮肤病、开放性伤口、金属植入物',
      },
    ],
    skincare: [
      {
        id: 'aha',
        name: '果酸焕肤',
        price: '¥500-2000/次',
        sessions: '4-6次',
        适应症: '痤疮、痘印、毛孔粗大、肤色暗沉',
        改善方案: '低浓度果酸剥脱角质,促进细胞更新,改善肤质',
        注意事项: '术后严格防晒,避免刺激性护肤品,可能出现脱皮',
      },
      {
        id: 'microneedle',
        name: '微针治疗',
        price: '¥800-3000/次',
        sessions: '3-5次',
        适应症: '痘坑、疤痕、毛孔粗大、皱纹',
        改善方案: '微针刺激皮肤,促进胶原蛋白生成,改善凹陷',
        注意事项: '术后3天避免化妆,一周避免剧烈运动,严格防晒',
      },
      {
        id: 'acne',
        name: '祛痘疗程',
        price: '¥1000-5000/疗程',
        sessions: '8-12次',
        适应症: '痤疮、粉刺、炎症性痘痘',
        改善方案: '清洁+消炎+修复,配合红蓝光、果酸等综合治疗',
        注意事项: '避免挤压痘痘,清淡饮食,规律作息,坚持治疗',
      },
    ],
  };

  const products = [
    {
      id: 'medical-mask',
      name: '医用冷敷贴',
      tag: '械字号',
      price: '¥128/盒',
      desc: '术后修复,舒缓镇静,医疗器械认证',
      category: '合规产品',
    },
    {
      id: 'acne-gel',
      name: '祛痘凝胶',
      tag: '妆字号',
      price: '¥89',
      desc: '消炎祛痘,淡化痘印,温和不刺激',
      category: '合规产品',
    },
    {
      id: 'astaxanthin',
      name: '虾青素精华',
      tag: '抗氧化',
      price: '¥299',
      desc: '适合干皮,抗氧化抗衰,改善细纹',
      category: '产品适配',
    },
    {
      id: 'sunscreen',
      name: '医用防晒霜',
      tag: 'SPF50+',
      price: '¥168',
      desc: '敏感肌适用,物理防晒,术后必备',
      category: '产品适配',
    },
    {
      id: 'egf-gel',
      name: '生长因子凝胶',
      tag: '术后修复',
      price: '¥399',
      desc: '光电术后修复,促进皮肤再生',
      category: '术后护理',
    },
    {
      id: 'silicone-gel',
      name: '硅酮凝胶',
      tag: '疤痕护理',
      price: '¥268',
      desc: '整形术后,淡化疤痕,软化增生',
      category: '术后护理',
    },
  ];

  const services = [
    {
      id: 'institution',
      icon: <Shield className="w-6 h-6 text-health-green" />,
      title: '机构与医生选择',
      desc: '如何选择正规医美机构和资质医生',
      content: [
        '查看机构资质:《医疗机构执业许可证》',
        '核查医生资质:执业医师证、美容主诊医师证',
        '了解医生擅长项目和成功案例',
        '查询机构投诉记录和用户评价',
        '避免选择无资质的工作室或美容院',
      ],
    },
    {
      id: 'risk',
      icon: <AlertCircle className="w-6 h-6 text-taobao-orange" />,
      title: '风险与维权',
      desc: '医美失败后的维权途径和修复建议',
      content: [
        '保留所有消费凭证、术前术后照片',
        '及时与机构沟通,要求修复或赔偿',
        '向卫生监督部门投诉举报',
        '寻求专业医疗鉴定机构鉴定',
        '必要时通过法律途径维权',
        '术后并发症及时就医,避免延误',
      ],
    },
    {
      id: 'finance',
      icon: <Heart className="w-6 h-6 text-health-green" />,
      title: '医美分期与保险',
      desc: '医美项目的支付方案和保险保障',
      content: [
        '分期付款:支持3/6/12期,利率0.5%-1.5%/月',
        '注意隐藏费用:手续费、服务费等',
        '医美保险:覆盖术后并发症、修复费用',
        '保险理赔:需在指定机构,保留完整病历',
        '理性消费:避免过度分期,量力而行',
      ],
    },
  ];

  const knowledge = [
    {
      id: 'thread-lift',
      icon: <BookOpen className="w-6 h-6 text-health-green" />,
      title: '线雕和拉皮的区别',
      category: '项目科普',
      content: [
        '线雕:微创,埋入可吸收线材,提拉皮肤,维持1-2年',
        '拉皮:手术,切除多余皮肤,效果显著,维持5-10年',
        '恢复期:线雕3-7天,拉皮2-4周',
        '适用人群:线雕适合轻中度松弛,拉皮适合重度松弛',
        '费用:线雕1-3万,拉皮5-15万',
      ],
    },
    {
      id: 'sculptra',
      icon: <Sparkles className="w-6 h-6 text-health-green" />,
      title: '童颜针的成分与效果',
      category: '项目科普',
      content: [
        '成分:聚左旋乳酸(PLLA),可被人体吸收',
        '原理:刺激胶原蛋白再生,改善面部凹陷',
        '效果:2-3个月逐渐显现,维持2年以上',
        '疗程:3-4次,每次间隔4-6周',
        '注意:需经验丰富医生操作,避免结节',
      ],
    },
    {
      id: 'trend',
      icon: <TrendingUp className="w-6 h-6 text-taobao-orange" />,
      title: '2025年医美流行趋势',
      category: '行业趋势',
      content: [
        '轮廓固定:通过线雕+填充,打造立体轮廓',
        '馒化修复:针对过度填充,恢复自然面部',
        '抗衰年轻化:热玛吉、超声刀等无创抗衰',
        '皮肤屏障修复:医美级护肤,改善敏感肌',
        '个性化定制:AI设计,精准匹配个人特征',
      ],
    },
    {
      id: 'trap',
      icon: <AlertCircle className="w-6 h-6 text-taobao-orange" />,
      title: '医美避坑指南',
      category: '避坑指南',
      content: [
        '低价体验针:可能使用假货、水货、过期产品',
        '免费体验:诱导消费,推销高价项目',
        '夸大宣传:承诺"永久""无风险"等不实宣传',
        '无资质机构:美容院、工作室违规开展医美项目',
        '识别方法:查资质、看评价、理性消费',
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-4">
        <div className="mb-4 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-health-green to-health-green-light rounded-xl mb-2 shadow-md">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-xl font-bold text-gray-900 mb-1">医疗美容</h1>
          <p className="text-xs text-gray-600">专业医美项目咨询、产品推荐与风险评估</p>
        </div>

        <div className="mb-3">
          <Link to="/chat">
            <Button className="w-full bg-health-green hover:bg-health-green-dark text-white shadow-md">
              <MessageCircle className="w-4 h-4 mr-2" />
              AI医美顾问 - 一对一专业咨询
            </Button>
          </Link>
        </div>

        <Tabs defaultValue="projects" className="mb-3">
          <TabsList className="grid w-full grid-cols-4 h-10">
            <TabsTrigger value="projects" className="text-xs">项目咨询</TabsTrigger>
            <TabsTrigger value="products" className="text-xs">产品推荐</TabsTrigger>
            <TabsTrigger value="services" className="text-xs">服务风险</TabsTrigger>
            <TabsTrigger value="knowledge" className="text-xs">科普趋势</TabsTrigger>
          </TabsList>

          <TabsContent value="projects" className="mt-3 space-y-3">
            <Card className="border-none shadow-md">
              <CardHeader className="p-3">
                <CardTitle className="text-sm flex items-center">
                  <Sparkles className="w-4 h-4 mr-2 text-health-green" />
                  整形项目
                </CardTitle>
                <CardDescription className="text-xs">双眼皮、隆鼻、吸脂、面部轮廓等手术项目</CardDescription>
              </CardHeader>
              <CardContent className="p-3 pt-0 space-y-2">
                {projects.plastic.map((project) => (
                  <Card key={project.id} className="border shadow-sm">
                    <CardContent className="p-3">
                      <div
                        className="flex items-center justify-between cursor-pointer"
                        onClick={() => toggleExpand(project.id, 'project')}
                      >
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h3 className="text-sm font-semibold text-gray-900">{project.name}</h3>
                            <span className="text-xs text-health-green font-medium">{project.price}</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-gray-600">
                            <span className="bg-green-100 text-health-green px-2 py-0.5 rounded-full">{project.types}</span>
                            <span>⏱ {project.duration}</span>
                            <span>🔄 {project.recovery}</span>
                          </div>
                        </div>
                        {expandedProject === project.id ? (
                          <ChevronUp className="w-5 h-5 text-gray-400 ml-2" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-gray-400 ml-2" />
                        )}
                      </div>
                      {expandedProject === project.id && (
                        <div className="mt-3 pt-3 border-t space-y-2 text-xs">
                          <div>
                            <span className="font-semibold text-gray-900">适用性:</span>
                            <p className="text-gray-700 mt-1">{project.适用性}</p>
                          </div>
                          <div>
                            <span className="font-semibold text-gray-900">手术流程:</span>
                            <p className="text-gray-700 mt-1">{project.手术流程}</p>
                          </div>
                          <div>
                            <span className="font-semibold text-gray-900">恢复期:</span>
                            <p className="text-gray-700 mt-1">{project.恢复期}</p>
                          </div>
                          <div>
                            <span className="font-semibold text-gray-900">风险评估:</span>
                            <p className="text-taobao-orange mt-1">{project.风险评估}</p>
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
                  <Heart className="w-4 h-4 mr-2 text-health-green" />
                  微创注射
                </CardTitle>
                <CardDescription className="text-xs">玻尿酸、肉毒素、水光针、溶脂针等注射项目</CardDescription>
              </CardHeader>
              <CardContent className="p-3 pt-0 space-y-2">
                {projects.injection.map((project) => (
                  <Card key={project.id} className="border shadow-sm">
                    <CardContent className="p-3">
                      <div
                        className="flex items-center justify-between cursor-pointer"
                        onClick={() => toggleExpand(project.id, 'project')}
                      >
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h3 className="text-sm font-semibold text-gray-900">{project.name}</h3>
                            <span className="text-xs text-health-green font-medium">{project.price}</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-gray-600">
                            <span className="bg-green-100 text-health-green px-2 py-0.5 rounded-full">{project.parts}</span>
                            <span>⏱ {project.duration}</span>
                            <span>🔄 {project.维持时间}</span>
                          </div>
                        </div>
                        {expandedProject === project.id ? (
                          <ChevronUp className="w-5 h-5 text-gray-400 ml-2" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-gray-400 ml-2" />
                        )}
                      </div>
                      {expandedProject === project.id && (
                        <div className="mt-3 pt-3 border-t space-y-2 text-xs">
                          <div>
                            <span className="font-semibold text-gray-900">适用部位:</span>
                            <p className="text-gray-700 mt-1">{project.适用部位}</p>
                          </div>
                          <div>
                            <span className="font-semibold text-gray-900">效果维持:</span>
                            <p className="text-gray-700 mt-1">{project.效果维持}</p>
                          </div>
                          <div>
                            <span className="font-semibold text-gray-900">过敏风险:</span>
                            <p className="text-taobao-orange mt-1">{project.过敏风险}</p>
                          </div>
                          <div>
                            <span className="font-semibold text-gray-900">术后护理:</span>
                            <p className="text-gray-700 mt-1">{project.术后护理}</p>
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
                  <Sparkles className="w-4 h-4 mr-2 text-health-green" />
                  光电类项目
                </CardTitle>
                <CardDescription className="text-xs">光子嫩肤、激光、热玛吉、超声刀等光电项目</CardDescription>
              </CardHeader>
              <CardContent className="p-3 pt-0 space-y-2">
                {projects.photoelectric.map((project) => (
                  <Card key={project.id} className="border shadow-sm">
                    <CardContent className="p-3">
                      <div
                        className="flex items-center justify-between cursor-pointer"
                        onClick={() => toggleExpand(project.id, 'project')}
                      >
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h3 className="text-sm font-semibold text-gray-900">{project.name}</h3>
                            <span className="text-xs text-health-green font-medium">{project.price}</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-gray-600">
                            <span className="bg-green-100 text-health-green px-2 py-0.5 rounded-full">{project.sessions}疗程</span>
                            <span>⚡ {project.pain}</span>
                          </div>
                        </div>
                        {expandedProject === project.id ? (
                          <ChevronUp className="w-5 h-5 text-gray-400 ml-2" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-gray-400 ml-2" />
                        )}
                      </div>
                      {expandedProject === project.id && (
                        <div className="mt-3 pt-3 border-t space-y-2 text-xs">
                          <div>
                            <span className="font-semibold text-gray-900">功效原理:</span>
                            <p className="text-gray-700 mt-1">{project.功效原理}</p>
                          </div>
                          <div>
                            <span className="font-semibold text-gray-900">疗程次数:</span>
                            <p className="text-gray-700 mt-1">{project.疗程次数}</p>
                          </div>
                          <div>
                            <span className="font-semibold text-gray-900">疼痛感:</span>
                            <p className="text-gray-700 mt-1">{project.疼痛感}</p>
                          </div>
                          <div>
                            <span className="font-semibold text-gray-900">禁忌人群:</span>
                            <p className="text-taobao-orange mt-1">{project.禁忌人群}</p>
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
                  <Heart className="w-4 h-4 mr-2 text-health-green" />
                  皮肤管理
                </CardTitle>
                <CardDescription className="text-xs">果酸焕肤、微针、祛痘疗程等皮肤管理项目</CardDescription>
              </CardHeader>
              <CardContent className="p-3 pt-0 space-y-2">
                {projects.skincare.map((project) => (
                  <Card key={project.id} className="border shadow-sm">
                    <CardContent className="p-3">
                      <div
                        className="flex items-center justify-between cursor-pointer"
                        onClick={() => toggleExpand(project.id, 'project')}
                      >
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h3 className="text-sm font-semibold text-gray-900">{project.name}</h3>
                            <span className="text-xs text-health-green font-medium">{project.price}</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-gray-600">
                            <span className="bg-green-100 text-health-green px-2 py-0.5 rounded-full">{project.sessions}疗程</span>
                            <span>🎯 {project.适应症}</span>
                          </div>
                        </div>
                        {expandedProject === project.id ? (
                          <ChevronUp className="w-5 h-5 text-gray-400 ml-2" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-gray-400 ml-2" />
                        )}
                      </div>
                      {expandedProject === project.id && (
                        <div className="mt-3 pt-3 border-t space-y-2 text-xs">
                          <div>
                            <span className="font-semibold text-gray-900">改善方案:</span>
                            <p className="text-gray-700 mt-1">{project.改善方案}</p>
                          </div>
                          <div>
                            <span className="font-semibold text-gray-900">注意事项:</span>
                            <p className="text-taobao-orange mt-1">{project.注意事项}</p>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="products" className="mt-3">
            <Card className="border-none shadow-md mb-3">
              <CardHeader className="p-3">
                <CardTitle className="text-sm">医美产品推荐</CardTitle>
                <CardDescription className="text-xs">合规认证产品,安全可靠</CardDescription>
              </CardHeader>
              <CardContent className="p-3 pt-0">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {products.map((product) => (
                    <Card key={product.id} className="border shadow-sm hover:shadow-md transition-all cursor-pointer">
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
                            <p className="text-xs text-gray-600 mt-1 line-clamp-2">{product.desc}</p>
                            <div className="flex items-center justify-between mt-2">
                              <p className="text-sm font-bold text-health-green">{product.price}</p>
                              <span className="text-xs text-gray-500">{product.category}</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Alert className="border-green-200 bg-green-50">
              <Shield className="h-4 w-4 text-health-green" />
              <AlertDescription className="text-green-800 text-xs">
                <strong>产品选购提示:</strong> 认准械字号/妆字号,选择正规渠道购买,避免假货水货。术后护理产品建议在医生指导下使用。
              </AlertDescription>
            </Alert>
          </TabsContent>

          <TabsContent value="services" className="mt-3 space-y-2">
            {services.map((service) => (
              <Card key={service.id} className="border-none shadow-md">
                <CardContent className="p-3">
                  <div
                    className="flex items-center justify-between cursor-pointer"
                    onClick={() => toggleExpand(service.id, 'service')}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-green-100 to-green-200 rounded-lg flex items-center justify-center">
                        {service.icon}
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-gray-900">{service.title}</h3>
                        <p className="text-xs text-gray-600 mt-0.5">{service.desc}</p>
                      </div>
                    </div>
                    {expandedService === service.id ? (
                      <ChevronUp className="w-5 h-5 text-gray-400" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    )}
                  </div>
                  {expandedService === service.id && (
                    <div className="mt-3 pt-3 border-t">
                      <ul className="space-y-2">
                        {service.content.map((item, index) => (
                          <li key={index} className="flex items-start text-xs text-gray-700">
                            <span className="inline-block w-1.5 h-1.5 bg-health-green rounded-full mt-1.5 mr-2 flex-shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="knowledge" className="mt-3 space-y-2">
            {knowledge.map((item) => (
              <Card key={item.id} className="border-none shadow-md">
                <CardContent className="p-3">
                  <div
                    className="flex items-center justify-between cursor-pointer"
                    onClick={() => toggleExpand(item.id, 'knowledge')}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-green-100 to-green-200 rounded-lg flex items-center justify-center">
                        {item.icon}
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-gray-900">{item.title}</h3>
                        <span className="text-xs bg-green-100 text-health-green px-2 py-0.5 rounded-full mt-1 inline-block">
                          {item.category}
                        </span>
                      </div>
                    </div>
                    {expandedKnowledge === item.id ? (
                      <ChevronUp className="w-5 h-5 text-gray-400" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    )}
                  </div>
                  {expandedKnowledge === item.id && (
                    <div className="mt-3 pt-3 border-t">
                      <ul className="space-y-2">
                        {item.content.map((line, index) => (
                          <li key={index} className="flex items-start text-xs text-gray-700">
                            <span className="inline-block w-1.5 h-1.5 bg-health-green rounded-full mt-1.5 mr-2 flex-shrink-0" />
                            <span>{line}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>

        <Alert className="border-orange-200 bg-orange-50">
          <AlertCircle className="h-4 w-4 text-taobao-orange" />
          <AlertDescription className="text-orange-800 text-xs">
            <strong>重要提示:</strong> 医美项目需选择正规机构和资质医生,充分了解风险。本页面信息仅供参考,具体方案请咨询专业医生。
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}
