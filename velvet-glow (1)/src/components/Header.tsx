import React, { useState } from 'react';
import { ShoppingBag, Search, Menu, X, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Logo from './Logo';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  cartCount: number;
  onCartToggle: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onOpenQuiz?: () => void;
}

export default function Header({
  activeTab,
  setActiveTab,
  cartCount,
  onCartToggle,
  searchQuery,
  setSearchQuery,
  onOpenQuiz,
}: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);

  const navigationItems = [
    { id: 'home', label: 'Home' },
    { id: 'shop', label: 'Explore Products' },
    { id: 'blog', label: 'Beauty Blog' },
    { id: 'about', label: 'About Us' },
    { id: 'contact', label: 'Contact Us' },
  ];

  const handleNavClick = (tabId: string) => {
    setActiveTab(tabId);
    setIsMobileMenuOpen(false);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    if (activeTab !== 'shop') {
      setActiveTab('shop'); // Switch to shop tab automatically when searching
    }
  };

  return (
    <header id="app-header" className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-gold-100 shadow-xs transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo and Tagline */}
          <div className="flex items-center cursor-pointer py-1" onClick={() => handleNavClick('home')}>
            <Logo variant="image" size="md" showTagline={true} />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigationItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-link-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative font-sans text-sm font-medium tracking-wide transition-all duration-300 py-2 cursor-pointer ${
                    isActive ? 'text-velvet-800 font-semibold' : 'text-gray-500 hover:text-velvet-700'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeTabUnderline"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-velvet-500 to-gold-500"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Actions: Search, Quiz, Cart, Mobile Menu */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            
            {/* Skin Quiz CTA */}
            {onOpenQuiz && (
              <button
                onClick={onOpenQuiz}
                className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-amber-100 to-amber-200/80 hover:from-amber-200 hover:to-amber-300 text-amber-950 text-xs font-bold transition shadow-xs cursor-pointer border border-amber-300/60"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                <span>Glow Match Quiz</span>
              </button>
            )}
            
            {/* Expanded Search Bar */}
            <div className="relative flex items-center">
              <AnimatePresence>
                {(isSearchExpanded || searchQuery) && (
                  <motion.input
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 180, opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    type="text"
                    placeholder="Search cosmetics, skincare..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="hidden sm:block mr-2 px-3 py-1.5 text-xs rounded-full border border-gold-200 focus:outline-hidden focus:ring-1 focus:ring-velvet-500 bg-gold-50/50 text-gray-800"
                    autoFocus
                  />
                )}
              </AnimatePresence>
              
              <button
                id="search-btn"
                onClick={() => setIsSearchExpanded(!isSearchExpanded)}
                className="p-2 text-gray-500 hover:text-velvet-700 rounded-full hover:bg-gold-50 transition-colors cursor-pointer"
                aria-label="Search items"
              >
                <Search className="w-5 h-5" />
              </button>
            </div>

            {/* Shopping Cart Button */}
            <button
              id="cart-toggle-btn"
              onClick={onCartToggle}
              className="relative p-2.5 text-gray-600 hover:text-velvet-700 rounded-full hover:bg-gold-50 transition-colors cursor-pointer"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-1 right-1 flex items-center justify-center min-w-[18px] h-[18px] px-1 text-[10px] font-bold text-white bg-velvet-600 rounded-full border border-white"
                >
                  {cartCount}
                </motion.span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              id="mobile-menu-toggle"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 md:hidden text-gray-600 hover:text-velvet-700 rounded-full hover:bg-gold-50 transition-colors cursor-pointer"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gold-100 overflow-hidden"
          >
            <div className="px-4 pt-3 pb-6 space-y-2">
              {/* Mobile Search */}
              <div className="relative mb-4">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="w-full pl-9 pr-4 py-2 text-sm rounded-full border border-gold-200 focus:outline-hidden focus:ring-1 focus:ring-velvet-500 bg-gold-50/30 text-gray-800"
                />
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
              </div>
              
              {navigationItems.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    id={`nav-link-mobile-${item.id}`}
                    onClick={() => handleNavClick(item.id)}
                    className={`block w-full text-left px-4 py-2.5 rounded-lg text-base font-medium transition-colors cursor-pointer ${
                      isActive
                        ? 'bg-velvet-50 text-velvet-800 font-semibold'
                        : 'text-gray-600 hover:bg-gold-50/50 hover:text-velvet-700'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
