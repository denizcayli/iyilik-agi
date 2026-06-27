import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Import Layout
import Layout from './components/Common/Navbar';

// Import Pages
import Home from './pages/Home';
import Events from './pages/Events';
import EventDetail from './pages/EventDetail';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import PaymentSimulation from './pages/PaymentSimulation';
import UserProfile from './pages/UserProfile';

// Import Admin Pages
import AdminDashboard from './pages/Admin/AdminDashboard';
import NewEvent from './pages/Admin/NewEvent';
import EditEvent from './pages/Admin/EditEvent';
import FinancialReports from './pages/Admin/FinancialReports';
import Volunteers from './pages/Admin/Volunteers';
import EventsManagement from './pages/Admin/EventsManagement';

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Public & General Routes wrapped in Layout */}
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/events" element={<Layout><Events /></Layout>} />
        <Route path="/events/:id" element={<Layout><EventDetail /></Layout>} />
        <Route path="/about" element={<Layout><About /></Layout>} />
        <Route path="/contact" element={<Layout><Contact /></Layout>} />
        <Route path="/login" element={<Layout><Login /></Layout>} />
        <Route path="/payment" element={<Layout><PaymentSimulation /></Layout>} />
        <Route path="/profile" element={<Layout><UserProfile /></Layout>} />

        {/* Admin Section Routes */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/events" element={<EventsManagement />} />
        <Route path="/admin/new-event" element={<NewEvent />} />
        <Route path="/admin/edit-event/:id" element={<EditEvent />} />
        <Route path="/admin/yeni-kampanya" element={<NewEvent />} />
        <Route path="/admin/reports" element={<FinancialReports />} />
        <Route path="/admin/finansal-raporlar" element={<FinancialReports />} />
        <Route path="/admin/volunteers" element={<Volunteers />} />

        {/* Catch-all Redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
