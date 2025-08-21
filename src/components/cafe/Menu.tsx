import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const Menu: React.FC = () => {
  const menuCategories = [
    {
      title: 'Local Rice Dishes',
      price: '₦9,000 - ₦14,500',
      items: ['Crush Special Fried Rice', 'Seafood Fried Rice', 'Jollof Rice']
    },
    {
      title: 'Burgers & Pasta',
      price: 'Reasonably Priced',
      items: ['Classic Beef Burger', 'Chicken Burger', 'Spaghetti Bolognese']
    },
    {
      title: 'Salads & Sides',
      price: 'Fresh & Light',
      items: ['Garden Salad', 'Crispy Fries', 'Side Salads']
    },
    {
      title: 'Desserts & Drinks',
      price: 'Sweet Treats',
      items: ['Milkshakes', 'Smoothies', 'Cocktails', 'Mocktails', 'Cakes']
    }
  ];

  return (
    <section id="menu" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-amber-800 mb-4">Our Menu</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover our carefully crafted selection of local and international favorites
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {menuCategories.map((category, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg text-amber-800">{category.title}</CardTitle>
                <Badge variant="secondary" className="w-fit">{category.price}</Badge>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {category.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="text-gray-700 text-sm">
                      • {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button size="lg" className="bg-amber-600 hover:bg-amber-700">
            See Full Menu
          </Button>
        </div>

        <div className="mt-12 bg-white rounded-lg p-6 text-center">
          <h3 className="text-xl font-bold text-amber-800 mb-2">Opening Hours</h3>
          <div className="text-gray-700">
            <p><strong>Monday - Friday:</strong> 4:00 PM till late</p>
            <p><strong>Saturday - Sunday:</strong> 2:00 PM till late</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Menu;