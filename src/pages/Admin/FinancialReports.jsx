import React from 'react';
import AdminLayout from '../../components/AdminLayout';
import ReportTable from '../../components/Admin/ReportTable';

export default function FinancialReports() {
  return (
    <AdminLayout>
      <div className="space-y-8 max-w-6xl mx-auto">
        <ReportTable />
      </div>
    </AdminLayout>
  );
}
