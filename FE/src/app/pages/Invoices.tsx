import { useState, useEffect } from "react";
import { billingService } from "../services";
import { Receipt, CreditCard, CheckCircle2, Clock } from "lucide-react";
import { toast } from "sonner";

export function Invoices() {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    billingService.getMyInvoices().then((res) => setInvoices(res.data.data));
  }, []);

  const handlePay = async (id: string) => {
    toast.info("Đang chuyển hướng đến cổng thanh toán...");
    // Logic gọi API thanh toán mục 13
  };

  return (
    <div className="max-w-5xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8 flex items-center gap-3 dark:text-white">
        <Receipt className="text-blue-600" /> Hóa đơn của tôi
      </h1>
      <div className="grid gap-6">
        {invoices.map((inv: any) => (
          <div
            key={inv._id}
            className="bg-white dark:bg-gray-800 p-6 rounded-3xl border flex justify-between items-center shadow-sm"
          >
            <div className="flex gap-4 items-center">
              <div
                className={`p-4 rounded-2xl ${inv.status === "paid" ? "bg-green-100 text-green-600" : "bg-orange-100 text-orange-600"}`}
              >
                {inv.status === "paid" ? <CheckCircle2 /> : <Clock />}
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">
                  Hóa đơn #{inv._id.slice(-6)}
                </p>
                <h3 className="text-2xl font-black dark:text-white">
                  {inv.total_amount.toLocaleString()} đ
                </h3>
                <p className="text-sm text-gray-500">
                  Ngày tạo: {new Date(inv.created_at).toLocaleDateString()}
                </p>
              </div>
            </div>
            {inv.status === "unpaid" ? (
              <button
                onClick={() => handlePay(inv._id)}
                className="bg-blue-600 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-blue-700 transition"
              >
                <CreditCard size={18} /> Thanh toán ngay
              </button>
            ) : (
              <span className="text-green-600 font-bold bg-green-50 dark:bg-green-900/20 px-5 py-2 rounded-xl border border-green-100 dark:border-green-800">
                Đã quyết toán
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
