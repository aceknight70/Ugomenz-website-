import React from 'react';
import { Megaphone, Users, Youtube, Instagram, Facebook, Calendar, Sparkles, MessageSquare } from 'lucide-react';

export default function MarketingView() {
  const stats = [
    { label: 'WhatsApp Subscribers', value: '18,400+', icon: MessageSquare, color: 'text-green-500 bg-green-50' },
    { label: 'YouTube Total Views', value: '144,000+', icon: Youtube, color: 'text-red-600 bg-red-50' },
    { label: 'Instagram Followers', value: '9,200+', icon: Instagram, color: 'text-pink-600 bg-pink-50' },
    { label: 'Facebook Page Likes', value: '12,500+', icon: Facebook, color: 'text-blue-600 bg-blue-50' },
  ];

  const calendarItems = [
    { date: 'Monday, 1st June', content: 'Video Reel: Restocking JVC surround sound amplifiers. Showroom live demonstrations.', platform: 'Instagram & TikTok' },
    { date: 'Thursday, 4th June', content: 'Diagnostic Tutorial: Saving OLED screen elements using automatic voltage regulators.', platform: 'YouTube Primary' },
    { date: 'Saturday, 6th June', content: 'Weekend Discount Blitz: Hisense 100" Projection screens free mounting promo.', platform: 'WhatsApp Channel Broadcast' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-12">
      
      {/* Title */}
      <div className="mb-8">
        <h2 className="text-2xl md:text-3xl font-display font-bold text-brand-black tracking-tight">
          Digital Marketing Hub & Channels
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Showcasing Ugomenz active online presence. We host video diagnostics, social campaigns, and WhatsApp broadcasts.
        </p>
      </div>

      {/* Social Statistics values */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((st, idx) => {
          const IconComp = st.icon;

          return (
            <div key={idx} className="bg-white rounded-2xl border border-gray-250 p-5 shadow-sm flex items-center gap-4">
              <div className={`p-3 rounded-xl shrink-0 ${st.color}`}>
                <IconComp className="w-5 h-5" />
              </div>
              <div>
                <span className="block text-[10px] text-gray-400 font-bold uppercase font-mono tracking-wider">
                  {st.label}
                </span>
                <span className="block text-xl md:text-2xl font-mono font-bold text-brand-black mt-0.5">
                  {st.value}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Embedded Channels walkthrough & Behind the scenes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        
        {/* Left Side: Mock Video Embed Walkthrough & Channels description */}
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-200 shadow-xs space-y-6">
          <div className="flex items-center gap-2">
            <Youtube className="w-5 h-5 text-red-650 shrink-0 text-red-650" />
            <h3 className="font-display font-medium text-base text-brand-black leading-snug">
              Latest YouTube Tech Diagnostics Video
            </h3>
          </div>

          {/* Graphic Video Player Mock */}
          <div className="relative aspect-video rounded-2xl overflow-hidden bg-gray-950 border border-gray-800 flex items-center justify-center group select-none">
            <img
              src="https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=600&q=80"
              alt="Sony Audio Diagnostic"
              className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-101 transition-transform"
              referrerPolicy="no-referrer"
            />
            {/* Pulsing red YouTube play icon */}
            <div className="relative z-10 w-16 h-12 bg-red-600 rounded-2xl flex items-center justify-center text-white cursor-pointer shadow-lg group-hover:bg-red-700 hover:scale-105 transition-all">
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
            <span className="absolute bottom-3 left-3 bg-brand-black/80 text-white text-[9px] font-mono px-2.5 py-1 rounded font-bold">
              📺 Diagnostic: Power board inverter replacement [08:42]
            </span>
          </div>

          <div className="space-y-3">
            <h4 className="font-bold text-xs text-gray-800">Behind the scenes at Ugomenz Tech Lab</h4>
            <p className="text-xs text-gray-500 leading-relaxed font-sans">
              Fortune Akioya and our technician squad update content weekly. Our social reels show honest raw boards troubleshooting, before/after room renovations sliding reviews, and client event alignments. We show our work, proving why we are the most reliable electronics partner in Delta State!
            </p>
          </div>
        </div>

        {/* Right Side: Content Publication Calendar */}
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-250 shadow-xs space-y-6">
          <div className="flex items-center gap-2 border-b pb-3 border-gray-150">
            <Calendar className="w-5 h-5 text-brand-orange shrink-0" />
            <h3 className="font-display font-medium text-base text-brand-black">
              Content Calendar & Campaign Plans
            </h3>
          </div>

          <p className="text-xs text-gray-500 leading-relaxed">
            Our social campaigns keep Ugomenz visible to thousands of people around Nigeria, ensuring direct feedback loops back into our sales counters.
          </p>

          <div className="space-y-4 pt-2">
            {calendarItems.map((item, index) => (
              <div key={index} className="p-4 border border-gray-150 bg-gray-50/40 rounded-xl space-y-1 relative group">
                <span className="absolute top-4 right-4 bg-brand-orange-tint border border-brand-orange/15 text-brand-orange text-[9px] font-mono font-bold px-2.5 py-0.5 rounded-full uppercase">
                  {item.platform}
                </span>
                <p className="text-[10px] font-mono font-bold text-brand-blue uppercase">{item.date}</p>
                <p className="text-xs font-bold text-gray-900 group-hover:text-brand-orange transition-colors">{item.content}</p>
              </div>
            ))}
          </div>

          {/* WhatsApp Direct Subscription block */}
          <div className="p-4 pt-5 bg-[#EEF3FF] border border-[#cbd5e1] rounded-2xl flex items-start gap-3">
            <Megaphone className="w-6 h-6 text-brand-blue shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-gray-900 leading-none">Subscribe WhatsApp Broadcasts</h4>
              <p className="text-[11px] text-gray-500 mt-1 pb-2 leading-relaxed">Receive instant notices, pricing coupons, student intake schedules and tech tutorials directly on WhatsApp.</p>
              <button
                onClick={() => {
                  window.open("https://wa.me/2348052000034?text=Hello%20Ugomenz!%20Please%20subscribe%20me%20to%2520your%20broadcast%20list.", "_blank");
                }}
                className="text-xs font-bold text-[#1A56D6] hover:underline uppercase font-mono tracking-tight"
              >
                Join Broadcasting Channel →
              </button>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
