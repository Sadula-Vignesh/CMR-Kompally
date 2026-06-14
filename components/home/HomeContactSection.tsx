'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Phone, Mail, MapPin, CheckCircle, AlertCircle, Loader2, Send, Compass } from 'lucide-react';
import { SCHOOL_ADDRESS, SCHOOL_PHONE, SCHOOL_EMAIL, SCHOOL_TIMINGS } from '@/lib/constants';
import Button from '@/components/ui/Button';

interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  grade: string;
  message: string;
}

export default function HomeContactSection() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactFormData>();

  const onSubmit = async (data: ContactFormData) => {
    setStatus('loading');
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        setStatus('success');
        reset();
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  return (
    <section className="bg-white py-24 md:py-32 relative overflow-hidden">
      {/* Ambient background blur */}
      <div className="absolute right-0 bottom-0 w-[450px] h-[450px] bg-brand-orange/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Form Column */}
          <div className="lg:col-span-7 bg-brand-cream/35 border border-brand-gold/15 p-8 md:p-10 rounded-3xl shadow-xl shadow-slate-100/30">
            <span className="text-brand-orange text-xs md:text-sm font-bold tracking-widest uppercase block mb-1.5">
              Admissions 2026-27
            </span>
            <h3 className="font-display font-black text-2xl md:text-3.5xl text-brand-navy mb-2 tracking-tight">
              Start Your Journey
            </h3>
            <p className="text-slate-500 text-sm mb-8 font-body">
              Submit your enquiry below and our admissions counsellor will reach out within 24 hours.
            </p>

            {status === 'success' && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-800 rounded-2xl flex items-start gap-3 text-sm">
                <CheckCircle className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                <span className="font-body font-medium">Thank you! Your message has been sent successfully. We will get back to you soon.</span>
              </div>
            )}

            {status === 'error' && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-800 rounded-2xl flex items-start gap-3 text-sm">
                <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                <span className="font-body font-medium">Oops! Something went wrong while sending your message. Please try again or call us.</span>
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="firstName" className="block text-[10px] font-bold text-slate-400 mb-1.5 uppercase tracking-wider">First Name *</label>
                  <input
                    id="firstName"
                    type="text"
                    {...register('firstName', { required: 'First name is required' })}
                    className="w-full bg-white border border-slate-200 focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/15 rounded-xl px-4 py-3 text-sm focus:outline-none transition-all duration-300 font-body"
                    placeholder="Enter first name"
                  />
                  {errors.firstName && <p className="text-red-500 text-xs mt-1 font-body">{errors.firstName.message}</p>}
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-[10px] font-bold text-slate-400 mb-1.5 uppercase tracking-wider">Last Name *</label>
                  <input
                    id="lastName"
                    type="text"
                    {...register('lastName', { required: 'Last name is required' })}
                    className="w-full bg-white border border-slate-200 focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/15 rounded-xl px-4 py-3 text-sm focus:outline-none transition-all duration-300 font-body"
                    placeholder="Enter last name"
                  />
                  {errors.lastName && <p className="text-red-500 text-xs mt-1 font-body">{errors.lastName.message}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="email" className="block text-[10px] font-bold text-slate-400 mb-1.5 uppercase tracking-wider">Email Address *</label>
                  <input
                    id="email"
                    type="email"
                    {...register('email', { 
                      required: 'Email is required',
                      pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' }
                    })}
                    className="w-full bg-white border border-slate-200 focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/15 rounded-xl px-4 py-3 text-sm focus:outline-none transition-all duration-300 font-body"
                    placeholder="name@example.com"
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1 font-body">{errors.email.message}</p>}
                </div>
                <div>
                  <label htmlFor="phone" className="block text-[10px] font-bold text-slate-400 mb-1.5 uppercase tracking-wider">Phone Number *</label>
                  <input
                    id="phone"
                    type="tel"
                    {...register('phone', { 
                      required: 'Phone number is required',
                      pattern: { value: /^[6-9]\d{9}$/, message: 'Please enter a valid 10-digit Indian phone number' }
                    })}
                    className="w-full bg-white border border-slate-200 focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/15 rounded-xl px-4 py-3 text-sm focus:outline-none transition-all duration-300 font-body"
                    placeholder="10-digit mobile number"
                  />
                  {errors.phone && <p className="text-red-500 text-xs mt-1 font-body">{errors.phone.message}</p>}
                </div>
              </div>

              <div>
                <label htmlFor="grade" className="block text-[10px] font-bold text-slate-400 mb-1.5 uppercase tracking-wider">Grade Applying For *</label>
                <div className="relative">
                  <select
                    id="grade"
                    {...register('grade', { required: 'Please select a grade' })}
                    className="w-full bg-white border border-slate-200 focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/15 rounded-xl px-4 py-3 text-sm focus:outline-none transition-all duration-300 font-body appearance-none cursor-pointer"
                  >
                    <option value="">Select Class</option>
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
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
                {errors.grade && <p className="text-red-500 text-xs mt-1 font-body">{errors.grade.message}</p>}
              </div>

              <div>
                <label htmlFor="message" className="block text-[10px] font-bold text-slate-400 mb-1.5 uppercase tracking-wider">Message / Details</label>
                <textarea
                  id="message"
                  rows={4}
                  {...register('message')}
                  className="w-full bg-white border border-slate-200 focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/15 rounded-xl px-4 py-3 text-sm focus:outline-none transition-all duration-300 font-body resize-none"
                  placeholder="Specify any questions about CBSE curriculum,Space Lab courses, transport boundaries, etc."
                />
              </div>

              <Button
                type="submit"
                variant="orange"
                disabled={status === 'loading'}
                className="w-full justify-center text-sm py-3.5 flex gap-2 items-center"
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Sending Enquiry...
                  </>
                ) : (
                  <>
                    Send Enquiry
                    <Send className="w-4.5 h-4.5" />
                  </>
                )}
              </Button>
            </form>
          </div>

          {/* Info & Map Column */}
          <div className="lg:col-span-5 flex flex-col space-y-8">
            <div className="space-y-6">
              <span className="text-brand-orange text-xs md:text-sm font-bold tracking-widest uppercase block">
                Find Us
              </span>
              <h3 className="font-display font-black text-2xl md:text-3.5xl text-brand-navy tracking-tight">
                Visit Campus
              </h3>
              
              <div className="space-y-5">
                <div className="flex gap-4 items-start">
                  <div className="p-3 bg-brand-navy/5 text-brand-navy rounded-2xl mt-0.5 shrink-0">
                    <MapPin className="w-5.5 h-5.5 stroke-[1.5]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-brand-navy text-sm font-display uppercase tracking-wide">Campus Address</h4>
                    <p className="text-slate-500 text-xs leading-relaxed mt-1 font-body">{SCHOOL_ADDRESS}</p>
                  </div>
                </div>
                
                <div className="flex gap-4 items-center">
                  <div className="p-3 bg-brand-navy/5 text-brand-navy rounded-2xl shrink-0">
                    <Phone className="w-5 h-5 stroke-[1.5]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-brand-navy text-sm font-display uppercase tracking-wide">Phone Number</h4>
                    <p className="text-slate-500 text-xs mt-1 font-body">{SCHOOL_PHONE}</p>
                  </div>
                </div>

                <div className="flex gap-4 items-center">
                  <div className="p-3 bg-brand-navy/5 text-brand-navy rounded-2xl shrink-0">
                    <Mail className="w-5 h-5 stroke-[1.5]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-brand-navy text-sm font-display uppercase tracking-wide">Email Address</h4>
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
