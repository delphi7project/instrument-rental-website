import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { Link, useSearchParams } from 'react-router-dom';
import { db, Tool, NewsArticle, Review } from '@/lib/database';

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [tools, setTools] = useState<Tool[]>([]);
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('relevance');

  useEffect(() => {
    const searchQuery = searchParams.get('q');
    if (searchQuery) {
      setQuery(searchQuery);
      performSearch(searchQuery);
    }
  }, [searchParams]);

  const performSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) return;
    
    setLoading(true);
    try {
      // Поиск инструментов
      const toolsData = db.collection('tools').find({
        isActive: true,
        $or: [
          { name: { $regex: searchQuery, $options: 'i' } },
          { description: { $regex: searchQuery, $options: 'i' } },
          { brand: { $regex: searchQuery, $options: 'i' } },
          { category: { $regex: searchQuery, $options: 'i' } },
          { subcategory: { $regex: searchQuery, $options: 'i' } }
        ]
      });

      // Поиск новостей
      const newsData = db.collection('news').find({
        isPublished: true,
        $or: [
          { title: { $regex: searchQuery, $options: 'i' } },
          { excerpt: { $regex: searchQuery, $options: 'i' } },
          { content: { $regex: searchQuery, $options: 'i' } }
        ]
      });

      // Поиск отзывов
      const reviewsData = db.collection('reviews').find({
        isApproved: true,
        $or: [
          { title: { $regex: searchQuery, $options: 'i' } },
          { comment: { $regex: searchQuery, $options: 'i' } }
        ]
      });

      setTools(toolsData);
      setNews(newsData);
      setReviews(reviewsData);
    } catch (error) {
      console.error('Ошибка поиска:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setSearchParams({ q: query });
      performSearch(query);
    }
  };

  const filteredTools = tools.filter(tool => {
    const matchesPrice = tool.price >= priceRange[0] && tool.price <= priceRange[1];
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(tool.category);
    const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(tool.brand);
    return matchesPrice && matchesCategory && matchesBrand;
  });

  const sortedTools = [...filteredTools].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'name':
        return a.name.localeCompare(b.name);
      case 'relevance':
      default:
        return 0;
    }
  });

  const totalResults = tools.length + news.length + reviews.length;
  const categories = [...new Set(tools.map(tool => tool.category))];
  const brands = [...new Set(tools.map(tool => tool.brand))];

  const getToolById = (toolId: string) => {
    return tools.find(tool => tool._id === toolId);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <Icon name="Wrench" className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">ToolRental</span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link to="/" className="text-gray-600 hover:text-blue-600 transition-colors">Главная</Link>
              <Link to="/catalog" className="text-gray-600 hover:text-blue-600 transition-colors">Каталог</Link>
              <Link to="/about" className="text-gray-600 hover:text-blue-600 transition-colors">О нас</Link>
              <Link to="/contact" className="text-gray-600 hover:text-blue-600 transition-colors">Контакты</Link>
            </nav>
            <Link to="/profile">
              <Button size="sm">
                <Icon name="User" className="h-4 w-4 mr-2" />
                Войти
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Header */}
        <div className="mb-8">
          <form onSubmit={handleSearch} className="flex gap-4 mb-4">
            <div className="flex-1 relative">
              <Input
                placeholder="Поиск инструментов, новостей, отзывов..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-10"
              />
              <Icon name="Search" className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
            </div>
            <Button type="submit" disabled={loading}>
              {loading ? (
                <Icon name="Loader2" className="h-4 w-4 animate-spin" />
              ) : (
                <Icon name="Search" className="h-4 w-4" />
              )}
            </Button>
          </form>

          {query && (
            <div className="flex items-center justify-between">
              <p className="text-gray-600">
                Найдено {totalResults} результатов по запросу "{query}"
              </p>
              {tools.length > 0 && (
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Сортировать" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="relevance">По релевантности</SelectItem>
                    <SelectItem value="price-low">Сначала дешёвые</SelectItem>
                    <SelectItem value="price-high">Сначала дорогие</SelectItem>
                    <SelectItem value="rating">По рейтингу</SelectItem>
                    <SelectItem value="name">По названию</SelectItem>
                  </SelectContent>
                </Select>
              )}
            </div>
          )}
        </div>

        {query && totalResults > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filters Sidebar */}
            {tools.length > 0 && (
              <div className="space-y-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-gray-900 mb-4">Фильтры</h3>
                    
                    {/* Price Range */}
                    <div className="mb-6">
                      <label className="text-sm font-medium text-gray-900 mb-3 block">
                        Цена: {priceRange[0]}₽ - {priceRange[1]}₽
                      </label>
                      <Slider
                        value={priceRange}
                        onValueChange={setPriceRange}
                        max={5000}
                        min={0}
                        step={100}
                        className="w-full"
                      />
                    </div>

                    {/* Categories */}
                    {categories.length > 0 && (
                      <div className="mb-6">
                        <label className="text-sm font-medium text-gray-900 mb-3 block">Категории</label>
                        <div className="space-y-2">
                          {categories.map((category) => (
                            <div key={category} className="flex items-center space-x-2">
                              <Checkbox
                                id={`cat-${category}`}
                                checked={selectedCategories.includes(category)}
                                onCheckedChange={(checked) => {
                                  if (checked) {
                                    setSelectedCategories([...selectedCategories, category]);
                                  } else {
                                    setSelectedCategories(selectedCategories.filter(c => c !== category));
                                  }
                                }}
                              />
                              <label htmlFor={`cat-${category}`} className="text-sm cursor-pointer">
                                {category}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Brands */}
                    {brands.length > 0 && (
                      <div>
                        <label className="text-sm font-medium text-gray-900 mb-3 block">Бренды</label>
                        <div className="space-y-2">
                          {brands.map((brand) => (
                            <div key={brand} className="flex items-center space-x-2">
                              <Checkbox
                                id={`brand-${brand}`}
                                checked={selectedBrands.includes(brand)}
                                onCheckedChange={(checked) => {
                                  if (checked) {
                                    setSelectedBrands([...selectedBrands, brand]);
                                  } else {
                                    setSelectedBrands(selectedBrands.filter(b => b !== brand));
                                  }
                                }}
                              />
                              <label htmlFor={`brand-${brand}`} className="text-sm cursor-pointer">
                                {brand}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <Button
                      variant="outline"
                      className="w-full mt-4"
                      onClick={() => {
                        setSelectedCategories([]);
                        setSelectedBrands([]);
                        setPriceRange([0, 5000]);
                      }}
                    >
                      Сбросить фильтры
                    </Button>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Results */}
            <div className={tools.length > 0 ? "lg:col-span-3" : "lg:col-span-4"}>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList>
                  <TabsTrigger value="all">
                    Все ({totalResults})
                  </TabsTrigger>
                  <TabsTrigger value="tools">
                    Инструменты ({tools.length})
                  </TabsTrigger>
                  <TabsTrigger value="news">
                    Новости ({news.length})
                  </TabsTrigger>
                  <TabsTrigger value="reviews">
                    Отзывы ({reviews.length})
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="mt-6 space-y-6">
                  {/* Tools */}
                  {sortedTools.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Инструменты</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {sortedTools.slice(0, 6).map((tool) => (
                          <Card key={tool._id} className="hover:shadow-lg transition-shadow cursor-pointer">
                            <Link to={`/product/${tool._id}`}>
                              <div className="relative">
                                <img 
                                  src={tool.images[0] || '/img/placeholder.jpg'} 
                                  alt={tool.name}
                                  className="w-full h-48 object-cover"
                                />
                                <div className="absolute top-2 left-2">
                                  <Badge variant="outline" className="bg-white">
                                    {tool.subcategory}
                                  </Badge>
                                </div>
                              </div>
                              <CardContent className="p-4">
                                <h4 className="font-semibold text-gray-900 mb-1">{tool.name}</h4>
                                <p className="text-sm text-gray-600 mb-2">{tool.brand}</p>
                                <div className="flex items-center justify-between">
                                  <span className="text-lg font-bold text-blue-600">
                                    {tool.price}₽/день
                                  </span>
                                  <div className="flex items-center space-x-1">
                                    <Icon name="Star" className="h-4 w-4 text-yellow-400 fill-current" />
                                    <span className="text-sm">{tool.rating}</span>
                                  </div>
                                </div>
                              </CardContent>
                            </Link>
                          </Card>
                        ))}
                      </div>
                      {sortedTools.length > 6 && (
                        <div className="text-center mt-4">
                          <Button variant="outline" onClick={() => setActiveTab('tools')}>
                            Показать все инструменты
                          </Button>
                        </div>
                      )}
                    </div>
                  )}

                  {/* News */}
                  {news.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Новости</h3>
                      <div className="space-y-4">
                        {news.slice(0, 3).map((article) => (
                          <Card key={article._id} className="hover:shadow-md transition-shadow">
                            <Link to={`/news/${article.slug}`}>
                              <CardContent className="p-6">
                                <div className="flex space-x-4">
                                  <img 
                                    src={article.image} 
                                    alt={article.title}
                                    className="w-24 h-24 object-cover rounded-lg"
                                  />
                                  <div className="flex-1">
                                    <h4 className="font-semibold text-gray-900 mb-2">{article.title}</h4>
                                    <p className="text-sm text-gray-600 mb-2">{article.excerpt}</p>
                                    <div className="flex items-center space-x-2 text-xs text-gray-500">
                                      <Badge variant="outline">{article.category}</Badge>
                                      <span>{article.views} просмотров</span>
                                    </div>
                                  </div>
                                </div>
                              </CardContent>
                            </Link>
                          </Card>
                        ))}
                      </div>
                      {news.length > 3 && (
                        <div className="text-center mt-4">
                          <Button variant="outline" onClick={() => setActiveTab('news')}>
                            Показать все новости
                          </Button>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Reviews */}
                  {reviews.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Отзывы</h3>
                      <div className="space-y-4">
                        {reviews.slice(0, 3).map((review) => {
                          const tool = getToolById(review.toolId);
                          return (
                            <Card key={review._id} className="hover:shadow-md transition-shadow">
                              <CardContent className="p-6">
                                <div className="flex items-start space-x-4">
                                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                    <Icon name="User" className="h-5 w-5 text-blue-600" />
                                  </div>
                                  <div className="flex-1">
                                    <h4 className="font-semibold text-gray-900 mb-1">{review.title}</h4>
                                    <div className="flex items-center space-x-2 mb-2">
                                      <div className="flex">
                                        {[...Array(5)].map((_, i) => (
                                          <Icon 
                                            key={i} 
                                            name="Star" 
                                            className={`h-4 w-4 ${
                                              i < review.rating 
                                                ? 'text-yellow-400 fill-current' 
                                                : 'text-gray-300'
                                            }`}
                                          />
                                        ))}
                                      </div>
                                      <span className="text-sm text-gray-600">
                                        {tool?.name || 'Инструмент'}
                                      </span>
                                    </div>
                                    <p className="text-sm text-gray-600">{review.comment}</p>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          );
                        })}
                      </div>
                      {reviews.length > 3 && (
                        <div className="text-center mt-4">
                          <Button variant="outline" onClick={() => setActiveTab('reviews')}>
                            Показать все отзывы
                          </Button>
                        </div>
                      )}
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="tools" className="mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {sortedTools.map((tool) => (
                      <Card key={tool._id} className="hover:shadow-lg transition-shadow cursor-pointer">
                        <Link to={`/product/${tool._id}`}>
                          <div className="relative">
                            <img 
                              src={tool.images[0] || '/img/placeholder.jpg'} 
                              alt={tool.name}
                              className="w-full h-48 object-cover"
                            />
                            <div className="absolute top-2 left-2">
                              <Badge variant="outline" className="bg-white">
                                {tool.subcategory}
                              </Badge>
                            </div>
                          </div>
                          <CardContent className="p-4">
                            <h4 className="font-semibold text-gray-900 mb-1">{tool.name}</h4>
                            <p className="text-sm text-gray-600 mb-2">{tool.brand}</p>
                            <p className="text-xs text-gray-500 mb-3">{tool.description}</p>
                            <div className="flex items-center justify-between">
                              <span className="text-lg font-bold text-blue-600">
                                {tool.price}₽/день
                              </span>
                              <div className="flex items-center space-x-1">
                                <Icon name="Star" className="h-4 w-4 text-yellow-400 fill-current" />
                                <span className="text-sm">{tool.rating}</span>
                              </div>
                            </div>
                          </CardContent>
                        </Link>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="news" className="mt-6">
                  <div className="space-y-6">
                    {news.map((article) => (
                      <Card key={article._id} className="hover:shadow-md transition-shadow">
                        <Link to={`/news/${article.slug}`}>
                          <CardContent className="p-6">
                            <div className="flex space-x-6">
                              <img 
                                src={article.image} 
                                alt={article.title}
                                className="w-32 h-32 object-cover rounded-lg"
                              />
                              <div className="flex-1">
                                <div className="flex items-center space-x-2 mb-2">
                                  <Badge variant="outline">{article.category}</Badge>
                                  <span className="text-sm text-gray-500">{article.views} просмотров</span>
                                </div>
                                <h4 className="text-xl font-semibold text-gray-900 mb-2">{article.title}</h4>
                                <p className="text-gray-600 mb-4">{article.excerpt}</p>
                                <div className="flex items-center space-x-4 text-sm text-gray-500">
                                  <span>Автор: {article.author}</span>
                                  <span>{new Date(article.publishedAt).toLocaleDateString('ru-RU')}</span>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Link>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="reviews" className="mt-6">
                  <div className="space-y-6">
                    {reviews.map((review) => {
                      const tool = getToolById(review.toolId);
                      return (
                        <Card key={review._id} className="hover:shadow-md transition-shadow">
                          <CardContent className="p-6">
                            <div className="flex items-start space-x-4">
                              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                <Icon name="User" className="h-6 w-6 text-blue-600" />
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center justify-between mb-2">
                                  <h4 className="font-semibold text-gray-900">{review.title}</h4>
                                  <div className="flex">
                                    {[...Array(5)].map((_, i) => (
                                      <Icon 
                                        key={i} 
                                        name="Star" 
                                        className={`h-4 w-4 ${
                                          i < review.rating 
                                            ? 'text-yellow-400 fill-current' 
                                            : 'text-gray-300'
                                        }`}
                                      />
                                    ))}
                                  </div>
                                </div>
                                <p className="text-sm text-gray-600 mb-2">
                                  Инструмент: <span className="font-medium">{tool?.name || 'Неизвестный инструмент'}</span>
                                </p>
                                <p className="text-gray-700 mb-4">{review.comment}</p>
                                <div className="flex items-center space-x-4 text-sm text-gray-500">
                                  <span>{new Date(review.createdAt).toLocaleDateString('ru-RU')}</span>
                                  <span>{review.helpfulVotes} считают полезным</span>
                                  {review.isVerified && (
                                    <Badge variant="outline" className="text-xs">
                                      Проверенная покупка
                                    </Badge>
                                  )}
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        )}

        {query && totalResults === 0 && !loading && (
          <div className="text-center py-12">
            <Icon name="Search" className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Ничего не найдено</h3>
            <p className="text-gray-600 mb-6">
              По запросу "{query}" ничего не найдено. Попробуйте изменить поисковый запрос.
            </p>
            <div className="space-y-2 text-sm text-gray-500">
              <p>Попробуйте:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Использовать более общие термины</li>
                <li>Проверить правильность написания</li>
                <li>Использовать синонимы</li>
              </ul>
            </div>
          </div>
        )}

        {!query && (
          <div className="text-center py-12">
            <Icon name="Search" className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Введите поисковый запрос</h3>
            <p className="text-gray-600 mb-6">
              Найдите нужные инструменты, новости или отзывы
            </p>
            <div className="max-w-md mx-auto">
              <form onSubmit={handleSearch} className="flex gap-2">
                <Input
                  placeholder="Например: перфоратор, болгарка..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="flex-1"
                />
                <Button type="submit">
                  <Icon name="Search" className="h-4 w-4" />
                </Button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;