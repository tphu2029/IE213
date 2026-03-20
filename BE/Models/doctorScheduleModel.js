import mongoose from "mongoose";

const COLLECTION_NAME = "doctor_schedules";

const doctorScheduleSchema = new mongoose.Schema({
  doctor_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "doctors",
  },

  day_of_week: String,

  start_time: String,

  end_time: String,
});

const DoctorSchedule = mongoose.model(COLLECTION_NAME, doctorScheduleSchema);

// --- CÁC HÀM THAO TÁC VỚI DATABASE ---

const createDoctorSchedule = async (scheduleData) => {
  return await DoctorSchedule.create(scheduleData);
};

const getDoctorScheduleByDoctorId = async (doctorId) => {
  return await DoctorSchedule.find({ doctor_id: doctorId });
};

const updateDoctorSchedule = async (id, updateData) => {
  return await DoctorSchedule.findByIdAndUpdate(id, updateData, { new: true });
};

const deleteDoctorSchedule = async (id) => {
  return await DoctorSchedule.findByIdAndDelete(id);
};

export const doctorScheduleModel = {
  createDoctorSchedule,
  getDoctorScheduleByDoctorId,
  updateDoctorSchedule,
  deleteDoctorSchedule,
};
