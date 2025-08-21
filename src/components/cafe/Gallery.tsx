import React from 'react';

const Gallery: React.FC = () => {
  // Array of gallery images with their details
  const galleryImages = [
    { 
      id: 1, 
      filename: 'interior.jpg',
      alt: 'Cozy Interior', 
      category: 'Interior' 
    },
    { 
      id: 2, 
      filename: 'outdoor.jpg',
      alt: 'Outdoor Lounge', 
      category: 'Outdoor' 
    },
    { 
      id: 3, 
      filename: 'bar.jpg',
      alt: 'Stylish Bar', 
      category: 'Bar' 
    },
    { 
      id: 4, 
      filename: 'food.jpg',
      alt: 'Delicious Food', 
      category: 'Food' 
    },
    { 
      id: 5, 
      filename: 'drinks.jpg',
      alt: 'Refreshing Drinks', 
      category: 'Drinks' 
    },
    { 
      id: 6, 
      filename: 'customers.jpg',
      alt: 'Happy Customers', 
      category: 'Atmosphere' 
    }
  ];

  return (
    <section id="gallery" className="py-16 bg-white">
      <div className="w-full max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-amber-800 mb-2 sm:mb-4">Gallery</h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Take a glimpse into the Crush Café experience
          </p>
        </div>

        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
          {galleryImages.map((image) => (
            <div
              key={image.id}
              className="aspect-square w-full rounded-lg overflow-hidden hover:scale-102 sm:hover:scale-105 transition-transform duration-300 cursor-pointer relative group shadow-sm hover:shadow-md"
            >
              <img
                src={`/gallery/${image.filename}`}
                alt={image.alt}
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Fallback to placeholder if image fails to load
                  const target = e.target as HTMLImageElement;
                  target.src = 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22200%22%20height%3D%22200%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Crect%20width%3D%22200%22%20height%3D%22200%22%20fill%3D%22%23FEF3C7%22%2F%3E%3Ctext%20x%3D%22100%22%20y%3D%22110%22%20font-family%3D%22Arial%22%20font-size%3D%2214%22%20text-anchor%3D%22middle%22%20fill%3D%22%22%3E{image.alt}%3C%2Ftext%3E%3C%2Fsvg%3E';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3 sm:p-4">
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <p className="font-bold text-white text-sm sm:text-base md:text-lg">{image.alt}</p>
                  <p className="text-amber-200 text-xs sm:text-sm">{image.category}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <p className="text-gray-600">
            Follow us on social media for more photos and updates!
          </p>
        </div>
      </div>
    </section>
  );
};

export default Gallery;