import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ReservationForm } from './ReservationForm';
import { OrderOnlineForm } from './OrderOnlineForm';
import { FormDialog } from './FormDialog';

const Hero: React.FC = () => {
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [isOrderOpen, setIsOrderOpen] = useState(false);

  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <div 
          className="w-full h-full bg-cover bg-center"
          style={{
            backgroundImage: "url('/images/hero-bg.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundAttachment: 'fixed'
          }}
        >
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
        </div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4 text-white">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">
          Welcome to Crush Café
        </h1>
        <p className="text-xl md:text-2xl text-amber-100 mb-8 drop-shadow">
          The Heart of Gwarinpa's Chill Spot
        </p>
        <p className="text-lg text-amber-50 mb-8 max-w-2xl mx-auto drop-shadow">
          Experience the perfect blend of cozy ambiance, delicious food, and great vibes. 
          Your go-to spot for memorable moments.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg" 
            className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 border-2 border-amber-500 shadow-lg"
            onClick={() => setIsReservationOpen(true)}
          >
            Reserve a Table
          </Button>
          <Button 
            size="lg" 
            className="bg-amber-500 hover:bg-amber-600 text-white font-semibold border-2 border-amber-500 hover:border-amber-400 px-8 py-3 shadow-lg transition-colors duration-300"
            onClick={() => setIsOrderOpen(true)}
          >
            Order Online
          </Button>
          
          <FormDialog 
            isOpen={isReservationOpen} 
            onClose={() => setIsReservationOpen(false)}
            title="Reserve a Table"
          >
            <ReservationForm onClose={() => setIsReservationOpen(false)} />
          </FormDialog>
          
          <FormDialog 
            isOpen={isOrderOpen} 
            onClose={() => setIsOrderOpen(false)}
            title="Order Online"
          >
            <OrderOnlineForm onClose={() => setIsOrderOpen(false)} />
          </FormDialog>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-amber-200 rounded-full opacity-20 animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-orange-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
    </section>
  );
};

export default Hero;