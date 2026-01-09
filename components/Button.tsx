import React from 'react';

interface ButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'outline';
  className?: string;
  icon?: string;
  fullWidth?: boolean;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ 
  onClick, 
  children, 
  variant = 'primary', 
  className = '', 
  icon,
  fullWidth = true,
  disabled = false
}) => {
  const baseStyles = "relative overflow-hidden flex items-center justify-center gap-4 py-5 px-8 rounded-[2rem] font-black text-xl transition-all duration-300 shadow-xl select-none active:translate-y-1 active:shadow-md";
  
  const variants = {
    primary: "bg-red-600 text-white shadow-red-200/50 border-b-[6px] border-red-800",
    secondary: "bg-blue-600 text-white shadow-blue-200/50 border-b-[6px] border-blue-800",
    danger: "bg-rose-500 text-white shadow-rose-200/50 border-b-[6px] border-rose-700",
    success: "bg-emerald-600 text-white shadow-emerald-200/50 border-b-[6px] border-emerald-800",
    outline: "bg-white text-slate-700 border-2 border-slate-100 hover:border-red-200 hover:bg-red-50 shadow-none active:border-b-2"
  };

  const disabledStyles = "opacity-50 cursor-not-allowed grayscale active:translate-y-0";

  return (
    <button 
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${disabled ? disabledStyles : ''} ${className}`}
    >
      {/* Glossy overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent pointer-events-none"></div>
      
      {icon && <i className={`${icon} ${children ? 'text-2xl' : 'text-xl'} drop-shadow-sm`}></i>}
      <span className="relative z-10 uppercase tracking-tight drop-shadow-sm">{children}</span>
    </button>
  );
};

export default Button;