import React from 'react';
import { Instagram, Facebook, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-amber-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Logo and Description */}
          <div>
            <h3 className="text-2xl font-bold mb-2">Crush Café</h3>
            <p className="text-amber-100 mb-4">Chill. Sip. Enjoy.</p>
            <p className="text-amber-200 text-sm">
              The heart of Gwarinpa's chill spot. Where every sip and bite feels like home.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#home" className="text-amber-200 hover:text-white transition-colors">Home</a></li>
              <li><a href="#about" className="text-amber-200 hover:text-white transition-colors">About Us</a></li>
              <li><a href="#menu" className="text-amber-200 hover:text-white transition-colors">Menu</a></li>
              <li><a href="#gallery" className="text-amber-200 hover:text-white transition-colors">Gallery</a></li>
              <li><a href="#contact" className="text-amber-200 hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <p className="text-amber-200 text-sm mb-2">55 First Avenue, Gwarinpa Estate, Abuja</p>
            <p className="text-amber-200 text-sm mb-4">0705 224 4400</p>
            
            <div className="flex space-x-4">
              <Instagram className="w-6 h-6 text-amber-200 hover:text-white cursor-pointer transition-colors" />
              <Facebook className="w-6 h-6 text-amber-200 hover:text-white cursor-pointer transition-colors" />
              <Twitter className="w-6 h-6 text-amber-200 hover:text-white cursor-pointer transition-colors" />
            </div>
          </div>
        </div>

        <div className="border-t border-amber-700 mt-8 pt-8 text-center">
          <p className="text-amber-200 text-sm">
            © 2025 Crush Café. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;