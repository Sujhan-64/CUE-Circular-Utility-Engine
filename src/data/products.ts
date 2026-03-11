export interface Product {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  price: number;
  originalPrice?: number;
  category: string;
  image: string;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  stockCount: number;
  isCircularDeal: boolean;
  expiryDate?: string;
  daysLeft?: number;
  discountPercent?: number;
  seller: string;
  ingredients?: string;
  isTrending?: boolean;
  isBestSeller?: boolean;
  isNewArrival?: boolean;
}

export interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  productId: string;
}

const today = new Date();
const addDays = (d: number) => {
  const date = new Date(today);
  date.setDate(date.getDate() + d);
  return date.toISOString().split("T")[0];
};

export const categories = [
  "Pantry Staples",
  "Dairy & Eggs",
  "Beverages",
  "Snacks",
  "Fresh Produce",
  "Bakery",
  "Frozen Foods",
  "Personal Care",
];

export const products: Product[] = [
  {
    id: "1",
    name: "Organic Greek Yogurt",
    description: "Rich, creamy organic Greek yogurt made with whole milk.",
    longDescription: "Our organic Greek yogurt is crafted from pasture-raised cows' milk, strained three times for an exceptionally thick and creamy texture. Perfect for breakfast bowls, smoothies, or as a protein-rich snack.",
    price: 3.49,
    originalPrice: 5.99,
    category: "Dairy & Eggs",
    image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&h=400&fit=crop",
    rating: 4.5,
    reviewCount: 128,
    inStock: true,
    stockCount: 24,
    isCircularDeal: true,
    expiryDate: addDays(2),
    daysLeft: 2,
    discountPercent: 42,
    seller: "Green Valley Dairy",
    ingredients: "Organic whole milk, live active cultures (S. thermophilus, L. bulgaricus, L. acidophilus, Bifidus, L. casei)",
    isTrending: true,
  },
  {
    id: "2",
    name: "Artisan Sourdough Bread",
    description: "Hand-crafted sourdough with a perfect crispy crust.",
    longDescription: "Baked fresh daily using a 100-year-old starter, this artisan sourdough features a deep, tangy flavor and an open crumb structure. Each loaf is fermented for 24 hours for maximum flavor development.",
    price: 4.99,
    originalPrice: 7.49,
    category: "Bakery",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=400&fit=crop",
    rating: 4.8,
    reviewCount: 256,
    inStock: true,
    stockCount: 8,
    isCircularDeal: true,
    expiryDate: addDays(1),
    daysLeft: 1,
    discountPercent: 33,
    seller: "Heritage Bakehouse",
    ingredients: "Organic wheat flour, water, sea salt, sourdough starter",
    isBestSeller: true,
  },
  {
    id: "3",
    name: "Cold Pressed Orange Juice",
    description: "100% pure cold pressed orange juice, no added sugars.",
    longDescription: "Made from hand-picked Valencia oranges, cold pressed to preserve all natural vitamins and enzymes. No pasteurization, no added sugars, just pure sunshine in a bottle.",
    price: 5.99,
    originalPrice: 8.99,
    category: "Beverages",
    image: "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=400&h=400&fit=crop",
    rating: 4.3,
    reviewCount: 89,
    inStock: true,
    stockCount: 15,
    isCircularDeal: true,
    expiryDate: addDays(3),
    daysLeft: 3,
    discountPercent: 33,
    seller: "Sunrise Juicery",
    ingredients: "100% cold pressed Valencia orange juice",
    isTrending: true,
  },
  {
    id: "4",
    name: "Premium Olive Oil",
    description: "Extra virgin olive oil from Tuscan groves.",
    longDescription: "This single-origin extra virgin olive oil is harvested from century-old trees in the hills of Tuscany. Cold extracted within hours of picking, it delivers a robust, peppery flavor with notes of fresh herbs.",
    price: 14.99,
    category: "Pantry Staples",
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&h=400&fit=crop",
    rating: 4.9,
    reviewCount: 342,
    inStock: true,
    stockCount: 45,
    isCircularDeal: false,
    seller: "Tuscan Harvest Co.",
    ingredients: "100% Extra Virgin Olive Oil",
    isBestSeller: true,
  },
  {
    id: "5",
    name: "Mixed Berry Granola",
    description: "Crunchy oat granola with dried berries and honey.",
    longDescription: "A wholesome blend of rolled oats, almonds, and a medley of freeze-dried strawberries, blueberries, and raspberries. Lightly sweetened with wildflower honey and baked to golden perfection.",
    price: 6.49,
    originalPrice: 8.99,
    category: "Snacks",
    image: "https://images.unsplash.com/photo-1517093157656-b9eccef91cb1?w=400&h=400&fit=crop",
    rating: 4.4,
    reviewCount: 167,
    inStock: true,
    stockCount: 5,
    isCircularDeal: true,
    expiryDate: addDays(5),
    daysLeft: 5,
    discountPercent: 28,
    seller: "Mountain Trail Foods",
    ingredients: "Rolled oats, almonds, honey, coconut oil, freeze-dried berries, vanilla extract",
    isNewArrival: true,
  },
  {
    id: "6",
    name: "Organic Free-Range Eggs",
    description: "Farm fresh organic eggs from free-range hens.",
    longDescription: "These eggs come from hens raised on certified organic pastures with unlimited outdoor access. Rich, golden yolks with exceptional flavor and nutrition.",
    price: 5.99,
    category: "Dairy & Eggs",
    image: "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=400&h=400&fit=crop",
    rating: 4.7,
    reviewCount: 201,
    inStock: true,
    stockCount: 30,
    isCircularDeal: false,
    seller: "Meadow Farm",
    isBestSeller: true,
  },
  {
    id: "7",
    name: "Kombucha Variety Pack",
    description: "Probiotic-rich kombucha in four refreshing flavors.",
    longDescription: "Naturally fermented kombucha made with organic tea and live cultures. This variety pack includes Ginger Lemon, Berry Blast, Mango Turmeric, and Classic Green Tea flavors.",
    price: 9.99,
    originalPrice: 15.99,
    category: "Beverages",
    image: "https://images.unsplash.com/photo-1563227812-0ea4c22e6cc8?w=400&h=400&fit=crop",
    rating: 4.2,
    reviewCount: 94,
    inStock: true,
    stockCount: 12,
    isCircularDeal: true,
    expiryDate: addDays(4),
    daysLeft: 4,
    discountPercent: 38,
    seller: "Living Cultures Co.",
    ingredients: "Organic green tea, organic cane sugar, SCOBY culture, natural flavors",
    isTrending: true,
  },
  {
    id: "8",
    name: "Almond Butter",
    description: "Smooth, stone-ground almond butter with no additives.",
    longDescription: "Made from dry-roasted California almonds, stone-ground to a silky smooth consistency. No added oils, sugars, or preservatives—just pure almond goodness.",
    price: 11.99,
    category: "Pantry Staples",
    image: "https://images.unsplash.com/photo-1612187209234-a056d2e9a9a4?w=400&h=400&fit=crop",
    rating: 4.6,
    reviewCount: 178,
    inStock: true,
    stockCount: 22,
    isCircularDeal: false,
    seller: "Nutopia",
    ingredients: "Dry roasted almonds",
    isNewArrival: true,
  },
  {
    id: "9",
    name: "Organic Spinach Bundle",
    description: "Fresh organic baby spinach, triple washed.",
    longDescription: "Tender baby spinach leaves grown in rich organic soil, triple washed and ready to eat. Perfect for salads, smoothies, or sautéing.",
    price: 2.99,
    originalPrice: 4.49,
    category: "Fresh Produce",
    image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400&h=400&fit=crop",
    rating: 4.1,
    reviewCount: 67,
    inStock: true,
    stockCount: 18,
    isCircularDeal: true,
    expiryDate: addDays(1),
    daysLeft: 1,
    discountPercent: 33,
    seller: "Green Acres Farm",
    isTrending: true,
  },
  {
    id: "10",
    name: "Dark Chocolate Bar 85%",
    description: "Single-origin dark chocolate, intensely rich.",
    longDescription: "Crafted from single-origin Ecuadorian cacao beans, roasted and conched for 72 hours. This 85% dark chocolate delivers intense cocoa flavor with subtle fruit notes and a smooth finish.",
    price: 4.99,
    category: "Snacks",
    image: "https://images.unsplash.com/photo-1548907040-4baa42d10919?w=400&h=400&fit=crop",
    rating: 4.8,
    reviewCount: 289,
    inStock: true,
    stockCount: 40,
    isCircularDeal: false,
    seller: "Cacao Collective",
    ingredients: "Cacao mass, cacao butter, raw cane sugar, vanilla",
    isBestSeller: true,
  },
  {
    id: "11",
    name: "Frozen Açaí Packs",
    description: "Organic frozen açaí berry purée for smoothie bowls.",
    longDescription: "Flash-frozen at peak ripeness to lock in nutrients. These unsweetened açaí purée packs are perfect for creating vibrant smoothie bowls loaded with antioxidants.",
    price: 7.99,
    originalPrice: 11.99,
    category: "Frozen Foods",
    image: "https://images.unsplash.com/photo-1590301157890-4810ed352733?w=400&h=400&fit=crop",
    rating: 4.5,
    reviewCount: 156,
    inStock: true,
    stockCount: 10,
    isCircularDeal: true,
    expiryDate: addDays(3),
    daysLeft: 3,
    discountPercent: 33,
    seller: "Tropical Harvest",
    ingredients: "100% organic açaí berry purée",
    isNewArrival: true,
  },
  {
    id: "12",
    name: "Natural Shea Body Lotion",
    description: "Deeply moisturizing lotion with raw shea butter.",
    longDescription: "Formulated with ethically sourced raw shea butter, jojoba oil, and vitamin E for deep, lasting hydration. Free from parabens, sulfates, and artificial fragrances.",
    price: 12.99,
    category: "Personal Care",
    image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&h=400&fit=crop",
    rating: 4.4,
    reviewCount: 112,
    inStock: true,
    stockCount: 35,
    isCircularDeal: false,
    seller: "Pure Essentials",
    ingredients: "Shea butter, jojoba oil, coconut oil, vitamin E, aloe vera",
  },
];

export const reviews: Review[] = [
  { id: "r1", userName: "Sarah M.", rating: 5, comment: "Absolutely love the quality. Best yogurt I've ever had, and at this price it's a no-brainer!", date: "2026-03-01", productId: "1" },
  { id: "r2", userName: "James K.", rating: 4, comment: "Great sourdough! The crust is perfect. Arrived fresh and delicious.", date: "2026-02-28", productId: "2" },
  { id: "r3", userName: "Elena R.", rating: 5, comment: "This olive oil transformed my cooking. The flavor is incredible.", date: "2026-02-25", productId: "4" },
  { id: "r4", userName: "Michael T.", rating: 4, comment: "Really tasty granola. Perfect crunch and not too sweet.", date: "2026-03-02", productId: "5" },
  { id: "r5", userName: "Priya S.", rating: 5, comment: "The kombucha variety pack is amazing. Love the ginger lemon flavor!", date: "2026-03-05", productId: "7" },
  { id: "r6", userName: "David L.", rating: 5, comment: "Best dark chocolate I've found. Rich without being bitter.", date: "2026-02-20", productId: "10" },
];

export const customerTestimonials = [
  { name: "Anna W.", text: "CUE has completely changed how I shop. I save money and reduce waste—it's a win-win.", rating: 5 },
  { name: "Roberto F.", text: "The Circular Deals are brilliant. Great products at unbeatable prices, and I feel good about it.", rating: 5 },
  { name: "Mei L.", text: "Finally, an e-commerce platform that cares about sustainability without compromising on quality.", rating: 4 },
  { name: "Thomas B.", text: "I've saved over $200 this month through Circular Deals alone. Incredible value.", rating: 5 },
];
