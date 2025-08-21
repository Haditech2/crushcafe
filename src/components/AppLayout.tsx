import React from 'react';
import Header from './cafe/Header';
import Hero from './cafe/Hero';
import About from './cafe/About';
import Menu from './cafe/Menu';
import Gallery from './cafe/Gallery';
import Contact from './cafe/Contact';
import Footer from './cafe/Footer';

const AppLayout: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <About />
      <Menu />
      <Gallery />
      <Contact />
      <Footer />
    </div>
  );
};

export default AppLayout;