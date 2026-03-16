import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  department_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Department",
  },

  specialization: {
    type: String,
  },

  experience: {
    type: Number,
  },
});

export default mongoose.model("Doctor", doctorSchema);
