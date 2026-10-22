import { Product } from '../types';
import { X, Star, ShoppingBag, Check, Plus, Minus, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import React, { useState, useEffect } from 'react';
import { handleImageError } from '../utils';

interface ProductDetailModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, shade?: string, qty?: number) => void;
}

export default function ProductDetailModal({
  product,
  isOpen,
  onClose,
  onAddToCart,
}: ProductDetailModalProps) {
  const [selectedShade, setSelectedShade] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'benefits' | 'ingredients' | 'howTo'>('benefits');
  const [added, setAdded] = useState(false);

  // Reset local state when product changes or modal opens
  useEffect(() => {
    if (product) {
      setSelectedShade(product.shades && product.shades.length > 0 ? product.shades[0] : '');
      setQuantity(1);
      setActiveTab('benefits');
      setAdded(false);
    }
  }, [product, isOpen]);

  if (!product) return null;

  const handleAddToCart = () => {
    onAddToCart(product, selectedShade || undefined, quantity);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
    }, 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-xs"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative bg-white w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl z-10 flex flex-col md:flex-row max-h-[90vh]"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 p-2 bg-white/80 backdrop-blur-xs text-gray-500 hover:text-velvet-900 rounded-full shadow-md hover:bg-white transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Left Column: Image */}
            <div className="w-full md:w-1/2 relative bg-gold-50/20 pt-[80%] md:pt-0">
              <img
                src={product.image}
                alt={product.name}
                referrerPolicy="no-referrer"
                onError={(e) => handleImageError(e, product.category || 'beauty')}
                className="absolute inset-0 w-full h-full object-cover md:h-full"
              />
            </div>

            {/* Right Column: Scrollable details */}
            <div className="w-full md:w-1/2 p-6 md:p-8 overflow-y-auto flex flex-col justify-between max-h-[50vh] md:max-h-none">
              
              {/* Product Header */}
              <div>
                <span className="text-[10px] font-bold tracking-widest text-gold-700 bg-gold-50 px-2.5 py-1 rounded-md uppercase">
                  {product.category}
                </span>

                <h2 className="font-serif text-2xl md:text-3xl font-bold text-velvet-950 mt-3 mb-2">
                  {product.name}
                </h2>

                <div className="flex items-center space-x-2 mb-4">
                  <div className="flex text-amber-400">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 fill-current ${
                          i < Math.floor(product.rating) ? 'text-amber-400' : 'text-gray-200'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs font-semibold text-gray-500">
                    {product.rating} ({product.reviewsCount} reviews)
                  </span>
                </div>

                {/* Price */}
                <div className="text-2xl font-serif font-bold text-velvet-900 mb-4">
                  ₹{product.price.toLocaleString('en-IN')}
                </div>

                {/* Description */}
                <p className="text-sm text-gray-600 leading-relaxed mb-6 font-sans">
                  {product.description}
                </p>

                {/* Shade Selection (For Cosmetics) */}
                {product.shades && product.shades.length > 0 && (
                  <div className="mb-6">
                    <label className="block text-xs font-bold tracking-wider text-gray-700 uppercase mb-2">
                      Select Shade: <span className="text-velvet-700">{selectedShade}</span>
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {product.shades.map((shade) => (
                        <button
                          key={shade}
                          onClick={() => setSelectedShade(shade)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all cursor-pointer ${
                            selectedShade === shade
                              ? 'border-velvet-800 bg-velvet-50 text-velvet-950 font-semibold shadow-xs'
                              : 'border-gray-200 hover:border-gray-400 text-gray-600 bg-white'
                          }`}
                        >
                          {shade}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quantity and Action Button */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-8">
                  
                  {/* Quantity adjustment */}
                  <div className="flex items-center justify-between border border-gray-200 rounded-xl px-3 py-2 bg-gray-50 sm:w-32">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-1 hover:text-velvet-700 transition-colors cursor-pointer disabled:opacity-40"
                      disabled={quantity <= 1}
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="font-mono font-bold text-sm text-gray-800">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-1 hover:text-velvet-700 transition-colors cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Add to Cart button */}
                  <button
                    onClick={handleAddToCart}
                    className={`flex-1 flex items-center justify-center space-x-2 py-3 px-6 rounded-xl font-bold tracking-wider text-sm transition-all shadow-md cursor-pointer ${
                      added
                        ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-100'
                        : 'bg-velvet-800 hover:bg-velvet-950 text-white shadow-velvet-100'
                    }`}
                  >
                    {added ? (
                      <>
                        <Check className="w-4 h-4 animate-bounce" />
                        <span>Added to Cart!</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4" />
                        <span>Add to Basket</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Informative Tabs: Benefits, Ingredients, How to Use */}
              <div className="border-t border-gray-100 pt-6">
                <div className="flex border-b border-gray-100 mb-4">
                  {(['benefits', 'ingredients', 'howTo'] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`flex-1 pb-2.5 text-xs font-bold tracking-widest uppercase transition-all border-b-2 cursor-pointer ${
                        activeTab === tab
                          ? 'border-velvet-700 text-velvet-900'
                          : 'border-transparent text-gray-400 hover:text-gray-600'
                      }`}
                    >
                      {tab === 'benefits' && 'Benefits'}
                      {tab === 'ingredients' && 'Ingredients'}
                      {tab === 'howTo' && 'How to Use'}
                    </button>
                  ))}
                </div>

                <div className="min-h-[100px] text-sm text-gray-600 leading-relaxed font-sans">
                  {activeTab === 'benefits' && (
                    <ul className="space-y-1.5">
                      {product.benefits.map((benefit, i) => (
                        <li key={i} className="flex items-start">
                          <span className="text-velvet-600 mr-2 font-bold">•</span>
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {activeTab === 'ingredients' && (
                    <div>
                      <p className="mb-2 text-xs text-gray-400 flex items-center gap-1">
                        <Info className="w-3.5 h-3.5" /> Carefully selected safe & clean formulation:
                      </p>
                      <p className="font-mono text-xs bg-gray-50 p-3 rounded-lg border border-gray-100">
                        {product.ingredients.join(', ')}
                      </p>
                    </div>
                  )}

                  {activeTab === 'howTo' && (
                    <p className="italic bg-gold-50/30 p-3.5 rounded-xl border-l-4 border-gold-400 text-gold-900">
                      "{product.howToUse}"
                    </p>
                  )}
                </div>
              </div>

            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
