import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { Link } from 'react-router-dom';
import { db, FAQ as FAQType } from '@/lib/database';

const FAQ = () => {
  const [faqs, setFaqs] = useState<FAQType[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFAQs();
  }, []);

  const loadFAQs = async () => {
    try {
      // Добавляем тестовые FAQ
      const testFAQs: FAQType[] = [
        {
          _id: 'faq-1',
          question: 'Как работает аренда инструментов?',
          answer: 'Вы выбираете нужный инструмент на сайте, указываете период аренды и адрес доставки. Мы привозим инструмент в удобное время и забираем после окончания аренды.',
          category: 'Общие вопросы',
          order: 1,
          isActive: true,
          createdAt: '2023-01-01T00:00:00Z',
          updatedAt: new Date().toISOString()
        },
        {
          _id: 'faq-2',
          question: 'Какие документы нужны для аренды?',
          answer: 'Для аренды необходим паспорт и залог. Размер залога зависит от стоимости инструмента и указан в карточке товара.',
          category: 'Документы',
          order: 2,
          isActive: true,
          createdAt: '2023-01-01T00:00:00Z',
          updatedAt: new Date().toISOString()
        },
        {
          _id: 'faq-3',
          question: 'Что если инструмент сломается?',
          answer: 'Все инструменты застрахованы. При поломке по вине арендатора взимается стоимость ремонта. Если поломка произошла из-за износа - ремонт за наш счет.',
          category: 'Страхование',
          order: 3,
          isActive: true,
          createdAt: '2023-01-01T00:00:00Z',
          updatedAt: new Date().toISOString()
        },
        {
          _id: 'faq-4',
          question: 'Можно ли продлить аренду?',
          answer: 'Да, аренду можно продлить. Свяжитесь с нами по телефону или в личном кабинете минимум за день до окончания текущего периода.',
          category: 'Аренда',
          order: 4,
          isActive: true,
          createdAt: '2023-01-01T00:00:00Z',
          updatedAt: new Date().toISOString()
        },
        {
          _id: 'faq-5',
          question: 'Работаете ли вы в выходные?',
          answer: 'Да, мы работаем 7 дней в неделю. Доставка в выходные дни осуществляется с 9:00 до 20:00.',
          category: 'Доставка',
          order: 5,
          isActive: true,
          createdAt: '2023-01-01T00:00:00Z',
          updatedAt: new Date().toISOString()
        },
        {
          _id: 'faq-6',
          question: 'Как рассчитывается стоимость аренды?',
          answer: 'Стоимость рассчитывается исходя из цены за день аренды, умноженной на количество дней и количество инструментов. Действуют скидки при долгосрочной аренде.',
          category: 'Оплата',
          order: 6,
          isActive: true,
          createdAt: '2023-01-01T00:00:00Z',
          updatedAt: new Date().toISOString()
        },
        {
          _id: 'faq-7',
          question: 'Какие способы оплаты доступны?',
          answer: 'Мы принимаем оплату банковскими картами, наличными при получении, а также работаем по безналичному расчёту для юридических лиц.',
          category: 'Оплата',
          order: 7,
          isActive: true,
          createdAt: '2023-01-01T00:00:00Z',
          updatedAt: new Date().toISOString()
        },
        {
          _id: 'faq-8',
          question: 'Предоставляете ли вы инструкцию по использованию?',
          answer: 'Да, с каждым инструментом предоставляется инструкция по эксплуатации. Также наши специалисты могут провести краткий инструктаж.',
          category: 'Безопасность',
          order: 8,
          isActive: true,
          createdAt: '2023-01-01T00:00:00Z',
          updatedAt: new Date().toISOString()
        },
        {
          _id: 'faq-9',
          question: 'Что входит в комплект поставки?',
          answer: 'В комплект входит сам инструмент, необходимые аксессуары, кейс или сумка для переноски, инструкция по эксплуатации.',
          category: 'Комплектация',
          order: 9,
          isActive: true,
          createdAt: '2023-01-01T00:00:00Z',
          updatedAt: new Date().toISOString()
        },
        {
          _id: 'faq-10',
          question: 'Можно ли забронировать инструмент заранее?',
          answer: 'Да, вы можете забронировать инструмент на любую дату. Бронирование бесплатно и действует 24 часа.',
          category: 'Бронирование',
          order: 10,
          isActive: true,
          createdAt: '2023-01-01T00:00:00Z',
          updatedAt: new Date().toISOString()
        }
      ];

      // Сохраняем в базу данных
      testFAQs.forEach(faq => {
        const existing = db.collection('faqs').findById(faq._id);
        if (!existing) {
          db.collection('faqs').insertOne(faq);
        }
      });

      const faqsData = db.collection('faqs').find({ isActive: true });
      setFaqs(faqsData.sort((a, b) => a.order - b.order));
    } catch (error) {
      console.error('Ошибка загрузки FAQ:', error);
    } finally {
      setLoading(false);
    }
  };

  const categories = ['Все', ...new Set(faqs.map(faq => faq.category))];

  const filteredFAQs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const getFAQsByCategory = (category: string) => {
    if (category === 'Все') return filteredFAQs;
    return filteredFAQs.filter(faq => faq.category === category);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Icon name="Loader2" className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p>Загрузка FAQ...</p>
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
              <Link to="/faq" className="text-blue-600 font-medium">FAQ</Link>
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

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Часто задаваемые вопросы</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ответы на популярные вопросы о нашем сервисе аренды инструментов. 
            Не нашли ответ? Обратитесь в службу поддержки.
          </p>
        </div>

        {/* Search */}
        <div className="mb-8">
          <div className="relative max-w-md mx-auto">
            <Input
              placeholder="Поиск по вопросам..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
            <Icon name="Search" className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
          </div>
        </div>

        {/* FAQ Tabs */}
        <Tabs defaultValue="Все" className="w-full">
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6 mb-8">
            {categories.slice(0, 6).map((category) => (
              <TabsTrigger key={category} value={category} className="text-xs">
                {category}
              </TabsTrigger>
            ))}
          </TabsList>

          {categories.map((category) => (
            <TabsContent key={category} value={category}>
              <Card>
                <CardHeader>
                  <CardTitle>
                    {category === 'Все' ? 'Все вопросы' : category}
                  </CardTitle>
                  <CardDescription>
                    {getFAQsByCategory(category).length} вопросов в этой категории
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    {getFAQsByCategory(category).map((faq) => (
                      <AccordionItem key={faq._id} value={faq._id}>
                        <AccordionTrigger className="text-left">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-gray-600">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>

        {filteredFAQs.length === 0 && (
          <div className="text-center py-12">
            <Icon name="HelpCircle" className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Вопросы не найдены</h3>
            <p className="text-gray-600 mb-6">Попробуйте изменить поисковый запрос или обратитесь в поддержку</p>
            <Link to="/contact">
              <Button>
                <Icon name="MessageCircle" className="h-4 w-4 mr-2" />
                Задать вопрос
              </Button>
            </Link>
          </div>
        )}

        {/* Contact Support */}
        <Card className="mt-12 bg-blue-50 border-blue-200">
          <CardContent className="p-8 text-center">
            <Icon name="MessageCircle" className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Не нашли ответ на свой вопрос?</h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Наша служба поддержки работает 7 дней в неделю и готова помочь вам с любыми вопросами
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button size="lg">
                  <Icon name="Mail" className="h-5 w-5 mr-2" />
                  Написать в поддержку
                </Button>
              </Link>
              <Button size="lg" variant="outline">
                <Icon name="Phone" className="h-5 w-5 mr-2" />
                +7 (495) 123-45-67
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Popular Questions */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Самые популярные вопросы</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {faqs.slice(0, 4).map((faq) => (
              <Card key={faq._id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-2">{faq.question}</h3>
                  <p className="text-sm text-gray-600 mb-3">
                    {faq.answer.substring(0, 100)}...
                  </p>
                  <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700 p-0">
                    Читать полный ответ
                    <Icon name="ArrowRight" className="h-4 w-4 ml-1" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;