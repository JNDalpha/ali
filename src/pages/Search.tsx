import { useState } from 'react';
import { Search as SearchIcon, Sparkles, AlertCircle, ExternalLink, Calendar, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
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
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-3 sm:px-4 py-4">
        <div className="mb-4 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-health-green to-health-green-light rounded-xl mb-2 shadow-md">
            <SearchIcon className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-xl font-bold text-gray-900 mb-1">药品检索</h1>
          <p className="text-xs text-gray-600">快速搜索药品信息,了解功效和用法</p>
        </div>

        <Card className="mb-3 border-none shadow-lg">
          <CardContent className="p-3">
            <div className="flex items-center space-x-2">
              <div className="relative flex-1">
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="输入药品名称或症状..."
                  className="pl-10 h-10 text-sm rounded-lg border-2 focus:border-taobao-orange"
                  disabled={isLoading}
                />
              </div>
              <Button
                onClick={handleSearch}
                disabled={!query.trim() || isLoading}
                className="bg-taobao-orange hover:bg-taobao-orange-dark text-white px-4 h-10 rounded-lg shadow-md text-sm"
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <Sparkles className="w-4 h-4 mr-1 animate-pulse" />
                    搜索中
                  </span>
                ) : (
                  <span className="flex items-center">
                    <SearchIcon className="w-4 h-4 mr-1" />
                    搜索
                  </span>
                )}
              </Button>
            </div>

            {!hasSearched && (
              <div className="mt-3">
                <p className="text-xs text-gray-600 mb-2">热门搜索:</p>
                <div className="flex flex-wrap gap-1.5">
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
                      className="text-xs hover:bg-orange-50 hover:border-taobao-orange h-7 px-2"
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
          <Alert variant="destructive" className="mb-3">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="text-sm">{error}</AlertDescription>
          </Alert>
        )}

        {(summary || isLoading) && (
          <Card className="mb-3 border-none shadow-lg">
            <CardHeader className="p-3">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-taobao-orange to-taobao-orange-light rounded-lg flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <CardTitle className="text-sm">AI智能总结</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-3 pt-0">
              <div className="prose prose-sm max-w-none">
                <p className="text-gray-800 text-sm leading-relaxed whitespace-pre-wrap">
                  {summary}
                  {isLoading && (
                    <span className="inline-block w-1.5 h-4 bg-taobao-orange animate-pulse ml-1" />
                  )}
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {references.length > 0 && (
          <div className="mb-3">
            <h2 className="text-base font-bold text-gray-900 mb-2 flex items-center px-1">
              <Globe className="w-5 h-5 mr-1.5 text-health-green" />
              参考资料
              <span className="ml-2 px-2 py-0.5 bg-green-100 text-health-green text-xs font-medium rounded-full">
                {references.length}
              </span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
              {references.map((reference) => (
                <Card
                  key={reference.id}
                  className="border-none shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer hover:-translate-y-0.5"
                  onClick={() => window.open(reference.url, '_blank')}
                >
                  <CardHeader className="p-3">
                    <div className="flex items-start justify-between mb-1">
                      <span className="text-xs text-health-green font-semibold bg-green-50 px-1.5 py-0.5 rounded">
                        [{reference.id}]
                      </span>
                      <ExternalLink className="w-3 h-3 text-gray-400 hover:text-taobao-orange transition-colors" />
                    </div>
                    <CardTitle className="text-sm line-clamp-2">{reference.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-3 pt-0">
                    <CardDescription className="line-clamp-2 mb-2 text-xs">
                      {reference.content}
                    </CardDescription>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span className="truncate font-medium text-xs">{reference.web_anchor || '来源'}</span>
                      {reference.date && (
                        <div className="flex items-center space-x-1 bg-gray-50 px-1.5 py-0.5 rounded">
                          <Calendar className="w-3 h-3" />
                          <span className="text-xs">{reference.date}</span>
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
          <Card className="border-none shadow-lg mb-3">
            <CardHeader className="p-3">
              <CardTitle className="text-sm">相关问题推荐</CardTitle>
            </CardHeader>
            <CardContent className="p-3 pt-0">
              <div className="flex flex-wrap gap-1.5">
                {followupQueries.map((followupQuery, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => handleFollowupClick(followupQuery)}
                    className="hover:bg-orange-50 hover:border-taobao-orange text-xs h-7 px-2"
                  >
                    {followupQuery}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {hasSearched && !isLoading && !summary && !error && (
          <Card className="border-none shadow-lg">
            <CardContent className="py-8 text-center">
              <SearchIcon className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500 text-sm">未找到相关结果,请尝试其他关键词</p>
            </CardContent>
          </Card>
        )}

        <Alert className="border-orange-200 bg-orange-50">
          <AlertCircle className="h-4 w-4 text-taobao-orange" />
          <AlertDescription className="text-orange-800 text-xs">
            <strong>用药提醒:</strong> 搜索结果仅供参考,具体用药请遵医嘱。处方药需凭医生处方购买。
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}
