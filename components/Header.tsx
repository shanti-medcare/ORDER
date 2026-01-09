
import React, { useRef } from 'react';

interface HeaderProps {
  onHome: () => void;
  onAdminAccess?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onHome, onAdminAccess }) => {
  const timerRef = useRef<number | null>(null);

  const handleTouchStart = () => {
    timerRef.current = window.setTimeout(() => {
      if (onAdminAccess) onAdminAccess();
    }, 3000); // 3 seconds long press for admin access
  };

  const handleTouchEnd = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
  };

  return (
    <header className="sticky top-0 bg-white/95 backdrop-blur-lg border-b border-gray-100 py-3 px-4 z-50 flex items-center justify-between shadow-sm transition-all duration-500">
      <div 
        onClick={onHome}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleTouchStart}
        onMouseUp={handleTouchEnd}
        className="group flex items-center gap-3 cursor-pointer active:scale-95 transition-all duration-300"
      >
        <div className="relative w-12 h-12 flex items-center justify-center shrink-0">
          <div className="relative w-full h-full rounded-2xl overflow-hidden flex items-center justify-center p-1 bg-white border border-gray-100 shadow-sm animate-float-slow">
            <img 
              src="https://raw.githubusercontent.com/AnisurRahman-Anis/medicine-logo/main/shanti-logo.jpg" 
              alt="Shanti Medicare"
              className="w-full h-full object-contain"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                const parent = e.currentTarget.parentElement;
                if (parent) {
                  parent.innerHTML = '<i class="fa-solid fa-pills text-red-600 text-2xl"></i>';
                }
              }}
            />
          </div>
        </div>

        <div className="flex flex-col justify-center">
          <h1 className="text-2xl font-black text-red-600 leading-none tracking-tighter">
            শান্তি
          </h1>
          <span className="text-[10px] font-bold text-slate-500 leading-none tracking-widest mt-1 uppercase">
            মে ডি কে য়া র
          </span>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-100 px-3 py-1.5 rounded-full shadow-sm">
          <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
          <span className="text-[10px] font-black text-emerald-700 uppercase tracking-widest">Open</span>
        </div>
      </div>

      <style>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }
        .animate-float-slow {
          animation: float-slow 3s ease-in-out infinite;
        }
      `}</style>
    </header>
  );
};

export default Header;
