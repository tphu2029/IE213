import { useState, useEffect } from "react";
import { medicalService } from "../services";
import { ClipboardList, Pill } from "lucide-react";

export function MedicalRecords() {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    medicalService.getMyRecords().then((res) => setRecords(res.data.data));
  }, []);

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8 flex items-center gap-3">
        <ClipboardList className="text-blue-600" /> Lịch sử bệnh án
      </h1>
      <div className="space-y-6">
        {records.map((r: any) => (
          <div
            key={r._id}
            className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition"
          >
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm text-gray-500">
                {new Date(r.visit_date).toLocaleDateString()}
              </span>
              <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-bold">
                Hoàn thành
              </span>
            </div>
            <h2 className="text-xl font-bold mb-2">Chẩn đoán: {r.diagnosis}</h2>
            <p className="text-gray-600 mb-4">Triệu chứng: {r.symptoms}</p>
            <div className="bg-gray-50 p-4 rounded-xl flex items-center gap-3">
              <Pill className="text-green-600" />
              <div>
                <p className="text-sm font-bold">Đơn thuốc đính kèm:</p>
                <p className="text-xs text-gray-500">
                  {r.prescription || "Xem chi tiết đơn thuốc..."}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
