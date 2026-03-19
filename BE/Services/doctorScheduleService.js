import { doctorScheduleModel } from "../Models/doctorSchedule.js";

const createSchedule = async (scheduleData) => {
  return await doctorScheduleModel.createDoctorSchedule(scheduleData);
};

const getSchedulesByDoctor = async (doctorId) => {
  return await doctorScheduleModel.getDoctorScheduleByDoctorId(doctorId);
};

const updateSchedule = async (scheduleId, updateData) => {
  const updatedSchedule = await doctorScheduleModel.updateDoctorSchedule(
    scheduleId,
    updateData
  );
  if (!updatedSchedule) throw new Error("Không tìm thấy lịch làm việc này!");
  return updatedSchedule;
};

const deleteSchedule = async (scheduleId) => {
  const deletedSchedule = await doctorScheduleModel.deleteDoctorSchedule(
    scheduleId
  );
  if (!deletedSchedule) throw new Error("Không tìm thấy lịch làm việc để xóa!");
  return deletedSchedule;
};

export const doctorScheduleService = {
  createSchedule,
  getSchedulesByDoctor,
  updateSchedule,
  deleteSchedule,
};
