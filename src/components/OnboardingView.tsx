import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, SkipForward, CheckCircle, ShieldCheck } from 'lucide-react';
import { Lead } from '../types';

interface OnboardingViewProps {
  onComplete: (lead: Lead | null, targetView: string) => void;
  onSkip: () => void;
}

export default function OnboardingView({ onComplete, onSkip }: OnboardingViewProps) {
  const [step, setStep] = useState<1 | 2>(1);
  const [selectedPurpose, setSelectedPurpose] = useState<
    'Browse Products' | 'Get a Quote' | 'Book a Service' | 'Learn About Us' | 'Visit the Shadow School' | null
  >(null);

  // Form Fields
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const purposes = [
    {
      id: 'Browse Products' as const,
      title: 'Browse Electronics & Models',
      desc: 'Check live pricing for TVs, sound systems, & AVR equipment.',
      targetView: 'showroom',
    },
    {
      id: 'Get a Quote' as const,
      title: 'Get a Technical Setup Quote',
      desc: 'Price high-fidelity media boards & customized home layouts.',
      targetView: 'contact',
    },
    {
      id: 'Book a Service' as const,
      title: 'Book a Repair or Wall Mounting',
      desc: 'Professional sound-staging & diagnosis services in Warri.',
      targetView: 'services',
    },
    {
      id: 'Learn About Us' as const,
      title: 'Learn About Our Company Team',
      desc: 'Meet our specialists and read about our local showroom branch.',
      targetView: 'about',
    },
    {
      id: 'Visit the Shadow School' as const,
      title: 'Visit Shadow Training School',
      desc: 'Apply for 12-week repairs & CRM entrepreneurship programs.',
      targetView: 'shadow_school',
    },
  ];

  const handleSelectPurpose = (purpose: typeof purposes[number]) => {
    setSelectedPurpose(purpose.id);
    setStep(2);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    // Create a new Lead record
    const newLead: Lead = {
      id: `lead-${Date.now()}`,
      name,
      phone,
      email,
      purpose: selectedPurpose || 'Browse Products',
      message: message || `User interested in ${selectedPurpose}`,
      date: new Date().toISOString().split('T')[0],
      status: 'New',
    };

    // Determine target view mapping
    const targetPurposeObj = purposes.find((p) => p.id === selectedPurpose);
    const targetView = targetPurposeObj ? targetPurposeObj.targetView : 'home';

    onComplete(newLead, targetView);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-black via-gray-900 to-brand-black flex flex-col justify-center px-4 py-12 z-40 relative">
      <div className="max-w-xl mx-auto w-full bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 flex flex-col relative">
        
        {/* Skip button header */}
        <div className="px-6 pt-6 flex justify-between items-center bg-gray-50/50 border-b border-gray-100 pb-4">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-brand-orange rounded-full animate-ping" />
            <span className="text-xs font-mono tracking-wider text-brand-orange uppercase font-bold">
              Ugomenz Reception
            </span>
          </div>
          <button
            id="onboard-skip-btn"
            onClick={onSkip}
            className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-brand-orange transition-all font-medium py-1 px-3 bg-white border border-gray-200 rounded-full hover:shadow-sm"
          >
            <span>Skip to Catalog</span>
            <SkipForward className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="p-8 flex-1">
          {/* Progress Indicator */}
          <div className="flex items-center gap-2 mb-8">
            <div className={`h-2 rounded-full flex-1 transition-all duration-300 ${step >= 1 ? 'bg-brand-orange' : 'bg-gray-100'}`} />
            <div className={`h-2 rounded-full flex-1 transition-all duration-300 ${step >= 2 ? 'bg-brand-orange' : 'bg-gray-100'}`} />
            <span className="text-xs font-mono text-gray-400 ml-2">Step {step} of 2</span>
          </div>

          {step === 1 ? (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
            >
              <h2 className="text-2xl md:text-3xl font-display font-bold tracking-tight text-brand-black">
                Welcome to Ugomenz.
              </h2>
              <p className="text-sm text-gray-500 mt-2">
                What brings you to our platform today? Choose an option below to route to your direct helper.
              </p>

              <div className="mt-6 space-y-3">
                {purposes.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => handleSelectPurpose(p)}
                    className="w-full text-left p-4 rounded-xl border border-gray-200 hover:border-brand-orange hover:bg-brand-orange-tint/40 transition-all flex items-center justify-between group cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-orange/20"
                  >
                    <div className="flex-1 pr-4">
                      <h3 className="font-semibold text-sm text-brand-black group-hover:text-brand-orange transition-colors">
                        {p.title}
                      </h3>
                      <p className="text-xs text-gray-500 mt-1">{p.desc}</p>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-gray-50 group-hover:bg-brand-orange text-gray-400 group-hover:text-white flex items-center justify-center transition-all shadow-sm">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
            >
              <button
                onClick={() => setStep(1)}
                className="text-xs text-brand-blue hover:underline mb-4 font-medium flex items-center gap-1"
              >
                ← Back to main options
              </button>
              <h2 className="text-2xl font-display font-bold tracking-tight text-brand-black">
                Confirm Your Interest
              </h2>
              <p className="text-xs text-gray-500 mt-1">
                Your selected path: <span className="text-brand-orange font-bold text-sm block mt-1">✨ {selectedPurpose}</span>
              </p>

              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">
                    Your Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g., Godstime Efeturi"
                    className="w-full text-sm p-3 border border-gray-200 rounded-lg focus:border-brand-orange focus:ring-1 focus:ring-brand-orange outline-none bg-gray-50/50"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g., 0803XXXXXXX"
                      className="w-full text-sm p-3 border border-gray-200 rounded-lg focus:border-brand-orange focus:ring-1 focus:ring-brand-orange outline-none bg-gray-50/50"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g., customer@yahoo.com"
                      className="w-full text-sm p-3 border border-gray-200 rounded-lg focus:border-brand-orange focus:ring-1 focus:ring-brand-orange outline-none bg-gray-50/50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">
                    What are you looking for specifically? (Optional)
                  </label>
                  <textarea
                    rows={2}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Describe specific products size or setup style..."
                    className="w-full text-sm p-3 border border-gray-200 rounded-lg focus:border-brand-orange focus:ring-1 focus:ring-brand-orange outline-none bg-gray-50/50 resize-none"
                  />
                </div>

                <button
                  id="onboard-submit-btn"
                  type="submit"
                  className="w-full mt-4 py-3 bg-brand-orange hover:bg-orange-600 text-white rounded-lg text-sm font-semibold tracking-wide transition-colors shadow-md shadow-brand-orange/20 cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Complete & Continue</span>
                  <CheckCircle className="w-4 h-4" />
                </button>
              </form>
            </motion.div>
          )}
        </div>

        {/* Footer trust seals */}
        <div className="bg-brand-blue-tint/60 px-8 py-3 flex items-center justify-center gap-4 text-center mt-auto border-t border-brand-blue/10">
          <div className="flex items-center gap-1.5 text-xs text-brand-blue font-medium">
            <ShieldCheck className="w-4 h-4" />
            <span>Authorized Brand Dealer & Service Station</span>
          </div>
        </div>
      </div>
    </div>
  );
}
