import { connectDB } from "./Configs/mongodb.js";
import { doctorScheduleModel } from "./Models/doctorScheduleModel.js";
import { doctorModel } from "./Models/doctorModel.js";
import { userModel } from "./Models/userModel.js";
import { departmentModel } from "./Models/departmentModel.js";

const runAddSchedules = async () => {
    await connectDB();
    console.log("Adding more schedules to existing doctors...");

    const doctors = await doctorModel.getAllDoctors();
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const allSlots = [
        { start: "08:00", end: "12:00" },
        { start: "13:00", end: "17:00" }
    ];

    for (const doc of doctors) {
        // Find existing schedules
        const existingSchedules = await doctorScheduleModel.getDoctorScheduleByDoctorId(doc._id);
        
        // We want at least 6 schedules
        let needed = 6 - existingSchedules.length;
        if (needed <= 0) continue;

        console.log(`Doctor ${doc.user_id?.username || doc._id} needs ${needed} more schedules`);

        let added = 0;
        // Shuffle days to make it look random instead of filling Monday-Tuesday
        const shuffledDays = [...days].sort(() => 0.5 - Math.random());

        for (let d of shuffledDays) {
            if (added >= needed) break;
            for (let slot of allSlots) {
                if (added >= needed) break;
                // Check if this (day + slot start) already exists
                const exists = existingSchedules.find(s => s.day_of_week === d && s.start_time === slot.start);
                
                if (!exists) {
                    await doctorScheduleModel.createDoctorSchedule({
                        doctor_id: doc._id,
                        day_of_week: d,
                        start_time: slot.start,
                        end_time: slot.end
                    });
                    added++;
                    existingSchedules.push({ day_of_week: d, start_time: slot.start }); // update local tracking
                    console.log(` - Added ${d} (${slot.start} - ${slot.end})`);
                }
            }
        }
    }
    console.log("Finished adding schedules!");
    process.exit(0);
};

runAddSchedules();
