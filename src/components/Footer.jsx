import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Instagram, Facebook, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[var(--primary)] text-white">
      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-lg sm:text-xl font-bold">LeatherCraft</h3>
            <p className="text-sm sm:text-base text-gray-300">
              Premium handcrafted leather jackets and accessories. Quality materials, timeless designs.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-[var(--accent)] transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-[var(--accent)] transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-[var(--accent)] transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-base sm:text-lg font-semibold">Quick Links</h4>
            <div className="space-y-2">
              <Link to="/about" className="block text-sm sm:text-base text-gray-300 hover:text-[var(--accent)] transition-colors">
                About Us
              </Link>
              <Link to="/work" className="block text-sm sm:text-base text-gray-300 hover:text-[var(--accent)] transition-colors">
                Our Work
              </Link>
              <Link to="/gallery" className="block text-sm sm:text-base text-gray-300 hover:text-[var(--accent)] transition-colors">
                Gallery
              </Link>
              <Link to="/reviews" className="block text-sm sm:text-base text-gray-300 hover:text-[var(--accent)] transition-colors">
                Customer Reviews
              </Link>
              <Link to="/custom-order" className="block text-sm sm:text-base text-gray-300 hover:text-[var(--accent)] transition-colors">
                Custom Orders
              </Link>
            </div>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h4 className="text-base sm:text-lg font-semibold">Categories</h4>
            <div className="space-y-2">
              <Link to="/products/men-jackets" className="block text-sm sm:text-base text-gray-300 hover:text-[var(--accent)] transition-colors">
                Men's Jackets
              </Link>
              <Link to="/products/women-jackets" className="block text-sm sm:text-base text-gray-300 hover:text-[var(--accent)] transition-colors">
                Women's Jackets
              </Link>
              <Link to="/products/sale" className="block text-sm sm:text-base text-gray-300 hover:text-[var(--accent)] transition-colors">
                Sale Items
              </Link>
              <Link to="/products/gifts" className="block text-sm sm:text-base text-gray-300 hover:text-[var(--accent)] transition-colors">
                Gift Ideas
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="text-base sm:text-lg font-semibold">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-sm sm:text-base text-gray-300">info@leathercraft.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-sm sm:text-base text-gray-300">+92 300 1234567</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 mt-1" />
                <span className="text-sm sm:text-base text-gray-300">
                  Karachi, Pakistan
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-600 mt-8 pt-6 text-center">
          <p className="text-sm text-gray-300">
            © 2024 LeatherCraft. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;