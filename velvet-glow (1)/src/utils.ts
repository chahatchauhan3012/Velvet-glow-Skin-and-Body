import React from 'react';

// Highly reliable category-specific fallback beauty images
const BEAUTY_FALLBACKS: Record<string, string> = {
  cosmetics: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&q=80&w=600',
  skincare: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=600',
  haircare: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&q=80&w=600',
  default: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=600',
};

/**
 * Fallback handler for image load errors.
 * Replaces broken images with reliable, relevant beauty product images based on category.
 */
export const handleImageError = (
  e: React.SyntheticEvent<HTMLImageElement, Event>,
  category: string = 'default'
) => {
  const target = e.currentTarget;
  if (target.dataset.hasFailed) return; // Prevent infinite error loops
  target.dataset.hasFailed = 'true';

  const catKey = category.toLowerCase();
  const fallbackUrl =
    BEAUTY_FALLBACKS[catKey] ||
    (catKey.includes('cosm') ? BEAUTY_FALLBACKS.cosmetics :
     catKey.includes('skin') ? BEAUTY_FALLBACKS.skincare :
     catKey.includes('hair') ? BEAUTY_FALLBACKS.haircare :
     BEAUTY_FALLBACKS.default);

  target.src = fallbackUrl;
};


