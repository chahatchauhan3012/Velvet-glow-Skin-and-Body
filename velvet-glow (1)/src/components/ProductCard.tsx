import { Product } from '../types';
import { Star, Eye, ShoppingCart, Check } from 'lucide-react';
import { motion } from 'motion/react';
import React, { useState } from 'react';
import { handleImageError } from '../utils';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, shade?: string, qty?: number) => void;
  onQuickView: (product: Product) => void;
}

export default function ProductCard({ product, onAddToCart, onQuickView }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [added, setAdded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Default to first shade if available, or undefined
    const defaultShade = product.shades && product.shades.length > 0 ? product.shades[0] : undefined;
    onAddToCart(product, defaultShade);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'cosmetics': return 'Cosmetics';
      case 'skincare': return 'Skincare';
      case 'haircare': return 'Haircare';
      default: return category;
    }
  };

  return (
    <motion.div
      id={`product-card-${product.id}`}
      className="group bg-white rounded-2xl border border-gold-100 overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.4 }}
    >
      {/* Product Image & Badges */}
      <div className="relative pt-[100%] bg-gold-50/40 overflow-hidden cursor-pointer" onClick={() => onQuickView(product)}>
        <motion.img
          src={product.image}
          alt={product.name}
          referrerPolicy="no-referrer"
          onError={(e) => handleImageError(e, product.category || 'beauty')}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out"
          animate={{ scale: isHovered ? 1.08 : 1 }}
        />
        
        {/* Category Tag */}
        <span className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs text-velvet-800 text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full border border-gold-100 shadow-xs">
          {getCategoryLabel(product.category)}
        </span>

        {/* Featured Tag */}
        {product.isFeatured && (
          <span className="absolute top-3 right-3 bg-gradient-to-r from-velvet-600 to-gold-500 text-white text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full shadow-md">
            Best Seller
          </span>
        )}

        {/* Overlay Action Buttons */}
        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-3">
          <button
            id={`btn-quickview-${product.id}`}
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="p-3 bg-white hover:bg-velvet-50 text-velvet-800 rounded-full shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:scale-110 cursor-pointer"
            title="Quick View"
          >
            <Eye className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Product Information */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Rating */}
          <div className="flex items-center space-x-1.5 mb-2">
            <div className="flex text-amber-400">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`w-3.5 h-3.5 fill-current ${
                    i < Math.floor(product.rating) ? 'text-amber-400' : 'text-gray-200'
                  }`}
                />
              ))}
            </div>
            <span className="text-[11px] font-semibold text-gray-500 font-mono">
              {product.rating} ({product.reviewsCount})
            </span>
          </div>

          {/* Title */}
          <h3
            id={`product-title-${product.id}`}
            onClick={() => onQuickView(product)}
            className="font-serif text-lg font-semibold text-velvet-950 hover:text-velvet-700 transition-colors line-clamp-1 cursor-pointer mb-1.5"
          >
            {product.name}
          </h3>

          {/* Description Snippet */}
          <p className="text-xs text-gray-500 font-sans line-clamp-2 mb-4 leading-relaxed">
            {product.description}
          </p>

          {/* Custom Shades count details */}
          {product.shades && (
            <div className="mb-4">
              <span className="text-[10px] font-medium text-gold-700 bg-gold-50 px-2 py-0.5 rounded-sm">
                {product.shades.length} Shades Available
              </span>
            </div>
          )}
        </div>

        {/* Action Tray */}
        <div className="flex items-center justify-between border-t border-gold-50/50 pt-4 mt-auto">
          <span id={`product-price-${product.id}`} className="font-serif text-xl font-bold text-velvet-900">
            ₹{product.price.toLocaleString('en-IN')}
          </span>

          <button
            id={`btn-addtocart-${product.id}`}
            onClick={handleAddToCart}
            className={`flex items-center justify-center space-x-1.5 px-4 py-2 rounded-full text-xs font-semibold tracking-wide shadow-xs cursor-pointer transition-all duration-300 ${
              added
                ? 'bg-emerald-600 text-white shadow-emerald-100'
                : 'bg-velvet-800 hover:bg-velvet-900 text-white shadow-velvet-100'
            }`}
          >
            {added ? (
              <>
                <Check className="w-3.5 h-3.5 animate-bounce" />
                <span>Added!</span>
              </>
            ) : (
              <>
                <ShoppingCart className="w-3.5 h-3.5" />
                <span>Add to Cart</span>
              </>
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
