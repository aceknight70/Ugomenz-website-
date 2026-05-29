import React from 'react';
import { Award, Compass, Heart, MapPin, Users, Building, ShieldCheck, Mail, PhoneCall } from 'lucide-react';

interface AboutViewProps {
  onNavigate: (view: string) => void;
}

export default function AboutView({ onNavigate }: AboutViewProps) {
  const stats = [
    { value: '11+', label: 'Years in Business' },
    { value: '4,500+', label: 'Customers Served' },
    { value: '6+', label: 'Premium Brands Stocked' },
    { value: '100% ', label: 'Customer Satisfaction Guarantee' },
  ];

  const team = [
    {
      name: 'Fortune Akioya',
      role: 'Lead Youth Innovator (FATAP-CT)',
      bio: 'Professional electronics designer, repair technologist, and digital ecosystem supervisor. Fortune coordinates student admissions for Shadow Training Academy and acts as lead system integrator.',
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&q=80'
    },
    {
      name: 'Dr. Efemena Akioya',
      role: 'Programme Director & Board Chair',
      bio: 'Directs curriculum strategy, community outreach coordination, and international brand dealership alignments. Dr. Efemena leads executive workshops and regional development in Delta State.',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-12">
      
      {/* Brand Story block */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center bg-white rounded-3xl p-6 md:p-10 border border-gray-200 shadow-sm">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-brand-orange" />
            <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-brand-orange">
              AUTHORIZED SPECIALIST HISTORY
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-display font-bold text-brand-black tracking-tight leading-tight">
            We are Ugomenz Electronics.
          </h2>
          <p className="text-xs text-gray-500 leading-relaxed">
            Founded with a single core mission: to bridge the gap between premium global audiovisual hardware and robust technical services in South-South Nigeria. Ugomenz Electronics Sales & Service Center (Warri, Nigeria) is more than just a retail store. We are a living, breathing digital and physical service ecosystem.
          </p>
          <p className="text-xs text-gray-500 leading-relaxed">
            Under the leadership of our Lead Youth Innovator Fortune Akioya and Board Chairperson Dr. Efemena Akioya, we serve thousands of households, corporate boardrooms, lounge centers, and religious sanctuaries across Delta State. We provide direct retail representation for pioneer manufacturers (Samsung, LG, Sony, Hisense, JVC, and Skyworth), and we secure each system using custom-rated voltage stabilization, preventing the grid fluctuations from shortening your screens lifespan.
          </p>
          <div className="pt-4 flex flex-wrap gap-4">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-brand-blue">
              <ShieldCheck className="w-4 h-4 text-brand-blue" />
              <span>Full 12-Month In-Store Warranty Support</span>
            </div>
          </div>
        </div>
        
        {/* Physical Showroom Exterior Photo Mock */}
        <div className="relative rounded-2xl overflow-hidden aspect-video shadow border border-gray-250">
          <img
            src="https://images.unsplash.com/photo-1624996379697-f01d168b1a52?auto=format&fit=crop&w=800&q=80"
            alt="Ugomenz Showroom Floor"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 flex items-end p-4">
            <p className="text-white text-xs font-mono font-medium flex items-center gap-1">
              <Building className="w-3.5 h-3.5 text-brand-orange" />
              <span>Main Showroom: Airport Road Layout, Warri, Delta State</span>
            </p>
          </div>
        </div>
      </div>

      {/* Visual Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((st, idx) => (
          <div key={idx} className="bg-gradient-to-b from-brand-black to-gray-900 border border-gray-800 rounded-2xl p-5 text-center text-white">
            <span className="block text-2xl md:text-3xl font-mono font-bold text-brand-orange mb-1">
              {st.value}
            </span>
            <span className="block text-[10px] text-gray-400 font-medium uppercase tracking-wider font-sans">
              {st.label}
            </span>
          </div>
        ))}
      </div>

      {/* Leadership Team section */}
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="text-xl font-display font-bold text-brand-black">Our Leadership Team</h3>
          <p className="text-xs text-gray-400 mt-1">Specialists matching electronics diagnostics with academic youth development plans.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {team.map((mem) => (
            <div key={mem.name} className="bg-white p-5 rounded-2xl border border-gray-250 flex flex-col sm:flex-row gap-4 items-start sm:items-center shadow-xs">
              <img src={mem.image} alt={mem.name} className="w-20 h-20 rounded-full object-cover border-2 border-brand-orange/20 shrink-0 mx-auto" />
              <div>
                <h4 className="font-bold text-sm text-brand-black">{mem.name}</h4>
                <p className="text-[10px] font-mono font-bold text-brand-orange tracking-wide mt-0.5">{mem.role}</p>
                <p className="text-xs text-gray-500 mt-2 leading-relaxed">{mem.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Embedded Map Section & Trust indicators */}
      <div className="bg-white border border-gray-250 p-6 md:p-8 rounded-3xl grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Contact credentials */}
        <div className="lg:col-span-1 space-y-4">
          <h3 className="font-display font-bold text-lg text-brand-black">Showroom Headquarters</h3>
          <p className="text-xs text-gray-500 leading-relaxed">
            Hop in to test high-contrast OLED panels, check Dolby Atmos acoustic configurations, or enroll into Shadow Training courses.
          </p>
          <div className="space-y-2.5 font-mono text-[11px] text-gray-655">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-brand-orange shrink-0" />
              <span>Airport Road, Effurun-Warri, Delta State</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-[#1A56D6] shrink-0" />
              <span>efeiconic@gmail.com</span>
            </div>
            <div className="flex items-center gap-2">
              <PhoneCall className="w-4 h-4 text-green-600 shrink-0" />
              <span>08052000034 | 0811xxxxxxx</span>
            </div>
          </div>
          <div className="pt-4">
            <button
              onClick={() => onNavigate('contact')}
              className="px-5 py-2.5 bg-brand-orange hover:bg-orange-655 text-white rounded-lg text-xs font-semibold cursor-pointer shadow-sm shadow-brand-orange/25"
            >
              Get Directions & Route
            </button>
          </div>
        </div>

        {/* Mock Graphic Google Map with Coordinates */}
        <div className="lg:col-span-2 h-64 bg-slate-100 rounded-2xl border border-gray-200 p-4 relative overflow-hidden flex flex-col justify-end">
          <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
          
          {/* Custom drawing representing road layouts & pin */}
          <div className="absolute inset-x-20 top-12 bottom-12 border-4 border-dashed border-gray-200/80 rounded-full flex items-center justify-center pointer-events-none">
            <div className="w-12 h-12 bg-brand-orange/10 rounded-full flex items-center justify-center animate-ping" />
          </div>

          <div className="relative z-10 p-4 bg-white/95 rounded-xl shadow border border-gray-150 inline-block max-w-xs mb-2">
            <span className="flex items-center gap-2 text-[10px] uppercase font-bold text-brand-orange font-mono">
              <MapPin className="w-3.5 h-3.5" />
              <span>UGOMENZ OUTLET SITE</span>
            </span>
            <p className="text-xs text-gray-500 font-semibold tracking-tight mt-1">Airport Road Layout, (Opposite Mall Base), Warri</p>
            <p className="text-[9px] font-mono text-gray-400 mt-1">Lat: 5.5142° N | Long: 5.7241° E</p>
          </div>
        </div>

      </div>

    </div>
  );
}
