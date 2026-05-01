// seed_sample_appointments.js
// Tạo vài bệnh nhân và đặt lịch cho BS. Trần Văn An (bacsihospital1@gmail.com)
import { connectDB } from "./Configs/mongodb.js";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { userModel } from "./Models/userModel.js";
import { patientModel } from "./Models/patientModel.js";
import { doctorModel } from "./Models/doctorModel.js";
import { departmentModel } from "./Models/departmentModel.js";
import { appointmentModel } from "./Models/appointmentModel.js";

const PATIENTS = [
  { username: "Nguyễn Văn Bình", email: "nguyenvanbinh@gmail.com", phone: "0901234567",
    gender: "male", birth_date: "1990-05-15", address: "12 Nguyễn Huệ, Q1, HCM", cccd: "0799111101" },
  { username: "Trần Thị Lan", email: "tranthilan@gmail.com", phone: "0912345678",
    gender: "female", birth_date: "1985-08-22", address: "45 Lê Lợi, Q5, HCM", cccd: "0799111102" },
  { username: "Lê Minh Khoa", email: "leminhkhoa@gmail.com", phone: "0923456789",
    gender: "male", birth_date: "1995-03-10", address: "88 Hai Bà Trưng, Q3, HCM", cccd: "0799111103" },
  { username: "Phạm Thị Mai", email: "phamthimai@gmail.com", phone: "0934567890",
    gender: "female", birth_date: "1978-11-30", address: "200 Điện Biên Phủ, Bình Thạnh, HCM", cccd: "0799111104" },
  { username: "Hoàng Đức Thắng", email: "hoangducthang@gmail.com", phone: "0945678901",
    gender: "male", birth_date: "2000-07-04", address: "67 Cách Mạng Tháng 8, Q10, HCM", cccd: "0799111105" },
];

const REASONS = [
  "Đau đầu kéo dài, khó ngủ",
  "Ho và sốt nhẹ 3 ngày",
  "Khám sức khỏe định kỳ",
  "Tim đập nhanh, hay chóng mặt",
  "Kiểm tra sau phẫu thuật",
];

const STATUSES = ["pending", "confirmed", "in_progress", "completed", "pending"];

// Tạo ngày khám rải rác trong tuần này và tuần tới
function getDateFromNow(daysOffset) {
  const d = new Date();
  d.setDate(d.getDate() + daysOffset);
  return d;
}

const TIME_SLOTS = ["08:00 - 08:30", "09:00 - 09:30", "10:00 - 10:30", "13:30 - 14:00", "15:00 - 15:30"];

const run = async () => {
    await connectDB();
    console.log("=== Seed Sample Appointments ===\n");

    const salt = await bcrypt.genSalt(10);
    const pwd = await bcrypt.hash("123456", salt);

    // Tìm bác sĩ bacsihospital1
    const doctorUser = await mongoose.model("users").findOne({ email: "bacsihospital1@gmail.com" });
    if (!doctorUser) {
        console.error("❌ Không tìm thấy bacsihospital1@gmail.com !");
        process.exit(1);
    }
    const doctor = await mongoose.model("doctors").findOne({ user_id: doctorUser._id });
    if (!doctor) {
        console.error("❌ Không tìm thấy hồ sơ bác sĩ!");
        process.exit(1);
    }
    console.log(`✓ Bác sĩ: ${doctorUser.username} (ID: ${doctor._id})\n`);

    for (let i = 0; i < PATIENTS.length; i++) {
        const p = PATIENTS[i];
        
        // Tạo hoặc tìm user
        let user = await mongoose.model("users").findOne({ email: p.email });
        if (!user) {
            user = await mongoose.model("users").create({
                username: p.username, email: p.email, phone: p.phone,
                password: pwd, role: "patient"
            });
            console.log(`  ✓ Tạo user: ${p.username} (${p.email})`);
        } else {
            console.log(`  Đã tồn tại user: ${p.username}`);
        }

        // Tạo hoặc tìm patient profile
        let patient = await mongoose.model("patients").findOne({ user_id: user._id });
        if (!patient) {
            patient = await mongoose.model("patients").create({
                user_id: user._id, gender: p.gender, birth_date: p.birth_date,
                address: p.address, cccd: p.cccd
            });
            console.log(`    ✓ Tạo patient profile`);
        }

        // Tạo lịch hẹn với ngày khác nhau
        const aptDate = getDateFromNow(i - 1); // Từ hôm qua đến 4 ngày tới
        aptDate.setHours(0, 0, 0, 0);

        try {
            const existing = await mongoose.model("appointments").findOne({
                doctor_id: doctor._id,
                appointment_date: aptDate,
                time_slot: TIME_SLOTS[i]
            });

            if (!existing) {
                await mongoose.model("appointments").create({
                    patient_id: patient._id,
                    doctor_id: doctor._id,
                    appointment_date: aptDate,
                    time_slot: TIME_SLOTS[i],
                    reason: REASONS[i],
                    status: STATUSES[i]
                });
                console.log(`    ✓ Đặt lịch ${aptDate.toLocaleDateString("vi-VN")} ${TIME_SLOTS[i]} [${STATUSES[i]}]`);
            } else {
                console.log(`    (Lịch đã tồn tại, bỏ qua)`);
            }
        } catch (e) {
            console.log(`    ⚠ Lỗi tạo lịch: ${e.message}`);
        }
        console.log();
    }

    console.log("✅ Hoàn tất! \nBây giờ đăng nhập bacsihospital1@gmail.com / 123456 để xem Doctor Dashboard.");
    process.exit(0);
};

run().catch(err => { console.error(err); process.exit(1); });
