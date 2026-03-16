import mongoose from "mongoose";

const patientSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  gender: {
    type: String,
  },

  birth_date: {
    type: Date,
  },

  address: {
    type: String,
  },
});

export default mongoose.model("Patient", patientSchema);
