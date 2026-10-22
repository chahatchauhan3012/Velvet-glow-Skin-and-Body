import { CartItem } from '../types';
import { X, Trash2, Plus, Minus, CreditCard, ShoppingBag, Truck, Gift, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import React, { useState } from 'react';
import { handleImageError } from '../utils';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQty: (productId: string, quantity: number, shade?: string) => void;
  onRemoveItem: (productId: string, shade?: string) => void;
  onClearCart: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQty,
  onRemoveItem,
  onClearCart,
}: CartDrawerProps) {
  // Coupon state
  const [couponCode, setCouponCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState<{ code: string; percent: number } | null>(null);
  const [couponError, setCouponError] = useState('');

  // Checkout flow states: 'cart' | 'shipping' | 'success'
  const [flowStep, setFlowStep] = useState<'cart' | 'shipping' | 'success'>('cart');
  const [isProcessing, setIsProcessing] = useState(false);

  // Shipping Form
  const [shippingForm, setShippingForm] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
    zip: '',
    payMethod: 'cod', // Default Cash On Delivery
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Subtotal calculations
  const subtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const discountAmount = appliedDiscount ? Math.round((subtotal * appliedDiscount.percent) / 100) : 0;
  const shippingFee = subtotal > 499 || subtotal === 0 ? 0 : 40;
  const grandTotal = subtotal - discountAmount + shippingFee;

  // Apply promo codes
  const handleApplyPromo = () => {
    const code = couponCode.toUpperCase().trim();
    if (code === 'GLOW10') {
      setAppliedDiscount({ code: 'GLOW10', percent: 10 });
      setCouponError('');
    } else if (code === 'VELVET20') {
      setAppliedDiscount({ code: 'VELVET20', percent: 20 });
      setCouponError('');
    } else if (code === '') {
      setCouponError('Please enter a coupon code.');
    } else {
      setCouponError('Invalid coupon. Try "GLOW10" (10% off) or "VELVET20" (20% off).');
    }
  };

  const handleRemovePromo = () => {
    setAppliedDiscount(null);
    setCouponCode('');
  };

  // Form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setShippingForm((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  // Form submit
  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};
    if (!shippingForm.name.trim()) errors.name = 'Full Name is required';
    if (!shippingForm.phone.trim()) {
      errors.phone = 'Phone number is required';
    } else if (!/^\+?([0-9\s-]{10,12})$/.test(shippingForm.phone.trim())) {
      errors.phone = 'Please enter a valid phone number';
    }
    if (!shippingForm.address.trim()) errors.address = 'Delivery address is required';
    if (!shippingForm.city.trim()) errors.city = 'City is required';
    if (!shippingForm.zip.trim()) errors.zip = 'Pincode is required';

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    // Process payment simulation
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setFlowStep('success');
    }, 2000);
  };

  const handleOrderReset = () => {
    onClearCart();
    setFlowStep('cart');
    setAppliedDiscount(null);
    setCouponCode('');
    setShippingForm({
      name: '',
      phone: '',
      address: '',
      city: '',
      zip: '',
      payMethod: 'cod',
    });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          
          {/* Dark overlay backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/55 backdrop-blur-xs"
          />

          {/* Slider Panel */}
          <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="w-screen max-w-md bg-white shadow-2xl flex flex-col h-full border-l border-gold-100"
            >
              
              {/* Drawer Header */}
              <div className="px-6 py-5 border-b border-gold-50 flex items-center justify-between bg-gold-50/20">
                <div className="flex items-center space-x-2">
                  <ShoppingBag className="w-5 h-5 text-velvet-800" />
                  <h2 className="text-lg font-serif font-bold text-velvet-950">
                    {flowStep === 'cart' && 'Your Shopping Bag'}
                    {flowStep === 'shipping' && 'Checkout Details'}
                    {flowStep === 'success' && 'Order Confirmed!'}
                  </h2>
                </div>
                <button
                  onClick={onClose}
                  className="p-1.5 hover:bg-gold-50 text-gray-500 hover:text-velvet-900 rounded-full transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer Body - Flow based rendering */}
              <div className="flex-1 overflow-y-auto px-6 py-4">
                
                {/* 1. SHOPPING BAG VIEW */}
                {flowStep === 'cart' && (
                  <>
                    {cartItems.length === 0 ? (
                      <div className="flex flex-col items-center justify-center h-full text-center py-12">
                        <div className="w-20 h-20 rounded-full bg-gold-50 flex items-center justify-center mb-4">
                          <ShoppingBag className="w-10 h-10 text-gold-400" />
                        </div>
                        <h3 className="text-base font-bold text-gray-700">Your bag is empty</h3>
                        <p className="text-xs text-gray-400 mt-2 max-w-[220px] mx-auto">
                          Explore our catalogs and add products to get glowing skin and gorgeous hair.
                        </p>
                        <button
                          onClick={onClose}
                          className="mt-6 px-6 py-2.5 bg-velvet-800 hover:bg-velvet-950 text-white rounded-xl text-xs font-bold tracking-wider cursor-pointer transition-colors"
                        >
                          Start Shopping
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {cartItems.map((item, index) => (
                          <div
                            key={`${item.product.id}-${item.selectedShade || 'none'}`}
                            className="flex items-center gap-4 py-3 border-b border-gray-100 last:border-0"
                          >
                            <img
                              src={item.product.image}
                              alt={item.product.name}
                              referrerPolicy="no-referrer"
                              onError={(e) => handleImageError(e, item.product.category || 'beauty')}
                              className="w-16 h-16 object-cover rounded-xl border border-gold-50"
                            />
                            
                            <div className="flex-1 min-w-0">
                              <h4 className="text-sm font-semibold text-velvet-950 truncate">
                                {item.product.name}
                              </h4>
                              
                              {item.selectedShade && (
                                <p className="text-[11px] font-medium text-gold-700 bg-gold-50/80 px-2 py-0.5 rounded-sm inline-block mt-1">
                                  Shade: {item.selectedShade}
                                </p>
                              )}
                              
                              <div className="flex items-center justify-between mt-2.5">
                                <span className="font-serif text-sm font-bold text-velvet-900">
                                  ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                                </span>
                                
                                {/* Qty Stepper */}
                                <div className="flex items-center space-x-2 border border-gray-100 rounded-lg px-2 py-1 bg-gray-50 scale-90 origin-right">
                                  <button
                                    onClick={() => onUpdateQty(item.product.id, Math.max(1, item.quantity - 1), item.selectedShade)}
                                    className="p-0.5 text-gray-500 hover:text-velvet-800 disabled:opacity-30 cursor-pointer"
                                    disabled={item.quantity <= 1}
                                  >
                                    <Minus className="w-3 h-3" />
                                  </button>
                                  <span className="font-mono text-xs font-bold px-1">{item.quantity}</span>
                                  <button
                                    onClick={() => onUpdateQty(item.product.id, item.quantity + 1, item.selectedShade)}
                                    className="p-0.5 text-gray-500 hover:text-velvet-800 cursor-pointer"
                                  >
                                    <Plus className="w-3 h-3" />
                                  </button>
                                </div>
                              </div>
                            </div>

                            <button
                              onClick={() => onRemoveItem(item.product.id, item.selectedShade)}
                              className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                              title="Delete Item"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        ))}

                        {/* Promo Code Input Box */}
                        <div className="bg-gold-50/30 p-4 rounded-xl border border-gold-100/50 mt-6">
                          <label className="block text-[11px] font-bold text-gold-800 tracking-wider uppercase mb-2 flex items-center gap-1.5">
                            <Gift className="w-3.5 h-3.5" /> Have a Promo Code?
                          </label>
                          
                          {appliedDiscount ? (
                            <div className="flex items-center justify-between bg-emerald-50 text-emerald-800 text-xs px-3 py-2 rounded-lg border border-emerald-200">
                              <span className="font-semibold">Applied: {appliedDiscount.code} ({appliedDiscount.percent}% OFF)</span>
                              <button
                                onClick={handleRemovePromo}
                                className="text-emerald-900 font-bold hover:underline cursor-pointer"
                              >
                                Remove
                              </button>
                            </div>
                          ) : (
                            <div className="space-y-1.5">
                              <div className="flex gap-2">
                                <input
                                  type="text"
                                  placeholder="e.g. GLOW10"
                                  value={couponCode}
                                  onChange={(e) => setCouponCode(e.target.value)}
                                  className="flex-1 px-3 py-2 text-xs rounded-lg border border-gold-200 focus:outline-hidden focus:ring-1 focus:ring-velvet-500 bg-white text-gray-800"
                                />
                                <button
                                  onClick={handleApplyPromo}
                                  className="px-4 py-2 bg-velvet-700 hover:bg-velvet-800 text-white font-bold rounded-lg text-xs cursor-pointer transition-colors"
                                >
                                  Apply
                                </button>
                              </div>
                              {couponError && <p className="text-[10px] text-red-500 font-medium">{couponError}</p>}
                              <p className="text-[10px] text-gray-400 italic">
                                Hint: Enter **GLOW10** or **VELVET20** for discounts!
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </>
                )}

                {/* 2. SHIPPING ADDRESS FLOW */}
                {flowStep === 'shipping' && (
                  <form onSubmit={handleShippingSubmit} className="space-y-4 py-2">
                    <h3 className="text-sm font-bold text-gray-700 tracking-wider uppercase mb-1">
                      Delivery Address
                    </h3>
                    
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">Full Name</label>
                      <input
                        type="text"
                        name="name"
                        value={shippingForm.name}
                        onChange={handleInputChange}
                        placeholder="e.g. Priya Sharma"
                        className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-hidden focus:ring-1 ${
                          formErrors.name ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:ring-velvet-500'
                        }`}
                      />
                      {formErrors.name && <p className="text-[11px] text-red-500 mt-1">{formErrors.name}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">Mobile Number</label>
                      <input
                        type="tel"
                        name="phone"
                        value={shippingForm.phone}
                        onChange={handleInputChange}
                        placeholder="e.g. 9876543210"
                        className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-hidden focus:ring-1 ${
                          formErrors.phone ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:ring-velvet-500'
                        }`}
                      />
                      {formErrors.phone && <p className="text-[11px] text-red-500 mt-1">{formErrors.phone}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">Street Address</label>
                      <input
                        type="text"
                        name="address"
                        value={shippingForm.address}
                        onChange={handleInputChange}
                        placeholder="Apartment/House No, Street, Locality"
                        className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-hidden focus:ring-1 ${
                          formErrors.address ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:ring-velvet-500'
                        }`}
                      />
                      {formErrors.address && <p className="text-[11px] text-red-500 mt-1">{formErrors.address}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-gray-600 mb-1">City</label>
                        <input
                          type="text"
                          name="city"
                          value={shippingForm.city}
                          onChange={handleInputChange}
                          placeholder="Chandigarh"
                          className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-hidden focus:ring-1 ${
                            formErrors.city ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:ring-velvet-500'
                          }`}
                        />
                        {formErrors.city && <p className="text-[11px] text-red-500 mt-1">{formErrors.city}</p>}
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-600 mb-1">Pincode</label>
                        <input
                          type="text"
                          name="zip"
                          value={shippingForm.zip}
                          onChange={handleInputChange}
                          placeholder="160017"
                          maxLength={6}
                          className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-hidden focus:ring-1 ${
                            formErrors.zip ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:ring-velvet-500'
                          }`}
                        />
                        {formErrors.zip && <p className="text-[11px] text-red-500 mt-1">{formErrors.zip}</p>}
                      </div>
                    </div>

                    <div className="border-t border-gray-100 pt-4 mt-6">
                      <h3 className="text-sm font-bold text-gray-700 tracking-wider uppercase mb-3">
                        Payment Method
                      </h3>
                      
                      <div className="space-y-2">
                        <label className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 hover:bg-gold-50/20 cursor-pointer transition-colors">
                          <input
                            type="radio"
                            name="payMethod"
                            value="cod"
                            checked={shippingForm.payMethod === 'cod'}
                            onChange={handleInputChange}
                            className="text-velvet-800 focus:ring-velvet-500 w-4 h-4"
                          />
                          <div>
                            <span className="text-xs font-bold text-gray-800 block">Cash on Delivery (COD)</span>
                            <span className="text-[10px] text-gray-400">Pay cash/UPI at your doorstep. No extra charge.</span>
                          </div>
                        </label>

                        <label className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 hover:bg-gold-50/20 cursor-pointer transition-colors">
                          <input
                            type="radio"
                            name="payMethod"
                            value="upi"
                            checked={shippingForm.payMethod === 'upi'}
                            onChange={handleInputChange}
                            className="text-velvet-800 focus:ring-velvet-500 w-4 h-4"
                          />
                          <div>
                            <span className="text-xs font-bold text-gray-800 block">Instant UPI (GPay/PhonePe)</span>
                            <span className="text-[10px] text-gray-400">Scan QR Code or pay using secure UPI handle.</span>
                          </div>
                        </label>
                      </div>
                    </div>
                  </form>
                )}

                {/* 3. ORDER SUCCESS VIEW */}
                {flowStep === 'success' && (
                  <div className="flex flex-col items-center justify-center text-center h-full py-10">
                    <motion.div
                      initial={{ scale: 0, rotate: -30 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: 'spring', stiffness: 180, damping: 15 }}
                      className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-6 shadow-md"
                    >
                      <CheckCircle className="w-10 h-10" />
                    </motion.div>

                    <h3 className="font-serif text-2xl font-bold text-velvet-950">
                      Order Placed!
                    </h3>
                    <p className="text-xs text-gray-400 mt-1 uppercase tracking-widest">
                      Order ID: VG-{Math.floor(100000 + Math.random() * 900000)}
                    </p>

                    <div className="w-full bg-gold-50/50 rounded-2xl border border-gold-100 p-5 my-6 text-left space-y-3">
                      <div className="flex justify-between text-xs font-semibold text-gray-500">
                        <span>Recipient</span>
                        <span className="text-gray-800">{shippingForm.name}</span>
                      </div>
                      <div className="flex justify-between text-xs font-semibold text-gray-500">
                        <span>Delivery To</span>
                        <span className="text-gray-800 truncate max-w-[180px]">
                          {shippingForm.address}, {shippingForm.city}
                        </span>
                      </div>
                      <div className="flex justify-between text-xs font-semibold text-gray-500">
                        <span>Payment Mode</span>
                        <span className="text-gray-800 uppercase font-bold">{shippingForm.payMethod}</span>
                      </div>
                      <div className="border-t border-gold-100 pt-2.5 flex justify-between text-sm font-bold text-velvet-950">
                        <span>Total Paid</span>
                        <span>₹{grandTotal.toLocaleString('en-IN')}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-emerald-800 bg-emerald-50/80 p-3 rounded-lg border border-emerald-100 mb-6">
                      <Truck className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Estimated delivery: **{new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toDateString()}**</span>
                    </div>

                    <button
                      onClick={handleOrderReset}
                      className="w-full py-3 bg-gradient-to-r from-velvet-700 to-velvet-800 hover:from-velvet-800 hover:to-velvet-950 text-white rounded-xl text-xs font-bold tracking-widest uppercase shadow-md cursor-pointer transition-all hover:scale-[1.02]"
                    >
                      Continue Shopping
                    </button>
                  </div>
                )}

              </div>

              {/* Drawer Footer (Summary & Action Triggers) */}
              {cartItems.length > 0 && flowStep !== 'success' && (
                <div className="border-t border-gold-100 px-6 py-6 bg-gold-50/20">
                  <div className="space-y-2.5 mb-5">
                    <div className="flex justify-between text-xs text-gray-500 font-semibold">
                      <span>Bag Subtotal</span>
                      <span>₹{subtotal.toLocaleString('en-IN')}</span>
                    </div>

                    {appliedDiscount && (
                      <div className="flex justify-between text-xs text-emerald-700 font-bold">
                        <span>Promo Discount ({appliedDiscount.code})</span>
                        <span>- ₹{discountAmount.toLocaleString('en-IN')}</span>
                      </div>
                    )}

                    <div className="flex justify-between text-xs text-gray-500 font-semibold">
                      <span>Standard Shipping</span>
                      {shippingFee === 0 ? (
                        <span className="text-emerald-700 font-bold uppercase tracking-wide">Free</span>
                      ) : (
                        <span>₹{shippingFee}</span>
                      )}
                    </div>

                    {shippingFee > 0 && (
                      <p className="text-[10px] text-gold-700 bg-gold-50/80 px-2.5 py-1 rounded-md">
                        💡 Add ₹{ (500 - subtotal).toLocaleString('en-IN') } more to unlock **FREE SHIPPING**!
                      </p>
                    )}

                    <div className="border-t border-gold-100/60 pt-3 flex justify-between text-base font-serif font-bold text-velvet-950">
                      <span>Grand Total</span>
                      <span>₹{grandTotal.toLocaleString('en-IN')}</span>
                    </div>
                  </div>

                  {flowStep === 'cart' ? (
                    <button
                      onClick={() => setFlowStep('shipping')}
                      className="w-full flex items-center justify-center space-x-2 py-3 bg-velvet-800 hover:bg-velvet-950 text-white rounded-xl text-xs font-bold tracking-widest uppercase shadow-md cursor-pointer transition-colors"
                    >
                      <CreditCard className="w-4 h-4" />
                      <span>Proceed To Checkout</span>
                    </button>
                  ) : (
                    <div className="flex gap-2">
                      <button
                        onClick={() => setFlowStep('cart')}
                        className="flex-1 py-3 border border-gray-200 text-gray-600 hover:bg-gray-50 rounded-xl text-xs font-bold tracking-widest uppercase cursor-pointer transition-colors"
                        disabled={isProcessing}
                      >
                        Back
                      </button>
                      <button
                        onClick={handleShippingSubmit}
                        className="flex-2 py-3 bg-velvet-800 hover:bg-velvet-950 text-white rounded-xl text-xs font-bold tracking-widest uppercase shadow-md cursor-pointer transition-colors disabled:opacity-50"
                        disabled={isProcessing}
                      >
                        {isProcessing ? 'Processing Order...' : `Place Order (₹${grandTotal.toLocaleString('en-IN')})`}
                      </button>
                    </div>
                  )}
                </div>
              )}

            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
