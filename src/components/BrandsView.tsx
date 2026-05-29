import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Award, MessageCircle, ChevronRight, X, Sparkles, AlertCircle, ShoppingCart } from 'lucide-react';
import { Product } from '../types';

interface BrandsViewProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
}

export default function BrandsView({ products, onAddToCart }: BrandsViewProps) {
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);

  // High-fidelity dealer bios & official representations
  const brandProfiles = [
    {
      name: 'Samsung',
      logo: 'SAMSUNG',
      motto: 'Official South-South Direct Dealership',
      bio: 'Ugomenz delivers premium premium visual OLED and Crystal UHD innovations. Samsung guarantees robust design standards for luxury villas, with 12 months comprehensive after-sales support managed directly by our technical engineers.',
      isDealer: true,
      image: 'https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&w=600&q=80'
    },
    {
      name: 'LG',
      logo: 'LG Life\'s Good',
      motto: 'Authorized Direct Retail Agency',
      bio: 'Leading in OLED technology. LG OLED displays represent the gold standard of organic pixel illumination, cinema black alignment, and spatial acoustics. Every model is sourced directly with verifiable origin seal stamps.',
      isDealer: true,
      image: 'https://images.unsplash.com/photo-1601944179066-297acd3ad81e?auto=format&fit=crop&w=600&q=80'
    },
    {
      name: 'Sony',
      logo: 'SONY',
      motto: 'Certified Audiovisual Specialists',
      bio: 'From cinema-level 5.1ch surround soundbar layouts to industry-leading full-frame mirrorless cameras (such as the Sony Alpha 7 IV), our partnership with Sony guarantees direct firmware matching, spare parts, and premium diagnostics.',
      isDealer: true,
      image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=600&q=80'
    },
    {
      name: 'Hisense',
      logo: 'Hisense',
      motto: 'Exclusive 100" Pro-Projection Dealership',
      bio: 'Leading the spatial projection revolution. Our direct partnership with Hisense permits exclusive inventory of 100-inch and 120-inch Ultra short throw smart laser cinema displays. Honored with local Warri-based on-site swap warranties.',
      isDealer: true,
      image: 'https://images.unsplash.com/photo-1595246140625-573b715d11dc?auto=format&fit=crop&w=600&q=80'
    },
    {
      name: 'JVC',
      logo: 'JVC Tokyo',
      motto: 'Authorized Distributor Store',
      bio: 'Famous for precision-engineered sound reinforcement bar setups and portable party boxes. Built to deliver massive audio pressure and withstand ambient electricity surges. Ideal for churches, bars, and luxury lounges.',
      isDealer: true,
      image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=600&q=80'
    },
    {
      name: 'Skyworth',
      logo: 'SkyWorth',
      motto: 'Premium Android Google TV Partner',
      bio: 'Skyworth bounds bezel-less screens with Google TV AI platforms natively. We stock wide arrays from 32" up to 75" Google Home linked models, alongside heavy-duty household surge stabilizers manufactured for peak efficiency.',
      isDealer: true,
      image: 'https://images.unsplash.com/photo-1552975084-6e027cd345c2?auto=format&fit=crop&w=600&q=80'
    }
  ];

  const handleBrandInquiry = (brandName: string) => {
    const msg = `Hello Ugomenz Electronics! I would like to enquire about your available models from ${brandName}. Please send your latest catalogue pricing, thanks.`;
    window.open(`https://wa.me/2348052000034?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      
      {/* Title */}
      <div className="mb-8">
        <h2 className="text-2xl md:text-3xl font-display font-bold text-brand-black tracking-tight">
          Brand Catalogue & Partnerships
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Ugomenz partners with the world’s leading consumer electronics manufacturers. View our certifications.
        </p>
      </div>

      {/* Grid of brand tiles */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {brandProfiles.map((brand) => {
          // Count models in store of this brand
          const productCount = products.filter(p => p.brand.toLowerCase() === brand.name.toLowerCase()).length;

          return (
            <motion.div
              key={brand.name}
              whileHover={{ y: -3 }}
              className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm flex flex-col justify-between group"
            >
              {/* Image banner */}
              <div className="h-44 relative overflow-hidden bg-gray-100">
                <img src={brand.image} alt={brand.name} className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-black/85 via-transparent to-transparent" />
                
                {/* Badge */}
                {brand.isDealer && (
                  <div className="absolute top-3 left-3 bg-brand-orange text-white text-[9px] uppercase tracking-wider font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                    <Award className="w-3 h-3" />
                    <span>Authorized Dealer</span>
                  </div>
                )}

                {/* Logo Text */}
                <div className="absolute bottom-3 left-4">
                  <h3 className="font-display font-bold text-xl tracking-wide text-white leading-none">
                    {brand.name}
                  </h3>
                  <p className="text-[10px] text-gray-300 mt-1 font-mono">{brand.motto}</p>
                </div>
              </div>

              {/* Bio & Details */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <p className="text-xs text-gray-500 leading-relaxed font-sans">
                    {brand.bio}
                  </p>
                  <p className="text-xs font-semibold text-brand-orange mt-4">
                    🔍 {productCount} authorized models currently in showroom.
                  </p>
                </div>

                {/* Brand Footers CTA */}
                <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between gap-2">
                  <button
                    onClick={() => handleBrandInquiry(brand.name)}
                    className="flex-1 py-2 bg-green-50 text-green-600 hover:bg-green-105 rounded-lg text-xs font-semibold text-center flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>Inquire</span>
                  </button>

                  <button
                    onClick={() => setSelectedBrand(brand.name)}
                    className="flex-1 py-2 bg-gray-900 hover:bg-brand-orange text-white hover:text-white rounded-lg text-xs font-semibold text-center flex items-center justify-center gap-1 transition-colors cursor-pointer"
                  >
                    <span>View Models</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Brand Specific Models Lightbox Panel */}
      <AnimatePresence>
        {selectedBrand && (
          <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl p-6 relative"
            >
              {/* Close Button Header */}
              <button
                onClick={() => setSelectedBrand(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-50 text-gray-500 hover:text-black flex items-center justify-center border border-gray-200"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-2 mb-4 border-b border-gray-100 pb-3">
                <Sparkles className="w-5 h-5 text-brand-orange" />
                <h3 className="text-xl font-display font-bold text-brand-black">
                  Authorized {selectedBrand} Models
                </h3>
              </div>

              {/* List of products matching brand */}
              <div className="space-y-4">
                {products.filter(p => p.brand.toLowerCase() === selectedBrand.toLowerCase()).map(p => (
                  <div key={p.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 border border-gray-250 bg-gray-50/50 rounded-2xl group">
                    <div className="flex items-center gap-3">
                      <img src={p.image} className="w-16 h-12 object-cover rounded-lg border border-gray-200" referrerPolicy="no-referrer" />
                      <div>
                        <h4 className="text-xs font-bold text-gray-900 group-hover:text-brand-orange transition-colors">
                          {p.name}
                        </h4>
                        <p className="text-[10px] text-gray-400 mt-0.5">Category: {p.category} | State: {p.stockStatus}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-0 pt-2 sm:pt-0">
                      <span className="text-sm font-mono font-bold text-brand-black">
                        ₦{p.price.toLocaleString()}
                      </span>
                      <button
                        onClick={() => {
                          onAddToCart(p);
                          setSelectedBrand(null);
                        }}
                        className="px-3 py-1.5 bg-brand-orange text-white text-[10px] font-bold rounded-lg hover:bg-orange-650 cursor-pointer transition-colors"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                ))}

                {products.filter(p => p.brand.toLowerCase() === selectedBrand.toLowerCase()).length === 0 && (
                  <div className="text-center py-10">
                    <AlertCircle className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                    <p className="text-xs text-gray-500 font-medium font-mono">No models matching {selectedBrand} are loaded in showroom storage today.</p>
                  </div>
                )}
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
