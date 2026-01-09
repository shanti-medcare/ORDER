
import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { Page, CartItem, Medicine } from './types';
import Header from './components/Header';
import Home from './pages/Home';
import SearchPage from './pages/SearchPage';
import UploadPage from './pages/UploadPage';
import CallPage from './pages/CallPage';
import CartPage from './pages/CartPage';
import AdminPage from './pages/AdminPage';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>(Page.HOME);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isAdminMode, setIsAdminMode] = useState(false);

  const addMultipleToCart = (items: { medicine: Medicine; quantity: number }[]) => {
    setCart(prev => {
      let nextCart = [...prev];
      items.forEach(({ medicine, quantity }) => {
        const existingIndex = nextCart.findIndex(item => item.medicine.name === medicine.name);
        if (existingIndex > -1) {
          nextCart[existingIndex] = { ...nextCart[existingIndex], quantity: nextCart[existingIndex].quantity + quantity };
        } else {
          nextCart.push({ medicine, quantity });
        }
      });
      return nextCart;
    });
    setCurrentPage(Page.CART);
  };

  const removeFromCart = (name: string) => setCart(prev => prev.filter(item => item.medicine.name !== name));
  const updateQuantity = (name: string, delta: number) => {
    setCart(prev => prev.map(item => item.medicine.name === name ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item));
  };

  // অ্যাডমিন প্যানেলে ঢোকার গোপন উপায়
  const toggleAdmin = () => {
    setIsAdminMode(!isAdminMode);
    setCurrentPage(isAdminMode ? Page.HOME : Page.ADMIN);
  };

  const renderPage = () => {
    if (currentPage === Page.ADMIN) {
      return <AdminPage onBack={() => { setCurrentPage(Page.HOME); setIsAdminMode(false); }} />;
    }

    switch (currentPage) {
      case Page.HOME: return <Home onNavigate={setCurrentPage} />;
      case Page.SEARCH: return <SearchPage onBack={() => setCurrentPage(Page.HOME)} onAddMultipleToCart={addMultipleToCart} />;
      case Page.UPLOAD: return <UploadPage onBack={() => setCurrentPage(Page.HOME)} />;
      case Page.CALL: return <CallPage onBack={() => setCurrentPage(Page.HOME)} />;
      case Page.CART: return <CartPage cart={cart} onBack={() => setCurrentPage(Page.HOME)} onRemove={removeFromCart} onUpdateQty={updateQuantity} onNavigate={setCurrentPage} onClearCart={() => setCart([])} />;
      default: return <Home onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col max-w-md mx-auto bg-[#fffdf7] relative shadow-2xl overflow-hidden">
      <Header onHome={() => setCurrentPage(Page.HOME)} onAdminAccess={toggleAdmin} />
      
      <main className="flex-1 overflow-y-auto pb-32">
        {renderPage()}
      </main>

      {/* কাস্টমার নেভিগেশন বার - অ্যাডমিন মোডে এটি লুকানো থাকবে */}
      {currentPage !== Page.ADMIN && (
        <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-[400px] bg-slate-900/95 backdrop-blur-xl flex justify-around items-center py-4 px-2 z-50 shadow-2xl rounded-[2.5rem] no-print">
          <button onClick={() => setCurrentPage(Page.HOME)} className={`flex flex-col items-center gap-1 ${currentPage === Page.HOME ? 'text-white' : 'text-slate-500'}`}>
            <i className="fa-solid fa-house"></i>
            <span className="text-[10px] font-black uppercase">হোম</span>
          </button>
          <button onClick={() => setCurrentPage(Page.SEARCH)} className={`flex flex-col items-center gap-1 ${currentPage === Page.SEARCH ? 'text-white' : 'text-slate-500'}`}>
            <i className="fa-solid fa-plus-square"></i>
            <span className="text-[10px] font-black uppercase">অর্ডার</span>
          </button>
          <button onClick={() => setCurrentPage(Page.CART)} className={`flex flex-col items-center gap-1 ${currentPage === Page.CART ? 'text-white' : 'text-slate-500'}`}>
            <div className="relative">
              <i className="fa-solid fa-cart-shopping"></i>
              {cart.length > 0 && <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[8px] w-4 h-4 rounded-full flex items-center justify-center font-bold">{cart.length}</span>}
            </div>
            <span className="text-[10px] font-black uppercase">কার্ট</span>
          </button>
          <button onClick={() => setCurrentPage(Page.CALL)} className={`flex flex-col items-center gap-1 ${currentPage === Page.CALL ? 'text-white' : 'text-slate-500'}`}>
            <i className="fa-solid fa-phone"></i>
            <span className="text-[10px] font-black uppercase">কল</span>
          </button>
        </nav>
      )}
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(<App />);
