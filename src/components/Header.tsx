import React, { useState } from 'react';
import { Menu, Search, ShoppingCart, Lock, Unlock, AlertTriangle, ShieldCheck } from 'lucide-react';
import { ActiveStaffSession } from '../types';

interface HeaderProps {
  onToggleSidebar: () => void;
  cartCount: number;
  onNavigate: (view: string) => void;
  staffSession: ActiveStaffSession | null;
  onLoginSuccess: (session: ActiveStaffSession) => void;
  onLogout: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export default function Header({
  onToggleSidebar,
  cartCount,
  onNavigate,
  staffSession,
  onLoginSuccess,
  onLogout,
  searchQuery,
  setSearchQuery
}: HeaderProps) {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [pin, setPin] = useState('');
  const [email, setEmail] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !pin) {
      setErrorMsg('Please supply both your email and security PIN.');
      return;
    }

    // Match existing Ugomenz Hublet security keys:
    // Staff PIN = 1234
    // Manager PIN = 9999
    if (pin === '1234') {
      onLoginSuccess({ email, role: 'Staff' });
      setShowLoginModal(false);
      setPin('');
      setEmail('');
      setErrorMsg('');
      onNavigate('staff_portal'); // Automatically route to CMS portal
    } else if (pin === '9999') {
      onLoginSuccess({ email, role: 'Manager' });
      setShowLoginModal(false);
      setPin('');
      setEmail('');
      setErrorMsg('');
      onNavigate('staff_portal'); // Automatically route to CMS portal
    } else {
      setErrorMsg('Invalid Staff Security PIN. Match PIN in Hublet logs.');
    }
  };

  return (
    <>
      <header className="sticky top-0 bg-brand-black text-white z-30 shadow-md">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
          
          {/* Logo & Hamburg Menu */}
          <div className="flex items-center gap-3">
            <button
              id="header-hamburger"
              onClick={onToggleSidebar}
              className="p-2 -ml-2 rounded-lg hover:bg-gray-800 text-gray-200 hover:text-white transition-colors cursor-pointer"
            >
              <Menu className="w-6 h-6" />
            </button>
            
            <div
              onClick={() => onNavigate('home')}
              className="flex items-center gap-2 cursor-pointer select-none group"
            >
              <div className="h-8 w-8 bg-brand-orange text-white rounded-lg flex items-center justify-center font-bold text-lg shadow-sm group-hover:scale-105 transition-transform">
                U
              </div>
              <div className="hidden sm:block">
                <span className="font-display font-bold text-sm tracking-widest text-white block leading-none">
                  UGOMENZ
                </span>
                <span className="text-[9px] font-mono tracking-wider text-brand-orange block mt-1">
                  SALES & SERVICE
                </span>
              </div>
            </div>
          </div>

          {/* Search Box */}
          <div className="flex-1 max-w-md relative">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-gray-400">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search TVs, Soundbars, Brands, Repairs..."
              className="w-full text-xs bg-gray-900 border border-gray-800 rounded-full pl-9 pr-4 py-2 text-white placeholder-gray-550 focus:border-brand-orange focus:bg-gray-850 outline-none transition-all"
            />
          </div>

          {/* Cart & Staff Actions */}
          <div className="flex items-center gap-1.5 sm:gap-3">
            
            {/* Live indicator checkmark badge */}
            <div className="hidden lg:flex items-center gap-1 bg-green-950/20 px-2 py-1 rounded border border-green-900/30">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[10px] uppercase font-mono font-bold tracking-tight text-green-400">
                Lnk: OK (4G)
              </span>
            </div>

            {/* Cart Icon */}
            <button
              id="header-cart-btn"
              onClick={() => onNavigate('cart')}
              className="p-2 rounded-lg hover:bg-gray-800 text-gray-300 hover:text-brand-orange transition-all relative cursor-pointer"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-brand-orange text-white text-[9px] font-mono leading-none flex items-center justify-center w-4 h-4 rounded-full font-bold shadow-sm shadow-brand-orange/40">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Staff Secure Key Action */}
            {staffSession ? (
              <button
                onClick={() => onNavigate('staff_portal')}
                className="flex items-center gap-1 px-2 py-1.5 sm:px-3 sm:py-2 bg-brand-orange text-white text-xs rounded-full hover:bg-orange-600 transition-all font-medium whitespace-nowrap cursor-pointer shadow-sm shadow-brand-orange/20"
              >
                <Unlock className="w-3.5 h-3.5" />
                <span className="hidden md:inline">{staffSession.role} Control</span>
              </button>
            ) : (
              <button
                id="header-login-btn"
                onClick={() => setShowLoginModal(true)}
                className="flex items-center gap-1 px-2 py-1.5 sm:px-3 sm:py-2 bg-gray-900 hover:bg-gray-800 border border-gray-800 text-gray-200 hover:text-white text-xs rounded-full transition-all font-medium whitespace-nowrap cursor-pointer"
              >
                <Lock className="w-3.5 h-3.5 text-gray-400" />
                <span className="hidden md:inline">Staff Access</span>
              </button>
            )}
          </div>

        </div>
      </header>

      {/* PIN-Based Login Dialog */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-gray-100 flex flex-col relative animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-brand-orange/10 flex items-center justify-center text-brand-orange">
                <Lock className="w-4 h-4" />
              </div>
              <h3 className="font-display font-medium text-lg text-brand-black">
                Ugomenz Hublet Secured Login
              </h3>
            </div>
            
            <p className="text-xs text-gray-500 mb-4 leading-relaxed">
              Authenticate via matching staff PIN. Enter security credentials below to load CRM and Stock control consoles.
            </p>

            {errorMsg && (
              <div className="bg-red-50 text-red-700 text-xs p-3 rounded-lg flex items-start gap-2 mb-4 border border-red-100 font-medium">
                <AlertTriangle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-[10px] uppercase font-bold tracking-wider text-gray-500 mb-1 font-mono">
                  Staff Business Email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g., fortune@ugomenz.com"
                  className="w-full text-xs p-2.5 border border-gray-200 rounded-lg focus:border-brand-orange focus:ring-1 focus:ring-brand-orange outline-none bg-gray-50/50"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold tracking-wider text-gray-500 mb-1 font-mono">
                  Security PIN (Hublet Matched)
                </label>
                <input
                  type="password"
                  required
                  maxLength={4}
                  value={pin}
                  onChange={(e) => {
                    // Force digit input only
                    setErrorMsg('');
                    setPin(e.target.value.replace(/\D/g, ''));
                  }}
                  placeholder="Enter 4-Digit PIN"
                  className="w-full text-center text-lg font-mono tracking-widest p-2.5 border border-gray-200 rounded-lg focus:border-brand-orange focus:ring-1 focus:ring-brand-orange outline-none bg-gray-50/50"
                />
                <div className="flex justify-between items-center mt-1.5">
                  <span className="text-[10px] text-gray-400 font-mono">
                    Staff PIN: 1234 • Manager: 9999
                  </span>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowLoginModal(false);
                    setPin('');
                    setEmail('');
                    setErrorMsg('');
                  }}
                  className="flex-1 py-2 text-xs border border-gray-200 hover:bg-gray-50 rounded-lg text-gray-500 font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  id="modal-login-submit"
                  type="submit"
                  className="flex-1 py-2 text-xs bg-brand-orange hover:bg-orange-600 text-white rounded-lg font-semibold tracking-wide cursor-pointer transition-colors"
                >
                  Authenticate
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
