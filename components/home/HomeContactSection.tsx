'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Mail, MapPin, CheckCircle, AlertCircle, Loader2, Send } from 'lucide-react';
import { SCHOOL_ADDRESS, SCHOOL_PHONE, SCHOOL_EMAIL } from '@/lib/constants';
import Button from '@/components/ui/Button';

interface ContactFormData {
  name: string;
  parentName: string;
  email: string;
  phone: string;
  grade: string;
  message: string;
  agreeTerms: boolean;
}

export default function HomeContactSection() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [isGradeFocused, setIsGradeFocused] = useState(false);
  const [isMessageFocused, setIsMessageFocused] = useState(false);

  const { 
    register, 
    handleSubmit, 
    reset, 
    watch, 
    getFieldState, 
    formState 
  } = useForm<ContactFormData>({ 
    mode: 'onChange',
    defaultValues: {
      name: '',
      parentName: '',
      email: '',
      phone: '',
      grade: '',
      message: '',
      agreeTerms: false
    }
  });

  const { errors, isValid, isSubmitting } = formState;

  // Watch fields for floating labels
  const watchedGrade = watch('grade');
  const watchedMessage = watch('message');

  const isGradeActive = watchedGrade || isGradeFocused;
  const isMessageActive = watchedMessage || isMessageFocused;

  const onSubmit = async (data: ContactFormData) => {
    setStatus('loading');
    try {
      const nameParts = data.name.trim().split(/\s+/);
      const firstName = nameParts[0];
      const lastName = nameParts.slice(1).join(" ");

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName,
          lastName,
          email: data.email,
          phone: data.phone,
          grade: data.grade,
          message: data.message,
          parentName: data.parentName
        }),
      });

      if (response.ok) {
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  const handleResetForm = () => {
    setStatus('idle');
    reset();
  };

  const getFieldStatusIcon = (fieldName: keyof ContactFormData) => {
    const state = getFieldState(fieldName, formState);
    if (!state.isTouched && !state.isDirty) return null;
    
    if (errors[fieldName]) {
      return (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute right-4 top-[18px] z-10 flex items-center justify-center"
        >
          <AlertCircle className="w-5 h-5 text-red-500 pointer-events-none" />
        </motion.div>
      );
    }
    
    if (state.isDirty && !errors[fieldName]) {
      return (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute right-4 top-[18px] z-10 flex items-center justify-center"
        >
          <CheckCircle className="w-5 h-5 text-green-500 pointer-events-none" />
        </motion.div>
      );
    }
    
    return null;
  };

  // Stagger variants for parent container
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  // Slide-up variants for items
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" as const }
    }
  };

  return (
    <section className="bg-white py-24 md:py-32 relative overflow-hidden">
      {/* Ambient background blur */}
      <div className="absolute right-0 bottom-0 w-[450px] h-[450px] bg-[#F4821F]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-[95%] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Form Column */}
          <div className="lg:col-span-7 bg-[#FDF8EF]/35 border border-[#E8A020]/15 p-8 md:p-10 rounded-3xl shadow-xl shadow-slate-100/30">
            <span className="text-[#F4821F] text-xs md:text-sm font-bold tracking-widest uppercase block mb-1.5">
              Admissions Enquiry
            </span>
            <h3 className="font-display font-black text-2xl md:text-3.5xl text-[#1A2B5F] mb-2 tracking-tight">
              Start Your Journey
            </h3>
            <p className="text-slate-500 text-sm mb-8 font-body">
              Submit your enquiry below and our admissions counsellor will reach out within 24 hours.
            </p>

            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 100, damping: 15 }}
                  className="text-center py-10 px-4 flex flex-col items-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 180, delay: 0.2 }}
                    className="w-20 h-20 bg-green-50 border border-green-200 rounded-full flex items-center justify-center text-green-600 mb-6"
                  >
                    <CheckCircle className="w-12 h-12" />
                  </motion.div>
                  <h4 className="font-display font-black text-2xl text-[#1A2B5F] mb-3">
                    Thank You!
                  </h4>
                  <p className="font-poppins text-slate-600 text-sm md:text-base max-w-md mb-8 leading-relaxed">
                    Your enquiry has been received successfully. Our admissions counselor will contact you **within 24 hours** to guide you through the details.
                  </p>
                  <Button
                    onClick={handleResetForm}
                    variant="orange"
                    className="px-8 py-3 rounded-full text-sm font-bold transition-all duration-300 hover:scale-105"
                  >
                    Submit Another Enquiry
                  </Button>
                </motion.div>
              ) : (
                <motion.div
                  key="form-container"
                  initial="hidden"
                  animate="visible"
                  variants={containerVariants}
                >
                  {status === 'error' && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mb-6 p-4 bg-red-50 border border-red-200 text-red-800 rounded-2xl flex items-start gap-3 text-sm"
                    >
                      <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                      <div className="font-body font-medium flex-grow">
                        Oops! Something went wrong while sending your enquiry. Please verify your fields and try again.
                      </div>
                    </motion.div>
                  )}

                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    
                    {/* Name Fields */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <motion.div variants={itemVariants} className="relative">
                        <input
                          id="name"
                          type="text"
                          placeholder=" "
                          {...register('name', { 
                            required: 'Student name is required',
                            minLength: { value: 3, message: 'Name must be at least 3 characters' }
                          })}
                          className="peer w-full bg-white border border-slate-200 focus:border-[#F4821F] focus:ring-4 focus:ring-[#F4821F]/10 rounded-2xl pt-6 pb-2 pl-4 pr-12 text-sm focus:outline-none transition-all duration-300 font-body placeholder-transparent"
                        />
                        <label
                          htmlFor="name"
                          className="absolute left-4 top-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider transition-all duration-300 pointer-events-none peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:font-normal peer-placeholder-shown:normal-case peer-focus:top-1.5 peer-focus:text-[10px] peer-focus:font-bold peer-focus:text-[#F4821F] peer-focus:uppercase"
                        >
                          Student Name *
                        </label>
                        {getFieldStatusIcon('name')}
                        <AnimatePresence>
                          {errors.name && (
                            <motion.p
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: -10 }}
                              className="text-red-500 text-xs mt-1 font-body ml-1 flex items-center gap-1"
                            >
                              {errors.name.message}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </motion.div>

                      <motion.div variants={itemVariants} className="relative">
                        <input
                          id="parentName"
                          type="text"
                          placeholder=" "
                          {...register('parentName')}
                          className="peer w-full bg-white border border-slate-200 focus:border-[#F4821F] focus:ring-4 focus:ring-[#F4821F]/10 rounded-2xl pt-6 pb-2 pl-4 pr-12 text-sm focus:outline-none transition-all duration-300 font-body placeholder-transparent"
                        />
                        <label
                          htmlFor="parentName"
                          className="absolute left-4 top-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider transition-all duration-300 pointer-events-none peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:font-normal peer-placeholder-shown:normal-case peer-focus:top-1.5 peer-focus:text-[10px] peer-focus:font-bold peer-focus:text-[#F4821F] peer-focus:uppercase"
                        >
                          Parent/Guardian Name
                        </label>
                        {getFieldStatusIcon('parentName')}
                      </motion.div>
                    </div>

                    {/* Email & Phone */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <motion.div variants={itemVariants} className="relative">
                        <input
                          id="email"
                          type="email"
                          placeholder=" "
                          {...register('email', { 
                            required: 'Email address is required',
                            pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' }
                          })}
                          className="peer w-full bg-white border border-slate-200 focus:border-[#F4821F] focus:ring-4 focus:ring-[#F4821F]/10 rounded-2xl pt-6 pb-2 pl-4 pr-12 text-sm focus:outline-none transition-all duration-300 font-body placeholder-transparent"
                        />
                        <label
                          htmlFor="email"
                          className="absolute left-4 top-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider transition-all duration-300 pointer-events-none peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:font-normal peer-placeholder-shown:normal-case peer-focus:top-1.5 peer-focus:text-[10px] peer-focus:font-bold peer-focus:text-[#F4821F] peer-focus:uppercase"
                        >
                          Email Address *
                        </label>
                        {getFieldStatusIcon('email')}
                        <AnimatePresence>
                          {errors.email && (
                            <motion.p
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: -10 }}
                              className="text-red-500 text-xs mt-1 font-body ml-1 flex items-center gap-1"
                            >
                              {errors.email.message}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </motion.div>

                      <motion.div variants={itemVariants} className="relative">
                        <input
                          id="phone"
                          type="tel"
                          placeholder=" "
                          {...register('phone', { 
                            required: 'Phone number is required',
                            pattern: { value: /^[6-9]\d{9}$/, message: 'Please enter a valid 10-digit Indian number' }
                          })}
                          className="peer w-full bg-white border border-slate-200 focus:border-[#F4821F] focus:ring-4 focus:ring-[#F4821F]/10 rounded-2xl pt-6 pb-2 pl-4 pr-12 text-sm focus:outline-none transition-all duration-300 font-body placeholder-transparent"
                        />
                        <label
                          htmlFor="phone"
                          className="absolute left-4 top-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider transition-all duration-300 pointer-events-none peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:font-normal peer-placeholder-shown:normal-case peer-focus:top-1.5 peer-focus:text-[10px] peer-focus:font-bold peer-focus:text-[#F4821F] peer-focus:uppercase"
                        >
                          Phone Number *
                        </label>
                        {getFieldStatusIcon('phone')}
                        <AnimatePresence>
                          {errors.phone && (
                            <motion.p
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: -10 }}
                              className="text-red-500 text-xs mt-1 font-body ml-1 flex items-center gap-1"
                            >
                              {errors.phone.message}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    </div>

                    {/* Grade applying for */}
                    <motion.div variants={itemVariants} className="relative">
                      <select
                        id="grade"
                        {...register('grade', { required: 'Please select a grade' })}
                        onFocus={() => setIsGradeFocused(true)}
                        onBlur={() => setIsGradeFocused(false)}
                        className="peer w-full bg-white border border-slate-200 focus:border-[#F4821F] focus:ring-4 focus:ring-[#F4821F]/10 rounded-2xl pt-6 pb-2 pl-4 pr-12 text-sm focus:outline-none transition-all duration-300 font-body appearance-none cursor-pointer"
                      >
                        <option value=""></option>
                        <option value="Nursery">Nursery</option>
                        <option value="PP1">PP1 (LKG)</option>
                        <option value="PP2">PP2 (UKG)</option>
                        <option value="Grade I">Grade I</option>
                        <option value="Grade II">Grade II</option>
                        <option value="Grade III">Grade III</option>
                        <option value="Grade IV">Grade IV</option>
                        <option value="Grade V">Grade V</option>
                        <option value="Grade VI">Grade VI</option>
                        <option value="Grade VII">Grade VII</option>
                        <option value="Grade VIII">Grade VIII</option>
                      </select>
                      <label
                        htmlFor="grade"
                        className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                          isGradeActive
                            ? `top-1.5 text-[10px] font-bold uppercase tracking-wider ${isGradeFocused ? 'text-[#F4821F]' : 'text-slate-400'}`
                            : 'top-4 text-sm font-normal text-slate-400'
                        }`}
                      >
                        Grade Applying For *
                      </label>
                      <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-slate-500">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                        </svg>
                      </div>
                      {errors.grade && (
                        <p className="text-red-500 text-xs mt-1 font-body ml-1">{errors.grade.message}</p>
                      )}
                    </motion.div>

                    {/* Message Area */}
                    <motion.div variants={itemVariants} className="relative">
                      <textarea
                        id="message"
                        rows={4}
                        {...register('message', { required: 'Message is required' })}
                        onFocus={() => setIsMessageFocused(true)}
                        onBlur={() => setIsMessageFocused(false)}
                        className="peer w-full bg-white border border-slate-200 focus:border-[#F4821F] focus:ring-4 focus:ring-[#F4821F]/10 rounded-2xl pt-6 pb-2 pl-4 pr-12 text-sm focus:outline-none transition-all duration-300 font-body resize-none"
                      />
                      <label
                        htmlFor="message"
                        className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                          isMessageActive
                            ? `top-1.5 text-[10px] font-bold uppercase tracking-wider ${isMessageFocused ? 'text-[#F4821F]' : 'text-slate-400'}`
                            : 'top-4 text-sm font-normal text-slate-400'
                        }`}
                      >
                        Message / Enquiry Details *
                      </label>
                      {getFieldStatusIcon('message')}
                      <AnimatePresence>
                        {errors.message && (
                          <motion.p
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            className="text-red-500 text-xs mt-1 font-body ml-1 flex items-center gap-1"
                          >
                            {errors.message.message}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </motion.div>

                    {/* Terms Agreement */}
                    <motion.div variants={itemVariants} className="flex items-start gap-3 select-none">
                      <input
                        id="agreeTerms"
                        type="checkbox"
                        {...register('agreeTerms', { required: true })}
                        className="w-5 h-5 rounded border-slate-300 text-[#F4821F] focus:ring-[#F4821F] cursor-pointer mt-0.5 accent-[#F4821F]"
                      />
                      <label htmlFor="agreeTerms" className="text-slate-500 text-xs leading-relaxed cursor-pointer font-body">
                        I agree to the Terms of Service and consent to CMR School Kompally contacting me regarding my admissions enquiry.
                      </label>
                    </motion.div>

                    {/* Submit CTA */}
                    <motion.div variants={itemVariants}>
                      <motion.button
                        type="submit"
                        disabled={!isValid || isSubmitting || status === 'loading'}
                        whileHover={isValid ? { scale: 1.01, boxShadow: "0 10px 20px rgba(244, 130, 31, 0.15)" } : {}}
                        whileTap={isValid ? { scale: 0.99 } : {}}
                        className={`w-full justify-center text-sm py-4 flex gap-2 items-center font-bold text-white rounded-2xl transition-all duration-300 cursor-pointer shadow-md ${
                          isValid && status !== 'loading'
                            ? 'bg-[#F4821F] hover:bg-[#d66f17]'
                            : 'bg-slate-300 text-slate-500 cursor-not-allowed shadow-none'
                        }`}
                      >
                        {status === 'loading' ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Sending Enquiry...
                          </>
                        ) : status === 'error' ? (
                          <>
                            Retry Submission
                            <Send className="w-4.5 h-4.5" />
                          </>
                        ) : (
                          <>
                            Send Enquiry
                            <Send className="w-4.5 h-4.5" />
                          </>
                        )}
                      </motion.button>
                    </motion.div>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Info & Map Column */}
          <div className="lg:col-span-5 flex flex-col space-y-8">
            <div className="space-y-6">
              <span className="text-[#F4821F] text-xs md:text-sm font-bold tracking-widest uppercase block">
                Find Us
              </span>
              <h3 className="font-display font-black text-2xl md:text-3.5xl text-[#1A2B5F] tracking-tight">
                Visit Campus
              </h3>
              
              <div className="space-y-5">
                <div className="flex gap-4 items-start">
                  <div className="p-3 bg-[#1A2B5F]/5 text-[#1A2B5F] rounded-2xl mt-0.5 shrink-0">
                    <MapPin className="w-5.5 h-5.5 stroke-[1.5]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#1A2B5F] text-sm font-display uppercase tracking-wide">Campus Address</h4>
                    <p className="text-slate-500 text-xs leading-relaxed mt-1 font-body">{SCHOOL_ADDRESS}</p>
                  </div>
                </div>
                
                <div className="flex gap-4 items-center">
                  <div className="p-3 bg-[#1A2B5F]/5 text-[#1A2B5F] rounded-2xl shrink-0">
                    <Phone className="w-5 h-5 stroke-[1.5]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#1A2B5F] text-sm font-display uppercase tracking-wide">Phone Number</h4>
                    <p className="text-slate-500 text-xs mt-1 font-body">{SCHOOL_PHONE}</p>
                  </div>
                </div>

                <div className="flex gap-4 items-center">
                  <div className="p-3 bg-[#1A2B5F]/5 text-[#1A2B5F] rounded-2xl shrink-0">
                    <Mail className="w-5 h-5 stroke-[1.5]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#1A2B5F] text-sm font-display uppercase tracking-wide">Email Address</h4>
                    <p className="text-slate-500 text-xs mt-1 font-body break-all">{SCHOOL_EMAIL}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Embedded Google Maps Frame with rounded border */}
            <div className="relative w-full h-[280px] rounded-3xl overflow-hidden shadow-lg border border-slate-100 group">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3804.8105741673856!2d78.4410183153406!3d17.516568287998634!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb8f3cf42b78df%3A0xe54e6fae1a6135ab!2sCMR%20School%20Kompally!5e0!3m2!1sen!2sin!4v1655000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="CMR School Kompally Location Map"
                className="filter contrast-[1.03] transition-transform duration-500 group-hover:scale-[1.01]"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
