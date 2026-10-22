import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ProductCard from './components/ProductCard';
import ProductDetailModal from './components/ProductDetailModal';
import CartDrawer from './components/CartDrawer';
import ReviewCard from './components/ReviewCard';
import NewsletterSection from './components/NewsletterSection';
import ContactForm from './components/ContactForm';
import BlogReaderModal from './components/BlogReaderModal';
import TopPromoBanner from './components/TopPromoBanner';
import GlowQuizModal from './components/GlowQuizModal';
import GlowRoutineStepper from './components/GlowRoutineStepper';

import heroImg from './assets/images/hero_beauty_set_1786614183283.jpg';
import cosmeticsImg from './assets/images/cosmetics_banner_1786614201276.jpg';
import skincareImg from './assets/images/skincare_banner_1786614216098.jpg';
import haircareImg from './assets/images/haircare_banner_1786614236429.jpg';

import { products, featuredProducts, reviews, blogPosts } from './data';
import { Product, CartItem, BlogPost } from './types';
import { handleImageError } from './utils';
import Logo from './components/Logo';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Leaf, ShieldCheck, Heart, Sparkles, Filter, ChevronDown, Calendar, Clock, User, ArrowUp, ArrowRightLeft, Gift, ShoppingBag, CheckCircle2, Award, Zap } from 'lucide-react';

export default function App() {
  // Navigation & Cart States
  const [activeTab, setActiveTab] = useState<string>('home');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Modals
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedBlogPost, setSelectedBlogPost] = useState<BlogPost | null>(null);
  const [isQuizOpen, setIsQuizOpen] = useState(false);

  // Shop Filters
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'cosmetics' | 'skincare' | 'haircare'>('all');
  const [priceRange, setPriceRange] = useState<number>(1500);
  const [sortBy, setSortBy] = useState<'default' | 'price-low' | 'price-high' | 'rating'>('default');

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('velvet_glow_cart');
      if (stored) {
        setCartItems(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Failed to load cart from localStorage', e);
    }
  }, []);

  // Save cart to localStorage
  const saveCart = (items: CartItem[]) => {
    setCartItems(items);
    try {
      localStorage.setItem('velvet_glow_cart', JSON.stringify(items));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  };

  // Toast Trigger
  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Add item to cart
  const handleAddToCart = (product: Product, shade?: string, qty: number = 1) => {
    const existingIndex = cartItems.findIndex(
      (item) => item.product.id === product.id && item.selectedShade === shade
    );

    if (existingIndex > -1) {
      const updated = [...cartItems];
      updated[existingIndex].quantity += qty;
      saveCart(updated);
    } else {
      saveCart([...cartItems, { product, quantity: qty, selectedShade: shade }]);
    }
    triggerToast(`Added "${product.name}" to bag ✨`);
  };

  // Add bundle to cart
  const handleAddBundleToCart = (bundleProducts: Product[]) => {
    let updated = [...cartItems];
    bundleProducts.forEach((prod) => {
      const existingIdx = updated.findIndex((item) => item.product.id === prod.id);
      if (existingIdx > -1) {
        updated[existingIdx].quantity += 1;
      } else {
        updated.push({ product: prod, quantity: 1 });
      }
    });
    saveCart(updated);
    triggerToast(`Added 3-Step Customized Routine Kit to bag! 🎉`);
  };

  // Update quantity
  const handleUpdateQty = (productId: string, quantity: number, shade?: string) => {
    const updated = cartItems.map((item) => {
      if (item.product.id === productId && item.selectedShade === shade) {
        return { ...item, quantity };
      }
      return item;
    });
    saveCart(updated);
  };

  // Remove item from cart
  const handleRemoveItem = (productId: string, shade?: string) => {
    const updated = cartItems.filter(
      (item) => !(item.product.id === productId && item.selectedShade === shade)
    );
    saveCart(updated);
  };

  // Clear cart
  const handleClearCart = () => {
    saveCart([]);
  };

  // Auto-scroll to top when active tab changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  // Total cart items count
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Filters and sorts the main product catalog
  const filteredProducts = products.filter((product) => {
    const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
    const matchesPrice = product.price <= priceRange;
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesPrice && matchesSearch;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0; // Default / no sorting change
  });

  return (
    <div className="min-h-screen bg-slate-50/50 flex flex-col font-sans text-gray-800 antialiased selection:bg-velvet-100 selection:text-velvet-900 relative">
      
      {/* Top Sliding Marquee Announcement Banner */}
      <TopPromoBanner onOpenQuiz={() => setIsQuizOpen(true)} />

      {/* Dynamic Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        cartCount={cartCount}
        onCartToggle={() => setIsCartOpen(!isCartOpen)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onOpenQuiz={() => setIsQuizOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        <AnimatePresence mode="wait">
          
          {/* ======================================= */}
          {/* 1. HOMEPAGE VIEW */}
          {/* ======================================= */}
          {activeTab === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-20"
            >
              {/* Hero Banner Section */}
              <section id="hero-section" className="relative bg-gradient-to-tr from-velvet-50/60 via-gold-50/40 to-velvet-50/20 rounded-3xl overflow-hidden py-16 px-6 sm:py-24 sm:px-12 border border-gold-100 flex flex-col md:flex-row items-center gap-12 shadow-xs">
                {/* Visual Accent */}
                <div className="absolute -top-16 -left-16 w-48 h-48 rounded-full bg-gold-200/25 blur-2xl pointer-events-none" />
                
                <div className="flex-1 space-y-6 text-left relative z-10">
                  <div className="inline-flex items-center space-x-2 bg-velvet-100/50 border border-velvet-200/40 px-3.5 py-1.5 rounded-full text-xs font-semibold text-velvet-800 tracking-wider uppercase">
                    <Sparkles className="w-3.5 h-3.5 text-velvet-600 animate-spin" />
                    <span>Pure, Organic, dermatologist tested</span>
                  </div>

                  <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-velvet-950 leading-tight">
                    Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-velvet-700 to-gold-600">Velvet Glow</span>
                  </h1>

                  <p className="text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed max-w-xl">
                    Discover premium cosmetics, nourishing haircare, and effective skincare products designed to enhance your natural beauty. At Velvet Glow, we believe everyone deserves products that are safe, affordable, and suitable for every skin and hair type.
                  </p>

                  <div className="flex flex-wrap gap-3 pt-2">
                    <button
                      id="hero-shop-now"
                      onClick={() => setActiveTab('shop')}
                      className="px-7 py-3.5 bg-gradient-to-r from-velvet-800 to-velvet-950 hover:from-velvet-900 hover:to-black text-white text-xs font-bold tracking-widest uppercase rounded-xl shadow-lg shadow-velvet-100 hover:scale-[1.02] active:scale-95 transition-all cursor-pointer flex items-center space-x-2"
                    >
                      <span>Shop Collection</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    
                    <button
                      id="hero-quiz"
                      onClick={() => setIsQuizOpen(true)}
                      className="px-6 py-3.5 bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-bold tracking-wider uppercase rounded-xl shadow-md hover:scale-[1.02] active:scale-95 transition-all cursor-pointer flex items-center space-x-2 border border-amber-400"
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>Take Skin Routine Quiz</span>
                    </button>
                  </div>
                </div>

                {/* Hero Right: Premium Image Grid / Collage */}
                <div className="flex-1 relative w-full max-w-md md:max-w-none">
                  <div className="relative w-full aspect-square rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                    <img
                      src={heroImg}
                      alt="Velvet Glow Premium Makeup Set"
                      referrerPolicy="no-referrer"
                      onError={(e) => handleImageError(e, 'cosmetics')}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
                  </div>
                  
                  {/* Floating Micro Badge */}
                  <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-4 shadow-xl border border-gold-100 hidden sm:flex items-center space-x-3 max-w-[200px] animate-bounce-slow">
                    <div className="w-9 h-9 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0">
                      <Leaf className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-gray-800">100% Vegan</h4>
                      <p className="text-[10px] text-gray-400 mt-0.5">Cruelty-Free certified ingredients</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Why Choose Velvet Glow? */}
              <section className="space-y-8">
                <div className="text-center max-w-xl mx-auto">
                  <h2 className="font-serif text-3xl font-bold tracking-tight text-velvet-950">
                    Why Choose Velvet Glow?
                  </h2>
                  <p className="text-sm text-gray-500 mt-2 font-sans">
                    We marry natural ingredients with cutting-edge skincare science.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                  {[
                    { title: '🌿 Natural & Skin-Friendly', desc: 'Crafted with premium natural botanical oils, extracts, and active ingredients.' },
                    { title: '🧴 Dermatologist Tested', desc: 'Clinically certified formulations safe for all sensitive skin and hair types.' },
                    { title: '🐰 Cruelty-Free & Vegan', desc: 'PETA certified cruelty-free. Zero animal testing, ever.' },
                    { title: '🚚 Fast & Secure Delivery', desc: 'Safe delivery and dispatch across India within 2-4 business days.' },
                    { title: '💖 25k+ Happy Customers', desc: 'Highly rated beauty solutions trusted by beauty enthusiasts globally.' }
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className="bg-white rounded-2xl p-6 border border-gold-100 shadow-xs hover:shadow-md hover:border-gold-300 transition-all text-center flex flex-col justify-between"
                    >
                      <div className="space-y-3">
                        <h4 className="font-sans font-bold text-sm text-velvet-950">{item.title}</h4>
                        <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Our Categories Navigation Grid */}
              <section className="space-y-8">
                <div className="text-center max-w-xl mx-auto">
                  <h2 className="font-serif text-3xl font-bold tracking-tight text-velvet-950">
                    Our Core Categories
                  </h2>
                  <p className="text-sm text-gray-500 mt-2 font-sans">
                    Choose from our scientifically backed, skin-loving collections.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {[
                    {
                      id: 'cosmetics',
                      title: '💄 Cosmetics',
                      desc: 'Explore premium foundations, rich lipsticks, waterproof mascaras, smooth eyeliners, blushes, concealers, and highly pigmented makeup palettes for every occasion.',
                      image: cosmeticsImg,
                    },
                    {
                      id: 'skincare',
                      title: '🧴 Skincare',
                      desc: 'Nourishing cleansers, targeted face serums, lightweight moisturizers, broad-spectrum sunscreens, gentle toners, face masks, and anti-aging repair creams.',
                      image: skincareImg,
                    },
                    {
                      id: 'haircare',
                      title: '💇 Haircare',
                      desc: 'Botanical shampoos, moisture-locking conditioners, hair growth serums, coconut scalp oils, deep repair hair masks, and protective styling hair sprays.',
                      image: haircareImg,
                    }
                  ].map((cat) => (
                    <div
                      key={cat.id}
                      onClick={() => {
                        setCategoryFilter(cat.id as any);
                        setActiveTab('shop');
                      }}
                      className="group relative h-96 rounded-3xl overflow-hidden shadow-sm hover:shadow-lg border border-gold-100 cursor-pointer transition-all duration-300"
                    >
                      <img
                        src={cat.image}
                        alt={cat.title}
                        referrerPolicy="no-referrer"
                        onError={(e) => handleImageError(e, cat.id)}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
                      
                      <div className="absolute bottom-0 left-0 right-0 p-6 text-white space-y-2">
                        <h3 className="font-serif text-2xl font-bold tracking-tight text-white group-hover:text-gold-300 transition-colors">
                          {cat.title}
                        </h3>
                        <p className="text-xs text-gray-300 font-sans leading-relaxed line-clamp-3">
                          {cat.desc}
                        </p>
                        <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-gold-400 uppercase tracking-widest pt-2 group-hover:underline">
                          Browse Category <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Featured Products */}
              <section className="space-y-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
                  <div>
                    <h2 className="font-serif text-3xl font-bold tracking-tight text-velvet-950">
                      Featured Products
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">
                      Our ultimate best sellers, loved by beauty critics and consumers alike.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setCategoryFilter('all');
                      setActiveTab('shop');
                    }}
                    className="text-xs font-bold text-velvet-800 hover:text-velvet-950 hover:underline uppercase tracking-widest cursor-pointer inline-flex items-center gap-1.5 shrink-0"
                  >
                    <span>View All Products</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {featuredProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onAddToCart={handleAddToCart}
                      onQuickView={setSelectedProduct}
                    />
                  ))}
                </div>
              </section>

              {/* Interactive 5-Step Radiance Routine Stepper */}
              <GlowRoutineStepper
                onAddToCart={(product) => handleAddToCart(product)}
                onSelectProduct={(product) => setSelectedProduct(product)}
              />

              {/* Customer Reviews Section */}
              <section className="space-y-8">
                <div className="text-center max-w-xl mx-auto">
                  <h2 className="font-serif text-3xl font-bold tracking-tight text-velvet-950">
                    Trusted by 25,000+ Customers
                  </h2>
                  <p className="text-sm text-gray-500 mt-2 font-sans">
                    Read what our beautiful community has to say about Velvet Glow products.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {reviews.map((review) => (
                    <ReviewCard key={review.id} review={review} />
                  ))}
                </div>
              </section>

              {/* Newsletter Block */}
              <NewsletterSection />

            </motion.div>
          )}

          {/* ======================================= */}
          {/* 2. EXPLORE PRODUCTS VIEW */}
          {/* ======================================= */}
          {activeTab === 'shop' && (
            <motion.div
              key="shop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-8"
            >
              {/* Shop Title Header */}
              <div className="text-center max-w-2xl mx-auto">
                <h1 className="font-serif text-4xl font-bold text-velvet-950">Explore Our Collection</h1>
                <p className="text-sm text-gray-500 mt-2">
                  Dermatologist tested formulations, cruelty-free, safe ingredients, curated specifically for you.
                </p>
              </div>

              {/* Grid with Filters Left Sidebar + Products Right Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* 1. Left Filters Panel (Desktop) */}
                <aside className="lg:col-span-3 bg-white rounded-3xl p-6 border border-gold-100 shadow-xs space-y-6">
                  
                  <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                    <span className="font-sans font-bold text-sm text-gray-800 tracking-wide uppercase flex items-center gap-1.5">
                      <Filter className="w-4 h-4 text-velvet-700" /> Filter Options
                    </span>
                    <button
                      onClick={() => {
                        setCategoryFilter('all');
                        setPriceRange(1500);
                        setSortBy('default');
                        setSearchQuery('');
                      }}
                      className="text-[10px] text-gray-400 hover:text-velvet-800 font-bold uppercase cursor-pointer"
                    >
                      Clear All
                    </button>
                  </div>

                  {/* Category Filter */}
                  <div className="space-y-2.5">
                    <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wide">Category</h4>
                    <div className="space-y-1.5">
                      {(['all', 'cosmetics', 'skincare', 'haircare'] as const).map((cat) => (
                        <button
                          key={cat}
                          onClick={() => setCategoryFilter(cat)}
                          className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer flex justify-between items-center ${
                            categoryFilter === cat
                              ? 'bg-velvet-50 text-velvet-950 border border-velvet-100'
                              : 'text-gray-500 hover:bg-gray-50 border border-transparent'
                          }`}
                        >
                          <span>{cat === 'all' ? 'All Products' : cat}</span>
                          <span className="text-[10px] font-mono text-gray-400">
                            ({cat === 'all' ? products.length : products.filter((p) => p.category === cat).length})
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Price Filter Slider */}
                  <div className="space-y-2.5">
                    <div className="flex justify-between items-center text-xs font-bold text-gray-700 uppercase tracking-wide">
                      <span>Max Budget</span>
                      <span className="text-velvet-800 font-mono text-sm">₹{priceRange}</span>
                    </div>
                    <input
                      type="range"
                      min={300}
                      max={1500}
                      step={50}
                      value={priceRange}
                      onChange={(e) => setPriceRange(Number(e.target.value))}
                      className="w-full accent-velvet-700 cursor-pointer h-1.5 bg-gray-200 rounded-lg appearance-none"
                    />
                    <div className="flex justify-between text-[10px] text-gray-400 font-mono">
                      <span>₹300</span>
                      <span>₹1,500</span>
                    </div>
                  </div>

                  {/* Sort By */}
                  <div className="space-y-2.5">
                    <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wide">Sort Results</h4>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as any)}
                      className="w-full text-xs font-semibold px-3 py-2.5 bg-gray-50 rounded-lg border border-gray-200 text-gray-700 focus:outline-hidden focus:ring-1 focus:ring-velvet-500 cursor-pointer"
                    >
                      <option value="default">Default Catalog Order</option>
                      <option value="price-low">Price: Low to High</option>
                      <option value="price-high">Price: High to Low</option>
                      <option value="rating">Average Rating</option>
                    </select>
                  </div>

                  {/* Quick Offers promo details */}
                  <div className="bg-gold-50/50 rounded-2xl p-4 border border-gold-100 flex items-start gap-3">
                    <Gift className="w-5 h-5 text-gold-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-gold-900">Current Promos</h4>
                      <p className="text-[10px] text-gray-500 leading-relaxed mt-1">
                        Use **GLOW10** for 10% Off or **VELVET20** for 20% Off at checkout!
                      </p>
                    </div>
                  </div>

                </aside>

                {/* 2. Products Grid (Right) */}
                <div className="lg:col-span-9 space-y-6">
                  
                  {/* Active Search & Filters Pill Display */}
                  <div className="flex flex-wrap items-center justify-between gap-3 bg-white px-5 py-4.5 rounded-2xl border border-gold-100 shadow-xs">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs text-gray-500">
                        Showing **{sortedProducts.length}** results
                      </span>
                      {categoryFilter !== 'all' && (
                        <span className="text-[10px] font-bold text-velvet-800 bg-velvet-50 border border-velvet-100 px-2.5 py-0.5 rounded-full capitalize">
                          Category: {categoryFilter}
                        </span>
                      )}
                      {priceRange < 1500 && (
                        <span className="text-[10px] font-bold text-velvet-800 bg-velvet-50 border border-velvet-100 px-2.5 py-0.5 rounded-full">
                          Max price: ₹{priceRange}
                        </span>
                      )}
                      {searchQuery && (
                        <span className="text-[10px] font-bold text-velvet-800 bg-velvet-50 border border-velvet-100 px-2.5 py-0.5 rounded-full">
                          Search: "{searchQuery}"
                        </span>
                      )}
                    </div>

                    <span className="text-xs font-mono text-gray-400">
                      Standard delivery is free above ₹499
                    </span>
                  </div>

                  {/* Main Grid mapping products */}
                  {sortedProducts.length === 0 ? (
                    <div className="bg-white rounded-3xl p-12 text-center border border-gold-100 flex flex-col items-center justify-center min-h-[300px]">
                      <ShoppingBag className="w-12 h-12 text-gold-300 mb-4" />
                      <h3 className="font-serif text-xl font-bold text-velvet-950">No products found</h3>
                      <p className="text-sm text-gray-500 mt-2 max-w-sm leading-relaxed">
                        No matches correspond to your active filters or search terms. Try clearing search queries or expanding price boundaries.
                      </p>
                      <button
                        onClick={() => {
                          setCategoryFilter('all');
                          setPriceRange(1500);
                          setSearchQuery('');
                        }}
                        className="mt-6 px-5 py-2.5 bg-velvet-800 hover:bg-velvet-950 text-white rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer transition-colors"
                      >
                        Reset All Filters
                      </button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                      {sortedProducts.map((product) => (
                        <ProductCard
                          key={product.id}
                          product={product}
                          onAddToCart={handleAddToCart}
                          onQuickView={setSelectedProduct}
                        />
                      ))}
                    </div>
                  )}

                </div>

              </div>

            </motion.div>
          )}

          {/* ======================================= */}
          {/* 3. BEAUTY BLOG VIEW */}
          {/* ======================================= */}
          {activeTab === 'blog' && (
            <motion.div
              key="blog"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-12"
            >
              {/* Blog Title Header */}
              <div className="text-center max-w-xl mx-auto">
                <h1 className="font-serif text-4xl font-bold text-velvet-950">Latest Beauty Articles</h1>
                <p className="text-sm text-gray-500 mt-2 font-sans">
                  Learn professional secrets, skincare routines, makeup trends, and haircare habits from certified dermatologists and stylists.
                </p>
              </div>

              {/* Grid of Articles */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogPosts.map((post) => (
                  <article
                    key={post.id}
                    id={`blog-card-${post.id}`}
                    onClick={() => setSelectedBlogPost(post)}
                    className="group bg-white rounded-2xl overflow-hidden border border-gold-100 hover:border-gold-300 hover:shadow-lg transition-all duration-300 flex flex-col h-full cursor-pointer"
                  >
                    {/* Cover image */}
                    <div className="relative pt-[60%] overflow-hidden bg-gold-50/20">
                      <img
                        src={post.image}
                        alt={post.title}
                        referrerPolicy="no-referrer"
                        onError={(e) => handleImageError(e, post.category || 'beauty')}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-xs text-[10px] font-bold text-velvet-800 tracking-wider uppercase px-2.5 py-1 rounded-full border border-gold-100">
                        {post.category}
                      </span>
                    </div>

                    {/* Blog details */}
                    <div className="p-6 flex-1 flex flex-col justify-between">
                      <div className="space-y-3">
                        {/* Meta */}
                        <div className="flex items-center space-x-3 text-[11px] font-mono text-gray-400">
                          <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-gold-600" />{post.date}</span>
                          <span>•</span>
                          <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-gold-600" />{post.readTime}</span>
                        </div>

                        {/* Title */}
                        <h3 className="font-serif text-xl font-bold text-velvet-950 group-hover:text-velvet-700 transition-colors line-clamp-2">
                          {post.title}
                        </h3>

                        {/* description snippet */}
                        <p className="text-xs text-gray-500 leading-relaxed font-sans line-clamp-3">
                          {post.description}
                        </p>
                      </div>

                      {/* Author card & arrow */}
                      <div className="flex items-center justify-between border-t border-gold-50 pt-4.5 mt-6">
                        <span className="text-xs font-semibold text-gray-500 font-sans truncate max-w-[160px]">
                          By {post.author.split(',')[0]}
                        </span>
                        
                        <span className="text-[11px] font-bold text-velvet-800 uppercase tracking-widest inline-flex items-center gap-1 group-hover:underline cursor-pointer">
                          Read Post <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                        </span>
                      </div>
                    </div>

                  </article>
                ))}
              </div>

            </motion.div>
          )}

          {/* ======================================= */}
          {/* 4. ABOUT US VIEW */}
          {/* ======================================= */}
          {activeTab === 'about' && (
            <motion.div
              key="about"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-16"
            >
              {/* Introduction Editorial */}
              <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                <div className="lg:col-span-6 space-y-6">
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-bold tracking-widest text-gold-700 bg-gold-50 px-3 py-1 rounded-full uppercase">
                      Our Story
                    </span>
                  </div>

                  <div className="pt-1">
                    <Logo variant="image" size="lg" showTagline={true} />
                  </div>

                  <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-velvet-950">
                    Who We Are
                  </h1>

                  <p className="text-gray-600 text-sm sm:text-base leading-relaxed font-sans">
                    Velvet Glow is a modern beauty brand dedicated to providing high-quality cosmetics, skincare, and haircare products. We combine innovation with carefully selected ingredients to create products that deliver visible results while being gentle on your skin and hair.
                  </p>
                  
                  <p className="text-gray-600 text-sm sm:text-base leading-relaxed font-sans">
                    Since our launch, Velvet Glow has been committed to making beauty accessible, affordable, and sustainable. Every single product is thoughtfully developed, clinically vetted, and sustainably made to help customers look, feel, and glow their absolute best every day.
                  </p>
                </div>

                <div className="lg:col-span-6 relative">
                  <div className="relative aspect-video rounded-3xl overflow-hidden shadow-xl border border-gold-100">
                    <img
                      src={skincareImg}
                      alt="Organic clean skin ingredients"
                      referrerPolicy="no-referrer"
                      onError={(e) => handleImageError(e, 'skincare')}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-6 -right-6 bg-white border border-gold-100 shadow-lg rounded-2xl p-4 hidden sm:flex items-center gap-3.5 max-w-[240px]">
                    <ShieldCheck className="w-8 h-8 text-gold-600 shrink-0" />
                    <div>
                      <h4 className="text-xs font-bold text-gray-800">Dermatology Safe</h4>
                      <p className="text-[10px] text-gray-400 mt-0.5">Tested & certified by professional board</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Mission and Vision Bento */}
              <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
                
                <div className="bg-gradient-to-tr from-velvet-950 to-velvet-900 text-white rounded-3xl p-8 relative overflow-hidden shadow-md">
                  <div className="absolute top-0 right-0 -mr-16 -mt-16 w-40 h-40 rounded-full bg-gold-400/5 blur-xl pointer-events-none" />
                  <h3 className="font-serif text-2xl font-bold mb-4 text-gold-300">Our Mission</h3>
                  <p className="text-gray-200 text-sm sm:text-base leading-relaxed font-sans">
                    To inspire confidence by offering safe, effective, and cruelty-free beauty products for everyone. We believe in providing access to clean cosmetic technology that nurtures instead of stressing your biological barrier.
                  </p>
                </div>

                <div className="bg-gradient-to-tr from-gold-950 to-gold-900 text-white rounded-3xl p-8 relative overflow-hidden shadow-md">
                  <div className="absolute top-0 right-0 -mr-16 -mt-16 w-40 h-40 rounded-full bg-white/5 blur-xl pointer-events-none" />
                  <h3 className="font-serif text-2xl font-bold mb-4 text-gold-300">Our Vision</h3>
                  <p className="text-gray-200 text-sm sm:text-base leading-relaxed font-sans">
                    To become a trusted global beauty brand known for pristine quality, progressive clean-tech innovation, and unconditional customer satisfaction. We strive to lead sustainable luxury without compromise.
                  </p>
                </div>

              </section>

              {/* Our Values Section */}
              <section className="space-y-8">
                <div className="text-center max-w-xl mx-auto">
                  <h2 className="font-serif text-3xl font-bold tracking-tight text-velvet-950">
                    Our Values
                  </h2>
                  <p className="text-sm text-gray-500 mt-2">
                    The pillars that govern how we formulate, manufacture, and serve.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    { title: '💎 Quality First', desc: 'We source only premium, clinical-grade botanical extracts and pharmaceutical-grade cosmetic pigments.' },
                    { title: '🤝 Customer Satisfaction', desc: 'A 15-day return policy and dedicated 24/7 personal beauty concierge support.' },
                    { title: '🌱 Sustainability', desc: 'Recyclable frosted glass bottles, carbon-neutral shipping envelopes, and organic sourcing.' },
                    { title: '🐰 Cruelty-Free Beauty', desc: 'certified vegan and PETA approved. We firmly reject any animal testing on any tier of research.' },
                    { title: '💡 Innovation', desc: 'Utilizing micro-encapsulation and bio-fermented actives for fast, visible dermatological results.' },
                    { title: '🔍 Transparency', desc: 'Full open ingredient declarations, no hidden additives, and no synthetic phthalate carriers.' }
                  ].map((value, idx) => (
                    <div
                      key={idx}
                      className="bg-white border border-gold-100 hover:border-gold-300 rounded-2xl p-6 shadow-xs hover:shadow-md transition-all space-y-3"
                    >
                      <h4 className="font-serif text-lg font-bold text-velvet-900 flex items-center gap-2">
                        <span className="text-xs bg-gold-100 text-gold-800 w-5 h-5 rounded-full flex items-center justify-center font-mono">
                          {idx + 1}
                        </span>
                        {value.title}
                      </h4>
                      <p className="text-xs text-gray-500 leading-relaxed font-sans">
                        {value.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

            </motion.div>
          )}

          {/* ======================================= */}
          {/* 5. CONTACT US & FAQS VIEW */}
          {/* ======================================= */}
          {activeTab === 'contact' && (
            <motion.div
              key="contact"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-12"
            >
              {/* Heading */}
              <div className="text-center max-w-xl mx-auto">
                <h1 className="font-serif text-4xl font-bold text-velvet-950">Contact Our Team</h1>
                <p className="text-sm text-gray-500 mt-2 font-sans">
                  Whether you have questions about ingredients, need assistance matching foundation shades, or wish to track an order, we are here to support you.
                </p>
              </div>

              {/* Full Contact details, Interactive submission form, and FAQs accordions */}
              <ContactForm />

            </motion.div>
          )}

        </AnimatePresence>

      </main>

      {/* Floating Scroll To Top Button */}
      <ScrollToTopButton />

      {/* Custom Shopping Cart Sliding Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        isOpen={selectedProduct !== null}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={(product, shade, qty) => {
          handleAddToCart(product, shade, qty);
          setIsCartOpen(true); // Open the cart drawer automatically to show added item!
        }}
      />

      {/* Blog Article Reader Modal */}
      <BlogReaderModal
        post={selectedBlogPost}
        isOpen={selectedBlogPost !== null}
        onClose={() => setSelectedBlogPost(null)}
      />

      {/* Interactive Beauty & Skin Routine Quiz Modal */}
      <GlowQuizModal
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
        onAddBundleToCart={(bundle) => handleAddBundleToCart(bundle)}
      />

      {/* Floating Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 bg-stone-950 text-amber-100 px-6 py-3 rounded-2xl shadow-2xl border border-amber-500/40 flex items-center gap-3 backdrop-blur-md"
          >
            <div className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-300 flex items-center justify-center font-bold text-xs">
              ✨
            </div>
            <span className="text-xs font-semibold tracking-wide">{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Premium Footer */}
      <footer className="border-t border-gold-100 bg-white pt-12 pb-6 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-gold-50">
            {/* Branding Column */}
            <div className="space-y-4">
              <Logo variant="image" size="md" showTagline={true} />
              <p className="text-xs text-gray-500 font-sans leading-relaxed pt-1">
                Premium cosmetics, dermatologist-tested skincare, and nourishing haircare designed to highlight your natural, radiant glow safely and affordably.
              </p>
              <div className="text-[10px] text-gold-700 tracking-wider font-semibold uppercase">
                © 2026 Velvet Glow Beauty Store
              </div>
            </div>

            {/* Shop Links */}
            <div className="space-y-3">
              <h4 className="font-sans font-bold text-xs uppercase tracking-widest text-gray-800">Shop categories</h4>
              <ul className="space-y-2 text-xs text-gray-500">
                <li><button onClick={() => { setCategoryFilter('cosmetics'); setActiveTab('shop'); }} className="hover:text-velvet-700 hover:underline cursor-pointer">💄 Cosmetics Line</button></li>
                <li><button onClick={() => { setCategoryFilter('skincare'); setActiveTab('shop'); }} className="hover:text-velvet-700 hover:underline cursor-pointer">🧴 Skincare Solutions</button></li>
                <li><button onClick={() => { setCategoryFilter('haircare'); setActiveTab('shop'); }} className="hover:text-velvet-700 hover:underline cursor-pointer">💇 Haircare therapies</button></li>
              </ul>
            </div>

            {/* Support Links */}
            <div className="space-y-3">
              <h4 className="font-sans font-bold text-xs uppercase tracking-widest text-gray-800">Support & FAQ</h4>
              <ul className="space-y-2 text-xs text-gray-500">
                <li><button onClick={() => setActiveTab('contact')} className="hover:text-velvet-700 hover:underline cursor-pointer">💬 Contact support</button></li>
                <li><button onClick={() => setActiveTab('contact')} className="hover:text-velvet-700 hover:underline cursor-pointer">❓ Frequently Asked Questions</button></li>
                <li><button onClick={() => setActiveTab('about')} className="hover:text-velvet-700 hover:underline cursor-pointer">💎 Quality standards</button></li>
              </ul>
            </div>

            {/* Store details */}
            <div className="space-y-3">
              <h4 className="font-sans font-bold text-xs uppercase tracking-widest text-gray-800">HQ Store Address</h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                Sector 17, Chandigarh<br />
                Phone: +91 98765 43210<br />
                Email: velvetglow@gmail.com
              </p>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-gray-400 font-sans gap-4">
            <div>
              Designed & developed with safe, dermatologist-approved botanical values.
            </div>
            <div className="flex space-x-6">
              <span className="hover:text-gray-600 cursor-pointer">Privacy Policy</span>
              <span className="hover:text-gray-600 cursor-pointer">Terms of Service</span>
              <span className="hover:text-gray-600 cursor-pointer">Safety Guidelines</span>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}

// Micro Scroll To Top button component
function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisible = () => {
      const scrolled = document.documentElement.scrollTop;
      if (scrolled > 400) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };
    window.addEventListener('scroll', toggleVisible);
    return () => window.removeEventListener('scroll', toggleVisible);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-30 p-3 rounded-full bg-velvet-800 hover:bg-velvet-950 text-white shadow-lg cursor-pointer hover:scale-105 active:scale-95 transition-all"
          title="Scroll to Top"
        >
          <ArrowUp className="w-5 h-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
