import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Star, ShoppingBag, Heart, Share2, Ruler, Shield, Truck, RotateCcw, Plus, Minus, ZoomIn } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useCurrency } from '../context/CurrencyContext';
import { getProductById, allProducts } from '../data/products';
import ProductCard from '../components/ProductCard';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = getProductById(id);
  const { addToCart } = useCart();
  const { formatPrice } = useCurrency();
  
  const [selectedSize, setSelectedSize] = useState('M');
  const [quantity, setQuantity] = useState(1);
  const [showSizeChart, setShowSizeChart] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Product Not Found</h2>
          <p className="text-gray-600mb-4">The product you're looking for doesn't exist.</p>
          <button 
            onClick={() => navigate('/')}
            className="btn-primary px-6 py-3 rounded-lg"
          >
            Return Home
          </button>
        </div>
      </div>
    );
  }

  const images = [
    product.image,
    'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1544966503-7cc5ac882d5c?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&h=600&fit=crop'
  ];

  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  const relatedProducts = allProducts.filter(p => p.id !== product.id && p.category === product.category).slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product, selectedSize);
    // Show success message (could be a toast notification)
    alert(`Added ${product.name} (Size: ${selectedSize}) to cart!`);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.description,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Product link copied to clipboard!');
    }
  };

  const features = [
    { icon: Shield, text: 'Genuine Leather Guarantee' },
    { icon: Truck, text: 'Free Shipping Over ₨15,000' },
    { icon: RotateCcw, text: '30-Day Return Policy' },
    { icon: Ruler, text: 'Custom Sizing Available' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6py-6sm:py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
          <Link to="/" className="hover:text-[var(--primary)]">Home</Link>
          <span>/</span>
          <Link to={`/products/${product.category}`} className="hover:text-[var(--primary)] capitalize">
            {product.category.replace('-', ' ')}
          </Link>
          <span>/</span>
          <span className="text-gray-900font-medium">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8sm:gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative group">
              <img
                src={images[selectedImage]}
                alt={product.name}
                className="w-full h-96 sm:h-[500px] object-cover rounded-lg shadow-lg"
              />
              <button
                onClick={() => setShowImageModal(true)}
                className="absolute top-4 right-4 p-2 bg-white bg-opacity-80 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <ZoomIn className="w-5 h-5" />
              </button>

              {product.discount && (
                <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-md font-bold">
                  {product.discount}% OFF
                </div>
              )}
            </div>
            
            <div className="flex space-x-3overflow-x-auto">
              {images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                    selectedImage === index ? 'border-[var(--accent)]' : 'border-gray-200'
                  }`}
                >
                  <img src={img} alt={`View ${index + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[var(--primary)] mb-2">
                {product.name}
              </h1>
              
              {product.rating && (
                <div className="flex items-center space-x-2 mb-4">
                  <div className="flex items-center space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-4 h-4 ${
                          star <= Math.floor(product.rating)
                            ? 'text-[var(--accent)] fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
</div>
                  <span className="text-sm text-gray-600">({product.rating})</span>
                  <span className="text-sm text-gray-400">•</span>
                  <span className="text-sm text-gray-600">150+ reviews</span>
                </div>
              )}
            </div>

            {/* Price */}
            <div className="flex items-center space-x-3">
              {product.originalPrice && (
                <span className="text-xl text-gray-500 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
              <span className="text-2xl sm:text-3xl font-bold text-[var(--primary)]">
                {formatPrice(product.price)}
              </span>
              {product.discount && (
                <span className="bg-red-100 text-red-600 px-2 py-1 rounded-md text-sm font-semibold">
                  Save {formatPrice(product.originalPrice - product.price)}
                </span>
              )}
            </div>

            {/* Description */}
            <div>
              <h3 className="font-semibold text-lg mb-2">Description</h3>
              <p className="text-gray-700 leading-relaxed">
                {product.description || 'Premium leather jacket crafted with attention to detail. Made from the finest materials for durability and style. Perfect for any occasion, from casual outings to special events.'}
              </p>
            </div>

            {/* Size Selection */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-lg">Size</h3>
                <button
                  onClick={() => setShowSizeChart(true)}
                  className="text-sm text-[var(--accent)] hover:underline flex items-center space-x-1"
                >
                  <Ruler className="w-4 h-4" />
                  <span>Size Chart</span>
                </button>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-12 border-2 rounded-lg font-medium transition-all ${
                      selectedSize === size
                        ? 'border-[var(--accent)] bg-[var(--accent)] text-[var(--primary)]'
                        : 'border-gray-300 hover:border-[var(--primary)] text-gray-700'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <h3 className="font-semibold text-lg mb-3">Quantity</h3>
              <div className="flex items-center space-x-3">
                <div className="flex items-center border rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 hover:bg-gray-50"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 py-2 font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 hover:bg-gray-50"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <span className="text-sm text-gray-600">In Stock</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={handleAddToCart}
                className="w-full btn-primary px-8 py-4 rounded-lg font-semibold text-lg flex items-center justify-center space-x-2"
              >
                <ShoppingBag className="w-5 h-5" />
                <span>Add to Cart</span>
              </button>
              
              <div className="flex space-x-3">
                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={`flex-1 border-2 px-4 py-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2 ${
                    isWishlisted
                      ? 'border-red-500 text-red-500 bg-red-50'
                      : 'border-gray-300 text-gray-700 hover:border-[var(--primary)]'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
                  <span>Wishlist</span>
                </button>
                
                <button
                  onClick={handleShare}
                  className="flex-1 border-2 border-gray-300 text-gray-700 hover:border-[var(--primary)] px-4 py-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
                >
                  <Share2 className="w-5 h-5" />
                  <span>Share</span>
                </button>
              </div>
              
              <Link
                to="/custom-order"
                className="w-full btn-secondary px-8 py-3 rounded-lg font-medium text-center block"
              >
                Request Custom Version
              </Link>
            </div>

            {/* Features */}
            <div className="space-y-3 pt-6 border-t">
              {features.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <div key={index} className="flex items-center space-x-3">
                    <IconComponent className="w-5 h-5 text-[var(--accent)]" />
                    <span className="text-sm text-gray-700">{feature.text}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mt-12 sm:mt-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-[var(--primary)] mb-6sm:mb-8">
              Related Products
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Size Chart Modal */}
      {showSizeChart && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold">Size Chart</h3>
                <button
                  onClick={() => setShowSizeChart(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
×
                </button>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2">Size</th>
                      <th className="text-left py-2">Chest (inches)</th>
                      <th className="text-left py-2">Length (inches)</th>
                      <th className="text-left py-2">Shoulder (inches)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { size: 'XS', chest: '34-36', length: '25', shoulder: '16' },
                      { size: 'S', chest: '36-38', length: '26', shoulder: '17' },
                      { size: 'M', chest: '38-40', length: '27', shoulder: '18' },
                      { size: 'L', chest: '40-42', length: '28', shoulder: '19' },
                      { size: 'XL', chest: '42-44', length: '29', shoulder: '20' },
                      { size: 'XXL', chest: '44-46', length: '30', shoulder: '21' }
                    ].map((row) => (
                      <tr key={row.size} className="border-b">
                        <td className="py-2 font-medium">{row.size}</td>
                        <td className="py-2">{row.chest}</td>
                        <td className="py-2">{row.length}</td>
                        <td className="py-2">{row.shoulder}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Image Modal */}
      {showImageModal && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4">
          <div className="relative max-w-4xl max-h-full">
            <button
              onClick={() => setShowImageModal(false)}
              className="absolute top-4 right-4 text-white text-2xl font-bold bg-black bg-opacity-50 rounded-full w-10 h-10 flex items-center justify-center"
            >
              ×
            </button>
<img
              src={images[selectedImage]}
              alt={product.name}
              className="max-w-full max-h-full object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;