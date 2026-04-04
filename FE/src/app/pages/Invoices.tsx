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
  Loader2,
} from "lucide-react";

export function Invoices() {
  const { t } = useTranslation();
  const [invoices, setInvoices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    billingService
      .getMyInvoices()
      .then((res) => {
        setInvoices(res.data.data || []);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-5xl mx-auto py-12 px-4 transition-colors min-h-screen pt-24">
      <div className="mb-10">
        <h1 className="text-4xl font-black flex items-center gap-3 dark:text-white italic">
          <Receipt className="text-blue-600" size={40} /> {t("invoice_header")}
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2">
          {t("invoice_desc")}
        </p>
      </div>

      {loading ? (
        <div className="flex flex-col items-center py-20 text-blue-600">
          <Loader2 className="animate-spin mb-4" size={48} />
          <span>{t("loading")}</span>
        </div>
      ) : (
        <div className="grid gap-6">
          {invoices.length === 0 ? (
            <div className="bg-gray-50 dark:bg-gray-900 p-16 rounded-[40px] text-center border-2 border-dashed dark:border-gray-800">
              <AlertCircle className="mx-auto mb-4 text-gray-300" size={64} />
              <p className="text-gray-500 dark:text-gray-400 font-bold">
                {t("no_data")}
              </p>
            </div>
          ) : (
            invoices.map((inv: any) => (
              <div
                key={inv._id}
                className="bg-white dark:bg-gray-900 p-8 rounded-[32px] border dark:border-gray-800 flex flex-col md:flex-row justify-between items-center shadow-sm hover:shadow-xl transition-all"
              >
                <div className="flex gap-6 items-center">
                  <div
                    className={`p-5 rounded-2xl ${inv.status === "paid" ? "bg-green-50 text-green-600" : "bg-orange-50 text-orange-600"}`}
                  >
                    {inv.status === "paid" ? (
                      <CheckCircle2 size={32} />
                    ) : (
                      <Clock size={32} />
                    )}
                  </div>
                  <div>
                    <div className="flex gap-2 mb-1">
                      <span className="text-xs font-black text-gray-400">
                        #{inv._id.slice(-8).toUpperCase()}
                      </span>
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-md font-bold uppercase ${inv.status === "paid" ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"}`}
                      >
                        {t(inv.status)}
                      </span>
                    </div>
                    <h3 className="text-3xl font-black dark:text-white">
                      {inv.total_amount?.toLocaleString()}{" "}
                      <span className="text-sm font-normal text-gray-500">
                        VNĐ
                      </span>
                    </h3>
                    <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                      <FileText size={14} /> {t("invoice_date")}:{" "}
                      {new Date(inv.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                {inv.status === "unpaid" && (
                  <button className="w-full md:w-auto bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-blue-700 transition-all shadow-lg active:scale-95">
                    <CreditCard size={20} /> {t("pay_now")}
                  </button>
                )}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
