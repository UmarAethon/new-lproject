import React from 'react';
import { Link } from 'react-router-dom';
import { Plus, Minus, X, ShoppingBag, ArrowRight, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useCurrency } from '../context/CurrencyContext';

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, getTotalPrice, getTotalItems } = useCart();
  const { formatPrice } = useCurrency();

  const shippingCost = getTotalPrice() > 15000 ? 0 : 500;
  const totalWithShipping = getTotalPrice() + shippingCost;

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-8sm:py-12">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-md mx-auto text-center">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="w-12 h-12 text-gray-400" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              Your Cart is Empty
            </h1>
            <p className="text-gray-600 mb-8">
              Looks like you haven't added any items to your cart yet. Start exploring our premium leather collection!
            </p>
            <Link
              to="/"
              className="inline-flex items-center space-x-2 btn-primary px-6 py-3 rounded-lg font-semibold"
            >
              <span>Continue Shopping</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6 sm:py-8">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-6sm:mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-[var(--primary)] mb-2">
              Shopping Cart
            </h1>
            <p className="text-gray-600">
              {getTotalItems()} item{getTotalItems() !== 1 ? 's' : ''} in your cart
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
                  {cartItems.map((item) => (
                    <div key={`${item.id}-${item.size}`} className="flex flex-col sm:flex-row gap-4 pb-4 sm:pb-6border-b border-gray-200 last:border-b-0">
                      {/* Product Image */}
                      <div className="flex-shrink-0">
                        <Link to={`/product/${item.id}`}>
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full sm:w-24 h-48 sm:h-24 object-cover rounded-lg hover:opacity-90 transition-opacity"
                          />
                        </Link>
                      </div>

                      {/* Product Details */}
                      <div className="flex-1space-y-3">
                        <div className="flex justify-between">
                          <div>
                            <Link 
                              to={`/product/${item.id}`}
                              className="font-semibold text-gray-900 hover:text-[var(--primary)] transition-colors block mb-1"
                            >
                              {item.name}
                            </Link>
                            <p className="text-sm text-gray-600">Size: {item.size}</p>
                            {item.originalPrice && (
                              <div className="flex items-center space-x-2 mt-1">
                                <span className="text-sm text-gray-500 line-through">
                                  {formatPrice(item.originalPrice)}
                                </span>
                                <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-md font-semibold">
                                  {item.discount}% OFF
                                </span>
                              </div>
                            )}
                          </div>
                          
                          <div className="flex flex-col items-end space-y-2">
                            <button
                              onClick={() => removeFromCart(item.id, item.size)}
                              className="text-gray-400 hover:text-red-500 transition-colors"
                              title="Remove item"
                            >
                              <X className="w-5 h-5" />
                            </button>
                            <button
                              className="text-gray-400 hover:text-red-500 transition-colors"
                              title="Move to wishlist"
                            >
                              <Heart className="w-5 h-5" />
                            </button>
                          </div>
                        </div>

                        {/* Quantity and Price */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center border rounded-lg">
                            <button
                              onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                              className="p-2 hover:bg-gray-50 transition-colors"
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="px-4 py-2 font-medium min-w-[3rem] text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                              className="p-2 hover:bg-gray-50 transition-colors"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                          
                          <div className="text-right">
                            <div className="font-bold text-lg text-[var(--primary)]">
                              {formatPrice(item.price * item.quantity)}
                            </div>
                            <div className="text-sm text-gray-600">
                              {formatPrice(item.price)} each
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Continue Shopping */}
              <div className="mt-6">
                <Link
                  to="/"
                  className="inline-flex items-center space-x-2 text-[var(--primary)] hover:text-[var(--accent)] font-medium transition-colors"
                >
                  <ArrowRight className="w-4 h-4 rotate-180" />
                  <span>Continue Shopping</span>
                </Link>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 sticky top-24">
                <h2 className="text-xl font-bold text-[var(--primary)] mb-4">
                  Order Summary
                </h2>
                
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between text-gray-700">
                    <span>Subtotal ({getTotalItems()} items)</span>
                    <span>{formatPrice(getTotalPrice())}</span>
                  </div>
                  
                  <div className="flex justify-between text-gray-700">
                    <span>Shipping</span>
                    <span className={shippingCost === 0 ? 'text-green-600' : ''}>
                      {shippingCost === 0 ? 'Free' : formatPrice(shippingCost)}
                    </span>
                  </div>
                  
                  {shippingCost > 0 && (
                    <div className="text-sm text-gray-600 bg-blue-50 p-3 rounded-lg">
                      💡 Add {formatPrice(15000 - getTotalPrice())} more for free shipping!
                    </div>
                  )}
                  
                  <div className="border-t pt-3">
                    <div className="flex justify-between text-lg font-bold text-[var(--primary)]">
                      <span>Total</span>
                      <span>{formatPrice(totalWithShipping)}</span>
                    </div>
                  </div>
                </div>

                {/* Promo Code */}
                <div className="mb-4">
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      placeholder="Promo code"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent text-sm"
                    />
                    <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium">
                      Apply
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Use code HOLIDAY for free gift!
                  </p>
                </div>

                {/* Checkout Button */}
                <Link
                  to="/checkout"
                  className="w-full btn-primary px-6 py-4 rounded-lg font-semibold text-center block mb-3"
                >
                  Proceed to Checkout
                </Link>
                
                {/* Additional Options */}
                <div className="space-y-2text-center">
                  <Link
                    to="/custom-order"
                    className="w-full btn-secondary px-4 py-3 rounded-lg font-medium text-center block text-sm"
                  >
                    Need Something Custom?
                  </Link>
                  
                  <p className="text-xs text-gray-600">
                    Secure checkout with SSL encryption
                  </p>
                </div>

                {/* Features */}
                <div className="mt-6 pt-4 border-t space-y-3">
                  <div className="flex items-center space-x-3 text-sm text-gray-600">
                    <span className="text-green-500">✓</span>
                    <span>Free returns within 30 days</span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm text-gray-600">
                    <span className="text-green-500">✓</span>
                    <span>1-year craftsmanship warranty</span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm text-gray-600">
                    <span className="text-green-500">✓</span>
                    <span>Premium gift packaging included</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;