import React, { useState } from 'react';
import { Sparkles, ShoppingBag, Check, Star, ArrowRight, ShieldCheck, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { products } from '../data';
import { Product } from '../types';
import { handleImageError } from '../utils';

interface GlowRoutineStepperProps {
  onAddToCart: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
}

const routineSteps = [
  {
    stepNumber: 1,
    title: "1. Gentle Cleanse",
    tagline: "Purify & Refresh",
    productId: "skin-3", // Aloe Vera Face Wash
    benefit: "Removes impurities and excess sebum without stripping your skin's natural lipid barrier."
  },
  {
    stepNumber: 2,
    title: "2. Brightening Treat",
    tagline: "Boost Radiance",
    productId: "skin-1", // Vitamin C Serum
    benefit: "Fades dark spots, fights free radical damage, and restores a youthful, even-toned glow."
  },
  {
    stepNumber: 3,
    title: "3. Deep Hydrate",
    tagline: "Plump & Nourish",
    productId: "skin-2", // Hyaluronic Acid Cream
    benefit: "Floods skin cells with 72-hour moisture, locking in softness and bouncy elasticity."
  },
  {
    stepNumber: 4,
    title: "4. Daily Shield",
    tagline: "Broad Spectrum UV Guard",
    productId: "skin-4", // SPF 50 Sunscreen
    benefit: "Invisible SPF 50 PA++++ protection against UVA/UVB rays with zero white cast."
  },
  {
    stepNumber: 5,
    title: "5. Velvet Finish",
    tagline: "Flawless Skin Base",
    productId: "cos-2", // Glow Finish Foundation
    benefit: "Lightweight medium coverage that melts like silk for a radiant, photo-ready finish."
  }
];

export default function GlowRoutineStepper({ onAddToCart, onSelectProduct }: GlowRoutineStepperProps) {
  const [activeStepIndex, setActiveStepIndex] = useState(1); // 0-indexed: step 2 (Treat) active by default
  const [added, setAdded] = useState(false);

  const currentStep = routineSteps[activeStepIndex];
  const matchedProduct = products.find((p) => p.id === currentStep.productId) || products[0];

  const handleAdd = () => {
    onAddToCart(matchedProduct);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <section className="bg-gradient-to-b from-stone-900 via-stone-900 to-amber-950 text-white rounded-3xl p-6 md:p-10 shadow-2xl relative overflow-hidden border border-amber-900/40">
      
      {/* Background Decorative Ambient Circles */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3 relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/15 border border-amber-400/30 text-amber-300 text-xs font-semibold tracking-wider uppercase">
          <Sparkles className="w-3.5 h-3.5" />
          <span>The 5-Step Radiance Ritual</span>
        </div>
        <h2 className="font-serif text-3xl md:text-4xl font-bold tracking-tight text-amber-50">
          Build Your Daily Velvet Glow Routine
        </h2>
        <p className="text-stone-300 text-xs md:text-sm font-sans leading-relaxed">
          Follow our dermatologist-designed 5-step layering guide for long-lasting luminosity and healthy skin health.
        </p>
      </div>

      {/* Steps Pill Tabs */}
      <div className="mt-8 flex items-center justify-start md:justify-center gap-2 overflow-x-auto pb-4 no-scrollbar relative z-10">
        {routineSteps.map((step, idx) => {
          const isActive = idx === activeStepIndex;
          return (
            <button
              key={step.stepNumber}
              onClick={() => setActiveStepIndex(idx)}
              className={`flex-shrink-0 px-4 py-2.5 rounded-2xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-2 border ${
                isActive
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-stone-950 border-amber-400 shadow-md font-bold scale-105'
                  : 'bg-stone-800/80 text-stone-300 border-stone-700 hover:border-amber-500/50 hover:bg-stone-800'
              }`}
            >
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] ${
                isActive ? 'bg-stone-950 text-amber-400 font-bold' : 'bg-stone-700 text-stone-300'
              }`}>
                {step.stepNumber}
              </span>
              <span>{step.title.split('. ')[1]}</span>
            </button>
          );
        })}
      </div>

      {/* Active Step Content Display */}
      <div className="mt-6 relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep.stepNumber}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="bg-stone-800/70 border border-stone-700/80 backdrop-blur-md rounded-2xl p-6 md:p-8 grid grid-cols-1 md:grid-cols-12 gap-8 items-center"
          >
            {/* Left Product Visual */}
            <div className="md:col-span-5 relative group">
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-stone-950 border border-amber-900/30 shadow-xl">
                <img
                  src={matchedProduct.image}
                  alt={matchedProduct.name}
                  referrerPolicy="no-referrer"
                  onError={(e) => handleImageError(e, matchedProduct.category)}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span className="absolute top-3 left-3 bg-amber-500 text-stone-950 font-bold text-[10px] tracking-widest uppercase px-3 py-1 rounded-full shadow-md">
                  Step {currentStep.stepNumber}: {currentStep.tagline}
                </span>
              </div>
            </div>

            {/* Right Product Info & Benefits */}
            <div className="md:col-span-7 space-y-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="text-xs text-stone-400">
                    {matchedProduct.rating} ({matchedProduct.reviewsCount} reviews)
                  </span>
                </div>
                <h3 className="font-serif text-2xl font-bold text-amber-100">
                  {matchedProduct.name}
                </h3>
                <span className="text-sm font-semibold text-amber-400 block">
                  ₹{matchedProduct.price}
                </span>
              </div>

              <div className="bg-stone-900/80 border border-stone-700/60 p-4 rounded-xl space-y-2">
                <span className="text-[10px] font-bold tracking-widest text-amber-400 uppercase block">
                  Key Ritual Benefit
                </span>
                <p className="text-xs text-stone-200 leading-relaxed">
                  {currentStep.benefit}
                </p>
              </div>

              <p className="text-xs text-stone-400 line-clamp-2">
                {matchedProduct.description}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={handleAdd}
                  disabled={added}
                  className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs uppercase tracking-wider transition shadow-md flex items-center gap-2 cursor-pointer disabled:opacity-80"
                >
                  {added ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added to Bag</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add Step {currentStep.stepNumber} to Cart</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => onSelectProduct(matchedProduct)}
                  className="px-5 py-3 rounded-xl bg-stone-700/80 hover:bg-stone-700 text-stone-200 font-semibold text-xs transition border border-stone-600 flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Quick View</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
