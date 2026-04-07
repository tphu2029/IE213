import { useOutletContext } from 'react-router';
import { AdminContextType } from './AdminLayout';
import { Plus, Trash2, CreditCard, Landmark, Wallet, Banknote } from 'lucide-react';

export function AdminPaymentMethods() {
  const { paymentMethods = [] } = useOutletContext<AdminContextType>();

  const getIcon = (type: string) => {
    switch (type) {
      case 'credit_card': return <CreditCard size={20} className="text-blue-500" />;
      case 'bank_transfer': return <Landmark size={20} className="text-emerald-500" />;
      case 'digital_wallet': return <Wallet size={20} className="text-orange-500" />;
      case 'cash': return <Banknote size={20} className="text-gray-500" />;
      default: return <CreditCard size={20} />;
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-[24px] shadow-sm border border-gray-100 dark:border-gray-800 p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-black dark:text-white">Cấu hình thanh toán</h2>
          <p className="text-gray-500 text-sm font-medium">Quản lý các cổng và phương thức thanh toán của bệnh viện</p>
        </div>
        <button
          onClick={() => alert('Chức năng cấu hình thanh toán đang trong lộ trình phát triển (v2.0)')}
          className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20 font-bold text-sm shrink-0"
        >
          <Plus size={18} />
          Thêm phương thức
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paymentMethods.length === 0 ? (
          <div className="col-span-full py-24 text-center bg-gray-50 dark:bg-gray-800/50 rounded-[32px] border-2 border-dashed border-gray-100 dark:border-gray-800">
            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <CreditCard size={32} className="text-gray-300" />
            </div>
            <p className="text-gray-400 max-w-xs mx-auto">Chưa có phương thức thanh toán nào được cấu hình. Hệ thống hiện đang hỗ trợ thanh toán trực tiếp tại quầy.</p>
          </div>
        ) : paymentMethods.map(method => (
          <div key={method.id} className="group bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-[28px] p-6 hover:border-blue-200 dark:hover:border-blue-900 transition-all hover:shadow-xl hover:shadow-blue-500/5">
            <div className="flex items-start justify-between mb-6">
              <div className="w-12 h-12 rounded-2xl bg-gray-50 dark:bg-gray-800 flex items-center justify-center shrink-0">
                {getIcon(method.type)}
              </div>
              <div className={`px-3 py-1 rounded-xl text-[10px] font-black uppercase tracking-wider ${
                method.status === 'active' ? 'bg-green-100 text-green-600 dark:bg-green-900/30' : 'bg-red-100 text-red-600 dark:bg-red-900/30'
              }`}>
                {method.status}
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="font-black dark:text-white text-lg flex items-center gap-2">
                {method.name}
                {method.isDefault && (
                  <span className="text-[10px] bg-blue-100 dark:bg-blue-900/40 text-blue-600 px-2 py-0.5 rounded-full font-bold">Mặc định</span>
                )}
              </h3>
              <p className="text-xs text-gray-500 mt-1 uppercase font-bold tracking-widest">{method.provider}</p>
            </div>

            <div className="flex gap-2 pt-4 border-t dark:border-gray-800">
              <button className="flex-1 py-2 text-xs font-bold text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl transition-colors">Thiết lập</button>
              <button className="p-2 text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors">
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-8 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-[24px] border border-blue-100 dark:border-blue-900/30">
        <h4 className="font-bold text-blue-900 dark:text-blue-300 text-sm mb-2">💡 Gợi ý cấu hình</h4>
        <p className="text-xs text-blue-700 dark:text-blue-400 leading-relaxed">
          Chúng tôi khuyên bạn nên kích hoạt ít nhất một phương thức thanh toán trực tuyến (Momo, VNPay hoặc Credit Card) để giảm thiểu thời gian chờ đợi tại quầy và tự động hóa quy trình xác nhận lịch hẹn.
        </p>
      </div>
    </div>
  );
}
