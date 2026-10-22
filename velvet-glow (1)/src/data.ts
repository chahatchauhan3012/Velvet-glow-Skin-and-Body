import { Product, BlogPost, Review, FaqItem } from './types';

import lipstickImg from './assets/images/lipstick_matte_1786614624552.jpg';
import foundationImg from './assets/images/foundation_glow_1786614635465.jpg';
import mascaraImg from './assets/images/mascara_waterproof_1786614648493.jpg';
import eyelinerImg from './assets/images/eyeliner_liquid_1786614660241.jpg';
import compactPowderImg from './assets/images/compact_powder_1786614671600.jpg';
import eyeshadowImg from './assets/images/eyeshadow_palette_1786614681840.jpg';

import vitcImg from './assets/images/vitamin_c_serum_1786614694337.jpg';
import hyaluronicImg from './assets/images/hyaluronic_cream_1786614704203.jpg';
import aloeFacewashImg from './assets/images/aloe_facewash_1786614717167.jpg';
import spf50Img from './assets/images/spf50_sunscreen_1786614729605.jpg';
import niacinamideImg from './assets/images/niacinamide_serum_1786614741429.jpg';
import nightCreamImg from './assets/images/night_cream_1786614752611.jpg';

import arganShampooImg from './assets/images/argan_shampoo_1786614764577.jpg';
import keratinConditionerImg from './assets/images/keratin_conditioner_1786614777091.jpg';
import hairSerumImg from './assets/images/hair_growth_serum_1786614791139.jpg';
import coconutOilImg from './assets/images/coconut_oil_1786614803398.jpg';
import heatSprayImg from './assets/images/heat_spray_1786614815914.jpg';
import hairMaskImg from './assets/images/hair_mask_1786614826135.jpg';

import blogFoundationImg from './assets/images/blog_foundation_1786614840019.jpg';
import blogSkincareImg from './assets/images/blog_skincare_1786614850675.jpg';
import blogHaircareImg from './assets/images/blog_haircare_1786614863381.jpg';
import blogVitamincImg from './assets/images/blog_vitaminc_1786614877405.jpg';
import blogCloudskinImg from './assets/images/blog_cloudskin_1786614888423.jpg';
import blogOilySkincareImg from './assets/images/blog_oily_skincare_1789577034721.jpg';
import blogSerumGlowImg from './assets/images/blog_serum_glow_1789577047301.jpg';
import blogSunscreenGuideImg from './assets/images/blog_sunscreen_guide_1789577063328.jpg';

export const products: Product[] = [
  // COSMETICS
  {
    id: 'cosm-1',
    name: 'Velvet Matte Lipstick',
    price: 699,
    category: 'cosmetics',
    image: lipstickImg,
    description: 'A luxurious, velvety-smooth matte lipstick that delivers intense color payoff in a single swipe. Non-drying formula enriched with Vitamin E and Jojoba oil.',
    rating: 4.8,
    reviewsCount: 342,
    benefits: ['Intense pigmentation', 'Long-lasting 12-hour wear', 'Hydrating matte finish', 'Transfer-resistant'],
    ingredients: ['Vitamin E', 'Jojoba Seed Oil', 'Shea Butter', 'Castor Seed Oil'],
    howToUse: 'Apply directly to clean lips starting from the center and blending outwards. For extra precision, line lips with a lip liner first.',
    shades: ['Ruby Red', 'Velvet Rose', 'Nude Blush', 'Berry Plum', 'Warm Cocoa']
  },
  {
    id: 'cosm-2',
    name: 'Glow Finish Foundation',
    price: 999,
    category: 'cosmetics',
    image: foundationImg,
    description: 'A lightweight foundation that blends seamlessly into the skin for a natural, luminous glow. Buildable medium coverage that lets your real skin shine through.',
    rating: 4.7,
    reviewsCount: 512,
    benefits: ['Dewy, skin-like finish', 'All-day hydration', 'Lightweight and breathable', 'Non-comedogenic'],
    ingredients: ['Hyaluronic Acid', 'Glycerin', 'Aloe Vera Extract', 'SPF 20 Octinoxate'],
    howToUse: 'Dispense 1-2 pumps onto the back of your hand. Dot onto forehead, cheeks, and chin, then blend outwards using a damp beauty sponge or foundation brush.',
    shades: ['Light Ivory', 'Vanilla Beige', 'Natural Sand', 'Warm Honey', 'Golden Amber', 'Deep Mocha']
  },
  {
    id: 'cosm-3',
    name: 'Waterproof Mascara',
    price: 599,
    category: 'cosmetics',
    image: mascaraImg,
    description: 'Get voluminous, ultra-defined lashes that withstand sweat, tears, and humidity. Formulated with flexible fibers that coat every lash from root to tip.',
    rating: 4.6,
    reviewsCount: 219,
    benefits: ['Instant lift & curl', 'Smudge-proof & flake-proof', 'Waterproof for 24 hours', 'Clump-free application'],
    ingredients: ['Carnauba Wax', 'Beeswax', 'Panthenol (Pro-Vitamin B5)', 'Iron Oxides'],
    howToUse: 'Wiggle the brush from the base of your lashes to the tips. Layer for more dramatic volume. Remove with an oil-based makeup remover.',
    shades: ['Pitch Black', 'Deep Brown']
  },
  {
    id: 'cosm-4',
    name: 'Liquid Eyeliner',
    price: 399,
    category: 'cosmetics',
    image: eyelinerImg,
    description: 'An ultra-precise liquid eyeliner with a fine brush tip for creating flawless wings, cat eyes, or graphic lines. Dries quickly to an intense matte black finish.',
    rating: 4.5,
    reviewsCount: 188,
    benefits: ['0.1mm micro-brush tip', 'Quick-drying matte formula', 'Waterproof and smudge-resistant', 'Deep pigment payoff'],
    ingredients: ['Acrylate Copolymer', 'Activated Charcoal', 'Glycerin', 'Deionized Water'],
    howToUse: 'Shake well before use. Draw a thin line along your upper lash line starting from the inner corner, then extend outward to create your desired wing.',
    shades: ['Midnight Black']
  },
  {
    id: 'cosm-5',
    name: 'HD Compact Powder',
    price: 749,
    category: 'cosmetics',
    image: compactPowderImg,
    description: 'A finely milled, high-definition setting powder that blurs imperfections, controls shine, and locks in your makeup with a soft-focus matte finish.',
    rating: 4.4,
    reviewsCount: 143,
    benefits: ['Blurs pores & fine lines', 'Controls excess oil', 'No flashback in photos', 'Silky, lightweight texture'],
    ingredients: ['Talc', 'Mica', 'Silica', 'Zinc Stearate', 'Dimethicone'],
    howToUse: 'Gently press the included puff or a fluffy powder brush into the powder, tap off excess, and press lightly onto oily areas like the T-zone.',
    shades: ['Translucent', 'Fair-Light', 'Medium-Tan', 'Deep-Dark']
  },
  {
    id: 'cosm-6',
    name: 'Nude Eyeshadow Palette',
    price: 1299,
    category: 'cosmetics',
    image: eyeshadowImg,
    description: 'A versatile 12-pan eyeshadow palette containing velvety mattes, shimmering metallics, and sparkling toppers. Perfect for creating daytime minimal looks or smoky evening glamour.',
    rating: 4.9,
    reviewsCount: 289,
    benefits: ['Highly blendable powders', 'Rich color payoff', 'Zero fallout formula', 'Built-in vanity mirror'],
    ingredients: ['Mica', 'Magnesium Stearate', 'Mineral Oil', 'Tocopheryl Acetate'],
    howToUse: 'Apply a light matte shade as a base. Define the crease with a medium shade. Tap a shimmer shade onto the center of the lid for a pop of light.',
    shades: ['12-Shade Warm Nude Palette']
  },

  // SKINCARE
  {
    id: 'skin-1',
    name: 'Vitamin C Serum',
    price: 1199,
    category: 'skincare',
    image: vitcImg,
    description: 'Our award-winning daily brightening serum contains 15% pure L-Ascorbic Acid coupled with Ferulic Acid and Vitamin E to combat environmental stress and restore radiance.',
    rating: 4.8,
    reviewsCount: 680,
    benefits: ['Brightens dull complexion', 'Fades dark spots & pigmentation', 'Boosts collagen production', 'Protects against UV damage'],
    ingredients: ['15% L-Ascorbic Acid (Vitamin C)', '0.5% Ferulic Acid', '1% Vitamin E', 'Hyaluronic Acid', 'Orange Peel Extract'],
    howToUse: 'Apply 4-5 drops onto clean, dry skin every morning. Gently press into face and neck. Follow with a moisturizer and a broad-spectrum sunscreen.',
    isFeatured: true
  },
  {
    id: 'skin-2',
    name: 'Hyaluronic Acid Moisturizer',
    price: 899,
    category: 'skincare',
    image: hyaluronicImg,
    description: 'An ultra-hydrating gel-cream moisturizer that floods the skin with intense moisture. Sinks in instantly without feeling greasy, leaving skin plump and bouncy.',
    rating: 4.7,
    reviewsCount: 412,
    benefits: ['72-hour lock-in hydration', 'Plumps up fine dehydration lines', 'Restores skin barrier', 'Cooling, refreshing feel'],
    ingredients: ['2% Multi-Weight Hyaluronic Acid', 'Ceramides NP & AP', 'Squalane', 'Centella Asiatica (Cica)'],
    howToUse: 'Smooth a dime-sized amount over clean face and neck in upward circular motions. Can be used morning and night.'
  },
  {
    id: 'skin-3',
    name: 'Aloe Vera Face Wash',
    price: 499,
    category: 'skincare',
    image: aloeFacewashImg,
    description: 'A gentle, low-foaming gel cleanser that deeply cleanses the skin of impurities and excess sebum without stripping its natural moisture barrier.',
    rating: 4.5,
    reviewsCount: 304,
    benefits: ['Gentle pH-balanced formula', 'Soothes redness & inflammation', 'Deeply cleanses without dryness', 'Ideal for daily use'],
    ingredients: ['Organic Aloe Vera Juice', 'Green Tea Extract', 'Allantoin', 'Pro-Vitamin B5', 'Mild Coconut Cleansers'],
    howToUse: 'Massage a small amount onto damp skin in circular motions. Rinse thoroughly with lukewarm water. Pat dry with a clean towel.'
  },
  {
    id: 'skin-4',
    name: 'SPF 50 Sunscreen',
    price: 799,
    category: 'skincare',
    image: spf50Img,
    description: 'An ultra-light, fluid daily sunscreen that offers broad-spectrum UVA and UVB protection. Invisible finish with zero white cast or greasy residue.',
    rating: 4.7,
    reviewsCount: 523,
    benefits: ['Broad Spectrum PA++++ Protection', 'Zero white cast & non-sticky', 'Sweat and water-resistant', 'Matte, priming finish'],
    ingredients: ['Zinc Oxide', 'Titanium Dioxide', 'Niacinamide', 'Vitamin E', 'Licorice Root Extract'],
    howToUse: 'Apply generously (about two finger-lengths) as the last step in your skincare routine, at least 15 minutes before sun exposure. Reapply every 2 hours.'
  },
  {
    id: 'skin-5',
    name: 'Niacinamide Face Serum',
    price: 999,
    category: 'skincare',
    image: niacinamideImg,
    description: 'Formulated with 10% Pure Niacinamide and 1% Zinc PCA, this powerful serum regulates sebum production, shrinks enlarged pores, and minimizes blemishes.',
    rating: 4.6,
    reviewsCount: 322,
    benefits: ['Shrinks dilated pores', 'Clears up blemishes & acne marks', 'Regulates excess oil production', 'Evens out skin texture'],
    ingredients: ['10% Niacinamide (Vitamin B3)', '1% Zinc PCA', 'Allantoin', 'Chamomile Extract'],
    howToUse: 'Apply 2-3 drops to clean face and neck in the evening before heavier creams. Pat gently until absorbed. Do not combine with Vitamin C in the same routine.'
  },
  {
    id: 'skin-6',
    name: 'Overnight Repair Cream',
    price: 1299,
    category: 'skincare',
    image: nightCreamImg,
    description: 'A rich, nourishing night cream that works during your skin\'s optimal recovery phase to repair, deeply moisturize, and diminish signs of aging.',
    rating: 4.9,
    reviewsCount: 204,
    benefits: ['Rejuvenates tired skin overnight', 'Supports natural cell turnover', 'Intensely deeply moisturizing', 'Smoothes fine lines & wrinkles'],
    ingredients: ['Encapsulated Retinol (0.1%)', 'Ceramide Complex', 'Peptides', 'Shea Butter', 'Rosehip Oil'],
    howToUse: 'Warm a pea-sized amount between fingertips and press gently into face and neck as the final step in your nighttime routine. Use SPF the following morning.'
  },

  // HAIRCARE
  {
    id: 'hair-1',
    name: 'Argan Oil Shampoo',
    price: 799,
    category: 'haircare',
    image: arganShampooImg,
    description: 'A gentle, sulfate-free shampoo formulated with cold-pressed Moroccan Argan Oil to clean, nourish, and restore strength to dry, frizzy, or damaged hair.',
    rating: 4.7,
    reviewsCount: 418,
    benefits: ['Cleanses without stripping lipids', 'Fights frizz & increases shine', 'Sulfate-free and safe for color-treated hair', 'Repairs split ends'],
    ingredients: ['Pure Moroccan Argan Oil', 'Hydrolyzed Wheat Protein', 'Aloe Vera Leaf Extract', 'Panthenol'],
    howToUse: 'Apply to thoroughly wet hair. Massage a generous amount into the scalp and roots, creating a creamy lather. Rinse thoroughly with cool water.',
    isFeatured: true
  },
  {
    id: 'hair-2',
    name: 'Keratin Conditioner',
    price: 699,
    category: 'haircare',
    image: keratinConditionerImg,
    description: 'An intensive moisture-locking conditioner that infuses Keratin proteins into the hair shaft, smoothing cuticles for silky-straight, manageable hair.',
    rating: 4.6,
    reviewsCount: 301,
    benefits: ['Smooths frizz & flyaways', 'Improves hair elasticity', 'Protects against hair breakage', 'Leaves hair silky and soft'],
    ingredients: ['Hydrolyzed Keratin Protein', 'Sweet Almond Oil', 'Shea Butter', 'Vitamin E'],
    howToUse: 'After shampooing, apply conditioner from mid-lengths to ends. Leave on for 2-3 minutes. Rinse thoroughly with cool water to seal cuticles.'
  },
  {
    id: 'hair-3',
    name: 'Hair Growth Serum',
    price: 1299,
    category: 'haircare',
    image: hairSerumImg,
    description: 'A revolutionary, lightweight scalp serum formulated with Redensyl and Procapil to stimulate hair follicles, reduce hair thinning, and accelerate dense, healthy hair growth.',
    rating: 4.8,
    reviewsCount: 312,
    benefits: ['Reduces daily hair fall', 'Boosts hair thickness & density', 'Nourishes hair stem cells', 'Non-sticky and fast-absorbing'],
    ingredients: ['3% Redensyl', '2% Procapil', 'Saw Palmetto Extract', 'Biotin', 'Rosemary Oil'],
    howToUse: 'Apply a full dropper (1ml) directly to a clean, dry scalp in areas of thinning. Massage with fingertips for 2 minutes. Do not rinse out. Use daily.'
  },
  {
    id: 'hair-4',
    name: 'Coconut Hair Oil',
    price: 599,
    category: 'haircare',
    image: coconutOilImg,
    description: 'A 100% pure, cold-pressed virgin coconut oil enriched with Ayurvedic herbs. It penetrates deep into the hair shaft to lock in protein and provide ultimate nourishment.',
    rating: 4.5,
    reviewsCount: 224,
    benefits: ['Provides deep hot-oil conditioning', 'Promotes a healthy, flake-free scalp', 'Prevents protein loss in hair', 'Soothes dry, itchy scalp'],
    ingredients: ['Cold-pressed Virgin Coconut Oil', 'Amla Extract', 'Bhringraj', 'Fenugreek Seeds'],
    howToUse: 'Warm the oil slightly and massage gently into your scalp and hair. Leave it on for at least 1 hour (or overnight) before washing with a mild shampoo.'
  },
  {
    id: 'hair-5',
    name: 'Deep Repair Hair Mask',
    price: 899,
    category: 'haircare',
    image: hairMaskImg,
    description: 'An intensive weekly therapeutic mask that rescues damaged, over-processed, and heat-styled hair. Deeply reconstructs hair bonds and restores vibrant shine.',
    rating: 4.9,
    reviewsCount: 256,
    benefits: ['Intense structural repair', 'Locks in optimal moisture levels', 'Rebuilds broken disulfide bonds', 'Instant softness and shine'],
    ingredients: ['Macadamia Nut Oil', 'Keratin Amino Acids', 'Hydrolyzed Silk', 'Argan Butter'],
    howToUse: 'After shampooing, apply a generous amount to damp hair from roots to ends. Comb through for even distribution. Leave on for 10-15 minutes. Rinse thoroughly.'
  },
  {
    id: 'hair-6',
    name: 'Heat Protection Spray',
    price: 649,
    category: 'haircare',
    image: heatSprayImg,
    description: 'A weightless thermal shield spray that protects your hair from damage caused by styling tools (up to 230°C / 450°F) while leaving hair frizz-free and sleek.',
    rating: 4.4,
    reviewsCount: 154,
    benefits: ['Protects up to 230°C (450°F)', 'Speeds up blow-dry time', 'Adds a beautiful glossy shine', 'Blocks out atmospheric humidity'],
    ingredients: ['Water-soluble Silicones', 'Hydrolyzed Keratin', 'Olive Fruit Oil Extract', 'UV Filters'],
    howToUse: 'Spray evenly onto damp or dry hair before blow-drying, curling, or flat-ironing. Comb through to distribute the product evenly.'
  }
];

// FEATURED ADDITIONAL INFO FOR HOME PAGE FEATURED PRODUCTS
export const featuredProducts: Product[] = [
  {
    id: 'feat-1',
    name: 'Glow Perfect Foundation',
    price: 999,
    category: 'cosmetics',
    image: foundationImg,
    description: 'A revolutionary light-reflective formula that provides an elegant matte finish while keeping your skin hydrated. Designed to feel like a second skin with SPF 20 protection.',
    rating: 4.9,
    reviewsCount: 1254,
    benefits: ['Long-lasting matte finish', 'SPF 20 Protection', 'Available in 12 shades', 'Weightless medium coverage'],
    ingredients: ['Vitamin E', 'Squalane', 'Titanium Dioxide', 'Hyaluronic Acid'],
    howToUse: 'Blend outwards using a sponge or brush from the center of the face for a beautiful, buildable skin-like finish.',
    shades: ['Ivory Glow', 'Warm Almond', 'Natural Honey', 'Mocha Sand', 'Rich Walnut', 'Fair Sand', 'Beige Silk', 'Soft Bronze'],
    isFeatured: true
  },
  {
    id: 'feat-2',
    name: 'Vitamin C Brightening Serum',
    price: 1199,
    category: 'skincare',
    image: vitcImg,
    description: 'An advanced stable formulation that targets stubborn spots, hyperpigmentation, and signs of fatigue. Reveals a bright, uniform, and glowing complexion.',
    rating: 4.8,
    reviewsCount: 942,
    benefits: ['Brightens dull skin', 'Reduces pigmentation', 'Suitable for all skin types', 'Protects against pollutant damage'],
    ingredients: ['15% Ethyl Ascorbic Acid', 'Ferulic Acid', 'Hyaluronic Acid', 'Licorice Root Extract'],
    howToUse: 'Gently tap 3-4 drops onto cleansed facial skin. Best used during morning skincare paired with SPF.',
    isFeatured: true
  },
  {
    id: 'feat-3',
    name: 'Argan Repair Shampoo',
    price: 799,
    category: 'haircare',
    image: arganShampooImg,
    description: 'An elite organic shampoo designed to heal strands damaged by coloring or heat treatments. Restores essential lipids for a sleek, bouncy, and split-end free look.',
    rating: 4.7,
    reviewsCount: 753,
    benefits: ['Repairs damaged hair', 'Sulfate-free formula', 'Suitable for daily use', 'Infuses deep shine'],
    ingredients: ['Pure Moroccan Argan Oil', 'Silk Proteins', 'Vitamin B5', 'Coconut Water Extract'],
    howToUse: 'Massage into a rich lather on wet scalp and hair. Wash off with lukewarm water for soft, beautiful tresses.',
    isFeatured: true
  }
];

export const reviews: Review[] = [
  {
    id: 'rev-1',
    author: 'Priya Sharma',
    rating: 5,
    comment: 'Amazing skincare products! My skin feels healthier and noticeably brighter within just two weeks of using the Vitamin C Brightening Serum.',
    date: 'July 2, 2026',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150'
  },
  {
    id: 'rev-2',
    author: 'Neha Kapoor',
    rating: 5,
    comment: 'Hands down the best lipstick collection! The Velvet Matte Lipstick has such long-lasting, transfer-proof colors and feels completely weightless on the lips.',
    date: 'June 28, 2026',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150'
  },
  {
    id: 'rev-3',
    author: 'Aisha Khan',
    rating: 4,
    comment: 'The Hair Growth Serum and Argan Shampoo reduced my frizz instantly and helped make my hair feel stronger. Highly recommend Velvet Glow products!',
    date: 'June 15, 2026',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150'
  }
];

export const blogPosts: BlogPost[] = [
  {
    id: 'blog-oily-skin',
    title: 'Best Skincare Routine for Oily Skin',
    description: 'A dermatologist-approved step-by-step skincare guide for oily and acne-prone skin, focusing on gentle oil control, pore refinement, and lightweight hydration.',
    category: 'Skincare',
    readTime: '4 min read',
    date: 'September 16, 2026',
    image: blogOilySkincareImg,
    author: 'Dr. Ananya Roy, Dermatologist',
    content: `Managing oily skin requires balance rather than harsh stripping. When you strip natural oils using aggressive cleansers, your sebaceous glands overcompensate by generating even more sebum, triggering congested pores and persistent breakouts. A targeted morning and evening routine restores equilibrium, minimizes excess shine, and refines texture while maintaining an intact moisture barrier.

1. **Gentle Salicylic Acid Cleansing**: Start every morning and evening with a foaming or gel cleanser formulated with gentle botanical extracts or mild BHAs. Avoid sulfate-heavy soaps that leave skin squeaky clean and dehydrated.
2. **Pore-Refining Niacinamide**: Apply a concentrated Niacinamide serum to regulate oil production, calm surface redness, and visibly tighten enlarged pores without causing flakiness.
3. **Oil-Free Gel Hydration**: Never skip moisturizer. Depriving oily skin of hydration compromises your barrier. Opt for an oil-free, water-based gel moisturizer packed with Hyaluronic Acid and soothing Centella.
4. **Matte Broad-Spectrum Sunscreen**: Shield your skin daily with an ultra-fluid, non-comedogenic SPF 50 sunscreen that dries down to an invisible satin or powder-matte finish.
5. **Nighttime BHA Exfoliation**: Two to three evenings weekly, incorporate a gentle 2% Salicylic Acid exfoliant to dissolve dead keratin and sebum deep inside pore linings.

Consistency and gentle care are essential when treating excess sebum. Look for key ingredients like Zinc PCA, Green Tea, and Witch Hazel to soothe irritation while keeping your complexion fresh. Always pat your face dry with a clean cotton towel and avoid touching active blemishes. By pairing balancing actives with weightless hydration, oily skin transforms from excessively shiny to balanced, clear, healthy, and naturally glowing.`
  },
  {
    id: 'blog-serum-benefits',
    title: 'Benefits of Face Serum for Glowing Skin',
    description: 'Discover how highly concentrated face serums penetrate deeper to target hyperpigmentation, boost collagen, and deliver an unmatched luminous natural glow.',
    category: 'Skincare',
    readTime: '5 min read',
    date: 'September 15, 2026',
    image: blogSerumGlowImg,
    author: 'Dr. Rohan Mehra, Aesthetician',
    content: `Face serums have quickly evolved from a luxury indulgence into the foundational powerhouse of every modern skincare regimen. Unlike standard moisturizers, which contain heavier emollients designed to seal the skin surface, serums feature micro-sized molecular structures that penetrate deep into the dermal layers where cellular renewal happens.

### 1. High Potency Active Ingredients
Serums deliver concentrated doses of targeted actives without filler waxes or heavy occlusives. Whether formulated with pure Vitamin C, Niacinamide, Retinol, or Peptides, every single drop provides an intensive nutritional boost directly to developing skin cells.

### 2. Intensive Brightening and Even Tone
Daily oxidative stress from pollution, screen blue light, and solar exposure causes dullness, dark spots, and patchy discoloration. Antioxidant-rich serums neutralize these free radicals, inhibit the tyrosinase enzyme responsible for irregular pigmentation, and reveal a visibly brighter, uniform luminosity.

### 3. Deep Cellular Hydration
Hyaluronic acid serums formulated with multi-molecular weights can hold up to 1,000 times their weight in water. Smaller molecules penetrate deep to plump up tired tissues from within, while larger molecules create a dewy, glass-like sheen on the epidermis.

### 4. Boosts Elasticity and Collagen
As we age, natural collagen decline leads to fine lines and loss of firmness. Peptide-infused serums stimulate fibroblasts to synthesize fresh elastin and collagen fibers, restoring youthful bounce and supple firmness.

To maximize benefits, apply 3 to 4 drops of serum onto damp, freshly cleansed skin before smoothing on your moisturizer. With daily consistency, face serums create a radiant, lit-from-within glow that makeup alone can never replicate.`
  },
  {
    id: 'blog-sunscreen-guide',
    title: 'How to Choose the Right Sunscreen',
    description: 'A comprehensive guide to understanding SPF ratings, physical versus chemical filters, and finding the best sunscreen formula for your unique skin type.',
    category: 'Skincare',
    readTime: '4 min read',
    date: 'September 14, 2026',
    image: blogSunscreenGuideImg,
    author: 'Dr. Ananya Roy, Dermatologist',
    content: `Sunscreen is universally recognized by dermatologists as the single most critical anti-aging and skin-health product in your daily routine. Over 80% of visible premature facial aging—including stubborn wrinkles, sunspots, and skin sagging—is caused directly by unprotected ultraviolet exposure. However, navigating the crowded sunscreen aisle can feel overwhelming without knowing what to look for.

### Understanding SPF and Broad-Spectrum Protection
Always choose a formula marked **Broad-Spectrum**, meaning it shields against both UVA rays (which penetrate deep and cause premature aging) and UVB rays (which trigger painful sunburns). An SPF 30 blocks approximately 97% of UVB rays, while an SPF 50 blocks 98%. For humid climates and daily urban exposure, SPF 50 with a PA++++ rating offers gold-standard defense.

### Physical vs. Chemical Sunscreens
*   **Physical (Mineral) Sunscreens**: Formulated with Zinc Oxide or Titanium Dioxide, these sit on top of the skin like a microscopic shield, reflecting UV rays away. They are ideal for sensitive, rosacea-prone, or post-treatment skin.
*   **Chemical Sunscreens**: These absorb into the upper skin layers, converting UV radiation into harmless heat. They are lightweight, completely transparent, and layer seamlessly beneath makeup with zero white cast.

### Matching Formula to Your Skin Type
*   **Oily or Acne-Prone Skin**: Seek out fluid, oil-free, gel-based formulations featuring a matte or soft-focus finish.
*   **Dry Skin**: Choose cream-based sunscreens enriched with ceramides, squalane, or glycerin to quench dry patches.

Apply two full finger-lengths of sunscreen to your face, ears, and neck every single morning, and reapply every two hours when outdoors for flawless, lifetime skin protection.`
  },
  {
    id: 'blog-1',
    title: '10 Daily Skincare Tips for Healthy, Glowing Skin',
    description: 'Learn the essential skincare routine and easy habits that keep your skin hydrated, healthy, and naturally radiant every single day.',
    category: 'Skincare',
    readTime: '5 min read',
    date: 'July 14, 2026',
    image: blogSkincareImg,
    author: 'Dr. Ananya Roy, Dermatologist',
    content: `Achieving healthy, glowing skin is not just about genetics; it is about consistency and feeding your skin the right nourishment. Here are the 10 absolute essential skincare tips to incorporate into your daily routine:

1. **Never Skip Sunscreen**: Apply a broad-spectrum SPF 50 sunscreen every morning, even on cloudy days or when staying indoors. UV rays penetrate windows and cause premature aging and pigmentation.
2. **Double Cleanse at Night**: Use an oil-based cleanser or micellar water to break down makeup and sebum first, followed by a gentle gel face wash like the *Velvet Glow Aloe Vera Face Wash*.
3. **Stay Hydrated**: Drink at least 8 to 10 glasses of water. Hydrated skin is plump, bouncy, and better able to heal.
4. **Moisturize Twice Daily**: Lock in hydration with a barrier-repairing moisturizer containing Ceramides or Hyaluronic Acid.
5. **Incorporate Antioxidants**: Use a Vitamin C serum in the morning to brighten dark spots and protect against free radicals.
6. **Get Consistent Sleep**: Your skin repairs itself while you sleep. Aim for 7-8 hours of restful beauty sleep.
7. **Exfoliate Gently**: Exfoliate 1-2 times a week with mild chemical exfoliants (like AHAs or BHAs) to remove dead skin cells and prevent clogged pores. Avoid harsh physical walnut scrubs.
8. **Wash Your Pillowcases Regularly**: Dirty pillowcases harbor bacteria and sweat, which can trigger acne breakouts. Change them weekly.
9. **Avoid Touching Your Face**: Your hands carry millions of bacteria. Touching your face transfers these impurities directly to your skin.
10. **Listen to Your Skin**: If your skin feels tight, dry, or sensitized, cut back on active ingredients and focus purely on hydration and skin-barrier recovery.`
  },
  {
    id: 'blog-2',
    title: 'How to Choose the Perfect Foundation Shade',
    description: 'A complete, step-by-step guide to selecting your ideal foundation shade based on your unique skin tone, undertone, and formula preferences.',
    category: 'Makeup',
    readTime: '4 min read',
    date: 'July 10, 2026',
    image: blogFoundationImg,
    author: 'Karan Mehra, Celebrity Makeup Artist',
    content: `Finding your perfect foundation match can feel like solving a complex puzzle. The secret lies in understanding two key factors: your overall skin tone (fair, medium, tan, deep) and your skin undertone.

### Step 1: Identify Your Undertone
Your undertone is the subtle hue beneath your skin surface. Unlike your skin tone, your undertone never changes.

*   **Cool Undertones**: You have hints of blue, pink, or red.
    *   *The Wrist Test*: Your veins appear purple or blue.
    *   *The Jewelry Test*: Silver jewelry flatters you more than gold.
*   **Warm Undertones**: You have hints of yellow, peach, or golden tones.
    *   *The Wrist Test*: Your veins look greenish.
    *   *The Jewelry Test*: Gold jewelry enhances your warmth.
*   **Neutral Undertones**: Your undertone is a balanced blend of cool and warm.
    *   *The Wrist Test*: Your veins look blue-green.
    *   *The Jewelry Test*: Both gold and silver look equally flattering.

### Step 2: Test Swatches in Natural Light
Always swatch foundation shades along your jawline, not your arm or wrist, which can have a completely different color. Let the foundation dry down for 5-10 minutes (some formulas oxidize and darken when dry). Step into daylight to see which swatch completely disappears into your neck.

### Step 3: Choose the Right Finish
*   **Dry Skin**: Opt for a hydrating, dewy finish like the *Velvet Glow Glow Finish Foundation*.
*   **Oily Skin**: Look for oil-free, matte-finish products.
*   **Sensitive Skin**: Choose fragrance-free, dermatologist-tested formulas.`
  },
  {
    id: 'blog-3',
    title: 'Top Haircare Mistakes You Should Avoid',
    description: 'Discover common haircare blunders that cause hair fall, split ends, and frizz, and learn how to maintain stronger, shinier locks.',
    category: 'Haircare',
    readTime: '6 min read',
    date: 'July 05, 2026',
    image: blogHaircareImg,
    author: 'Simran Kaur, Hair Stylist & Educator',
    content: `Are you doing everything right but still experiencing dull, frizzy hair or excessive breakage? The culprit might be a few sneaky mistakes in your washing and styling habits. Here are the top haircare mistakes you need to stop making immediately:

### 1. Washing Your Hair with Hot Water
Hot water strips your scalp of its natural protective oils and opens up the hair cuticle, making it highly prone to moisture loss, frizz, and color fading. Always use lukewarm or cool water instead to seal in shine.

### 2. Over-Washing
Washing your hair every single day strips away the natural sebum, triggering your scalp to produce even more oil. Limit washing to 2-3 times a week using a gentle, sulfate-free shampoo like *Velvet Glow Argan Oil Shampoo*.

### 3. Applying Conditioner to the Scalp
Conditioner is meant to replenish moisture in the dry, older parts of your hair (the mid-lengths and ends). Applying it directly to your scalp clogs follicles, weighs down your roots, and makes your hair look greasy within hours.

### 4. Rough Towel Drying
Rubbing wet hair vigorously with a rough cotton towel creates intense friction, leading to cuticle damage, tangles, and split ends. Instead, gently squeeze out excess water with a soft microfiber towel or a clean cotton T-shirt.

### 5. Skipping Heat Protection
Using flat irons, curling wands, or blow dryers without a heat barrier literally boils the moisture out of your hair cortex. Always mist your hair with the *Velvet Glow Heat Protection Spray* beforehand to create a protective barrier up to 230°C.`
  },
  {
    id: 'blog-4',
    title: 'Morning vs Night Skincare Routine',
    description: 'Understand the distinct roles of daytime defense and nighttime repair, and how to structure your products for optimal results.',
    category: 'Skincare',
    readTime: '5 min read',
    date: 'June 28, 2026',
    image: blogSkincareImg,
    author: 'Dr. Rohan Mehra, Aesthetician',
    content: `Why can't you use the same skincare routine in the morning and at night? Because your skin has two completely different biological states depending on the time of day!

### Morning Routine: Defense & Shielding
During the day, your skin is in defense mode—fighting off UV radiation, pollution, smoke, and environmental stressors.

1.  **Gentle Cleanser**: Wash with a mild cleanser or simply rinse with lukewarm water to remove overnight buildup.
2.  **Antioxidant (Vitamin C)**: Neutralizes free radicals and boosts collagen. Try the *Velvet Glow Vitamin C Brightening Serum*.
3.  **Lightweight Hydration**: A light cream or gel-cream to keep skin comfortable without feeling heavy.
4.  **Broad-Spectrum Sunscreen (Non-Negotiable)**: Protects against skin cancers and signs of aging.

### Night Routine: Repair & Renewal
While you sleep, your skin enters recovery mode. Cell turnover accelerates, and the skin barrier works to repair damage. This is the time to feed your skin potent active ingredients.

1.  **Double Cleansing**: Thoroughly remove SPF, oil, and pollution.
2.  **Targeted Treatments**: Apply active ingredients like Retinol, Peptides, or chemical exfoliants. (e.g., *Velvet Glow Niacinamide Face Serum*).
3.  **Rich Repair Cream**: Lock in moisture with an emollient cream like the *Velvet Glow Overnight Repair Cream* to restore lipids.`
  },
  {
    id: 'blog-5',
    title: 'Makeup Trends to Try This Season',
    description: 'Explore the hottest, freshest makeup styles, colors, and application techniques loved by beauty enthusiasts globally.',
    category: 'Makeup',
    readTime: '3 min read',
    date: 'June 20, 2026',
    image: blogCloudskinImg,
    author: 'Elena Gomez, Editorial Artist',
    content: `This season is all about celebrating healthy, glowing skin and introducing bold, playful accents. Let's look at the top makeup trends you should try to elevate your look:

### 1. The "Cloud Skin" Aesthetic
Move over heavy matte foundations and ultra-glassy finishes! Cloud skin is a beautiful semi-matte, soft-focus dewy finish that mimics the way light filters through clouds. Achieve this by prepping with a hydrating moisturizer and applying our *Glow Finish Foundation* set lightly with *HD Compact Setting Powder* only in the T-zone.

### 2. Espresso Makeup
A gorgeous monochromatic trend using rich browns, cocoas, and warm caramels across your eyelids, cheeks, and lips. It is incredibly flattering for all skin tones. Use our *Nude Eyeshadow Palette* and top it off with our *Velvet Matte Lipstick* in "Warm Cocoa" for the ultimate sultry look.

### 3. Blurred Lip Stains
Ditch the sharp lip borders. Apply lip color directly to the center of your lips and tap outwards with your fingertip to create a soft, romantic, petal-like stained effect.`
  },
  {
    id: 'blog-6',
    title: 'Benefits of Vitamin C for Your Skin',
    description: 'A deep dive into why Vitamin C is the ultimate superhero ingredient for reversing sun damage and boosting radiance.',
    category: 'Skincare',
    readTime: '4 min read',
    date: 'June 10, 2026',
    image: blogVitamincImg,
    author: 'Dr. Ananya Roy, Dermatologist',
    content: `If you could only use three skincare products, they should be cleanser, sunscreen, and a high-quality **Vitamin C Serum**. Dermatologists universally praise Vitamin C as a cornerstone for bright, youthful skin. Let us explore the scientific benefits of this powerhouse antioxidant:

### 1. Fades Hyperpigmentation and Dark Spots
Vitamin C inhibits the production of tyrosinase, an enzyme that triggers melanin production. With daily use, it gradually fades dark spots, age spots, and sun damage without altering your natural skin tone.

### 2. Stimulates Collagen Synthesis
Collagen is the structural protein that keeps our skin firm, elastic, and free of wrinkles. As we age, collagen production naturally drops. Vitamin C is a critical cofactor in the enzymes that stabilize and cross-link collagen fibers, maintaining skin firmness.

### 3. Powerful Antioxidant Defense
Your skin is exposed to unstable oxygen molecules called free radicals (from pollution and UV light) that break down skin cells. Vitamin C donates electrons to neutralize these free radicals, preventing cellular damage.`
  }
];

export const faqs: FaqItem[] = [
  {
    id: 'faq-1',
    question: 'Do you offer Cash on Delivery (COD)?',
    answer: 'Yes! We offer free Cash on Delivery (COD) on all orders above ₹499 across India. For orders below ₹499, a nominal shipping charge of ₹40 applies.'
  },
  {
    id: 'faq-2',
    question: 'Are Velvet Glow products safe for sensitive skin?',
    answer: 'Absolutely. Every single Velvet Glow product is dermatologist-tested, hypoallergenic, and formulated without parabens, sulfates, phthalates, or harsh synthetic fragrances. We recommend performing a small patch test on your inner arm 24 hours before full use.'
  },
  {
    id: 'faq-3',
    question: 'Are your cosmetic and skincare products cruelty-free?',
    answer: 'Yes, 100%. Velvet Glow is a PETA-certified cruelty-free and vegan brand. We never test any ingredients, formulations, or finished products on animals, and we do not export to countries where animal testing is legally mandated.'
  },
  {
    id: 'faq-4',
    question: 'How long does shipping take?',
    answer: 'We process and dispatch orders within 24 hours. Delivery typically takes 2-4 business days for metropolitan areas and 5-7 business days for other regions across India.'
  },
  {
    id: 'faq-5',
    question: 'Can I return or exchange a product if it does not suit me?',
    answer: 'Yes, we have a hassle-free 15-day return and exchange policy. If a product is damaged upon delivery, or if a foundation shade does not match your skin tone, you can request a return or free shade replacement via our Contact Page or by emailing support.'
  }
];
