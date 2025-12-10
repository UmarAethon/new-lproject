import React, { useState } from 'react';
import { Star, ThumbsUp, MessageSquare, Filter, ChevronDown, User, Calendar, CheckCircle } from 'lucide-react';

const Reviews = () => {
  const [selectedRating, setSelectedRating] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [showFilters, setShowFilters] = useState(false);

  const reviews = [
    {
      id: 1,
      name: 'Ahmed Hassan',
      rating: 5,
      date: '2024-01-15',
      category: 'Biker Jacket',
      title: 'Outstanding Quality and Craftsmanship',
      review: 'I ordered a custom biker jacket and was blown away by the quality. The leather is premium,stitching is perfect, and the fit is exactly what I wanted. Worth every penny!',
      verified: true,
      helpful: 24,
      images: ['https://images.unsplash.com/photo-1551028719-00167b16eac5?w=150&h=150&fit=crop']
    },
    {
      id: 2,
      name: 'Sarah Khan',
      rating: 5,
      date: '2024-01-10',
      category: 'Women\'s Jacket',
      title: 'Perfect Fit and Beautiful Design',
      review: 'Absolutely love my new leather jacket! The team was so helpful with sizing and the custom modifications. Fast shipping and excellent customer service.',
      verified: true,
      helpful: 18,
      images: []
    },
    {
      id: 3,
      name: 'Michael Roberts',
      rating: 4,
      date: '2024-01-05',
      category: 'Bomber Jacket',
      title: 'Great Quality, Minor Delay in Shipping',
      review: 'Really happy with the bomber jacket quality. Only minor issue was shipping took a bit longer than expected, but customer service kept me updated throughout.',
      verified: true,
      helpful: 12,
      images: ['https://images.unsplash.com/photo-1544966503-7cc5ac882d5c?w=150&h=150&fit=crop']
    },
    {
      id: 4,
      name: 'Fatima Ali',
      rating: 5,
      date: '2023-12-28',
      category: 'Custom Order',
      title: 'Dream Jacket Came to Life',
      review: 'I had a very specific design in mind for my jacket, and the team at LeatherCraft made it happen perfectly. The attention to detail is incredible!',
      verified: true,
      helpful: 31,
      images: ['https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=150&h=150&fit=crop']
    },
    {
      id: 5,
      name: 'David Wilson',
      rating: 5,
      date: '2023-12-20',
      category: 'Biker Jacket',
      title: 'Exceeded Expectations',
      review: 'This is my third purchase from LeatherCraft. Consistency in quality is amazing. The jackets get better with age and develop beautiful patina.',
      verified: true,
      helpful: 15,
      images: []
    },
    {
      id: 6,
      name: 'Ayesha Malik',
      rating: 4,
      date: '2023-12-15',
      category: 'Accessories',
      title: 'Beautiful Leather Bag',
      review: 'Ordered a custom leather bag for my wife. She absolutely loves it! Craftsmanship is top-notch. Only wish there were more color options.',
      verified: true,
      helpful: 9,
      images: ['https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=150&h=150&fit=crop']
    },
    {
      id: 7,
      name: 'James Thompson',
      rating: 5,
      date: '2023-12-10',
      category: 'Varsity Jacket',
      title: 'Perfect Gift Choice',
      review: 'Bought this as a gift for my son. He\'s been wearing it everywhere! The quality is outstanding and it looks even better in person.',
      verified: true,
      helpful: 22,
      images: []
    },
    {
      id: 8,
      name: 'Nadia Sheikh',
      rating: 5,
      date: '2023-12-05',
      category: 'Women\'s Jacket',
      title: 'Professional and Stylish',
      review: 'Got this jacket for work and casual wear. It\'s professional enough for the office but stylish for weekends. Great investment piece!',
      verified: true,
      helpful: 17,
      images: ['https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=150&h=150&fit=crop']
    }
  ];

  const categories = [
    { id: 'all', label: 'All Products' },
    { id: 'Biker Jacket', label: 'Biker Jackets' },
    { id: 'Bomber Jacket', label: 'Bomber Jackets' },
    { id: 'Women\'s Jacket', label: 'Women\'s Jackets' },
    { id: 'Custom Order', label: 'Custom Orders' },
    { id: 'Accessories', label: 'Accessories' },
    { id: 'Varsity Jacket', label: 'Varsity Jackets' }
  ];

  const ratingFilters = [
    { id: 'all', label: 'All Ratings' },
    { id: '5', label: '5 Stars' },
    { id: '4', label: '4 Stars' },
    { id: '3', label: '3 Stars' },
    { id: '2', label: '2 Stars' },
    { id: '1', label: '1 Star' }
  ];

  const filteredReviews = reviews.filter(review => {
    const ratingMatch = selectedRating === 'all' || review.rating.toString() === selectedRating;
    const categoryMatch = selectedCategory === 'all' || review.category === selectedCategory;
    return ratingMatch && categoryMatch;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'oldest':
        return new Date(a.date) - new Date(b.date);
      case 'rating-high':
        return b.rating - a.rating;
      case 'rating-low':
        return a.rating - b.rating;
      case 'helpful':
        return b.helpful - a.helpful;
      default: // newest
        return new Date(b.date) - new Date(a.date);
    }
  });

  const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;
  const ratingDistribution = [5, 4, 3, 2, 1].map(rating => ({
    rating,
    count: reviews.filter(r => r.rating === rating).length,
    percentage: (reviews.filter(r => r.rating === rating).length / reviews.length) * 100
  }));

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const renderStars = (rating, size = 'w-4 h-4') => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${size} ${
              star <= rating
                ? 'text-[var(--accent)] fill-current'
                : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white py-8 sm:py-12">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--primary)] mb-4">
              Customer Reviews
            </h1>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
              Read what our customers say about their LeatherCraft experience
            </p>
          </div>

          {/* Rating Summary */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-8">
            {/* Overall Rating */}
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="text-center mb-6">
                <div className="text-4xl sm:text-5xl font-bold text-[var(--primary)] mb-2">
                  {averageRating.toFixed(1)}
                </div>
                {renderStars(Math.round(averageRating), 'w-5 h-5 sm:w-6 sm:h-6')}
                <p className="text-sm sm:text-base text-gray-600 mt-2">
                  Based on {reviews.length} reviews
                </p>
              </div>
            </div>

            {/* Rating Distribution */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-semibold text-lg text-[var(--primary)] mb-4">Rating Breakdown</h3>
              <div className="space-y-2">
                {ratingDistribution.map((item) => (
                  <div key={item.rating} className="flex items-center space-x-3">
                    <span className="text-sm w-6">{item.rating}</span>
                    <Star className="w-4 h-4 text-[var(--accent)] fill-current" />
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-[var(--accent)] h-2 rounded-full transition-all duration-300"
                        style={{ width: `${item.percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-600 w-10">{item.count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-8">
        <div className="container mx-auto px-4 sm:px-6">
          {/* Filters */}
          <div className="bg-white rounded-lg shadow-md p-4 mb-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-3 sm:space-y-0sm:space-x-4">
              {/* Filter Toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2 px-3 py-2 border rounded-lg hover:bg-gray-50 transition-colors sm:hidden"
              >
                <Filter className="w-4 h-4" />
                <span className="text-sm font-medium">Filters</span>
              </button>

              {/* Desktop Filters */}
              <div className={`flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 w-full sm:w-auto ${
                showFilters ? 'block' : 'hidden sm:flex'
              }`}>
<select
                  value={selectedRating}
                  onChange={(e) => setSelectedRating(e.target.value)}
                  className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent text-sm"
                >
                  {ratingFilters.map((filter) => (
                    <option key={filter.id} value={filter.id}>
                      {filter.label}
                    </option>
                  ))}
                </select>

                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent text-sm"
                >
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent text-sm w-full sm:w-auto"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="rating-high">Highest Rating</option>
                <option value="rating-low">Lowest Rating</option>
                <option value="helpful">Most Helpful</option>
              </select>
            </div>
          </div>

          {/* Results Count */}
          <div className="mb-6">
            <p className="text-gray-600">
              Showing {filteredReviews.length} of {reviews.length} reviews
            </p>
          </div>

          {/* Reviews List */}
          {filteredReviews.length > 0 ? (
            <div className="space-y-6">
              {filteredReviews.map((review) => (
                <div key={review.id} className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4">
                    <div className="flex items-start space-x-4mb-4 sm:mb-0">
                      <div className="w-12 h-12 bg-[var(--secondary)] rounded-full flex items-center justify-center flex-shrink-0">
                        <User className="w-6 h-6 text-[var(--primary)]" />
                      </div>
                      
                      <div>
                        <div className="flex items-center space-x-2mb-1">
                          <h3 className="font-semibold text-gray-900">{review.name}</h3>
                          {review.verified && (
                            <div className="flex items-center space-x-1 text-green-600">
                              <CheckCircle className="w-4 h-4" />
                              <span className="text-xs font-medium">Verified Purchase</span>
                            </div>
                          )}
                        </div>
                        
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <Calendar className="w-4 h-4" />
                          <span>{formatDate(review.date)}</span>
                          <span>•</span>
                          <span>{review.category}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      {renderStars(review.rating)}
                      <span className="text-sm text-gray-600ml-2">{review.rating}/5</span>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 mb-2">{review.title}</h4>
                    <p className="text-gray-700 leading-relaxed">{review.review}</p>
                  </div>
                  
                  {/* Review Images */}
                  {review.images && review.images.length > 0 && (
                    <div className="flex space-x-3 mb-4">
                      {review.images.map((image, index) => (
                        <img
                          key={index}
                          src={image}
                          alt={`Review image ${index + 1}`}
                          className="w-20 h-20 object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
                        />
                      ))}
                    </div>
                  )}
                  
                  {/* Review Actions */}
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <button className="flex items-center space-x-1 hover:text-[var(--primary)] transition-colors">
                      <ThumbsUp className="w-4 h-4" />
                      <span>Helpful ({review.helpful})</span>
                    </button>
                    
                    <button className="flex items-center space-x-1 hover:text-[var(--primary)] transition-colors">
                      <MessageSquare className="w-4 h-4" />
                      <span>Reply</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">📝</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No reviews found</h3>
              <p className="text-gray-600 mb-4">Try adjusting your filters or be the first to leave a review!</p>
              <button
                onClick={() => {
                  setSelectedRating('all');
                  setSelectedCategory('all');
                }}
                className="btn-primary px-6 py-3 rounded-lg"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-8 sm:py-12 bg-[var(--primary)] text-white">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">
            Join Our Happy Customers
          </h2>
          <p className="text-base sm:text-lg text-gray-200 mb-6max-w-2xl mx-auto">
            Experience the quality and craftsmanship that our customers love. Order your perfect leather piece today.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <a
              href="/"
              className="btn-primary px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold"
            >
              Shop Now
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

export default Reviews;