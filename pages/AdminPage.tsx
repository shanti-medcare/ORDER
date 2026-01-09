
import React, { useState, useEffect } from 'react';
import { Order } from '../types';
import Button from '../components/Button';

interface AdminPageProps {
  onBack: () => void;
}

const AdminPage: React.FC<AdminPageProps> = ({ onBack }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [activeTab, setActiveTab] = useState<'pending' | 'confirmed' | 'delivered'>('pending');
  const [viewingOrder, setViewingOrder] = useState<Order | null>(null);
  const [printingOrder, setPrintingOrder] = useState<Order | null>(null);
  const [isPreparingPrint, setIsPreparingPrint] = useState(false);

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem('shanti_orders') || '[]');
    setOrders(savedOrders);
  }, []);

  useEffect(() => {
    if (printingOrder) {
      const timer = setTimeout(() => {
        window.print();
        setPrintingOrder(null);
        setIsPreparingPrint(false);
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, [printingOrder]);

  const updateOrderStatus = (id: string, status: Order['status']) => {
    const updated = orders.map(o => o.id === id ? { ...o, status } : o);
    setOrders(updated);
    localStorage.setItem('shanti_orders', JSON.stringify(updated));
    if (viewingOrder?.id === id) {
      setViewingOrder({ ...viewingOrder, status });
    }
  };

  const handlePrintRequest = (e: React.MouseEvent, order: Order) => {
    e.stopPropagation();
    setIsPreparingPrint(true);
    setPrintingOrder(order);
  };

  const deleteOrder = (id: string) => {
    if (window.confirm('অর্ডারটি চিরতরে মুছে ফেলতে চান?')) {
      const updated = orders.filter(o => o.id !== id);
      setOrders(updated);
      localStorage.setItem('shanti_orders', JSON.stringify(updated));
      setViewingOrder(null);
    }
  };

  const filteredOrders = orders.filter(o => o.status === activeTab);

  return (
    <div className="px-6 py-6 space-y-6 animate-in fade-in duration-500 pb-32 relative">
      
      {/* ১. প্রিন্ট মেমো টেমপ্লেট */}
      {printingOrder && (
        <div className="print-only memo-container">
          <div className="memo-header">
            <h1 className="memo-title">শান্তি মেডিকেয়ার</h1>
            <p className="memo-info font-bold uppercase tracking-tight">ডিজিটাল ফার্মেসি ও জেনারেল স্টোর</p>
            <p className="memo-info">সরদারপাড়া বাজার, রাধানগর ইউনিয়ন, আটোয়ারী</p>
            <p className="memo-info font-bold">মোবাইল: ০১৭১৭৪৭৭৭৬৫, ০১৭৪৫৭০৭১৩৩</p>
            <p className="memo-info">ইমেইল: info.shantimedcare@gmail.com</p>
          </div>

          <div className="flex justify-between items-center bg-black text-white px-2 py-1 my-3 text-[9pt] font-black uppercase">
            <span>ক্যাশ মেমো / ইনভয়েস</span>
            <span>#{printingOrder.id}</span>
          </div>

          <div className="text-[8.5pt] space-y-1 mb-4 border-b-2 border-black border-dotted pb-3">
            <p className="flex justify-between"><strong>তারিখ:</strong> <span>{new Date(printingOrder.timestamp).toLocaleString('bn-BD')}</span></p>
            <p className="flex justify-between"><strong>মোবাইল:</strong> <span>{printingOrder.senderNumber}</span></p>
            <p className="flex justify-between"><strong>ঠিকানা:</strong> <span className="text-right ml-4">{printingOrder.deliveryAddress}</span></p>
          </div>

          <table className="memo-table">
            <thead>
              <tr className="border-b-2 border-black">
                <th className="text-left py-1">বিবরণ</th>
                <th className="text-center py-1">পরিমাণ</th>
                <th className="text-right py-1">মূল্য</th>
              </tr>
            </thead>
            <tbody>
              {printingOrder.items && printingOrder.items.length > 0 ? (
                printingOrder.items.map((item, i) => (
                  <tr key={i} className="border-b border-gray-200">
                    <td className="py-2">{item.medicine.name}</td>
                    <td className="text-center py-2">{item.quantity}</td>
                    <td className="text-right py-2">৳{(item.medicine.price || 0) * item.quantity}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="py-12 text-center italic opacity-60">
                    প্রেসক্রিপশন ভিত্তিক অর্ডার (ছবি সংযুক্ত)
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          <div className="space-y-1 mt-6 pt-3 border-t-2 border-black">
            <div className="flex justify-between text-[9pt]">
              <span>মোট ওষুধের মূল্য:</span>
              <span>৳{printingOrder.items?.reduce((acc, i) => acc + (i.medicine.price || 0) * i.quantity, 0) || 0}</span>
            </div>
            <div className="flex justify-between text-[9pt]">
              <span>ডেলিভারি চার্জ:</span>
              <span>৳{printingOrder.deliveryCharge}</span>
            </div>
            <div className="flex justify-between items-center pt-2 mt-2 border-t-2 border-black font-black text-[13pt]">
              <span className="uppercase tracking-tighter">সর্বমোট বিল:</span>
              <span className="bg-black text-white px-2">৳{(printingOrder.items?.reduce((acc, i) => acc + (i.medicine.price || 0) * i.quantity, 0) || 0) + printingOrder.deliveryCharge}</span>
            </div>
          </div>

          <div className="mt-16 pt-10 flex justify-between text-[8.5pt]">
            <div className="w-32 border-t border-black pt-1 text-center font-bold">ক্রেতার স্বাক্ষর</div>
            <div className="w-32 border-t border-black pt-1 text-center font-bold">বিক্রেতার স্বাক্ষর</div>
          </div>

          <div className="text-center mt-12 text-[7.5pt] italic border-t border-dotted border-gray-400 pt-4">
            "আমাদের সেবায় আপনার সুস্থতাই আমাদের সার্থকতা"
            <br/>
            <strong>ধন্যবাদ</strong>
          </div>
        </div>
      )}

      {/* ২. লোডার */}
      {isPreparingPrint && (
        <div className="fixed inset-0 z-[200] bg-white/95 backdrop-blur-md flex flex-col items-center justify-center no-print animate-in zoom-in duration-300">
          <div className="relative">
             <i className="fa-solid fa-file-invoice-dollar text-7xl text-red-600 animate-bounce"></i>
             <div className="absolute -top-2 -right-2 w-6 h-6 bg-emerald-500 rounded-full animate-ping"></div>
          </div>
          <p className="font-black text-2xl text-slate-800 mt-6 tracking-tight">ইনভয়েস প্রস্তুত হচ্ছে...</p>
          <p className="text-slate-500 font-bold mt-2 text-center px-10">পিডিএফ হিসেবে ডাউনলোড করতে প্রিন্ট অপশনে 'Save as PDF' সিলেক্ট করুন</p>
        </div>
      )}

      {/* ৩. ড্যাশবোর্ড */}
      <div className="no-print space-y-6">
        <div className="flex justify-between items-center">
           <button onClick={onBack} className="w-12 h-12 bg-white border border-slate-100 rounded-2xl flex items-center justify-center shadow-sm active:scale-90 transition-all">
             <i className="fa-solid fa-arrow-left"></i>
           </button>
           <h2 className="text-2xl font-black text-slate-800 tracking-tight">অর্ডার ম্যানেজমেন্ট</h2>
           <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white shadow-lg">
             <i className="fa-solid fa-user-shield"></i>
           </div>
        </div>

        <div className="flex gap-2 p-1.5 bg-slate-100 rounded-[1.5rem] shadow-inner">
          {['pending', 'confirmed', 'delivered'].map(t => (
            <button 
              key={t} 
              onClick={() => setActiveTab(t as any)} 
              className={`flex-1 py-3 rounded-xl font-black text-[11px] uppercase transition-all ${activeTab === t ? 'bg-white text-slate-900 shadow-md' : 'text-slate-500'}`}
            >
              {t === 'pending' ? 'নতুন' : t === 'confirmed' ? 'প্রসেসিং' : 'সম্পন্ন'}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          {filteredOrders.length === 0 ? (
            <div className="py-24 text-center text-slate-400 font-bold bg-white rounded-[3rem] border border-dashed border-slate-200">কোনো অর্ডার পাওয়া যায়নি</div>
          ) : (
            filteredOrders.map(order => (
              <div 
                key={order.id} 
                onClick={() => setViewingOrder(order)}
                className="clay-card p-6 rounded-[2.5rem] flex flex-col gap-4 border-l-8 border-l-red-600 hover:shadow-2xl transition-all cursor-pointer active:scale-[0.98]"
              >
                <div className="flex justify-between items-start">
                   <div className="space-y-1">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">#{order.id}</span>
                      <h4 className="font-black text-lg text-slate-800">{order.senderNumber}</h4>
                      <p className="text-xs font-bold text-slate-400">{new Date(order.timestamp).toLocaleString('bn-BD')}</p>
                   </div>
                   <button 
                     onClick={(e) => handlePrintRequest(e, order)}
                     className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center shadow-sm border border-emerald-100 active:scale-90 transition-all"
                   >
                     <i className="fa-solid fa-print"></i>
                   </button>
                </div>
                
                <p className="text-sm font-bold text-slate-500 leading-snug line-clamp-1 italic">
                  <i className="fa-solid fa-location-dot mr-1 text-red-400"></i> {order.deliveryAddress}
                </p>
                
                <div className="flex items-center justify-between pt-3 border-t border-slate-50">
                  <span className="font-black text-red-600">৳{order.deliveryCharge + (order.items?.reduce((a,c) => a + (c.medicine.price||0)*c.quantity, 0) || 0)}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-blue-600 font-black text-xs uppercase flex items-center gap-1">বিস্তারিত দেখুন <i className="fa-solid fa-chevron-right text-[10px]"></i></span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* ৪. ডিটেইল মোডাল */}
      {viewingOrder && (
        <div className="fixed inset-0 z-[100] bg-slate-900/95 backdrop-blur-xl flex flex-col p-4 no-print animate-in fade-in duration-300">
          <div className="flex-1 bg-white rounded-[3rem] overflow-hidden flex flex-col shadow-2xl border border-white/20">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between shrink-0">
               <div className="flex items-center gap-4">
                  <button onClick={() => setViewingOrder(null)} className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center">
                    <i className="fa-solid fa-xmark text-xl text-slate-800"></i>
                  </button>
                  <h3 className="font-black text-xl tracking-tight">অর্ডারের বিবরণ</h3>
               </div>
               <button 
                onClick={(e) => handlePrintRequest(e, viewingOrder)}
                className="w-14 h-14 bg-emerald-600 text-white rounded-2xl flex items-center justify-center shadow-lg"
               >
                 <i className="fa-solid fa-print text-xl"></i>
               </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-8 pb-32">
              {viewingOrder.imageUrl && (
                <div className="space-y-4">
                  <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-widest px-2">প্রেসক্রিপশন ছবি:</h4>
                  <div className="rounded-[2.5rem] overflow-hidden border-4 border-slate-100 shadow-xl bg-slate-50">
                    <img src={viewingOrder.imageUrl} alt="Prescription" className="w-full h-auto object-contain min-h-[200px]" />
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 gap-6 px-2">
                <div className="p-6 bg-slate-50 rounded-[2rem] space-y-4 border border-slate-100">
                  <div className="flex justify-between items-center border-b border-slate-200 pb-3">
                    <span className="text-slate-500 font-bold">অর্ডার আইডি</span>
                    <span className="font-black text-slate-800">#{viewingOrder.id}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-slate-200 pb-3">
                    <span className="text-slate-500 font-bold">কাস্টমার ফোন</span>
                    <a href={`tel:${viewingOrder.senderNumber}`} className="font-black text-red-600 text-lg flex items-center gap-2">
                      <i className="fa-solid fa-phone"></i> {viewingOrder.senderNumber}
                    </a>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500 font-bold">পেমেন্ট মেথড</span>
                    <span className="font-black uppercase text-blue-600">{viewingOrder.paymentMethod} ({viewingOrder.lastThreeDigits})</span>
                  </div>
                </div>

                <div className="p-6 bg-orange-50 rounded-[2rem] space-y-2 border border-orange-100">
                  <h4 className="text-[10px] font-black text-orange-600 uppercase tracking-widest">ডেলিভারি ঠিকানা</h4>
                  <p className="font-black text-slate-800 text-lg leading-relaxed italic">
                    <i className="fa-solid fa-location-dot mr-2 text-red-500"></i> {viewingOrder.deliveryAddress}
                  </p>
                </div>
              </div>

              <div className="space-y-4 px-2">
                <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-widest">ওষুধের তালিকা:</h4>
                <div className="space-y-3 bg-slate-50 rounded-[2rem] p-4 border border-slate-100">
                  {viewingOrder.items && viewingOrder.items.length > 0 ? (
                    viewingOrder.items.map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center p-4 bg-white rounded-2xl border border-slate-200/50 shadow-sm">
                        <div className="flex flex-col">
                          <span className="font-black text-slate-800">{item.medicine.name}</span>
                          <span className="text-xs text-slate-500 font-bold">৳{item.medicine.price} x {item.quantity}</span>
                        </div>
                        <span className="font-black text-red-600">৳{(item.medicine.price || 0) * item.quantity}</span>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-10 space-y-2">
                       <i className="fa-solid fa-camera text-slate-200 text-5xl"></i>
                       <p className="italic text-slate-400">ছবি দেখে ইনভয়েস কনফার্ম করুন</p>
                    </div>
                  )}
                  
                  <div className="pt-4 mt-2 border-t border-slate-200 space-y-2">
                    <div className="flex justify-between text-slate-500 font-bold px-2">
                       <span>ডেলিভারি চার্জ</span>
                       <span>৳{viewingOrder.deliveryCharge}</span>
                    </div>
                    <div className="flex justify-between items-center px-2 pt-2 border-t border-slate-200">
                       <span className="font-black text-slate-800">সর্বমোট:</span>
                       <span className="text-2xl font-black text-red-600">৳{viewingOrder.deliveryCharge + (viewingOrder.items?.reduce((a,c) => a + (c.medicine.price||0)*c.quantity, 0) || 0)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-slate-100 bg-white shadow-[0_-20px_40px_rgba(0,0,0,0.05)] shrink-0 space-y-3">
              <div className="flex gap-4">
                {viewingOrder.status === 'pending' && (
                  <Button variant="success" onClick={() => updateOrderStatus(viewingOrder.id, 'confirmed')} icon="fa-solid fa-check">অর্ডার কনফার্ম</Button>
                )}
                {viewingOrder.status === 'confirmed' && (
                  <Button variant="primary" onClick={() => updateOrderStatus(viewingOrder.id, 'delivered')} icon="fa-solid fa-truck">ডেলিভারি সম্পন্ন</Button>
                )}
                <button 
                  onClick={() => deleteOrder(viewingOrder.id)}
                  className="w-20 h-20 bg-rose-50 text-rose-600 rounded-[1.8rem] flex items-center justify-center border-2 border-rose-100 shadow-sm"
                >
                  <i className="fa-solid fa-trash-can text-2xl"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <div className="text-center opacity-10 no-print pt-10">
         <p className="text-xs font-black uppercase tracking-[0.5em]">শান্তি মেডিকেয়ার অ্যাডমিন প্যানেল</p>
      </div>
    </div>
  );
};

export default AdminPage;
