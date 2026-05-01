// cleanup_and_seed_avatars.js
// Script: 1) Xóa 3 user cũ (nguyen_van_a, tran_thi_b, admin)
//         2) Gán avatar ngẫu nhiên người Việt cho tất cả bác sĩ còn lại

import { connectDB } from "./Configs/mongodb.js";
import { userModel } from "./Models/userModel.js";
import { doctorModel } from "./Models/doctorModel.js";
import { doctorScheduleModel } from "./Models/doctorScheduleModel.js";
import { departmentModel } from "./Models/departmentModel.js";
import mongoose from "mongoose";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Avatar từ ui-avatars.com - dịch vụ tạo avatar theo tên, miễn phí, không cần lưu file
// Tạo URL avatar theo tên bác sĩ với màu sắc đẹp
const AVATAR_COLORS = [
  "1a56db", "0694a2", "057a55", "9f1239", "7e3af2",
  "b45309", "c81e1e", "1c64f2", "5850ec", "0e9f6e"
];

function generateAvatarUrl(name) {
  const encoded = encodeURIComponent(name);
  const color = AVATAR_COLORS[Math.floor(Math.random() * AVATAR_COLORS.length)];
  // Sử dụng ui-avatars.com để tạo ảnh avatar theo tên
  return `https://ui-avatars.com/api/?name=${encoded}&size=400&background=${color}&color=ffffff&font-size=0.33&bold=true`;
}

const run = async () => {
    await connectDB();
    console.log("Connected to MongoDB.\n");

    // === BƯỚC 1: Xóa 3 user cũ: nguyen_van_a, tran_thi_b, admin ===
    const usernamesToDelete = ["nguyen_van_a", "tran_thi_b", "admin"];
    console.log("=== Xóa 3 tài khoản cũ ===");

    for (const username of usernamesToDelete) {
        const user = await mongoose.model("users").findOne({ username });
        if (!user) {
            console.log(`  Không tìm thấy user: ${username}, bỏ qua.`);
            continue;
        }

        // Tìm và xóa doctor profile
        const doctor = await mongoose.model("doctors").findOne({ user_id: user._id });
        if (doctor) {
            // Xóa schedules của doctor
            await mongoose.model("doctor_schedules").deleteMany({ doctor_id: doctor._id });
            console.log(`  -> Đã xóa lịch trình của BS ${username}`);
            await mongoose.model("doctors").findByIdAndDelete(doctor._id);
            console.log(`  -> Đã xóa hồ sơ bác sĩ của ${username}`);
        }

        // Xóa user
        await mongoose.model("users").findByIdAndDelete(user._id);
        console.log(`  ✓ Đã xóa user: ${username}\n`);
    }

    // === BƯỚC 2: Cập nhật avatar cho tất cả bác sĩ còn lại ===
    console.log("=== Cập nhật Avatar cho tất cả bác sĩ ===");
    const allDoctors = await mongoose.model("doctors").find().populate("user_id");
    
    let updated = 0;
    for (const doc of allDoctors) {
        if (!doc.user_id) continue;
        const name = doc.user_id.username || "Bac si";
        const avatarUrl = generateAvatarUrl(name);

        await mongoose.model("users").findByIdAndUpdate(doc.user_id._id, {
            avatar: avatarUrl
        });
        updated++;
        console.log(`  ✓ ${name} -> ${avatarUrl.substring(0, 60)}...`);
    }

    console.log(`\nHoàn tất! Đã cập nhật avatar cho ${updated} bác sĩ.`);
    process.exit(0);
};

run().catch(err => {
    console.error("Lỗi:", err);
    process.exit(1);
});
