import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Image, Layers, Sparkles, X, ChevronRight, ArrowRightLeft } from 'lucide-react';
import { GalleryItem } from '../types';

interface GalleryViewProps {
  galleryItems: GalleryItem[];
}

export default function GalleryView({ galleryItems }: GalleryViewProps) {
  const [activeTab, setActiveTab] = useState<string>('All');
  
  // Lightbox view state
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);

  // Before & After Interactive Slider state
  const [sliderPosition, setSliderPosition] = useState<number>(50);
  const [isDraggingSlider, setIsDraggingSlider] = useState<boolean>(false);

  // Filter items
  const filteredGallery = galleryItems.filter(item => {
    if (activeTab === 'All') return true;
    return item.category === activeTab;
  });

  const handleSliderMove = (event: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    const container = event.currentTarget.getBoundingClientRect();
    let clientX = 'touches' in event ? event.touches[0].clientX : event.clientX;
    let position = ((clientX - container.left) / container.width) * 100;
    if (position < 0) position = 0;
    if (position > 100) position = 100;
    setSliderPosition(position);
  };

  const tabs = ['All', 'Home Setups', 'Office Setups', 'Event Setups', 'Installations', 'Customer Spaces'];

  const handleWhatsAppSubmission = () => {
    const textMsg = "Hello Ugomenz Electronics! I would like to submit my premium TV panel/sound system setup photo to be showcased in your web Gallery room. Please review!";
    window.open(`https://wa.me/2348052000034?text=${encodeURIComponent(textMsg)}`, '_blank');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      
      {/* Title */}
      <div className="mb-8">
        <h2 className="text-2xl md:text-3xl font-display font-bold text-brand-black tracking-tight">
          Showroom Installations & Project Gallery
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Visual validation of our premium technical craftsmanship. Real home and office acoustic installations across Delta State.
        </p>
      </div>

      {/* Interactive Before & After Transformation Slider! */}
      <div className="bg-gradient-to-r from-brand-black to-gray-900 rounded-3xl p-6 md:p-8 text-white mb-10 border border-gray-800">
        <div className="max-w-3xl mx-auto flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2.5 h-2.5 rounded-full bg-brand-orange animate-pulse" />
              <span className="text-[10px] font-mono font-bold tracking-wider uppercase text-brand-orange">
                Technical Transformation Showcase
              </span>
            </div>
            <h3 className="text-xl md:text-2xl font-display font-medium tracking-tight text-white leading-tight">
              Acoustic Panelling & 100" Projection TV Setup
            </h3>
            <p className="text-xs text-gray-400 mt-3 leading-relaxed">
              Drag or hover over the interactive slider. See how our technicians transformed a raw concrete duplex wall in Effurun into a luxury cinematic theater system featuring insulated timber slats and discrete speaker staging.
            </p>
            <div className="mt-5 flex gap-2">
              <span className="bg-brand-orange/20 text-brand-orange text-[9px] font-mono font-bold px-2.5 py-1 rounded-full uppercase border border-brand-orange/30">
                Wall Mounting
              </span>
              <span className="bg-brand-blue/20 text-brand-white text-[9px] font-mono font-bold px-2.5 py-1 rounded-full uppercase border border-brand-blue/30">
                Acoustics Match
              </span>
            </div>
          </div>

          {/* Slider visual element container */}
          <div
            className="w-full md:w-[400px] aspect-video rounded-2xl overflow-hidden relative select-none border border-gray-800 shadow-2xl shrink-0 cursor-ew-resize"
            onMouseMove={(e) => {
              if (e.buttons === 1 || isDraggingSlider) handleSliderMove(e);
            }}
            onTouchMove={handleSliderMove}
            onMouseDown={() => setIsDraggingSlider(true)}
            onMouseUp={() => setIsDraggingSlider(false)}
            onMouseLeave={() => setIsDraggingSlider(false)}
          >
            {/* Before state (background) */}
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80')` }}>
              <span className="absolute bottom-3 left-3 bg-brand-black/70 text-white text-[9px] font-mono px-2 py-0.5 rounded uppercase font-bold">
                Before: Bare Wall
              </span>
            </div>

            {/* After state (overlay with width matched to slider position) */}
            <div
              className="absolute inset-0 bg-cover bg-center transition-all duration-75"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1595246140625-573b715d11dc?auto=format&fit=crop&w=600&q=80')`,
                clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`
              }}
            >
              <span className="absolute bottom-3 right-3 bg-brand-orange text-white text-[9px] font-mono px-2 py-0.5 rounded uppercase font-bold">
                After: Ugomenz Cinema Suite
              </span>
            </div>

            {/* Slider Divider Bar */}
            <div
              className="absolute top-0 bottom-0 w-1 bg-white flex items-center justify-center cursor-ew-resize select-none"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="w-8 h-8 rounded-full bg-brand-orange border-2 border-white text-white flex items-center justify-center shadow-lg">
                <ArrowRightLeft className="w-3.5 h-3.5" />
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Filter tab buttons */}
      <div className="flex items-center gap-1 overflow-x-auto pb-4 mb-8 select-none scrollbar-none border-b border-gray-200">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap cursor-pointer transition-all ${
              activeTab === tab
                ? 'bg-brand-orange text-white shadow-sm'
                : 'bg-white text-gray-600 hover:bg-gray-100 border border-secondary-text/10 border-gray-200'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Masonry-style Grid content for Gallery */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
        {filteredGallery.map((item) => (
          <div
            key={item.id}
            onClick={() => setLightboxItem(item)}
            className="break-inside-avoid bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-brand-orange cursor-pointer hover:shadow-lg transition-all group relative"
          >
            {/* Thumbnail */}
            <div className="relative aspect-[4/3] bg-gray-100">
              <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-350" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 bg-transparent group-hover:bg-black/35 transition-colors duration-350 flex items-center justify-center opacity-0 group-hover:opacity-100">
                <span className="p-3 bg-white text-brand-orange font-bold text-xs rounded-xl shadow flex items-center gap-1">
                  <Image className="w-4 h-4" />
                  <span>Expand Lightbox</span>
                </span>
              </div>
            </div>

            {/* Caption */}
            <div className="p-4">
              <span className="text-[9px] uppercase font-bold tracking-wider text-brand-orange font-mono">
                {item.category}
              </span>
              <h4 className="font-bold text-xs text-brand-black tracking-tight leading-tight mt-0.5">
                {item.title}
              </h4>
              {item.caption && (
                <p className="text-[11px] text-gray-500 mt-1.5 line-clamp-2 leading-relaxed">
                  {item.caption}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Submission block widget */}
      <div className="bg-brand-blue-tint/60 border border-brand-blue/10 rounded-2xl p-6 text-center max-w-xl mx-auto mt-12">
        <h4 className="font-display font-bold text-sm text-brand-black leading-tight">
          Want your setup featured in the Ugomenz Gallery?
        </h4>
        <p className="text-xs text-gray-550 mt-1 pb-4">
          Send us your home installation, TV panel alignment, or church setup photos via direct WhatsApp submission!
        </p>
        <button
          onClick={handleWhatsAppSubmission}
          className="px-5 py-2.5 bg-brand-blue text-white hover:bg-blue-700 text-xs font-semibold rounded-lg shadow-sm transition-colors cursor-pointer"
        >
          Submit Setup Photos
        </button>
      </div>

      {/* Full-Screen Lightbox View Dialog */}
      <AnimatePresence>
        {lightboxItem && (
          <div className="fixed inset-0 bg-black/85 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl relative"
            >
              {/* Close Icon Trigger */}
              <button
                onClick={() => setLightboxItem(null)}
                className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/95 text-gray-500 hover:text-black flex items-center justify-center hover:scale-105 transition-all border border-gray-200"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex flex-col">
                <div className="aspect-[16/10] bg-gray-900 flex items-center justify-center overflow-hidden">
                  <img src={lightboxItem.image} alt={lightboxItem.title} className="w-full h-full object-contain" referrerPolicy="no-referrer" />
                </div>
                <div className="p-6">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-brand-orange font-bold">
                    INSTALLATION PROFILE: {lightboxItem.category}
                  </span>
                  <h3 className="text-lg font-bold text-brand-black mt-1 leading-snug tracking-tight">
                    {lightboxItem.title}
                  </h3>
                  <p className="text-xs text-gray-550 mt-2 leading-relaxed">
                    {lightboxItem.caption || "A pristine implementation of high-performance electronics and room sound acoustics engineered by Ugomenz Specialists."}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
