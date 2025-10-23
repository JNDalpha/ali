import { useState } from 'react';
import { Search as SearchIcon, Sparkles, AlertCircle, ExternalLink, Calendar, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { searchWithAI } from '@/services/api';
import type { SearchReference } from '@/types/medicine';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [summary, setSummary] = useState('');
  const [references, setReferences] = useState<SearchReference[]>([]);
  const [followupQueries, setFollowupQueries] = useState<string[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async () => {
    if (!query.trim() || isLoading) return;

    setIsLoading(true);
    setError('');
    setSummary('');
    setReferences([]);
    setFollowupQueries([]);
    setHasSearched(true);

    try {
      await searchWithAI(
        query.trim(),
        {
          enableDeepSearch: false,
        },
        (chunk) => {
          setSummary((prev) => prev + chunk);
        },
        (refs, followups) => {
          setReferences(refs || []);
          setFollowupQueries(followups || []);
          setIsLoading(false);
        }
      );
    } catch (err) {
      setError('搜索失败,请稍后重试');
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleFollowupClick = (followupQuery: string) => {
    setQuery(followupQuery);
    setTimeout(() => {
      handleSearch();
    }, 100);
  };

  const popularSearches = [
    '阿莫西林的功效和用法',
    '布洛芬退烧效果',
    '感冒灵颗粒说明书',
    '维生素C的作用',
    '板蓝根的功效',
    '云南白药使用方法',
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-600 to-emerald-600 rounded-2xl mb-4 shadow-lg">
            <SearchIcon className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">药品检索</h1>
          <p className="text-gray-600">快速搜索药品信息,了解功效和用法</p>
        </div>

        <Card className="mb-8 border-none shadow-xl">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <div className="relative flex-1">
                <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="输入药品名称或症状..."
                  className="pl-12 h-14 text-lg rounded-xl border-2 focus:border-green-500"
                  disabled={isLoading}
                />
              </div>
              <Button
                onClick={handleSearch}
                disabled={!query.trim() || isLoading}
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-8 h-14 rounded-xl shadow-lg"
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <Sparkles className="w-5 h-5 mr-2 animate-pulse" />
                    搜索中...
                  </span>
                ) : (
                  <span className="flex items-center">
                    <SearchIcon className="w-5 h-5 mr-2" />
                    搜索
                  </span>
                )}
              </Button>
            </div>

            {!hasSearched && (
              <div className="mt-6">
                <p className="text-sm text-gray-600 mb-3">热门搜索:</p>
                <div className="flex flex-wrap gap-2">
                  {popularSearches.map((search, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setQuery(search);
                        setTimeout(() => {
                          handleSearch();
                        }, 100);
                      }}
                      className="text-sm hover:bg-green-50 hover:border-green-300"
                    >
                      {search}
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {(summary || isLoading) && (
          <Card className="mb-8 border-none shadow-xl">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <CardTitle>AI智能总结</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="prose prose-sm max-w-none">
                <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">
                  {summary}
                  {isLoading && (
                    <span className="inline-block w-2 h-5 bg-blue-600 animate-pulse ml-1" />
                  )}
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {references.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <Globe className="w-6 h-6 mr-2 text-green-600" />
              参考资料
              <span className="ml-3 px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                {references.length} 条结果
              </span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {references.map((reference) => (
                <Card
                  key={reference.id}
                  className="border-none shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer hover:-translate-y-1"
                  onClick={() => window.open(reference.url, '_blank')}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <span className="text-sm text-green-600 font-semibold bg-green-50 px-2 py-1 rounded">
                        [{reference.id}]
                      </span>
                      <ExternalLink className="w-4 h-4 text-gray-400 hover:text-green-500 transition-colors" />
                    </div>
                    <CardTitle className="text-lg line-clamp-2">{reference.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="line-clamp-3 mb-4">
                      {reference.content}
                    </CardDescription>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span className="truncate font-medium">{reference.web_anchor || '来源'}</span>
                      {reference.date && (
                        <div className="flex items-center space-x-1 bg-gray-50 px-2 py-1 rounded">
                          <Calendar className="w-3 h-3" />
                          <span>{reference.date}</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {followupQueries.length > 0 && (
          <Card className="border-none shadow-xl">
            <CardHeader>
              <CardTitle>相关问题推荐</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3">
                {followupQueries.map((followupQuery, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    onClick={() => handleFollowupClick(followupQuery)}
                    className="hover:bg-green-50 hover:border-green-300"
                  >
                    {followupQuery}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {hasSearched && !isLoading && !summary && !error && (
          <Card className="border-none shadow-xl">
            <CardContent className="py-12 text-center">
              <SearchIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">未找到相关结果,请尝试其他关键词</p>
            </CardContent>
          </Card>
        )}

        <Alert className="mt-8 border-orange-200 bg-orange-50">
          <AlertCircle className="h-4 w-4 text-orange-600" />
          <AlertDescription className="text-orange-800">
            <strong>用药提醒:</strong> 搜索结果仅供参考,具体用药请遵医嘱。
            处方药需凭医生处方购买,请勿自行用药。
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}
