import { connectDB } from "./Configs/mongodb.js";
import { userModel } from "./Models/userModel.js";
import { doctorModel } from "./Models/doctorModel.js";
import { doctorScheduleModel } from "./Models/doctorScheduleModel.js";
import { departmentModel } from "./Models/departmentModel.js";
import mongoose from "mongoose";
import bcrypt from "bcrypt";

// 1. Cấu hình 8 Khoa và các Chuyên môn tương ứng (Logical matching)
const DEPARTMENTS_DATA = [
  {
    name: "Khoa Nội tổng hợp",
    desc: "Khám nội khoa, nội tiết, tiểu đường, hồi sức.",
    specs: [
      "Nội tiết - Tiểu đường",
      "Khám sức khỏe tổng quát",
      "Lão khoa",
      "Nội tiêu hóa",
    ],
  },
  {
    name: "Khoa Tim mạch",
    desc: "Chẩn đoán và điều trị bệnh lý tim mạch, mạch máu.",
    specs: ["Nội tim mạch", "Can thiệp mạch máu", "Nhịp học", "Phẫu thuật tim"],
  },
  {
    name: "Khoa Nhi",
    desc: "Chăm sóc sức khỏe trẻ em từ sơ sinh đến 16 tuổi.",
    specs: [
      "Nhi tổng quát",
      "Dinh dưỡng nhi khoa",
      "Nhi sơ sinh",
      "Tiêm chủng",
    ],
  },
  {
    name: "Khoa Mắt",
    desc: "Điều trị bệnh lý nhãn khoa, tật khúc xạ, phẫu thuật Phaco.",
    specs: ["Khúc xạ nhãn khoa", "Phẫu thuật Phaco", "Mắt nhi", "Glaucoma"],
  },
  {
    name: "Khoa Răng Hàm Mặt",
    desc: "Nha khoa thẩm mỹ, chỉnh nha, phẫu thuật hàm mặt.",
    specs: [
      "Nha khoa thẩm mỹ",
      "Chỉnh nha (Niềng răng)",
      "Nhổ răng khôn",
      "Implant",
    ],
  },
  {
    name: "Khoa Tai Mũi Họng",
    desc: "Điều trị viêm xoang, thính học, phẫu thuật họng.",
    specs: [
      "Tai mũi họng tổng quát",
      "Thính học",
      "Phẫu thuật Amidan",
      "Nội soi TMH",
    ],
  },
  {
    name: "Khoa Thần kinh",
    desc: "Điều trị đột quỵ, Parkinson, động kinh, đau đầu.",
    specs: [
      "Điều trị Đột quỵ",
      "Rối loạn giấc ngủ",
      "Parkinson",
      "Thần kinh ngoại biên",
    ],
  },
  {
    name: "Khoa Tiêu hóa",
    desc: "Nội soi dạ dày, gan mật, bệnh lý đại trực tràng.",
    specs: [
      "Nội soi tiêu hóa",
      "Bệnh lý Gan mật",
      "Hậu môn trực tràng",
      "Viêm loét dạ dày",
    ],
  },
];

// 2. Bộ tạo tên tiếng Việt phong phú hơn để tạo 80 bác sĩ
const FIRST_NAMES = [
  "Nguyễn",
  "Trần",
  "Lê",
  "Phạm",
  "Hoàng",
  "Huỳnh",
  "Phan",
  "Vũ",
  "Võ",
  "Đặng",
  "Bùi",
  "Đỗ",
  "Hồ",
  "Ngô",
  "Dương",
  "Lý",
];
const MIDDLE_NAMES = [
  "Văn",
  "Thị",
  "Minh",
  "Anh",
  "Đức",
  "Hồng",
  "Ngọc",
  "Hoàng",
  "Quốc",
  "Thanh",
  "Mạnh",
  "Xuân",
  "Tấn",
  "Trọng",
  "Hải",
];
const LAST_NAMES = [
  "An",
  "Bình",
  "Cường",
  "Dũng",
  "Giang",
  "Hương",
  "Khánh",
  "Linh",
  "Minh",
  "Nam",
  "Phúc",
  "Quân",
  "Sơn",
  "Trang",
  "Uyên",
  "Việt",
  "Yến",
  "Tùng",
  "Thảo",
  "Hà",
  "Phong",
  "Thắng",
  "Đạt",
  "Sáng",
  "Hòa",
];

function generateRandomName() {
  const f = FIRST_NAMES[Math.floor(Math.random() * FIRST_NAMES.length)];
  const m = MIDDLE_NAMES[Math.floor(Math.random() * MIDDLE_NAMES.length)];
  const l = LAST_NAMES[Math.floor(Math.random() * LAST_NAMES.length)];
  return `${f} ${m} ${l}`;
}

const runSeed = async () => {
  await connectDB();
  console.log("=== BẮT ĐẦU SEED 80 BÁC SĨ (8 KHOA x 10 NGƯỜI) ===\n");

  // Dọn dẹp dữ liệu cũ (chỉ xóa bác sĩ để giữ lại Admin/Patient nếu cần)
  await mongoose.model("doctor_schedules").deleteMany({});
  await mongoose.model("doctors").deleteMany({});
  await mongoose.model("users").deleteMany({ role: "doctor" });
  await mongoose.model("departments").deleteMany({});

  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash("123456", salt);
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  // Mốc giờ chuẩn cho 2 Buổi khám
  const SHIFTS = [
    { start: "08:00", end: "12:00" }, // Morning
    { start: "13:00", end: "17:00" }, // Afternoon
  ];

  let globalCount = 0;

  for (let deptInfo of DEPARTMENTS_DATA) {
    // Tạo Khoa
    const newDept = await departmentModel.createDepartment({
      name: deptInfo.name,
      description: deptInfo.desc,
    });
    console.log(`\n📂 Đang tạo nhân sự cho: ${newDept.name}`);

    // Tạo 10 Bác sĩ cho khoa này
    for (let i = 1; i <= 10; i++) {
      globalCount++;
      const name = generateRandomName();
      const email = `bacsi.${globalCount}@hospital.com`;

      // 1. Tạo User
      const newUser = await userModel.createUser({
        username: name,
        email: email,
        phone: `09${Math.floor(10000000 + Math.random() * 90000000)}`,
        password: passwordHash,
        role: "doctor",
      });

      // 2. Tạo hồ sơ Bác sĩ (Lấy random chuyên môn trong khoa đó)
      const spec =
        deptInfo.specs[Math.floor(Math.random() * deptInfo.specs.length)];
      const newDoctor = await doctorModel.createDoctor({
        user_id: newUser._id,
        department_id: newDept._id,
        specialization: spec,
        experience: Math.floor(Math.random() * 20) + 2,
      });

      // 3. Tạo lịch trực (Mỗi bác sĩ trực 5 ngày ngẫu nhiên trong tuần)
      const workDays = [...days].sort(() => 0.5 - Math.random()).slice(0, 5);
      for (let d of workDays) {
        const rand = Math.random();
        if (rand < 0.3) {
          // 30% trường hợp trực sáng
          await doctorScheduleModel.createDoctorSchedule({
            doctor_id: newDoctor._id,
            day_of_week: d,
            start_time: SHIFTS[0].start,
            end_time: SHIFTS[0].end,
          });
        } else if (rand < 0.6) {
          // 30% trường hợp trực chiều
          await doctorScheduleModel.createDoctorSchedule({
            doctor_id: newDoctor._id,
            day_of_week: d,
            start_time: SHIFTS[1].start,
            end_time: SHIFTS[1].end,
          });
        } else {
          // 40% trường hợp trực cả ngày
          await doctorScheduleModel.createDoctorSchedule({
            doctor_id: newDoctor._id,
            day_of_week: d,
            start_time: SHIFTS[0].start,
            end_time: SHIFTS[0].end,
          });
          await doctorScheduleModel.createDoctorSchedule({
            doctor_id: newDoctor._id,
            day_of_week: d,
            start_time: SHIFTS[1].start,
            end_time: SHIFTS[1].end,
          });
        }
      }
      console.log(`  ✓ [${i}/10] BS. ${name} - ${spec}`);
    }
  }

  console.log(`\n✅ HOÀN TẤT: Đã tạo 8 khoa và 80 bác sĩ chuẩn.`);
  console.log(
    `🔑 Tài khoản đăng nhập Doctor Dashboard: bacsi.1@hospital.com -> bacsi.80@hospital.com`,
  );
  console.log(`🔑 Mật khẩu: 123456`);
  process.exit(0);
};

runSeed().catch((err) => {
  console.error("Lỗi quá trình seed:", err);
  process.exit(1);
});
