import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Check, AlertTriangle, XSquare, Search, SlidersHorizontal, BellRing, Eye, Edit3, Save, CheckCircle
} from 'lucide-react';
import { Product, ActiveStaffSession, isVideoSrc } from '../types';

interface InventoryViewProps {
  products: Product[];
  onUpdateProducts: (updatedList: Product[]) => void;
  staffSession: ActiveStaffSession | null;
}

export default function InventoryView({
  products,
  onUpdateProducts,
  staffSession
}: InventoryViewProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');

  // Notify Me form state
  const [notifyProduct, setNotifyProduct] = useState<Product | null>(null);
  const [notifyPhone, setNotifyPhone] = useState('');
  const [notifySuccessMsg, setNotifySuccessMsg] = useState('');

  // Inline edit states (Allowed if staff is Authenticated)
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [editQty, setEditQty] = useState<number>(0);
  const [editStatus, setEditStatus] = useState<Product['stockStatus']>('In Stock');

  const uniqueCategories = useMemo(() => {
    return ['All', ...Array.from(new Set(products.map(p => p.category)))];
  }, [products]);

  const filteredInventory = useMemo(() => {
    return products.filter(p => {
      const matchSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.brand.toLowerCase().includes(searchTerm.toLowerCase());
      const matchCategory = selectedCategory === 'All' || p.category === selectedCategory;
      const matchStatus = selectedStatus === 'All' || p.stockStatus === selectedStatus;
      return matchSearch && matchCategory && matchStatus;
    });
  }, [products, searchTerm, selectedCategory, selectedStatus]);

  // Handle staff saving inline stock modifications
  const handleSaveInlineEdit = (pId: string) => {
    const updated = products.map(p => {
      if (p.id === pId) {
        // Adjust status based on new quantity if quantity is altered
        let deducedStatus: Product['stockStatus'] = editStatus;
        if (editQty === 0) deducedStatus = 'Out of Stock';
        else if (editQty > 0 && editQty <= 3) deducedStatus = 'Low Stock';
        else deducedStatus = 'In Stock';

        return {
          ...p,
          quantity: editQty,
          stockStatus: deducedStatus
        };
      }
      return p;
    });
    onUpdateProducts(updated);
    setEditingProductId(null);
  };

  const handleNotifySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!notifyPhone || !notifyProduct) return;

    // Append notification phone to product object
    const updated = products.map(p => {
      if (p.id === notifyProduct.id) {
        const existing = p.notifyPhoneNumbers || [];
        return {
          ...p,
          notifyPhoneNumbers: [...existing, notifyPhone]
        };
      }
      return p;
    });

    onUpdateProducts(updated);
    setNotifySuccessMsg(`Success! We will broadcast a WhatsApp catalog notification alert to ${notifyPhone} as soon as "${notifyProduct.name}" is updated in store.`);
    setTimeout(() => {
      setNotifyProduct(null);
      setNotifyPhone('');
      setNotifySuccessMsg('');
    }, 4500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      
      {/* Page Header */}
      <div className="mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-gray-200 pb-5">
        <div>
          <h2 className="text-2xl md:text-3xl font-display font-bold text-brand-black tracking-tight flex items-center gap-2">
            <span>Live Stock & Inventory Status</span>
            <span className="w-2 h-2 rounded-full bg-green-500 animate-ping inline-block" />
          </h2>
          <p className="text-xs text-secondary-text text-gray-500 mt-1">
            Real-time stock indicators updated instantly from showroom floor ledgers.
          </p>
        </div>
        <div className="text-right">
          <span className="text-[10px] font-mono tracking-wider font-bold text-[#1A56D6] uppercase block">
            System Synchronization Code: 4G LTE
          </span>
          <span className="text-[10px] text-gray-400 font-mono block mt-0.5">
            Last Updated: {new Date().toLocaleString()} (GMT+1)
          </span>
        </div>
      </div>

      {/* Filter strip panels */}
      <div className="bg-white rounded-2xl border border-gray-250 p-4 mb-6 flex flex-wrap items-center justify-between gap-4 shadow-sm">
        <div className="flex flex-wrap items-center gap-3">
          
          {/* Category Filter */}
          <div className="flex flex-col">
            <span className="text-[10px] uppercase font-bold text-gray-400 font-mono mb-1">Category</span>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="text-xs p-2 border border-gray-200 rounded-lg outline-none bg-gray-50 focus:border-brand-orange cursor-pointer"
            >
              {uniqueCategories.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div className="flex flex-col">
            <span className="text-[10px] uppercase font-bold text-gray-400 font-mono mb-1">Availability</span>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="text-xs p-2 border border-gray-200 rounded-lg outline-none bg-gray-50 focus:border-brand-orange cursor-pointer"
            >
              <option value="All">All Statuses</option>
              <option value="In Stock">In Stock</option>
              <option value="Low Stock">Low Stock</option>
              <option value="Out of Stock">Out of Stock</option>
            </select>
          </div>

        </div>

        {/* Inventory Searcher */}
        <div className="relative w-full sm:w-64 max-w-xs">
          <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search matching model, brand..."
            className="w-full text-xs p-2 pl-8 border border-gray-200 rounded-lg outline-none focus:border-brand-orange bg-gray-50"
          />
        </div>
      </div>

      {/* Grid Display & CRM Table list combo */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-gray-900 text-white font-mono uppercase tracking-widest text-[9px]">
              <tr>
                <th className="p-4">Brand</th>
                <th className="p-4">Product / Spec Name</th>
                <th className="p-4">Category</th>
                <th className="p-4">Unit Price</th>
                <th className="p-4 text-center">Indicators Status</th>
                {staffSession && <th className="p-4 text-center">Showroom Qty Ledger</th>}
                <th className="p-4 text-right">Inquiry Channel</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-150">
              {filteredInventory.map((p) => {
                const isUnderEdit = editingProductId === p.id;

                return (
                  <tr key={p.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="p-4 font-bold text-brand-orange uppercase font-mono tracking-wider">
                      {p.brand}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        {isVideoSrc(p.image) ? (
                          <video src={p.image} className="w-10 h-8 object-cover rounded border border-gray-200 shrink-0 bg-black" autoPlay loop muted playsInline />
                        ) : (
                          <img src={p.image} className="w-10 h-8 object-cover rounded border border-gray-200 shrink-0" referrerPolicy="no-referrer" />
                        )}
                        <div>
                          <p className="font-semibold text-brand-black">{p.name}</p>
                          <p className="text-[10px] text-gray-400 mt-0.5 truncate max-w-sm">{p.specs.slice(0, 2).join(' • ')}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-gray-500 font-medium">
                      {p.category}
                    </td>
                    <td className="p-4 font-mono font-bold text-brand-black">
                      ₦{p.price.toLocaleString()}
                    </td>
                    
                    {/* Visual checkmark system matching specifications:
                        green tick (In Stock), amber dash (Low Stock), red X (Out of Stock) */}
                    <td className="p-4">
                      <div className="flex items-center justify-center">
                        {p.stockStatus === 'In Stock' && (
                          <span className="flex items-center gap-1 bg-green-105 text-green-800 font-semibold px-2.5 py-1 rounded-full text-[10px]">
                            <Check className="w-3.5 h-3.5 text-green-600 shrink-0" />
                            <span>In Stock (✔)</span>
                          </span>
                        )}
                        {p.stockStatus === 'Low Stock' && (
                          <span className="flex items-center gap-1 bg-amber-55 bg-amber-100 text-amber-80 *0 text-[10px] font-semibold px-2.5 py-1 rounded-full">
                            <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0" />
                            <span>Low Stock (–)</span>
                          </span>
                        )}
                        {p.stockStatus === 'Out of Stock' && (
                          <span className="flex items-center gap-1 bg-red-105 bg-red-100 text-red-800 text-[10px] font-semibold px-2.5 py-1 rounded-full">
                            <XSquare className="w-3.5 h-3.5 text-red-500 shrink-0" />
                            <span>Out of Stock (X)</span>
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Staff quantity indicator edits (If logged-in session) */}
                    {staffSession && (
                      <td className="p-4 text-center border-l bg-brand-blue-tint/20">
                        {isUnderEdit ? (
                          <div className="flex items-center justify-center gap-1.5">
                            <input
                              type="number"
                              min={0}
                              value={editQty}
                              onChange={(e) => setEditQty(Math.max(0, parseInt(e.target.value) || 0))}
                              className="w-12 text-center p-1 border border-brand-blue bg-white font-semibold font-mono rounded"
                            />
                            <button
                              onClick={() => handleSaveInlineEdit(p.id)}
                              className="p-1 bg-green-600 hover:bg-green-700 text-white rounded cursor-pointer"
                              title="Commit edits"
                            >
                              <Save className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center justify-center gap-2">
                            <span className="font-mono font-bold text-brand-blue">
                              {p.quantity} Units
                            </span>
                            <button
                              onClick={() => {
                                setEditingProductId(p.id);
                                setEditQty(p.quantity);
                                setEditStatus(p.stockStatus);
                              }}
                              className="p-1 text-gray-400 hover:text-brand-blue transition-colors cursor-pointer"
                              title="Edit Quantity"
                            >
                              <Edit3 className="w-3 h-3" />
                            </button>
                          </div>
                        )}
                      </td>
                    )}

                    {/* Action enquiry notify button */}
                    <td className="p-4 text-right">
                      {p.stockStatus === 'Out of Stock' ? (
                        <button
                          onClick={() => {
                            setNotifyProduct(p);
                            setNotifyPhone('');
                            setNotifySuccessMsg('');
                          }}
                          className="px-2.5 py-1.5 bg-brand-orange-tint hover:bg-brand-orange text-brand-orange hover:text-white rounded-lg text-[10px] font-bold tracking-wider uppercase flex items-center justify-center gap-1 ml-auto cursor-pointer transition-all"
                        >
                          <BellRing className="w-3 h-3" />
                          <span>Notify Me</span>
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            const formatted = `₦${p.price.toLocaleString()}`;
                            const text = `Hello Ugomenz! I see the "${p.name}" (${formatted}) show status is "In Stock" on your live inventory ledger. Please arrange booking details!`;
                            window.open(`https://wa.me/2348052000034?text=${encodeURIComponent(text)}`, '_blank');
                          }}
                          className="px-2.5 py-1.5 bg-green-50 hover:bg-green-600 text-green-600 hover:text-white rounded-lg text-[10px] font-bold uppercase tracking-wider flex items-center justify-center gap-1 ml-auto cursor-pointer transition-all"
                        >
                          <span>Order Chat</span>
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}

              {filteredInventory.length === 0 && (
                <tr>
                  <td colSpan={staffSession ? 7 : 6} className="p-10 text-center text-gray-500 font-medium">
                    No products aligning with current selection options found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Notify Me Lightbox Overlay */}
      <AnimatePresence>
        {notifyProduct && (
          <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in duration-100">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl relative"
            >
              {/* Close Icon */}
              <button
                onClick={() => setNotifyProduct(null)}
                className="absolute top-4 right-4 text-gray-400 hover:text-black w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center border border-gray-150"
              >
                ✕
              </button>

              <div className="flex items-center gap-2 mb-3">
                <BellRing className="w-5 h-5 text-brand-orange" />
                <h3 className="text-base font-bold font-display text-gray-900">
                  Stock Restock Notification
                </h3>
              </div>

              {notifySuccessMsg ? (
                <div className="bg-green-50 text-green-800 p-4 rounded-xl text-xs flex items-start gap-2 border border-green-100">
                  <CheckCircle className="w-5 h-5 text-green-600 shrink-0" />
                  <span className="font-medium leading-relaxed">{notifySuccessMsg}</span>
                </div>
              ) : (
                <form onSubmit={handleNotifySubmit} className="space-y-4">
                  <p className="text-xs text-gray-500 leading-relaxed">
                    Enter your phone number below. We will save your interest for <span className="font-bold text-gray-850">"{notifyProduct.name}"</span> and alert you on WhatsApp the moment fresh stock units land.
                  </p>

                  <div>
                    <label className="block text-[10px] uppercase font-bold text-gray-400 font-mono mb-1">
                      WhatsApp Phone Number
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g., 080XXXXXXXX"
                      value={notifyPhone}
                      onChange={(e) => setNotifyPhone(e.target.value)}
                      className="w-full text-sm p-2.5 border border-gray-250 rounded-lg outline-none focus:border-brand-orange bg-gray-50"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-brand-orange hover:bg-orange-600 text-white font-semibold py-2.5 text-xs rounded-lg shadow-sm shadow-brand-orange/20 cursor-pointer"
                  >
                    Subscribe Restock Alert
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
