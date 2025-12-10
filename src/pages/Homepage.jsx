import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Shield, Truck, Award } from 'lucide-react';
import FeaturedCarousel from '../components/FeaturedCarousel';
import { featuredProducts, newArrivals, saleProducts } from '../data/products';
import { useCurrency } from '../context/CurrencyContext';

const Homepage = () => {
  const { formatPrice } = useCurrency();

  const features = [
    {
      icon: Shield,
      title: 'Premium Quality',
      description: 'Handcrafted from finest genuine leather'
    },
    {
      icon: Award,
      title: 'Expert Craftsmanship',
      description: 'Over 20 years of leather working experience'
    },
    {
      icon: Truck,
      title: 'Free Shipping',
      description: 'Free delivery on orders over ₨15,000'
    },
    {
      icon: Star,
      title: 'Customer Satisfaction',
      description: '4.8/5 rating from1000+ happy customers'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Banner */}
      <section className="relative h-[60vh] sm:h-[70vh] lg:h-[80vh] bg-gradient-to-r from-[var(--primary)] to-gray-800 flex items-center justify-center">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1551028719-00167b16eac5?w=1200&h=800&fit=crop')"
          }}
        >
          <div className="absolute inset-0 hero-gradient" />
        </div>
        
        <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6">
            Premium Leather
            <span className="block text-[var(--accent)]">Fashion</span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-200 mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed">
            Handcrafted leather jackets and accessories that blend timeless style with modern sophistication
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
            <Link
              to="/products/men-jackets"
              className="w-full sm:w-auto btn-primary px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-sm sm:text-base flex items-center justify-center space-x-2"
            >
              <span>Shop Now</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </Link>
            <Link
              to="/custom-order"
              className="w-full sm:w-auto btn-secondary px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-sm sm:text-base border-2 border-white text-white hover:bg-white hover:text-[var(--primary)]"
            >
              Custom Orders
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-8 sm:py-12 lg:py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div key={index} className="text-center p-4 sm:p-6">
                  <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-[var(--secondary)] rounded-full mb-4">
                    <IconComponent className="w-6 h-6 sm:w-8 sm:h-8 text-[var(--primary)]" />
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold text-[var(--primary)] mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600">
                    {feature.description}
                  </p>
                </div>
              )}
            )}
          </div>
        </div>
      </section>

      {/* Featured Products Carousel */}
      <FeaturedCarousel products={featuredProducts} title="Featured Products" />

      {/* New Arrivals Section */}
      <section className="py-8 sm:py-12 bg-[var(--secondary)]">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-6sm:mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-[var(--primary)] mb-2 sm:mb-4">
              New Arrivals
            </h2>
            <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
              Discover our latest collection of premium leather jackets and accessories
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {newArrivals.slice(0, 4).map((product) => (
              <Link key={product.id} to={`/product/${product.id}`} className="group">
                <div className="bg-white rounded-lg overflow-hidden product-card-shadow transition-all duration-300 group-hover:scale-105">
                  <div className="relative overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-48 sm:h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-[var(--accent)] text-[var(--primary)] px-2 py-1 rounded-md text-xs sm:text-sm font-bold">
                      NEW
                    </div>
                  </div>
                  
                  <div className="p-3 sm:p-4">
                    <h3 className="font-semibold text-sm sm:text-base text-gray-900 mb-2 group-hover:text-[var(--primary)] transition-colors">
                      {product.name}
                    </h3>
<p className="text-xs sm:text-sm text-gray-600 mb-3">
                      {product.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm sm:text-base font-bold text-[var(--primary)]">
                        {formatPrice(product.price)}
                      </span>
                      <div className="flex items-center space-x-1">
                        <Star className="w-3 h-3 sm:w-4 sm:h-4 text-[var(--accent)] fill-current" />
                        <span className="text-xs sm:text-sm text-gray-600">{product.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          
          <div className="text-center mt-6 sm:mt-8">
            <Link
              to="/products/new"
              className="inline-flex items-center space-x-2 btn-secondary px-6 sm:px-8 py-3 rounded-lg text-sm sm:text-base"
            >
              <span>View All New Arrivals</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Sale/Clearance Highlight */}
      <section className="py-8 sm:py-12 bg-gradient-to-r from-red-600 to-red-700">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2 sm:mb-4">
              🔥 MEGA SALE 🔥
            </h2>
            <p className="text-base sm:text-lg text-red-100 mb-4 sm:mb-6">
              Up to 50% OFF on selected leather jackets
            </p>
            <div className="inline-flex items-center space-x-2 bg-white text-red-600 px-4 py-2 rounded-full font-semibold text-sm sm:text-base">
              <span>Limited Time Offer</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {saleProducts.slice(0, 4).map((product) => (
              <Link key={product.id} to={`/product/${product.id}`} className="group">
                <div className="bg-white rounded-lg overflow-hidden product-card-shadow transition-all duration-300 group-hover:scale-105">
                  <div className="relative overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-48 sm:h-56 object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-red-600 text-white px-2 py-1 rounded-md text-xs sm:text-sm font-bold">
                      {product.discount}% OFF
                    </div>
                  </div>
                  
                  <div className="p-3 sm:p-4">
                    <h3 className="font-semibold text-sm sm:text-base text-gray-900 mb-2">
                      {product.name}
                    </h3>
                    
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-xs sm:text-sm text-gray-500line-through">
                        {formatPrice(product.originalPrice)}
                      </span>
                      <span className="text-sm sm:text-base font-bold text-red-600">
                        {formatPrice(product.price)}
                      </span>
                    </div>
                    
                    <p className="text-xs text-gray-600">
                      {product.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          
          <div className="text-center mt-6 sm:mt-8">
            <Link
              to="/products/sale"
              className="inline-flex items-center space-x-2 bg-white text-red-600 hover:bg-red-50 px-6 sm:px-8 py-3 rounded-lg font-semibold text-sm sm:text-base transition-colors"
            >
              <span>Shop All Sale Items</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-8 sm:py-12 lg:py-16 bg-[var(--primary)]">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 sm:mb-6">
            Ready for a Custom Leather Jacket?
          </h2>
          <p className="text-base sm:text-lg text-gray-200 mb-6 sm:mb-8 max-w-2xl mx-auto">
            Work with our master craftsmen to create a one-of-a-kind leather jacket tailored just for you
          </p>
          <Link
            to="/custom-order"
            className="inline-flex items-center space-x-2 btn-primary px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-sm sm:text-base"
          >
            <span>Start Custom Order</span>
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Homepage;