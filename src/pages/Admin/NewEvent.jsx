import React from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../../components/AdminLayout';
import EventForm from '../../components/Admin/EventForm';

export default function NewEvent() {
  return (
    <AdminLayout>
      <div className="space-y-8 max-w-4xl mx-auto">

        {/* Header */}
        <div className="flex justify-between items-center pb-2 border-b border-slate-100/60">
          <div className="text-left">
            <h1 className="text-2xl font-extrabold text-inst-navy tracking-tight">Yeni Etkinlik Başlat</h1>
            <p className="text-xs text-slate-400 mt-0.5 font-medium">Vakıf adına sisteme yeni bir yardım projesi ekleyin.</p>
          </div>
          <Link
            to="/admin"
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 border border-slate-200/50 rounded-xl text-xs font-bold text-slate-600 transition-all cursor-pointer shadow-sm hover:shadow"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Geri Dön</span>
          </Link>
        </div>

        {/* Form — prop'suz çağrılıyor, EventForm kendi içinde statikleştirilecek */}
        <EventForm />

      </div>
    </AdminLayout>
  );
}
