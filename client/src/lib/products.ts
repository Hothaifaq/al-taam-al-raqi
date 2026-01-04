export interface Product {
  id: string;
  name: string;
  category: 'كنافة نابلسية' | 'كنافة بالقشطة' | 'كنافة شوكولاتة';
  description: string;
  image: string;
  prices: {
    'صحن': number;
    'نصف كيلو': number;
    'كيلو': number;
  };
  featured: boolean;
}

export const products: Product[] = [
  {
    id: 'kunafa-nablusi-1',
    name: 'كنافة نابلسية تقليدية',
    category: 'كنافة نابلسية',
    description: 'كنافة نابلسية أصلية بالجبن الفلسطيني والعسل الطبيعي، مصنوعة يدويًا بأفضل المكونات',
    image: '/images/kunafa-hero-1.jpg',
    prices: {
      'صحن': 25,
      'نصف كيلو': 50,
      'كيلو': 95,
    },
    featured: true,
  },
  {
    id: 'kunafa-nablusi-2',
    name: 'كنافة نابلسية بالفستق',
    category: 'كنافة نابلسية',
    description: 'كنافة نابلسية مع فستق حلبي محمص، طعم فاخر وغني',
    image: '/images/kunafa-hero-3.jpg',
    prices: {
      'صحن': 30,
      'نصف كيلو': 60,
      'كيلو': 115,
    },
    featured: true,
  },
  {
    id: 'kunafa-cream-1',
    name: 'كنافة بالقشطة الفاخرة',
    category: 'كنافة بالقشطة',
    description: 'كنافة بالقشطة الطازجة والعسل، حشوة غنية وناعمة',
    image: '/images/kunafa-hero-1.jpg',
    prices: {
      'صحن': 28,
      'نصف كيلو': 55,
      'كيلو': 105,
    },
    featured: true,
  },
  {
    id: 'kunafa-cream-2',
    name: 'كنافة بالقشطة والفستق',
    category: 'كنافة بالقشطة',
    description: 'كنافة بالقشطة مع فستق حلبي، مزيج فاخر من الطعم والملمس',
    image: '/images/kunafa-hero-3.jpg',
    prices: {
      'صحن': 32,
      'نصف كيلو': 65,
      'كيلو': 125,
    },
    featured: false,
  },
  {
    id: 'kunafa-chocolate-1',
    name: 'كنافة بالشوكولاتة البلجيكية',
    category: 'كنافة شوكولاتة',
    description: 'كنافة بالشوكولاتة البلجيكية الفاخرة والجوز، طعم حلو وغني',
    image: '/images/kunafa-hero-2.jpg',
    prices: {
      'صحن': 30,
      'نصف كيلو': 60,
      'كيلو': 115,
    },
    featured: true,
  },
  {
    id: 'kunafa-chocolate-2',
    name: 'كنافة بالشوكولاتة والفستق',
    category: 'كنافة شوكولاتة',
    description: 'كنافة بالشوكولاتة الداكنة والفستق الحلبي، مزيج متوازن',
    image: '/images/kunafa-hero-2.jpg',
    prices: {
      'صحن': 35,
      'نصف كيلو': 70,
      'كيلو': 135,
    },
    featured: false,
  },
];

export const categories = [
  'كنافة نابلسية',
  'كنافة بالقشطة',
  'كنافة شوكولاتة',
];

export const sizes = ['صحن', 'نصف كيلو', 'كيلو'] as const;
