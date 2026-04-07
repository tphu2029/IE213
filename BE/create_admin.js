import { connectDB } from "./Configs/mongodb.js";
import { userModel } from "./Models/userModel.js";
import bcrypt from "bcrypt";

const run = async () => {
    await connectDB();
    
    // Kiểm tra admin hiện có
    const existing = await userModel.findUserByEmail("admin@hospital.com").catch(() => null);
    if (existing) {
        console.log("Admin đã tồn tại:", { email: existing.email, role: existing.role, username: existing.username });
        process.exit();
    }

    // Tạo admin mới
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash("Admin@123", salt);

    await userModel.createUser({
        username: "Hospital Administrator",
        email: "admin@hospital.com",
        password,
        role: "admin",
        phone: "0900000000"
    });

    console.log("✅ Tạo admin thành công!");
    console.log("   Email: admin@hospital.com");
    console.log("   Password: Admin@123");
    process.exit();
};

run().catch(e => { console.error(e); process.exit(1); });
