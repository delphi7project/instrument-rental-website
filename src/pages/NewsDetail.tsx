import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';
import { Link, useParams } from 'react-router-dom';
import { db, NewsArticle } from '@/lib/database';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

const NewsDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<NewsArticle | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      loadArticle(slug);
    }
  }, [slug]);

  const loadArticle = async (articleSlug: string) => {
    try {
      const articleData = db.collection('news').findOne({ slug: articleSlug, isPublished: true });
      
      if (articleData) {
        setArticle(articleData);
        
        // Увеличиваем счётчик просмотров
        db.collection('news').updateOne(
          { _id: articleData._id },
          { views: articleData.views + 1 }
        );

        // Загружаем похожие статьи
        const related = db.collection('news').find({ 
          isPublished: true,
          _id: { $ne: articleData._id },
          category: articleData.category
        }).slice(0, 3);
        
        setRelatedArticles(related);
      }
    } catch (error) {
      console.error('Ошибка загрузки статьи:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Icon name="Loader2" className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p>Загрузка статьи...</p>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Icon name="FileX" className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Статья не найдена</h1>
          <p className="text-gray-600 mb-6">Возможно, статья была удалена или перемещена</p>
          <Link to="/news">
            <Button>
              <Icon name="ArrowLeft" className="h-4 w-4 mr-2" />
              Вернуться к новостям
            </Button>
          </Link>
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

      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center space-x-2 text-sm">
            <Link to="/" className="text-gray-600 hover:text-blue-600">Главная</Link>
            <Icon name="ChevronRight" className="h-4 w-4 text-gray-400" />
            <Link to="/news" className="text-gray-600 hover:text-blue-600">Новости</Link>
            <Icon name="ChevronRight" className="h-4 w-4 text-gray-400" />
            <span className="text-gray-900">{article.title}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Article Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-2 mb-4">
            <Badge variant="outline">{article.category}</Badge>
            <span className="text-sm text-gray-500">
              {format(new Date(article.publishedAt), 'dd MMMM yyyy', { locale: ru })}
            </span>
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{article.title}</h1>
          
          <div className="flex items-center space-x-6 text-sm text-gray-500">
            <span className="flex items-center">
              <Icon name="User" className="h-4 w-4 mr-1" />
              {article.author}
            </span>
            <span className="flex items-center">
              <Icon name="Eye" className="h-4 w-4 mr-1" />
              {article.views} просмотров
            </span>
            <span className="flex items-center">
              <Icon name="Clock" className="h-4 w-4 mr-1" />
              5 мин чтения
            </span>
          </div>
        </div>

        {/* Featured Image */}
        <div className="mb-8">
          <img 
            src={article.image} 
            alt={article.title}
            className="w-full h-64 md:h-96 object-cover rounded-lg shadow-lg"
          />
        </div>

        {/* Article Content */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <div className="prose max-w-none">
              <p className="text-xl text-gray-600 mb-6 font-medium">{article.excerpt}</p>
              <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                {article.content || `
Подробное содержание статьи "${article.title}".

В этой статье мы рассказываем о важных событиях и новостях нашей компании. Мы постоянно работаем над улучшением качества наших услуг и расширением ассортимента инструментов.

Основные моменты:
• Качество и надёжность наших инструментов
• Профессиональный сервис и поддержка клиентов
• Конкурентные цены и выгодные условия аренды
• Быстрая доставка по Москве и области

Мы ценим доверие наших клиентов и продолжаем развиваться, чтобы предоставлять лучший сервис аренды инструментов в регионе.

Следите за нашими новостями и не пропускайте выгодные предложения!
                `}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tags */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Теги</h3>
          <div className="flex flex-wrap gap-2">
            {article.tags.map((tag, index) => (
              <Badge key={index} variant="secondary" className="cursor-pointer hover:bg-blue-100">
                #{tag}
              </Badge>
            ))}
          </div>
        </div>

        <Separator className="my-8" />

        {/* Share */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Поделиться статьёй</h3>
            <div className="flex space-x-4">
              <Button variant="outline" size="sm">
                <Icon name="Share2" className="h-4 w-4 mr-2" />
                Поделиться
              </Button>
              <Button variant="outline" size="sm">
                <Icon name="Copy" className="h-4 w-4 mr-2" />
                Копировать ссылку
              </Button>
            </div>
          </div>
          
          <Link to="/news">
            <Button variant="outline">
              <Icon name="ArrowLeft" className="h-4 w-4 mr-2" />
              Все новости
            </Button>
          </Link>
        </div>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Похожие статьи</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedArticles.map((relatedArticle) => (
                <Card key={relatedArticle._id} className="hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <img 
                      src={relatedArticle.image} 
                      alt={relatedArticle.title}
                      className="w-full h-32 object-cover"
                    />
                    <div className="absolute top-2 left-2">
                      <Badge variant="outline" className="bg-white text-xs">
                        {relatedArticle.category}
                      </Badge>
                    </div>
                  </div>
                  
                  <CardContent className="p-4">
                    <h4 className="font-semibold text-gray-900 mb-2 text-sm">
                      {relatedArticle.title}
                    </h4>
                    <p className="text-gray-600 text-xs mb-3">
                      {relatedArticle.excerpt.substring(0, 100)}...
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">
                        {format(new Date(relatedArticle.publishedAt), 'dd MMM', { locale: ru })}
                      </span>
                      <Link to={`/news/${relatedArticle.slug}`}>
                        <Button variant="ghost" size="sm" className="text-xs">
                          Читать
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsDetail;