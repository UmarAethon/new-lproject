import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { CreditCard, Truck, Shield, CheckCircle, User, MapPin, Phone, Mail } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useCurrency } from '../context/CurrencyContext';

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, getTotalPrice, getTotalItems, clearCart } = useCart();
  const { formatPrice, currency, setCurrency, currencies } = useCurrency();
  
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'Pakistan',
    paymentMethod: 'cod',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    saveInfo: false,
    terms: false
  });
  
  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState('');

  const shippingCost = getTotalPrice() > 15000 ? 0 : 500;
  const totalWithShipping = getTotalPrice() + shippingCost;

  // Redirect if cart is empty
  React.useEffect(() => {
    if (cartItems.length === 0 && !orderComplete) {
      navigate('/cart');
    }
  }, [cartItems, navigate, orderComplete]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.postalCode.trim()) newErrors.postalCode = 'Postal code is required';
    
    if (formData.paymentMethod === 'card') {
      if (!formData.cardNumber.trim()) newErrors.cardNumber = 'Card number is required';
      if (!formData.expiryDate.trim()) newErrors.expiryDate = 'Expiry date is required';
      if (!formData.cvv.trim()) newErrors.cvv = 'CVV is required';
    }
    
    if (!formData.terms) newErrors.terms = 'Please accept the terms and conditions';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsProcessing(true);
    
    // Simulate order processing
    try {
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Generate order ID
      const newOrderId = `LC-${Date.now()}`;
      setOrderId(newOrderId);
      
      // Clear cart and show success
      clearCart();
      setOrderComplete(true);
} catch (error) {
      alert('Order processing failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12">
        <div className="max-w-md w-full mx-4">
          <div className="bg-white rounded-lg shadow-xl p-6sm:p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Order Confirmed!
            </h2>
            
            <p className="text-gray-600 mb-6">
              Thank you for your purchase! Your order has been successfully placed.
            </p>
            
            <div className="bg-gray-50 rounded-lg p-4 mb-6 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium">Order ID:</span>
                <span className="text-[var(--primary)] font-mono">{orderId}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-medium">Total:</span>
                <span className="font-bold">{formatPrice(totalWithShipping)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-medium">Email:</span>
                <span>{formData.email}</span>
              </div>
            </div>
            
            <div className="space-y-3">
              <p className="text-sm text-gray-600">
                A confirmation email has been sent to {formData.email}
              </p>
              
              <div className="space-y-2">
                <Link
                  to="/"
                  className="w-full btn-primary px-6 py-3 rounded-lg block text-center"
                >
                  Continue Shopping
                </Link>
                
                <Link
                  to="/about"
                  className="w-full btn-secondary px-6 py-3 rounded-lg block text-center"
                >
                  Track Your Order
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isProcessing) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[var(--accent)] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Processing Your Order</h2>
          <p className="text-gray-600">Please wait while we confirm your payment...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6 sm:py-8">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-[var(--primary)] mb-2">
              Checkout
            </h1>
            <div className="flex items-center space-x-2text-sm text-gray-600">
              <Link to="/cart" className="hover:text-[var(--primary)]">Cart</Link>
              <span>→</span>
              <span className="font-medium">Checkout</span>
            </div>
          </div>

<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {/* Checkout Form */}
            <div className="space-y-6">
              {/* Contact Information */}
              <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
                <h2 className="text-lg sm:text-xl font-bold text-[var(--primary)] mb-4 flex items-center space-x-2">
                  <User className="w-5 h-5" />
                  <span>Contact Information</span>
                </h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent ${
                        errors.email ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="your.email@example.com"
/>
                    {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        First Name *
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent ${
                          errors.firstName ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {errors.firstName && <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent ${
                          errors.lastName ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {errors.lastName && <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent ${
                        errors.phone ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="+92 300 1234567"
                    />
                    {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
                <h2 className="text-lg sm:text-xl font-bold text-[var(--primary)] mb-4 flex items-center space-x-2">
                  <MapPin className="w-5 h-5" />
                  <span>Shipping Address</span>
                </h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Address *
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent ${
                        errors.address ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Street address"
                    />
                    {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address}</p>}
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        City *
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent ${
                          errors.city ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {errors.city && <p className="mt-1 text-sm text-red-600">{errors.city}</p>}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Postal Code *
                      </label>
                      <input
                        type="text"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleInputChange}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent ${
                          errors.postalCode ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {errors.postalCode && <p className="mt-1 text-sm text-red-600">{errors.postalCode}</p>}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Country
                    </label>
                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent"
                    >
                      <option value="Pakistan">Pakistan</option>
                      <option value="India">India</option>
                      <option value="UAE">United Arab Emirates</option>
                      <option value="UK">United Kingdom</option>
                      <option value="USA">United States</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
                <h2 className="text-lg sm:text-xl font-bold text-[var(--primary)] mb-4 flex items-center space-x-2">
                  <CreditCard className="w-5 h-5" />
                  <span>Payment Method</span>
                </h2>
                
                <div className="space-y-4">
                  <div className="space-y-3">
                    <label className="flex items-center space-x-3p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="cod"
                        checked={formData.paymentMethod === 'cod'}
                        onChange={handleInputChange}
                        className="text-[var(--accent)]">
                      </input>
                      <div className="flex-1">
                        <div className="font-medium">Cash on Delivery</div>
                        <div className="text-sm text-gray-600">Pay when you receive your order</div>
                      </div>
                    </label>
                    
                    <label className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="card"
                        checked={formData.paymentMethod === 'card'}
                        onChange={handleInputChange}
                        className="text-[var(--accent)]">
                      </input>
                      <div className="flex-1">
                        <div className="font-medium">Credit/Debit Card</div>
                        <div className="text-sm text-gray-600">Secure payment with SSL encryption</div>
                      </div>
                    </label>
                    
                    <label className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="bank"
                        checked={formData.paymentMethod === 'bank'}
                        onChange={handleInputChange}
                        className="text-[var(--accent)]">
                      </input>
                      <div className="flex-1">
                        <div className="font-medium">Bank Transfer</div>
                        <div className="text-sm text-gray-600">Direct bank transfer</div>
                      </div>
                    </label>
                  </div>
                  
                  {formData.paymentMethod === 'card' && (
                    <div className="space-y-4pt-4border-t">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Card Number *
                        </label>
                        <input
                          type="text"
                          name="cardNumber"
                          value={formData.cardNumber}
                          onChange={handleInputChange}
                          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent ${
                            errors.cardNumber ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="1234 5678 9012 3456"
                        />
                        {errors.cardNumber && <p className="mt-1 text-sm text-red-600">{errors.cardNumber}</p>}
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Expiry Date *
                          </label>
                          <input
                            type="text"
                            name="expiryDate"
                            value={formData.expiryDate}
                            onChange={handleInputChange}
                            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent ${
                              errors.expiryDate ? 'border-red-500' : 'border-gray-300'
                            }`}
                            placeholder="MM/YY"
                          />
                          {errors.expiryDate && <p className="mt-1 text-sm text-red-600">{errors.expiryDate}</p>}
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            CVV *
                          </label>
                          <input
                            type="text"
                            name="cvv"
                            value={formData.cvv}
                            onChange={handleInputChange}
                            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent ${
                              errors.cvv ? 'border-red-500' : 'border-gray-300'
                            }`}
                            placeholder="123"
                          />
                          {errors.cvv && <p className="mt-1 text-sm text-red-600">{errors.cvv}</p>}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Terms and Submit */}
              <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
                <div className="space-y-4">
                  <label className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      name="saveInfo"
                      checked={formData.saveInfo}
                      onChange={handleInputChange}
                      className="mt-1 text-[var(--accent)]"
                    />
                    <span className="text-sm text-gray-700">
                      Save this information for next time
                    </span>
                  </label>
                  
                  <label className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      name="terms"
                      checked={formData.terms}
                      onChange={handleInputChange}
                      className={`mt-1 text-[var(--accent)] ${
                        errors.terms ? 'border-red-500' : ''
                      }`}
                    />
                    <span className="text-sm text-gray-700">
                      I agree to the <Link to="/terms" className="text-[var(--accent)] hover:underline">Terms and Conditions</Link> and <Link to="/privacy" className="text-[var(--accent)] hover:underline">Privacy Policy</Link>
                    </span>
                  </label>
                  {errors.terms && <p className="text-sm text-red-600">{errors.terms}</p>}
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:order-first">
              <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 sticky top-24">
                <h2 className="text-lg sm:text-xl font-bold text-[var(--primary)] mb-4">
                  Order Summary
                </h2>
                
                {/* Currency Selector */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Currency
                  </label>
                  <select
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent"
                  >
                    {Object.entries(currencies).map(([code, { symbol }]) => (
                      <option key={code} value={code}>
                        {code} ({symbol})
                      </option>
                    ))}
                  </select>
                </div>
                
                {/* Cart Items */}
                <div className="space-y-3 mb-4 max-h-60 overflow-y-auto">
                  {cartItems.map((item) => (
                    <div key={`${item.id}-${item.size}`} className="flex space-x-3 p-3 bg-gray-50 rounded-lg">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm text-gray-900 truncate">
                          {item.name}
                        </h4>
                        <p className="text-xs text-gray-600">
                          Size: {item.size} | Qty: {item.quantity}
                        </p>
                        <p className="text-sm font-bold text-[var(--primary)]">
                          {formatPrice(item.price * item.quantity)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Totals */}
                <div className="space-y-2 pb-4 border-b">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal ({getTotalItems()} items)</span>
                    <span>{formatPrice(getTotalPrice())}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Shipping</span>
                    <span className={shippingCost === 0 ? 'text-green-600' : ''}>
                      {shippingCost === 0 ? 'Free' : formatPrice(shippingCost)}
                    </span>
                  </div>
                  <div className="flex justify-between text-lg font-bold text-[var(--primary)] pt-2">
                    <span>Total</span>
                    <span>{formatPrice(totalWithShipping)}</span>
                  </div>
                </div>
                
                {/* Place Order Button */}
                <button
                  onClick={handleSubmit}
                  disabled={isProcessing}
                  className="w-full btn-primary px-6 py-4 rounded-lg font-semibold text-lg mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isProcessing ? 'Processing...' : `Place Order • ${formatPrice(totalWithShipping)}`}
                </button>
                
                {/* Security Features */}
                <div className="mt-4 pt-4 border-t space-y-2">
                  <div className="flex items-center space-x-2text-xs text-gray-600">
                    <Shield className="w-4 h-4" />
                    <span>SSL Secure Checkout</span>
                  </div>
                  <div className="flex items-center space-x-2 text-xs text-gray-600">
                    <Truck className="w-4 h-4" />
                    <span>Free shipping over ₨15,000</span>
                  </div>
                  <div className="flex items-center space-x-2 text-xs text-gray-600">
                    <CheckCircle className="w-4 h-4" />
                    <span>30-day return guarantee</span>
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

export default Checkout;