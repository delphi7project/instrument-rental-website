import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';
import { Link } from 'react-router-dom';
import { db, Brand } from '@/lib/database';

const Brands = () => {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBrands();
  }, []);

  const loadBrands = async () => {
    try {
      const brandsData = db.collection('brands').find({ isActive: true });
      setBrands(brandsData);
    } catch (error) {
      console.error('Ошибка загрузки брендов:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredBrands = brands.filter(brand =>
    brand.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    brand.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    brand.country.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Icon name="Loader2" className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p>Загрузка брендов...</p>
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
              <Link to="/categories" className="text-gray-600 hover:text-blue-600 transition-colors">Категории</Link>
              <Link to="/brands" className="text-blue-600 font-medium">Бренды</Link>
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
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Бренды инструментов</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Мы работаем только с проверенными производителями профессиональных инструментов. Качество и надёжность гарантированы.
          </p>
        </div>

        {/* Search */}
        <div className="max-w-md mx-auto mb-8">
          <div className="relative">
            <Input
              placeholder="Поиск по брендам..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
            <Icon name="Search" className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
          </div>
        </div>

        {/* Brands Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBrands.map((brand) => (
            <Card key={brand._id} className="hover:shadow-lg transition-shadow cursor-pointer group">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                    <img 
                      src={brand.logo || '/img/brand-placeholder.png'} 
                      alt={brand.name}
                      className="w-12 h-12 object-contain"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.nextElementSibling!.style.display = 'flex';
                      }}
                    />
                    <div className="w-12 h-12 bg-blue-100 rounded-lg hidden items-center justify-center">
                      <Icon name="Package" className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900">{brand.name}</h3>
                    <p className="text-sm text-gray-600 flex items-center">
                      <Icon name="MapPin" className="h-4 w-4 mr-1" />
                      {brand.country}
                    </p>
                  </div>
                  <Badge className="bg-blue-100 text-blue-800">
                    {brand.toolCount} инструментов
                  </Badge>
                </div>
                
                <p className="text-gray-600 mb-4">{brand.description}</p>
                
                <div className="flex items-center justify-between">
                  <a 
                    href={brand.website} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700 text-sm flex items-center"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Icon name="ExternalLink" className="h-4 w-4 mr-1" />
                    Сайт производителя
                  </a>
                  
                  <Link to={`/catalog?brand=${encodeURIComponent(brand.name)}`}>
                    <Button size="sm" className="group-hover:bg-blue-700 transition-colors">
                      <Icon name="ArrowRight" className="h-4 w-4 mr-2" />
                      Смотреть инструменты
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredBrands.length === 0 && (
          <div className="text-center py-12">
            <Icon name="Search" className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Бренды не найдены</h3>
            <p className="text-gray-600">Попробуйте изменить поисковый запрос</p>
          </div>
        )}

        {/* Brand Stats */}
        <div className="mt-16 bg-white rounded-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Статистика брендов</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">{brands.length}</div>
              <div className="text-gray-600">Брендов в каталоге</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">
                {brands.reduce((sum, brand) => sum + brand.toolCount, 0)}
              </div>
              <div className="text-gray-600">Всего инструментов</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">
                {new Set(brands.map(brand => brand.country)).size}
              </div>
              <div className="text-gray-600">Стран-производителей</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">100%</div>
              <div className="text-gray-600">Оригинальные инструменты</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Brands;