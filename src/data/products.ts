import { Product, Category, Order, User } from '@/types/product';

// Updated category structure with parent-child relationships
export const categories: Category[] = [
  { id: "all", name: "All Products" },
  { id: "natural", name: "Natural Science" },
  { id: "formal", name: "Formal Science" },
  { id: "social", name: "Social Science" },
  
  // Natural Science subcategories
  { id: "physics", name: "Physics", parentId: "natural" },
  { id: "chemistry", name: "Chemistry", parentId: "natural" },
  { id: "biology", name: "Biology", parentId: "natural" },
  { id: "earth", name: "Earth Science", parentId: "natural" },
  { id: "space", name: "Space Science", parentId: "natural" },
  
  // Formal Science subcategories
  { id: "statistics", name: "Statistics", parentId: "formal" },
  { id: "applied-math", name: "Applied Mathematics", parentId: "formal" },
  { id: "pure-math", name: "Pure Mathematics", parentId: "formal" },
  { id: "logic", name: "Logic", parentId: "formal" },
  { id: "system-science", name: "Systems Science", parentId: "formal" },
  
  // Social Science subcategories are existing ones
  { id: "history", name: "History", parentId: "social" },
  { id: "geography", name: "Geography", parentId: "social" },
  { id: "economics", name: "Economics", parentId: "social" },
  { id: "ethics", name: "Ethics", parentId: "social" }
];

// Generate placeholder images array for each product
const generateImages = (id: string, count: number = 5): string[] => {
  const images = [];
  for (let i = 0; i < count; i++) {
    images.push(`/placeholder.svg`);
  }
  return images;
};

export const products: Product[] = [
  // Physics Lab Equipment
  {
    id: "phys-001",
    name: "Digital Electronic Scale",
    description: "Precision digital scale for laboratory measurements with 0.01g accuracy.",
    price: 299.99,
    category: "physics",
    categoryName: "Physics",
    imageUrl: "/placeholder.svg",
    images: generateImages("phys-001"),
    quantity: 1,
    stock: 25,
    requested: 12
  },
  {
    id: "phys-002",
    name: "Light Ray Box",
    description: "Educational light ray box for demonstrating principles of optics and light behavior.",
    price: 129.50,
    category: "physics",
    categoryName: "Physics",
    imageUrl: "/placeholder.svg",
    images: generateImages("phys-002"),
    quantity: 1,
    stock: 40,
    requested: 8
  },
  {
    id: "phys-003",
    name: "Mechanics Laboratory Kit",
    description: "Comprehensive kit for teaching mechanics principles including force, motion, and energy.",
    price: 499.99,
    category: "physics",
    categoryName: "Physics",
    imageUrl: "/placeholder.svg",
    images: generateImages("phys-003"),
    quantity: 1,
    stock: 30,
    requested: 10
  },
  {
    id: "phys-004",
    name: "Electromagnetism Demonstration Set",
    description: "Complete set for demonstrating principles of electricity and magnetism.",
    price: 349.75,
    category: "physics",
    categoryName: "Physics",
    imageUrl: "/placeholder.svg",
    images: generateImages("phys-004"),
    quantity: 1,
    stock: 20,
    requested: 15
  },
  
  // Chemistry Lab Equipment
  {
    id: "chem-001",
    name: "Laboratory Glassware Set",
    description: "Complete set of borosilicate glass beakers, flasks, and cylinders for chemistry experiments.",
    price: 249.99,
    category: "chemistry",
    categoryName: "Chemistry",
    imageUrl: "/placeholder.svg",
    images: generateImages("chem-001"),
    quantity: 1,
    stock: 35,
    requested: 12
  },
  {
    id: "chem-002",
    name: "Digital pH Meter",
    description: "Accurate pH measurement device for laboratory and educational use.",
    price: 159.95,
    category: "chemistry",
    categoryName: "Chemistry",
    imageUrl: "/placeholder.svg",
    images: generateImages("chem-002"),
    quantity: 1,
    stock: 40,
    requested: 8
  },
  {
    id: "chem-003",
    name: "Molecular Model Kit",
    description: "Educational kit for building molecular structures, ideal for chemistry classrooms.",
    price: 89.99,
    category: "chemistry",
    categoryName: "Chemistry",
    imageUrl: "/placeholder.svg",
    images: generateImages("chem-003"),
    quantity: 1,
    stock: 25,
    requested: 10
  },
  {
    id: "chem-004",
    name: "Laboratory Safety Kit",
    description: "Essential safety equipment including goggles, gloves, and lab coats for chemistry labs.",
    price: 179.50,
    category: "chemistry",
    categoryName: "Chemistry",
    imageUrl: "/placeholder.svg",
    images: generateImages("chem-004"),
    quantity: 1,
    stock: 30,
    requested: 15
  },
  
  // Biology Lab Equipment
  {
    id: "bio-001",
    name: "Compound Microscope",
    description: "High-quality compound microscope with 40x-1000x magnification for detailed specimen observation.",
    price: 599.99,
    category: "biology",
    categoryName: "Biology",
    imageUrl: "/placeholder.svg",
    images: generateImages("bio-001"),
    quantity: 1,
    stock: 40,
    requested: 12
  },
  {
    id: "bio-002",
    name: "Human Anatomy Model",
    description: "Detailed human torso model with removable organs for biology education.",
    price: 449.95,
    category: "biology",
    categoryName: "Biology",
    imageUrl: "/placeholder.svg",
    images: generateImages("bio-002"),
    quantity: 1,
    stock: 35,
    requested: 10
  },
  {
    id: "bio-003",
    name: "Prepared Microscope Slides Set",
    description: "Collection of 50 prepared slides covering various biological specimens.",
    price: 129.99,
    category: "biology",
    categoryName: "Biology",
    imageUrl: "/placeholder.svg",
    images: generateImages("bio-003"),
    quantity: 1,
    stock: 30,
    requested: 15
  },
  {
    id: "bio-004",
    name: "Plant Growth Experiment Kit",
    description: "Complete kit for conducting plant growth and development experiments.",
    price: 149.50,
    category: "biology",
    categoryName: "Biology",
    imageUrl: "/placeholder.svg",
    images: generateImages("bio-004"),
    quantity: 1,
    stock: 25,
    requested: 10
  },
  
  // Social Sciences
  {
    id: "soc-001",
    name: "World History Textbook Set",
    description: "Comprehensive 5-volume set covering world history from ancient civilizations to modern times.",
    price: 249.99,
    category: "social",
    categoryName: "Social Science",
    imageUrl: "/placeholder.svg",
    images: generateImages("soc-001"),
    quantity: 1,
    stock: 30,
    requested: 12
  },
  {
    id: "soc-002",
    name: "Geography Atlas Collection",
    description: "Collection of detailed geographic atlases with physical, political, and thematic maps.",
    price: 179.95,
    category: "social",
    categoryName: "Social Science",
    imageUrl: "/placeholder.svg",
    images: generateImages("soc-002"),
    quantity: 1,
    stock: 25,
    requested: 10
  },
  {
    id: "soc-003",
    name: "Economics Principles Textbook",
    description: "Modern textbook covering principles of micro and macroeconomics for educational use.",
    price: 89.99,
    category: "social",
    categoryName: "Social Science",
    imageUrl: "/placeholder.svg",
    images: generateImages("soc-003"),
    quantity: 1,
    stock: 30,
    requested: 15
  },
  {
    id: "soc-004",
    name: "Political Science Reference Set",
    description: "Reference set covering political theory, systems, and international relations.",
    price: 199.50,
    category: "social",
    categoryName: "Social Science",
    imageUrl: "/placeholder.svg",
    images: generateImages("soc-004"),
    quantity: 1,
    stock: 25,
    requested: 10
  },
  
  // Earth Science
  {
    id: "earth-001",
    name: "Rock Collection Kit",
    description: "Comprehensive collection of rock specimens for geology education.",
    price: 89.99,
    category: "earth",
    categoryName: "Earth Science",
    imageUrl: "/placeholder.svg",
    images: generateImages("earth-001"),
    quantity: 1,
    stock: 30,
    requested: 5
  },
  
  // Space Science
  {
    id: "space-001",
    name: "Telescope Set",
    description: "Educational telescope with accessories for astronomy studies.",
    price: 349.99,
    category: "space",
    categoryName: "Space Science",
    imageUrl: "/placeholder.svg",
    images: generateImages("space-001"),
    quantity: 1,
    stock: 15,
    requested: 7
  },
  
  // Statistics
  {
    id: "statistics-001",
    name: "Statistical Analysis Software",
    description: "Educational software for teaching statistics and data analysis.",
    price: 199.99,
    category: "statistics",
    categoryName: "Statistics",
    imageUrl: "/placeholder.svg",
    images: generateImages("statistics-001"),
    quantity: 1,
    stock: 50,
    requested: 10
  },
  
  // Applied Mathematics
  {
    id: "applied-math-001",
    name: "Engineering Calculation Kit",
    description: "Tools and resources for applied mathematics in engineering education.",
    price: 129.99,
    category: "applied-math",
    categoryName: "Applied Mathematics",
    imageUrl: "/placeholder.svg",
    images: generateImages("applied-math-001"),
    quantity: 1,
    stock: 20,
    requested: 8
  }
];

// Sample orders for admin view
export const orders: Order[] = [
  {
    id: "ORD-001",
    products: [
      { id: "phys-001", name: "Digital Electronic Scale", quantity: 2, price: 299.99 },
      { id: "chem-002", name: "Digital pH Meter", quantity: 1, price: 159.95 }
    ],
    institution: "Science High School",
    address: "123 Education St, Science City",
    status: "processing",
    date: "2025-05-10",
    total: 759.93
  },
  {
    id: "ORD-002",
    products: [
      { id: "bio-001", name: "Compound Microscope", quantity: 3, price: 599.99 }
    ],
    institution: "University Biology Department",
    address: "456 Research Blvd, Academia",
    status: "shipped",
    date: "2025-05-08",
    total: 1799.97
  },
  {
    id: "ORD-003",
    products: [
      { id: "earth-001", name: "Rock Collection Kit", quantity: 10, price: 89.99 },
      { id: "space-001", name: "Telescope Set", quantity: 1, price: 349.99 }
    ],
    institution: "Elementary School District",
    address: "789 Learning Ave, Knowledge Park",
    status: "pending",
    date: "2025-05-12",
    total: 1249.89
  }
];

// Sample users for admin view
export const users: User[] = [
  {
    id: "USR-001",
    name: "John Educator",
    email: "john@scienceschool.edu",
    institution: "Science High School",
    address: "123 Education St, Science City",
    wishlist: ["phys-001", "chem-002"]
  },
  {
    id: "USR-002",
    name: "Sarah Professor",
    email: "sarah@university.edu",
    institution: "University Biology Department",
    address: "456 Research Blvd, Academia",
    wishlist: ["bio-001", "bio-003"]
  },
  {
    id: "USR-003",
    name: "Mark Teacher",
    email: "mark@elementary.edu",
    institution: "Elementary School District",
    address: "789 Learning Ave, Knowledge Park",
    wishlist: ["earth-001", "space-001"]
  }
];

// Helper functions
export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getProductsByCategory = (category: string): Product[] => {
  // For parent categories, get all products from subcategories
  const childCategories = categories.filter(c => c.parentId === category).map(c => c.id);
  
  if (childCategories.length > 0) {
    return products.filter(product => 
      childCategories.includes(product.category) || product.category === category
    );
  }
  
  return products.filter(product => product.category === category);
};

export const getAllProducts = (): Product[] => {
  return products;
};

export const getParentCategories = (): Category[] => {
  return categories.filter(category => !category.parentId);
};

export const getSubcategories = (parentId: string): Category[] => {
  return categories.filter(category => category.parentId === parentId);
};
