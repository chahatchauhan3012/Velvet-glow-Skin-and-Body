import { BlogPost } from '../types';
import { X, Calendar, Clock, User, Share2, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import React from 'react';
import { handleImageError } from '../utils';

interface BlogReaderModalProps {
  post: BlogPost | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function BlogReaderModal({ post, isOpen, onClose }: BlogReaderModalProps) {
  if (!post) return null;

  // Simple formatter to convert markdown-like syntax in blog content to JSX
  const renderFormattedContent = (text: string) => {
    return text.split('\n\n').map((paragraph, index) => {
      // 1. Render numbered lists
      if (paragraph.startsWith('1. ') || /^\d+\.\s/.test(paragraph)) {
        const items = paragraph.split('\n');
        return (
          <ol key={index} className="list-decimal pl-5 space-y-3 my-4 font-sans text-gray-700">
            {items.map((item, idx) => {
              const cleanedItem = item.replace(/^\d+\.\s+/, '');
              // Match bold words inside items
              const boldParts = cleanedItem.split('**');
              return (
                <li key={idx} className="leading-relaxed">
                  {boldParts.map((part, i) => (i % 2 === 1 ? <strong key={i} className="text-velvet-950 font-bold">{part}</strong> : part))}
                </li>
              );
            })}
          </ol>
        );
      }

      // 2. Render bullet lists
      if (paragraph.startsWith('* ') || paragraph.startsWith('- ')) {
        const items = paragraph.split('\n');
        return (
          <ul key={index} className="list-disc pl-5 space-y-2.5 my-4 font-sans text-gray-700">
            {items.map((item, idx) => {
              const cleanedItem = item.replace(/^[*|-]\s+/, '');
              const boldParts = cleanedItem.split('**');
              return (
                <li key={idx} className="leading-relaxed">
                  {boldParts.map((part, i) => (i % 2 === 1 ? <strong key={i} className="text-velvet-950 font-bold">{part}</strong> : part))}
                </li>
              );
            })}
          </ul>
        );
      }

      // 3. Render Level 3 headers
      if (paragraph.startsWith('### ')) {
        return (
          <h4 key={index} className="font-serif text-lg font-bold text-velvet-900 mt-8 mb-3">
            {paragraph.replace('### ', '')}
          </h4>
        );
      }

      // 4. Render Level 2 headers
      if (paragraph.startsWith('## ')) {
        return (
          <h3 key={index} className="font-serif text-xl font-bold text-velvet-950 mt-10 mb-4 border-b border-gold-100 pb-2">
            {paragraph.replace('## ', '')}
          </h3>
        );
      }

      // 5. Default paragraphs with bold formatting support
      const boldParts = paragraph.split('**');
      return (
        <p key={index} className="font-sans text-sm sm:text-base text-gray-700 leading-relaxed mb-4.5">
          {boldParts.map((part, i) => {
            // Check for italic items within bold pieces
            if (part.startsWith('*') && part.endsWith('*')) {
              return <em key={i} className="text-gold-800 font-semibold">{part.replace(/\*/g, '')}</em>;
            }
            return i % 2 === 1 ? <strong key={i} className="text-velvet-950 font-bold">{part}</strong> : part;
          })}
        </p>
      );
    });
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
            className="absolute inset-0 bg-black/65 backdrop-blur-xs"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 30 }}
            className="relative bg-white w-full max-w-3xl rounded-3xl overflow-hidden shadow-2xl z-10 flex flex-col max-h-[85vh]"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 p-2.5 bg-white/90 backdrop-blur-xs text-gray-500 hover:text-velvet-900 rounded-full shadow-md hover:bg-white transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Scrollable Container */}
            <div className="overflow-y-auto">
              
              {/* Cover Image */}
              <div className="relative pt-[45%] bg-gold-50/20 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  referrerPolicy="no-referrer"
                  onError={(e) => handleImageError(e, post.category || 'beauty')}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                
                {/* Category & Title */}
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <span className="bg-gold-500 text-velvet-950 text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-md">
                    {post.category}
                  </span>
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight mt-3 text-white">
                    {post.title}
                  </h2>
                </div>
              </div>

              {/* Meta details & Author card */}
              <div className="px-6 sm:px-8 py-5 border-b border-gold-50 flex flex-wrap items-center justify-between gap-4 bg-gold-50/10">
                <div className="flex items-center space-x-4 text-xs text-gray-500">
                  <span className="flex items-center gap-1.5 font-medium">
                    <User className="w-3.5 h-3.5 text-gold-600" />
                    {post.author}
                  </span>
                  <span className="flex items-center gap-1.5 font-mono">
                    <Calendar className="w-3.5 h-3.5 text-gold-600" />
                    {post.date}
                  </span>
                  <span className="flex items-center gap-1.5 font-mono">
                    <Clock className="w-3.5 h-3.5 text-gold-600" />
                    {post.readTime}
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-emerald-500" /> Velvet Approved
                  </span>
                </div>
              </div>

              {/* Rich Body Content */}
              <div className="px-6 sm:px-8 py-6 sm:py-8 font-serif text-gray-800">
                <article className="prose max-w-none">
                  {renderFormattedContent(post.content)}
                </article>
              </div>

              {/* Article Footer */}
              <div className="px-6 sm:px-8 py-5 border-t border-gold-50 bg-gray-50 flex items-center justify-between text-xs text-gray-400">
                <span>© 2026 Velvet Glow Beauty Store. All rights reserved.</span>
                <span className="font-medium text-gold-700 cursor-pointer hover:underline flex items-center gap-1">
                  <Share2 className="w-3.5 h-3.5" /> Share Article
                </span>
              </div>

            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
