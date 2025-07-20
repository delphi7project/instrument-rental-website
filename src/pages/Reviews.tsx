import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';
import { Link } from 'react-router-dom';
import { db, Review, Tool } from '@/lib/database';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

const Reviews = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [tools, setTools] = useState<Tool[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [ratingFilter, setRatingFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [loading, setLoading] = useState(true);
  const [newReview, setNewReview] = useState({
    toolId: '',
    rating: 5,
    title: '',
    comment: '',
    name: ''
  });

  useEffect(() => {
    loadReviews();
    loadTools();
  }, []);

  const loadReviews = async () => {
    try {
      // Добавляем тестовые отзывы
      const testReviews: Review[] = [
        {
          _id: 'review-1',
          toolId: 'tool-1',
          customerId: 'user-1',
          orderId: 'order-1',
          rating: 5,
          title: 'Отличный перфоратор!',
          comment: 'Мощный, надёжный инструмент. Отлично справляется с бетоном. Антивибрационная система действительно работает - руки не устают даже после долгой работы.',
          pros: ['Мощный', 'Надёжный', 'Удобный'],
          cons: ['Тяжёлый'],
          wouldRecommend: true,
          isVerified: true,
          isApproved: true,
          helpfulVotes: 12,
          reportCount: 0,
          images: [],
          createdAt: '2024-07-25T00:00:00Z',
          updatedAt: new Date().toISOString()
        },
        {
          _id: 'review-2',
          toolId: 'tool-2',
          customerId: 'user-2',
          rating: 5,
          title: 'Отличная болгарка',
          comment: 'Компактная и мощная. Удобно лежит в руке, хорошо сбалансирована. Диски меняются быстро и легко.',
          pros: ['Компактная', 'Мощная', 'Удобная'],
          cons: [],
          wouldRecommend: true,
          isVerified: false,
          isApproved: true,
          helpfulVotes: 8,
          reportCount: 0,
          images: [],
          createdAt: '2024-07-20T00:00:00Z',
          updatedAt: new Date().toISOString()
        },
        {
          _id: 'review-3',
          toolId: 'tool-1',
          customerId: 'user-3',
          rating: 4,
          title: 'Хороший инструмент',
          comment: 'Качественный перфоратор, справляется со своими задачами. Единственный минус - довольно тяжёлый для длительной работы.',
          pros: ['Качественный', 'Мощный'],
          cons: ['Тяжёлый'],
          wouldRecommend: true,
          isVerified: true,
          isApproved: true,
          helpfulVotes: 5,
          reportCount: 0,
          images: [],
          createdAt: '2024-07-15T00:00:00Z',
          updatedAt: new Date().toISOString()
        }
      ];

      // Сохраняем в базу данных
      testReviews.forEach(review => {
        const existing = db.collection('reviews').findById(review._id);
        if (!existing) {
          db.collection('reviews').insertOne(review);
        }
      });

      const reviewsData = db.collection('reviews').find({ isApproved: true });
      setReviews(reviewsData);
    } catch (error) {
      console.error('Ошибка загрузки отзывов:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadTools = async () => {
    try {
      const toolsData = db.collection('tools').find({ isActive: true });
      setTools(toolsData);
    } catch (error) {
      console.error('Ошибка загрузки инструментов:', error);
    }
  };

  const getToolName = (toolId: string) => {
    const tool = tools.find(t => t._id === toolId);
    return tool ? tool.name : 'Неизвестный инструмент';
  };

  const filteredReviews = reviews.filter(review => {
    const toolName = getToolName(review.toolId);
    const matchesSearch = review.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         review.comment.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         toolName.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesRating = ratingFilter === 'all' || review.rating.toString() === ratingFilter;
    
    return matchesSearch && matchesRating;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'oldest':
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      case 'rating-high':
        return b.rating - a.rating;
      case 'rating-low':
        return a.rating - b.rating;
      case 'helpful':
        return b.helpfulVotes - a.helpfulVotes;
      case 'newest':
      default:
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
  });

  const averageRating = reviews.length > 0 
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length 
    : 0;

  const ratingDistribution = [5, 4, 3, 2, 1].map(rating => ({
    rating,
    count: reviews.filter(r => r.rating === rating).length,
    percentage: reviews.length > 0 ? (reviews.filter(r => r.rating === rating).length / reviews.length) * 100 : 0
  }));

  const handleSubmitReview = () => {
    const review: Omit<Review, '_id' | 'createdAt' | 'updatedAt'> = {
      toolId: newReview.toolId,
      customerId: 'anonymous',
      rating: newReview.rating,
      title: newReview.title,
      comment: newReview.comment,
      pros: [],
      cons: [],
      wouldRecommend: newReview.rating >= 4,
      isVerified: false,
      isApproved: false,
      helpfulVotes: 0,
      reportCount: 0,
      images: []
    };

    db.collection('reviews').insertOne(review);
    loadReviews();
    
    setNewReview({
      toolId: '',
      rating: 5,
      title: '',
      comment: '',
      name: ''
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Icon name="Loader2" className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p>Загрузка отзывов...</p>
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
              <Link to="/reviews" className="text-blue-600 font-medium">Отзывы</Link>
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
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Отзывы клиентов</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Честные отзывы наших клиентов о качестве инструментов и уровне сервиса
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar with Stats */}
          <div className="space-y-6">
            {/* Overall Rating */}
            <Card>
              <CardHeader>
                <CardTitle>Общий рейтинг</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-4">
                  <div className="text-4xl font-bold text-gray-900 mb-2">
                    {averageRating.toFixed(1)}
                  </div>
                  <div className="flex justify-center mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Icon 
                        key={i} 
                        name="Star" 
                        className={`h-5 w-5 ${
                          i < Math.floor(averageRating) 
                            ? 'text-yellow-400 fill-current' 
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-sm text-gray-600">
                    Основано на {reviews.length} отзывах
                  </p>
                </div>

                <div className="space-y-2">
                  {ratingDistribution.map((dist) => (
                    <div key={dist.rating} className="flex items-center space-x-2">
                      <span className="text-sm w-8">{dist.rating}</span>
                      <Icon name="Star" className="h-4 w-4 text-yellow-400" />
                      <Progress value={dist.percentage} className="flex-1" />
                      <span className="text-sm text-gray-600 w-12">
                        {dist.count}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Filters */}
            <Card>
              <CardHeader>
                <CardTitle>Фильтры</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-sm font-medium">Поиск</Label>
                  <div className="relative">
                    <Input
                      placeholder="Поиск по отзывам..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                    <Icon name="Search" className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium">Рейтинг</Label>
                  <Select value={ratingFilter} onValueChange={setRatingFilter}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Все рейтинги</SelectItem>
                      <SelectItem value="5">5 звёзд</SelectItem>
                      <SelectItem value="4">4 звезды</SelectItem>
                      <SelectItem value="3">3 звезды</SelectItem>
                      <SelectItem value="2">2 звезды</SelectItem>
                      <SelectItem value="1">1 звезда</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-sm font-medium">Сортировка</Label>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="newest">Сначала новые</SelectItem>
                      <SelectItem value="oldest">Сначала старые</SelectItem>
                      <SelectItem value="rating-high">Высокий рейтинг</SelectItem>
                      <SelectItem value="rating-low">Низкий рейтинг</SelectItem>
                      <SelectItem value="helpful">Самые полезные</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Add Review */}
            <Dialog>
              <DialogTrigger asChild>
                <Button className="w-full">
                  <Icon name="Plus" className="h-4 w-4 mr-2" />
                  Оставить отзыв
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Оставить отзыв</DialogTitle>
                  <DialogDescription>
                    Поделитесь своим опытом использования наших инструментов
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label>Инструмент</Label>
                    <Select value={newReview.toolId} onValueChange={(value) => setNewReview({...newReview, toolId: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите инструмент" />
                      </SelectTrigger>
                      <SelectContent>
                        {tools.map(tool => (
                          <SelectItem key={tool._id} value={tool._id}>{tool.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Ваше имя</Label>
                    <Input
                      value={newReview.name}
                      onChange={(e) => setNewReview({...newReview, name: e.target.value})}
                      placeholder="Как вас зовут?"
                    />
                  </div>

                  <div>
                    <Label>Оценка</Label>
                    <div className="flex space-x-1 mt-2">
                      {[1, 2, 3, 4, 5].map((rating) => (
                        <button
                          key={rating}
                          type="button"
                          onClick={() => setNewReview({...newReview, rating})}
                          className="focus:outline-none"
                        >
                          <Icon 
                            name="Star" 
                            className={`h-6 w-6 ${
                              rating <= newReview.rating 
                                ? 'text-yellow-400 fill-current' 
                                : 'text-gray-300'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label>Заголовок отзыва</Label>
                    <Input
                      value={newReview.title}
                      onChange={(e) => setNewReview({...newReview, title: e.target.value})}
                      placeholder="Краткое описание вашего опыта"
                    />
                  </div>

                  <div>
                    <Label>Подробный отзыв</Label>
                    <Textarea
                      value={newReview.comment}
                      onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
                      placeholder="Расскажите подробнее о вашем опыте..."
                      rows={4}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={handleSubmitReview}>
                    Отправить отзыв
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          {/* Reviews List */}
          <div className="lg:col-span-3 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">
                Отзывы ({filteredReviews.length})
              </h2>
            </div>

            {filteredReviews.length === 0 ? (
              <div className="text-center py-12">
                <Icon name="MessageSquare" className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Отзывы не найдены</h3>
                <p className="text-gray-600">Попробуйте изменить параметры поиска</p>
              </div>
            ) : (
              <div className="space-y-6">
                {filteredReviews.map((review) => (
                  <Card key={review._id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <Avatar>
                          <AvatarFallback>
                            {review.customerId.substring(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <h3 className="font-semibold text-gray-900">{review.title}</h3>
                              <div className="flex items-center space-x-2 mt-1">
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
                                  {format(new Date(review.createdAt), 'dd MMMM yyyy', { locale: ru })}
                                </span>
                                {review.isVerified && (
                                  <Badge variant="outline" className="text-xs">
                                    <Icon name="CheckCircle" className="h-3 w-3 mr-1" />
                                    Проверенная покупка
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </div>
                          
                          <p className="text-sm text-gray-600 mb-2">
                            Инструмент: <span className="font-medium">{getToolName(review.toolId)}</span>
                          </p>
                          
                          <p className="text-gray-700 mb-4">{review.comment}</p>
                          
                          {(review.pros.length > 0 || review.cons.length > 0) && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                              {review.pros.length > 0 && (
                                <div>
                                  <h4 className="text-sm font-medium text-green-700 mb-2">Плюсы:</h4>
                                  <ul className="space-y-1">
                                    {review.pros.map((pro, index) => (
                                      <li key={index} className="text-sm text-gray-600 flex items-center">
                                        <Icon name="Plus" className="h-3 w-3 text-green-600 mr-1" />
                                        {pro}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                              
                              {review.cons.length > 0 && (
                                <div>
                                  <h4 className="text-sm font-medium text-red-700 mb-2">Минусы:</h4>
                                  <ul className="space-y-1">
                                    {review.cons.map((con, index) => (
                                      <li key={index} className="text-sm text-gray-600 flex items-center">
                                        <Icon name="Minus" className="h-3 w-3 text-red-600 mr-1" />
                                        {con}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </div>
                          )}
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <Button variant="ghost" size="sm">
                                <Icon name="ThumbsUp" className="h-4 w-4 mr-1" />
                                Полезно ({review.helpfulVotes})
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Icon name="Flag" className="h-4 w-4 mr-1" />
                                Пожаловаться
                              </Button>
                            </div>
                            
                            {review.wouldRecommend && (
                              <Badge variant="outline" className="text-green-700 border-green-200">
                                <Icon name="ThumbsUp" className="h-3 w-3 mr-1" />
                                Рекомендует
                              </Badge>
                            )}
                          </div>
                          
                          {review.response && (
                            <div className="mt-4 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-400">
                              <div className="flex items-center mb-2">
                                <Icon name="MessageSquare" className="h-4 w-4 text-blue-600 mr-2" />
                                <span className="text-sm font-medium text-blue-800">Ответ администрации</span>
                              </div>
                              <p className="text-sm text-blue-700">{review.response.text}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 bg-white rounded-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Почему нам доверяют</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">{reviews.length}</div>
              <div className="text-gray-600">Отзывов от клиентов</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">
                {Math.round((reviews.filter(r => r.isVerified).length / reviews.length) * 100)}%
              </div>
              <div className="text-gray-600">Проверенных отзывов</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">
                {Math.round((reviews.filter(r => r.wouldRecommend).length / reviews.length) * 100)}%
              </div>
              <div className="text-gray-600">Рекомендуют нас</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">{averageRating.toFixed(1)}</div>
              <div className="text-gray-600">Средний рейтинг</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;