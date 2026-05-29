import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HelpCircle, Search, MessageSquareCode, ShieldCheck, CheckCircle, ChevronDown, ChevronUp, AlertCircle, PhoneCall } from 'lucide-react';
import { SupportTicket } from '../types';

interface SupportViewProps {
  tickets: SupportTicket[];
  onAddTicket: (ticket: SupportTicket) => void;
}

export default function SupportView({ tickets, onAddTicket }: SupportViewProps) {
  // Search state for repair reference tracker
  const [trackRef, setTrackRef] = useState('');
  const [foundTicket, setFoundTicket] = useState<SupportTicket | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  // Complaints form state
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [issueType, setIssueType] = useState<'Track Order' | 'Report a Fault' | 'Warranty Claim' | 'General Enquiry'>('General Enquiry');
  const [description, setDescription] = useState('');
  const [ticketSuccessMsg, setTicketSuccessMsg] = useState('');

  // FAQ accordion active state index
  const [activeFaqIndex, setActiveFaqIndex] = useState<number | null>(null);

  const faqs = [
    {
      q: 'Do your electronics come with an official warranty cover?',
      a: 'Yes, absolutely. Being an authorized direct dealer for Samsung, Sony, LG, Hisense, JVC, and Skyworth, all our televisions and soundbar systems come with a full 12-Month In-Store Warranty. In case of issues, our technical team handles repair swapping directly at our Airport Road showroom.',
      cat: 'Warranty'
    },
    {
      q: 'What is the estimated delivery timeframe inside Delta State?',
      a: 'Standard deliveries inside Effurun, GRA, and Central Warri are processed on the same day (usually within 1 to 4 hours of payment clearance). Outlying areas like Sapele, Ughelli, or Asaba are dispatched via secure transit partners, taking 24 to 48 hours maximum.',
      cat: 'Logistics'
    },
    {
      q: 'Can I request custom wall mounting for my 75" or 100" Projection screens?',
      a: 'Yes, we have specialized technicians equipped with state-of-the-art masonry mounting systems. We align screens, secure cable tracks, and soundstage surround speakers for optimal spatial acoustics. You can book an appointment via our Services page.',
      cat: 'Technical'
    },
    {
      q: 'Why do you recommend pairing screens with an Automatic Voltage Regulator (AVR)?',
      a: 'Fluctuating electricity supply in the local grid is the leading cause of motherboard failure in modern OLED panels. Pairing major purchases with our heavy-duty AVR stabilizers filters voltage arcs, securing your display hardware and preserving your warranty claims.',
      cat: 'Hardware'
    }
  ];

  const handleTrackSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setHasSearched(true);
    const searchTrim = trackRef.trim().toUpperCase();
    const match = tickets.find(t => t.referenceNumber === searchTrim || t.id === searchTrim);
    setFoundTicket(match || null);
  };

  const handleComplaintSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone || !description) return;

    const refNo = `UGM-${Math.floor(10000 + Math.random() * 90000)}`;
    const newTicket: SupportTicket = {
      id: `tkt-${Date.now()}`,
      referenceNumber: refNo,
      customerName,
      customerPhone,
      issueType,
      description,
      status: 'Received',
      lastUpdated: new Date().toLocaleString(),
      date: new Date().toISOString().split('T')[0]
    };

    onAddTicket(newTicket);
    setTicketSuccessMsg(`Support Ticket Created! Reference identifier is: ${refNo}. Keep this code safe to tracking live diagnostics online.`);
    
    setCustomerName('');
    setCustomerPhone('');
    setDescription('');

    setTimeout(() => {
      setTicketSuccessMsg('');
    }, 6000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-12">
      
      {/* Title */}
      <div className="mb-8">
        <h2 className="text-2xl md:text-3xl font-display font-bold text-brand-black tracking-tight">
          Customer Service & Repairs Center
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Track active screen repairs, seek troubleshooting answers, or create official diagnostics support tickets instantly.
        </p>
      </div>

      {/* Grid layouts splitting trackers, forms, and FAQs */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Left Column: Tracking and FAQs */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Repair online tracker */}
          <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm space-y-4">
            <h3 className="font-display font-bold text-base text-brand-black flex items-center gap-2 leading-none">
              <span className="w-2.5 h-2.5 bg-brand-orange rounded-full" />
              <span>Repair Status & Order Online Tracker</span>
            </h3>
            <p className="text-xs text-gray-500 max-w-md">
              Enter your 5-digit repair reference number (e.g., <span className="font-bold underline text-brand-orange">UGM-88902</span> or <span className="font-bold underline text-brand-orange">UGM-44510</span>) received on your counter deposit receipt.
            </p>

            <form onSubmit={handleTrackSearch} className="flex gap-2 max-w-md select-none">
              <input
                type="text"
                required
                value={trackRef}
                onChange={(e) => setTrackRef(e.target.value)}
                placeholder="Enter Reference (e.g., UGM-XXXXX)"
                className="flex-1 text-xs px-3 py-2 border border-blue-10 border-gray-250 outline-none focus:border-brand-orange uppercase font-mono font-bold bg-gray-50 rounded-lg text-gray-700"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-brand-orange hover:bg-orange-600 text-white rounded-lg text-xs font-semibold cursor-pointer transition-colors"
              >
                Track Status
              </button>
            </form>

            {/* Tracker search outcomes */}
            {hasSearched && (
              <div className="p-4 bg-gray-50 border rounded-2xl text-xs space-y-2 animate-in slide-in-from-top-1">
                {foundTicket ? (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between border-b pb-2">
                      <span className="font-mono font-bold text-gray-800">Job: {foundTicket.referenceNumber}</span>
                      <span className={`px-2 py-0.5 font-bold rounded uppercase tracking-wider font-mono text-[9px] ${
                        foundTicket.status === 'Resolved'
                          ? 'bg-green-105 text-green-800'
                          : foundTicket.status === 'In Progress'
                            ? 'bg-amber-105 text-amber-800 animate-pulse'
                            : 'bg-indigo-105 text-indigo-805'
                      }`}>
                        {foundTicket.status}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-[11px] font-mono">
                      <div>
                        <p className="text-gray-400">Customer Name</p>
                        <p className="font-bold text-gray-800">{foundTicket.customerName}</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Issue Type</p>
                        <p className="font-bold text-gray-800">{foundTicket.issueType}</p>
                      </div>
                    </div>
                    <div className="pt-2 border-t">
                      <p className="text-gray-400 font-mono text-[10px]">Diagnosis Details</p>
                      <p className="text-xs text-gray-550 leading-relaxed mt-1 font-semibold italic">{foundTicket.description}</p>
                    </div>
                    <p className="text-[10px] text-gray-400 font-mono pt-1">Last System Update: {foundTicket.lastUpdated}</p>
                  </div>
                ) : (
                  <div className="flex items-start gap-2 text-red-750">
                    <AlertCircle className="w-4.5 h-4.5 text-red-500 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold">Invalid Reference Code</p>
                      <p className="text-gray-500 mt-0.5">Please check your receipt. Confirm that keys matching the UGM-XXXXX syntax are used.</p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* FAQs Accordion Panel */}
          <div className="space-y-4">
            <div className="border-b pb-2">
              <h3 className="font-display font-medium text-base text-brand-black leading-tight">
                Frequently Asked Technical Questions (FAQs)
              </h3>
            </div>

            <div className="space-y-3">
              {faqs.map((faq, index) => {
                const isOpen = activeFaqIndex === index;

                return (
                  <div key={index} className="bg-white border rounded-2xl overflow-hidden shadow-sm">
                    <button
                      onClick={() => setActiveFaqIndex(isOpen ? null : index)}
                      className="w-full p-4 text-left flex items-center justify-between gap-4 font-semibold text-xs text-brand-black cursor-pointer bg-white hover:bg-gray-50/50"
                    >
                      <span className="flex items-start gap-2">
                        <span className="text-brand-orange mt-0.5 font-mono">Q.</span>
                        <span className="leading-snug">{faq.q}</span>
                      </span>
                      {isOpen ? <ChevronUp className="w-4 h-4 shrink-0 text-brand-orange" /> : <ChevronDown className="w-4 h-4 shrink-0 text-gray-450" />}
                    </button>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: 'auto' }}
                          exit={{ height: 0 }}
                          className="px-4 pb-4 overflow-hidden border-t"
                        >
                          <p className="text-xs text-gray-500 pt-3 leading-relaxed font-sans pl-6 whitespace-pre-line">
                            {faq.a}
                          </p>
                          <div className="pl-6 pt-3">
                            <span className="text-[9px] uppercase font-mono bg-blue-50 text-brand-blue border border-blue-10 px-2 rounded font-bold">
                              {faq.cat}
                            </span>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Right Column: Complaints & ticket creation */}
        <div className="bg-white border border-gray-250 p-6 rounded-3xl shadow-sm relative">
          <h3 className="font-display font-bold text-base text-brand-black mb-3 pb-2 border-b border-gray-150 leading-none">
            Diagnostics Support Desk
          </h3>

          <p className="text-xs text-gray-500 mb-4 leading-relaxed">
            Report a fault or claim a warranty direct swaps. We will create a trackable record immediately inside the Staff CRM.
          </p>

          {ticketSuccessMsg && (
            <div className="bg-green-50 text-green-800 p-4 rounded-xl text-xs flex items-start gap-2 border border-green-150 mb-4 animate-bounce">
              <CheckCircle className="w-5 h-5 text-green-600 shrink-0" />
              <span className="font-semibold leading-relaxed">{ticketSuccessMsg}</span>
            </div>
          )}

          <form onSubmit={handleComplaintSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block text-gray-650 font-semibold mb-1">
                Your Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="e.g., Blessing Okpako"
                className="w-full text-xs p-3 border border-gray-200 rounded-lg bg-gray-50/50 outline-none focus:border-brand-orange"
              />
            </div>

            <div>
              <label className="block text-gray-650 font-semibold mb-1">
                WhatsApp Phone <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                required
                placeholder="e.g., 080XXXXXXXX"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                className="w-full text-xs p-3 border border-gray-200 rounded-lg bg-gray-50/50 outline-none focus:border-brand-orange"
              />
            </div>

            <div>
              <label className="block text-gray-655 font-semibold mb-1">
                Select Issue Type <span className="text-red-500">*</span>
              </label>
              <select
                value={issueType}
                onChange={(e: any) => setIssueType(e.target.value)}
                className="w-full text-xs p-3 border border-gray-200 rounded-lg bg-gray-50 outline-none focus:border-brand-orange cursor-pointer"
              >
                <option value="General Enquiry">General Enquiry</option>
                <option value="Report a Fault">Report a Fault</option>
                <option value="Warranty Claim">Warranty Claim</option>
                <option value="Track Order">Track Order</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-655 font-semibold mb-1">
                Describe the fault or details
              </label>
              <textarea
                rows={3}
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="e.g., The TV screen remains dark after lighting flashes..."
                className="w-full text-xs p-3 border border-gray-200 rounded-lg bg-gray-50/50 outline-none focus:border-brand-orange resize-none"
              />
            </div>

            {/* Expected Response times displays (MANDATED by Page 11: "Expected response times displayed - manages customer expectations") */}
            <div className="bg-[#EEF3FF] border border-[#cbd5e1] p-3.5 rounded-xl text-[10px] text-brand-blue font-semibold flex items-start gap-1.5 leading-relaxed">
              <ShieldCheck className="w-5 h-5 shrink-0 text-brand-blue mt-0.5" />
              <div>
                <p className="text-gray-800">Support Center SLAs</p>
                <p className="text-[9px] text-gray-500 mt-0.5">Average Response Time: 45 Mins • Technical visits within 24 Hours in Warri Core.</p>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-brand-orange hover:bg-orange-600 text-white rounded-xl text-xs font-bold tracking-wider uppercase shadow cursor-pointer transition-colors"
            >
              Raise Diagnostics ticket
            </button>
          </form>
        </div>

      </div>

    </div>
  );
}
