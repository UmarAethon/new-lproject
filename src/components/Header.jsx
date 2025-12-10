import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingBag, ChevronDown } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useCurrency } from '../context/CurrencyContext';
import CurrencySelector from './CurrencySelector';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(null);
  const { getTotalItems } = useCart();
  const location = useLocation();

  const navigation = {
    Men: {
      'Jackets': ['bomber', 'biker', 'puffer', 'suede', 'varsity'],
      'Coats': ['coats'],
      'Bags': ['bags'],
      'Shoes': ['shoes'],
      'Accessories': ['accessories']
    },
    Women: {
      'Jackets': ['bomber', 'biker', 'puffer', 'suede', 'varsity'],
      'Coats': ['coats'],
      'Bags': ['bags'],
      'Shoes': ['shoes'],
      'Accessories': ['accessories']
    }
  };

  const isActiveLink = (path) => {
    return location.pathname === path;
  };

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-xl sm:text-2xl font-bold text-[var(--primary)]">
              LeatherCraft
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {Object.entries(navigation).map(([category, subcategories]) => (
              <div key={category} className="relative group">
                <button
                  className="flex items-center space-x-1 text-gray-700 hover:text-[var(--primary)] transition-colors py-2"
                  onMouseEnter={() => setIsDropdownOpen(category)}
                >
                  <span className="font-medium">{category}</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
                
                {isDropdownOpen === category && (
                  <div 
                    className="absolute top-full left-0 w-64 bg-white shadow-xl rounded-lg border mt-1 py-4 z-50"
                    onMouseLeave={() => setIsDropdownOpen(null)}
                  >
                    {Object.entries(subcategories).map(([subcat, items]) => (
                      <div key={subcat} className="px-4 py-2">
                        <Link
                          to={`/products/${category.toLowerCase()}-${subcat.toLowerCase()}`}
                          className="block text-sm font-semibold text-[var(--primary)] hover:text-[var(--accent)] mb-2 transition-colors"
                        >
                          {subcat}
                        </Link>
                        <div className="grid grid-cols-2 gap-1">
                          {items.map(item => (
                            <Link
                              key={item}
                              to={`/products/${category.toLowerCase()}-${item}`}
                              className="text-xs text-gray-600 hover:text-[var(--primary)] transition-colors py-1 capitalize"
                            >
                              {item}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
            
            <Link
              to="/work"
              className={`font-medium transition-colors ${
                isActiveLink('/work') 
                  ? 'text-[var(--accent)]' 
                  : 'text-gray-700 hover:text-[var(--primary)]'
              }`}
            >
              Our Work
            </Link>
            
            <Link
              to="/custom-order"
              className={`font-medium transition-colors ${
                isActiveLink('/custom-order') 
                  ? 'text-[var(--accent)]' 
                  : 'text-gray-700 hover:text-[var(--primary)]'
              }`}
            >
              Custom Orders
            </Link>
            
            <Link
              to="/products/sale"
              className={`font-medium transition-colors ${
                isActiveLink('/products/sale') 
                  ? 'text-[var(--accent)]' 
                  : 'text-red-600 hover:text-red-800'
              }`}
            >
              Sale / Clearance
            </Link>
            
            <Link
              to="/products/gifts"
              className={`font-medium transition-colors ${
                isActiveLink('/products/gifts') 
                  ? 'text-[var(--accent)]' 
                  : 'text-gray-700 hover:text-[var(--primary)]'
              }`}
            >
              Gifts
            </Link>
          </nav>

          {/* Right Side */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            <CurrencySelector />
            
            <Link
              to="/cart"
              className="relative p-2 text-gray-700 hover:text-[var(--primary)] transition-colors"
            >
              <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6" />
              {getTotalItems() > 0 && (
                <span className="absolute -top-1 -right-1 bg-[var(--accent)] text-[var(--primary)] text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {getTotalItems()}
                </span>
              )}
            </Link>

            {/* Mobile menu button */}
            <button
              className="lg:hidden p-2 text-gray-700 hover:text-[var(--primary)] transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200">
          <div className="container mx-auto px-4 py-4 space-y-4">
            {Object.entries(navigation).map(([category, subcategories]) => (
              <div key={category}>
                <h3 className="font-semibold text-[var(--primary)] mb-2">{category}</h3>
                {Object.entries(subcategories).map(([subcat, items]) => (
                  <div key={subcat} className="mb-3">
                    <Link
                      to={`/products/${category.toLowerCase()}-${subcat.toLowerCase()}`}
                      className="block text-sm font-medium text-gray-700 hover:text-[var(--primary)] mb-1"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {subcat}
                    </Link>
                    <div className="ml-4 space-y-1">
                      {items.map(item => (
                        <Link
                          key={item}
                          to={`/products/${category.toLowerCase()}-${item}`}
                          className="block text-xs text-gray-500 hover:text-[var(--primary)] capitalize"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {item}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ))}
            
            <div className="border-t pt-4 space-y-2">
              <Link
                to="/work"
                className="block font-medium text-gray-700 hover:text-[var(--primary)]"
                onClick={() => setIsMenuOpen(false)}
              >
                Our Work
              </Link>
              <Link
                to="/custom-order"
                className="block font-medium text-gray-700 hover:text-[var(--primary)]"
                onClick={() => setIsMenuOpen(false)}
              >
                Custom Orders
              </Link>
              <Link
                to="/products/sale"
                className="block font-medium text-red-600 hover:text-red-800"
                onClick={() => setIsMenuOpen(false)}
              >
                Sale / Clearance
              </Link>
              <Link
                to="/products/gifts"
                className="block font-medium text-gray-700 hover:text-[var(--primary)]"
                onClick={() => setIsMenuOpen(false)}
              >
                Gifts
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;