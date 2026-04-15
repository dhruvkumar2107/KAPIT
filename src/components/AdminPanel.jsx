import React, { useState, useEffect, useMemo } from 'react';
import {
  Lock, SignOut, Users, EnvelopeSimple, Phone, Clock, CheckCircle,
  Hourglass, Trash, MagnifyingGlass, DownloadSimple, FunnelSimple,
  CaretDown, ArrowLeft, Eye, X, Warning
} from '@phosphor-icons/react';

// ────────────────────────────────────────────────────────────────────────────
// CONSTANTS
// ────────────────────────────────────────────────────────────────────────────
const ADMIN_PASSWORD = 'kapit@admin2026'; // Change in production
const STORAGE_KEY = 'kapit_inquiries';

const STATUS_CONFIG = {
  new:        { label: 'New',         color: 'bg-blue-100 text-blue-800 border-blue-200' },
  in_progress:{ label: 'In Progress', color: 'bg-amber-100 text-amber-800 border-amber-200' },
  resolved:   { label: 'Resolved',    color: 'bg-emerald-100 text-emerald-800 border-emerald-200' },
};

// ────────────────────────────────────────────────────────────────────────────
// HELPER: format date
// ────────────────────────────────────────────────────────────────────────────
function fmtDate(iso) {
  return new Date(iso).toLocaleString('en-IN', {
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });
}

// ────────────────────────────────────────────────────────────────────────────
// HELPER: CSV export
// ────────────────────────────────────────────────────────────────────────────
function exportCSV(inquiries) {
  const headers = ['ID', 'Name', 'Email', 'Phone', 'Message', 'Status', 'Submitted At'];
  const rows = inquiries.map(q => [
    q.id, q.name, q.email, q.phone || '—', `"${q.message.replace(/"/g, '""')}"`,
    STATUS_CONFIG[q.status]?.label ?? q.status, fmtDate(q.createdAt),
  ]);
  const csv = [headers, ...rows].map(r => r.join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `kapit_inquiries_${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

// ────────────────────────────────────────────────────────────────────────────
// SUB-COMPONENT: Login Screen
// ────────────────────────────────────────────────────────────────────────────
function LoginScreen({ onLogin }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPwd, setShowPwd] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      onLogin();
    } else {
      setError('Incorrect password. Please try again.');
      setPassword('');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Logo area */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-900 rounded-2xl mb-4 shadow-lg shadow-blue-900/30">
            <Lock size={28} weight="bold" className="text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white font-outfit tracking-tight">Admin Portal</h1>
          <p className="text-slate-400 text-sm mt-1">KAPIT INDIA PRIVATE LIMITED</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl">
          <label className="block text-sm font-semibold text-slate-300 mb-2">
            Admin Password
          </label>
          <div className="relative mb-4">
            <input
              type={showPwd ? 'text' : 'password'}
              value={password}
              onChange={e => { setPassword(e.target.value); setError(''); }}
              className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all pr-12"
              placeholder="Enter password"
              autoFocus
            />
            <button
              type="button"
              onClick={() => setShowPwd(v => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
            >
              <Eye size={18} />
            </button>
          </div>

          {error && (
            <div className="flex items-center gap-2 bg-red-900/30 border border-red-800 text-red-400 text-sm rounded-lg px-4 py-3 mb-4">
              <Warning size={16} weight="bold" />
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 rounded-lg transition-all duration-200 shadow-lg shadow-blue-600/20 active:scale-[0.98]"
          >
            Sign In
          </button>
        </form>

        <p className="text-center text-slate-600 text-xs mt-6">
          <a href="/" className="inline-flex items-center gap-1 hover:text-slate-400 transition-colors">
            <ArrowLeft size={12} /> Return to website
          </a>
        </p>
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// SUB-COMPONENT: Detail Modal
// ────────────────────────────────────────────────────────────────────────────
function DetailModal({ inquiry, onClose, onStatusChange }) {
  if (!inquiry) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl w-full max-w-lg animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-800">
          <div>
            <h2 className="text-lg font-bold text-white font-outfit">{inquiry.name}</h2>
            <p className="text-slate-400 text-sm">{fmtDate(inquiry.createdAt)}</p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors p-1">
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs uppercase tracking-widest text-slate-500 mb-1">Email</p>
              <a href={`mailto:${inquiry.email}`} className="text-blue-400 hover:text-blue-300 text-sm break-all transition-colors">
                {inquiry.email}
              </a>
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-slate-500 mb-1">Phone</p>
              <a href={`tel:${inquiry.phone}`} className="text-slate-200 text-sm hover:text-white transition-colors">
                {inquiry.phone || '—'}
              </a>
            </div>
          </div>

          <div>
            <p className="text-xs uppercase tracking-widest text-slate-500 mb-2">Message</p>
            <div className="bg-slate-800 rounded-lg p-4 text-slate-200 text-sm leading-relaxed whitespace-pre-wrap border border-slate-700">
              {inquiry.message}
            </div>
          </div>

          {/* Status selector */}
          <div>
            <p className="text-xs uppercase tracking-widest text-slate-500 mb-2">Status</p>
            <div className="flex gap-2 flex-wrap">
              {Object.entries(STATUS_CONFIG).map(([key, cfg]) => (
                <button
                  key={key}
                  onClick={() => onStatusChange(inquiry.id, key)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                    inquiry.status === key
                      ? cfg.color + ' ring-2 ring-offset-2 ring-offset-slate-900 ring-current'
                      : 'bg-slate-800 text-slate-400 border-slate-700 hover:border-slate-500'
                  }`}
                >
                  {cfg.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 pt-0 flex gap-3">
          <a
            href={`mailto:${inquiry.email}?subject=Re: Your Inquiry to KAPIT INDIA&body=Dear ${inquiry.name},%0D%0A%0D%0AThank you for reaching out to KAPIT INDIA PRIVATE LIMITED.%0D%0A%0D%0A`}
            className="flex-1 text-center bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2.5 rounded-lg text-sm transition-all"
          >
            Reply via Email
          </a>
          <button
            onClick={onClose}
            className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold py-2.5 rounded-lg text-sm transition-all border border-slate-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ────────────────────────────────────────────────────────────────────────────
const AdminPanel = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => sessionStorage.getItem('kapit_admin_auth') === 'true'
  );
  const [inquiries, setInquiries] = useState(() => {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); } catch { return []; }
  });
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortField, setSortField] = useState('createdAt');
  const [sortDir, setSortDir] = useState('desc');
  const [selected, setSelected] = useState(null);
  const [toDelete, setToDelete] = useState(null);

  // Reload from localStorage whenever focus returns (tab switch)
  useEffect(() => {
    const refresh = () => {
      try { setInquiries(JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')); } catch {}
    };
    window.addEventListener('focus', refresh);
    return () => window.removeEventListener('focus', refresh);
  }, []);

  const handleLogin = () => {
    sessionStorage.setItem('kapit_admin_auth', 'true');
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('kapit_admin_auth');
    setIsAuthenticated(false);
  };

  const persist = (updated) => {
    setInquiries(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  const handleStatusChange = (id, status) => {
    const updated = inquiries.map(q => q.id === id ? { ...q, status } : q);
    persist(updated);
    if (selected?.id === id) setSelected(prev => ({ ...prev, status }));
  };

  const handleDelete = (id) => {
    persist(inquiries.filter(q => q.id !== id));
    if (selected?.id === id) setSelected(null);
    setToDelete(null);
  };

  const toggleSort = (field) => {
    if (sortField === field) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortField(field); setSortDir('asc'); }
  };

  // Derived filtered + sorted list
  const filtered = useMemo(() => {
    let list = [...inquiries];
    if (filterStatus !== 'all') list = list.filter(q => q.status === filterStatus);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(i =>
        i.name.toLowerCase().includes(q) ||
        i.email.toLowerCase().includes(q) ||
        i.message.toLowerCase().includes(q) ||
        (i.phone && i.phone.toLowerCase().includes(q))
      );
    }
    list.sort((a, b) => {
      let va = a[sortField] || ''; let vb = b[sortField] || '';
      if (sortDir === 'asc') return va > vb ? 1 : -1;
      return va < vb ? 1 : -1;
    });
    return list;
  }, [inquiries, search, filterStatus, sortField, sortDir]);

  // Stats
  const stats = useMemo(() => ({
    total: inquiries.length,
    new: inquiries.filter(q => q.status === 'new').length,
    in_progress: inquiries.filter(q => q.status === 'in_progress').length,
    resolved: inquiries.filter(q => q.status === 'resolved').length,
  }), [inquiries]);

  if (!isAuthenticated) return <LoginScreen onLogin={handleLogin} />;

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Top Nav */}
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-xl sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Lock size={16} weight="bold" />
            </div>
            <div>
              <span className="font-outfit font-bold text-white text-sm sm:text-base">Admin Panel</span>
              <span className="hidden sm:inline text-slate-500 text-sm"> — KAPIT INDIA</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <a href="/" className="flex items-center gap-2 text-slate-400 hover:text-white text-sm transition-colors px-3 py-1.5 rounded-lg hover:bg-slate-800">
              <ArrowLeft size={16} /> <span className="hidden sm:inline">Website</span>
            </a>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-slate-800 hover:bg-red-900/40 border border-slate-700 hover:border-red-800 text-slate-300 hover:text-red-400 text-sm px-3 py-1.5 rounded-lg transition-all"
            >
              <SignOut size={16} /> <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: 'Total Inquiries', value: stats.total, icon: <Users size={20} />, color: 'text-white', bg: 'bg-blue-600' },
            { label: 'New', value: stats.new, icon: <Clock size={20} />, color: 'text-blue-400', bg: 'bg-blue-900/40' },
            { label: 'In Progress', value: stats.in_progress, icon: <Hourglass size={20} />, color: 'text-amber-400', bg: 'bg-amber-900/40' },
            { label: 'Resolved', value: stats.resolved, icon: <CheckCircle size={20} />, color: 'text-emerald-400', bg: 'bg-emerald-900/40' },
          ].map(card => (
            <div key={card.label} className="bg-slate-900 border border-slate-800 rounded-xl p-4 sm:p-5 flex items-center gap-4">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${card.bg} ${card.color}`}>
                {card.icon}
              </div>
              <div>
                <p className="text-2xl font-bold font-outfit text-white">{card.value}</p>
                <p className="text-slate-500 text-xs">{card.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
          {/* Search */}
          <div className="relative flex-1 w-full">
            <MagnifyingGlass size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Search by name, email, phone, message…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-slate-900 border border-slate-800 rounded-lg text-sm text-white placeholder-slate-500 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            />
          </div>

          {/* Status filter */}
          <div className="relative">
            <FunnelSimple size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
            <select
              value={filterStatus}
              onChange={e => setFilterStatus(e.target.value)}
              className="pl-9 pr-8 py-2.5 bg-slate-900 border border-slate-800 rounded-lg text-sm text-white outline-none focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer"
            >
              <option value="all">All Status</option>
              <option value="new">New</option>
              <option value="in_progress">In Progress</option>
              <option value="resolved">Resolved</option>
            </select>
            <CaretDown size={12} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
          </div>

          {/* Export */}
          <button
            onClick={() => exportCSV(filtered)}
            disabled={filtered.length === 0}
            className="flex items-center gap-2 bg-emerald-700 hover:bg-emerald-600 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-semibold px-4 py-2.5 rounded-lg transition-all"
          >
            <DownloadSimple size={16} /> Export CSV
          </button>
        </div>

        {/* Table */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
          {filtered.length === 0 ? (
            <div className="py-20 text-center">
              <EnvelopeSimple size={40} className="text-slate-700 mx-auto mb-3" />
              <p className="text-slate-500 font-medium">
                {inquiries.length === 0 ? 'No inquiries yet.' : 'No results match your search.'}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-500 text-xs uppercase tracking-widest">
                    {[
                      { field: 'name', label: 'Name' },
                      { field: 'email', label: 'Email' },
                      { field: null, label: 'Phone' },
                      { field: 'status', label: 'Status' },
                      { field: 'createdAt', label: 'Submitted' },
                      { field: null, label: 'Actions' },
                    ].map(col => (
                      <th
                        key={col.label}
                        className={`px-4 py-3 text-left ${col.field ? 'cursor-pointer select-none hover:text-slate-300' : ''}`}
                        onClick={() => col.field && toggleSort(col.field)}
                      >
                        <span className="inline-flex items-center gap-1">
                          {col.label}
                          {col.field === sortField && (
                            <CaretDown size={10} className={`transition-transform ${sortDir === 'asc' ? 'rotate-180' : ''}`} />
                          )}
                        </span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {filtered.map(inquiry => (
                    <tr
                      key={inquiry.id}
                      className="hover:bg-slate-800/50 transition-colors group"
                    >
                      <td className="px-4 py-3">
                        <button
                          onClick={() => setSelected(inquiry)}
                          className="font-semibold text-white hover:text-blue-400 transition-colors text-left"
                        >
                          {inquiry.name}
                        </button>
                      </td>
                      <td className="px-4 py-3">
                        <a href={`mailto:${inquiry.email}`} className="text-slate-300 hover:text-blue-400 transition-colors">
                          {inquiry.email}
                        </a>
                      </td>
                      <td className="px-4 py-3 text-slate-400">{inquiry.phone || '—'}</td>
                      <td className="px-4 py-3">
                        <select
                          value={inquiry.status}
                          onChange={e => handleStatusChange(inquiry.id, e.target.value)}
                          className={`text-xs font-semibold px-2.5 py-1 rounded-full border bg-transparent outline-none cursor-pointer ${STATUS_CONFIG[inquiry.status]?.color}`}
                        >
                          {Object.entries(STATUS_CONFIG).map(([key, cfg]) => (
                            <option key={key} value={key} className="bg-slate-900 text-white">{cfg.label}</option>
                          ))}
                        </select>
                      </td>
                      <td className="px-4 py-3 text-slate-400 whitespace-nowrap">{fmtDate(inquiry.createdAt)}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => setSelected(inquiry)}
                            className="p-1.5 bg-slate-700 hover:bg-blue-600 rounded-md transition-colors text-slate-300 hover:text-white"
                            title="View details"
                          >
                            <Eye size={14} />
                          </button>
                          <button
                            onClick={() => setToDelete(inquiry)}
                            className="p-1.5 bg-slate-700 hover:bg-red-600 rounded-md transition-colors text-slate-300 hover:text-white"
                            title="Delete inquiry"
                          >
                            <Trash size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <p className="text-xs text-slate-600 text-right">
          Showing {filtered.length} of {inquiries.length} inquiries
        </p>
      </main>

      {/* Detail Modal */}
      {selected && (
        <DetailModal
          inquiry={selected}
          onClose={() => setSelected(null)}
          onStatusChange={handleStatusChange}
        />
      )}

      {/* Delete Confirm Modal */}
      {toDelete && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          onClick={e => { if (e.target === e.currentTarget) setToDelete(null); }}
        >
          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-8 w-full max-w-sm shadow-2xl">
            <div className="w-12 h-12 bg-red-900/40 rounded-xl flex items-center justify-center mb-4">
              <Trash size={24} className="text-red-400" />
            </div>
            <h3 className="text-lg font-bold text-white mb-1 font-outfit">Delete Inquiry?</h3>
            <p className="text-slate-400 text-sm mb-6">
              This will permanently delete the inquiry from <strong className="text-white">{toDelete.name}</strong>. This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => handleDelete(toDelete.id)}
                className="flex-1 bg-red-600 hover:bg-red-500 text-white font-semibold py-2.5 rounded-lg transition-all text-sm"
              >
                Delete
              </button>
              <button
                onClick={() => setToDelete(null)}
                className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold py-2.5 rounded-lg transition-all text-sm border border-slate-700"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
