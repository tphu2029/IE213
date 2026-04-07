// seed_new_departments.js
import { connectDB } from "./Configs/mongodb.js";
import { userModel } from "./Models/userModel.js";
import { doctorModel } from "./Models/doctorModel.js";
import { doctorScheduleModel } from "./Models/doctorScheduleModel.js";
import { departmentModel } from "./Models/departmentModel.js";
import bcrypt from "bcrypt";
import mongoose from "mongoose";

const NEW_DEPARTMENTS = [
  { name: "Khoa Mắt", description: "Chuyên chẩn đoán, điều trị các bệnh lý liên quan đến mắt, thị lực." },
  { name: "Khoa Răng Hàm Mặt", description: "Điều trị bệnh lý răng miệng, nha khoa thẩm mỹ, phẫu thuật hàm mặt." },
  { name: "Khoa Tai Mũi Họng", description: "Điều trị các bệnh viêm xoang, amidan, polyp mũi, thính lực." },
  { name: "Khoa Thần kinh", description: "Chuyên chẩn đoán và điều trị bệnh về não, tủy sống, dây thần kinh." },
  { name: "Khoa Tiêu hóa", description: "Khám và điều trị các bệnh về dạ dày, đại tràng, thực quản, gan mật." }
];

const FIRST_NAMES = ["Nguyễn", "Trần", "Lê", "Phạm", "Hoàng", "Huỳnh", "Phan", "Vũ", "Võ", "Đặng", "Bùi", "Đỗ", "Hồ", "Ngô", "Dương", "Lý"];
const MIDDLE_NAMES = ["Thị", "Văn", "Đức", "Trọng", "Hải", "Tuấn", "Minh", "Thu", "Ngọc", "Hồng", "Kim", "Xuân", "Quốc", "Tấn", "Thanh", "Mạnh", "Phúc"];
const LAST_NAMES = ["Anh", "Bảo", "Chi", "Dũng", "Giang", "Hà", "Hải", "Hùng", "Hương", "Linh", "Long", "Nam", "Nga", "Phong", "Phương", "Quân", "Sơn", "Thắng", "Thư", "Trang", "Tùng", "Uyên", "Yến", "Mạnh", "Hòa"];

function generateRandomName() {
  const first = FIRST_NAMES[Math.floor(Math.random() * FIRST_NAMES.length)];
  const middle = MIDDLE_NAMES[Math.floor(Math.random() * MIDDLE_NAMES.length)];
  const last = LAST_NAMES[Math.floor(Math.random() * LAST_NAMES.length)];
  return `${first} ${middle} ${last}`;
}

const runSeed = async () => {
    await connectDB();
    console.log("Seeding NEW departments and doctors...");
    
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash("123456", salt);
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    const allSlots = [
        { start: "08:00", end: "12:00" },
        { start: "13:00", end: "17:00" },
        { start: "18:00", end: "21:00" } // Ca tối
    ];

    let doctorCount = 100; // Offset for email

    for (let dept of NEW_DEPARTMENTS) {
        console.log(`\n--- Creating department: ${dept.name} ---`);
        const newDept = await departmentModel.createDepartment(dept);
        
        // Random 5 to 7 doctors
        const numDoctors = Math.floor(Math.random() * 3) + 5; 
        console.log(`Will generate ${numDoctors} doctors...`);

        for (let i = 0; i < numDoctors; i++) {
            doctorCount++;
            const username = generateRandomName();
            const email = `bacsi_${newDept._id.toString().substring(0,4)}_${doctorCount}@gmail.com`;
            
            // Randomly skip if email already exists
            const exists = await userModel.findUserByEmail(email);
            if(exists) {
                console.log(`Email ${email} exists, skipping...`);
                continue;
            }

            // Create User
            const newUser = await userModel.createUser({
                username,
                email,
                phone: `09${Math.floor(10000000 + Math.random() * 90000000)}`,
                password: passwordHash,
                role: "doctor"
            });
            
            // Create Doctor
            const specOptions = [
                `Khám chuyên sâu ${dept.name.replace("Khoa ", "")}`, 
                `Điều trị nội khoa ${dept.name}`, 
                `Phẫu thuật ${dept.name.toLowerCase()}`
            ];
            
            const newDoctor = await doctorModel.createDoctor({
                user_id: newUser._id,
                department_id: newDept._id,
                specialization: specOptions[Math.floor(Math.random() * specOptions.length)],
                experience: Math.floor(Math.random() * 25) + 3 // 3-27 years experience
            });
            
            console.log(` Created doctor ${username} with ID ${newDoctor._id}`);
            
            // Create 6-8 Schedules for the doctor
            const numSchedules = Math.floor(Math.random() * 3) + 6; 
            let added = 0;
            const shuffledDays = [...days].sort(() => 0.5 - Math.random());

            for (let d of shuffledDays) {
                if (added >= numSchedules) break;
                // pick 1 or 2 slots per day
                const shuffledSlots = [...allSlots].sort(() => 0.5 - Math.random());
                const slotsToPick = Math.floor(Math.random() * 2) + 1; // 1 or 2 slots this day
                
                for(let s = 0; s < slotsToPick; s++) {
                    if (added >= numSchedules) break;
                    const slot = shuffledSlots[s];
                    await doctorScheduleModel.createDoctorSchedule({
                        doctor_id: newDoctor._id,
                        day_of_week: d,
                        start_time: slot.start,
                        end_time: slot.end
                    });
                    added++;
                }
            }
            console.log(`  -> Added ${added} schedules for ${username}`);
        }
    }
    
    console.log("\nFinished completely!");
    process.exit(0);
}

runSeed();
