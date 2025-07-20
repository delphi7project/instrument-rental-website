import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { Link } from 'react-router-dom';

const Services = () => {
  const mainServices = [
    {
      title: 'Аренда инструментов',
      description: 'Широкий выбор профессиональных инструментов для любых задач',
      icon: 'Wrench',
      features: ['500+ инструментов', 'Все ведущие бренды', 'Гибкие тарифы', 'Техподдержка'],
      price: 'от 300₽/день'
    },
    {
      title: 'Доставка и самовывоз',
      description: 'Быстрая доставка по Москве и области, удобный самовывоз',
      icon: 'Truck',
      features: ['Доставка за 2 часа', 'Бесплатно по Москве', 'Самовывоз 24/7', 'Упаковка включена'],
      price: 'Бесплатно'
    },
    {
      title: 'Техническое обслуживание',
      description: 'Профессиональное обслуживание и ремонт инструментов',
      icon: 'Settings',
      features: ['Диагностика', 'Ремонт', 'Замена деталей', 'Гарантия качества'],
      price: 'от 500₽'
    },
    {
      title: 'Консультации',
      description: 'Помощь в выборе инструментов и планировании работ',
      icon: 'MessageCircle',
      features: ['Подбор инструментов', 'Расчёт стоимости', 'Техническая поддержка', 'Обучение'],
      price: 'Бесплатно'
    }
  ];

  const additionalServices = [
    {
      title: 'Аренда строительной техники',
      description: 'Крупногабаритное оборудование для больших проектов',
      items: ['Генераторы', 'Компрессоры', 'Строительные леса', 'Подъёмники']
    },
    {
      title: 'Расходные материалы',
      description: 'Всё необходимое для работы с арендованными инструментами',
      items: ['Диски и пилки', 'Свёрла и буры', 'Абразивы', 'Смазочные материалы']
    },
    {
      title: 'Корпоративные решения',
      description: 'Специальные условия для строительных компаний',
      items: ['Долгосрочная аренда', 'Корпоративные скидки', 'Персональный менеджер', 'Отсрочка платежа']
    }
  ];

  const pricingPlans = [
    {
      name: 'Базовый',
      description: 'Для частных лиц и разовых проектов',
      price: 'Стандартные тарифы',
      features: [
        'Аренда от 1 дня',
        'Доставка по Москве',
        'Техподдержка в рабочее время',
        'Страховка включена'
      ],
      popular: false
    },
    {
      name: 'Профессиональный',
      description: 'Для мастеров и небольших бригад',
      price: 'Скидка 10%',
      features: [
        'Всё из базового тарифа',
        'Приоритетная поддержка',
        'Скидка на долгосрочную аренду',
        'Бесплатная замена при поломке'
      ],
      popular: true
    },
    {
      name: 'Корпоративный',
      description: 'Для строительных компаний',
      price: 'Индивидуальные условия',
      features: [
        'Максимальные скидки',
        'Персональный менеджер',
        'Отсрочка платежа до 30 дней',
        'Приоритетное резервирование'
      ],
      popular: false
    }
  ];

  const workProcess = [
    {
      step: 1,
      title: 'Выбор инструмента',
      description: 'Найдите нужный инструмент в каталоге или обратитесь за консультацией'
    },
    {
      step: 2,
      title: 'Оформление заказа',
      description: 'Укажите период аренды и адрес доставки'
    },
    {
      step: 3,
      title: 'Доставка',
      description: 'Мы привезём инструмент в удобное для вас время'
    },
    {
      step: 4,
      title: 'Работа',
      description: 'Используйте инструмент для решения ваших задач'
    },
    {
      step: 5,
      title: 'Возврат',
      description: 'Мы заберём инструмент по окончании аренды'
    }
  ];

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
              <Link to="/services" className="text-blue-600 font-medium">Услуги</Link>
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

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Наши услуги</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Полный спектр услуг для успешной реализации ваших проектов. 
            От аренды инструментов до технической поддержки.
          </p>
        </div>
      </section>

      {/* Main Services */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Основные услуги</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Всё необходимое для успешного выполнения строительных и ремонтных работ
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {mainServices.map((service, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader className="text-center">
                  <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4">
                    <Icon name={service.icon as any} className="h-8 w-8 text-blue-600" />
                  </div>
                  <CardTitle className="text-lg">{service.title}</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 mb-4">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center text-sm">
                        <Icon name="Check" className="h-4 w-4 text-green-600 mr-2" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                  <div className="text-center">
                    <Badge className="bg-blue-600 text-white">{service.price}</Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Как это работает</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Простой и понятный процесс аренды инструментов
            </p>
          </div>

          <div className="relative">
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-blue-200 transform -translate-y-1/2"></div>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
              {workProcess.map((step, index) => (
                <div key={index} className="text-center relative">
                  <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 relative z-10 font-bold">
                    {step.step}
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-600">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Дополнительные услуги</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Расширенные возможности для профессионалов и крупных проектов
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {additionalServices.map((service, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle>{service.title}</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {service.items.map((item, idx) => (
                      <li key={idx} className="flex items-center text-sm">
                        <Icon name="ArrowRight" className="h-4 w-4 text-blue-600 mr-2" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full mt-4" variant="outline">
                    Подробнее
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Тарифные планы</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Выберите подходящий тариф в зависимости от ваших потребностей
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <Card key={index} className={`relative hover:shadow-lg transition-shadow ${plan.popular ? 'ring-2 ring-blue-600' : ''}`}>
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-blue-600 text-white">Популярный</Badge>
                  </div>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-xl">{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                  <div className="text-2xl font-bold text-blue-600 mt-4">{plan.price}</div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm">
                        <Icon name="Check" className="h-4 w-4 text-green-600 mr-2" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className={`w-full ${plan.popular ? 'bg-blue-600 hover:bg-blue-700' : ''}`}
                    variant={plan.popular ? 'default' : 'outline'}
                  >
                    {plan.name === 'Корпоративный' ? 'Связаться с нами' : 'Выбрать план'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Service Details Tabs */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="delivery" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="delivery">Доставка</TabsTrigger>
              <TabsTrigger value="support">Поддержка</TabsTrigger>
              <TabsTrigger value="insurance">Страхование</TabsTrigger>
              <TabsTrigger value="maintenance">Обслуживание</TabsTrigger>
            </TabsList>

            <TabsContent value="delivery" className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Icon name="Truck" className="h-6 w-6 mr-2 text-blue-600" />
                    Доставка и логистика
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-4">Зоны доставки</h3>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center">
                          <Icon name="Check" className="h-4 w-4 text-green-600 mr-2" />
                          Москва в пределах МКАД — бесплатно
                        </li>
                        <li className="flex items-center">
                          <Icon name="Check" className="h-4 w-4 text-green-600 mr-2" />
                          Подмосковье до 30 км — 500₽
                        </li>
                        <li className="flex items-center">
                          <Icon name="Check" className="h-4 w-4 text-green-600 mr-2" />
                          Подмосковье свыше 30 км — 1000₽
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-4">Время доставки</h3>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center">
                          <Icon name="Clock" className="h-4 w-4 text-blue-600 mr-2" />
                          Экспресс-доставка — 2 часа
                        </li>
                        <li className="flex items-center">
                          <Icon name="Clock" className="h-4 w-4 text-blue-600 mr-2" />
                          Стандартная — в день заказа
                        </li>
                        <li className="flex items-center">
                          <Icon name="Clock" className="h-4 w-4 text-blue-600 mr-2" />
                          Плановая — на следующий день
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="support" className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Icon name="Headphones" className="h-6 w-6 mr-2 text-blue-600" />
                    Техническая поддержка
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-4">Каналы связи</h3>
                      <ul className="space-y-3">
                        <li className="flex items-center">
                          <Icon name="Phone" className="h-4 w-4 text-green-600 mr-2" />
                          <span className="text-sm">Телефон: +7 (495) 123-45-67</span>
                        </li>
                        <li className="flex items-center">
                          <Icon name="MessageCircle" className="h-4 w-4 text-green-600 mr-2" />
                          <span className="text-sm">Онлайн-чат на сайте</span>
                        </li>
                        <li className="flex items-center">
                          <Icon name="Mail" className="h-4 w-4 text-green-600 mr-2" />
                          <span className="text-sm">Email: support@toolrental.ru</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-4">Время работы</h3>
                      <ul className="space-y-2 text-sm">
                        <li>Пн-Пт: 8:00 - 22:00</li>
                        <li>Сб-Вс: 9:00 - 21:00</li>
                        <li>Экстренная линия: 24/7</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="insurance" className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Icon name="Shield" className="h-6 w-6 mr-2 text-blue-600" />
                    Страхование и гарантии
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-4">Что покрывает страховка</h3>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center">
                          <Icon name="Check" className="h-4 w-4 text-green-600 mr-2" />
                          Поломка по вине производителя
                        </li>
                        <li className="flex items-center">
                          <Icon name="Check" className="h-4 w-4 text-green-600 mr-2" />
                          Естественный износ деталей
                        </li>
                        <li className="flex items-center">
                          <Icon name="Check" className="h-4 w-4 text-green-600 mr-2" />
                          Кража при соблюдении условий
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-4">Ответственность клиента</h3>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center">
                          <Icon name="AlertTriangle" className="h-4 w-4 text-orange-600 mr-2" />
                          Поломка по неосторожности
                        </li>
                        <li className="flex items-center">
                          <Icon name="AlertTriangle" className="h-4 w-4 text-orange-600 mr-2" />
                          Утеря инструмента
                        </li>
                        <li className="flex items-center">
                          <Icon name="AlertTriangle" className="h-4 w-4 text-orange-600 mr-2" />
                          Нарушение правил эксплуатации
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="maintenance" className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Icon name="Settings" className="h-6 w-6 mr-2 text-blue-600" />
                    Техническое обслуживание
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-4">Регулярное ТО</h3>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center">
                          <Icon name="Calendar" className="h-4 w-4 text-blue-600 mr-2" />
                          Проверка каждые 30 дней
                        </li>
                        <li className="flex items-center">
                          <Icon name="Wrench" className="h-4 w-4 text-blue-600 mr-2" />
                          Замена расходников
                        </li>
                        <li className="flex items-center">
                          <Icon name="CheckCircle" className="h-4 w-4 text-blue-600 mr-2" />
                          Калибровка и настройка
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-4">Экстренный ремонт</h3>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center">
                          <Icon name="Zap" className="h-4 w-4 text-orange-600 mr-2" />
                          Выезд мастера на объект
                        </li>
                        <li className="flex items-center">
                          <Icon name="RotateCcw" className="h-4 w-4 text-orange-600 mr-2" />
                          Замена инструмента
                        </li>
                        <li className="flex items-center">
                          <Icon name="Clock" className="h-4 w-4 text-orange-600 mr-2" />
                          Ремонт в течение 24 часов
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Готовы воспользоваться нашими услугами?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Свяжитесь с нами для получения персональной консультации и расчёта стоимости
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/catalog">
              <Button size="lg" variant="secondary">
                <Icon name="Search" className="h-5 w-5 mr-2" />
                Выбрать инструмент
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                <Icon name="Phone" className="h-5 w-5 mr-2" />
                Получить консультацию
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;