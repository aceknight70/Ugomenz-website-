import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Tag, Image, Video, Sparkles, MessageCircle, ShoppingCart, Eye, ChevronRight, X, Clock, HelpCircle, ArrowRight
} from 'lucide-react';
import { Product, GalleryItem, BlogPost, isVideoSrc } from '../types';

interface HomeViewProps {
  products: Product[];
  galleryItems: GalleryItem[];
  blogPosts: BlogPost[];
  onAddToCart: (product: Product) => void;
  onNavigate: (view: string) => void;
}

export default function HomeView({
  products,
  galleryItems,
  blogPosts,
  onAddToCart,
  onNavigate
}: HomeViewProps) {
  const [activeTab, setActiveTab] = useState<'All' | 'Products' | 'Room Setups' | 'Videos' | 'Deals'>('All');
  
  // Selected Card for detailing Modal
  const [selectedItem, setSelectedItem] = useState<{
    type: 'Product' | 'Setup' | 'Video' | 'Deal' | 'Blog';
    title: string;
    desc: string;
    image: string;
    price?: number;
    originalPrice?: number;
    specs?: string[];
    brand?: string;
    extra?: any;
  } | null>(null);

  // Hardcode some mock deals & video nodes to enrich the grid honestly!
  const mockDeals = [
    {
      id: 'deal-1',
      title: 'Mega Anniversary discount on LG C3 OLED TVs!',
      desc: 'Save 100,000 Naira on LG OLED screens for one single week. Order checkout via WhatsApp linked.',
      image: 'https://images.unsplash.com/photo-1601944179066-297acd3ad81e?auto=format&fit=crop&w=600&q=80',
      price: 1850000,
      originalPrice: 1950000,
      brand: 'LG',
      tag: '100K Save'
    },
    {
      id: 'deal-2',
      title: 'Free Surge Protector with Samsung TV!',
      desc: 'Protect your cinema. Receive a free Ugomenz AVR Power stabilizer on buying any Samsung series.',
      image: 'https://images.unsplash.com/photo-1624996379697-f01d168b1a52?auto=format&fit=crop&w=600&q=80',
      tag: 'Bonus Offer'
    }
  ];

  const mockVideos = [
    {
      id: 'vid-1',
      title: 'Sony Alpha 7 IV In-Depth Walkthrough',
      desc: 'Fortune reviews how the new hybrid CMOS autofocus operates in dim lighting studios.',
      thumbnail: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=600&q=80',
      duration: '4:15',
      author: 'Fortune Akioya'
    },
    {
      id: 'vid-2',
      title: 'Before/After: 100" Projection TV Wall Install',
      desc: 'Watch the step-by-step room acoustics alignment live from an Effurun duplex.',
      thumbnail: 'https://images.unsplash.com/photo-1595246140625-573b715d11dc?auto=format&fit=crop&w=600&q=80',
      duration: '8:44',
      author: 'Ugomenz Tech Lab'
    }
  ];

  // Map other arrays into a cohesive multi-height card list
  const getGridItems = () => {
    let items: any[] = [];

    // Push Products
    if (activeTab === 'All' || activeTab === 'Products') {
      products.forEach(p => {
        items.push({
          id: p.id,
          type: 'Product',
          title: p.name,
          desc: p.description,
          image: p.image,
          price: p.price,
          originalPrice: p.originalPrice,
          specs: p.specs,
          brand: p.brand,
          badge: p.stockStatus === 'In Stock' ? 'In Stock' : p.stockStatus,
          badgeColor: p.stockStatus === 'In Stock' ? 'bg-green-100 text-green-800' : p.stockStatus === 'Low Stock' ? 'bg-amber-100 text-amber-805' : 'bg-red-100 text-red-800',
          originalObj: p
        });
      });
    }

    // Push Setups (Gallery Items)
    if (activeTab === 'All' || activeTab === 'Room Setups') {
      galleryItems.forEach(g => {
        items.push({
          id: g.id,
          type: 'Setup',
          title: g.title,
          desc: g.caption || "Completed customer-space audio-visual integration in Delta State.",
          image: g.image,
          badge: g.category,
          badgeColor: 'bg-brand-blue-tint text-brand-blue border border-brand-blue/20'
        });
      });
    }

    // Push Deals
    if (activeTab === 'All' || activeTab === 'Deals') {
      mockDeals.forEach(d => {
        items.push({
          id: d.id,
          type: 'Deal',
          title: d.title,
          desc: d.desc,
          image: d.image,
          price: d.price,
          originalPrice: d.originalPrice,
          brand: d.brand,
          badge: d.tag,
          badgeColor: 'bg-red-100 text-red-800 border border-red-200'
        });
      });
    }

    // Push Videos
    if (activeTab === 'All' || activeTab === 'Videos') {
      mockVideos.forEach(v => {
        items.push({
          id: v.id,
          type: 'Video',
          title: v.title,
          desc: v.desc,
          image: v.thumbnail,
          badge: `Video ${v.duration}`,
          badgeColor: 'bg-slate-900/80 text-white',
          extra: v
        });
      });
    }

    // Add blogs silently if on "All" to drive clicks
    if (activeTab === 'All') {
      blogPosts.slice(0, 2).forEach(b => {
        items.push({
          id: b.id,
          type: 'Blog',
          title: b.title,
          desc: b.excerpt,
          image: b.image,
          badge: 'Tech Tip',
          badgeColor: 'bg-indigo-100 text-indigo-805',
          originalObj: b
        });
      });
    }

    // Shuffle slightly to create an authentic Pintrest feel
    return items;
  };

  const currentItems = getGridItems();

  const handleEnquireWhatsApp = (title: string, price?: number) => {
    const formattedPrice = price ? `₦${price.toLocaleString()}` : 'Inquiry';
    const msg = `Hello Ugomenz Electronics! I am viewing your website feed and would like to enquire about: "${title}" (${formattedPrice}). Please guide me on stock status, thank you.`;
    window.open(`https://wa.me/2348052000034?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      
      {/* Billboard Hero Section */}
      <div className="bg-gradient-to-r from-brand-black to-gray-900 rounded-3xl p-8 md:p-12 text-white mb-10 relative overflow-hidden shadow-xl border border-gray-800/60">
        <div className="absolute right-0 bottom-0 top-0 w-1/2 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-brand-orange via-transparent to-transparent hidden md:block" />
        <div className="max-w-xl relative z-10">
          <div className="flex items-center gap-2 mb-4 bg-brand-orange/15 border border-brand-orange/30 text-brand-orange px-3 py-1.5 rounded-full w-max text-xs font-semibold font-mono">
            <Sparkles className="w-3.5 h-3.5" />
            <span>FORTUNE AKIOYA’S DELTA BRIEFING 2026</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-display font-medium tracking-tight leading-tight">
            Sensory Cinema & Power Protection.
          </h1>
          <p className="text-sm md:text-base text-gray-300 mt-4 leading-relaxed">
            Ugomenz is Warri’s premier Authorized Electronics Sales & Technical Service hub. Browse high-resolution OLED displays, Dolby Atmos acoustic soundbars, and surge-resilient power AVR setups.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button
              onClick={() => onNavigate('showroom')}
              className="px-6 py-3 bg-brand-orange hover:bg-orange-600 text-white rounded-full font-semibold text-xs tracking-wider uppercase cursor-pointer transition-colors shadow-md shadow-brand-orange/20"
            >
              Enter Showroom
            </button>
            <button
              onClick={() => onNavigate('shadow_school')}
              className="px-6 py-3 bg-gray-900 hover:bg-gray-800 border border-gray-800 text-white rounded-full font-semibold text-xs tracking-wider uppercase cursor-pointer transition-colors"
            >
              Shadow School Info
            </button>
          </div>
        </div>
      </div>

      {/* Grid Filter Ribbon */}
      <div className="flex items-center justify-between border-b border-gray-200 pb-4 mb-8 gap-4 flex-wrap">
        <div className="flex items-center gap-1.5 overflow-x-auto select-none scrollbar-none pb-2 sm:pb-0">
          {(['All', 'Products', 'Room Setups', 'Videos', 'Deals'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                activeTab === tab
                  ? 'bg-brand-orange text-white shadow-sm'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        <p className="text-[10px] text-gray-500 font-mono tracking-wide uppercase">
          ✦ Click any item to read details, order, or chat.
        </p>
      </div>

      {/* Masonry / Auto-fill Responsive Grid */}
      <motion.div
        layout
        className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6"
      >
        {currentItems.map((item) => (
          <motion.div
            key={`${item.type}-${item.id}`}
            layout
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            whileHover={{ y: -3 }}
            className="break-inside-avoid bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-brand-orange hover:shadow-lg transition-all flex flex-col relative group cursor-pointer"
            onClick={() => setSelectedItem(item)}
          >
            {/* Visual Header */}
            <div className="relative overflow-hidden aspect-[4/3] bg-gray-50 flex items-center justify-center">
              {isVideoSrc(item.image) ? (
                <video
                  src={item.image}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500 bg-black"
                />
              ) : (
                <img
                  src={item.image}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                />
              )}
              {/* Type Category Tag */}
              <div className="absolute top-3 left-3 flex gap-1.5">
                <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm ${item.badgeColor}`}>
                  {item.badge || item.type}
                </span>
              </div>

              {/* Hover sweep visual */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-350 flex items-end p-4">
                <span className="text-white text-xs font-semibold flex items-center gap-1">
                  Read Detail & Inquire <ChevronRight className="w-4 h-4" />
                </span>
              </div>
            </div>

            {/* Typography Description Panel */}
            <div className="p-5 flex-1 flex flex-col">
              <span className="text-[9px] font-mono tracking-wider text-brand-orange uppercase font-bold mb-1">
                {item.brand || item.type}
              </span>
              <h3 className="font-display font-bold text-sm text-brand-black tracking-tight leading-snug group-hover:text-brand-orange transition-colors">
                {item.title}
              </h3>
              <p className="text-xs text-gray-500 mt-2 line-clamp-2 leading-relaxed">
                {item.desc}
              </p>

              {/* Price panel if a product or deal */}
              {item.price && (
                <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-sm font-mono font-bold text-brand-black">
                      ₦{item.price.toLocaleString()}
                    </span>
                    {item.originalPrice && (
                      <span className="text-[10px] font-mono line-through text-gray-400">
                        ₦{item.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>
                  <Tag className="w-3.5 h-3.5 text-brand-orange" />
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Empty state context if items filter drops */}
      {currentItems.length === 0 && (
        <div className="bg-gray-100 rounded-2xl py-16 px-4 text-center border-2 border-dashed border-gray-200">
          <HelpCircle className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <p className="text-sm text-gray-600 font-medium">No results loaded under this view tab currently.</p>
          <button
            onClick={() => setActiveTab('All')}
            className="text-xs font-mono font-bold text-brand-orange hover:underline uppercase mt-2"
          >
            Reset Grid Feed
          </button>
        </div>
      )}

      {/* Detail Showcase Lightbox Overlay */}
      <AnimatePresence>
        {selectedItem && (
          <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-100 relative"
            >
              {/* Close Button Trigger */}
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/90 shadow text-gray-600 hover:text-black flex items-center justify-center hover:scale-105 transition-all border border-gray-200"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex flex-col">
                <div className="h-64 sm:h-80 relative flex items-center justify-center bg-gray-50 overflow-hidden">
                  {isVideoSrc(selectedItem.image) ? (
                    <video
                      src={selectedItem.image}
                      controls
                      autoPlay
                      loop
                      muted={false}
                      playsInline
                      className="w-full h-full object-cover bg-black"
                    />
                  ) : (
                    <img
                      src={selectedItem.image}
                      alt={selectedItem.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  )}
                  <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-slate-900/40 to-transparent pointer-events-none" />
                  <span className="absolute bottom-4 left-4 bg-brand-orange text-white text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full">
                    {selectedItem.type} Details
                  </span>
                </div>

                <div className="p-6 md:p-8">
                  {selectedItem.brand && (
                    <span className="text-[10px] font-mono tracking-widest text-brand-orange uppercase font-bold block mb-1">
                      {selectedItem.brand} Official Dealer
                    </span>
                  )}
                  <h3 className="text-xl md:text-2xl font-display font-medium text-brand-black tracking-tight leading-snug">
                    {selectedItem.title}
                  </h3>

                  <p className="text-gray-600 text-sm mt-4 leading-relaxed whitespace-pre-line">
                    {selectedItem.desc}
                  </p>

                  {/* Technical Specifications checklist if product exists */}
                  {selectedItem.specs && selectedItem.specs.length > 0 && (
                    <div className="mt-6 bg-brand-orange-tint/40 p-4 rounded-2xl border border-brand-orange/10">
                      <h4 className="text-xs uppercase tracking-wider font-bold text-brand-orange font-mono mb-2">
                        Technical Integrations & Specs
                      </h4>
                      <ul className="space-y-1.5">
                        {selectedItem.specs.map((sp, sIdx) => (
                          <li key={sIdx} className="text-xs text-gray-700 flex items-start gap-2">
                            <span className="text-brand-orange mt-0.5">•</span>
                            <span>{sp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Video Extra Details node view */}
                  {selectedItem.type === 'Video' && selectedItem.extra && (
                    <div className="mt-4 flex items-center gap-3 bg-gray-50 border border-gray-250 p-4 rounded-xl font-mono text-xs text-gray-600">
                      <Video className="w-5 h-5 text-red-500" />
                      <div>
                        <p className="font-bold text-gray-800">Presented by: {selectedItem.extra.author}</p>
                        <p className="text-[10px]">In-store technical workshop record • Length: {selectedItem.extra.duration}</p>
                      </div>
                    </div>
                  )}

                  {/* Pricing and checkout trigger drawer */}
                  <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                    {selectedItem.price ? (
                      <div className="flex flex-col">
                        <span className="text-xs text-gray-400">Guaranteed Brand Price</span>
                        <div className="flex items-baseline gap-2">
                          <span className="text-xl font-mono font-bold text-brand-black">
                            ₦{selectedItem.price.toLocaleString()}
                          </span>
                          {selectedItem.originalPrice && (
                            <span className="text-xs font-mono line-through text-gray-450">
                              ₦{selectedItem.originalPrice.toLocaleString()}
                            </span>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div className="text-xs text-gray-400">
                        * Technical inquiries handled via direct WhatsApp routing
                      </div>
                    )}

                    <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                      <button
                        onClick={() => handleEnquireWhatsApp(selectedItem.title, selectedItem.price)}
                        className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl text-xs font-semibold tracking-wide cursor-pointer transition-colors"
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span>Enquire on WhatsApp</span>
                      </button>

                      {selectedItem.price && selectedItem.originalObj && (
                        <button
                          onClick={() => {
                            onAddToCart(selectedItem.originalObj);
                            setSelectedItem(null);
                          }}
                          className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-3 bg-brand-orange hover:bg-orange-600 text-white rounded-xl text-xs font-semibold tracking-wide cursor-pointer transition-colors"
                        >
                          <ShoppingCart className="w-4 h-4" />
                          <span>Add to Cart</span>
                        </button>
                      )}
                    </div>
                  </div>

                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
