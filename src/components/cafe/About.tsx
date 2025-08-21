import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Wifi, Users, Coffee, Gamepad2 } from 'lucide-react';

const About: React.FC = () => {
  const features = [
    { icon: Coffee, title: 'Cozy Indoor Setting', desc: 'Comfortable seating with warm ambiance' },
    { icon: Users, title: 'Outdoor Greenery', desc: 'Beautiful outdoor space with nature vibes' },
    { icon: Wifi, title: 'Free Wi-Fi', desc: 'Stay connected while you relax' },
    { icon: Gamepad2, title: 'Fun Activities', desc: 'Ping-pong, volleyball, and more' }
  ];

  return (
    <section id="about" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-amber-800 mb-4">About Crush Café</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            At Crush Café, every sip and every bite feels like home. We've created the perfect space 
            for hangouts, dates, and group gatherings in the heart of Gwarinpa.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {features.map((feature, index) => (
            <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <feature.icon className="w-12 h-12 text-amber-600 mx-auto mb-4" />
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-amber-50 rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold text-amber-800 mb-4">Why Choose Crush Café?</h3>
          <p className="text-gray-700 text-lg leading-relaxed max-w-4xl mx-auto">
            Whether you're looking for a quiet spot to work, a place to catch up with friends, 
            or somewhere special for a date, Crush Café offers the perfect atmosphere. 
            Our stylish bar, outdoor lounge, and variety of activities make every visit memorable.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;