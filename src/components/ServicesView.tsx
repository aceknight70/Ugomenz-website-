import React, { useState } from 'react';
import { Hammer, Truck, ShieldAlert, Award, FileSpreadsheet, KeySquare, Calendar, Compass, Clock, CheckCircle } from 'lucide-react';
import { ServiceBooking } from '../types';

interface ServicesViewProps {
  onAddBooking: (booking: ServiceBooking) => void;
}

export default function ServicesView({ onAddBooking }: ServicesViewProps) {
  const [selectedService, setSelectedService] = useState<string>('Product Installation');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [bookingDate, setBookingDate] = useState('');
  const [location, setLocation] = useState('');
  const [details, setDetails] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const services = [
    {
      id: 'Product Installation',
      title: 'Theater Sound staging & TV Wall Mountings',
      desc: 'Let our specialists properly mount display boards and stage high-contrast soundbars or speaker frameworks using exact acoustic metrics.',
      icon: Hammer,
      badge: 'Highly Requested'
    },
    {
      id: 'Repairs & Maintenance',
      title: 'Certified Screen & Sound Repairs',
      desc: 'Is your TV screen flashing black, or is your home soundbar panel dropping connection? We diagnose board components in our Warri technical lab.',
      icon: ShieldAlert,
      badge: 'Lab-Backed'
    },
    {
      id: 'Home Delivery',
      title: 'Power Surge Stabilizer Integration',
      desc: 'We delivery heavy duty AVR voltage stabilizers straight to your doorstep and integrate them securely with your flat screens.',
      icon: Truck,
      badge: 'Safety First'
    },
    {
      id: 'Warranty Support',
      title: 'Direct Brand Warranty Swap',
      desc: 'We are certified by Samsung, Sony, LG, and Hisense to host local Warri-based on-site swaps under official manufacture durations.',
      icon: Award,
      badge: 'Authorized Service'
    }
  ];

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone || !bookingDate || !location) return;

    const newBooking: ServiceBooking = {
      id: `srv-${Date.now()}`,
      serviceName: selectedService,
      date: bookingDate,
      customerName,
      customerPhone,
      location,
      details: details || `Inquiry for ${selectedService}`,
      status: 'Pending'
    };

    onAddBooking(newBooking);
    setSuccessMsg(`Booking Submitted! Confirmation for "${selectedService}" on ${bookingDate} logged. A customer rep will call you within 2 hours.`);
    
    // Clear Form Fields
    setCustomerName('');
    setCustomerPhone('');
    setBookingDate('');
    setLocation('');
    setDetails('');

    setTimeout(() => {
      setSuccessMsg('');
    }, 5000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-12">
      
      {/* Title */}
      <div className="mb-8">
        <h2 className="text-2xl md:text-3xl font-display font-bold text-brand-black tracking-tight">
          Technical Services & Repair Bookings
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Professional audiovisual wall mountings, acoustic positioning, surge stabilizer diagnostics, and official brand warranty servicing in Warri.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Left column: Services Offered lists */}
        <div className="lg:col-span-2 space-y-4">
          {services.map((srv) => {
            const IconComponent = srv.icon;

            return (
              <div
                key={srv.id}
                className="bg-white rounded-2xl border border-gray-200 p-5 flex gap-4 hover:border-brand-orange transition-all items-start relative group shadow-sm"
              >
                <div className="p-3.5 bg-brand-orange-tint text-brand-orange rounded-xl shrink-0">
                  <IconComponent className="w-5 h-5" />
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] uppercase font-bold text-[#1A56D6] tracking-wider font-mono bg-brand-blue-tint border border-brand-blue/10 px-2.5 py-0.5 rounded-full">
                      {srv.badge}
                    </span>
                    <button
                      onClick={() => {
                        setSelectedService(srv.id);
                        document.getElementById('booking-form-anchor')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="text-xs font-mono font-bold text-brand-orange hover:underline uppercase"
                    >
                      Book Event
                    </button>
                  </div>
                  <h4 className="font-bold text-sm text-brand-black">{srv.title}</h4>
                  <p className="text-xs text-gray-500 leading-relaxed max-w-xl">{srv.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right column: Form booking */}
        <div id="booking-form-anchor" className="bg-white border border-gray-250 p-6 rounded-3xl shadow-sm relative">
          <h3 className="font-display font-bold text-base text-brand-black mb-4 pb-2 border-b border-gray-150">
            Book Our Technicians
          </h3>

          {successMsg && (
            <div className="bg-green-50 text-green-800 p-4 rounded-xl text-xs flex items-start gap-2 border border-green-150 mb-4 animate-bounce">
              <CheckCircle className="w-6 h-6 text-green-600 shrink-0" />
              <span className="font-semibold leading-relaxed">{successMsg}</span>
            </div>
          )}

          <form onSubmit={handleBookingSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-550 mb-1">
                Select Technical Service
              </label>
              <select
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
                className="w-full text-xs p-3 border border-gray-200 rounded-lg bg-gray-50 outline-none focus:border-brand-orange cursor-pointer"
              >
                {services.map(s => (
                  <option key={s.id} value={s.id}>{s.id}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-550 mb-1">
                Your Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="e.g., Victor Temisan"
                className="w-full text-xs p-3 border border-gray-200 rounded-lg bg-gray-50/50 outline-none focus:border-brand-orange"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-550 mb-1">
                WhatsApp Phone <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                required
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                placeholder="e.g., 080XXXXXXXX"
                className="w-full text-xs p-3 border border-gray-200 rounded-lg bg-gray-50/50 outline-none focus:border-brand-orange"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-550 mb-1">
                  Preferred Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  required
                  value={bookingDate}
                  onChange={(e) => setBookingDate(e.target.value)}
                  className="w-full text-xs p-2.5 border border-gray-200 rounded-lg bg-gray-50/50 outline-none focus:border-brand-orange font-mono cursor-pointer"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-550 mb-1">
                  Setup Location <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g., GRA Phase 2, Warri"
                  className="w-full text-xs p-3 border border-gray-200 rounded-lg bg-gray-50/50 outline-none focus:border-brand-orange"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-550 mb-1">
                Brief details of diagnostic or screen size (Optional)
              </label>
              <textarea
                rows={2}
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                placeholder="Describe screen specifications or model issues..."
                className="w-full text-xs p-3 border border-gray-200 rounded-lg bg-gray-50/50 outline-none focus:border-brand-orange resize-none"
              />
            </div>

            {/* Delivery coverage information text */}
            <div className="flex gap-1.5 p-3.5 bg-brand-blue-tint/60 border border-brand-blue/10 rounded-xl text-[10px] text-brand-blue leading-relaxed font-medium">
              <Compass className="w-5.5 h-5.5 shrink-0 text-brand-blue mt-0.5" />
              <span>Diagnostic team covers Airport Road, GRA, Effurun, Delta Mall axes, Uvwie and environs.</span>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-brand-orange hover:bg-orange-600 text-white rounded-xl text-xs font-bold tracking-wider uppercase shadow-md shadow-brand-orange/20 cursor-pointer transition-colors"
            >
              Book Service Technician
            </button>
          </form>
        </div>

      </div>

    </div>
  );
}
