import { connectDB } from "./Configs/mongodb.js";
import { userService } from "./Services/userService.js";

const run = async () => {
    await connectDB();
    try {
        const userProfile = await userService.getProfileById("69d461c69e432d44f6d18e8c");
        console.log("SUCCESS:", userProfile);
    } catch(err) {
        console.error("FAILED:", err.message);
    }
    process.exit(0);
}
run();
