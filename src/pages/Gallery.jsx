import React, { useState } from 'react';
import { X, ZoomIn, Heart, Share2, ChevronLeft, ChevronRight } from 'lucide-react';

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const categories = [
    { id: 'all', label: 'All Photos' },
    { id: 'lifestyle', label: 'Lifestyle' },
    { id: 'products', label: 'Products' },
    { id: 'workshop', label: 'Workshop' },
    { id: 'customers', label: 'Customers'}
  ];

  const images = [
    {
      id: 1,
      url: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&h=600&fit=crop',
      category: 'lifestyle',
      title: 'Classic Biker Style',
      description: 'Timeless leather jacket worn in urban setting'
    },
    {
      id: 2,
      url: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5c?w=600&h=600&fit=crop',
      category: 'products',
      title: 'Premium Bomber Jacket',
      description: 'Handcrafted bomber with premium finishes'
    },
    {
      id: 3,
      url: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&h=600&fit=crop',
      category: 'lifestyle',
      title: 'Women\'s Fashion',
      description: 'Elegant cropped leather jacket styling'
    },
    {
      id: 4,
      url: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=600&fit=crop',
      category: 'workshop',
      title: 'Artisan at Work',
      description: 'Master craftsman shaping premium leather'
    },
    {
      id: 5,
      url: 'https://images.unsplash.com/photo-1520975954732-35dd22299614?w=600&h=600&fit=crop',
      category: 'products',
      title: 'Suede Collection',
      description: 'Soft suede jackets in earth tones'
    },
    {
      id: 6,
      url: 'https://images.unsplash.com/photo-1566479179817-0aa1f83ac725?w=600&h=600&fit=crop',
      category: 'lifestyle',
      title: 'Street Style',
      description: 'Varsity jacket in casual urban setting'
    },
    {
      id: 7,
      url: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&h=600&fit=crop',
      category: 'workshop',
      title: 'Traditional Tools',
      description: 'Time-honored leather working tools'
    },
    {
      id: 8,
      url: 'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=600&h=600&fit=crop',
      category: 'customers',
      title: 'Happy Customer',
      description: 'Satisfied customer with custom jacket'
    },
    {
      id: 9,
      url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=600&fit=crop',
      category: 'products',
      title: 'Leather Accessories',
      description: 'Handcrafted bags and accessories'
    },
    {
      id: 10,
      url: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=600&h=600&fit=crop',
      category: 'lifestyle',
      title: 'Vintage Inspiration',
      description: 'Classic styling meets modern design'
    },
    {
      id: 11,
      url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=600&fit=crop',
      category: 'customers',
      title: 'Customer Portrait',
      description: 'Professional wearing our leather jacket'
    },
    {
      id: 12,
      url: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=600&h=600&fit=crop',
      category: 'workshop',
      title: 'Attention to Detail',
      description: 'Precisestitching and finishing work'
    }
  ];

  const filteredImages = selectedCategory === 'all' 
    ? images 
    : images.filter(img => img.category === selectedCategory);

  const openLightbox = (image, index) => {
    setSelectedImage(image);
    setCurrentImageIndex(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    setCurrentImageIndex(0);
  };

  const navigateImage = (direction) => {
    const newIndex = direction === 'next' 
      ? (currentImageIndex + 1) % filteredImages.length
      : currentImageIndex === 0 
        ? filteredImages.length - 1 
        : currentImageIndex - 1;
    
    setCurrentImageIndex(newIndex);
    setSelectedImage(filteredImages[newIndex]);
  };

  const handleShare = (image) => {
    if (navigator.share) {
      navigator.share({
        title: image.title,
        text: image.description,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white py-8 sm:py-12 lg:py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--primary)] mb-4">
              Gallery
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto">
              Explore our collection through beautiful photography showcasing our craftsmanship, lifestyle inspirations, and satisfied customers
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-8">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm sm:text-base font-medium transition-all ${
                  selectedCategory === category.id
                    ? 'bg-[var(--primary)] text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100border border-gray-300'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>

          {/* Image Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {filteredImages.map((image, index) => (
              <div
                key={image.id}
                className="group relative bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer"
                onClick={() => openLightbox(image, index)}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={image.url}
                    alt={image.title}
                    className="w-full h-48 sm:h-56 lg:h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex space-x-3">
                      <button className="p-2 bg-white rounded-full text-gray-700 hover:text-[var(--primary)] transition-colors">
                        <ZoomIn className="w-5 h-5" />
                      </button>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleShare(image);
                        }}
                        className="p-2 bg-white rounded-full text-gray-700 hover:text-[var(--primary)] transition-colors"
                      >
                        <Share2 className="w-5 h-5" />
                      </button>
                      <button 
                        onClick={(e) => e.stopPropagation()}
                        className="p-2 bg-white rounded-full text-gray-700 hover:text-red-500 transition-colors"
                      >
                        <Heart className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="p-3 sm:p-4">
                  <h3 className="font-semibold text-sm sm:text-base text-gray-900 mb-1 group-hover:text-[var(--primary)] transition-colors">
                    {image.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600">
                    {image.description}
                  </p>
<span className="inline-block mt-2 px-2 py-1 bg-[var(--secondary)] text-xs text-[var(--primary)] rounded-md font-medium capitalize">
                    {image.category}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* No Results */}
          {filteredImages.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">📷</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No images found</h3>
              <p className="text-gray-600">Try selecting a different category</p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4">
          <div className="relative max-w-4xl max-h-full w-full">
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 p-2 bg-white bg-opacity-20 rounded-full text-white hover:bg-opacity-30 transition-all z-10"
            >
              <X className="w-6 h-6" />
            </button>
            
            {/* Navigation Buttons */}
            {filteredImages.length > 1 && (
              <>
                <button
                  onClick={() => navigateImage('prev')}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 bg-white bg-opacity-20 rounded-full text-white hover:bg-opacity-30 transition-all z-10"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                
                <button
                  onClick={() => navigateImage('next')}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 bg-white bg-opacity-20 rounded-full text-white hover:bg-opacity-30 transition-all z-10"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}
            
            {/* Image */}
            <div className="bg-white rounded-lg overflow-hidden">
              <img
                src={selectedImage.url}
                alt={selectedImage.title}
                className="w-full h-auto max-h-[70vh] object-contain"
              />
              
              {/* Image Info */}
              <div className="p-4 sm:p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                      {selectedImage.title}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600 mb-3">
                      {selectedImage.description}
                    </p>
                    <span className="inline-block px-3 py-1 bg-[var(--secondary)] text-sm text-[var(--primary)] rounded-md font-medium capitalize">
                      {selectedImage.category}
                    </span>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => handleShare(selectedImage)}
                      className="p-2 text-gray-600 hover:text-[var(--primary)] transition-colors"
                    >
                      <Share2 className="w-5 h-5" />
                    </button>
                    <button className="p-2 text-gray-600 hover:text-red-500 transition-colors">
                      <Heart className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                
                {/* Image Counter */}
                <div className="text-center mt-4 text-sm text-gray-500">
                  {currentImageIndex + 1} of {filteredImages.length}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CTA Section */}
      <section className="py-8 sm:py-12 lg:py-16 bg-[var(--primary)] text-white">
        <div className="container mx-auto px-4 sm:px-6text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
            Ready to Create Your Own Story?
          </h2>
          <p className="text-base sm:text-lg text-gray-200 mb-6 sm:mb-8 max-w-2xl mx-auto">
            Join our gallery of satisfied customers. Order your custom leather piece today.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <a
              href="/"
              className="btn-primary px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold"
            >
              Shop Collection
            </a>
            <a
              href="/custom-order"
              className="bg-white text-[var(--primary)] hover:bg-gray-100 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold transition-colors"
            >
              Custom Order
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Gallery;