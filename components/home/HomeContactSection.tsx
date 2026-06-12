'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Phone, Mail, MapPin, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { SCHOOL_ADDRESS, SCHOOL_PHONE, SCHOOL_EMAIL } from '@/lib/constants';
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
    <section className="bg-white py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Form Column */}
          <div className="lg:col-span-7 bg-brand-cream/40 border border-brand-gold/15 p-8 rounded-2xl shadow-sm">
            <h3 className="font-display font-bold text-2xl text-brand-navy mb-2">
              Admission & General Enquiry
            </h3>
            <p className="text-gray-600 text-sm mb-6 font-body">
              Fill out the form below and our admissions counsellor will reach out to you within 24 hours.
            </p>

            {status === 'success' && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-800 rounded-lg flex items-center gap-2 text-sm">
                <CheckCircle className="w-5 h-5 text-green-600 shrink-0" />
                <span>Thank you! Your message has been sent successfully. We will get back to you soon.</span>
              </div>
            )}

            {status === 'error' && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-800 rounded-lg flex items-center gap-2 text-sm">
                <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
                <span>Oops! Something went wrong while sending your message. Please try again or call us.</span>
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-xs font-semibold text-brand-navy mb-1.5 uppercase">First Name *</label>
                  <input
                    id="firstName"
                    type="text"
                    {...register('firstName', { required: 'First name is required' })}
                    className="w-full bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-brand-navy"
                    placeholder="John"
                  />
                  {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName.message}</p>}
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-xs font-semibold text-brand-navy mb-1.5 uppercase">Last Name *</label>
                  <input
                    id="lastName"
                    type="text"
                    {...register('lastName', { required: 'Last name is required' })}
                    className="w-full bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-brand-navy"
                    placeholder="Doe"
                  />
                  {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName.message}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="email" className="block text-xs font-semibold text-brand-navy mb-1.5 uppercase">Email Address *</label>
                  <input
                    id="email"
                    type="email"
                    {...register('email', { 
                      required: 'Email is required',
                      pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' }
                    })}
                    className="w-full bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-brand-navy"
                    placeholder="john.doe@example.com"
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                </div>
                <div>
                  <label htmlFor="phone" className="block text-xs font-semibold text-brand-navy mb-1.5 uppercase">Phone Number *</label>
                  <input
                    id="phone"
                    type="tel"
                    {...register('phone', { 
                      required: 'Phone number is required',
                      pattern: { value: /^[6-9]\d{9}$/, message: 'Please enter a valid 10-digit Indian phone number' }
                    })}
                    className="w-full bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-brand-navy"
                    placeholder="9876543210"
                  />
                  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                </div>
              </div>

              <div>
                <label htmlFor="grade" className="block text-xs font-semibold text-brand-navy mb-1.5 uppercase">Grade Applying For *</label>
                <select
                  id="grade"
                  {...register('grade', { required: 'Please select a grade' })}
                  className="w-full bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-brand-navy appearance-none cursor-pointer"
                >
                  <option value="">Select Grade</option>
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
                {errors.grade && <p className="text-red-500 text-xs mt-1">{errors.grade.message}</p>}
              </div>

              <div>
                <label htmlFor="message" className="block text-xs font-semibold text-brand-navy mb-1.5 uppercase">Message / Questions</label>
                <textarea
                  id="message"
                  rows={4}
                  {...register('message')}
                  className="w-full bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-brand-navy"
                  placeholder="Tell us about your child or ask questions about curriculum, transport, etc."
                />
              </div>

              <Button
                type="submit"
                variant="orange"
                disabled={status === 'loading'}
                className="w-full justify-center text-sm py-3 flex gap-2 items-center"
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Sending Message...
                  </>
                ) : (
                  'Send Message'
                )}
              </Button>
            </form>
          </div>

          {/* Info & Map Column */}
          <div className="lg:col-span-5 flex flex-col space-y-6">
            <div>
              <h3 className="font-display font-bold text-2xl text-brand-navy mb-4">
                Visit Campus
              </h3>
              <div className="space-y-4">
                <div className="flex gap-3 items-start">
                  <MapPin className="w-5 h-5 text-brand-orange shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-brand-navy text-sm font-body">School Address</h4>
                    <p className="text-gray-600 text-xs leading-relaxed mt-1 font-body">{SCHOOL_ADDRESS}</p>
                  </div>
                </div>
                
                <div className="flex gap-3 items-center">
                  <Phone className="w-5 h-5 text-brand-orange shrink-0" />
                  <div>
                    <h4 className="font-semibold text-brand-navy text-sm font-body">Phone Number</h4>
                    <p className="text-gray-600 text-xs leading-relaxed font-body">{SCHOOL_PHONE}</p>
                  </div>
                </div>

                <div className="flex gap-3 items-center">
                  <Mail className="w-5 h-5 text-brand-orange shrink-0" />
                  <div>
                    <h4 className="font-semibold text-brand-navy text-sm font-body">Email Address</h4>
                    <p className="text-gray-600 text-xs leading-relaxed font-body">{SCHOOL_EMAIL}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Embedded Google Maps Frame */}
            <div className="relative w-full h-[250px] rounded-xl overflow-hidden shadow-inner border border-gray-100">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3804.8105741673856!2d78.4410183153406!3d17.516568287998634!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb8f3cf42b78df%3A0xe54e6fae1a6135ab!2sCMR%20School%20Kompally!5e0!3m2!1sen!2sin!4v1655000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="CMR School Kompally Location Map"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
