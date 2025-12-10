import React from 'react';
import { Link } from 'react-router-dom';
import { useCurrency } from '../context/CurrencyContext';

const ProductCard = ({ product }) => {
  const { formatPrice } = useCurrency();

  return (
    <Link to={`/product/${product.id}`} className="group">
      <div className="bg-white rounded-lg overflow-hidden product-card-shadow transition-all duration-300 group-hover:scale-105">
        <div className="relative overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-48 sm:h-64 object-cover transition-transform duration-300 group-hover:scale-110"
          />
          {product.discount && (
            <div className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-red-600 text-white px-2 py-1 rounded-md text-xs sm:text-sm font-bold">
              {product.discount}% OFF
            </div>
          )}
          {product.isNew && (
            <div className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-[var(--accent)] text-[var(--primary)] px-2 py-1 rounded-md text-xs sm:text-sm font-bold">
              NEW
            </div>
          )}
        </div>
        
        <div className="p-3 sm:p-4">
          <h3 className="font-semibold text-sm sm:text-base text-gray-900mb-2 line-clamp-2 group-hover:text-[var(--primary)] transition-colors">
            {product.name}
          </h3>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {product.originalPrice && (
                <span className="text-xs sm:text-sm text-gray-500 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
              <span className="text-sm sm:text-base font-bold text-[var(--primary)]">
                {formatPrice(product.price)}
              </span>
            </div>
            
            {product.rating && (
              <div className="flex items-center space-x-1">
                <span className="text-xs sm:text-sm text-[var(--accent)]">★</span>
                <span className="text-xs sm:text-sm text-gray-600">{product.rating}</span>
              </div>
            )}
          </div>
          
          {product.description && (
            <p className="text-xs sm:text-sm text-gray-600 mt-2 line-clamp-2">
              {product.description}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;