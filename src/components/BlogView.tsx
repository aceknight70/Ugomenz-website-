import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Newspaper, Search, Share2, Calendar, User, Eye, ArrowLeft, Mail, MessageCircle, X } from 'lucide-react';
import { BlogPost, Product } from '../types';

interface BlogViewProps {
  posts: BlogPost[];
  // Include product list to suggest related products
  products: Product[];
  onAddToCart: (product: Product) => void;
  onAddPost: (post: BlogPost) => void;
  staffLogged: boolean;
}

export default function BlogView({ posts, products, onAddToCart, onAddPost, staffLogged }: BlogViewProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  
  // Active reading state
  const [activeReadingPost, setActiveReadingPost] = useState<BlogPost | null>(null);

  // Opt-in Newsletter State
  const [newsEmail, setNewsEmail] = useState('');
  const [subscribedMsg, setSubscribedMsg] = useState('');

  // Filtering
  const filteredPosts = posts.filter(post => {
    const matchSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCat = selectedCategory === 'All' || post.category === selectedCategory;
    return matchSearch && matchCat;
  });

  // Categories
  const categories = ['All', 'New Arrivals', 'Tech Tips', 'Deals', 'Brand News', 'How-To Guides'];

  const handleShareClick = (title: string) => {
    const textMsg = `Article: "${title}" by Fortune Akioya — is highly informative. Read it here on Ugomenz Electronics!`;
    window.open(`https://wa.me/?text=${encodeURIComponent(textMsg)}`, '_blank');
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsEmail) return;
    setSubscribedMsg(`Thank you! "${newsEmail}" has been registered inside our WhatsApp broadcast database for immediate tech publications!`);
    setNewsEmail('');
    setTimeout(() => {
      setSubscribedMsg('');
    }, 4500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-12">
      
      {activeReadingPost ? (
        /* Full Article reading view */
        <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in duration-200">
          {/* Back Action */}
          <button
            onClick={() => setActiveReadingPost(null)}
            className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-brand-orange font-bold font-mono uppercase cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to updates list</span>
          </button>

          <div className="relative aspect-video rounded-3xl overflow-hidden border border-gray-200">
            <img src={activeReadingPost.image} alt={activeReadingPost.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          </div>

          <div className="space-y-4">
            <span className="text-xs uppercase font-bold tracking-widest font-mono text-brand-orange bg-brand-orange-tint px-3 py-1 rounded-full border border-brand-orange/15">
              {activeReadingPost.category}
            </span>
            <h1 className="text-2xl md:text-3xl font-display font-bold text-brand-black leading-tight">
              {activeReadingPost.title}
            </h1>

            <div className="flex items-center gap-4 text-xs font-mono text-gray-400 border-y border-gray-150 py-3">
              <span className="flex items-center gap-1">
                <User className="w-3.5 h-3.5 text-brand-orange" />
                <span>By {activeReadingPost.author}</span>
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-blue-500" />
                <span>{activeReadingPost.date}</span>
              </span>
              <button
                onClick={() => handleShareClick(activeReadingPost.title)}
                className="ml-auto text-brand-orange hover:underline uppercase font-bold flex items-center gap-1 cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Share WhatsApp</span>
              </button>
            </div>
          </div>

          {/* Body and Specs */}
          <div className="text-sm text-gray-650 leading-relaxed font-sans whitespace-pre-line space-y-4">
            {activeReadingPost.body}
          </div>

          {/* Suggest static related screens under the blog review */}
          <div className="pt-8 border-t border-gray-250">
            <h3 className="font-display font-bold text-sm text-brand-black mb-4 uppercase tracking-wider">
              Recommended Showroom Models
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {products.slice(0, 2).map(p => (
                <div key={p.id} className="bg-gray-55 p-3 rounded-2xl border border-gray-200 bg-gray-50/50 flex gap-3 items-center">
                  <img src={p.image} className="w-16 h-12 object-cover rounded-lg border border-gray-200" referrerPolicy="no-referrer" />
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-xs text-gray-800 truncate">{p.name}</p>
                    <p className="text-[10px] text-gray-500 mt-0.5 font-mono">₦{p.price.toLocaleString()}</p>
                  </div>
                  <button
                    onClick={() => onAddToCart(p)}
                    className="px-2.5 py-1.5 bg-brand-orange text-white font-semibold rounded text-[10px] hover:bg-orange-655"
                  >
                    Buy
                  </button>
                </div>
              ))}
            </div>
          </div>

        </div>
      ) : (
        /* Blog Main Lists directory */
        <div className="space-y-8 animate-in fade-in duration-200">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl md:text-3xl font-display font-bold text-brand-black tracking-tight">
                Tech Tips, Deals & Brand Publications
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Stay updated with the latest in sensory media displays, soundproofing, and AVR electrical protections directly from Fortune.
              </p>
            </div>
          </div>

          {/* Category panel & local search box */}
          <div className="bg-white p-4 border border-gray-220 rounded-2xl flex flex-wrap gap-4 items-center justify-between shadow-sm">
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 select-none scrollbar-none">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1 rounded-full text-xs font-semibold whitespace-nowrap cursor-pointer transition-all ${
                    selectedCategory === cat
                      ? 'bg-brand-orange text-white'
                      : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="relative w-full sm:w-64 max-w-xs">
              <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search matching articles..."
                className="w-full text-xs p-2 pl-8 border border-gray-200 outline-none focus:border-brand-orange rounded-lg bg-gray-50"
              />
            </div>
          </div>

          {/* Grid list display */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <div
                key={post.id}
                onClick={() => setActiveReadingPost(post)}
                className="bg-white rounded-2xl border border-gray-200 hover:border-brand-orange cursor-pointer hover:shadow-lg transition-all flex flex-col justify-between group overflow-hidden"
              >
                {/* Visual Header */}
                <div className="h-44 relative bg-gray-100 overflow-hidden">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300" referrerPolicy="no-referrer" />
                  <div className="absolute top-3 left-3">
                    <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-[#1a56d6] bg-[#eef3ff] border border-[#cbd5e1] px-2.5 py-1 rounded-full">
                      {post.category}
                    </span>
                  </div>
                </div>

                {/* Content detail */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-gray-400 flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-brand-orange" />
                      <span>{post.date}</span>
                    </span>
                    <h3 className="font-bold text-xs text-brand-black leading-tight tracking-tight mt-1.5 group-hover:text-brand-orange transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-[11px] text-gray-500 mt-2 line-clamp-3 leading-relaxed">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="mt-5 pt-3 border-t border-gray-100 flex items-center justify-between text-[11px] font-bold">
                    <span className="text-brand-orange group-hover:underline flex items-center gap-1 font-mono uppercase text-[10px]">
                      <span>Read Article</span>
                      <span>→</span>
                    </span>
                    <span className="text-gray-400 font-mono font-medium">{post.shares} Shares</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty state blog checks */}
          {filteredPosts.length === 0 && (
            <div className="text-center py-16 bg-gray-50 border border-dashed rounded-2xl">
              <Newspaper className="w-12 h-12 text-gray-400 mx-auto mb-2" />
              <p className="text-sm font-semibold text-gray-600 font-display">No articles found matching filters.</p>
            </div>
          )}

          {/* Newsletter section opt-in widget */}
          <div className="bg-brand-black text-white p-8 rounded-3xl relative overflow-hidden border border-gray-800">
            <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-5 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white to-transparent" />
            <div className="max-w-lg relative z-10 space-y-4">
              <h3 className="font-display font-medium text-lg leading-snug">
                Receive Fortunes Tech Digests Directly
              </h3>
              <p className="text-xs text-gray-300 leading-relaxed font-sans max-w-md">
                Opt-in immediately. Subscribe your email or phone below. We will ping you only on major restocks and diagnostic repair tips. No spam, we guarantee!
              </p>

              {subscribedMsg ? (
                <div className="bg-brand-orange-tint/10 text-brand-orange p-3 rounded-lg border border-brand-orange/20 text-xs">
                  {subscribedMsg}
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2 max-w-sm">
                  <input
                    type="email"
                    required
                    placeholder="e.g., mail@yahoo.com"
                    value={newsEmail}
                    onChange={(e) => setNewsEmail(e.target.value)}
                    className="flex-1 text-xs px-3.5 py-2 rounded-lg bg-gray-900 border border-gray-800 focus:border-brand-orange outline-none text-white placeholder-gray-500"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-brand-orange hover:bg-orange-600 text-white rounded-lg text-xs font-semibold cursor-pointer whitespace-nowrap transition-colors"
                  >
                    Subscribe Hub
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
