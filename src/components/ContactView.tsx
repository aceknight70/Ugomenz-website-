import React, { useState } from 'react';
import { Mail, PhoneCall, MessageCircle, MapPin, Compass, CheckCircle, Info } from 'lucide-react';

export default function ContactView() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [msgText, setMsgText] = useState('');
  const [success, setSuccess] = useState('');

  const branches = [
    { name: 'Effurun-Warri Showroom HQ', address: 'Airport Road, Opp Delta Mall Layout, Effurun, Delta State', tag: 'Primary Hub' },
    { name: 'Warri G.R.A Collection Spot', address: 'GRA Phase 2 Layout (Behind Golf Club), Warri, Delta State', tag: 'Store Pickups' },
  ];

  const handleManualEnquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !msgText) return;

    // Compile nice WhatsApp message
    let txt = `🔔 *UGOMENZ ENQUIRY FORM DISPATCH* 🔔\n`;
    txt += `------------------------------------\n`;
    txt += `• Name: ${name}\n`;
    txt += `• Phone: ${phone}\n`;
    if (email) txt += `• Email: ${email}\n`;
    txt += `------------------------------------\n`;
    txt += `*Message Details*:\n`;
    txt += `"${msgText}"\n`;
    txt += `------------------------------------\n`;
    txt += `Sourced directly from Ugomenz web portal contact page.`;

    window.open(`https://wa.me/2348052000034?text=${encodeURIComponent(txt)}`, '_blank');
    setSuccess(`Enquiry Forwarded! Thanks "${name}", your detail bundle has been dispatched to Ugomenz desks via WhatsApp.`);
    
    setName('');
    setPhone('');
    setEmail('');
    setMsgText('');

    setTimeout(() => {
      setSuccess('');
    }, 4500);
  };

  const handleWhatsAppTrigger = (type: 'General' | 'Manager') => {
    const textMsg = type === 'General'
      ? 'Hello Ugomenz Electronics! I would like to seek some structural details on TV installations and AVR pricing options, thank you.'
      : 'Hello Ugomenz! This is a priority direct enquiry to the store Manager channels. Please review my proposal details.';
    window.open(`https://wa.me/2348052000034?text=${encodeURIComponent(textMsg)}`, '_blank');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-12 animate-in fade-in duration-200">
      
      {/* Page Title */}
      <div className="mb-4">
        <h2 className="text-2xl md:text-3xl font-display font-bold text-brand-black tracking-tight">
          Get In Touch / Contact Showroom
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Have an inquiry about stock models, repair schedules, or Shadow Training admissions? Reach out to our physical team.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        
        {/* Left columns: Address, Branch lists and clickable fast dials */}
        <div className="space-y-6">
          <h3 className="font-display font-medium text-lg text-brand-black pb-2 border-b">
            Physical Branch Locations
          </h3>

          <div className="space-y-4">
            {branches.map((br, index) => (
              <div key={index} className="p-5 border bg-white rounded-2xl flex gap-3 shadow-xs hover:border-brand-orange transition-all relative group">
                <span className="absolute top-4 right-4 bg-brand-blue-tint text-brand-blue font-bold font-mono text-[9.5spx] text-[9px] px-2.5 py-0.5 rounded-full uppercase border border-brand-blue/15">
                  {br.tag}
                </span>
                <MapPin className="w-5 h-5 text-brand-orange shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                <div>
                  <h4 className="font-bold text-xs text-brand-black">{br.name}</h4>
                  <p className="text-xs text-gray-500 mt-1 leading-relaxed max-w-sm">{br.address}</p>
                </div>
              </div>
            ))}
          </div>

          <h3 className="font-display font-medium text-lg text-brand-black pb-2 border-b pt-4">
            Direct Technical Inquiry Buttons
          </h3>
          <p className="text-xs text-gray-550 leading-relaxed">
            Clicking a button opens a direct communication line to the showroom desks, keeping you connected in under 2 seconds.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* General Inquiry */}
            <button
              onClick={() => handleWhatsAppTrigger('General')}
              className="p-4 bg-white hover:bg-green-50 border border-gray-200 hover:border-green-300 rounded-2xl text-left flex items-center justify-between group cursor-pointer transition-all"
            >
              <div>
                <span className="text-[9px] font-bold font-mono text-green-600 block uppercase">Technical desks</span>
                <span className="text-xs font-bold text-brand-black mt-0.5 block">General Enquiries</span>
              </div>
              <div className="w-8 h-8 rounded-full bg-green-50 text-green-500 flex items-center justify-center group-hover:bg-green-600 group-hover:text-white transition-colors">
                <MessageCircle className="w-4 h-4" />
              </div>
            </button>

            {/* Manager Direct Channels */}
            <button
              onClick={() => handleWhatsAppTrigger('Manager')}
              className="p-4 bg-white hover:bg-orange-50 border border-gray-200 hover:border-orange-300 rounded-2xl text-left flex items-center justify-between group cursor-pointer transition-all"
            >
              <div>
                <span className="text-[9px] font-bold font-mono text-brand-orange block uppercase">Fortune Akioya</span>
                <span className="text-xs font-bold text-brand-black mt-0.5 block">Manager Direct</span>
              </div>
              <div className="w-8 h-8 rounded-full bg-orange-50 text-brand-orange flex items-center justify-center group-hover:bg-brand-orange group-hover:text-white transition-colors">
                <MessageCircle className="w-4 h-4" />
              </div>
            </button>

          </div>

          {/* Phone emergency click to call numbers */}
          <div className="p-4 bg-gray-50 border rounded-2xl flex items-center gap-3">
            <PhoneCall className="w-5 h-5 text-brand-black shrink-0" />
            <div className="font-mono text-xs">
              <p className="font-bold text-gray-800">Phone Touch-To-Call Services</p>
              <div className="flex gap-4 mt-1 text-[11px] text-[#1A56D6] font-semibold">
                <a href="tel:+2348052000034" className="hover:underline">08052000034 (HQ)</a>
              </div>
            </div>
          </div>

        </div>

        {/* Right column: Form */}
        <div className="bg-white border p-6 md:p-8 rounded-3xl shadow-sm relative">
          <h3 className="font-display font-medium text-base text-brand-black mb-1 pb-2 border-b">
            Showroom Message Box
          </h3>
          <p className="text-xs text-gray-500 pb-4">Provide details about what you require. Our diagnostics team will contact you swiftly.</p>

          {success && (
            <div className="bg-green-50 text-green-800 p-4 rounded-xl text-xs flex items-start gap-2 border border-green-150 mb-4 animate-bounce">
              <CheckCircle className="w-5 h-5 text-green-600 shrink-0" />
              <span className="font-semibold leading-relaxed">{success}</span>
            </div>
          )}

          <form onSubmit={handleManualEnquirySubmit} className="space-y-4 text-xs font-sans">
            <div>
              <label className="block text-gray-550 font-semibold mb-1">
                Your Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., Tari Opubo"
                className="w-full text-xs p-3 border rounded-lg bg-gray-50/50 outline-none focus:border-brand-orange"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-550 font-semibold mb-1">
                  WhatsApp Contact Phone <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g., 081XXXXXXXX"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full text-xs p-3 border rounded-lg bg-gray-50/50 outline-none focus:border-brand-orange"
                />
              </div>
              <div>
                <label className="block text-gray-550 font-semibold mb-1">
                  Email Address (Optional)
                </label>
                <input
                  type="email"
                  placeholder="e.g., candidate@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full text-xs p-3 border rounded-lg bg-gray-50/50 outline-none focus:border-brand-orange"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-550 font-semibold mb-1">
                What are you looking for specifically? <span className="text-red-500">*</span>
              </label>
              <textarea
                rows={3}
                required
                placeholder="e.g., Request for quotation for LG NanoCell TV 65-inch..."
                value={msgText}
                onChange={(e) => setMsgText(e.target.value)}
                className="w-full text-xs p-3 border rounded-lg bg-gray-50/50 outline-none focus:border-brand-orange resize-none"
              />
            </div>

            {/* Location coverage guidelines */}
            <div className="p-3.5 bg-brand-blue-tint/50 border border-brand-blue/10 rounded-xl text-[10px] text-brand-blue leading-relaxed font-mono font-medium">
              ✦ WEEKEND BUSINESS HOURS: Sat 9:00am - 6:00pm. General public holidays matching Delta State schedules honored accordingly.
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-brand-orange hover:bg-orange-605 text-white font-bold rounded-xl text-xs uppercase cursor-pointer"
            >
              Dispatches Inquiry Message
            </button>
          </form>
        </div>

      </div>

    </div>
  );
}
