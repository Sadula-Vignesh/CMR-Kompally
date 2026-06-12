'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import Button from '@/components/ui/Button';

interface AdmissionsFormData {
  parentFirstName: string;
  parentLastName: string;
  parentEmail: string;
  parentPhone: string;
  childName: string;
  childDob: string;
  currentSchool: string;
  gradeApplying: string;
  message: string;
}

export default function AdmissionsForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const { register, handleSubmit, reset, formState: { errors } } = useForm<AdmissionsFormData>();

  const onSubmit = async (data: AdmissionsFormData) => {
    setStatus('loading');
    try {
      // Map keys to match API route fields
      const apiPayload = {
        firstName: data.parentFirstName,
        lastName: data.parentLastName,
        email: data.parentEmail,
        phone: data.parentPhone,
        grade: data.gradeApplying,
        message: `Child's Name: ${data.childName}\nDate of Birth: ${data.childDob}\nCurrent School: ${data.currentSchool || 'N/A'}\n\nParent Message:\n${data.message || 'None'}`
      };

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(apiPayload),
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
    <div className="bg-white border border-gray-150 p-8 rounded-2xl shadow-sm">
      <h3 className="font-display font-bold text-2xl text-brand-navy mb-2 text-center">
        Admissions Enquiry Form
      </h3>
      <p className="text-gray-600 text-xs md:text-sm text-center mb-8 font-body">
        Please submit the details below. Our admissions counsel will contact you to schedule an interaction.
      </p>

      {status === 'success' && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-800 rounded-lg flex items-center gap-2 text-sm">
          <CheckCircle className="w-5 h-5 text-green-600 shrink-0" />
          <span>Enquiry submitted successfully! We will contact you shortly.</span>
        </div>
      )}

      {status === 'error' && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-800 rounded-lg flex items-center gap-2 text-sm">
          <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
          <span>Error submitting enquiry. Please try again or contact the admissions desk directly.</span>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        
        {/* Child Information Section */}
        <div>
          <h4 className="font-body font-bold text-sm text-brand-navy border-b border-gray-100 pb-2 mb-4 uppercase tracking-wider">
            1. Child Information
          </h4>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="childName" className="block text-xs font-semibold text-brand-navy mb-1.5">Child's Full Name *</label>
              <input
                id="childName"
                type="text"
                {...register('childName', { required: "Child's name is required" })}
                className="w-full bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-brand-navy"
                placeholder="Baby Doe"
              />
              {errors.childName && <p className="text-red-500 text-xs mt-1">{errors.childName.message}</p>}
            </div>
            
            <div>
              <label htmlFor="childDob" className="block text-xs font-semibold text-brand-navy mb-1.5">Child's Date of Birth *</label>
              <input
                id="childDob"
                type="date"
                {...register('childDob', { required: "Child's DOB is required" })}
                className="w-full bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-brand-navy"
              />
              {errors.childDob && <p className="text-red-500 text-xs mt-1">{errors.childDob.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="gradeApplying" className="block text-xs font-semibold text-brand-navy mb-1.5">Grade Applying For *</label>
              <select
                id="gradeApplying"
                {...register('gradeApplying', { required: 'Please select a grade' })}
                className="w-full bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-brand-navy cursor-pointer"
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
              {errors.gradeApplying && <p className="text-red-500 text-xs mt-1">{errors.gradeApplying.message}</p>}
            </div>

            <div>
              <label htmlFor="currentSchool" className="block text-xs font-semibold text-brand-navy mb-1.5">Current School (if any)</label>
              <input
                id="currentSchool"
                type="text"
                {...register('currentSchool')}
                className="w-full bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-brand-navy"
                placeholder="Name of previous school"
              />
            </div>
          </div>
        </div>

        {/* Parent Information Section */}
        <div>
          <h4 className="font-body font-bold text-sm text-brand-navy border-b border-gray-100 pb-2 mb-4 uppercase tracking-wider">
            2. Parent Information
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="parentFirstName" className="block text-xs font-semibold text-brand-navy mb-1.5">Parent First Name *</label>
              <input
                id="parentFirstName"
                type="text"
                {...register('parentFirstName', { required: 'Parent first name is required' })}
                className="w-full bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-brand-navy"
                placeholder="John"
              />
              {errors.parentFirstName && <p className="text-red-500 text-xs mt-1">{errors.parentFirstName.message}</p>}
            </div>
            <div>
              <label htmlFor="parentLastName" className="block text-xs font-semibold text-brand-navy mb-1.5">Parent Last Name *</label>
              <input
                id="parentLastName"
                type="text"
                {...register('parentLastName', { required: 'Parent last name is required' })}
                className="w-full bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-brand-navy"
                placeholder="Doe"
              />
              {errors.parentLastName && <p className="text-red-500 text-xs mt-1">{errors.parentLastName.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="parentEmail" className="block text-xs font-semibold text-brand-navy mb-1.5">Parent Email *</label>
              <input
                id="parentEmail"
                type="email"
                {...register('parentEmail', { 
                  required: 'Email is required',
                  pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' }
                })}
                className="w-full bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-brand-navy"
                placeholder="parent@example.com"
              />
              {errors.parentEmail && <p className="text-red-500 text-xs mt-1">{errors.parentEmail.message}</p>}
            </div>
            
            <div>
              <label htmlFor="parentPhone" className="block text-xs font-semibold text-brand-navy mb-1.5">Parent Phone Number *</label>
              <input
                id="parentPhone"
                type="tel"
                {...register('parentPhone', { 
                  required: 'Phone number is required',
                  pattern: { value: /^[6-9]\d{9}$/, message: 'Must be 10 digit Indian number' }
                })}
                className="w-full bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-brand-navy"
                placeholder="9876543210"
              />
              {errors.parentPhone && <p className="text-red-500 text-xs mt-1">{errors.parentPhone.message}</p>}
            </div>
          </div>
        </div>

        {/* Message / Remarks */}
        <div>
          <label htmlFor="remarks" className="block text-xs font-semibold text-brand-navy mb-1.5">Additional Queries / Remarks</label>
          <textarea
            id="remarks"
            rows={3}
            {...register('message')}
            className="w-full bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-brand-navy"
            placeholder="Type any questions regarding transport availability, fee structure, etc."
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
              Submitting Admissions Enquiry...
            </>
          ) : (
            'Submit Admissions Enquiry'
          )}
        </Button>
      </form>
    </div>
  );
}
