import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';
import { Link } from 'react-router-dom';
import { db, NewsArticle } from '@/lib/database';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

const News = () => {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadNews();
  }, []);

  const loadNews = async () => {
    try {
      // Добавляем тестовые статьи
      const testArticles: NewsArticle[] = [
        {
          _id: 'news-1',
          title: 'Новые поступления инструментов Makita',
          slug: 'new-makita-tools',
          excerpt: 'В наш каталог добавлены новые профессиональные инструменты японского производителя Makita',
          content: 'Мы рады сообщить о поступлении новой партии инструментов Makita...',
          image: '/img/5e130715-b755-4ab5-82af-c9e448995766.jpg',
          author: 'Администратор',
          category: 'Новости',
          tags: ['Makita', 'новинки', 'инструменты'],
          isPublished: true,
          publishedAt: '2024-07-15T00:00:00Z',
          views: 245,
          createdAt: '2024-07-15T00:00:00Z',
          updatedAt: new Date().toISOString()
        },
        {
          _id: 'news-2',
          title: 'Скидки на аренду до 30% в июле',
          slug: 'july-discounts',
          excerpt: 'Специальные предложения на аренду электроинструментов в летний период',
          content: 'В течение всего июля действуют специальные скидки...',
          image: '/img/cc0687bd-1892-4c49-8820-2d326de6668b.jpg',
          author: 'Менеджер по продажам',
          category: 'Акции',
          tags: ['скидки', 'акции', 'лето'],
          isPublished: true,
          publishedAt: '2024-07-01T00:00:00Z',
          views: 189,
          createdAt: '2024-07-01T00:00:00Z',
          updatedAt: new Date().toISOString()
        },
        {
          _id: 'news-3',
          title: 'Расширение зоны доставки',
          slug: 'delivery-expansion',
          excerpt: 'Теперь мы доставляем инструменты в Подмосковье',
          content: 'Мы расширили зону доставки и теперь обслуживаем...',
          image: '/img/a1f08a16-886e-4eb0-836e-611ef0c78857.jpg',
          author: 'Логистический отдел',
          category: 'Услуги',
          tags: ['доставка', 'подмосковье', 'расширение'],
          isPublished: true,
          publishedAt: '2024-06-20T00:00:00Z',
          views: 156,
          createdAt: '2024-06-20T00:00:00Z',
          updatedAt: new Date().toISOString()
        }
      ];

      // Сохраняем в базу данных
      testArticles.forEach(article => {
        const existing = db.collection('news').findById(article._id);
        if (!existing) {
          db.collection('news').insertOne(article);
        }
      });

      const newsData = db.collection('news').find({ isPublished: true });
      setArticles(newsData.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()));
    } catch (error) {
      console.error('Ошибка загрузки новостей:', error);
    } finally {
      setLoading(false);
    }
  };

  const categories = ['all', ...new Set(articles.map(article => article.category))];

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Icon name="Loader2" className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p>Загрузка новостей...</p>
        </div>
      </div>
    );
  }

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
              <Link to="/news" className="text-blue-600 font-medium">Новости</Link>
              <Link to="/about" className="text-gray-600 hover:text-blue-600 transition-colors">О нас</Link>
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
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Новости и события</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Следите за последними новостями, акциями и обновлениями нашего сервиса аренды инструментов.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1">
            <div className="relative">
              <Input
                placeholder="Поиск по новостям..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
              <Icon name="Search" className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
            </div>
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full md:w-[200px]">
              <SelectValue placeholder="Все категории" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Все категории</SelectItem>
              {categories.filter(cat => cat !== 'all').map(category => (
                <SelectItem key={category} value={category}>{category}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Featured Article */}
        {filteredArticles.length > 0 && (
          <Card className="mb-12 overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="relative">
                <img 
                  src={filteredArticles[0].image} 
                  alt={filteredArticles[0].title}
                  className="w-full h-64 lg:h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-red-600 text-white">Главная новость</Badge>
                </div>
              </div>
              <div className="p-8 flex flex-col justify-center">
                <div className="flex items-center space-x-2 mb-4">
                  <Badge variant="outline">{filteredArticles[0].category}</Badge>
                  <span className="text-sm text-gray-500">
                    {format(new Date(filteredArticles[0].publishedAt), 'dd MMMM yyyy', { locale: ru })}
                  </span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">{filteredArticles[0].title}</h2>
                <p className="text-gray-600 mb-6">{filteredArticles[0].excerpt}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span className="flex items-center">
                      <Icon name="User" className="h-4 w-4 mr-1" />
                      {filteredArticles[0].author}
                    </span>
                    <span className="flex items-center">
                      <Icon name="Eye" className="h-4 w-4 mr-1" />
                      {filteredArticles[0].views} просмотров
                    </span>
                  </div>
                  <Link to={`/news/${filteredArticles[0].slug}`}>
                    <Button>
                      Читать далее
                      <Icon name="ArrowRight" className="h-4 w-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.slice(1).map((article) => (
            <Card key={article._id} className="hover:shadow-lg transition-shadow cursor-pointer group">
              <div className="relative">
                <img 
                  src={article.image} 
                  alt={article.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <Badge variant="outline" className="bg-white">
                    {article.category}
                  </Badge>
                </div>
              </div>
              
              <CardContent className="p-6">
                <div className="flex items-center space-x-2 mb-3">
                  <span className="text-sm text-gray-500">
                    {format(new Date(article.publishedAt), 'dd MMM yyyy', { locale: ru })}
                  </span>
                  <span className="text-sm text-gray-400">•</span>
                  <span className="text-sm text-gray-500 flex items-center">
                    <Icon name="Eye" className="h-3 w-3 mr-1" />
                    {article.views}
                  </span>
                </div>
                
                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {article.title}
                </h3>
                <p className="text-gray-600 mb-4 text-sm">{article.excerpt}</p>
                
                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-1">
                    {article.tags.slice(0, 2).map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <Link to={`/news/${article.slug}`}>
                    <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
                      Читать
                      <Icon name="ArrowRight" className="h-4 w-4 ml-1" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredArticles.length === 0 && (
          <div className="text-center py-12">
            <Icon name="FileText" className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Новости не найдены</h3>
            <p className="text-gray-600">Попробуйте изменить параметры поиска</p>
          </div>
        )}

        {/* Newsletter Subscription */}
        <Card className="mt-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Подпишитесь на новости</h2>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Получайте уведомления о новых поступлениях инструментов, акциях и специальных предложениях
            </p>
            <div className="flex flex-col md:flex-row gap-4 max-w-md mx-auto">
              <Input 
                placeholder="Ваш email" 
                className="bg-white text-gray-900"
              />
              <Button variant="secondary">
                <Icon name="Mail" className="h-4 w-4 mr-2" />
                Подписаться
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default News;