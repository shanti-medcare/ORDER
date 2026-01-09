
import React from 'react';
import Button from '../components/Button';

interface CallPageProps {
  onBack: () => void;
}

const CallPage: React.FC<CallPageProps> = ({ onBack }) => {
  const whatsappNumber = "8801717477765";
  const facebookUrl = "https://www.facebook.com/ShantiMedicareBD";
  const officialPhoneWithCode = "+8801717477765";

  return (
    <div className="px-6 space-y-8 py-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-32">
      <div className="flex items-center gap-5">
        <button onClick={onBack} className="w-14 h-14 bg-white border border-slate-100 rounded-2xl flex items-center justify-center text-slate-800 shadow-sm active:scale-90 transition-all">
          <i className="fa-solid fa-arrow-left text-xl"></i>
        </button>
        <div>
          <h2 className="text-3xl font-black text-slate-800 tracking-tight">যোগাযোগ করুন</h2>
          <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">সরাসরি কথা বলে অর্ডার দিন</p>
        </div>
      </div>

      <div className="clay-card rounded-[3.5rem] p-12 flex flex-col items-center text-center space-y-8">
        <div className="w-32 h-32 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center shadow-inner relative">
          <i className="fa-solid fa-phone-volume text-6xl animate-pulse"></i>
          <div className="absolute inset-0 rounded-full border-4 border-emerald-100 animate-ping"></div>
        </div>

        <div className="space-y-2">
          <h3 className="text-3xl font-black text-slate-900 leading-tight">সহজেই অর্ডার দিন</h3>
          <p className="text-lg text-slate-500 font-bold px-4 leading-relaxed">
            আমরা আছি আপনার অপেক্ষায়। ফোন বা মেসেজে অর্ডার করতে নিচের বাটন ব্যবহার করুন।
          </p>
        </div>

        <div className="w-full space-y-4 pt-4">
          <a href={`tel:${officialPhoneWithCode}`} className="block w-full">
            <Button variant="primary" icon="fa-solid fa-phone" className="h-20 text-2xl">
              সরাসরি কল দিন
            </Button>
          </a>

          <a 
            href={`https://wa.me/${whatsappNumber}`} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-4 h-20 bg-[#25D366] text-white rounded-[1.8rem] font-black text-2xl shadow-xl shadow-green-100 active:translate-y-1 transition-all w-full border-b-[6px] border-[#128C7E]"
          >
            <i className="fa-brands fa-whatsapp text-4xl"></i>
            হোয়াটসঅ্যাপ মেসেজ
          </a>

          <a 
            href={facebookUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-4 h-20 bg-[#1877F2] text-white rounded-[1.8rem] font-black text-2xl shadow-xl shadow-blue-100 active:translate-y-1 transition-all w-full border-b-[6px] border-[#0e5cad]"
          >
            <i className="fa-brands fa-facebook text-4xl"></i>
            ফেসবুক পেজ
          </a>
        </div>
      </div>

      <div className="bg-blue-600 rounded-[3rem] p-10 text-white space-y-6 shadow-2xl relative overflow-hidden">
        <div className="relative z-10">
          <h4 className="font-black text-xl uppercase tracking-tighter mb-4">গুরুত্বপূর্ণ তথ্য:</h4>
          
          <div className="space-y-4">
            <div className="flex gap-4 items-start">
              <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center shrink-0">
                <i className="fa-solid fa-clock text-xl"></i>
              </div>
              <div>
                <p className="text-[11px] font-black text-blue-200 uppercase tracking-widest">সময়সূচী</p>
                <p className="text-xl font-black">সকাল ৮ - রাত ১০ টা</p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center shrink-0">
                <i className="fa-solid fa-location-crosshairs text-xl"></i>
              </div>
              <div>
                <p className="text-[11px] font-black text-blue-200 uppercase tracking-widest">ডেলিভারি এলাকা</p>
                <p className="text-xl font-black">সরদারপাড়া ও রাধানগর এলাকা</p>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/5 rounded-full"></div>
      </div>

      <div className="text-center opacity-30 py-4">
         <p className="text-sm font-black text-slate-500 uppercase tracking-[0.3em]">সরদারপাড়া বাজার • রাধানগর ইউনিয়ন • আটোয়ারী</p>
      </div>
    </div>
  );
};

export default CallPage;
