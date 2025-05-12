
import { Product } from '@/context/CartContext';

export const products: Product[] = [
  // Physics Lab Equipment
  {
    id: "phys-001",
    name: "Digital Electronic Scale",
    description: "Precision digital scale for laboratory measurements with 0.01g accuracy.",
    price: 299.99,
    category: "physics",
    imageUrl: "/placeholder.svg",
    quantity: 1
  },
  {
    id: "phys-002",
    name: "Light Ray Box",
    description: "Educational light ray box for demonstrating principles of optics and light behavior.",
    price: 129.50,
    category: "physics",
    imageUrl: "/placeholder.svg",
    quantity: 1
  },
  {
    id: "phys-003",
    name: "Mechanics Laboratory Kit",
    description: "Comprehensive kit for teaching mechanics principles including force, motion, and energy.",
    price: 499.99,
    category: "physics",
    imageUrl: "/placeholder.svg",
    quantity: 1
  },
  {
    id: "phys-004",
    name: "Electromagnetism Demonstration Set",
    description: "Complete set for demonstrating principles of electricity and magnetism.",
    price: 349.75,
    category: "physics",
    imageUrl: "/placeholder.svg",
    quantity: 1
  },
  
  // Chemistry Lab Equipment
  {
    id: "chem-001",
    name: "Laboratory Glassware Set",
    description: "Complete set of borosilicate glass beakers, flasks, and cylinders for chemistry experiments.",
    price: 249.99,
    category: "chemistry",
    imageUrl: "/placeholder.svg",
    quantity: 1
  },
  {
    id: "chem-002",
    name: "Digital pH Meter",
    description: "Accurate pH measurement device for laboratory and educational use.",
    price: 159.95,
    category: "chemistry",
    imageUrl: "/placeholder.svg",
    quantity: 1
  },
  {
    id: "chem-003",
    name: "Molecular Model Kit",
    description: "Educational kit for building molecular structures, ideal for chemistry classrooms.",
    price: 89.99,
    category: "chemistry",
    imageUrl: "/placeholder.svg",
    quantity: 1
  },
  {
    id: "chem-004",
    name: "Laboratory Safety Kit",
    description: "Essential safety equipment including goggles, gloves, and lab coats for chemistry labs.",
    price: 179.50,
    category: "chemistry",
    imageUrl: "/placeholder.svg",
    quantity: 1
  },
  
  // Biology Lab Equipment
  {
    id: "bio-001",
    name: "Compound Microscope",
    description: "High-quality compound microscope with 40x-1000x magnification for detailed specimen observation.",
    price: 599.99,
    category: "biology",
    imageUrl: "/placeholder.svg",
    quantity: 1
  },
  {
    id: "bio-002",
    name: "Human Anatomy Model",
    description: "Detailed human torso model with removable organs for biology education.",
    price: 449.95,
    category: "biology",
    imageUrl: "/placeholder.svg",
    quantity: 1
  },
  {
    id: "bio-003",
    name: "Prepared Microscope Slides Set",
    description: "Collection of 50 prepared slides covering various biological specimens.",
    price: 129.99,
    category: "biology",
    imageUrl: "/placeholder.svg",
    quantity: 1
  },
  {
    id: "bio-004",
    name: "Plant Growth Experiment Kit",
    description: "Complete kit for conducting plant growth and development experiments.",
    price: 149.50,
    category: "biology",
    imageUrl: "/placeholder.svg",
    quantity: 1
  },
  
  // Social Sciences
  {
    id: "soc-001",
    name: "World History Textbook Set",
    description: "Comprehensive 5-volume set covering world history from ancient civilizations to modern times.",
    price: 249.99,
    category: "social",
    imageUrl: "/placeholder.svg",
    quantity: 1
  },
  {
    id: "soc-002",
    name: "Geography Atlas Collection",
    description: "Collection of detailed geographic atlases with physical, political, and thematic maps.",
    price: 179.95,
    category: "social",
    imageUrl: "/placeholder.svg",
    quantity: 1
  },
  {
    id: "soc-003",
    name: "Economics Principles Textbook",
    description: "Modern textbook covering principles of micro and macroeconomics for educational use.",
    price: 89.99,
    category: "social",
    imageUrl: "/placeholder.svg",
    quantity: 1
  },
  {
    id: "soc-004",
    name: "Political Science Reference Set",
    description: "Reference set covering political theory, systems, and international relations.",
    price: 199.50,
    category: "social",
    imageUrl: "/placeholder.svg",
    quantity: 1
  }
];

export const categories = [
  { id: "physics", name: "Physics Lab" },
  { id: "chemistry", name: "Chemistry Lab" },
  { id: "biology", name: "Biology Lab" },
  { id: "social", name: "Social Sciences" }
];

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(product => product.category === category);
};

export const getAllProducts = (): Product[] => {
  return products;
};
