import React, { useState } from 'react';
import { CheckCircle, Upload, Palette, Ruler, MessageSquare, User, Mail, Phone } from 'lucide-react';

const CustomOrder = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    productType: 'jacket',
    size: '',
    material: 'genuine-leather',
    color: '#000000',
    colorName: 'Black',
    specialInstructions: '',
    budget: '',
    timeline: ''
  });
  
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const productTypes = [
    { value: 'jacket', label: 'Leather Jacket', basePrice: '₨25,000' },
    { value: 'coat', label: 'Leather Coat', basePrice: '₨35,000' },
    { value: 'vest', label: 'Leather Vest', basePrice: '₨18,000' },
    { value: 'bag', label: 'Leather Bag', basePrice: '₨12,000' },
    { value: 'accessories', label: 'Accessories', basePrice: '₨5,000' }
  ];

  const materials = [
    { value: 'genuine-leather', label: 'Genuine Leather', premium: 0},
    { value: 'premium-cowhide', label: 'Premium Cowhide', premium: 15 },
    { value: 'lambskin', label: 'Lambskin', premium: 25 },
    { value: 'buffalo-leather', label: 'Buffalo Leather', premium: 10 },
    { value: 'suede', label: 'Suede', premium: 20 }
  ];

  const colors = [
    { name: 'Black', hex: '#000000' },
    { name: 'Brown', hex: '#8B4513' },
    { name: 'Tan', hex: '#D2B48C' },
    { name: 'Cognac', hex: '#A0522D' },
    { name: 'Navy', hex: '#000080' },
    { name: 'Burgundy', hex: '#800020' },
    { name: 'Olive', hex: '#808000' },
    { name: 'Custom', hex: 'custom' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleColorChange = (colorName, hex) => {
    setFormData(prev => ({
      ...prev,
      color: hex,
      colorName: colorName
    }));
};

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setUploadedFiles(prev => [...prev, ...files]);
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.size.trim()) newErrors.size = 'Size is required';
    if (!formData.specialInstructions.trim()) {
      newErrors.specialInstructions = 'Please provide some details about your custom order';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Simulate form submission
      setTimeout(() => {
        setIsSubmitted(true);
      }, 1000);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12">
        <div className="max-w-md w-full mx-4">
          <div className="bg-white rounded-lg shadow-xl p-6sm:p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Order Submitted!</h2>
            <p className="text-gray-600 mb-6">
              Thank you for your custom order request. Our design team will review your requirements and contact you within 24-48 hours.
            </p>
            <div className="space-y-2 text-sm text-gray-500">
              <p><strong>Order ID:</strong> CO-{Date.now()}</p>
              <p><strong>Email:</strong> {formData.email}</p>
            </div>
            <button
              onClick={() => {
                setIsSubmitted(false);
                setFormData({
                  name: '', email: '', phone: '', productType: 'jacket',
                  size: '', material: 'genuine-leather', color: '#000000',
                  colorName: 'Black', specialInstructions: '', budget: '', timeline: ''
                });
                setUploadedFiles([]);
              }}
              className="mt-6 btn-primary px-6 py-3 rounded-lg w-full"
            >
              Submit Another Order
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8sm:py-12">
      <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--primary)] mb-4">
            Custom Leather Orders
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            Create your perfect leather piece. Our master craftsmen will bring your vision to life with premium materials and expert craftsmanship.
          </p>
        </div>

        {/* Process Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
          {[
            { step: '1', title: 'Design', desc: 'Tell us your requirements' },
            { step: '2', title: 'Quote', desc: 'Get a detailed estimate' },
            { step: '3', title: 'Craft', desc: 'We create your masterpiece' }
          ].map((item, index) => (
            <div key={index} className="text-center p-4">
              <div className="w-12 h-12 bg-[var(--accent)] text-[var(--primary)] font-bold rounded-full flex items-center justify-center mx-auto mb-3">
                {item.step}
              </div>
              <h3 className="font-semibold text-lg text-[var(--primary)] mb-1">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Order Form */}
        <div className="bg-white rounded-lg shadow-xl p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
            {/* Contact Information */}
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-[var(--primary)] mb-4 sm:mb-6 flex items-center space-x-2">
                <User className="w-5 h-5 sm:w-6 sm:h-6" />
                <span>Contact Information</span>
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent input-focus ${
                      errors.name ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter your full name"
                  />
                  {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent input-focus ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="your.email@example.com"
                  />
                  {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                </div>
                
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent input-focus ${
                      errors.phone ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="+92300 1234567"
                  />
                  {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
                </div>
              </div>
            </div>

            {/* Product Details */}
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-[var(--primary)] mb-4 sm:mb-6 flex items-center space-x-2">
                <Palette className="w-5 h-5 sm:w-6 sm:h-6" />
                <span>Product Details</span>
              </h2>
              
              <div className="space-y-4 sm:space-y-6">
                {/* Product Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Product Type
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {productTypes.map((type) => (
                      <label key={type.value} className="relative">
                        <input
                          type="radio"
                          name="productType"
                          value={type.value}
                          checked={formData.productType === type.value}
                          onChange={handleInputChange}
                          className="sr-only"
                        />
                        <div className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                          formData.productType === type.value
                            ? 'border-[var(--accent)] bg-[var(--accent)] bg-opacity-10'
                            : 'border-gray-300 hover:border-[var(--primary)]'
                        }`}>
                          <div className="font-medium text-gray-900">{type.label}</div>
                          <div className="text-sm text-gray-600">From {type.basePrice}</div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Size and Material */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Size *
                    </label>
                    <select
                      name="size"
                      value={formData.size}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent input-focus ${
                        errors.size ? 'border-red-500' : 'border-gray-300'
                      }`}
                    >
                      <option value="">Select your size</option>
                      <option value="XS">XS</option>
                      <option value="S">S</option>
                      <option value="M">M</option>
                      <option value="L">L</option>
                      <option value="XL">XL</option>
                      <option value="XXL">XXL</option>
                      <option value="custom">Custom Measurements</option>
                    </select>
                    {errors.size && <p className="mt-1 text-sm text-red-600">{errors.size}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Material
                    </label>
                    <select
                      name="material"
                      value={formData.material}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent input-focus"
                    >
                      {materials.map((material) => (
                        <option key={material.value} value={material.value}>
                          {material.label} {material.premium > 0 && `(+${material.premium}%)`}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Color Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Color
                  </label>
                  <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-3 mb-4">
                    {colors.map((colorOption) => (
                      <button
                        key={colorOption.name}
                        type="button"
                        onClick={() => handleColorChange(colorOption.name, colorOption.hex)}
                        className={`w-12 h-12 rounded-lg border-2 transition-all ${
                          formData.colorName === colorOption.name
                            ? 'border-[var(--accent)] scale-110'
                            : 'border-gray-300 hover:border-[var(--primary)]'
                        }`}
                style={{
                          backgroundColor: colorOption.hex ==='custom' ? '#f3f4f6' : colorOption.hex
                        }}
                        title={colorOption.name}
>
                        {colorOption.name === 'Custom' && (
                          <span className="text-xs text-gray-600 font-medium">+</span>
                        )}
</button>
                    ))}
                  </div>
                  
                  {formData.colorName === 'Custom' && (
                    <div className="flex items-center space-x-3">
                      <input
                        type="color"
                        value={formData.color ==='custom' ? '#000000' : formData.color}
                        onChange={(e) => handleColorChange('Custom', e.target.value)}
                        className="w-12 h-12 border border-gray-300 rounded-lg"
                      />
                      <input
                        type="text"
                        placeholder="Describe your custom color"
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent input-focus"
                      />
                    </div>
                  )}
                  
                  <p className="text-sm text-gray-600 mt-2">
                    Selected: <span className="font-medium">{formData.colorName}</span>
                  </p>
                </div>

                {/* Budget and Timeline */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Budget Range
                    </label>
                    <select
                      name="budget"
                      value={formData.budget}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent input-focus"
                    >
                      <option value="">Select budget range</option>
                      <option value="15000-25000">₨15,000 - ₨25,000</option>
                      <option value="25000-40000">₨25,000 - ₨40,000</option>
                      <option value="40000-60000">₨40,000 - ₨60,000</option>
                      <option value="60000+">₨60,000+</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Timeline
                    </label>
                    <select
                      name="timeline"
                      value={formData.timeline}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent input-focus"
                    >
                      <option value="">Whendo you need it?</option>
                      <option value="2-3-weeks">2-3 weeks</option>
                      <option value="1-month">1 month</option>
                      <option value="2-months">2 months</option>
                      <option value="no-rush">No rush</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Special Instructions */}
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-[var(--primary)] mb-4 sm:mb-6 flex items-center space-x-2">
                <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6" />
                <span>Special Instructions</span>
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Detailed Description *
                  </label>
                  <textarea
                    name="specialInstructions"
                    value={formData.specialInstructions}
                    onChange={handleInputChange}
                    rows={6}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent input-focus resize-none ${
                      errors.specialInstructions ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Please describe your custom order in detail. Include any specific design elements, features, styling preferences, or inspiration images you'd like us to consider..."
                  />
                  {errors.specialInstructions && (
                    <p className="mt-1 text-sm text-red-600">{errors.specialInstructions}</p>
                  )}
                </div>
                
                {/* File Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Reference Images (Optional)
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600 mb-2">
                      Upload inspiration images or design references
                    </p>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="file-upload"
                    />
                    <label
                      htmlFor="file-upload"
                      className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer"
                    >
                      Choose Files
                    </label>
                  </div>
                  
                  {uploadedFiles.length > 0 && (
                    <div className="mt-3">
                      <p className="text-sm font-medium text-gray-700 mb-2">Uploaded Files:</p>
                      <div className="space-y-1">
                        {uploadedFiles.map((file, index) => (
                          <div key={index} className="text-sm text-gray-600 flex items-center space-x-2">
                            <span>📎</span>
                            <span>{file.name}</span>
</div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6 border-t">
              <button
                type="submit"
                className="w-full btn-primary px-8 py-4 rounded-lg font-semibold text-lg transition-all hover:shadow-lg"
              >
                Submit Custom Order Request
              </button>
              
              <p className="text-sm text-gray-600 text-center mt-4">
                Our team will review your request and contact you within 24-48 hours with a detailed quote and timeline.
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CustomOrder;