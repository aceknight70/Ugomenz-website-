import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Smartphone, Tv, Volume2, Camera, Compass, Grid, Search, SlidersHorizontal,
  ChevronDown, ArrowUpDown, Check, MessageCircle, ShoppingCart, View, X
} from 'lucide-react';
import { Product, isVideoSrc } from '../types';

interface ShowroomViewProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  searchFilterGlobal: string;
}

export default function ShowroomView({
  products,
  onAddToCart,
  searchFilterGlobal
}: ShowroomViewProps) {
  // Local active state
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [localSearch, setLocalSearch] = useState<string>('');
  const [selectedBrand, setSelectedBrand] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'default' | 'priceAsc' | 'priceDesc' | 'newest'>('default');
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  
  // Active Product detail state
  const [activeDetailProduct, setActiveDetailProduct] = useState<Product | null>(null);

  // Hardcode category specs & beautiful SVG category tiles
  const categoryTiles = [
    { name: 'All', icon: Grid, count: products.length },
    { name: 'TVs', icon: Tv, count: products.filter(p => p.category === 'TVs').length },
    { name: 'Home Theaters', icon: Volume2, count: products.filter(p => p.category === 'Home Theaters').length },
    { name: 'Sound Systems', icon: Volume2, count: products.filter(p => p.category === 'Sound Systems').length },
    { name: 'Cameras', icon: Camera, count: products.filter(p => p.category === 'Cameras').length },
    { name: 'Accessories', icon: Compass, count: products.filter(p => p.category === 'Accessories').length },
  ];

  // Derive unique brands in product catalog
  const uniqueBrands = useMemo(() => {
    return ['All', ...Array.from(new Set(products.map(p => p.brand)))];
  }, [products]);

  // Combined filters
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Category filter
    if (selectedCategory !== 'All') {
      result = result.filter(p => p.category === selectedCategory);
    }

    // Brand filter
    if (selectedBrand !== 'All') {
      result = result.filter(p => p.brand === selectedBrand);
    }

    // Search query match (both global top-bar query and show-room specific search box)
    const combinedSearch = (localSearch || searchFilterGlobal || '').toLowerCase().trim();
    if (combinedSearch) {
      result = result.filter(p => 
        p.name.toLowerCase().includes(combinedSearch) ||
        p.brand.toLowerCase().includes(combinedSearch) ||
        p.category.toLowerCase().includes(combinedSearch) ||
        p.description.toLowerCase().includes(combinedSearch)
      );
    }

    // In stock filter
    if (inStockOnly) {
      result = result.filter(p => p.stockStatus === 'In Stock' || p.stockStatus === 'Low Stock');
    }

    // Sort strategy
    if (sortBy === 'priceAsc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'priceDesc') {
      result.sort((a, b) => b.price - a.price);
    } // newest is default sorted in our array

    return result;
  }, [products, selectedCategory, selectedBrand, localSearch, searchFilterGlobal, inStockOnly, sortBy]);

  // Related products algorithm for our detail component
  const relatedProducts = useMemo(() => {
    if (!activeDetailProduct) return [];
    return products
      .filter(p => p.id !== activeDetailProduct.id && p.category === activeDetailProduct.category)
      .slice(0, 3);
  }, [activeDetailProduct, products]);

  const handleEnquireWhatsApp = (p: Product) => {
    const textMsg = `Hello Ugomenz Electronics! I would like to purchase or enquire about the: ${p.name} (₦${p.price.toLocaleString()}). Please confirm showroom availability.`;
    window.open(`https://wa.me/2348052000034?text=${encodeURIComponent(textMsg)}`, '_blank');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      
      {/* Visual Title Header */}
      <div className="mb-8">
        <h2 className="text-2xl md:text-3xl font-display font-bold text-brand-black tracking-tight">
          Showroom & Product Catalogue
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Explore our authorized premium inventory from Samsung, LG, Sony, Hisense, and JVC. Match live stock statuses.
        </p>
      </div>

      {/* Category selector tiles at the top */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        {categoryTiles.map((tile) => {
          const isSelected = selectedCategory === tile.name;
          const IconComp = tile.icon;

          return (
            <button
              key={tile.name}
              onClick={() => {
                setSelectedCategory(tile.name);
                // Also reset sub-searches to allow smooth category pivots
              }}
              className={`p-4 rounded-2xl border text-left flex flex-col justify-between transition-all group hover:scale-[1.01] cursor-pointer focus:outline-none focus:ring-1 focus:ring-brand-orange-tint ${
                isSelected
                  ? 'bg-brand-orange border-brand-orange text-white shadow-md shadow-brand-orange/20'
                  : 'bg-white border-gray-200 text-gray-600 hover:text-brand-orange hover:border-brand-orange'
              }`}
            >
              <div className={`p-2 rounded-xl w-max ${isSelected ? 'bg-white/10 text-white' : 'bg-brand-orange-tint text-brand-orange'} transition-colors mb-4`}>
                <IconComp className="w-5 h-5" />
              </div>
              <div>
                <span className={`text-[10px] font-mono uppercase tracking-wider block font-bold leading-none ${isSelected ? 'text-white/80' : 'text-gray-400'}`}>
                  {tile.count} models
                </span>
                <span className="text-sm font-bold tracking-tight mt-1 block">
                  {tile.name}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Filter Options Strip */}
      <div className="bg-white rounded-2xl border border-gray-200 p-5 mb-8 flex flex-wrap items-center justify-between gap-4 shadow-sm">
        <div className="flex flex-wrap items-center gap-3">
          
          {/* Brand Filter */}
          <div className="flex flex-col">
            <span className="text-[10px] uppercase font-bold text-gray-400 font-mono mb-1">Select Brand</span>
            <select
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              className="text-xs p-2 border border-gray-200 rounded-lg outline-none bg-gray-50 focus:border-brand-orange cursor-pointer"
            >
              {uniqueBrands.map(b => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
          </div>

          {/* Pricing Order */}
          <div className="flex flex-col">
            <span className="text-[10px] uppercase font-bold text-gray-400 font-mono mb-1">Sort Models</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="text-xs p-2 border border-gray-200 rounded-lg outline-none bg-gray-50 focus:border-brand-orange cursor-pointer"
            >
              <option value="default">Release Default</option>
              <option value="priceAsc">Price: Low to High</option>
              <option value="priceDesc">Price: High to Low</option>
            </select>
          </div>

          {/* Stock Filter Checkbox */}
          <label className="flex items-center gap-2 mt-4 ml-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={inStockOnly}
              onChange={(e) => setInStockOnly(e.target.checked)}
              className="w-4 h-4 rounded text-brand-orange border-gray-300 focus:ring-brand-orange accent-brand-orange cursor-pointer"
            />
            <span className="text-xs text-gray-600 font-medium">Show In Stock / Low Stock Only</span>
          </label>
        </div>

        {/* Local Search input */}
        <div className="relative w-full sm:w-64 max-w-xs">
          <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            placeholder="Keyword filter..."
            className="w-full text-xs p-2 pl-8 border border-gray-200 rounded-lg outline-none focus:border-brand-orange bg-gray-50"
          />
        </div>
      </div>

      {/* Grid displays */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredProducts.map((p) => (
          <div
            key={p.id}
            className="bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-brand-orange hover:shadow-lg transition-all flex flex-col relative group"
          >
            {/* Stock indicators */}
            <div className="absolute top-3 right-3 z-10 flex flex-col gap-1">
              <span className={`text-[9px] font-mono uppercase tracking-wide font-bold px-2 py-0.5 rounded-full ${
                p.stockStatus === 'In Stock'
                  ? 'bg-green-100 text-green-800'
                  : p.stockStatus === 'Low Stock'
                    ? 'bg-amber-100 text-amber-800'
                    : 'bg-red-105 text-red-800'
              }`}>
                {p.stockStatus}
              </span>
            </div>

            {/* Visual Header */}
            <div className="relative overflow-hidden aspect-video bg-gray-100 flex items-center justify-center">
              {isVideoSrc(p.image) ? (
                <video
                  src={p.image}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300 bg-black"
                />
              ) : (
                <img
                  src={p.image}
                  alt={p.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                />
              )}
              <div
                onClick={() => setActiveDetailProduct(p)}
                className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer"
              >
                <button className="px-4 py-2 bg-white text-brand-black text-xs font-semibold rounded-full flex items-center gap-1.5 shadow transform translate-y-3 group-hover:translate-y-0 transition-all cursor-pointer">
                  <View className="w-3.5 h-3.5 text-brand-orange" />
                  <span>Inspect Model</span>
                </button>
              </div>
            </div>

            {/* Panel Description text */}
            <div className="p-4 flex-1 flex flex-col">
              <span className="text-[10px] font-mono tracking-wider font-bold text-brand-orange uppercase mb-1">
                {p.brand}
              </span>
              <h3
                onClick={() => setActiveDetailProduct(p)}
                className="font-bold text-xs text-brand-black tracking-tight leading-snug hover:text-brand-orange transition-colors cursor-pointer"
              >
                {p.name}
              </h3>
              <p className="text-[11px] text-gray-500 mt-2 line-clamp-2 leading-relaxed flex-1">
                {p.description}
              </p>

              {/* Price Tag & CTA actions */}
              <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                <div className="flex flex-col">
                  {p.originalPrice && (
                    <span className="text-[9px] font-mono text-gray-400 line-through">
                      ₦{p.originalPrice.toLocaleString()}
                    </span>
                  )}
                  <span className="text-sm font-mono font-bold text-brand-black">
                    ₦{p.price.toLocaleString()}
                  </span>
                </div>

                <div className="flex gap-1">
                  <button
                    onClick={() => handleEnquireWhatsApp(p)}
                    className="p-2 bg-green-50 text-green-600 hover:bg-green-100 rounded-lg transition-colors cursor-pointer"
                    title="Enquire on WhatsApp"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                  </button>
                  {p.stockStatus !== 'Out of Stock' && (
                    <button
                      onClick={() => onAddToCart(p)}
                      className="p-2 bg-brand-orange text-white hover:bg-orange-600 rounded-lg transition-colors cursor-pointer flex items-center gap-1 px-3"
                    >
                      <ShoppingCart className="w-3.5 h-3.5" />
                      <span className="text-[10px] font-bold">Add</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="bg-gray-150 py-16 text-center rounded-2xl border-2 border-dashed border-gray-200 mt-8">
          <Search className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <h4 className="font-semibold text-gray-700">No models found aligning to filters</h4>
          <p className="text-gray-500 text-xs mt-1">Try resetting keywords, selection metrics, or choosing a different category group.</p>
          <button
            onClick={() => {
              setSelectedCategory('All');
              setSelectedBrand('All');
              setInStockOnly(false);
              setLocalSearch('');
            }}
            className="mt-4 px-4 py-2 bg-brand-black text-white rounded-lg text-xs font-semibold hover:bg-gray-800 transition-colors"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* High-Contrast Detail Modal */}
      <AnimatePresence>
        {activeDetailProduct && (
          <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative"
            >
              <button
                onClick={() => setActiveDetailProduct(null)}
                className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/95 text-gray-500 hover:text-black hover:scale-105 transition-all flex items-center justify-center border border-gray-200"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2">
                {/* Left side Image visualizer */}
                <div className="h-64 md:h-full relative overflow-hidden bg-gray-50 flex items-center justify-center">
                  {isVideoSrc(activeDetailProduct.image) ? (
                    <video
                      src={activeDetailProduct.image}
                      controls
                      autoPlay
                      loop
                      muted={false}
                      playsInline
                      className="w-full h-full object-cover bg-black"
                    />
                  ) : (
                    <img
                      src={activeDetailProduct.image}
                      alt={activeDetailProduct.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  )}
                  <div className="absolute top-4 left-4 bg-brand-orange text-white text-[9px] font-bold font-mono tracking-widest px-3 py-1 rounded-full uppercase">
                    {activeDetailProduct.brand} • Authorized
                  </div>
                </div>

                {/* Right details content */}
                <div className="p-6 md:p-8 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] text-brand-orange font-bold uppercase tracking-wider block font-mono">
                      Category: {activeDetailProduct.category}
                    </span>
                    <h3 className="text-lg md:text-xl font-bold tracking-tight text-brand-black mt-1 leading-snug">
                      {activeDetailProduct.name}
                    </h3>
                    
                    <p className="text-xs text-gray-500 mt-3 leading-relaxed">
                      {activeDetailProduct.description}
                    </p>

                    {/* Specs list */}
                    {activeDetailProduct.specs && activeDetailProduct.specs.length > 0 && (
                      <div className="mt-4 space-y-1.5 p-3.5 bg-gray-50 rounded-xl border border-gray-200">
                        <h4 className="text-[10px] uppercase font-bold text-gray-400 font-mono tracking-wider">
                          Full Specifications
                        </h4>
                        <ul className="space-y-1">
                          {activeDetailProduct.specs.map((sp, idx) => (
                            <li key={idx} className="text-[11px] text-gray-650 flex items-start gap-1">
                              <span className="text-brand-orange">•</span>
                              <span>{sp}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Related products view */}
                  {relatedProducts.length > 0 && (
                    <div className="mt-6">
                      <h4 className="text-[10px] uppercase font-bold text-gray-400 font-mono tracking-wider mb-2">
                        Related Models in {activeDetailProduct.category}
                      </h4>
                      <div className="grid grid-cols-3 gap-2">
                        {relatedProducts.map(rp => (
                          <div
                            key={rp.id}
                            onClick={() => setActiveDetailProduct(rp)}
                            className="bg-gray-50 p-2 rounded-lg border border-gray-150 hover:border-brand-orange cursor-pointer transition-colors"
                          >
                            {isVideoSrc(rp.image) ? (
                              <video src={rp.image} className="w-full aspect-video object-cover rounded bg-black" autoPlay loop muted playsInline />
                            ) : (
                              <img src={rp.image} className="w-full aspect-video object-cover rounded" referrerPolicy="no-referrer" />
                            )}
                            <p className="text-[9px] font-bold mt-1 text-gray-700 truncate">{rp.name}</p>
                            <p className="text-[9px] font-mono text-gray-500 font-semibold mt-0.5">₦{rp.price.toLocaleString()}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* CTA Checkout line */}
                  <div className="mt-8 pt-4 border-t border-gray-150 flex flex-col gap-3">
                    <div className="flex items-baseline justify-between">
                      <span className="text-xs text-gray-400 font-medium">Showroom Pricing</span>
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-lg font-mono font-bold text-brand-black">
                          ₦{activeDetailProduct.price.toLocaleString()}
                        </span>
                        {activeDetailProduct.originalPrice && (
                          <span className="text-xs font-mono line-through text-gray-400">
                            ₦{activeDetailProduct.originalPrice.toLocaleString()}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEnquireWhatsApp(activeDetailProduct)}
                        className="flex-1 md:flex-none py-2.5 px-4 bg-green-600 hover:bg-green-700 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span>Chat Deal</span>
                      </button>
                      {activeDetailProduct.stockStatus !== 'Out of Stock' ? (
                        <button
                          onClick={() => {
                            onAddToCart(activeDetailProduct);
                            setActiveDetailProduct(null);
                          }}
                          className="flex-1 py-2.5 px-4 bg-brand-orange hover:bg-orange-600 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                        >
                          <ShoppingCart className="w-4 h-4" />
                          <span>Add to Cart</span>
                        </button>
                      ) : (
                        <div className="flex-1 py-2.5 px-4 bg-gray-150 rounded-lg text-xs font-medium text-gray-400 flex items-center justify-center uppercase">
                          Sold Out
                        </div>
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
