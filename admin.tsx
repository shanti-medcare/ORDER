
import React from 'react';
import ReactDOM from 'react-dom/client';
import AdminPage from './pages/AdminPage';

const AdminApp: React.FC = () => {
  return (
    <div className="min-h-screen max-w-md mx-auto bg-white shadow-xl">
      <div className="p-4 bg-slate-900 text-white flex items-center justify-between no-print">
         <h1 className="font-black text-xl tracking-tight">শান্তি মেডিকেয়ার অ্যাডমিন</h1>
         <div className="w-8 h-8 bg-red-600 rounded-full"></div>
      </div>
      <AdminPage onBack={() => { window.location.href = 'index.html'; }} />
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(<AdminApp />);
