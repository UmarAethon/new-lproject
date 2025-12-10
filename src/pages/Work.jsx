import React from 'react';
import { Scissors, Hammer, Star, Package, Truck, Shield } from 'lucide-react';

const Work = () => {
  const steps = [
    {
      icon: Scissors,
      title: 'Design & Cutting',
      description: 'Each piece begins with carefully selecting premium leather and creating precise patterns using traditional techniques.',
      image: '/api/placeholder/400/300'
    },
    {
      icon: Hammer,
      title: 'Expert Craftsmanship',
      description: 'Our skilled artisans hand-stitch every seam with attention to detail, ensuring durability and perfect fit.',
      image: '/api/placeholder/400/300'
    },
    {
      icon: Star,
      title: 'Quality Control',
      description: 'Every jacket undergoes rigorous quality checks to meet our high standards before reaching your hands.',
      image: '/api/placeholder/400/300'
    },
    {
      icon: Package,
      title: 'Careful Packaging',
      description: 'Your jacket is carefully packaged with protective materials to ensure it arrives in perfect condition.',
      image: '/api/placeholder/400/300'
    }
  ];

  const features = [
    {
      icon: Shield,
      title: 'Premium Materials',
      description: 'We source only the finest leather from trusted suppliers worldwide.'
    },
    {
      icon: Hammer,
      title: 'Handcrafted Excellence',
      description: 'Every piece is meticulously crafted by experienced leather artisans.'
    },
    {
      icon: Truck,
      title: 'Worldwide Shipping',
      description: 'Safe and secure delivery to customers around the globe.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-[var(--primary)] text-white py-12 sm:py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
            Our Craftsmanship Process
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Discover how we transform premium leather into timeless pieces through traditional techniques and modern innovation.
          </p>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-12 sm:py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 sm:mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
              From Concept to Creation
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
              Every LeatherCraft piece follows a meticulous process that combines traditional craftsmanship with modern quality standards.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-10 md:gap-12">
            {steps.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <div key={index} className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[var(--accent)] rounded-full flex items-center justify-center">
                      <IconComponent className="w-8 h-8 sm:w-10 sm:h-10 text-[var(--primary)]" />
                    </div>
                  </div>
                  <div className="flex-1 text-center sm:text-left">
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
                      {step.title}
                    </h3>
                    <p className="text-base sm:text-lg text-gray-600 leading-relaxed mb-4 sm:mb-6">
                      {step.description}
                    </p>
                    <div className="w-full max-w-sm mx-auto sm:mx-0">
                      <img 
                        src={step.image} 
                        alt={step.title}
                        className="w-full h-48 sm:h-56 md:h-64 object-cover rounded-lg shadow-lg"
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-12 sm:py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 sm:mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
              Why Choose LeatherCraft?
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
              Our commitment to excellence is reflected in every aspect of our work, from material selection to final delivery.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div key={index} className="text-center p-6 sm:p-8 bg-gray-50 rounded-xl hover:shadow-lg transition-shadow duration-300">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[var(--accent)] rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                    <IconComponent className="w-8 h-8 sm:w-10 sm:h-10 text-[var(--primary)]" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-base text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-[var(--primary)] text-white py-12 sm:py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">
            Ready to Experience Premium Craftsmanship?
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-6 sm:mb-8 max-w-2xl mx-auto">
            Browse our collection of handcrafted leather jackets and find the perfect piece that reflects your style.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <button className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-[var(--accent)] text-[var(--primary)] font-semibold rounded-lg hover:bg-opacity-90 transition-colors duration-300">
              Shop Now
            </button>
            <button className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 border border-white text-white font-semibold rounded-lg hover:bg-white hover:text-[var(--primary)] transition-colors duration-300">
              Custom Order
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Work;