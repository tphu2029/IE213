import { connectDB } from "./Configs/mongodb.js";
import mongoose from "mongoose";

const run = async () => {
    await connectDB();
    try {
        await mongoose.connection.collection("users").dropIndex("username_1");
        console.log("Index username_1 dropped successfully");
    } catch(e) {
        console.log("No index to drop or error:", e.message);
    }
    process.exit(0);
}
run();
