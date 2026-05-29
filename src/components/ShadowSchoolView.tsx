import React, { useState } from 'react';
import { motion } from 'motion/react';
import { BookOpen, GraduationCap, Users, Calendar, ArrowRight, MessageSquareCode, CheckCircle, Sparkles } from 'lucide-react';
import { ShadowCourse } from '../types';

interface ShadowSchoolViewProps {
  courses: ShadowCourse[];
}

export default function ShadowSchoolView({ courses }: ShadowSchoolViewProps) {
  const [selectedCourse, setSelectedCourse] = useState<ShadowCourse | null>(courses[0] || null);
  const [studentName, setStudentName] = useState('');
  const [studentPhone, setStudentPhone] = useState('');
  const [remarks, setRemarks] = useState('');
  const [regSuccess, setRegSuccess] = useState('');

  const handleRegisterInterest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName || !studentPhone || !selectedCourse) return;

    // Build the WhatsApp message structured for ESGMC mentoring channels
    let whatsappMsg = `🔔 *SHADOW TRAINING SCHOOL INTERN REGISTRATION* 🔔\n`;
    whatsappMsg += `------------------------------------\n`;
    whatsappMsg += `*Intern Candidate Details*:\n`;
    whatsappMsg += `• Name: ${studentName}\n`;
    whatsappMsg += `• Phone: ${studentPhone}\n`;
    if (remarks) whatsappMsg += `• Remarks: ${remarks}\n`;
    whatsappMsg += `------------------------------------\n`;
    whatsappMsg += `*Syllabus Course Applied*:\n`;
    whatsappMsg += `⚡ *${selectedCourse.title}*\n`;
    whatsappMsg += `• Duration: ${selectedCourse.duration}\n`;
    whatsappMsg += `• Skill level: ${selectedCourse.level}\n`;
    whatsappMsg += `------------------------------------\n`;
    whatsappMsg += `*Outcome Expected*:\n`;
    whatsappMsg += `🎓 ${selectedCourse.outcome}\n`;
    whatsappMsg += `------------------------------------\n`;
    whatsappMsg += `Authorized by ESGMC. Pls reserve registration logs.`;

    window.open(`https://wa.me/2348052000034?text=${encodeURIComponent(whatsappMsg)}`, '_blank');

    setRegSuccess(`Congratulations ${studentName}! Your Shadow School application for "${selectedCourse.title}" is compiled and forwarded to ESGMC management.`);
    setStudentName('');
    setStudentPhone('');
    setRemarks('');

    setTimeout(() => {
      setRegSuccess('');
    }, 5500);
  };

  const testimonials = [
    {
      student: 'Kelvin Oghenekovwe',
      text: 'Enrolling in the 12-week repairs track at Ugomenz completely transformed my technical abilities. I went from blowing power boards to micro-soldering. Today, I receive contract requests around Effurun!',
      outcome: 'Device Repairs Cohort, 2025 Graduate'
    },
    {
      student: 'Faithful Onome',
      text: 'Thanks to Dr. Efemena Akioyas mentoring on store structures and price algorithms in fluctuating economies, I built my own regional tech supply storefront in G.R.A, Warri!',
      outcome: 'Retail Entrepreneurship Cohort, 2025 Graduate'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-12">
      
      {/* Title */}
      <div className="bg-gradient-to-r from-[#1A56D6] to-[#0d348a] rounded-3xl p-8 md:p-12 text-white relative overflow-hidden shadow-lg">
        {/* Abstract circles */}
        <div className="absolute right-0 top-0 bottom-0 w-2/3 opacity-5 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent pointer-events-none" />
        <div className="max-w-2xl relative z-10">
          <div className="flex items-center gap-2 mb-4 bg-white/10 border border-white/20 text-white px-3 py-1 rounded-full w-max text-xs font-semibold">
            <GraduationCap className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>SCHOOL SHADOW ACADEMY</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-display font-medium tracking-tight leading-tight">
            The Shadow School Portal.
          </h1>
          <p className="text-xs md:text-sm text-gray-200 mt-4 leading-relaxed">
            The Shadow School transforms Ugomenz from a retailer into an education hub. Attacting students, technicians, and aspiring entrepreneurs. Delivered in direct partnership with ESGMC (Efeiconic Shadow Global Mentoring Company Ltd) and led by Lead Youth Innovator Fortune Akioya. Build independent self-reliance.
          </p>
        </div>
      </div>

      {/* Main interactive grid splitting courses and enrollment */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Left Column: Syllabus Card Options */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="font-display font-bold text-lg text-brand-black mb-1">
            Browse 5 Academic Tracks
          </h3>
          <p className="text-xs text-gray-500 pb-2">Select a course to inspect its comprehensive syllabus modules and student expected outcomes.</p>

          <div className="space-y-4">
            {courses.map((course) => {
              const isSelected = selectedCourse?.id === course.id;

              return (
                <div
                  key={course.id}
                  onClick={() => setSelectedCourse(course)}
                  className={`p-5 rounded-2xl border text-left cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-white border-brand-orange shadow-md ring-2 ring-brand-orange/5'
                      : 'bg-white hover:bg-gray-50 border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 mb-3">
                    <h4 className="font-bold text-sm text-brand-black flex items-center gap-2 group-hover:text-brand-orange transition-colors">
                      <span className="w-2 h-2 rounded-full bg-brand-orange" />
                      <span>{course.title}</span>
                    </h4>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-brand-orange bg-brand-orange-tint px-2.5 py-0.5 rounded-full border border-brand-orange/15 w-max">
                      {course.duration} ({course.level})
                    </span>
                  </div>

                  <p className="text-[11px] text-gray-500 leading-relaxed italic">
                    For demographics: {course.forWho}
                  </p>

                  {/* Syllabus Modules details if active */}
                  {isSelected && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="mt-4 pt-4 border-t border-gray-150 space-y-3 overflow-hidden text-xs"
                    >
                      <div>
                        <span className="block text-[10px] uppercase font-mono font-bold text-gray-400 mb-1.5">
                          Syllabus Core Modules
                        </span>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {course.modules.map((m, mIdx) => (
                            <li key={mIdx} className="p-2 border border-blue-50 bg-blue-50/20 text-brand-black text-[11px] rounded-lg">
                              • {m}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="pt-2">
                        <span className="block text-[10px] uppercase font-mono font-bold text-gray-500">
                          Intern Certification Expectation
                        </span>
                        <p className="text-xs font-semibold text-brand-orange mt-1">
                          🎓 {course.outcome}
                        </p>
                      </div>

                      <div className="flex items-center gap-4 text-[10px] font-mono font-bold text-gray-400 pt-3 border-t">
                        <span>Intake: {course.intakeDates.join(', ')}</span>
                        <span>Slots available: {course.availableSlots} Cohorts Only</span>
                      </div>
                    </motion.div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Registrar application card */}
        <div className="bg-white border border-gray-250 p-6 rounded-3xl shadow-sm relative sticky top-20">
          <h3 className="font-display font-medium text-base text-brand-black mb-3 pb-2 border-b border-gray-150">
            Academy Admission Form
          </h3>

          {regSuccess && (
            <div className="bg-green-50 text-green-800 p-4 rounded-xl text-xs flex items-start gap-2 border border-green-100 mb-4 animate-bounce">
              <CheckCircle className="w-5 h-5 text-green-600 shrink-0" />
              <span className="font-medium leading-relaxed">{regSuccess}</span>
            </div>
          )}

          <form onSubmit={handleRegisterInterest} className="space-y-4 text-xs">
            {selectedCourse ? (
              <div className="bg-brand-orange-tint/40 p-3 rounded-lg border border-brand-orange/15 mb-2">
                <span className="text-[10px] uppercase text-brand-orange font-bold font-mono">
                  Syllabus Track selected
                </span>
                <p className="font-bold text-gray-800 mt-0.5">{selectedCourse.title}</p>
              </div>
            ) : (
              <p className="text-[11px] text-gray-500 mb-2">Select a course track on the left menu first to lock your interest.</p>
            )}

            <div>
              <label className="block text-gray-650 font-semibold mb-1">
                Candidate Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                placeholder="e.g., Kelvin Oghenekovwe"
                className="w-full text-xs p-3 border border-gray-200 rounded-lg bg-gray-50/50 outline-none focus:border-brand-orange"
              />
            </div>

            <div>
              <label className="block text-gray-650 font-semibold mb-1">
                WhatsApp Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                required
                value={studentPhone}
                onChange={(e) => setStudentPhone(e.target.value)}
                placeholder="e.g., 081XXXXXXXX"
                className="w-full text-xs p-3 border border-gray-200 rounded-lg bg-gray-50/50 outline-none focus:border-brand-orange"
              />
            </div>

            <div>
              <label className="block text-gray-650 font-semibold mb-1">
                Why are you applying for this track? (Optional)
              </label>
              <textarea
                rows={2}
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                placeholder="Provide details about your repair background..."
                className="w-full text-xs p-3 border border-gray-200 rounded-lg bg-gray-50/50 outline-none focus:border-brand-orange resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={!selectedCourse}
              className="w-full py-3 bg-brand-orange hover:bg-orange-655 text-white rounded-xl text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-1.5 cursor-pointer shadow shadow-brand-orange/20"
            >
              <GraduationCap className="w-4 h-4" />
              <span>Apply & WhatsApp Direct</span>
            </button>
          </form>
        </div>

      </div>

      {/* Alumni Testimonials section */}
      <div className="space-y-6 pt-6">
        <h3 className="font-display font-medium text-lg text-brand-black text-center">Intern Alumni Success Outcomes</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {testimonials.map((test, idx) => (
            <div key={idx} className="bg-white p-5 rounded-2xl border border-gray-220 shadow-xs relative">
              <span className="text-3xl font-serif text-brand-orange/20 absolute top-2 left-3">“</span>
              <p className="text-xs text-gray-550 leading-relaxed pt-2">
                {test.text}
              </p>
              <div className="mt-4 pt-3 border-t border-gray-100 font-mono">
                <p className="text-xs font-bold text-gray-800">{test.student}</p>
                <p className="text-[10px] text-brand-orange font-semibold">{test.outcome}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ESGMC Footer Branding Requirement: "Powered by ESGMC branding in the footer of the page" */}
      <div className="bg-gray-100 border border-gray-200 p-4 rounded-xl flex items-center justify-center gap-2 text-center text-[10px] text-gray-400 font-mono uppercase tracking-wider">
        <GraduationCap className="w-4 h-4 text-gray-400" />
        <span>Syllabus Powered & Certified by ESGMC — Efeiconic Shadow Global Mentoring Company Ltd</span>
      </div>

    </div>
  );
}
