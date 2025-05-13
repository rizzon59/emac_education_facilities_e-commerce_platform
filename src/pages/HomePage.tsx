
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import SearchBar from "@/components/home/SearchBar";

const HomePage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    {
      title: "Quality Educational Materials",
      description: "EMAC provides high-quality educational materials for schools and institutions.",
      image: "/placeholder.svg",
      cta: "Browse Products",
      link: "/catalog"
    },
    {
      title: "Laboratory Equipment",
      description: "Equip your science labs with modern and reliable equipment.",
      image: "/placeholder.svg",
      cta: "Explore Lab Equipment",
      link: "/catalog?category=natural"
    },
    {
      title: "Textbooks & References",
      description: "Comprehensive collection of textbooks for all subjects and levels.",
      image: "/placeholder.svg",
      cta: "View Collection",
      link: "/catalog?category=social"
    }
  ];
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [slides.length]);
  
  const features = [
    {
      title: "Easy Bulk Ordering",
      description: "Select multiple items across categories for efficient ordering process.",
      icon: "📦"
    },
    {
      title: "Simple Request Process",
      description: "Fill out a single form to request all your selected materials.",
      icon: "📝"
    },
    {
      title: "Quality Guaranteed",
      description: "All our educational materials meet high quality standards.",
      icon: "✅"
    },
    {
      title: "Fast Delivery",
      description: "We ensure quick processing and delivery to your institution.",
      icon: "🚚"
    }
  ];
  
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section with Slideshow */}
      <section className="relative bg-gradient-to-r from-emac-800 to-emac-600 text-white overflow-hidden h-[500px]">
        <div className="absolute inset-0 overflow-hidden">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                currentSlide === index ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
            >
              <div className="absolute inset-0 bg-black opacity-50"></div>
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${slide.image})` }}
              ></div>
            </div>
          ))}
        </div>
        
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-3xl">
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`transition-opacity duration-1000 ${
                  currentSlide === index ? "opacity-100" : "opacity-0 absolute pointer-events-none"
                }`}
              >
                <h1 className="text-4xl md:text-5xl font-bold mb-4">{slide.title}</h1>
                <p className="text-xl mb-8">{slide.description}</p>
                
                <div className="flex flex-col space-y-6">
                  <SearchBar />
                  
                  <Link to={slide.link}>
                    <Button size="lg" className="bg-white text-emac-600 hover:bg-gray-100">
                      {slide.cta}
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Slide indicators */}
        <div className="absolute bottom-5 left-0 right-0 flex justify-center space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                currentSlide === index ? "bg-white" : "bg-white/50"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            ></button>
          ))}
        </div>
      </section>
      
      {/* Introduction Section - Search Bar Added Above This Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <SearchBar />
          </div>
          
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-4">Welcome to EMAC Educational Materials</h2>
            <p className="text-gray-600 text-lg">
              We provide high-quality educational materials and resources to schools, colleges, and universities.
              Our platform makes it easy to browse, select, and request the materials you need for your institution.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
            {features.map((feature, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-lg text-center hover:shadow-md transition-shadow">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Link to="/catalog">
              <Button size="lg" className="bg-primary hover:bg-emac-600">
                Explore Our Catalog
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="bg-primary rounded-xl text-white p-8 md:p-12 flex flex-col md:flex-row items-center justify-between">
            <div className="mb-8 md:mb-0 md:mr-8">
              <h2 className="text-3xl font-bold mb-4">Ready to equip your institution?</h2>
              <p className="text-white/90 text-lg">
                Browse our extensive catalog of educational materials and place your request today.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/catalog">
                <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-primary min-w-[150px]">
                  View Products
                </Button>
              </Link>
              <Link to="/about">
                <Button size="lg" className="bg-white text-primary hover:bg-gray-100 min-w-[150px]">
                  About Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
