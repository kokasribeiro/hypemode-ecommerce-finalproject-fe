// Temporary mock data for testing when backend is not available
export const mockProducts = [
  {
    id: 1,
    name: "Urban Bomber Jacket",
    price: 99.99,
    image: "/images/Home/Categories/hypemode-jacket.png",
    category: "Jackets",
    discount: false,
    stock: 50
  },
  {
    id: 2,
    name: "Classic Denim Jacket", 
    price: 89.99,
    image: "/images/Home/Categories/hypemode-jacket.png",
    category: "Jackets",
    discount: false,
    stock: 30
  },
  {
    id: 3,
    name: "Leather Biker Jacket",
    price: 249.99,
    image: "/images/Home/Categories/hypemode-jacket.png", 
    category: "Jackets",
    discount: true,
    discountPercentage: 20,
    stock: 15
  }
];

export const mockAPI = {
  getAll: () => Promise.resolve({ data: mockProducts }),
  getById: (id) => Promise.resolve({ data: mockProducts.find(p => p.id === id) })
};
