import React, { useState } from 'react';
import { faqs } from '../data';
import { MapPin, Phone, Mail, Clock, Send, ChevronDown, ChevronUp, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [openFaqId, setOpenFaqId] = useState<string | null>('faq-1');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};

    if (!formData.name.trim()) errors.name = 'Full Name is required';
    if (!formData.email.trim()) {
      errors.email = 'Email Address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errors.email = 'Please enter a valid email address';
    }
    if (formData.phone.trim() && !/^\+?([0-9\s-]{10,12})$/.test(formData.phone.trim())) {
      errors.phone = 'Please enter a valid 10-digit phone number';
    }
    if (!formData.subject.trim()) errors.subject = 'Subject is required';
    if (!formData.message.trim()) {
      errors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      errors.message = 'Message must be at least 10 characters long';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setSubmitStatus('loading');
    
    // Simulate submission
    setTimeout(() => {
      setSubmitStatus('success');
    }, 1500);
  };

  const toggleFaq = (id: string) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  const handleResetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
    });
    setSubmitStatus('idle');
  };

  return (
    <div className="space-y-16">
      
      {/* 2-Column Contact Info and Form Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Column: Store Details */}
        <div className="lg:col-span-5 bg-gradient-to-br from-velvet-950 to-velvet-900 text-white rounded-3xl p-8 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-12 -mt-12 w-48 h-48 rounded-full bg-gold-500/10 blur-2xl pointer-events-none" />
          
          <h3 className="font-serif text-2xl font-bold mb-6">Contact Information</h3>
          
          <div className="space-y-6">
            
            {/* Store Name & Location */}
            <div className="flex gap-4 items-start">
              <div className="p-3 bg-white/10 rounded-xl text-gold-300">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-sans font-bold text-sm text-gold-200">Velvet Glow Beauty Store</h4>
                <p className="text-sm text-gray-300 mt-1 leading-relaxed">
                  Sector 17, Chandigarh
                </p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex gap-4 items-start">
              <div className="p-3 bg-white/10 rounded-xl text-gold-300">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-sans font-bold text-sm text-gold-200">Call Us</h4>
                <p className="text-sm text-gray-300 mt-1 font-mono hover:text-white transition-colors">
                  +91 98765 43210
                </p>
              </div>
            </div>

            {/* Email */}
            <div className="flex gap-4 items-start">
              <div className="p-3 bg-white/10 rounded-xl text-gold-300">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-sans font-bold text-sm text-gold-200">Email Address</h4>
                <p className="text-sm text-gray-300 mt-1 hover:text-white transition-colors">
                  velvetglow@gmail.com
                </p>
              </div>
            </div>

            {/* Business Hours */}
            <div className="flex gap-4 items-start border-t border-white/10 pt-6 mt-6">
              <div className="p-3 bg-white/10 rounded-xl text-gold-300">
                <Clock className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h4 className="font-sans font-bold text-sm text-gold-200 mb-2">Business Hours</h4>
                <div className="space-y-1.5 text-xs text-gray-300">
                  <div className="flex justify-between">
                    <span>Monday – Friday:</span>
                    <span className="font-semibold text-white">9:00 AM – 7:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday:</span>
                    <span className="font-semibold text-white">10:00 AM – 6:00 PM</span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>Sunday:</span>
                    <span className="font-bold text-red-400">Closed</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Right Column: Interactive Form */}
        <div id="contact-form-container" className="lg:col-span-7 bg-white rounded-3xl p-8 border border-gold-100 shadow-sm relative">
          <AnimatePresence mode="wait">
            {submitStatus === 'success' ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="text-center py-8"
              >
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-9 h-9" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-velvet-950">
                  Thank You, {formData.name}!
                </h3>
                <p className="text-sm text-gray-500 mt-2 max-w-md mx-auto leading-relaxed">
                  We have successfully received your message regarding **"{formData.subject}"**. Our beauty consultants will review it and reply to **{formData.email}** within 24 hours.
                </p>
                <button
                  onClick={handleResetForm}
                  className="mt-6 px-6 py-2.5 bg-velvet-800 hover:bg-velvet-950 text-white rounded-xl text-xs font-bold tracking-wider uppercase shadow-md cursor-pointer transition-colors"
                >
                  Send another inquiry
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleFormSubmit}
                className="space-y-5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <h3 className="font-serif text-2xl font-bold text-velvet-950">
                  Send Us a Message
                </h3>
                <p className="text-xs text-gray-400 -mt-1 font-sans">
                  Ask us anything! Shade recommendations, product availability, or order status.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="e.g. Priya Sharma"
                      className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-hidden focus:ring-1 ${
                        formErrors.name ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:ring-velvet-500'
                      }`}
                      disabled={submitStatus === 'loading'}
                    />
                    {formErrors.name && <p className="text-[11px] text-red-500 mt-1">{formErrors.name}</p>}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="e.g. priya@gmail.com"
                      className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-hidden focus:ring-1 ${
                        formErrors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:ring-velvet-500'
                      }`}
                      disabled={submitStatus === 'loading'}
                    />
                    {formErrors.email && <p className="text-[11px] text-red-500 mt-1">{formErrors.email}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Phone */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Phone Number <span className="text-gray-400 font-normal">(Optional)</span></label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="e.g. 9876543210"
                      className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-hidden focus:ring-1 ${
                        formErrors.phone ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:ring-velvet-500'
                      }`}
                      disabled={submitStatus === 'loading'}
                    />
                    {formErrors.phone && <p className="text-[11px] text-red-500 mt-1">{formErrors.phone}</p>}
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Subject</label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="e.g. Product shade advice"
                      className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-hidden focus:ring-1 ${
                        formErrors.subject ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:ring-velvet-500'
                      }`}
                      disabled={submitStatus === 'loading'}
                    />
                    {formErrors.subject && <p className="text-[11px] text-red-500 mt-1">{formErrors.subject}</p>}
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Describe your inquiry in detail..."
                    rows={4}
                    className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-hidden focus:ring-1 ${
                      formErrors.message ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:ring-velvet-500'
                    }`}
                    disabled={submitStatus === 'loading'}
                  />
                  {formErrors.message && <p className="text-[11px] text-red-500 mt-1">{formErrors.message}</p>}
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={submitStatus === 'loading'}
                  className="w-full flex items-center justify-center space-x-2 py-3.5 bg-velvet-800 hover:bg-velvet-950 text-white rounded-xl text-xs font-bold tracking-widest uppercase shadow-md hover:shadow-lg transition-all cursor-pointer"
                >
                  {submitStatus === 'loading' ? (
                    <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Submit Inquiry</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Accordion FAQ Area */}
      <div className="border-t border-gold-100 pt-16">
        <div className="text-center max-w-xl mx-auto mb-10">
          <h3 className="font-serif text-3xl font-bold text-velvet-950">
            Frequently Asked Questions
          </h3>
          <p className="text-sm text-gray-500 mt-2">
            Have queries about orders, quality, returns or payments? Find quick answers below.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((faq) => {
            const isOpen = openFaqId === faq.id;
            return (
              <div
                key={faq.id}
                id={`faq-item-${faq.id}`}
                className="bg-white border border-gold-100 rounded-2xl overflow-hidden shadow-xs hover:border-gold-300 transition-colors"
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full flex items-center justify-between px-6 py-4.5 text-left font-serif font-bold text-sm sm:text-base text-velvet-950 hover:text-velvet-800 transition-colors cursor-pointer"
                >
                  <span>{faq.question}</span>
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-velvet-600 shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400 shrink-0" />
                  )}
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <div className="px-6 pb-5 pt-1 text-sm text-gray-600 border-t border-gold-50 font-sans leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
