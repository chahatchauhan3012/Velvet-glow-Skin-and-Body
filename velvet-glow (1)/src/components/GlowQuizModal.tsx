import React, { useState } from 'react';
import { X, Sparkles, CheckCircle2, ShoppingBag, RefreshCw, ArrowRight, Star, Heart, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { products } from '../data';
import { Product } from '../types';
import { handleImageError } from '../utils';

interface GlowQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddBundleToCart: (bundleProducts: Product[]) => void;
}

export default function GlowQuizModal({ isOpen, onClose, onAddBundleToCart }: GlowQuizModalProps) {
  const [step, setStep] = useState<number>(1);
  const [goal, setGoal] = useState<'skincare' | 'cosmetics' | 'haircare'>('skincare');
  const [skinType, setSkinType] = useState<string>('dry');
  const [preferredFinish, setPreferredFinish] = useState<string>('dewy');
  const [addedBundle, setAddedBundle] = useState(false);

  if (!isOpen) return null;

  // Calculate recommended products based on user selections
  const getRecommendedBundle = (): Product[] => {
    if (goal === 'skincare') {
      const p1 = products.find((p) => p.id === 'skin-1') || products[6]; // Vit C
      const p2 = products.find((p) => p.id === 'skin-2') || products[7]; // Hyaluronic
      const p3 = products.find((p) => p.id === 'skin-4') || products[9]; // Sunscreen
      return [p1, p2, p3];
    } else if (goal === 'cosmetics') {
      const p1 = products.find((p) => p.id === 'cos-2') || products[1]; // Foundation
      const p2 = products.find((p) => p.id === 'cos-1') || products[0]; // Velvet Red Lipstick
      const p3 = products.find((p) => p.id === 'cos-3') || products[2]; // Mascara
      return [p1, p2, p3];
    } else {
      const p1 = products.find((p) => p.id === 'hair-1') || products[12]; // Argan Shampoo
      const p2 = products.find((p) => p.id === 'hair-5') || products[16]; // Scalp Growth Serum
      const p3 = products.find((p) => p.id === 'hair-6') || products[17]; // Heat Protection
      return [p1, p2, p3];
    }
  };

  const recommendedProducts = getRecommendedBundle();
  const rawTotalPrice = recommendedProducts.reduce((sum, p) => sum + p.price, 0);
  const bundleDiscountPrice = Math.round(rawTotalPrice * 0.9); // 10% discount

  const handleBundleAddToCart = () => {
    onAddBundleToCart(recommendedProducts);
    setAddedBundle(true);
    setTimeout(() => {
      setAddedBundle(false);
      onClose();
    }, 1200);
  };

  const resetQuiz = () => {
    setStep(1);
    setGoal('skincare');
    setSkinType('dry');
    setPreferredFinish('dewy');
    setAddedBundle(false);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full overflow-hidden border border-amber-100/80 relative flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-stone-900 via-amber-950 to-stone-900 text-white px-6 py-5 flex items-center justify-between border-b border-amber-900/40 relative">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-lg text-stone-900 font-bold">
                <Sparkles className="w-5 h-5 text-stone-950" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-amber-50">
                  Glow Match Assistant
                </h3>
                <p className="text-[11px] text-amber-200/80 tracking-wide font-sans">
                  Tailored 3-Step Velvet Routine in 30 Seconds
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-white/10 text-amber-200/80 hover:text-white transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="p-6 overflow-y-auto flex-1 space-y-6">
            
            {/* Step Progress Dots */}
            {step <= 3 && (
              <div className="flex items-center justify-between px-4 pb-2 border-b border-stone-100">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-amber-900 uppercase tracking-widest">
                    Step {step} of 3
                  </span>
                </div>
                <div className="flex gap-2">
                  {[1, 2, 3].map((s) => (
                    <div
                      key={s}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        s === step
                          ? 'w-8 bg-amber-700'
                          : s < step
                          ? 'w-2 bg-amber-400'
                          : 'w-2 bg-stone-200'
                      }`}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* STEP 1: Main Goal */}
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-4"
              >
                <h4 className="font-serif text-xl font-bold text-stone-900">
                  What is your primary beauty focus today?
                </h4>
                <p className="text-xs text-stone-500">
                  Select your primary beauty focus so we can curate your personalized routine kit.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  {[
                    { id: 'skincare', label: 'Radiant Skincare', desc: 'Serums, Hydration & SPF Glow', icon: '✨' },
                    { id: 'cosmetics', label: 'Velvet Makeup', desc: 'Flawless Base, Lips & Eyes', icon: '💄' },
                    { id: 'haircare', label: 'Nourishing Haircare', desc: 'Scalp Repair & Silky Shine', icon: '💆‍♀️' },
                  ].map((option) => (
                    <button
                      key={option.id}
                      onClick={() => setGoal(option.id as any)}
                      className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between h-36 ${
                        goal === option.id
                          ? 'border-amber-700 bg-amber-50/50 ring-2 ring-amber-600/30 shadow-sm'
                          : 'border-stone-200 hover:border-amber-300 hover:bg-stone-50'
                      }`}
                    >
                      <span className="text-2xl">{option.icon}</span>
                      <div>
                        <h5 className="font-semibold text-sm text-stone-900">{option.label}</h5>
                        <p className="text-[11px] text-stone-500 mt-0.5">{option.desc}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* STEP 2: Concern/Type */}
            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-4"
              >
                <h4 className="font-serif text-xl font-bold text-stone-900">
                  What best describes your skin or hair needs?
                </h4>
                <p className="text-xs text-stone-500">
                  We formulate and combine products that specifically target these conditions.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {[
                    { id: 'dry', title: 'Dry & Dehydrated', desc: 'Needs intense moisture, hyaluronic plumping & lipid lock' },
                    { id: 'dull', title: 'Dullness & Hyperpigmentation', desc: 'Needs Vitamin C brightening & antioxidant glow' },
                    { id: 'sensitive', title: 'Sensitive or Acne-Prone', desc: 'Needs Niacinamide balance & gentle soothing aloe' },
                    { id: 'damage', title: 'Hair Thinning or Frizz', desc: 'Needs scalp growth stimulants & thermal protection' },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => setSkinType(opt.id)}
                      className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                        skinType === opt.id
                          ? 'border-amber-700 bg-amber-50/50 ring-2 ring-amber-600/30'
                          : 'border-stone-200 hover:border-amber-300'
                      }`}
                    >
                      <h5 className="font-semibold text-sm text-stone-900">{opt.title}</h5>
                      <p className="text-xs text-stone-500 mt-1">{opt.desc}</p>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* STEP 3: Desired Finish */}
            {step === 3 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-4"
              >
                <h4 className="font-serif text-xl font-bold text-stone-900">
                  What finish or result do you love most?
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  {[
                    { id: 'dewy', title: 'Dewy Glass Glow', desc: 'Luminous, hydrated, sun-kissed shine' },
                    { id: 'matte', title: 'Velvet Soft Matte', desc: 'Blurring, poreless, smooth finish' },
                    { id: 'natural', title: 'Bare-Skin Silk', desc: 'Weightless, clean natural radiance' },
                  ].map((f) => (
                    <button
                      key={f.id}
                      onClick={() => setPreferredFinish(f.id)}
                      className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                        preferredFinish === f.id
                          ? 'border-amber-700 bg-amber-50/50 ring-2 ring-amber-600/30'
                          : 'border-stone-200 hover:border-amber-300'
                      }`}
                    >
                      <h5 className="font-semibold text-sm text-stone-900">{f.title}</h5>
                      <p className="text-xs text-stone-500 mt-1">{f.desc}</p>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* STEP 4: RECOMMENDATION BUNDLE RESULT */}
            {step === 4 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-5"
              >
                <div className="bg-amber-50/80 border border-amber-200 rounded-2xl p-4 flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-1.5 text-amber-800 font-bold text-xs tracking-wider uppercase">
                      <Sparkles className="w-4 h-4 text-amber-600" />
                      <span>Curated Just For You</span>
                    </div>
                    <h4 className="font-serif text-lg font-bold text-stone-900 mt-0.5">
                      Your Customized Velvet Glow 3-Step Kit
                    </h4>
                  </div>
                  <span className="bg-emerald-600 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-xs">
                    Save 10% Off
                  </span>
                </div>

                {/* 3 Recommended Products Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {recommendedProducts.map((prod, idx) => (
                    <div
                      key={prod.id}
                      className="bg-stone-50 border border-stone-200 rounded-2xl p-3 flex flex-col justify-between relative group hover:shadow-md transition"
                    >
                      <span className="absolute top-2 left-2 bg-stone-900 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                        {idx + 1}
                      </span>
                      <div className="relative aspect-square rounded-xl overflow-hidden mb-2 bg-white">
                        <img
                          src={prod.image}
                          alt={prod.name}
                          referrerPolicy="no-referrer"
                          onError={(e) => handleImageError(e, prod.category)}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <span className="text-[10px] text-amber-700 font-bold uppercase tracking-wider">
                          Step {idx + 1}: {idx === 0 ? 'Prep' : idx === 1 ? 'Treat' : 'Lock'}
                        </span>
                        <h5 className="font-semibold text-xs text-stone-900 line-clamp-1">
                          {prod.name}
                        </h5>
                        <p className="text-[11px] text-amber-900 font-bold mt-1">
                          ₹{prod.price}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pricing Summary Box */}
                <div className="bg-stone-900 text-white p-4 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3 shadow-lg">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xl font-bold font-serif text-amber-300">
                        ₹{bundleDiscountPrice}
                      </span>
                      <span className="text-xs text-stone-400 line-through">
                        ₹{rawTotalPrice}
                      </span>
                      <span className="text-[10px] bg-amber-500/20 text-amber-300 border border-amber-400/30 px-2 py-0.5 rounded-full font-semibold">
                        Saved ₹{rawTotalPrice - bundleDiscountPrice}
                      </span>
                    </div>
                    <p className="text-[11px] text-stone-300 mt-0.5">
                      Includes 3 Dermatologist-Tested Products + Free Shipping
                    </p>
                  </div>

                  <button
                    onClick={handleBundleAddToCart}
                    disabled={addedBundle}
                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer disabled:opacity-80"
                  >
                    {addedBundle ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-stone-950" />
                        <span>Bundle Added to Bag!</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4" />
                        <span>Add Full Kit (10% OFF)</span>
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            )}
          </div>

          {/* Footer Controls */}
          <div className="bg-stone-50 px-6 py-4 border-t border-stone-200 flex items-center justify-between">
            {step > 1 && step <= 3 ? (
              <button
                onClick={() => setStep((s) => s - 1)}
                className="text-xs font-semibold text-stone-600 hover:text-stone-900 transition cursor-pointer"
              >
                ← Back
              </button>
            ) : step === 4 ? (
              <button
                onClick={resetQuiz}
                className="text-xs font-semibold text-amber-800 hover:text-amber-950 flex items-center gap-1 transition cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Retake Quiz</span>
              </button>
            ) : (
              <div />
            )}

            {step < 3 ? (
              <button
                onClick={() => setStep((s) => s + 1)}
                className="px-5 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-amber-50 text-xs font-bold uppercase tracking-wider transition flex items-center gap-1.5 cursor-pointer shadow-sm"
              >
                <span>Continue</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : step === 3 ? (
              <button
                onClick={() => setStep(4)}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white text-xs font-bold uppercase tracking-wider transition flex items-center gap-1.5 cursor-pointer shadow-md"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-200" />
                <span>Reveal My Routine</span>
              </button>
            ) : null}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
