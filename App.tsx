
import React, { useState, useEffect } from 'react';
import { Page, CartItem, Medicine, Order } from './types';
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

  const addToCart = (medicine: Medicine, quantity: number = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.medicine.name === medicine.name);
      if (existing) {
        return prev.map(item => 
          item.medicine.name === medicine.name 
            ? { ...item, quantity: item.quantity + quantity } 
            : item
        );
      }
      return [...prev, { medicine, quantity }];
    });
    setCurrentPage(Page.CART);
  };

  const addMultipleToCart = (items: { medicine: Medicine; quantity: number }[]) => {
    setCart(prev => {
      let nextCart = [...prev];
      items.forEach(({ medicine, quantity }) => {
        const existingIndex = nextCart.findIndex(item => item.medicine.name === medicine.name);
        if (existingIndex > -1) {
          nextCart[existingIndex] = {
            ...nextCart[existingIndex],
            quantity: nextCart[existingIndex].quantity + quantity
          };
        } else {
          nextCart.push({ medicine, quantity });
        }
      });
      return nextCart;
    });
    setCurrentPage(Page.CART);
  };

  const removeFromCart = (name: string) => {
    setCart(prev => prev.filter(item => item.medicine.name !== name));
  };

  const updateQuantity = (name: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.medicine.name === name) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const clearCart = () => setCart([]);

  // Scroll to top on page change
  useEffect(() => {
    const mainElement = document.querySelector('main');
    if (mainElement) mainElement.scrollTo(0, 0);
  }, [currentPage]);

  const renderPage = () => {
    switch (currentPage) {
      case Page.HOME:
        return <Home onNavigate={setCurrentPage} />;
      case Page.SEARCH:
        return <SearchPage onBack={() => setCurrentPage(Page.HOME)} onAddMultipleToCart={addMultipleToCart} />;
      case Page.UPLOAD:
        return <UploadPage onBack={() => setCurrentPage(Page.HOME)} />;
      case Page.CALL:
        return <CallPage onBack={() => setCurrentPage(Page.HOME)} />;
      case Page.CART:
        return (
          <CartPage 
            cart={cart} 
            onBack={() => setCurrentPage(Page.HOME)} 
            onRemove={removeFromCart}
            onUpdateQty={updateQuantity}
            onNavigate={setCurrentPage}
            onClearCart={clearCart}
          />
        );
      case Page.ADMIN:
        return <AdminPage onBack={() => setCurrentPage(Page.HOME)} />;
      default:
        return <Home onNavigate={setCurrentPage} />;
    }
  };

  const cartCount = cart.length;

  const navItems = [
    { id: Page.HOME, label: 'হোম', icon: 'fa-solid fa-house-chimney' },
    { id: Page.SEARCH, label: 'অর্ডার', icon: 'fa-solid fa-square-plus' },
    { id: Page.CART, label: 'কার্ট', icon: 'fa-solid fa-basket-shopping', badge: cartCount },
    { id: Page.CALL, label: 'কল', icon: 'fa-solid fa-headset' },
  ];

  return (
    <div className="min-h-screen flex flex-col max-w-md mx-auto bg-[#fffdf7] shadow-2xl relative overflow-hidden ring-1 ring-slate-100">
      <Header onHome={() => setCurrentPage(Page.HOME)} onAdminAccess={() => setCurrentPage(Page.ADMIN)} />
      
      <main className="flex-1 overflow-y-auto scroll-smooth">
        {renderPage()}
      </main>

      {/* Modern Floating Navigation Dock */}
      {currentPage !== Page.ADMIN && (
        <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-[400px] bg-slate-900/95 backdrop-blur-xl flex justify-around items-center py-3 px-2 z-[60] shadow-[0_20px_50px_rgba(0,0,0,0.3)] rounded-[2.5rem] border border-white/10 no-print">
          {navItems.map((item) => {
            const isActive = currentPage === item.id;
            return (
              <button 
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                className={`relative flex flex-col items-center justify-center py-2 px-5 transition-all duration-300 rounded-2xl ${isActive ? 'bg-white/10 text-white scale-110' : 'text-slate-500'}`}
              >
                <div className="relative">
                  <i className={`${item.icon} text-xl`}></i>
                  {item.badge !== undefined && item.badge > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[9px] min-w-[16px] h-4 rounded-full flex items-center justify-center font-black border-2 border-slate-900 shadow-lg">
                      {item.badge}
                    </span>
                  )}
                </div>
                <span className={`text-[10px] font-black mt-1 uppercase tracking-widest ${isActive ? 'opacity-100' : 'opacity-60'}`}>{item.label}</span>
                
                {isActive && (
                  <div className="absolute -bottom-1 w-1 h-1 bg-red-500 rounded-full"></div>
                )}
              </button>
            );
          })}
        </nav>
      )}
    </div>
  );
};

export default App;
