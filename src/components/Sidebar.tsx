import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X, Sparkles, UserCheck, Home, Eye, Award, CheckSquare,
  ShoppingCart, Image, Heart, ShieldAlert, BookOpen, Newspaper,
  Megaphone, FileSpreadsheet, KeyRound, PhoneCall, Gift, Users
} from 'lucide-react';
import { ActiveStaffSession } from '../types';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activeView: string;
  onNavigate: (view: string) => void;
  cartCount: number;
  staffSession: ActiveStaffSession | null;
  onLogout: () => void;
}

export default function Sidebar({
  isOpen,
  onClose,
  activeView,
  onNavigate,
  cartCount,
  staffSession,
  onLogout
}: SidebarProps) {

  const menuGroups = [
    {
      title: "Discovery & Experience",
      items: [
        { id: 'splash', name: "1. Brand Splash Screen", icon: Sparkles, badge: null },
        { id: 'onboarding', name: "2. Welcome Reception", icon: UserCheck, badge: null },
        { id: 'home', name: "3. Home Feed", icon: Home, badge: "New" },
        { id: 'showroom', name: "4. Products Showroom", icon: Eye, badge: "Hot" },
        { id: 'brands', name: "5. Brand Catalogue", icon: Award, badge: null },
      ]
    },
    {
      title: "Buying & Tracking",
      items: [
        { id: 'inventory', name: "6. Live Inventory Status", icon: CheckSquare, badge: "Live" },
        { id: 'cart', name: "7. Shopping Cart & Checkout", icon: ShoppingCart, badge: cartCount > 0 ? `${cartCount} Items` : null },
      ]
    },
    {
      title: "Social Proof & Academics",
      items: [
        { id: 'gallery', name: "8. Setup Gallery Room", icon: Image, badge: null },
        { id: 'about', name: "9. About Us & Credentials", icon: Heart, badge: null },
        { id: 'services', name: "10. Services & Installations", icon: Users, badge: null },
        { id: 'shadow_school', name: "11. Shadow Training School", icon: BookOpen, badge: "Academy" },
      ]
    },
    {
      title: "Articles & Community Hubs",
      items: [
        { id: 'blog', name: "12. Blog & Updates Board", icon: Newspaper, badge: null },
        { id: 'marketing', name: "13. Digital Marketing Hub", icon: Megaphone, badge: null },
        { id: 'support', name: "14. Customer Service Desk", icon: KeyRound, badge: null },
        { id: 'contact', name: "17. Contact Showroom", icon: PhoneCall, badge: null },
      ]
    },
    {
      title: "Management (PIN Secured)",
      items: [
        { id: 'records', name: "15. Records & Finances", icon: FileSpreadsheet, badge: "Staff Only", secure: true },
        { id: 'staff_portal', name: "16. Staff Operations CMS", icon: KeyRound, badge: staffSession ? staffSession.role : "Admin", secure: true },
      ]
    }
  ];

  const handleItemClick = (id: string) => {
    onNavigate(id);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Dark overlay backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black z-40"
          />

          {/* Navigation Drawer */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed left-0 top-0 bottom-0 w-80 bg-brand-black text-white z-50 flex flex-col shadow-2xl overflow-hidden"
          >
            {/* Header layout */}
            <div className="p-5 border-b border-gray-800/80 bg-brand-black/95 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 bg-brand-orange text-white rounded-lg flex items-center justify-center font-bold text-xl tracking-tight shadow-md shadow-brand-orange/20">
                  U
                </div>
                <div>
                  <h3 className="font-display text-base font-bold tracking-tight text-white leading-tight">
                    GOMENZ
                  </h3>
                  <p className="text-[10px] font-mono text-brand-orange tracking-wider">
                    ELECTRONICS SALES & SERVICE
                  </p>
                </div>
              </div>
              <button
                id="sidebar-close-btn"
                onClick={onClose}
                className="w-8 h-8 rounded-full hover:bg-gray-800 flex items-center justify-center text-gray-400 hover:text-white transition-colors border border-gray-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Scrolling navigation items lists */}
            <div className="flex-1 overflow-y-auto py-4 px-3 space-y-5 scrollbar-thin scrollbar-thumb-gray-800">
              {menuGroups.map((group, gIdx) => (
                <div key={gIdx} className="space-y-1">
                  <h4 className="px-3 text-[10px] uppercase tracking-wider text-gray-500 font-bold font-mono">
                    {group.title}
                  </h4>
                  <div className="space-y-0.5">
                    {group.items.map((item) => {
                      const isActive = activeView === item.id;
                      const IconComponent = item.icon;
                      const isSecure = item.secure;

                      return (
                        <button
                          key={item.id}
                          onClick={() => handleItemClick(item.id)}
                          className={`w-full text-left px-3 py-2.5 rounded-lg flex items-center justify-between transition-all group ${
                            isActive
                              ? 'bg-brand-orange text-white font-semibold'
                              : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <IconComponent className={`w-4 h-4 ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-brand-orange'} transition-colors`} />
                            <span className="text-xs tracking-wide">{item.name}</span>
                          </div>
                          {item.badge && (
                            <span className={`text-[9px] font-semibold px-2 py-0.5 rounded-full ${
                              isActive 
                                ? 'bg-white text-brand-orange' 
                                : isSecure 
                                  ? 'bg-yellow-500/15 text-yellow-400 border border-yellow-500/30' 
                                  : 'bg-brand-orange/15 text-brand-orange'
                            }`}>
                              {item.badge}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Footer with logged-in status */}
            <div className="p-4 bg-gray-900/60 border-t border-gray-800/80 text-center">
              {staffSession ? (
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <p className="text-xs text-green-400 font-semibold">
                      Connected: {staffSession.role} ({staffSession.email.split('@')[0]})
                    </p>
                  </div>
                  <button
                    onClick={onLogout}
                    className="text-[10px] text-gray-400 hover:text-white hover:underline uppercase font-bold tracking-wider font-mono bg-gray-850 px-3 py-1 bg-red-950/20 rounded border border-red-900/30"
                  >
                    Disconnect PIN Session
                  </button>
                </div>
              ) : (
                <p className="text-[10px] text-gray-500 font-mono">
                  Ugomenz Digital Ecosystem v1.0 • Warri, NG
                </p>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
