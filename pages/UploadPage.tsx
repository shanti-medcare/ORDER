
import React, { useState } from 'react';
import { Page, Order } from '../types';
import Button from '../components/Button';

interface UploadPageProps {
  onBack: () => void;
}

type PaymentMethod = 'bkash' | 'nagad' | 'rocket';
type Distance = '1-2' | '3' | '4-5';

const UploadPage: React.FC<UploadPageProps> = ({ onBack }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  
  const [distance, setDistance] = useState<Distance>('1-2');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('bkash');
  const [senderNumber, setSenderNumber] = useState('');
  const [lastThreeDigits, setLastThreeDigits] = useState('');
  const [isCopied, setIsCopied] = useState(false);

  // Error states
  const [errors, setErrors] = useState<Record<string, boolean>>({});

  const officialPaymentPhone = "01745707133";
  const contactPhone = "01717477765";
  const deliveryCharge = distance === '1-2' ? 20 : distance === '3' ? 30 : 40;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        setErrors(prev => ({ ...prev, image: false }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCopyNumber = () => {
    navigator.clipboard.writeText(officialPaymentPhone).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  };

  const validate = () => {
    const newErrors: Record<string, boolean> = {};
    if (!selectedImage) newErrors.image = true;
    if (!deliveryAddress.trim()) newErrors.address = true;
    if (!senderNumber.trim()) newErrors.number = true;
    if (lastThreeDigits.length !== 3) newErrors.digits = true;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleOrder = () => {
    if (!validate()) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setIsUploading(true);
    const newOrder: Order = {
      id: Math.random().toString(36).substr(2, 9).toUpperCase(),
      timestamp: Date.now(),
      type: 'prescription',
      imageUrl: selectedImage as string,
      deliveryAddress,
      distance,
      deliveryCharge,
      paymentMethod,
      senderNumber,
      lastThreeDigits,
      status: 'pending'
    };

    setTimeout(() => {
      const existingOrders = JSON.parse(localStorage.getItem('shanti_orders') || '[]');
      localStorage.setItem('shanti_orders', JSON.stringify([newOrder, ...existingOrders]));
      setIsUploading(false);
      alert('প্রেসক্রিপশন সফলভাবে পাঠানো হয়েছে। প্রতিনিধি কল করবেন।');
      onBack();
    }, 2000);
  };

  return (
    <div className="px-6 space-y-8 py-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-40">
      <div className="flex items-center gap-5">
        <button onClick={onBack} className="w-14 h-14 bg-white border border-slate-100 rounded-2xl flex items-center justify-center text-slate-800 shadow-sm active:scale-90 transition-all"><i className="fa-solid fa-arrow-left text-xl"></i></button>
        <div><h2 className="text-3xl font-black text-slate-800 tracking-tight">প্রেসক্রিপশন দিন</h2><p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">ছবি তুলে সরাসরি অর্ডার</p></div>
      </div>

      {!selectedImage ? (
        <div className="flex flex-col items-center justify-center gap-6">
          <label className={`w-full flex flex-col items-center justify-center h-[28rem] border-4 border-dashed rounded-[3.5rem] cursor-pointer bg-white shadow-2xl relative transition-all ${errors.image ? 'border-red-500 bg-red-50 animate-shake' : 'border-slate-200 hover:border-red-400'}`}>
            <div className={`w-32 h-32 rounded-full flex items-center justify-center mb-6 shadow-inner ${errors.image ? 'bg-red-100 text-red-600' : 'bg-red-50 text-red-600'}`}><i className="fa-solid fa-camera text-6xl"></i></div>
            <span className={`text-2xl font-black ${errors.image ? 'text-red-600' : 'text-slate-800'}`}>ছবি তুলুন বা ফাইল দিন</span>
            {errors.image && <p className="text-sm font-black text-red-600 uppercase mt-4">একটি ছবি আবশ্যক</p>}
            <input type="file" accept="image/*" capture="environment" className="hidden" onChange={handleFileChange} />
          </label>
        </div>
      ) : (
        <div className="w-full space-y-10 animate-in zoom-in-95 duration-500">
          <div className="relative clay-card p-5 rounded-[3.5rem] bg-white shadow-2xl">
            <img src={selectedImage} alt="Prescription" className="w-full h-full object-cover rounded-[2.8rem] aspect-[4/5]" />
            <button onClick={() => setSelectedImage(null)} className="absolute top-6 right-6 bg-red-600 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-2xl border-4 border-white"><i className="fa-solid fa-xmark text-2xl"></i></button>
          </div>

          <div className={`clay-card p-8 rounded-[3.5rem] space-y-8 border-l-[12px] shadow-xl transition-all ${errors.address ? 'border-l-red-600 bg-red-50/20 ring-4 ring-red-100 animate-shake' : 'border-l-orange-500'}`}>
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-black text-slate-800 flex items-center gap-3"><i className={`fa-solid fa-truck-fast ${errors.address ? 'text-red-600' : 'text-orange-500'}`}></i> ডেলিভারি তথ্য</h3>
              {errors.address && <span className="text-[10px] font-black text-red-600 uppercase">ঠিকানা লিখুন</span>}
            </div>
            <div className="flex flex-col gap-3">
              {['1-2', '3', '4-5'].map(id => (
                <button key={id} onClick={() => setDistance(id as Distance)} className={`p-6 rounded-[2rem] border-2 transition-all ${distance === id ? 'border-orange-500 bg-orange-50 shadow-md ring-2 ring-orange-200' : 'border-slate-50 bg-slate-50/50'}`}>
                  <span className="font-black text-slate-800 text-lg">{id === '1-2' ? 'সরদারপাড়া (১-২ কিমি) - ৳২০' : id === '3' ? 'পার্শ্ববর্তী এলাকা (৩ কিমি) - ৳৩০' : 'দূরবর্তী এলাকা (৪-৫ কিমি) - ৳৪০'}</span>
                </button>
              ))}
            </div>
            <textarea 
              placeholder="বিস্তারিত ঠিকানা লিখুন..." 
              value={deliveryAddress} 
              onChange={(e) => {
                setDeliveryAddress(e.target.value);
                if (e.target.value.trim()) setErrors(prev => ({ ...prev, address: false }));
              }} 
              className={`w-full h-40 p-7 rounded-[2.5rem] border-2 outline-none font-bold text-xl shadow-inner resize-none transition-all ${errors.address ? 'border-red-300 bg-red-50' : 'bg-slate-50 border-slate-100'}`} 
            />
          </div>

          <div className="clay-card p-8 rounded-[3.5rem] space-y-8 shadow-xl">
            <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest">পেমেন্ট মেথড (ডেলিভারি চার্জ)</h3>
            <div className="grid grid-cols-3 gap-4">
              {['bkash', 'nagad', 'rocket'].map(m => (
                <button key={m} onClick={() => setPaymentMethod(m as PaymentMethod)} className={`p-5 rounded-[2rem] border-2 transition-all flex flex-col items-center gap-2 ${paymentMethod === m ? 'border-blue-500 bg-blue-50 shadow-md scale-105' : 'border-slate-50 opacity-70'}`}>
                  <i className={`fa-solid ${m === 'bkash' ? 'fa-mobile-screen text-pink-600' : m === 'nagad' ? 'fa-fire text-orange-600' : 'fa-bolt text-purple-600'} text-4xl`}></i>
                  <span className="font-black text-[12px] uppercase mt-1">{m}</span>
                </button>
              ))}
            </div>

            <div className="p-8 bg-blue-600 rounded-[3rem] text-white space-y-6 shadow-2xl relative overflow-hidden">
              <p className="text-center text-7xl font-black text-orange-400">৳{deliveryCharge}</p>
              <div onClick={handleCopyNumber} className="bg-white p-6 rounded-[2rem] flex items-center justify-between text-slate-900 font-black text-2xl tracking-widest cursor-pointer shadow-inner">
                {officialPaymentPhone} <i className={`fa-solid ${isCopied ? 'fa-check text-emerald-500' : 'fa-copy'} text-2xl`}></i>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
              <div className="space-y-2">
                <input 
                  type="tel" 
                  placeholder="পেমেন্ট নাম্বার" 
                  value={senderNumber} 
                  onChange={(e) => {
                    setSenderNumber(e.target.value);
                    if (e.target.value.trim()) setErrors(prev => ({ ...prev, number: false }));
                  }} 
                  className={`w-full p-7 rounded-[2.2rem] border-2 outline-none font-black text-2xl shadow-inner transition-all ${errors.number ? 'border-red-300 bg-red-50 animate-shake' : 'border-slate-100'}`} 
                />
                {errors.number && <p className="text-[10px] font-black text-red-600 uppercase ml-4">আপনার পেমেন্ট নাম্বারটি দিন</p>}
              </div>
              
              <div className="space-y-2">
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
                  className={`w-full p-7 rounded-[2.2rem] border-2 outline-none font-black text-2xl shadow-inner transition-all ${errors.digits ? 'border-red-300 bg-red-50 animate-shake' : 'border-slate-100'}`} 
                />
                {errors.digits && <p className="text-[10px] font-black text-red-600 uppercase ml-4">ট্রানজাকশনের শেষ ৩ ডিজিট আবশ্যক</p>}
              </div>
            </div>

            <div className="bg-slate-900 p-10 rounded-[3.5rem] text-white space-y-8 shadow-2xl border border-white/5 relative overflow-hidden">
              <div className="space-y-4 border-b border-white/10 pb-6">
                <div className="flex justify-between text-slate-400 text-xs font-black uppercase"><span>ওষুধের মূল্য</span><span className="italic opacity-80">প্রতিনিধি জানাবেন</span></div>
                <div className="flex justify-between text-slate-400 text-xs font-black uppercase"><span>ডেলিভারি চার্জ</span><span className="text-orange-500">৳{deliveryCharge}</span></div>
                <div className="flex justify-between items-center p-6 bg-emerald-500/10 rounded-2xl border border-emerald-500/20 mt-4">
                  <span className="text-[10px] uppercase text-emerald-400">হাতে হাতে দিবেন (Cash)</span>
                  <span className="text-xl font-black text-emerald-400">Cash On Delivery</span>
                </div>
              </div>
              <div className="space-y-1"><p className="text-xs font-black text-blue-400 uppercase tracking-widest">এখন পেমেন্ট (MFS)</p><p className="text-8xl font-black text-white tracking-tighter">৳{deliveryCharge}</p></div>
              <Button variant="success" onClick={handleOrder} className="h-28 text-3xl shadow-[0_20px_60px_rgba(16,185,129,0.3)]" icon={isUploading ? "fa-solid fa-spinner fa-spin" : "fa-solid fa-check-double"}>{isUploading ? "পাঠানো হচ্ছে..." : "অর্ডার নিশ্চিত করুন"}</Button>
              <a href={`tel:${contactPhone}`} className="text-center group block pt-4 relative z-10"><p className="text-xs font-black text-slate-500 uppercase group-hover:text-red-400 transition-colors">খুব জরুরি হলে কল দিন: <span className="text-red-500 text-lg ml-2">{contactPhone}</span></p></a>
            </div>
          </div>
        </div>
      )}

      <div className="text-center mt-12 opacity-40 pb-16"><p className="text-xs font-black text-slate-500 uppercase tracking-[0.5em]">শান্তি মেডিকেয়ার • সরদারপাড়া বাজার • আটোয়ারী, পঞ্চগড়</p></div>
    </div>
  );
};

export default UploadPage;
