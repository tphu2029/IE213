// seed_avatars_faces.js
// Cập nhật avatar thật (mặt người) cho tất cả bác sĩ dùng randomuser.me
import { connectDB } from "./Configs/mongodb.js";
import { userModel } from "./Models/userModel.js";
import { doctorModel } from "./Models/doctorModel.js";
import { departmentModel } from "./Models/departmentModel.js";
import mongoose from "mongoose";

// randomuser.me cung cấp ảnh mặt người thật - 100 nam (men/0-99) + 100 nữ (women/0-99)
// Tổng hợp URL theo giới tính ngẫu nhiên
const FEMALE_KEYWORDS = ["Thị", "Thu", "Hương", "Nga", "Linh", "Trang", "Phương", "Huyền", "Thanh", "Kim", "Hồng", "Xuân", "Ngọc", "Yến", "Uyên", "Chi", "Thư"];

function isFemale(name) {
  return FEMALE_KEYWORDS.some(kw => name.includes(kw));
}

function getRandomFaceUrl(name, index) {
  const gender = isFemale(name) ? "women" : "men";
  const num = (index * 7 + 13) % 99; // số ngẫu nhiên phân tán 0-98
  return `https://randomuser.me/api/portraits/${gender}/${num}.jpg`;
}

const run = async () => {
    await connectDB();
    console.log("=== Cập nhật Avatar mặt người cho tất cả bác sĩ ===\n");

    const allDoctors = await mongoose.model("doctors").find().populate("user_id");
    
    let updated = 0;
    for (let i = 0; i < allDoctors.length; i++) {
        const doc = allDoctors[i];
        if (!doc.user_id) continue;

        const name = doc.user_id.username || "";
        const avatarUrl = getRandomFaceUrl(name, i);

        await mongoose.model("users").findByIdAndUpdate(doc.user_id._id, {
            avatar: avatarUrl
        });
        updated++;
        console.log(`  ✓ [${name}] -> ${avatarUrl}`);
    }

    console.log(`\nHoàn tất! Đã cập nhật avatar cho ${updated} bác sĩ.`);
    process.exit(0);
};

run().catch(err => {
    console.error("Lỗi:", err);
    process.exit(1);
});
