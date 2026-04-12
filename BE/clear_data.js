import { connectDB } from "./Configs/mongodb.js";
import mongoose from "mongoose";

const clearData = async () => {
  await connectDB();
  console.log("=== Bắt đầu dọn dẹp dữ liệu đặt lịch ===");

  try {
    // 1. Xóa toàn bộ lịch hẹn
    await mongoose.connection.collection("appointments").deleteMany({});
    console.log("✓ Đã xóa sạch danh sách Lịch hẹn.");

    // 2. Xóa toàn bộ hóa đơn (vì hóa đơn đi kèm với lịch hẹn)
    await mongoose.connection.collection("invoices").deleteMany({});
    console.log("✓ Đã xóa sạch danh sách Hóa đơn.");

    // 3. XÓA INDEX CŨ (Rất quan trọng)
    // Nếu bạn thay đổi logic từ time_slot sang shift, phải xóa index cũ thì mới đặt lịch mới được
    try {
      await mongoose.connection.collection("appointments").dropIndexes();
      console.log(
        "✓ Đã xóa Index cũ (Đảm bảo không bị lỗi trùng lặp time_slot).",
      );
    } catch (e) {
      console.log("- Không có index cũ để xóa.");
    }

    console.log(
      "\n=== HOÀN TẤT! Bạn có thể bắt đầu đặt lịch mới ngay bây giờ. ===",
    );
  } catch (error) {
    console.error("Lỗi khi xóa dữ liệu:", error);
  } finally {
    process.exit(0);
  }
};

clearData();
