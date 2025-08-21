import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, Phone, MapPin } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold text-amber-800">Crush Café</h1>
            <p className="text-sm text-gray-600">Chill. Sip. Enjoy.</p>
          </div>
          
          <nav className="hidden md:flex space-x-6">
            <a href="#home" className="text-gray-700 hover:text-amber-600">Home</a>
            <a href="#about" className="text-gray-700 hover:text-amber-600">About Us</a>
            <a href="#menu" className="text-gray-700 hover:text-amber-600">Menu</a>
            <a href="#gallery" className="text-gray-700 hover:text-amber-600">Gallery</a>
            <a href="#contact" className="text-gray-700 hover:text-amber-600">Contact</a>
          </nav>

          <div className="hidden lg:flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-1">
              <MapPin className="w-4 h-4 text-amber-600" />
              <span>55 First Avenue, Gwarinpa</span>
            </div>
            <div className="flex items-center space-x-1">
              <Phone className="w-4 h-4 text-amber-600" />
              <span>0705 224 4400</span>
            </div>
          </div>

          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden pb-4">
            <nav className="flex flex-col space-y-2">
              <a href="#home" className="text-gray-700 hover:text-amber-600 py-2">Home</a>
              <a href="#about" className="text-gray-700 hover:text-amber-600 py-2">About Us</a>
              <a href="#menu" className="text-gray-700 hover:text-amber-600 py-2">Menu</a>
              <a href="#gallery" className="text-gray-700 hover:text-amber-600 py-2">Gallery</a>
              <a href="#contact" className="text-gray-700 hover:text-amber-600 py-2">Contact</a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;