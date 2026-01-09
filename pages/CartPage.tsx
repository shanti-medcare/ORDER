
import React, { useState } from 'react';
import { CartItem, MIN_ORDER_AMOUNT, Page, Order } from '../types';
import Button from '../components/Button';

interface CartPageProps {
  cart: CartItem[];
  onBack: () => void;
  onRemove: (name: string) => void;
  onUpdateQty: (name: string, delta: number) => void;
  onNavigate: (page: Page) => void;
  onClearCart: () => void;
}

type PaymentMethod = 'bkash' | 'nagad' | 'rocket' | 'cod';
type Distance = '1-2' | '3' | '4-5';

const CartPage: React.FC<CartPageProps> = ({ cart, onBack, onRemove, onUpdateQty, onNavigate, onClearCart }) => {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cod');
  const [distance, setDistance] = useState<Distance>('1-2');
  const [senderNumber, setSenderNumber] = useState('');
  const [lastThreeDigits, setLastThreeDigits] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  
  const totalMedicine = cart.reduce((sum, item) => sum + (item.medicine.price || 0) * item.quantity, 0);
  
  const deliveryCharges = {
    '1-2': 20,
    '3': 30,
    '4-5': 40
  };
  const deliveryCharge = deliveryCharges[distance];
  const isEligible = totalMedicine >= MIN_ORDER_AMOUNT;
  const officialPaymentPhone = "01745707133";

  const handleCopyNumber = () => {
    navigator.clipboard.writeText(officialPaymentPhone).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  };

  const validate = () => {
    const newErrors: Record<string, boolean> = {};
    if (!deliveryAddress.trim()) newErrors.address = true;
    if (!senderNumber.trim()) newErrors.number = true;
    if (lastThreeDigits.length !== 3) newErrors.digits = true;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleConfirmOrder = () => {
    if (!isEligible) {
      alert(`দুঃখিত, নূন্যতম ${MIN_ORDER_AMOUNT} টাকার অর্ডার প্রয়োজন।`);
      return;
    }
    
    if (!validate()) {
      const firstError = document.querySelector('.animate-shake');
      if (firstError) firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    const newOrder: Order = {
      id: Math.random().toString(36).substr(2, 9).toUpperCase(),
      timestamp: Date.now(),
      type: 'cart',
      items: cart,
      deliveryAddress,
      distance,
      deliveryCharge,
      paymentMethod,
      senderNumber,
      lastThreeDigits,
      status: 'pending'
    };

    const existingOrders = JSON.parse(localStorage.getItem('shanti_orders') || '[]');
    localStorage.setItem('shanti_orders', JSON.stringify([newOrder, ...existingOrders]));
    
    alert('ধন্যবাদ! আপনার অর্ডারটি গ্রহণ করা হয়েছে। প্রতিনিধি কল করবেন।');
    onClearCart();
    onNavigate(Page.HOME);
  };

  if (cart.length === 0) {
    return (
      <div className="p-10 text-center flex flex-col items-center justify-center min-h-[70vh] animate-in zoom-in duration-500">
        <div className="clay-card w-40 h-40 rounded-[3.5rem] flex items-center justify-center mb-8 shadow-inner">
          <i className="fa-solid fa-basket-shopping text-6xl text-slate-200"></i>
        </div>
        <h2 className="text-4xl font-black text-slate-800 mb-4">আপনার কার্ট খালি!</h2>
        <Button onClick={() => onNavigate(Page.SEARCH)} icon="fa-solid fa-plus-circle" variant="primary">
          ওষুধ যোগ করুন
        </Button>
      </div>
    );
  }

  return (
    <div className="px-6 space-y-8 py-8 pb-40 animate-in slide-in-from-right-6 duration-500">
      <div className="flex items-center gap-5">
        <button onClick={onBack} className="w-14 h-14 bg-white shadow-sm border border-slate-100 rounded-2xl flex items-center justify-center active:scale-90 transition-all">
          <i className="fa-solid fa-chevron-left text-xl text-slate-800"></i>
        </button>
        <div>
          <h2 className="text-3xl font-black text-slate-800 tracking-tight">অর্ডার রিভিউ</h2>
          <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">শান্তি মেডিকেয়ার</p>
        </div>
      </div>

      <div className="space-y-4">
        {cart.map((item) => (
          <div key={item.medicine.name} className="clay-card p-6 rounded-[2.5rem] flex items-center gap-5">
            <div className="bg-red-50 w-16 h-16 rounded-[1.5rem] flex items-center justify-center shrink-0 border border-red-100 shadow-inner">
              <i className="fa-solid fa-capsules text-red-600 text-2xl"></i>
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-black text-xl text-slate-800 truncate leading-none">{item.medicine.name}</h4>
              <p className="text-red-600 font-black text-sm mt-2">৳{(item.medicine.price || 0) * item.quantity}</p>
            </div>
            <div className="flex flex-col items-end gap-3">
              <div className="flex items-center bg-slate-100 rounded-2xl p-1 shadow-inner border border-slate-200">
                <button onClick={() => onUpdateQty(item.medicine.name, -1)} className="w-9 h-9 flex items-center justify-center bg-white rounded-xl shadow-sm text-slate-800 font-black"><i className="fa-solid fa-minus text-xs"></i></button>
                <span className="w-10 text-center font-black text-slate-800 text-lg">{item.quantity}</span>
                <button onClick={() => onUpdateQty(item.medicine.name, 1)} className="w-9 h-9 flex items-center justify-center bg-white rounded-xl shadow-sm text-slate-800 font-black"><i className="fa-solid fa-plus text-xs"></i></button>
              </div>
              <button onClick={() => onRemove(item.medicine.name)} className="text-[10px] font-black text-red-500 uppercase tracking-widest mr-1">সরিয়ে দিন</button>
            </div>
          </div>
        ))}
      </div>

      <div className={`clay-card p-8 rounded-[3.5rem] space-y-8 border-l-[12px] shadow-xl transition-all ${errors.address ? 'border-l-red-600 bg-red-50 ring-4 ring-red-100 animate-shake' : 'border-l-orange-500'}`}>
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-black text-slate-800 flex items-center gap-3">
            <i className={`fa-solid fa-truck-fast ${errors.address ? 'text-red-600' : 'text-orange-500'}`}></i> ডেলিভারি তথ্য
          </h3>
          {errors.address && <span className="text-[10px] font-black text-red-600 uppercase">ঠিকানা প্রয়োজন</span>}
        </div>
        <div className="flex flex-col gap-3">
          {['1-2', '3', '4-5'].map((id) => (
            <button key={id} onClick={() => setDistance(id as Distance)} className={`p-5 rounded-[1.8rem] border-2 transition-all ${distance === id ? 'border-orange-500 bg-orange-50 shadow-md ring-2 ring-orange-200' : 'border-slate-50 bg-slate-50/50'}`}>
              <span className="font-black text-slate-800">{id === '1-2' ? 'সরদারপাড়া (১-২ কিমি) - ৳২০' : id === '3' ? 'পার্শ্ববর্তী এলাকা (৩ কিমি) - ৳৩০' : 'দূরবর্তী এলাকা (৪-৫ কিমি) - ৳৪০'}</span>
            </button>
          ))}
        </div>
        <textarea 
          placeholder="গ্রাম, বাড়ির নাম এবং বিস্তারিত ঠিকানা..." 
          value={deliveryAddress} 
          onChange={(e) => {
            setDeliveryAddress(e.target.value);
            if (e.target.value.trim()) setErrors(prev => ({ ...prev, address: false }));
          }} 
          className={`w-full h-32 p-6 rounded-[2.5rem] border-2 outline-none font-bold text-lg resize-none shadow-inner transition-all ${errors.address ? 'border-red-300 bg-red-50/50' : 'bg-slate-50 border-slate-100'}`} 
        />
      </div>

      <div className="clay-card p-8 rounded-[3rem] space-y-8 shadow-xl">
        <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest">পেমেন্ট মেথড (ডেলিভারি চার্জ)</h3>
        <div className="grid grid-cols-2 gap-4">
          {['bkash', 'nagad', 'rocket', 'cod'].map(m => (
            <button key={m} onClick={() => setPaymentMethod(m as PaymentMethod)} className={`p-5 rounded-[2rem] border-2 flex flex-col items-center gap-2 ${paymentMethod === m ? 'border-blue-500 bg-blue-50 shadow-md ring-2 ring-blue-100' : 'border-slate-50 opacity-70'}`}>
              <i className={`fa-solid ${m === 'bkash' ? 'fa-mobile-screen text-pink-600' : m === 'nagad' ? 'fa-fire text-orange-600' : m === 'rocket' ? 'fa-bolt text-purple-600' : 'fa-ellipsis text-slate-600'} text-3xl`}></i>
              <span className="font-black text-[11px] uppercase">{m}</span>
            </button>
          ))}
        </div>

        <div className="p-7 bg-blue-600 rounded-[2.5rem] text-white space-y-4 shadow-lg">
          <p className="text-[11px] font-black uppercase text-blue-100 text-center">ডেলিভারি চার্জ ৳{deliveryCharge} অগ্রিম দিন</p>
          <div onClick={handleCopyNumber} className="bg-white p-5 rounded-2xl flex items-center justify-between text-slate-900 font-black text-2xl tracking-widest cursor-pointer shadow-inner">
            {officialPaymentPhone} <i className={`fa-solid ${isCopied ? 'fa-check text-emerald-500' : 'fa-copy'} text-xl`}></i>
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-1">
            <input 
              type="tel" 
              placeholder="পেমেন্ট নাম্বার" 
              value={senderNumber} 
              onChange={(e) => {
                setSenderNumber(e.target.value);
                if (e.target.value.trim()) setErrors(prev => ({ ...prev, number: false }));
              }} 
              className={`w-full p-5 rounded-[1.8rem] border-2 outline-none font-black text-xl shadow-inner transition-all ${errors.number ? 'border-red-300 bg-red-50 animate-shake' : 'border-slate-100'}`} 
            />
            {errors.number && <p className="text-[10px] font-black text-red-600 uppercase ml-4">আপনার পেমেন্ট নাম্বারটি লিখুন</p>}
          </div>
          
          <div className="space-y-1">
            <input 
              type="tel" 
              maxLength={3} 
              placeholder="শেষ ৩ ডিজিট" 
              value={lastThreeDigits} 
              onChange={(e) => {
                const val = e.target.value.replace(/[^0-9]/g, '');
                setLastThreeDigits(val);
                if (val.length === 3) setErrors(prev => ({ ...prev, digits: false }));
              }} 
              className={`w-full p-5 rounded-[1.8rem] border-2 outline-none font-black text-xl shadow-inner transition-all ${errors.digits ? 'border-red-300 bg-red-50 animate-shake' : 'border-slate-100'}`} 
            />
            {errors.digits && <p className="text-[10px] font-black text-red-600 uppercase ml-4">শেষ ৩ ডিজিট আবশ্যক</p>}
          </div>
        </div>
      </div>

      <div className="bg-slate-900 p-10 rounded-[3.5rem] text-white space-y-8 shadow-2xl border border-white/5">
        <div className="space-y-4 border-b border-white/10 pb-6">
          <div className="flex justify-between text-slate-400 text-xs font-black uppercase"><span>ওষুধের মূল্য</span><span>৳{totalMedicine}</span></div>
          <div className="flex justify-between text-slate-400 text-xs font-black uppercase"><span>ডেলিভারি চার্জ</span><span className="text-orange-500">৳{deliveryCharge}</span></div>
          {!isEligible && (
            <p className="text-red-400 text-[10px] font-black uppercase text-center bg-red-400/10 py-2 rounded-lg border border-red-400/20">
              নূন্যতম {MIN_ORDER_AMOUNT} টাকার ওষুধ অর্ডার করতে হবে
            </p>
          )}
          <div className="flex justify-between items-center p-5 bg-emerald-500/10 rounded-2xl border border-emerald-500/20 mt-4">
            <span className="text-[10px] uppercase text-emerald-400">হাতে হাতে দিবেন (Cash)</span>
            <span className="text-2xl font-black text-emerald-400">৳{totalMedicine}</span>
          </div>
        </div>
        <div className="space-y-1">
          <p className="text-xs font-black text-blue-400 uppercase tracking-widest">এখন পেমেন্ট (MFS)</p>
          <p className="text-7xl font-black text-white tracking-tighter leading-none">৳{deliveryCharge}</p>
        </div>
        <Button variant="success" disabled={!isEligible} onClick={handleConfirmOrder} className="h-24 text-3xl shadow-[0_20px_50px_rgba(16,185,129,0.3)]" icon="fa-solid fa-check-double">অর্ডার নিশ্চিত করুন</Button>
      </div>
    </div>
  );
};

export default CartPage;
