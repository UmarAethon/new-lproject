import React, { useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { Filter, Grid, List, ChevronDown } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { getProductsByCategory, allProducts } from '../data/products';

const ProductListing = () => {
  const { category } = useParams();
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState('grid');

  const products = useMemo(() => {
    let filteredProducts = category ? getProductsByCategory(category) : allProducts;
    
    // Apply price filter
    if (priceRange !== 'all') {
      const [min, max] = priceRange.split('-').map(Number);
      filteredProducts = filteredProducts.filter(product => {
        if (max){
          return product.price >= min && product.price <= max;
        }
        return product.price >= min;
      });
    }
    
    // Apply sorting
    switch (sortBy) {
      case 'price-low':
        return [...filteredProducts].sort((a, b) => a.price - b.price);
      case 'price-high':
        return [...filteredProducts].sort((a, b) => b.price - a.price);
      case 'rating':
        return [...filteredProducts].sort((a, b) => (b.rating || 0) - (a.rating || 0));
      case 'newest':
        return [...filteredProducts].sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
      default:
        return filteredProducts;
    }
  }, [category, sortBy, priceRange]);

  const getCategoryTitle = () => {
    if (!category) return 'All Products';
    
    const categoryMap = {
      'sale': 'Sale & Clearance',
      'gifts': 'Gift Ideas',
      'men-jackets': 'Men\'s Jackets',
      'women-jackets': 'Women\'s Jackets',
      'men-bomber': 'Men\'s Bomber Jackets',
      'men-biker': 'Men\'s Biker Jackets',
      'men-puffer': 'Men\'s Puffer Jackets',
      'men-suede': 'Men\'s Suede Jackets',
      'men-varsity': 'Men\'s Varsity Jackets',
      'women-bomber': 'Women\'s Bomber Jackets',
      'women-biker': 'Women\'s Biker Jackets',
      'women-puffer': 'Women\'s Puffer Jackets',
      'women-suede': 'Women\'s Suede Jackets',
      'women-varsity': 'Women\'s Varsity Jackets'
    };
    
    return categoryMap[category] || category.charAt(0).toUpperCase() + category.slice(1);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6 sm:py-8">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[var(--primary)] mb-2">
            {getCategoryTitle()}
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            {products.length} product{products.length !== 1 ? 's' : ''} found
          </p>
        </div>

        {/* Filters and Sort Bar */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
            {/* Filter Toggle and View Mode */}
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2 px-3 py-2 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Filter className="w-4 h-4" />
                <span className="text-sm font-medium">Filters</span>
              </button>
              
              <div className="flex items-center space-x-1border rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded transition-colors ${
                    viewMode === 'grid' ? 'bg-[var(--primary)] text-white' : 'hover:bg-gray-100'
                  }`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded transition-colors ${
                    viewMode === 'list' ? 'bg-[var(--primary)] text-white' : 'hover:bg-gray-100'
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Sort Dropdown */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-white border rounded-lg px-4 py-2 pr-8 focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent text-sm"
              >
                <option value="featured">Featured</option>
                <option value="newest">Newest First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
            </div>
          </div>

          {/* Expandable Filters */}
          {showFilters && (
            <div className="mt-4 pt-4 border-t space-y-4">
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Price Range</h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    { label: 'All Prices', value: 'all' },
                    { label:'Under ₨20,000', value: '0-20000' },
                    { label: '₨20,000 - ₨30,000', value: '20000-30000' },
                    { label: '₨30,000 - ₨40,000', value: '30000-40000' },
                    { label: 'Above ₨40,000', value: '40000' }
                  ].map((range) => (
                    <button
                      key={range.value}
                      onClick={() => setPriceRange(range.value)}
                      className={`px-3 py-1 text-sm rounded-full border transition-colors ${
                        priceRange === range.value
                          ? 'bg-[var(--primary)] text-white border-[var(--primary)]'
                          : 'bg-white text-gray-700 border-gray-300 hover:border-[var(--primary)]'
                      }`}
                    >
                      {range.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Products Grid/List */}
        {products.length > 0 ? (
          <div className={`${
            viewMode === 'grid' 
              ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4sm:gap-6' 
              : 'space-y-4'
          }`}>
            {products.map((product) => (
              <div key={product.id} className={viewMode === 'list' ? 'w-full' : ''}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your filters or browse our featured products</p>
            <button
              onClick={() => {
                setSortBy('featured');
                setPriceRange('all');
}}
              className="btn-primary px-6 py-3 rounded-lg"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductListing;