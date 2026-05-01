import { useState, useEffect } from "react";
import { billingService } from "../services";
import { useTranslation } from "react-i18next";
import {
  Receipt,
  CreditCard,
  CheckCircle2,
  Clock,
  FileText,
  AlertCircle,
} from "lucide-react";
import { toast } from "sonner";

export function Invoices() {
  const { t } = useTranslation();
  const [invoices, setInvoices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const res = await billingService.getMyInvoices();
        // Backend trả về { data: [...] }
        setInvoices(res.data.data || []);
      } catch (err) {
        console.error("Lỗi tải hóa đơn:", err);
        toast.error("Không thể tải danh sách hóa đơn");
      } finally {
        setLoading(false);
      }
    };
    fetchInvoices();
  }, []);

  const handlePay = (id: string) => {
    toast.info(
      "Chức năng thanh toán trực tuyến đang được bảo trì. Vui lòng thanh toán tại quầy.",
    );
  };

  return (
    <div className="max-w-5xl mx-auto py-12 px-4 transition-colors min-h-screen">
      <div className="mb-10">
        <h1 className="text-3xl font-black flex items-center gap-3 dark:text-white">
          <Receipt className="text-blue-600" size={32} /> {t("nav_invoice")}
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2">
          Theo dõi và thanh toán các chi phí khám chữa bệnh của bạn.
        </p>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-4 dark:text-white">
          <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="font-bold">{t("loading")}</p>
        </div>
      ) : invoices.length === 0 ? (
        <div className="bg-gray-50 dark:bg-gray-900 p-16 rounded-[40px] text-center border-2 border-dashed dark:border-gray-800">
          <AlertCircle className="mx-auto mb-4 text-gray-300" size={64} />
          <p className="text-gray-500 dark:text-gray-400 font-medium">
            {t("no_data")}
          </p>
        </div>
      ) : (
        <div className="grid gap-6">
          {invoices.map((inv: any) => (
            <div
              key={inv._id}
              className="bg-white dark:bg-gray-900 p-6 md:p-8 rounded-[32px] border border-gray-100 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center shadow-sm hover:shadow-xl transition-all group"
            >
              <div className="flex gap-6 items-center w-full md:w-auto">
                <div
                  className={`p-5 rounded-2xl shrink-0 ${
                    inv.status === "paid"
                      ? "bg-green-50 text-green-600 dark:bg-green-900/20"
                      : "bg-orange-50 text-orange-600 dark:bg-orange-900/20"
                  }`}
                >
                  {inv.status === "paid" ? (
                    <CheckCircle2 size={28} />
                  ) : (
                    <Clock size={28} />
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-black text-gray-400 uppercase tracking-tighter">
                      #{inv._id.slice(-8).toUpperCase()}
                    </span>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-md font-bold uppercase ${
                        inv.status === "paid"
                          ? "bg-green-100 text-green-700"
                          : "bg-orange-100 text-orange-700"
                      }`}
                    >
                      {t(inv.status)}
                    </span>
                  </div>
                  <h3 className="text-2xl font-black dark:text-white">
                    {inv.total_amount?.toLocaleString()}{" "}
                    <span className="text-sm font-normal text-gray-500">
                      VNĐ
                    </span>
                  </h3>
                  <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                    <FileText size={14} /> Ngày tạo:{" "}
                    {new Date(inv.created_at).toLocaleDateString("vi-VN")}
                  </p>
                </div>
              </div>

              <div className="mt-6 md:mt-0 w-full md:w-auto">
                {inv.status === "unpaid" ? (
                  <button
                    onClick={() => handlePay(inv._id)}
                    className="w-full md:w-auto bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-blue-700 hover:scale-105 transition-all shadow-lg shadow-blue-200 dark:shadow-none"
                  >
                    <CreditCard size={20} /> Thanh toán ngay
                  </button>
                ) : (
                  <div className="flex items-center gap-2 text-green-600 font-bold bg-green-50 dark:bg-green-900/10 px-6 py-3 rounded-2xl border border-green-100 dark:border-green-900/30">
                    <CheckCircle2 size={18} /> Đã hoàn tất
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
