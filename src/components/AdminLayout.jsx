import React from 'react';
import AdminSidebar from './Admin/AdminSidebar';

export default function AdminLayout({ children, currentUser, onLogout }) {
  return (
    <div className="min-h-screen flex bg-slate-50 relative overflow-x-hidden font-sans">

      {/* Sidebar Navigation */}
      <AdminSidebar onLogout={onLogout} />

      {/* Main Content Area */}
      <main className="flex-grow min-h-screen py-8 px-8 md:px-10 overflow-y-auto">
        {children}
      </main>

    </div>
  );
}
