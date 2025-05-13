
import React, { useState } from 'react';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from "@/components/ui/carousel";

interface ProductImageCarouselProps {
  images: string[];
  productName: string;
}

const ProductImageCarousel = ({ images, productName }: ProductImageCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div className="relative w-full">
      <Carousel 
        className="w-full" 
        onScrollSnapChange={(index) => setCurrentIndex(index)}
      >
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={index}>
              <div className="w-full h-48 bg-gray-100 rounded-md overflow-hidden">
                <img 
                  src={image} 
                  alt={`${productName} - Image ${index + 1}`} 
                  className="w-full h-full object-cover"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="-left-4" />
        <CarouselNext className="-right-4" />
      </Carousel>
      
      <div className="flex justify-center mt-2 gap-1">
        {images.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full transition-all ${
              currentIndex === index ? "bg-primary w-4" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductImageCarousel;
