import React, { useState } from 'react';
import { Mail, CheckCircle2, Sparkles, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!email) {
      setStatus('error');
      setErrorMsg('Please enter your email address.');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus('error');
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    setStatus('loading');
    
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      setEmail('');
    }, 1500);
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-tr from-velvet-950 via-velvet-900 to-velvet-950 text-white rounded-3xl py-12 px-6 sm:py-16 sm:px-12 shadow-xl my-16">
      
      {/* Decorative Blur Spheres */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-gold-500/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-velvet-500/10 blur-3xl pointer-events-none" />

      <div className="relative max-w-3xl mx-auto text-center">
        <div className="inline-flex items-center justify-center p-2 rounded-full bg-white/10 backdrop-blur-md text-gold-300 mb-4">
          <Sparkles className="w-5 h-5 animate-pulse" />
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight mb-4">
          Stay Updated with Velvet Glow
        </h2>
        
        <p className="text-gray-300 text-sm sm:text-base leading-relaxed max-w-xl mx-auto mb-8 font-sans">
          Subscribe to our newsletter to receive expert beauty tips, new arrivals alerts, and access to exclusive VIP discounts.
        </p>

        <AnimatePresence mode="wait">
          {status === 'success' ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white/10 backdrop-blur-md border border-emerald-500/30 rounded-2xl p-6 max-w-md mx-auto flex flex-col items-center"
            >
              <CheckCircle2 className="w-12 h-12 text-emerald-400 mb-3" />
              <h3 className="font-sans font-bold text-base text-white">You're Subscribed!</h3>
              <p className="text-xs text-gray-300 mt-1.5 text-center leading-relaxed">
                Thank you for joining our community. We have sent a **15% welcome discount code** directly to your inbox!
              </p>
              <button
                onClick={() => setStatus('idle')}
                className="mt-4 text-xs font-semibold text-gold-300 hover:text-white underline cursor-pointer"
              >
                Sign up with another email
              </button>
            </motion.div>
          ) : (
            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="max-w-md mx-auto"
            >
              <div className="flex flex-col sm:flex-row items-stretch gap-2.5">
                <div className="relative flex-1">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (status === 'error') setStatus('idle');
                    }}
                    placeholder="Enter your email address"
                    className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white/10 border border-white/20 focus:outline-hidden focus:ring-2 focus:ring-gold-400/50 focus:border-transparent text-sm placeholder-white/50 text-white"
                    disabled={status === 'loading'}
                  />
                  <Mail className="absolute left-4 top-4 w-4 h-4 text-white/50" />
                </div>
                
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="px-6 py-3.5 bg-gradient-to-r from-gold-400 to-gold-500 hover:from-gold-500 hover:to-gold-600 active:scale-95 text-velvet-950 font-bold text-sm rounded-xl cursor-pointer transition-all flex items-center justify-center space-x-2 shadow-lg shadow-gold-900/20 disabled:opacity-50"
                >
                  {status === 'loading' ? (
                    <span className="w-5 h-5 border-2 border-velvet-950 border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Subscribe</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>

              {status === 'error' && (
                <p className="text-red-300 text-xs mt-2.5 font-medium text-left px-1">
                  ⚠️ {errorMsg}
                </p>
              )}
            </motion.form>
          )}
        </AnimatePresence>

        <p className="text-[10px] text-white/40 mt-6 font-mono">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </div>
    </section>
  );
}
