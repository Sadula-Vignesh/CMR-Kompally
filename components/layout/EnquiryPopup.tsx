'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { X, User, GraduationCap, Phone, MessageSquare, Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const GRADES = [
  { value: 'Nursery', label: 'Nursery' },
  { value: 'PP1', label: 'PP1 (LKG)' },
  { value: 'PP2', label: 'PP2 (UKG)' },
  { value: 'Grade I', label: 'Grade I' },
  { value: 'Grade II', label: 'Grade II' },
  { value: 'Grade III', label: 'Grade III' },
  { value: 'Grade IV', label: 'Grade IV' },
  { value: 'Grade V', label: 'Grade V' },
  { value: 'Grade VI', label: 'Grade VI' },
  { value: 'Grade VII', label: 'Grade VII' },
  { value: 'Grade VIII', label: 'Grade VIII' },
];

export default function EnquiryPopup() {
  const pathname = usePathname();
  
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  // Form State
  const [studentName, setStudentName] = useState('');
  const [grade, setGrade] = useState('');
  const [parentName, setParentName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  // Form Validation
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  // Reset popup state and set a 5-second timer on page navigation
  useEffect(() => {
    setIsOpen(false);
    setStatus('idle');
    setErrorMsg('');
    setValidationErrors({});
    
    // Clear form fields on navigation so it's a fresh form
    setStudentName('');
    setGrade('');
    setParentName('');
    setPhone('');
    setMessage('');

    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 5000); // 5 seconds delay

    return () => clearTimeout(timer);
  }, [pathname]);

  const validate = () => {
    const errors: Record<string, string> = {};
    if (!studentName.trim()) {
      errors.studentName = 'Student name is required';
    }
    if (!grade) {
      errors.grade = 'Please select a class';
    }
    if (!parentName.trim()) {
      errors.parentName = 'Parent name is required';
    }
    if (!phone.trim()) {
      errors.phone = 'Phone number is required';
    } else if (!/^[6-9]\d{9}$/.test(phone.trim())) {
      errors.phone = 'Enter a valid 10-digit phone number';
    }
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('loading');
    setErrorMsg('');

    // Split studentName into firstName and lastName for the API compatibility
    const nameParts = studentName.trim().split(/\s+/);
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || '';

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName,
          lastName,
          email: 'popup-enquiry@cmrschoolkompally.com', // fallback/placeholder since popup has no email field
          phone: phone.trim(),
          grade,
          parentName: parentName.trim(),
          message: message.trim(),
        }),
      });

      const data = await response.json();
      if (response.ok && data.success) {
        setStatus('success');
      } else {
        setStatus('error');
        setErrorMsg(data.error || 'Failed to submit enquiry. Please try again.');
      }
    } catch (err) {
      console.error('Popup Enquiry Error:', err);
      setStatus('error');
      setErrorMsg('A network error occurred. Please check your connection and try again.');
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Semi-transparent Backdrop with Blur */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
          className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        />

        {/* Modal Card */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: 'spring', duration: 0.5 }}
          className="bg-white rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl relative z-10 border border-slate-100 flex flex-col"
        >
          {/* Header */}
          <div className="px-6 pt-8 pb-4 md:px-8 md:pt-10 flex flex-col relative">
            <span className="text-brand-orange text-xs md:text-sm font-bold tracking-widest uppercase mb-1">
              ADMISSIONS 2026-27
            </span>
            <h3 className="text-brand-navy font-display font-extrabold text-2xl md:text-3xl tracking-tight leading-tight">
              Register Your Enquiry
            </h3>
            <p className="text-gray-500 text-xs md:text-sm font-body mt-2 leading-relaxed max-w-md">
              Pre-Primary to Secondary — our team will reach out within 24 hours.
            </p>

            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
              aria-label="Close Enquiry Form"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form Content / Success State */}
          <div className="px-6 pb-6 md:px-8 md:pb-8 flex-grow">
            {status === 'success' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 flex flex-col items-center justify-center text-center space-y-4"
              >
                <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center border border-green-200 shadow-sm">
                  <CheckCircle className="w-10 h-10 text-green-600 animate-bounce" />
                </div>
                <h4 className="font-display font-bold text-xl md:text-2xl text-brand-navy">
                  Enquiry Submitted Successfully!
                </h4>
                <p className="text-gray-500 font-body text-sm max-w-md leading-relaxed">
                  Thank you for your interest in CMR School Kompally. Our admissions officer will get in touch with you shortly on <strong className="text-brand-navy font-semibold">{phone}</strong>.
                </p>
                <button
                  onClick={() => setIsOpen(false)}
                  className="mt-6 px-6 py-2.5 bg-brand-navy hover:bg-brand-navyLight text-white rounded-xl font-bold text-sm tracking-wide transition-all cursor-pointer shadow-md hover:shadow-lg"
                >
                  Close Window
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {status === 'error' && (
                  <div className="p-4 bg-red-50 border border-red-200 text-red-800 rounded-xl flex items-start gap-2.5 text-xs md:text-sm">
                    <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                    <span className="font-body font-medium">{errorMsg}</span>
                  </div>
                )}

                {/* Form Fields Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Student Name */}
                  <div>
                    <label className="flex items-center gap-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                      <User className="w-3.5 h-3.5" />
                      Student Name
                    </label>
                    <input
                      type="text"
                      value={studentName}
                      onChange={(e) => setStudentName(e.target.value)}
                      placeholder="Enter full name"
                      className={`w-full bg-slate-50/50 border ${
                        validationErrors.studentName ? 'border-red-400 focus:border-red-500' : 'border-slate-200/80 focus:border-brand-navy'
                      } rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:bg-white transition-all`}
                    />
                    {validationErrors.studentName && (
                      <p className="text-red-500 text-[11px] font-medium mt-1 font-body">{validationErrors.studentName}</p>
                    )}
                  </div>

                  {/* Class Applying For */}
                  <div>
                    <label className="flex items-center gap-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                      <GraduationCap className="w-3.5 h-3.5" />
                      Class Applying For
                    </label>
                    <div className="relative">
                      <select
                        value={grade}
                        onChange={(e) => setGrade(e.target.value)}
                        className={`w-full bg-slate-50/50 border ${
                          validationErrors.grade ? 'border-red-400 focus:border-red-500' : 'border-slate-200/80 focus:border-brand-navy'
                        } rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:bg-white transition-all appearance-none cursor-pointer`}
                      >
                        <option value="">Select Class</option>
                        {GRADES.map((g) => (
                          <option key={g.value} value={g.value}>
                            {g.label}
                          </option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                        </svg>
                      </div>
                    </div>
                    {validationErrors.grade && (
                      <p className="text-red-500 text-[11px] font-medium mt-1 font-body">{validationErrors.grade}</p>
                    )}
                  </div>

                  {/* Parent Name */}
                  <div>
                    <label className="flex items-center gap-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                      <User className="w-3.5 h-3.5" />
                      Parent Name
                    </label>
                    <input
                      type="text"
                      value={parentName}
                      onChange={(e) => setParentName(e.target.value)}
                      placeholder="Enter parent/guardian name"
                      className={`w-full bg-slate-50/50 border ${
                        validationErrors.parentName ? 'border-red-400 focus:border-red-500' : 'border-slate-200/80 focus:border-brand-navy'
                      } rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:bg-white transition-all`}
                    />
                    {validationErrors.parentName && (
                      <p className="text-red-500 text-[11px] font-medium mt-1 font-body">{validationErrors.parentName}</p>
                    )}
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label className="flex items-center gap-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                      <Phone className="w-3.5 h-3.5" />
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="10-digit mobile number"
                      maxLength={10}
                      className={`w-full bg-slate-50/50 border ${
                        validationErrors.phone ? 'border-red-400 focus:border-red-500' : 'border-slate-200/80 focus:border-brand-navy'
                      } rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:bg-white transition-all`}
                    />
                    {validationErrors.phone && (
                      <p className="text-red-500 text-[11px] font-medium mt-1 font-body">{validationErrors.phone}</p>
                    )}
                  </div>
                </div>

                {/* Message Field */}
                <div>
                  <label className="flex items-center gap-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                    <MessageSquare className="w-3.5 h-3.5" />
                    Message (Optional)
                  </label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Any specific questions or requirements?"
                    rows={4}
                    className="w-full bg-slate-50/50 border border-slate-200/80 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-brand-navy focus:bg-white transition-all resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full bg-brand-navy hover:bg-brand-navyLight disabled:bg-slate-400 text-white font-bold py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 uppercase tracking-widest transition-all cursor-pointer shadow-lg shadow-brand-navy/10 text-sm md:text-base mt-2"
                >
                  {status === 'loading' ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Submitting Enquiry...
                    </>
                  ) : (
                    <>
                      Register Enquiry
                      <Send className="w-4.5 h-4.5" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
