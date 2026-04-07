// seed_doctors.js
import { connectDB } from "./Configs/mongodb.js";
import { userModel } from "./Models/userModel.js";
import { doctorModel } from "./Models/doctorModel.js";
import { doctorScheduleModel } from "./Models/doctorScheduleModel.js";
import { departmentModel } from "./Models/departmentModel.js";
import bcrypt from "bcrypt";

const DEPARTMENTS = [
  { name: "Khoa Nội tổng hợp", description: "Bao gồm hô hấp, tiêu hóa, gan mật..." },
  { name: "Khoa Nhi", description: "Khám bệnh cho trẻ sơ sinh và trẻ nhỏ" },
  { name: "Khoa Da liễu", description: "Điều trị các bệnh về da, móng, tóc" },
  { name: "Khoa Tim mạch", description: "Chuẩn đoán và điều trị bệnh nhồi máu cơ tim, cao huyết áp" },
  { name: "Khoa Chấn thương chỉnh hình", description: "Xương khớp, cơ bắp, thể thao" }
];

const DOCTOR_NAMES = [
  "Trần Văn An", "Nguyễn Thị Thúy Nga", "Lê Văn Bằng", "Phạm Thị Huyền",
  "Hoàng Quốc Cường", "Vũ Huy Dũng", "Bùi Thị Phương Trang", "Đặng Quang Bảo",
  "Ngô Văn Lương", "Đỗ Thị Kim Thanh"
];

const SPECIALIZATIONS = [
  "Điều trị Cao huyết áp", "Khám sức khỏe tổng quát", "Da liễu thẩm mỹ", "Nội nhi", "Phục hồi chức năng",
  "Phẫu thuật lồng ngực", "Tai mũi họng nhi", "Phẫu thuật chấn thương", "Thần kinh não", "Nhãn khoa"
];

const runSeed = async () => {
    await connectDB();
    console.log("Seeding doctors...");
    
    // 1. Create Departments if none exist
    let deptIds = [];
    const existingDepts = await departmentModel.getAllDepartments();
    if(existingDepts.length === 0) {
        console.log("Creating departments...");
        for (let d of DEPARTMENTS) {
            const newD = await departmentModel.createDepartment(d);
            deptIds.push(newD._id);
        }
    } else {
        deptIds = existingDepts.map(d => d._id);
    }
    
    // 2. Create Doctors
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash("123456", salt);
    
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    
    for (let i = 0; i < 10; i++) {
        const username = DOCTOR_NAMES[i];
        const email = `bacsihospital${i+1}@gmail.com`;
        
        // Randomly skip if email already exists
        const exists = await userModel.findUserByEmail(email);
        if(exists) {
            console.log(`Email ${email} exists, skipping creation.`);
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
        const depId = deptIds[i % deptIds.length];
        const spec = SPECIALIZATIONS[i];
        
        const newDoctor = await doctorModel.createDoctor({
            user_id: newUser._id,
            department_id: depId,
            specialization: spec,
            experience: Math.floor(Math.random() * 20) + 1
        });
        
        // Create Schedules for the doctor
        console.log(`Created doctor ${username} with ID ${newDoctor._id}`);
        // Create 3 unique random days for their schedule
        const randomDays = [...days].sort(() => 0.5 - Math.random()).slice(0, 3);

        for (let d = 0; d < randomDays.length; d++) {
            await doctorScheduleModel.createDoctorSchedule({
                doctor_id: newDoctor._id,
                day_of_week: randomDays[d],
                start_time: "08:00",
                end_time: Math.random() > 0.5 ? "17:00" : "12:00" // Half or full day
            });
        }
        console.log(`  -> Added 3 schedules for ${username}`);
    }
    
    console.log("Seeding finished successfully!");
    process.exit(0);
}

runSeed();
