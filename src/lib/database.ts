import { v4 as uuidv4 } from 'uuid';

// Типы данных
export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  role: 'customer' | 'admin';
  company?: string;
  address?: string;
  isActive: boolean;
  emailVerified: boolean;
  lastLogin?: string;
  preferences: {
    notifications: {
      email: boolean;
      sms: boolean;
      marketing: boolean;
    };
    language: string;
  };
  stats: {
    totalOrders: number;
    totalSpent: number;
    memberSince: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface Tool {
  _id: string;
  name: string;
  brand: string;
  model: string;
  category: string;
  subcategory: string;
  description: string;
  fullDescription: string;
  price: number;
  images: string[];
  specifications: Record<string, string>;
  features: string[];
  included: string[];
  condition: string;
  location: string;
  status: 'available' | 'rented' | 'maintenance' | 'retired';
  inStock: number;
  totalStock: number;
  rating: number;
  reviewCount: number;
  totalRentals: number;
  totalRevenue: number;
  lastMaintenance: string;
  nextMaintenance?: string;
  purchaseDate: string;
  purchasePrice: number;
  serialNumber?: string;
  warranty?: string;
  tags: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Order {
  _id: string;
  orderNumber: string;
  customerId?: string;
  customerInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    company?: string;
  };
  items: Array<{
    toolId: string;
    toolName: string;
    quantity: number;
    pricePerDay: number;
    days: number;
    total: number;
  }>;
  startDate: string;
  endDate: string;
  totalDays: number;
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  deposit: number;
  status: 'pending' | 'confirmed' | 'active' | 'completed' | 'cancelled' | 'overdue';
  paymentStatus: 'pending' | 'paid' | 'partial' | 'refunded';
  paymentMethod: string;
  deliveryInfo: {
    address: string;
    date: string;
    timeSlot: string;
    instructions?: string;
  };
  deliveryStatus: 'pending' | 'scheduled' | 'delivered' | 'returned';
  notes: string;
  internalNotes: string;
  timeline: Array<{
    status: string;
    timestamp: string;
    note: string;
  }>;
  notifications: {
    confirmationSent: boolean;
    reminderSent: boolean;
    overdueNotificationSent: boolean;
  };
  createdAt: string;
  updatedAt: string;
}

export interface Review {
  _id: string;
  toolId: string;
  customerId: string;
  orderId?: string;
  rating: number;
  title: string;
  comment: string;
  pros: string[];
  cons: string[];
  wouldRecommend: boolean;
  isVerified: boolean;
  isApproved: boolean;
  helpfulVotes: number;
  reportCount: number;
  response?: {
    text: string;
    author: string;
    createdAt: string;
  };
  images: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Booking {
  _id: string;
  toolId: string;
  customerId?: string;
  startDate: string;
  endDate: string;
  quantity: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'expired';
  pricePerDay: number;
  totalPrice: number;
  notes: string;
  expiresAt: string;
  confirmedAt?: string;
  cancelledAt?: string;
  cancellationReason?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  _id: string;
  name: string;
  description: string;
  image: string;
  subcategories: string[];
  toolCount: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Brand {
  _id: string;
  name: string;
  description: string;
  logo: string;
  website: string;
  country: string;
  toolCount: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface NewsArticle {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  category: string;
  tags: string[];
  isPublished: boolean;
  publishedAt: string;
  views: number;
  createdAt: string;
  updatedAt: string;
}

export interface FAQ {
  _id: string;
  question: string;
  answer: string;
  category: string;
  order: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ContactMessage {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  status: 'new' | 'in_progress' | 'resolved' | 'closed';
  assignedTo?: string;
  response?: string;
  createdAt: string;
  updatedAt: string;
}

// Файловая база данных с MongoDB-подобным API
class FileDatabase {
  private data: Map<string, any[]> = new Map();

  constructor() {
    this.initializeData();
  }

  private initializeData() {
    // Инициализация коллекций с тестовыми данными
    this.data.set('users', this.getInitialUsers());
    this.data.set('tools', this.getInitialTools());
    this.data.set('orders', this.getInitialOrders());
    this.data.set('reviews', this.getInitialReviews());
    this.data.set('bookings', this.getInitialBookings());
    this.data.set('categories', this.getInitialCategories());
    this.data.set('brands', this.getInitialBrands());
    this.data.set('news', this.getInitialNews());
    this.data.set('faqs', this.getInitialFAQs());
    this.data.set('contacts', []);
  }

  // CRUD операции
  collection(name: string) {
    if (!this.data.has(name)) {
      this.data.set(name, []);
    }
    return new Collection(this.data.get(name)!, name);
  }

  private getInitialUsers(): User[] {
    return [
      {
        _id: 'user-1',
        firstName: 'Иван',
        lastName: 'Петров',
        email: 'ivan@example.com',
        phone: '+7 (999) 123-45-67',
        password: 'hashed_password',
        role: 'customer',
        company: 'ООО "СтройТех"',
        address: 'г. Москва, ул. Ленина, 1',
        isActive: true,
        emailVerified: true,
        lastLogin: new Date().toISOString(),
        preferences: {
          notifications: { email: true, sms: false, marketing: true },
          language: 'ru'
        },
        stats: {
          totalOrders: 15,
          totalSpent: 245000,
          memberSince: '2023-01-15'
        },
        createdAt: '2023-01-15T00:00:00Z',
        updatedAt: new Date().toISOString()
      }
    ];
  }

  private getInitialTools(): Tool[] {
    return [
      {
        _id: 'tool-1',
        name: 'Перфоратор Bosch GSH 16-28',
        brand: 'Bosch',
        model: 'GSH 16-28',
        category: 'Электроинструмент',
        subcategory: 'Перфораторы',
        description: 'Профессиональный перфоратор для сверления и долбления бетона',
        fullDescription: 'Мощный профессиональный перфоратор с системой SDS-Max...',
        price: 1200,
        images: ['/img/5e130715-b755-4ab5-82af-c9e448995766.jpg'],
        specifications: {
          power: '1750W',
          weight: '11.1кг',
          voltage: '230V',
          chuckType: 'SDS-Max'
        },
        features: ['SDS-Max патрон', 'Антивибрационная система', 'LED подсветка'],
        included: ['Перфоратор', 'Кейс', 'Инструкция'],
        condition: 'excellent',
        location: 'main_warehouse',
        status: 'available',
        inStock: 5,
        totalStock: 5,
        rating: 4.8,
        reviewCount: 124,
        totalRentals: 89,
        totalRevenue: 156800,
        lastMaintenance: '2024-01-01T00:00:00Z',
        purchaseDate: '2023-01-01T00:00:00Z',
        purchasePrice: 45000,
        serialNumber: 'BSH001',
        tags: ['популярный', 'профессиональный'],
        isActive: true,
        createdAt: '2023-01-01T00:00:00Z',
        updatedAt: new Date().toISOString()
      },
      {
        _id: 'tool-2',
        name: 'Болгарка DeWalt DWE402',
        brand: 'DeWalt',
        model: 'DWE402',
        category: 'Электроинструмент',
        subcategory: 'Болгарки',
        description: 'Угловая шлифовальная машина 125мм',
        fullDescription: 'Компактная и мощная болгарка для различных работ...',
        price: 800,
        images: ['/img/cc0687bd-1892-4c49-8820-2d326de6668b.jpg'],
        specifications: {
          power: '1010W',
          weight: '2.2кг',
          diskDiameter: '125мм'
        },
        features: ['Плавный пуск', 'Защита от перегрузки'],
        included: ['Болгарка', 'Защитный кожух', 'Ключ'],
        condition: 'excellent',
        location: 'main_warehouse',
        status: 'available',
        inStock: 8,
        totalStock: 8,
        rating: 4.9,
        reviewCount: 89,
        totalRentals: 156,
        totalRevenue: 234400,
        lastMaintenance: '2024-01-01T00:00:00Z',
        purchaseDate: '2023-01-01T00:00:00Z',
        purchasePrice: 25000,
        serialNumber: 'DWT001',
        tags: ['компактный', 'мощный'],
        isActive: true,
        createdAt: '2023-01-01T00:00:00Z',
        updatedAt: new Date().toISOString()
      }
    ];
  }

  private getInitialOrders(): Order[] {
    return [
      {
        _id: 'order-1',
        orderNumber: 'ORD-001',
        customerId: 'user-1',
        customerInfo: {
          firstName: 'Иван',
          lastName: 'Петров',
          email: 'ivan@example.com',
          phone: '+7 (999) 123-45-67',
          company: 'ООО "СтройТех"'
        },
        items: [{
          toolId: 'tool-1',
          toolName: 'Перфоратор Bosch GSH 16-28',
          quantity: 1,
          pricePerDay: 1200,
          days: 3,
          total: 3600
        }],
        startDate: '2024-07-20T00:00:00Z',
        endDate: '2024-07-23T00:00:00Z',
        totalDays: 3,
        subtotal: 3600,
        tax: 720,
        discount: 0,
        total: 4320,
        deposit: 2160,
        status: 'active',
        paymentStatus: 'paid',
        paymentMethod: 'card',
        deliveryInfo: {
          address: 'г. Москва, ул. Ленина, 1',
          date: '2024-07-20T09:00:00Z',
          timeSlot: '09:00-12:00'
        },
        deliveryStatus: 'delivered',
        notes: '',
        internalNotes: '',
        timeline: [{
          status: 'pending',
          timestamp: '2024-07-18T00:00:00Z',
          note: 'Заказ создан'
        }],
        notifications: {
          confirmationSent: true,
          reminderSent: false,
          overdueNotificationSent: false
        },
        createdAt: '2024-07-18T00:00:00Z',
        updatedAt: new Date().toISOString()
      }
    ];
  }

  private getInitialReviews(): Review[] {
    return [
      {
        _id: 'review-1',
        toolId: 'tool-1',
        customerId: 'user-1',
        orderId: 'order-1',
        rating: 5,
        title: 'Отличный перфоратор!',
        comment: 'Мощный, надёжный инструмент. Отлично справляется с бетоном.',
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
      }
    ];
  }

  private getInitialBookings(): Booking[] {
    return [];
  }

  private getInitialCategories(): Category[] {
    return [
      {
        _id: 'cat-1',
        name: 'Электроинструмент',
        description: 'Профессиональные электрические инструменты',
        image: '/img/category-electric.jpg',
        subcategories: ['Перфораторы', 'Дрели', 'Болгарки', 'Лобзики'],
        toolCount: 156,
        isActive: true,
        createdAt: '2023-01-01T00:00:00Z',
        updatedAt: new Date().toISOString()
      },
      {
        _id: 'cat-2',
        name: 'Пневмоинструмент',
        description: 'Пневматические инструменты и компрессоры',
        image: '/img/category-pneumatic.jpg',
        subcategories: ['Компрессоры', 'Гайковёрты', 'Краскопульты'],
        toolCount: 45,
        isActive: true,
        createdAt: '2023-01-01T00:00:00Z',
        updatedAt: new Date().toISOString()
      }
    ];
  }

  private getInitialBrands(): Brand[] {
    return [
      {
        _id: 'brand-1',
        name: 'Bosch',
        description: 'Немецкий производитель профессиональных инструментов',
        logo: '/img/brand-bosch.png',
        website: 'https://bosch.com',
        country: 'Германия',
        toolCount: 89,
        isActive: true,
        createdAt: '2023-01-01T00:00:00Z',
        updatedAt: new Date().toISOString()
      },
      {
        _id: 'brand-2',
        name: 'DeWalt',
        description: 'Американский бренд строительных инструментов',
        logo: '/img/brand-dewalt.png',
        website: 'https://dewalt.com',
        country: 'США',
        toolCount: 67,
        isActive: true,
        createdAt: '2023-01-01T00:00:00Z',
        updatedAt: new Date().toISOString()
      }
    ];
  }

  private getInitialNews(): NewsArticle[] {
    return [
      {
        _id: 'news-1',
        title: 'Новые поступления инструментов Makita',
        slug: 'new-makita-tools',
        excerpt: 'В наш каталог добавлены новые профессиональные инструменты Makita',
        content: 'Подробное описание новых инструментов...',
        image: '/img/news-makita.jpg',
        author: 'Администратор',
        category: 'Новости',
        tags: ['Makita', 'новинки', 'инструменты'],
        isPublished: true,
        publishedAt: '2024-07-15T00:00:00Z',
        views: 245,
        createdAt: '2024-07-15T00:00:00Z',
        updatedAt: new Date().toISOString()
      }
    ];
  }

  private getInitialFAQs(): FAQ[] {
    return [
      {
        _id: 'faq-1',
        question: 'Как работает аренда инструментов?',
        answer: 'Вы выбираете инструмент, указываете период аренды, мы доставляем и забираем.',
        category: 'Общие вопросы',
        order: 1,
        isActive: true,
        createdAt: '2023-01-01T00:00:00Z',
        updatedAt: new Date().toISOString()
      },
      {
        _id: 'faq-2',
        question: 'Какие документы нужны для аренды?',
        answer: 'Паспорт и залог. Размер залога указан в карточке товара.',
        category: 'Документы',
        order: 2,
        isActive: true,
        createdAt: '2023-01-01T00:00:00Z',
        updatedAt: new Date().toISOString()
      }
    ];
  }
}

class Collection {
  constructor(private data: any[], private name: string) {}

  find(query: any = {}): any[] {
    return this.data.filter(item => this.matchesQuery(item, query));
  }

  findOne(query: any = {}): any | null {
    return this.find(query)[0] || null;
  }

  findById(id: string): any | null {
    return this.findOne({ _id: id });
  }

  insertOne(document: any): any {
    const newDoc = {
      _id: uuidv4(),
      ...document,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    this.data.push(newDoc);
    return newDoc;
  }

  insertMany(documents: any[]): any[] {
    return documents.map(doc => this.insertOne(doc));
  }

  updateOne(query: any, update: any): boolean {
    const index = this.data.findIndex(item => this.matchesQuery(item, query));
    if (index === -1) return false;

    this.data[index] = {
      ...this.data[index],
      ...update,
      updatedAt: new Date().toISOString()
    };
    return true;
  }

  updateMany(query: any, update: any): number {
    let count = 0;
    this.data.forEach((item, index) => {
      if (this.matchesQuery(item, query)) {
        this.data[index] = {
          ...item,
          ...update,
          updatedAt: new Date().toISOString()
        };
        count++;
      }
    });
    return count;
  }

  deleteOne(query: any): boolean {
    const index = this.data.findIndex(item => this.matchesQuery(item, query));
    if (index === -1) return false;
    this.data.splice(index, 1);
    return true;
  }

  deleteMany(query: any): number {
    const initialLength = this.data.length;
    this.data = this.data.filter(item => !this.matchesQuery(item, query));
    return initialLength - this.data.length;
  }

  countDocuments(query: any = {}): number {
    return this.find(query).length;
  }

  private matchesQuery(item: any, query: any): boolean {
    for (const [key, value] of Object.entries(query)) {
      if (typeof value === 'object' && value !== null) {
        if (value.$regex) {
          const regex = new RegExp(value.$regex, value.$options || 'i');
          if (!regex.test(item[key])) return false;
        } else if (value.$in) {
          if (!value.$in.includes(item[key])) return false;
        } else if (value.$gte !== undefined) {
          if (item[key] < value.$gte) return false;
        } else if (value.$lte !== undefined) {
          if (item[key] > value.$lte) return false;
        }
      } else {
        if (item[key] !== value) return false;
      }
    }
    return true;
  }
}

// Экспорт единственного экземпляра базы данных
export const db = new FileDatabase();