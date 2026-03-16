import mongoose from "mongoose";

const doctorScheduleSchema = new mongoose.Schema({
  doctor_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor",
  },

  day_of_week: String,

  start_time: String,

  end_time: String,
});

export default mongoose.model("DoctorSchedule", doctorScheduleSchema);
