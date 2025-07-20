import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';
import { Link } from 'react-router-dom';

const About = () => {
  const stats = [
    { label: 'Лет на рынке', value: '8+', icon: 'Calendar' },
    { label: 'Довольных клиентов', value: '5000+', icon: 'Users' },
    { label: 'Инструментов в каталоге', value: '500+', icon: 'Wrench' },
    { label: 'Выполненных заказов', value: '15000+', icon: 'Package' }
  ];

  const team = [
    {
      name: 'Алексей Иванов',
      position: 'Генеральный директор',
      experience: '12 лет в строительной отрасли',
      image: '/img/team-1.jpg',
      description: 'Основатель компании с большим опытом в сфере строительства и аренды оборудования.'
    },
    {
      name: 'Мария Петрова',
      position: 'Технический директор',
      experience: '8 лет в области инструментов',
      image: '/img/team-2.jpg',
      description: 'Отвечает за техническое состояние и качество всех инструментов в нашем парке.'
    },
    {
      name: 'Дмитрий Сидоров',
      position: 'Руководитель отдела продаж',
      experience: '6 лет в продажах',
      image: '/img/team-3.jpg',
      description: 'Помогает клиентам выбрать оптимальные решения для их проектов.'
    }
  ];

  const values = [
    {
      title: 'Качество',
      description: 'Мы предоставляем только исправные и проверенные инструменты',
      icon: 'Shield'
    },
    {
      title: 'Надёжность',
      description: 'Соблюдаем все договорённости и сроки доставки',
      icon: 'Clock'
    },
    {
      title: 'Профессионализм',
      description: 'Наша команда состоит из опытных специалистов',
      icon: 'Award'
    },
    {
      title: 'Клиентоориентированность',
      description: 'Всегда готовы помочь и найти индивидуальное решение',
      icon: 'Heart'
    }
  ];

  const milestones = [
    { year: '2016', event: 'Основание компании', description: 'Начали с 20 инструментов и одного склада' },
    { year: '2018', event: 'Расширение парка', description: 'Увеличили ассортимент до 100 инструментов' },
    { year: '2020', event: 'Онлайн-платформа', description: 'Запустили сайт для онлайн-бронирования' },
    { year: '2022', event: 'Новый склад', description: 'Открыли второй склад в Подмосковье' },
    { year: '2024', event: 'Цифровизация', description: 'Внедрили современную систему управления' }
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
              <Link to="/about" className="text-blue-600 font-medium">О нас</Link>
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

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">О компании ToolRental</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Мы — ведущая компания по аренде профессиональных инструментов в Москве. 
              Уже 8 лет помогаем строителям, ремонтникам и частным лицам решать любые задачи.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4">
                  <Icon name={stat.icon as any} className="h-8 w-8 text-blue-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Наша миссия</h2>
              <p className="text-lg text-gray-700 mb-6">
                Мы делаем профессиональные инструменты доступными для каждого. Наша цель — 
                предоставить качественное оборудование по справедливой цене с максимальным 
                уровнем сервиса.
              </p>
              <p className="text-gray-600 mb-8">
                Мы понимаем, что покупка дорогостоящих инструментов не всегда оправдана, 
                особенно для разовых проектов. Поэтому мы создали сервис, который позволяет 
                арендовать любой инструмент быстро, удобно и выгодно.
              </p>
              <Link to="/catalog">
                <Button size="lg">
                  <Icon name="ArrowRight" className="h-5 w-5 mr-2" />
                  Посмотреть каталог
                </Button>
              </Link>
            </div>
            <div className="relative">
              <img 
                src="/img/a1f08a16-886e-4eb0-836e-611ef0c78857.jpg" 
                alt="Наша команда" 
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Наши ценности</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Принципы, которыми мы руководствуемся в работе с каждым клиентом
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
                <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4">
                  <Icon name={value.icon as any} className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Наша команда</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Профессионалы с многолетним опытом в сфере строительства и аренды оборудования
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="text-center overflow-hidden">
                <div className="relative">
                  <div className="w-full h-64 bg-gray-200 flex items-center justify-center">
                    <Icon name="User" className="h-24 w-24 text-gray-400" />
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-blue-600 font-medium mb-2">{member.position}</p>
                  <Badge variant="outline" className="mb-4">{member.experience}</Badge>
                  <p className="text-gray-600 text-sm">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">История развития</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Путь от небольшой компании до лидера рынка аренды инструментов
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-blue-200"></div>
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div key={index} className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8'}`}>
                    <Card className="p-6">
                      <div className="flex items-center space-x-2 mb-2">
                        <Badge className="bg-blue-600">{milestone.year}</Badge>
                        <h3 className="font-bold text-gray-900">{milestone.event}</h3>
                      </div>
                      <p className="text-gray-600">{milestone.description}</p>
                    </Card>
                  </div>
                  <div className="relative z-10">
                    <div className="w-4 h-4 bg-blue-600 rounded-full border-4 border-white shadow"></div>
                  </div>
                  <div className="w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Quality Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Контроль качества</h2>
              <p className="text-gray-700 mb-6">
                Каждый инструмент проходит тщательную проверку перед выдачей клиенту. 
                Мы регулярно проводим техническое обслуживание и заменяем изношенные детали.
              </p>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Техническая исправность</span>
                    <span className="text-sm text-gray-600">100%</span>
                  </div>
                  <Progress value={100} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Удовлетворённость клиентов</span>
                    <span className="text-sm text-gray-600">98%</span>
                  </div>
                  <Progress value={98} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Своевременная доставка</span>
                    <span className="text-sm text-gray-600">96%</span>
                  </div>
                  <Progress value={96} className="h-2" />
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <Card className="p-6 text-center">
                <Icon name="CheckCircle" className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h3 className="font-bold text-gray-900 mb-2">Сертификация</h3>
                <p className="text-sm text-gray-600">Все инструменты сертифицированы</p>
              </Card>
              
              <Card className="p-6 text-center">
                <Icon name="Settings" className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="font-bold text-gray-900 mb-2">Обслуживание</h3>
                <p className="text-sm text-gray-600">Регулярное ТО каждые 30 дней</p>
              </Card>
              
              <Card className="p-6 text-center">
                <Icon name="Shield" className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <h3 className="font-bold text-gray-900 mb-2">Страхование</h3>
                <p className="text-sm text-gray-600">Полная страховка включена</p>
              </Card>
              
              <Card className="p-6 text-center">
                <Icon name="Headphones" className="h-12 w-12 text-orange-600 mx-auto mb-4" />
                <h3 className="font-bold text-gray-900 mb-2">Поддержка</h3>
                <p className="text-sm text-gray-600">Техподдержка 24/7</p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Готовы начать работу с нами?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Присоединяйтесь к тысячам довольных клиентов, которые уже оценили качество наших услуг
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
                Связаться с нами
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;