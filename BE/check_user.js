import { connectDB } from "./Configs/mongodb.js";
import { userModel } from "./Models/userModel.js";
import { patientModel } from "./Models/patientModel.js";
import fs from "fs";

const run = async () => {
    await connectDB();
    const user = await userModel.findUserByEmail("ttp@gmail.com");
    if(user) {
        const patient = await patientModel.getPatientByUserId(user._id);
        const data = { user, patient };
        fs.writeFileSync("user_dump.json", JSON.stringify(data, null, 2));
    } else {
        fs.writeFileSync("user_dump.json", "User not found");
    }
    process.exit(0);
}
run();
