import React from 'react';
import { Award, Users, Heart, Truck, Shield, Star } from 'lucide-react';

const About = () => {
  const stats = [
    { icon: Award, value: '20+', label: 'Years Experience' },
    { icon: Users, value: '5000+', label: 'Happy Customers' },
    { icon: Heart, value: '10,000+', label: 'Products Crafted' },
    { icon: Star, value: '4.9', label: 'Customer Rating' }
  ];

  const values = [
    {
      icon: Award,
      title: 'Quality Craftsmanship',
      description: 'Every piece is meticulously handcrafted by skilled artisans with decades of experience in leather working.'
    },
    {
      icon: Shield,
      title: 'Premium Materials',
      description: 'We source only the finest genuine leather from trusted suppliers, ensuring durability and luxury in every product.'
    },
    {
      icon: Heart,
      title: 'Customer Satisfaction',
      description: 'Your satisfaction is our priority. We stand behind every product with comprehensive warranties and exceptional service.'
    },
    {
      icon: Truck,
      title: 'Sustainable Practices',
      description: 'We are committed to ethical sourcing and environmentally responsible manufacturing processes.'
    }
  ];

  const timeline = [
    {
      year: '2004',
      title: 'The Beginning',
      description: 'Founded by master craftsman Ahmed Khan in Karachi with a vision to create premium leather goods.'
    },
    {
      year: '2008',
      title: 'Expansion',
      description: 'Opened our first retail store and began offering custom leather jacket services.'
    },
    {
      year: '2015',
      title: 'International Recognition',
      description: 'Started exporting to international markets and gained recognition for quality craftsmanship.'
    },
    {
      year: '2020',
      title: 'Digital Transformation',
      description: 'Launched our online platform to serve customers worldwide while maintaining our artisanal quality.'
    },
    {
      year: '2024',
      title: 'Innovation Continues',
      description: 'Introducing new sustainable practices and expanding our custom order capabilities.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[60vh] sm:h-[70vh] bg-gradient-to-r from-[var(--primary)] to-gray-800 flex items-center justify-center">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=800&fit=crop')"
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-60" />
        </div>
        
        <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6">
            Our Story
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
            Crafting premium leather goods with passion, precision, and pride for over two decades
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-8 sm:py-12 lg:py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6sm:gap-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div key={index} className="text-center p-4">
                  <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-[var(--secondary)] rounded-full mb-3 sm:mb-4">
                    <IconComponent className="w-6 h-6 sm:w-8 sm:h-8 text-[var(--primary)]" />
                  </div>
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[var(--primary)] mb-1 sm:mb-2">
                    {stat.value}
                  </div>
                  <p className="text-sm sm:text-base text-gray-600">{stat.label}</p>
                </div>
              )}
            )}
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-8 sm:py-12 lg:py-16 bg-[var(--secondary)]">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[var(--primary)] mb-4 sm:mb-6">
                The LeatherCraft Legacy
              </h2>
              <div className="space-y-4 sm:space-y-6 text-gray-700">
                <p className="text-base sm:text-lg leading-relaxed">
                  What started as a small workshop in Karachi has grown into Pakistan's premier destination for handcrafted leather goods. Our founder, Ahmed Khan, began his journey with a simple belief: that authentic craftsmanship and quality materials create products that last generations.
                </p>
                <p className="text-base sm:text-lg leading-relaxed">
                  Today, we continue this tradition with the same dedication to excellence. Each piece tells a story of skilled hands, carefully selected materials, and an unwavering commitment to quality that has earned the trust of customers worldwide.
                </p>
<p className="text-base sm:text-lg leading-relaxed">
                  From classic biker jackets to custom-designed pieces, we blend traditional techniques with contemporary style to create leather goods that are both timeless and modern.
                </p>
              </div>
            </div>
            
            <div className="space-y-4">
              <img
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop"
                alt="Leather craftsmanship"
                className="w-full h-64 sm:h-80 object-cover rounded-lg shadow-lg"
              />
              <img
                src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&h=300&fit=crop"
                alt="Our workshop"
                className="w-full h-48 sm:h-60 object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-8 sm:py-12 lg:py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-8sm:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[var(--primary)] mb-4">
              Our Values
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <div key={index} className="bg-gray-50 p-6 sm:p-8 rounded-lg">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-[var(--accent)] rounded-lg flex items-center justify-center">
                        <IconComponent className="w-6 h-6 text-[var(--primary)]" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-[var(--primary)] mb-2">
                        {value.title}
                      </h3>
                      <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                        {value.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Process */}
      <section className="py-8 sm:py-12 lg:py-16 bg-[var(--primary)] text-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
              Our Craftsmanship Process
            </h2>
            <p className="text-base sm:text-lg text-gray-200 max-w-3xl mx-auto">
              From design to delivery, every step is carefully executed to ensure perfection
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {[
              {
                step: '01',
                title: 'Design & Planning',
                description: 'Every piece begins with careful design consideration and pattern creation.'
              },
              {
                step: '02',
                title: 'Material Selection',
                description: 'We handpick premium leather hides, ensuring quality and consistency.'
              },
              {
                step: '03',
                title: 'Expert Crafting',
                description: 'Skilled artisans cut, stitch, and finish each piece with precision.'
              },
              {
                step: '04',
                title: 'Quality Control',
                description: 'Rigorous inspection ensures every product meets our high standards.'
              }
            ].map((process, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-[var(--accent)] text-[var(--primary)] font-bold text-xl rounded-full flex items-center justify-center mx-auto mb-4">
                  {process.step}
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-3">{process.title}</h3>
                <p className="text-sm sm:text-base text-gray-200">{process.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-8 sm:py-12 lg:py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[var(--primary)] mb-4">
              Our Journey
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
              Two decades of growth, innovation, and unwavering commitment to quality
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-0.5 bg-[var(--accent)] transform sm:-translate-x-1/2"></div>
              
              <div className="space-y-8 sm:space-y-12">
                {timeline.map((item, index) => (
                  <div key={index} className={`relative flex items-center ${
                    index % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'
                  }`}>
                    {/* Timeline dot */}
                    <div className="absolute left-4 sm:left-1/2 w-4 h-4 bg-[var(--accent)] rounded-full transform sm:-translate-x-1/2 z-10"></div>
                    
                    {/* Content */}
                    <div className={`ml-12 sm:ml-0 sm:w-5/12 ${
                      index % 2 === 0 ? 'sm:pr-8 sm:text-right' : 'sm:pl-8'
                    }`}>
                      <div className="bg-gray-50 p-4 sm:p-6 rounded-lg">
                        <div className="text-lg sm:text-xl font-bold text-[var(--accent)] mb-2">
                          {item.year}
                        </div>
                        <h3 className="text-base sm:text-lg font-bold text-[var(--primary)] mb-2">
                          {item.title}
                        </h3>
                        <p className="text-sm sm:text-base text-gray-600">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-8 sm:py-12 lg:py-16 bg-[var(--secondary)]">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[var(--primary)] mb-4">
            Experience the LeatherCraft Difference
          </h2>
          <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who have chosen quality, craftsmanship, and style.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <a
              href="/"
              className="btn-primary px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold"
            >
              Shop Our Collection
            </a>
            <a
              href="/custom-order"
              className="btn-secondary px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold"
            >
              Create Custom Order
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;