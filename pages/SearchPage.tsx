
import React, { useState, useMemo } from 'react';
import { interpretNoteAI } from '../services/geminiService';
import { Medicine } from '../types';
import Button from '../components/Button';

interface SearchPageProps {
  onBack: () => void;
  onAddMultipleToCart: (items: { medicine: Medicine; quantity: number }[]) => void;
}

const SearchPage: React.FC<SearchPageProps> = ({ onBack, onAddMultipleToCart }) => {
  const [note, setNote] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [interpretedItems, setInterpretedItems] = useState<any[]>([]);
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [unitPrices, setUnitPrices] = useState<Record<string, number>>({}); // ওষুধের রেট ট্র্যাক করার জন্য
  const [selectedItems, setSelectedItems] = useState<Record<string, boolean>>({});

  const handleProcessOrder = async () => {
    if (!note.trim()) {
      setError(true);
      setTimeout(() => setError(false), 2000);
      return;
    }
    setError(false);
    setLoading(true);
    const data = await interpretNoteAI(note);
    if (data && data.items) {
      setInterpretedItems(data.items);
      const initialQty: Record<string, number> = {};
      const initialPrices: Record<string, number> = {};
      const initialSelected: Record<string, boolean> = {};
      
      data.items.forEach((item: any) => {
        initialQty[item.name] = item.quantity || 1;
        initialPrices[item.name] = item.price || 0;
        initialSelected[item.name] = true;
      });
      
      setQuantities(initialQty);
      setUnitPrices(initialPrices);
      setSelectedItems(initialSelected);
    }
    setLoading(false);
  };

  const adjustQty = (name: string, delta: number) => {
    setQuantities(prev => ({
      ...prev,
      [name]: Math.max(1, (prev[name] || 1) + delta)
    }));
  };

  const updatePrice = (name: string, newPrice: string) => {
    const price = parseFloat(newPrice) || 0;
    setUnitPrices(prev => ({
      ...prev,
      [name]: price
    }));
  };

  const toggleSelection = (name: string) => {
    setSelectedItems(prev => ({
      ...prev,
      [name]: !prev[name]
    }));
  };

  const totalSum = useMemo(() => {
    return interpretedItems.reduce((acc, item) => {
      if (selectedItems[item.name]) {
        const currentPrice = unitPrices[item.name] ?? item.price;
        const currentQty = quantities[item.name] || 1;
        return acc + (currentPrice * currentQty);
      }
      return acc;
    }, 0);
  }, [interpretedItems, quantities, unitPrices, selectedItems]);

  const selectedCount = useMemo(() => {
    return Object.values(selectedItems).filter(Boolean).length;
  }, [selectedItems]);

  const handleAddAllToCart = () => {
    const toAdd = interpretedItems
      .filter(item => selectedItems[item.name])
      .map(item => ({
        medicine: {
          id: Math.random().toString(),
          name: item.name,
          price: unitPrices[item.name] ?? item.price,
          category: item.category,
          description: 'AI detected'
        },
        quantity: quantities[item.name] || 1
      }));
    
    if (toAdd.length > 0) {
      onAddMultipleToCart(toAdd);
    }
  };

  return (
    <div className="px-6 space-y-8 py-7 pb-60 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="flex items-center gap-5">
        <button onClick={onBack} className="w-12 h-12 rounded-2xl bg-white border border-slate-100 shadow-sm flex items-center justify-center text-slate-800 active:scale-90 transition-all">
          <i className="fa-solid fa-arrow-left"></i>
        </button>
        <div>
          <h2 className="text-2xl font-black text-slate-800 tracking-tight">ওষুধের তালিকা দিন</h2>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">ডিজিটাল প্রেসক্রিপশন অর্ডার</p>
        </div>
      </div>

      <div className={`relative group ${error ? 'animate-shake' : ''}`}>
        <div className={`absolute inset-0 rounded-[2.5rem] transform rotate-1 transition-all ${error ? 'bg-red-100 rotate-0 ring-4 ring-red-500' : 'bg-amber-50 group-focus-within:rotate-0'}`}></div>
        <div className="relative clay-card rounded-[2.5rem] p-8 space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${error ? 'bg-red-600 animate-pulse' : 'bg-red-500'}`}></div>
                <label className={`text-xs font-black uppercase tracking-widest ${error ? 'text-red-600' : 'text-slate-500'}`}>
                  আপনার তালিকাটি লিখুন
                </label>
              </div>
              {error && <span className="text-[10px] font-black text-red-600 uppercase">এটি ফাঁকা রাখা যাবে না</span>}
            </div>
            <textarea 
              value={note}
              onChange={(e) => {
                setNote(e.target.value);
                if (e.target.value.trim()) setError(false);
              }}
              placeholder="যেমন: &#10;নাপা এক্সট্রা ৫টা &#10;ওমিপ্রাজল ১০ পিস..."
              className={`w-full h-52 p-0 text-2xl font-bold bg-transparent border-none focus:ring-0 outline-none text-slate-800 placeholder-slate-300 resize-none leading-relaxed notepad-lines ${error ? 'placeholder-red-300' : ''}`}
            />
          </div>

          <button 
            onClick={handleProcessOrder}
            disabled={loading}
            className={`w-full h-20 text-white rounded-[1.8rem] font-black text-2xl flex items-center justify-center gap-4 shadow-xl active:scale-95 transition-all border-b-[6px] ${loading ? 'bg-slate-400 border-slate-600' : error ? 'bg-red-600 border-red-800 shadow-red-100' : 'bg-red-600 border-red-800 shadow-red-100'}`}
          >
            {loading ? <i className="fa-solid fa-spinner fa-spin text-3xl"></i> : <i className="fa-solid fa-wand-magic-sparkles text-3xl"></i>}
            {loading ? "প্রসেস হচ্ছে..." : "লিস্ট চেক করুন"}
          </button>
        </div>
      </div>

      {interpretedItems.length > 0 && (
        <div className="space-y-5 animate-in fade-in slide-in-from-bottom-6 duration-500">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest">সনাক্তকৃত ওষুধসমূহ ({interpretedItems.length}):</h3>
            <button 
              onClick={() => {
                const allSelected = Object.values(selectedItems).every(Boolean);
                const newState: Record<string, boolean> = {};
                interpretedItems.forEach(item => newState[item.name] = !allSelected);
                setSelectedItems(newState);
              }}
              className="text-[11px] font-black text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1.5 rounded-full"
            >
              {Object.values(selectedItems).every(Boolean) ? 'সব বাদ দিন' : 'সবগুলো যোগ করুন'}
            </button>
          </div>
          
          <div className="space-y-4">
            {interpretedItems.map((item, idx) => {
              const isSelected = selectedItems[item.name];
              const qty = quantities[item.name] || 1;
              const price = unitPrices[item.name] ?? item.price;
              const subtotal = price * qty;

              return (
                <div 
                  key={idx} 
                  className={`clay-card p-6 rounded-[2.5rem] flex flex-col gap-4 border-2 transition-all ${isSelected ? 'border-red-500 bg-red-50/10' : 'border-transparent'}`}
                >
                  <div className="flex items-start gap-4">
                    <button 
                      onClick={() => toggleSelection(item.name)}
                      className={`w-10 h-10 rounded-[1.2rem] flex items-center justify-center border-2 transition-all shrink-0 mt-1 ${isSelected ? 'bg-red-600 border-red-600 text-white shadow-lg' : 'bg-slate-50 border-slate-200 text-transparent'}`}
                    >
                      <i className="fa-solid fa-check text-base"></i>
                    </button>

                    <div className="flex-1 min-w-0">
                      <h4 className={`font-black text-xl transition-colors truncate ${isSelected ? 'text-slate-900' : 'text-slate-400'}`}>
                        {item.name}
                      </h4>
                      <div className="flex flex-wrap items-center gap-2 mt-2">
                        {/* রেট এডিট করার ইনপুট ফিল্ড */}
                        <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border-2 transition-all ${isSelected ? 'bg-white border-red-100' : 'bg-slate-50 border-slate-100 opacity-50'}`}>
                          <span className="text-[10px] font-black text-slate-400">৳</span>
                          <input 
                            type="number" 
                            value={price}
                            onChange={(e) => updatePrice(item.name, e.target.value)}
                            disabled={!isSelected}
                            className="w-14 bg-transparent font-black text-sm text-slate-800 outline-none"
                          />
                          <span className="text-[10px] font-black text-slate-400 uppercase">পিস</span>
                        </div>
                        <span className="font-black text-red-600 text-lg ml-auto">৳{subtotal.toFixed(0)}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center bg-slate-100 rounded-2xl p-1.5 border border-slate-200 shadow-inner scale-95 origin-right">
                      <button onClick={() => adjustQty(item.name, -1)} className="w-10 h-10 flex items-center justify-center bg-white rounded-xl shadow-sm text-xl font-black text-slate-800 active:scale-90">-</button>
                      <span className="w-10 text-center font-black text-lg text-slate-800">{qty}</span>
                      <button onClick={() => adjustQty(item.name, 1)} className="w-10 h-10 flex items-center justify-center bg-white rounded-xl shadow-sm text-xl font-black text-slate-800 active:scale-90">+</button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {interpretedItems.length > 0 && (
        <div className="fixed bottom-28 left-1/2 -translate-x-1/2 w-[92%] max-w-[400px] z-40 animate-in slide-in-from-bottom-12 duration-700">
          <div className="bg-slate-900 rounded-[3rem] p-7 shadow-[0_25px_60px_rgba(0,0,0,0.5)] border border-white/10 flex items-center justify-between gap-6 overflow-hidden">
            <div className="flex flex-col gap-1 relative z-10">
               <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] leading-none">মোট ওষুধ: {selectedCount}টি</p>
               <p className="text-4xl font-black text-white tracking-tighter">৳{totalSum.toFixed(0)}</p>
            </div>
            <button 
              onClick={handleAddAllToCart}
              disabled={selectedCount === 0}
              className="flex-1 h-20 bg-red-600 text-white rounded-[1.8rem] font-black text-xl flex items-center justify-center gap-3 shadow-2xl active:scale-95 disabled:opacity-50 disabled:grayscale transition-all border-b-[6px] border-red-800 relative z-10"
            >
              <i className="fa-solid fa-cart-arrow-down text-2xl"></i>
              কার্টে নিন
            </button>
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          </div>
        </div>
      )}
      
      <div className="text-center opacity-30 pt-10 pb-4">
         <p className="text-xs font-black text-slate-500 uppercase tracking-[0.4em]">সরদারপাড়া বাজার • আটোয়ারী, পঞ্চগড়</p>
      </div>
    </div>
  );
};

export default SearchPage;
