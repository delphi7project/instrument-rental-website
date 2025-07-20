import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Icon from '@/components/ui/icon';
import { Link } from 'react-router-dom';
import { db, ContactMessage } from '@/lib/database';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Сохраняем сообщение в базу данных
      const message: Omit<ContactMessage, '_id' | 'createdAt' | 'updatedAt'> = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        subject: formData.subject,
        message: formData.message,
        status: 'new'
      };

      db.collection('contacts').insertOne(message);
      
      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      console.error('Ошибка отправки сообщения:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      title: 'Телефон',
      value: '+7 (495) 123-45-67',
      description: 'Ежедневно с 8:00 до 22:00',
      icon: 'Phone',
      action: 'tel:+74951234567'
    },
    {
      title: 'Email',
      value: 'info@toolrental.ru',
      description: 'Ответим в течение часа',
      icon: 'Mail',
      action: 'mailto:info@toolrental.ru'
    },
    {
      title: 'Адрес',
      value: 'г. Москва, ул. Строителей, 15',
      description: 'Главный офис и склад',
      icon: 'MapPin',
      action: 'https://maps.google.com'
    },
    {
      title: 'Режим работы',
      value: 'Пн-Вс: 8:00 - 22:00',
      description: 'Без выходных и праздников',
      icon: 'Clock',
      action: null
    }
  ];

  const departments = [
    'Общие вопросы',
    'Техническая поддержка',
    'Бронирование и заказы',
    'Жалобы и предложения',
    'Партнёрство',
    'Другое'
  ];

  const faqs = [
    {
      question: 'Как быстро вы отвечаете на обращения?',
      answer: 'Мы стараемся отвечать на все обращения в течение 1 часа в рабочее время.'
    },
    {
      question: 'Можно ли заказать обратный звонок?',
      answer: 'Да, оставьте заявку через форму, и мы перезвоним вам в удобное время.'
    },
    {
      question: 'Работаете ли вы в выходные?',
      answer: 'Да, мы работаем 7 дней в неделю, включая праздники.'
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
              <Link to="/about" className="text-gray-600 hover:text-blue-600 transition-colors">О нас</Link>
              <Link to="/contact" className="text-blue-600 font-medium">Контакты</Link>
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
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Свяжитесь с нами</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Мы всегда готовы ответить на ваши вопросы и помочь выбрать подходящий инструмент для вашего проекта
          </p>
        </div>

        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {contactInfo.map((info, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4">
                  <Icon name={info.icon as any} className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{info.title}</h3>
                {info.action ? (
                  <a 
                    href={info.action} 
                    className="text-blue-600 hover:text-blue-700 font-medium block mb-1"
                  >
                    {info.value}
                  </a>
                ) : (
                  <p className="text-gray-900 font-medium mb-1">{info.value}</p>
                )}
                <p className="text-sm text-gray-600">{info.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Отправить сообщение</CardTitle>
                <CardDescription>
                  Заполните форму, и мы свяжемся с вами в ближайшее время
                </CardDescription>
              </CardHeader>
              <CardContent>
                {submitted && (
                  <Alert className="mb-6 border-green-200 bg-green-50">
                    <Icon name="CheckCircle" className="h-4 w-4 text-green-600" />
                    <AlertDescription className="text-green-800">
                      Спасибо за обращение! Мы получили ваше сообщение и ответим в ближайшее время.
                    </AlertDescription>
                  </Alert>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Имя *</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        placeholder="Ваше имя"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Телефон</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+7 (___) ___-__-__"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subject">Тема обращения *</Label>
                      <Select value={formData.subject} onValueChange={(value) => setFormData({...formData, subject: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите тему" />
                        </SelectTrigger>
                        <SelectContent>
                          {departments.map(dept => (
                            <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Сообщение *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      placeholder="Опишите ваш вопрос или пожелание..."
                      rows={5}
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Icon name="Loader2" className="h-4 w-4 mr-2 animate-spin" />
                        Отправляем...
                      </>
                    ) : (
                      <>
                        <Icon name="Send" className="h-4 w-4 mr-2" />
                        Отправить сообщение
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Additional Info */}
          <div className="space-y-8">
            {/* Map */}
            <Card>
              <CardHeader>
                <CardTitle>Как нас найти</CardTitle>
                <CardDescription>
                  Наш главный офис и склад находятся в центре Москвы
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center mb-4">
                  <div className="text-center">
                    <Icon name="MapPin" className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-600">Интерактивная карта</p>
                    <p className="text-sm text-gray-500">г. Москва, ул. Строителей, 15</p>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <p className="flex items-center">
                    <Icon name="Car" className="h-4 w-4 mr-2 text-blue-600" />
                    Парковка для клиентов
                  </p>
                  <p className="flex items-center">
                    <Icon name="Train" className="h-4 w-4 mr-2 text-blue-600" />
                    5 минут от метро "Строительная"
                  </p>
                  <p className="flex items-center">
                    <Icon name="Truck" className="h-4 w-4 mr-2 text-blue-600" />
                    Удобный подъезд для грузового транспорта
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* FAQ */}
            <Card>
              <CardHeader>
                <CardTitle>Частые вопросы</CardTitle>
                <CardDescription>
                  Ответы на популярные вопросы о связи с нами
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {faqs.map((faq, index) => (
                  <div key={index} className="border-b border-gray-100 pb-4 last:border-b-0">
                    <h4 className="font-medium text-gray-900 mb-2">{faq.question}</h4>
                    <p className="text-sm text-gray-600">{faq.answer}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Emergency Contact */}
            <Card className="bg-red-50 border-red-200">
              <CardHeader>
                <CardTitle className="text-red-800 flex items-center">
                  <Icon name="AlertTriangle" className="h-5 w-5 mr-2" />
                  Экстренная связь
                </CardTitle>
                <CardDescription className="text-red-700">
                  Для срочных вопросов по активным заказам
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-red-800 font-medium">
                    Горячая линия: +7 (495) 123-45-68
                  </p>
                  <p className="text-sm text-red-700">
                    Работает круглосуточно для экстренных случаев
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Social Media */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Мы в социальных сетях</h2>
          <div className="flex justify-center space-x-6">
            <Button variant="outline" size="lg" className="flex items-center space-x-2">
              <Icon name="MessageCircle" className="h-5 w-5" />
              <span>Telegram</span>
            </Button>
            <Button variant="outline" size="lg" className="flex items-center space-x-2">
              <Icon name="Phone" className="h-5 w-5" />
              <span>WhatsApp</span>
            </Button>
            <Button variant="outline" size="lg" className="flex items-center space-x-2">
              <Icon name="Mail" className="h-5 w-5" />
              <span>Email</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;