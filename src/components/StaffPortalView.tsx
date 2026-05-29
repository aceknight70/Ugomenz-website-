import React, { useState } from 'react';
import {
  KeyRound, Users, UserPlus, ShoppingBag, Plus, Trash2, Edit3, Sliders, ToggleLeft, ToggleRight,
  TrendingUp, Activity, Inbox, MailCheck, BellRing, Settings, HelpCircle, Save, PlusCircle, AlertCircle, AlertTriangle
} from 'lucide-react';
import { Product, Order, Lead, SupportTicket, ServiceBooking, ActiveStaffSession } from '../types';

interface StaffPortalViewProps {
  products: Product[];
  orders: Order[];
  leads: Lead[];
  tickets: SupportTicket[];
  bookings: ServiceBooking[];
  staffSession: ActiveStaffSession | null;
  onUpdateProducts: (updatedList: Product[]) => void;
  onUpdateOrders: (updatedList: Order[]) => void;
  onUpdateLeads: (updatedList: Lead[]) => void;
  onUpdateTickets: (updatedList: SupportTicket[]) => void;
  onUpdateBookings: (updatedList: ServiceBooking[]) => void;
}

export default function StaffPortalView({
  products,
  orders,
  leads,
  tickets,
  bookings,
  staffSession,
  onUpdateProducts,
  onUpdateOrders,
  onUpdateLeads,
  onUpdateTickets,
  onUpdateBookings
}: StaffPortalViewProps) {
  // Navigation tabs within Staff Portal
  const [activePortalTab, setActivePortalTab] = useState<'Overview' | 'Catalog' | 'Leads' | 'Orders' | 'ServiceBookings'>('Overview');

  // FORM state for adding product (Part of CMS)
  const [newProdName, setNewProdName] = useState('');
  const [newProdBrand, setNewProdBrand] = useState('Samsung');
  const [newProdCategory, setNewProdCategory] = useState('TVs');
  const [newProdPrice, setNewProdPrice] = useState<number>(0);
  const [newProdQty, setNewProdQty] = useState<number>(1);
  const [newProdDesc, setNewProdDesc] = useState('');
  const [newProdImage, setNewProdImage] = useState('');
  const [newProdSpecs, setNewProdSpecs] = useState('');
  
  // States for Editing existing product
  const [editingProdId, setEditingProdId] = useState<string | null>(null);
  const [editingPrice, setEditingPrice] = useState<number>(0);
  const [editingQty, setEditingQty] = useState<number>(0);

  // Quick statistics
  const newLeadsCount = leads.filter(l => l.status === 'New').length;
  const activeOrdersCount = orders.filter(o => o.status === 'Pending').length;
  const lowStockCount = products.filter(p => p.quantity <= 3).length;
  const activeIssuesCount = tickets.filter(t => t.status !== 'Resolved').length;
  const pendingBookingsCount = bookings.filter(b => b.status === 'Pending').length;

  const handleAddNewProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProdName || !newProdPrice || !newProdImage) return;

    // Convert comma specs to list representation
    const specArray = newProdSpecs ? newProdSpecs.split(',').map(s => s.trim()) : ['Authorized Direct Stock'];
    
    // Auto-compute stock status based on initial quantity
    let sStatus: Product['stockStatus'] = 'In Stock';
    if (newProdQty === 0) sStatus = 'Out of Stock';
    else if (newProdQty <= 3) sStatus = 'Low Stock';

    const newProdItem: Product = {
      id: `prod-${Date.now()}`,
      name: newProdName,
      brand: newProdBrand,
      category: newProdCategory,
      price: newProdPrice,
      quantity: newProdQty,
      description: newProdDesc,
      image: newProdImage,
      specs: specArray,
      stockStatus: sStatus
    };

    onUpdateProducts([newProdItem, ...products]);

    // Reset Form Fields
    setNewProdName('');
    setNewProdPrice(0);
    setNewProdQty(1);
    setNewProdDesc('');
    setNewProdImage('');
    setNewProdSpecs('');

    alert('Product Add Successful! Sourced into live Showroom catalogue instantly.');
  };

  const handleDeleteProduct = (productId: string) => {
    if (!confirm('Are you certain you wish to delete this product model?')) return;
    const filtered = products.filter(p => p.id !== productId);
    onUpdateProducts(filtered);
  };

  const handleSaveProductEdit = (pId: string) => {
    const updated = products.map(p => {
      if (p.id === pId) {
        let detStatus: Product['stockStatus'] = 'In Stock';
        if (editingQty === 0) detStatus = 'Out of Stock';
        else if (editingQty <= 3) detStatus = 'Low Stock';

        return {
          ...p,
          price: editingPrice,
          quantity: editingQty,
          stockStatus: detStatus
        };
      }
      return p;
    });
    onUpdateProducts(updated);
    setEditingProdId(null);
  };

  // Status Toggles for Lead & Booking CRM pipelines
  const handleToggleLeadStatus = (leadId: string, status: Lead['status']) => {
    const updated = leads.map(l => l.id === leadId ? { ...l, status } : l);
    onUpdateLeads(updated);
  };

  const handleToggleBookingStatus = (bookingId: string, status: ServiceBooking['status']) => {
    const updated = bookings.map(b => b.id === bookingId ? { ...b, status } : b);
    onUpdateBookings(updated);
  };

  const handleWhatsAppContactLead = (name: string, phone: string, purpose: string) => {
    const responseMsg = `Hello ${name}! This is the Ugomenz technical desk responding to your "${purpose}" enquiry on our platform. Let us discuss specifications!`;
    window.open(`https://wa.me/${phone.replace(/^0/, '234')}?text=${encodeURIComponent(responseMsg)}`, '_blank');
  };

  if (!staffSession) {
    return (
      <div className="max-w-md mx-auto py-16 text-center space-y-4">
        <div className="p-4 bg-red-50 text-red-750 rounded-2xl border border-red-150 flex items-start gap-2.5 text-left font-sans text-xs">
          <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
          <div>
            <p className="font-bold text-gray-900">16. Portal Access Locked (CMS Operations)</p>
            <p className="text-gray-500 mt-1">This dashboard requires staff security clearance. Lock credentials by tapping "Staff Access" in the heading bar above. Match PIN "1234" (Staff) or "9999" (Manager).</p>
          </div>
        </div>
      </div>
    );
  }

  const portalTabs = [
    { id: 'Overview' as const, label: 'Control Overview', icon: Activity },
    { id: 'Catalog' as const, label: 'Store Catalog (CMS)', icon: ShoppingBag },
    { id: 'Leads' as const, label: 'Leads CRM', icon: Users },
    { id: 'Orders' as const, label: 'Customer Orders', icon: Inbox },
    { id: 'ServiceBookings' as const, label: 'Technical Bookings', icon: Sliders },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      
      {/* Header section displaying active roles */}
      <div className="border-b pb-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-display font-bold text-brand-black tracking-tight select-none">
            Ugomenz Headless Operations Master
          </h2>
          <p className="text-xs text-gray-500 mt-0.5 font-mono">
            Direct CRM interface. Authorized representative: <span className="text-brand-orange font-bold font-mono">{staffSession.email} ({staffSession.role} Level)</span>
          </p>
        </div>

        {/* Dashboard inner navigation ribbon */}
        <div className="flex gap-1.5 overflow-x-auto select-none pb-2 sm:pb-0 scrollbar-none">
          {portalTabs.map(tab => {
            const Icon = tab.icon;
            const isSelected = activePortalTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setActivePortalTab(tab.id)}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-brand-orange text-white shadow-sm'
                    : 'bg-white border text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {activePortalTab === 'Overview' && (
        /* portal summary stats and logs dashboard */
        <div className="space-y-8 animate-in fade-in duration-200">
          
          {/* Bento-grid counters summary */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm text-center">
              <span className="block text-2xl font-mono font-bold text-red-500">{newLeadsCount}</span>
              <span className="text-[10px] uppercase font-mono tracking-wider font-bold text-gray-400 block mt-1">New Leads CRM</span>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm text-center">
              <span className="block text-2xl font-mono font-bold text-brand-orange">{activeOrdersCount}</span>
              <span className="text-[10px] uppercase font-mono tracking-wider font-bold text-gray-400 block mt-1">Pending Invoices</span>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm text-center">
              <span className="block text-2xl font-mono font-bold text-amber-500">{lowStockCount}</span>
              <span className="text-[10px] uppercase font-mono tracking-wider font-bold text-gray-400 block mt-1">Low Stock Alerts</span>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm text-center">
              <span className="block text-2xl font-mono font-bold text-[#1A56D6]">{activeIssuesCount}</span>
              <span className="text-[10px] uppercase font-mono tracking-wider font-bold text-gray-400 block mt-1">Active Tickets</span>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm text-center">
              <span className="block text-2xl font-mono font-bold text-emerald-500">{pendingBookingsCount}</span>
              <span className="text-[10px] uppercase font-mono tracking-wider font-bold text-gray-400 block mt-1">Pending Services</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Quick Action prompts */}
            <div className="bg-white p-6 rounded-3xl border border-gray-200 space-y-4">
              <h3 className="font-display font-medium text-base text-brand-black border-b pb-2">Quick CRM Actions</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <button
                  onClick={() => setActivePortalTab('Catalog')}
                  className="p-3 bg-brand-orange/5 hover:bg-brand-orange/15 border border-brand-orange/20 text-brand-orange text-left rounded-xl font-bold font-mono transition-colors"
                >
                  ➕ Add New TV / Model model
                </button>
                <button
                  onClick={() => setActivePortalTab('Leads')}
                  className="p-3 bg-[#EEF3FF] hover:bg-[#EEF3FF]/15 border border-[#cbd5e1] text-brand-blue text-left rounded-xl font-bold font-mono transition-colors"
                >
                  💬 Contact Onboarding leads
                </button>
              </div>
            </div>

            {/* Quick Instructions list */}
            <div className="bg-gray-900 text-white p-6 rounded-3xl border border-gray-800 space-y-4">
              <h3 className="font-display font-medium text-base border-b pb-2 border-gray-800">Operational SLA Rules</h3>
              <ul className="space-y-2 text-xs text-gray-300 font-sans">
                <li>• Ensure that orders are changed to "Paid" once bank transfer screenshots have been verifed by Fortune or Dr Efemena.</li>
                <li>• Out of stock models must be updated inline under Live Inventory to notify registered customers automatically.</li>
                <li>• Always add surge stabilizer packages alongside high-end premium OLED units to keep warranty swaps legally compliant.</li>
              </ul>
            </div>
          </div>

        </div>
      )}

      {activePortalTab === 'Catalog' && (
        /* CMS Product Management CRUD section */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start animate-in fade-in duration-200">
          
          {/* CMS Grid left listings column */}
          <div className="lg:col-span-2 space-y-6">
            <h3 className="font-display font-bold text-lg text-brand-black">ショールーム Models Storage (CMS control)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {products.map(p => {
                const isEditing = editingProdId === p.id;

                return (
                  <div key={p.id} className="bg-white p-4 border border-gray-200 rounded-2xl flex gap-3 shadow-xs relative">
                    <img src={p.image} className="w-16 h-12 object-cover rounded-lg border border-gray-150 shrink-0" referrerPolicy="no-referrer" />
                    
                    <div className="flex-1 min-w-0">
                      <span className="text-[9px] font-mono uppercase font-bold text-gray-400">{p.brand} ({p.category})</span>
                      <h4 className="font-bold text-xs text-gray-800 leading-tight truncate">{p.name}</h4>
                      
                      {isEditing ? (
                        <div className="mt-2 space-y-2.5 bg-gray-50 p-2.5 rounded-lg border">
                          <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-gray-700">
                            <span>₦</span>
                            <input
                              type="number"
                              value={editingPrice}
                              onChange={(e) => setEditingPrice(Math.max(0, parseInt(e.target.value) || 0))}
                              className="w-full text-xs p-1 border rounded bg-white text-gray-800"
                            />
                          </div>
                          <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-gray-700">
                            <span>Qty:</span>
                            <input
                              type="number"
                              value={editingQty}
                              onChange={(e) => setEditingQty(Math.max(0, parseInt(e.target.value) || 0))}
                              className="w-16 text-center text-xs p-1 border rounded bg-white text-gray-800"
                            />
                          </div>
                          <button
                            onClick={() => handleSaveProductEdit(p.id)}
                            className="w-full py-1 bg-green-600 text-white rounded text-[10px] font-bold uppercase"
                          >
                            Save Updates
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between mt-3">
                          <p className="text-xs font-mono font-bold text-brand-black">₦{p.price.toLocaleString()}</p>
                          <p className="text-[10px] font-mono text-brand-blue font-bold">Qty: {p.quantity} Units</p>
                        </div>
                      )}

                      {/* Editing Actions buttons bar */}
                      <div className="mt-3 pt-3 border-t border-gray-100 flex justify-end gap-2 text-[10px] font-bold">
                        <button
                          onClick={() => {
                            setEditingProdId(p.id);
                            setEditingPrice(p.price);
                            setEditingQty(p.quantity);
                          }}
                          className="text-brand-blue hover:underline uppercase flex items-center gap-1 cursor-pointer"
                        >
                          <Edit3 className="w-3 h-3 text-brand-blue" />
                          <span>Modify</span>
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(p.id)}
                          className="text-red-500 hover:underline uppercase flex items-center gap-1 cursor-pointer"
                        >
                          <Trash2 className="w-3 h-3 text-red-500" />
                          <span>Remove</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* CMS Right Column adding product FORM */}
          <div className="bg-white border border-gray-250 p-6 rounded-3xl shadow-sm">
            <h3 className="font-display font-medium text-base text-brand-black mb-3 pb-2 border-b">
              Add New Model Catalogue
            </h3>

            <form onSubmit={handleAddNewProductSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-gray-655 font-semibold mb-1">
                  Product Model Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Sony 85-inch Master Bravia TV"
                  value={newProdName}
                  onChange={(e) => setNewProdName(e.target.value)}
                  className="w-full text-xs p-3 border rounded-lg bg-gray-50/50 outline-none focus:border-brand-orange"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-655 font-semibold mb-1">Brand Manufacturer</label>
                  <select
                    value={newProdBrand}
                    onChange={(e) => setNewProdBrand(e.target.value)}
                    className="w-full text-xs p-3 border rounded-lg bg-gray-50 outline-none cursor-pointer focus:border-brand-orange"
                  >
                    <option value="Samsung">Samsung</option>
                    <option value="LG">LG</option>
                    <option value="Sony">Sony</option>
                    <option value="Hisense">Hisense</option>
                    <option value="JVC">JVC</option>
                    <option value="Skyworth">Skyworth</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-655 font-semibold mb-1">Store Category</label>
                  <select
                    value={newProdCategory}
                    onChange={(e) => setNewProdCategory(e.target.value)}
                    className="w-full text-xs p-3 border rounded-lg bg-gray-50 outline-none cursor-pointer focus:border-brand-orange"
                  >
                    <option value="TVs">TVs</option>
                    <option value="Home Theaters">Home Theaters</option>
                    <option value="Sound Systems">Sound Systems</option>
                    <option value="Cameras">Cameras</option>
                    <option value="Accessories">Accessories</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-655 font-semibold mb-1">Unit Showroom Price (₦)</label>
                  <input
                    type="number"
                    required
                    min={0}
                    value={newProdPrice}
                    onChange={(e) => setNewProdPrice(Math.max(0, parseInt(e.target.value) || 0))}
                    className="w-full text-xs p-3 border rounded-lg bg-gray-50/50 outline-none focus:border-brand-orange"
                  />
                </div>
                <div>
                  <label className="block text-gray-655 font-semibold mb-1">Stored Units Quantity</label>
                  <input
                    type="number"
                    required
                    min={0}
                    value={newProdQty}
                    onChange={(e) => setNewProdQty(Math.max(0, parseInt(e.target.value) || 0))}
                    className="w-full text-xs p-3 border rounded-lg bg-gray-50/50 outline-none focus:border-brand-orange"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-655 font-semibold mb-1">Core Specifications (comma-separated list)</label>
                <input
                  type="text"
                  placeholder="e.g., Screen Size: 85 inches, HDMI, 4K UHD"
                  value={newProdSpecs}
                  onChange={(e) => setNewProdSpecs(e.target.value)}
                  className="w-full text-xs p-3 border rounded-lg bg-gray-50/50 outline-none focus:border-brand-orange"
                />
              </div>

              <div>
                <label className="block text-gray-655 font-semibold mb-1">Showcase Image Unsplash Link</label>
                <input
                  type="url"
                  required
                  placeholder="e.g., https://images.unsplash.com/photo-..."
                  value={newProdImage}
                  onChange={(e) => setNewProdImage(e.target.value)}
                  className="w-full text-xs p-3 border rounded-lg bg-gray-50/50 outline-none focus:border-brand-orange"
                />
              </div>

              <div>
                <label className="block text-gray-655 font-semibold mb-1">Editorial Model Description</label>
                <textarea
                  rows={2}
                  required
                  placeholder="Describe full highlights, screen resolutions details..."
                  value={newProdDesc}
                  onChange={(e) => setNewProdDesc(e.target.value)}
                  className="w-full text-xs p-3 border rounded-lg bg-gray-50/50 outline-none focus:border-brand-orange resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-brand-orange hover:bg-orange-655 text-white font-bold rounded-xl text-xs uppercase"
              >
                ✔ Publish New Model catalog
              </button>
            </form>
          </div>

        </div>
      )}

      {activePortalTab === 'Leads' && (
        /* Leads CRM data list */
        <div className="bg-white border rounded-2xl overflow-hidden shadow-sm animate-in fade-in duration-200">
          <div className="p-4 bg-gray-55/65 border-b font-display font-medium text-brand-black leading-none">
            Onboarding Contacts & Leads ledger
          </div>
          <div className="overflow-x-auto text-xs">
            <table className="w-full text-left">
              <thead className="bg-gray-100 uppercase tracking-widest text-[9px] font-mono text-gray-600">
                <tr>
                  <th className="p-4">Submission Date</th>
                  <th className="p-4">Applicant Name</th>
                  <th className="p-4">Contact Phone</th>
                  <th className="p-4">Purpose Interest</th>
                  <th className="p-4">Student Message Notes</th>
                  <th className="p-4">Lead Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {leads.map(lead => (
                  <tr key={lead.id} className="hover:bg-gray-55/50">
                    <td className="p-4 font-mono font-bold text-gray-450">{lead.date}</td>
                    <td className="p-4 font-bold text-gray-800">{lead.name}</td>
                    <td className="p-4 font-mono">{lead.phone}</td>
                    <td className="p-4">
                      <span className="text-[10px] bg-brand-blue-tint text-brand-blue border border-brand-blue/10 rounded-full px-2.5 py-0.5 font-bold">
                        {lead.purpose}
                      </span>
                    </td>
                    <td className="p-4 text-gray-500 font-semibold italic max-w-xs truncate">{lead.message}</td>
                    
                    {/* Toggle Lead Status */}
                    <td className="p-4">
                      <select
                        value={lead.status}
                        onChange={(e: any) => handleToggleLeadStatus(lead.id, e.target.value)}
                        className="text-[10px] p-1 border rounded bg-white outline-none font-bold cursor-pointer"
                      >
                        <option value="New">🔴 New Lead</option>
                        <option value="Contacted">🟡 Contacting</option>
                        <option value="Closed">🟢 Completed</option>
                      </select>
                    </td>

                    {/* WhatsApp directly action */}
                    <td className="p-4 text-right">
                      <button
                        onClick={() => handleWhatsAppContactLead(lead.name, lead.phone, lead.purpose)}
                        className="px-2.5 py-1 bg-green-50 text-green-600 border border-green-200 uppercase font-bold tracking-wider font-mono text-[9px] hover:bg-green-600 hover:text-white rounded transition-colors cursor-pointer"
                      >
                        Direct WhatsApp
                      </button>
                    </td>
                  </tr>
                ))}

                {leads.length === 0 && (
                  <tr>
                    <td colSpan={7} className="p-8 text-center text-gray-400 font-medium font-mono">No contact submissions loaded at the moment.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activePortalTab === 'Orders' && (
        /* Customer orders manager listing */
        <div className="bg-white border rounded-2xl overflow-hidden shadow-sm animate-in fade-in duration-200">
          <div className="p-4 bg-gray-55 border-b font-display font-medium text-brand-black leading-none">
            Showroom Orders Reconciliation Logs
          </div>
          <div className="overflow-x-auto text-xs">
            <table className="w-full text-left">
              <thead className="bg-gray-100 uppercase tracking-widest text-[9px] font-mono text-gray-655">
                <tr>
                  <th className="p-4">Order ID</th>
                  <th className="p-4">Buyer Name</th>
                  <th className="p-4 font-mono">Contact Phone</th>
                  <th className="p-4">Product Particulars</th>
                  <th className="p-4">Total Price</th>
                  <th className="p-4">Reconciled Status</th>
                  <th className="p-4 text-right">Action Tracker</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {orders.map(or => (
                  <tr key={or.id} className="hover:bg-gray-50/50">
                    <td className="p-4 font-mono font-bold text-gray-700">{or.id}</td>
                    <td className="p-4 font-bold text-gray-800">{or.customerName}</td>
                    <td className="p-4 font-mono text-gray-450">{or.customerPhone}</td>
                    <td className="p-4 text-gray-500">
                      <div className="max-w-xs truncate font-semibold">
                        {or.items.map(it => `${it.quantity}x ${it.brand} ${it.name}`).join(' | ')}
                      </div>
                    </td>
                    <td className="p-4 font-mono font-bold text-brand-black">₦{or.subtotal.toLocaleString()}</td>
                    
                    {/* Status inline edit */}
                    <td className="p-4">
                      <span className={`px-2 py-0.5 font-bold rounded uppercase font-mono text-[9px] ${
                        or.status === 'Paid'
                          ? 'bg-green-105 text-green-800'
                          : or.status === 'Pending'
                            ? 'bg-amber-105 text-amber-80 *0 text-amber-800'
                            : 'bg-red-105 text-red-800'
                      }`}>
                        {or.status}
                      </span>
                    </td>

                    {/* WhatsApp action */}
                    <td className="p-4 text-right">
                      <button
                        onClick={() => {
                          const formatted = `₦${or.subtotal.toLocaleString()}`;
                          const msg = `Hello ${or.customerName}! We have recorded your Order ${or.id} of total value ${formatted} inside the Ugomenz store ledgers. Please specify your address, thanks !`;
                          window.open(`https://wa.me/${or.customerPhone.replace(/^0/, '234')}?text=${encodeURIComponent(msg)}`, '_blank');
                        }}
                        className="px-2.5 py-1 bg-green-50 text-green-600 border border-green-200 text-[9px] font-bold uppercase tracking-wider font-mono rounded-md hover:bg-green-600 hover:text-white cursor-pointer"
                      >
                        Contact Customer
                      </button>
                    </td>

                  </tr>
                ))}

                {orders.length === 0 && (
                  <tr>
                    <td colSpan={7} className="p-8 text-center text-gray-400 font-mono font-medium">No order logs currently loaded.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activePortalTab === 'ServiceBookings' && (
        /* Technical mounting and servicing jobs scheduled */
        <div className="bg-white border rounded-2xl overflow-hidden shadow-sm animate-in fade-in duration-200">
          <div className="p-4 bg-gray-55 border-b font-display font-medium text-brand-black leading-none">
            Technical Service Appointments scheduler
          </div>
          <div className="overflow-x-auto text-xs">
            <table className="w-full text-left">
              <thead className="bg-gray-100 uppercase tracking-widest text-[9px] font-mono text-gray-655">
                <tr>
                  <th className="p-4">Appointment Unique Code</th>
                  <th className="p-4">Service Profile</th>
                  <th className="p-4 font-mono">Date requested</th>
                  <th className="p-4 font-bold">Client Name</th>
                  <th className="p-4">Target Location</th>
                  <th className="p-4">Operational status</th>
                  <th className="p-4 text-right">Emergency Contact</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {bookings.map(bk => (
                  <tr key={bk.id} className="hover:bg-gray-50/50">
                    <td className="p-4 font-mono font-bold text-gray-700">{bk.id}</td>
                    <td className="p-4 font-bold text-brand-orange">{bk.serviceName}</td>
                    <td className="p-4 font-mono font-semibold">{bk.date}</td>
                    <td className="p-4 font-bold">{bk.customerName}</td>
                    <td className="p-4 text-gray-500 font-sans italic">{bk.location}</td>
                    
                    {/* Toggle status */}
                    <td className="p-4">
                      <select
                        value={bk.status}
                        onChange={(e: any) => handleToggleBookingStatus(bk.id, e.target.value)}
                        className="text-[10px] p-1 border rounded bg-white font-bold cursor-pointer"
                      >
                        <option value="Pending">🔴 Pending Job</option>
                        <option value="Followed Up">🟡 Followed Up</option>
                        <option value="Completed">🟢 Completed</option>
                      </select>
                    </td>

                    {/* Quick WhatsApp Link directly to technical group chat */}
                    <td className="p-4 text-right">
                      <button
                        onClick={() => {
                          const txt = `Hello ${bk.customerName}! This is the Ugomenz technical integration crew. We are confirming our technical visit to ${bk.location} scheduled for ${bk.date} to mount your display/sound modules. Please confirm on-site readiness.`;
                          window.open(`https://wa.me/${bk.customerPhone.replace(/^0/, '234')}?text=${encodeURIComponent(txt)}`, '_blank');
                        }}
                        className="px-2.5 py-1 bg-green-50 text-green-600 border border-green-200 text-[9px] font-bold uppercase tracking-wider font-mono rounded hover:bg-green-605 transition-colors"
                      >
                        Dispatch Crew
                      </button>
                    </td>

                  </tr>
                ))}

                {bookings.length === 0 && (
                  <tr>
                    <td colSpan={7} className="p-8 text-center text-gray-400 font-mono font-medium">No service visits scheduled in the upcoming slots calendar.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
}
