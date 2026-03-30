import { useState, useEffect } from "react";
import { medicalService } from "../services";
import { Pill, Search, ShoppingBag } from "lucide-react";

export function Medicines() {
  const [medicines, setMedicines] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    medicalService
      .getMedicines()
      .then((res: any) => {
        setMedicines(res.data.data);
      })
      .catch(() => {
        console.error("Lỗi tải danh sách thuốc");
      });
  }, []);

  const filtered = medicines.filter((m: any) =>
    m.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 pt-24">
      <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
        <h1 className="text-3xl font-bold flex items-center gap-3 dark:text-white">
          <Pill className="text-blue-600" size={32} /> Danh mục thuốc
        </h1>
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-3 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Tìm tên thuốc..."
            className="w-full pl-10 p-3 border rounded-2xl dark:bg-gray-800 dark:text-white outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filtered.map((m: any) => (
          <div
            key={m._id}
            className="bg-white dark:bg-gray-800 p-6 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition group"
          >
            <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center text-blue-600 mb-4 group-hover:scale-110 transition">
              <Pill />
            </div>
            <h3 className="font-bold text-lg dark:text-white mb-1">{m.name}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 line-clamp-2">
              {m.description}
            </p>
            <div className="flex justify-between items-center">
              <span className="text-blue-600 font-bold">
                {m.price?.toLocaleString()} đ
              </span>
              <button className="p-2 bg-gray-50 dark:bg-gray-700 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-blue-600 hover:text-white transition">
                <ShoppingBag size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20 text-gray-500">
          Không tìm thấy loại thuốc này.
        </div>
      )}
    </div>
  );
}
