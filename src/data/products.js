export const featuredProducts = [
  {
    id: 1,
    name: 'Classic Biker Leather Jacket',
    price: 25000,
    originalPrice: 30000,
    discount: 17,
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop',
    description: 'Premium genuine leather biker jacket with asymmetrical zip closure',
    category: 'men-biker',
    rating: 4.8,
    isNew: false
  },
  {
    id: 2,
    name: 'Vintage Bomber Jacket',
    price: 22000,
    image: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5c?w=400&h=400&fit=crop',
    description: 'Stylish vintage-inspired bomber with ribbed cuffs and collar',
    category: 'men-bomber',
    rating: 4.6,
    isNew: true
  },
  {
    id: 3,
    name: 'Women\'s Cropped Leather Jacket',
    price: 28000,
    originalPrice: 35000,
    discount: 20,
    image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=400&fit=crop',
    description: 'Elegant cropped design perfect for layering over dresses',
    category: 'women-biker',
    rating: 4.9,
    isNew: false
  },
  {
    id: 4,
    name: 'Suede Trucker Jacket',
    price: 18000,
    image: 'https://images.unsplash.com/photo-1520975954732-35dd22299614?w=400&h=400&fit=crop',
    description: 'Soft suede finish with classic trucker styling',
    category: 'men-suede',
    rating: 4.5,
    isNew: true
  },
  {
    id: 5,
    name: 'Varsity Leather Jacket',
    price: 24000,
    image: 'https://images.unsplash.com/photo-1566479179817-0aa1f83ac725?w=400&h=400&fit=crop',
    description: 'Athletic-inspired design with contrasting sleeves',
    category: 'men-varsity',
    rating: 4.7,
    isNew: false
  },
  {
    id: 6,
    name: 'Puffer Leather Jacket',
    price: 32000,
    image: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5c?w=400&h=400&fit=crop',
    description: 'Warm quilted design perfect for winter weather',
    category: 'women-puffer',
    rating: 4.8,
    isNew: true
  }
];

export const newArrivals = [
  {
    id: 7,
    name: 'Modern Minimalist Jacket',
    price: 26000,
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop',
    description: 'Clean lines and contemporary styling for the modern woman',
    category: 'women-biker',
    rating: 4.7,
    isNew: true
  },
  {
    id: 8,
    name: 'Distressed Biker Jacket',
    price: 29000,
    image: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5c?w=400&h=400&fit=crop',
    description: 'Edgy distressed finish with premium hardware',
    category: 'men-biker',
    rating: 4.9,
    isNew: true
  },
  {
    id: 9,
    name: 'Luxury Lambskin Coat',
    price: 45000,
    image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=400&fit=crop',
    description: 'Buttery soft lambskin with elegant tailoring',
    category: 'women-coats',
    rating: 5.0,
    isNew: true
  },
  {
    id: 10,
    name: 'Vintage Racing Jacket',
    price: 27000,
    image: 'https://images.unsplash.com/photo-1520975954732-35dd22299614?w=400&h=400&fit=crop',
    description: 'Racing-inspired design with authentic vintage details',
    category: 'men-bomber',
    rating: 4.6,
    isNew: true
  }
];

export const saleProducts = [
  {
    id: 11,
    name: 'Classic Black Biker',
    price: 15000,
    originalPrice: 25000,
    discount: 40,
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop',
    description: 'Timeless black leather biker jacket - limited time offer',
    category: 'men-biker',
    rating: 4.5
  },
  {
    id: 12,
    name: 'Brown Vintage Bomber',
    price: 12000,
    originalPrice: 20000,
    discount: 40,
    image: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5c?w=400&h=400&fit=crop',
    description: 'Rich brown leather with vintage brass hardware',
    category: 'men-bomber',
    rating: 4.4
  },
  {
    id: 13,
    name: 'Women\'s Cognac Jacket',
    price: 18000,
    originalPrice: 30000,
    discount: 40,
    image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=400&fit=crop',
    description: 'Beautiful cognac-colored leather with gold accents',
    category: 'women-biker',
    rating: 4.7
  },
  {
    id: 14,
    name: 'Suede Western Jacket',
    price: 14000,
    originalPrice: 22000,
    discount: 36,
    image: 'https://images.unsplash.com/photo-1520975954732-35dd22299614?w=400&h=400&fit=crop',
    description: 'Western-style suede with fringe details',
    category: 'men-suede',
    rating: 4.3
  }
];

export const allProducts = [...featuredProducts, ...newArrivals, ...saleProducts];

export const getProductById = (id) => {
  return allProducts.find(product => product.id === parseInt(id));
};

export const getProductsByCategory = (category) => {
  if (category === 'sale') {
    return saleProducts;
  }
  if (category === 'gifts') {
    return featuredProducts.slice(0, 8);
  }
  return allProducts.filter(product => product.category.includes(category));
};