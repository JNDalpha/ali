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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl mb-4 shadow-lg">
            <BookOpen className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">疾病科普</h1>
          <p className="text-gray-600">了解常见疾病,做好预防和治疗</p>
        </div>

        <Card className="mb-8 border-none shadow-xl">
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="搜索疾病名称..."
                className="pl-12 h-12 text-lg rounded-xl border-2 focus:border-purple-500"
              />
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {diseaseCategories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={
                    selectedCategory === category
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700'
                      : 'hover:bg-purple-50 hover:border-purple-300'
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
              className="mb-4 hover:bg-purple-50"
            >
              ← 返回列表
            </Button>

            <Card className="border-none shadow-xl">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-3xl mb-2">{selectedDiseaseData.name}</CardTitle>
                    <CardDescription className="text-base">
                      <span className="inline-flex items-center px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                        {selectedDiseaseData.category}
                      </span>
                    </CardDescription>
                  </div>
                  <Activity className="w-12 h-12 text-purple-600" />
                </div>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="overview" className="w-full">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="overview">概述</TabsTrigger>
                    <TabsTrigger value="symptoms">症状</TabsTrigger>
                    <TabsTrigger value="prevention">预防</TabsTrigger>
                    <TabsTrigger value="treatment">治疗</TabsTrigger>
                  </TabsList>

                  <TabsContent value="overview" className="mt-6">
                    <div className="prose prose-sm max-w-none">
                      <p className="text-gray-800 leading-relaxed text-lg">
                        {selectedDiseaseData.description}
                      </p>
                    </div>
                  </TabsContent>

                  <TabsContent value="symptoms" className="mt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {selectedDiseaseData.symptoms.map((symptom, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-3 p-4 bg-red-50 rounded-xl border border-red-100"
                        >
                          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                          <span className="text-gray-800">{symptom}</span>
                        </div>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="prevention" className="mt-6">
                    <div className="space-y-4">
                      {selectedDiseaseData.prevention.map((item, index) => (
                        <div
                          key={index}
                          className="flex items-start space-x-3 p-4 bg-green-50 rounded-xl border border-green-100"
                        >
                          <Shield className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-800">{item}</span>
                        </div>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="treatment" className="mt-6">
                    <div className="space-y-4">
                      {selectedDiseaseData.treatment.map((item, index) => (
                        <div
                          key={index}
                          className="flex items-start space-x-3 p-4 bg-blue-50 rounded-xl border border-blue-100"
                        >
                          <Pill className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-800">{item}</span>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDiseases.map((disease) => (
              <Card
                key={disease.id}
                className="border-none shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer hover:-translate-y-1"
                onClick={() => setSelectedDisease(disease.id)}
              >
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <span className="inline-flex items-center px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-medium">
                      {disease.category}
                    </span>
                    <Activity className="w-5 h-5 text-purple-600" />
                  </div>
                  <CardTitle className="text-xl">{disease.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="line-clamp-3 text-base">
                    {disease.description}
                  </CardDescription>
                  <div className="mt-4 flex items-center text-sm text-purple-600 font-medium">
                    查看详情 →
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {filteredDiseases.length === 0 && (
          <Card className="border-none shadow-xl">
            <CardContent className="py-12 text-center">
              <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">未找到相关疾病信息</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
