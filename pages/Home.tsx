
import React from 'react';
import { Page } from '../types';

interface HomeProps {
  onNavigate: (page: Page) => void;
}

const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  const whatsappNumber = "8801717477765";
  const officialPhone = "+8801717477765";
  const facebookUrl = "https://www.facebook.com/ShantiMedicareBD";

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-1000">
      {/* 1. Hero Section */}
      <section className="px-6 pt-8">
        <div className="relative clay-card rounded-[3.5rem] p-10 overflow-hidden group">
          <div className="relative z-10 flex flex-col items-center text-center space-y-6">
            <div className="space-y-1">
               <h2 className="text-8xl font-black text-red-600 leading-none tracking-tighter drop-shadow-md">শান্তি</h2>
               <p className="text-lg font-bold text-slate-400 tracking-[0.4em] uppercase">মেডিকেয়ার</p>
            </div>
            
            <div className="py-3 px-8 bg-red-50 border border-red-100 rounded-full inline-block shadow-inner">
              <p className="text-red-700 font-black italic text-lg leading-none">
                "স্বাস্থ্যের পাশে, শান্তির সাথে"
              </p>
            </div>

            <div className="flex items-center gap-3 mt-4 px-4 py-2 bg-slate-50 rounded-2xl border border-slate-100">
               <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
               <p className="text-[11px] font-black text-slate-500 uppercase tracking-widest leading-none">
                 সরদারপাড়া বাজারের বিশ্বস্ত ডিজিটাল ফার্মেসি
               </p>
            </div>
          </div>
          
          <div className="absolute -top-10 -left-10 w-48 h-48 bg-red-100/40 rounded-full blur-3xl opacity-50 group-hover:opacity-100 transition-opacity"></div>
          <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-emerald-100/40 rounded-full blur-3xl opacity-50 group-hover:opacity-100 transition-opacity"></div>
        </div>
      </section>

      {/* 2. Main Actions */}
      <div className="px-6 grid grid-cols-1 gap-6">
        <button 
          onClick={() => onNavigate(Page.SEARCH)}
          className="clay-card rounded-[3rem] p-8 flex items-center gap-8 active:scale-95 transition-all text-left border-l-[12px] border-l-red-600 hover:bg-slate-50/50"
        >
          <div className="w-24 h-24 bg-red-100 text-red-600 rounded-[2.5rem] flex items-center justify-center shrink-0 shadow-inner group-hover:scale-110 transition-transform">
            <i className="fa-solid fa-list-check text-4xl"></i>
          </div>
          <div className="flex-1 space-y-1">
            <h3 className="text-3xl font-black text-slate-800 leading-tight">ওষুধের তালিকা</h3>
            <p className="text-slate-500 text-sm font-bold">নাম লিখে অর্ডার করুন</p>
          </div>
          <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-slate-400">
            <i className="fa-solid fa-chevron-right"></i>
          </div>
        </button>

        <button 
          onClick={() => onNavigate(Page.UPLOAD)}
          className="clay-card rounded-[3rem] p-8 flex items-center gap-8 active:scale-95 transition-all text-left border-l-[12px] border-l-emerald-600 hover:bg-slate-50/50"
        >
          <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-[2.5rem] flex items-center justify-center shrink-0 shadow-inner group-hover:scale-110 transition-transform">
            <i className="fa-solid fa-camera-retro text-4xl"></i>
          </div>
          <div className="flex-1 space-y-1">
            <h3 className="text-3xl font-black text-slate-800 leading-tight">ছবি তুলে পাঠান</h3>
            <p className="text-slate-500 text-sm font-bold">প্রেসক্রিপশন আপলোড করুন</p>
          </div>
          <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-slate-400">
            <i className="fa-solid fa-chevron-right"></i>
          </div>
        </button>
      </div>

      {/* 3. Why Us Section */}
      <section className="px-6 space-y-6">
        <div className="text-center">
           <h3 className="text-2xl font-black text-slate-800 tracking-tight">কেন আমরা সেরা?</h3>
           <div className="w-16 h-1 bg-red-600 mx-auto mt-2 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <div className="flex gap-5 p-6 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm">
             <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center shrink-0">
                <i className="fa-solid fa-shield-halved text-2xl"></i>
             </div>
             <div>
                <h4 className="font-black text-slate-800 text-lg">১০০% অরিজিনাল ওষুধ</h4>
                <p className="text-sm text-slate-500 font-medium">আমরা সরাসরি কোম্পানি থেকে সংগৃহীত অরিজিনাল ওষুধ সরবরাহ করি।</p>
             </div>
          </div>

          <div className="flex gap-5 p-6 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm">
             <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center shrink-0">
                <i className="fa-solid fa-truck-bolt text-2xl"></i>
             </div>
             <div>
                <h4 className="font-black text-slate-800 text-lg">দ্রুত হোম ডেলিভারি</h4>
                <p className="text-sm text-slate-500 font-medium">আপনার প্রয়োজনে মাত্র ৬০ মিনিটের মধ্যে ওষুধ পৌঁছে যাবে আপনার দরজায়।</p>
             </div>
          </div>

          <div className="flex gap-5 p-6 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm">
             <div className="w-16 h-16 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center shrink-0">
                <i className="fa-solid fa-user-doctor text-2xl"></i>
             </div>
             <div>
                <h4 className="font-black text-slate-800 text-lg">অভিজ্ঞ পরামর্শ</h4>
                <p className="text-sm text-slate-500 font-medium">ওষুধের ডোজ ও ব্যবহার বিধি নিয়ে অভিজ্ঞ ফার্মাসিস্টের পরামর্শ।</p>
             </div>
          </div>
        </div>
      </section>

      {/* 4. Urgent Action */}
      <section className="px-6">
        <div className="bg-slate-900 rounded-[3.5rem] p-10 text-white shadow-2xl relative overflow-hidden">
          <div className="relative z-10 flex flex-col items-center text-center space-y-8">
            <div className="w-24 h-24 bg-red-600 text-white rounded-full flex items-center justify-center animate-bounce shadow-[0_0_30px_rgba(220,38,38,0.5)]">
              <i className="fa-solid fa-phone-volume text-4xl"></i>
            </div>
            <div className="space-y-2">
              <h4 className="text-3xl font-black uppercase tracking-tight">সরাসরি কথা বলুন</h4>
              <p className="text-sm text-slate-400 font-bold uppercase tracking-widest">যেকোনো তথ্যের জন্য কল বা মেসেজ দিন</p>
            </div>
            
            <div className="grid grid-cols-1 w-full gap-4">
              <a href={`tel:${officialPhone}`} className="h-20 bg-white text-slate-900 rounded-[1.5rem] flex items-center justify-center gap-4 font-black text-2xl active:scale-95 transition-all shadow-xl">
                 <i className="fa-solid fa-phone text-red-600"></i> কল দিন
              </a>
              <a href={`https://wa.me/${whatsappNumber}`} target="_blank" className="h-20 bg-[#25D366] text-white rounded-[1.5rem] flex items-center justify-center gap-4 font-black text-2xl active:scale-95 transition-all shadow-xl">
                 <i className="fa-brands fa-whatsapp text-3xl"></i> হোয়াটসঅ্যাপ
              </a>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
        </div>
      </section>

      {/* 5. Professional Footer */}
      <footer className="bg-slate-950 text-white pt-20 pb-40 relative overflow-hidden">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
           <div className="grid grid-cols-6 gap-10 rotate-12 -translate-y-20">
              {[...Array(24)].map((_, i) => <i key={i} className="fa-solid fa-prescription-bottle-medical text-6xl"></i>)}
           </div>
        </div>

        <div className="px-8 space-y-16 relative z-10">
          {/* Brand Info & About */}
          <div className="space-y-8">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white rounded-[1.4rem] p-1 flex items-center justify-center shadow-lg">
                <img 
                  src="https://raw.githubusercontent.com/AnisurRahman-Anis/medicine-logo/main/shanti-logo.jpg" 
                  alt="Logo" 
                  className="w-full h-full object-contain" 
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.parentElement!.innerHTML = '<i class="fa-solid fa-hand-holding-medical text-red-600 text-3xl"></i>';
                  }}
                />
              </div>
              <div>
                <h4 className="text-3xl font-black text-red-500 leading-none tracking-tighter">শান্তি মেডিকেয়ার</h4>
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mt-2">সরদারপাড়া বাজার, আটোয়ারী</p>
              </div>
            </div>
            <div className="space-y-4">
               <h5 className="text-lg font-black text-slate-200">আমাদের সম্পর্কে:</h5>
               <p className="text-slate-400 text-sm leading-relaxed font-medium">
                  আটোয়ারী উপজেলার সরদারপাড়া বাজারের একমাত্র বিশ্বস্ত ডিজিটাল ফার্মেসি। আমাদের লক্ষ্য হচ্ছে সঠিক সময়ে সঠিক ওষুধ আপনার হাতে পৌঁছে দেওয়া। আমরা আপনার ও আপনার পরিবারের সুস্বাস্থ্যের প্রতি অঙ্গীকারবদ্ধ। 
               </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-10">
            {/* Quick Links */}
            <div className="space-y-6">
              <h5 className="text-[10px] font-black uppercase tracking-widest text-slate-500 border-b border-white/10 pb-2">প্রয়োজনীয় লিঙ্ক</h5>
              <ul className="space-y-4">
                <li><button onClick={() => onNavigate(Page.SEARCH)} className="text-slate-300 font-bold hover:text-red-500 transition-colors flex items-center gap-2"><i className="fa-solid fa-circle text-[6px] text-red-600"></i> ওষুধ অর্ডার</button></li>
                <li><button onClick={() => onNavigate(Page.UPLOAD)} className="text-slate-300 font-bold hover:text-red-500 transition-colors flex items-center gap-2"><i className="fa-solid fa-circle text-[6px] text-red-600"></i> ছবি পাঠান</button></li>
                <li><button onClick={() => onNavigate(Page.CALL)} className="text-slate-300 font-bold hover:text-red-500 transition-colors flex items-center gap-2"><i className="fa-solid fa-circle text-[6px] text-red-600"></i> যোগাযোগ</button></li>
              </ul>
            </div>

            {/* Social Connect */}
            <div className="space-y-6">
              <h5 className="text-[10px] font-black uppercase tracking-widest text-slate-500 border-b border-white/10 pb-2">সোশ্যাল মিডিয়া</h5>
              <div className="flex flex-col gap-4">
                <a href={facebookUrl} target="_blank" className="flex items-center gap-3 text-slate-300 font-bold hover:text-blue-500 transition-colors">
                  <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center border border-white/10">
                    <i className="fa-brands fa-facebook-f text-lg"></i>
                  </div>
                  ফেসবুক পেজ
                </a>
                <a href={`https://wa.me/${whatsappNumber}`} target="_blank" className="flex items-center gap-3 text-slate-300 font-bold hover:text-emerald-500 transition-colors">
                  <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center border border-white/10">
                    <i className="fa-brands fa-whatsapp text-lg"></i>
                  </div>
                  হোয়াটসঅ্যাপ
                </a>
              </div>
            </div>
          </div>

          {/* Contact Details Card */}
          <div className="p-8 bg-white/5 rounded-[2.5rem] border border-white/10 space-y-6 shadow-inner">
             <div className="flex gap-5 items-start">
                <div className="w-10 h-10 bg-red-600/10 text-red-500 rounded-xl flex items-center justify-center shrink-0 border border-red-600/20">
                  <i className="fa-solid fa-location-dot"></i>
                </div>
                <div>
                   <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">ঠিকানা</p>
                   <p className="text-sm text-slate-300 font-bold leading-relaxed">সরদারপাড়া বাজার, রাধানগর ইউনিয়ন, আটোয়ারী, পঞ্চগড়।</p>
                </div>
             </div>
             <div className="flex gap-5 items-start">
                <div className="w-10 h-10 bg-red-600/10 text-red-500 rounded-xl flex items-center justify-center shrink-0 border border-red-600/20">
                  <i className="fa-solid fa-phone"></i>
                </div>
                <div>
                   <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">মোবাইল</p>
                   <p className="text-sm text-slate-300 font-bold">+৮৮০ ১৭১৭ ৪৭৭৭৬৫</p>
                </div>
             </div>
             <div className="flex gap-5 items-start">
                <div className="w-10 h-10 bg-red-600/10 text-red-500 rounded-xl flex items-center justify-center shrink-0 border border-red-600/20">
                  <i className="fa-solid fa-envelope"></i>
                </div>
                <div>
                   <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">ইমেইল</p>
                   <p className="text-sm text-slate-300 font-bold">info.shantimedcare@gmail.com</p>
                </div>
             </div>
          </div>

          {/* Bottom Branding & Trust */}
          <div className="pt-10 border-t border-white/5 text-center space-y-8">
            <div className="flex items-center justify-center gap-10 opacity-20 grayscale">
               <div className="flex flex-col items-center gap-2">
                 <i className="fa-solid fa-award text-3xl"></i>
                 <span className="text-[8px] font-black uppercase">Licensed</span>
               </div>
               <div className="flex flex-col items-center gap-2">
                 <i className="fa-solid fa-user-check text-3xl"></i>
                 <span className="text-[8px] font-black uppercase">Verified</span>
               </div>
               <div className="flex flex-col items-center gap-2">
                 <i className="fa-solid fa-heart-pulse text-3xl"></i>
                 <span className="text-[8px] font-black uppercase">Trusted</span>
               </div>
            </div>
            
            <div className="space-y-2">
              <p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.4em]">© ২০২৪ শান্তি মেডিকেয়ার • সর্বস্বত্ব সংরক্ষিত</p>
              <p className="text-[9px] font-bold text-slate-700 uppercase tracking-widest italic">ডিজিটাল সেবায় আপনার পাশের ফার্মেসি</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
