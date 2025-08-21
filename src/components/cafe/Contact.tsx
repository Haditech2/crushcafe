import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { MapPin, Phone, Clock, Instagram, Facebook, Twitter } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-amber-800 mb-4">Visit Us</h2>
          <p className="text-xl text-gray-600">
            Come experience Crush Café in person
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Contact Info */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MapPin className="w-5 h-5 text-amber-600" />
                  <span>Location</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">55 First Avenue, Gwarinpa Estate, Abuja, Nigeria</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Phone className="w-5 h-5 text-amber-600" />
                  <span>Contact Numbers</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-1">
                <p className="text-gray-700">0705 224 4400</p>
                <p className="text-gray-700">0903 589 8550</p>
                <p className="text-gray-700">0701 909 4087</p>
                <p className="text-gray-700">0816 634 9644</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-amber-600" />
                  <span>Opening Hours</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700"><strong>Mon-Fri:</strong> 4:00 PM till late</p>
                <p className="text-gray-700"><strong>Sat-Sun:</strong> 2:00 PM till late</p>
              </CardContent>
            </Card>

            <div className="flex space-x-4">
              <Button size="sm" variant="outline" className="flex items-center space-x-2">
                <Instagram className="w-4 h-4" />
                <span>Instagram</span>
              </Button>
              <Button size="sm" variant="outline" className="flex items-center space-x-2">
                <Facebook className="w-4 h-4" />
                <span>Facebook</span>
              </Button>
              <Button size="sm" variant="outline" className="flex items-center space-x-2">
                <Twitter className="w-4 h-4" />
                <span>Twitter</span>
              </Button>
            </div>
          </div>

          {/* Contact Form */}
          <Card>
            <CardHeader>
              <CardTitle>Send us a Message</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input placeholder="Your Name" />
              <Input type="email" placeholder="Your Email" />
              <Textarea placeholder="Your Message" rows={4} />
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="reservation" />
                <label htmlFor="reservation" className="text-sm text-gray-700">
                  I'd like to make a reservation
                </label>
              </div>
              <Button className="w-full bg-amber-600 hover:bg-amber-700">
                Send Message
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Contact;