import React, { useState } from 'react';
import { MapPin, Phone, EnvelopeSimple } from '@phosphor-icons/react/dist/ssr';

const STORAGE_KEY = 'kapit_inquiries';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Build new inquiry record
    const newInquiry = {
      id: `inq_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      ...formData,
      status: 'new',
      createdAt: new Date().toISOString(),
    };

    // Persist to localStorage
    try {
      const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      localStorage.setItem(STORAGE_KEY, JSON.stringify([newInquiry, ...existing]));
    } catch (err) {
      console.error('Failed to save inquiry:', err);
    }

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', phone: '', message: '' });
    }, 4000);
  };

  return (
    <section id="contact" className="px-6 sm:px-12 lg:px-24 py-20 lg:py-32 bg-background">
      <div className="container mx-auto">
        <div className="mb-16">
          <p className="text-sm uppercase tracking-[0.2em] text-slate-500 font-semibold mb-2">Get in touch</p>
          <h2 className="text-4xl sm:text-5xl tracking-tight font-bold text-slate-900 mb-4 font-outfit">Contact Us</h2>
          <p className="text-lg leading-relaxed text-slate-600 max-w-2xl">
            Have a question or want to work together? Reach out to us and we'll get back to you as soon as possible.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          
          <div className="flex flex-col gap-10">
            <div className="flex gap-6">
              <div className="shrink-0 w-12 h-12 bg-blue-900 text-white rounded-sm flex items-center justify-center">
                <MapPin size={24} weight="regular" />
              </div>
              <div className="pt-1">
                <h4 className="text-lg font-bold text-slate-900 mb-1 font-outfit">Registered Office</h4>
                <p className="text-slate-600 leading-relaxed font-medium">No 710, 2nd Rd, 4th Main, BEML Layout,<br/>Rajarajeshwari Nagar, Bangalore South,<br/>Karnataka, India 560098</p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="shrink-0 w-12 h-12 bg-blue-900 text-white rounded-sm flex items-center justify-center">
                <EnvelopeSimple size={24} weight="regular" />
              </div>
              <div className="pt-1">
                <h4 className="text-lg font-bold text-slate-900 mb-1 font-outfit">Email</h4>
                <a href="mailto:kapitindiapvtltd@gmail.com" className="text-blue-900 hover:text-blue-700 font-medium transition-colors">kapitindiapvtltd@gmail.com</a>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="shrink-0 w-12 h-12 bg-blue-900 text-white rounded-sm flex items-center justify-center">
                <Phone size={24} weight="regular" />
              </div>
              <div className="pt-1">
                <h4 className="text-lg font-bold text-slate-900 mb-1 font-outfit">Phone</h4>
                <p className="text-slate-600 leading-relaxed font-medium">+91 6364680456<br/>+91 8861422587</p>
              </div>
            </div>

            <div className="mt-8 p-6 bg-slate-50 border border-slate-200 rounded-sm">
              <h4 className="text-sm uppercase tracking-[0.2em] text-slate-500 font-bold mb-2">Corporate Identification Number</h4>
              <p className="text-lg font-outfit font-semibold text-slate-900">U28290KA2026PTC215872</p>
            </div>
          </div>

          <div className="bg-white p-8 sm:p-12 border border-slate-200 shadow-sm rounded-sm">
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center border border-green-200 mb-4">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/></svg>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2 font-outfit">Inquiry Sent</h3>
                <p className="text-slate-600">Thank you for reaching out. We will connect with you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-slate-900 mb-2">Full Name <span className="text-red-500">*</span></label>
                  <input required type="text" id="name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-3 border border-slate-200 rounded-sm outline-none focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 transition-colors" placeholder="Your full name" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-slate-900 mb-2">Email Address <span className="text-red-500">*</span></label>
                  <input required type="email" id="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full px-4 py-3 border border-slate-200 rounded-sm outline-none focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 transition-colors" placeholder="you@example.com" />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-slate-900 mb-2">Phone Number</label>
                  <input type="tel" id="phone" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full px-4 py-3 border border-slate-200 rounded-sm outline-none focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 transition-colors" placeholder="+91 XXXXXXXXXX" />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-slate-900 mb-2">Your Message <span className="text-red-500">*</span></label>
                  <textarea required id="message" rows="4" value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} className="w-full px-4 py-3 border border-slate-200 rounded-sm outline-none focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 transition-colors resize-none" placeholder="How can we help you?"></textarea>
                </div>
                <button type="submit" className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold py-4 rounded-sm transition-colors mt-2">
                  Send Message
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;
