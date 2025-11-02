import { useState } from 'react';
import { BookOpen, Search, AlertCircle, Activity, Shield, Pill } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { diseases, diseaseCategories } from '@/data/diseases';

export default function Diseases() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('全部');
  const [selectedDisease, setSelectedDisease] = useState<string | null>(null);

  const filteredDiseases = diseases.filter((disease) => {
    const matchesSearch =
      disease.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      disease.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === '全部' || disease.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const selectedDiseaseData = diseases.find((d) => d.id === selectedDisease);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-4">
        <div className="mb-4 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-health-green to-health-green-light rounded-xl mb-2 shadow-md">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-xl font-bold text-gray-900 mb-1">疾病科普</h1>
          <p className="text-xs text-gray-600">了解常见疾病,做好预防和治疗</p>
        </div>

        <Card className="mb-3 border-none shadow-lg">
          <CardContent className="p-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="搜索疾病名称..."
                className="pl-10 h-10 text-sm rounded-lg border-2 focus:border-taobao-orange"
              />
            </div>

            <div className="mt-3 flex flex-wrap gap-1.5">
              {diseaseCategories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={
                    selectedCategory === category
                      ? 'bg-taobao-orange hover:bg-taobao-orange-dark text-white h-7 px-2 text-xs'
                      : 'hover:bg-orange-50 hover:border-taobao-orange h-7 px-2 text-xs'
                  }
                >
                  {category}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {selectedDiseaseData ? (
          <div>
            <Button
              variant="outline"
              onClick={() => setSelectedDisease(null)}
              className="mb-3 hover:bg-orange-50 text-sm h-8"
              size="sm"
            >
              ← 返回列表
            </Button>

            <Card className="border-none shadow-lg">
              <CardHeader className="p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg mb-1">{selectedDiseaseData.name}</CardTitle>
                    <CardDescription className="text-xs">
                      <span className="inline-flex items-center px-2 py-0.5 bg-green-100 text-health-green rounded-full text-xs font-medium">
                        {selectedDiseaseData.category}
                      </span>
                    </CardDescription>
                  </div>
                  <Activity className="w-8 h-8 text-health-green" />
                </div>
              </CardHeader>
              <CardContent className="p-3 pt-0">
                <Tabs defaultValue="overview" className="w-full">
                  <TabsList className="grid w-full grid-cols-4 h-8">
                    <TabsTrigger value="overview" className="text-xs">概述</TabsTrigger>
                    <TabsTrigger value="symptoms" className="text-xs">症状</TabsTrigger>
                    <TabsTrigger value="prevention" className="text-xs">预防</TabsTrigger>
                    <TabsTrigger value="treatment" className="text-xs">治疗</TabsTrigger>
                  </TabsList>

                  <TabsContent value="overview" className="mt-3">
                    <div className="space-y-3">
                      <div>
                        <h3 className="text-sm font-semibold text-gray-900 mb-1.5 flex items-center">
                          <BookOpen className="w-4 h-4 mr-1.5 text-health-green" />
                          疾病简介
                        </h3>
                        <p className="text-xs text-gray-700 leading-relaxed">
                          {selectedDiseaseData.description}
                        </p>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="symptoms" className="mt-3">
                    <div className="space-y-2">
                      <h3 className="text-sm font-semibold text-gray-900 mb-1.5 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1.5 text-health-green" />
                        主要症状
                      </h3>
                      <ul className="space-y-1.5">
                        {selectedDiseaseData.symptoms.map((symptom, index) => (
                          <li key={index} className="flex items-start">
                            <span className="inline-block w-1.5 h-1.5 bg-health-green rounded-full mt-1.5 mr-2 flex-shrink-0" />
                            <span className="text-xs text-gray-700">{symptom}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </TabsContent>

                  <TabsContent value="prevention" className="mt-3">
                    <div className="space-y-2">
                      <h3 className="text-sm font-semibold text-gray-900 mb-1.5 flex items-center">
                        <Shield className="w-4 h-4 mr-1.5 text-health-green" />
                        预防措施
                      </h3>
                      <ul className="space-y-1.5">
                        {selectedDiseaseData.prevention.map((measure, index) => (
                          <li key={index} className="flex items-start">
                            <span className="inline-block w-1.5 h-1.5 bg-health-green rounded-full mt-1.5 mr-2 flex-shrink-0" />
                            <span className="text-xs text-gray-700">{measure}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </TabsContent>

                  <TabsContent value="treatment" className="mt-3">
                    <div className="space-y-2">
                      <h3 className="text-sm font-semibold text-gray-900 mb-1.5 flex items-center">
                        <Pill className="w-4 h-4 mr-1.5 text-taobao-orange" />
                        治疗建议
                      </h3>
                      <ul className="space-y-1.5">
                        {selectedDiseaseData.treatment.map((treatment, index) => (
                          <li key={index} className="flex items-start">
                            <span className="inline-block w-1.5 h-1.5 bg-taobao-orange rounded-full mt-1.5 mr-2 flex-shrink-0" />
                            <span className="text-xs text-gray-700">{treatment}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
            {filteredDiseases.map((disease) => (
              <Card
                key={disease.id}
                className="border-none shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer hover:-translate-y-0.5"
                onClick={() => setSelectedDisease(disease.id)}
              >
                <CardHeader className="p-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-sm mb-1">{disease.name}</CardTitle>
                      <span className="inline-flex items-center px-2 py-0.5 bg-gradient-to-r from-health-green to-health-green-light text-white rounded-full text-xs font-medium">
                        {disease.category}
                      </span>
                    </div>
                    <Activity className="w-6 h-6 text-health-green flex-shrink-0 ml-2" />
                  </div>
                </CardHeader>
                <CardContent className="p-3 pt-0">
                  <CardDescription className="text-xs line-clamp-2">
                    {disease.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {filteredDiseases.length === 0 && (
          <Card className="border-none shadow-lg">
            <CardContent className="py-8 text-center">
              <Search className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500 text-sm">未找到相关疾病信息</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
