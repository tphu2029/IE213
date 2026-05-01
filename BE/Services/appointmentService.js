import { appointmentModel } from "../Models/appointmentModel.js";
import { invoiceModel } from "../Models/invoiceModel.js";
import mongoose from "mongoose";
import dayjs from "dayjs";
import { env } from "../Configs/environment.js";

const bookAppointment = async (patient_id, appointmentData) => {
  try {
    const { doctor_id, appointment_date, shift, reason, hasInsurance } =
      appointmentData;

    // KIỂM TRA TRẠNG THÁI BHYT TRONG DATABASE
    if (hasInsurance === true || hasInsurance === "true") {
      const patient = await mongoose.model("patients").findById(patient_id);
      if (!patient || patient.bhyt_status !== "verified") {
        throw new Error("BHYT_REQUIRED"); // Ném lỗi nếu chưa được duyệt hoặc chưa đăng ký
      }
    }

    const startOfDate = new Date(appointment_date);
    startOfDate.setHours(0, 0, 0, 0);

    const currentCount = await appointmentModel.countAppointments({
      doctor_id: new mongoose.Types.ObjectId(doctor_id),
      appointment_date: startOfDate,
      shift: shift,
    });

    const nextSTT = (currentCount || 0) + 1;
    if (nextSTT > 40) throw new Error("SHIFT_FULL");

    const dayName = dayjs(appointment_date).format("dddd");
    const sched = await mongoose.model("doctor_schedules").findOne({
      doctor_id,
      day_of_week: dayName,
      start_time: shift === "Morning" ? { $lt: "12:00" } : { $gte: "12:00" },
    });

    const baseStartTime = sched
      ? sched.start_time
      : shift === "Morning"
        ? "08:00"
        : "13:00";

    // LOGIC : Nếu không bảo hiểm -> Trạng thái PENDING để chờ quét QR
    const initialStatus =
      hasInsurance === true || hasInsurance === "true"
        ? "confirmed"
        : "pending";

    const newAppointment = await appointmentModel.createAppointment({
      patient_id,
      doctor_id,
      appointment_date: startOfDate,
      shift,
      stt: nextSTT,
      reason: reason || "Khám sức khỏe",
      hasInsurance: hasInsurance === true || hasInsurance === "true",
      status: initialStatus,
    });

    let qrInfo = null;
    if (initialStatus === "pending") {
      const amount = 150000;
      const paymentCode = `MH${newAppointment._id.toString().slice(-6).toUpperCase()}`;

      await invoiceModel.createInvoice({
        patient_id: patient_id,
        appointment_id: newAppointment._id,
        total_amount: amount,
        status: "unpaid",
        paymentCode: paymentCode,
      });

      qrInfo = {
        bankId: env.BANK_ID,
        accountNo: env.BANK_ACCOUNT,
        accountName: env.BANK_ACCOUNT_NAME,
        amount,
        addInfo: paymentCode,
      };
    }

    return {
      ...newAppointment.toObject(),
      baseStartTime,
      qrInfo, // Trả về thông tin QR cho FE
    };
  } catch (error) {
    throw error;
  }
};

const checkStatus = async (id) => {
  return await appointmentModel.getAppointmentById(id);
};

const getAvailableDoctors = async (date, shift, deptId) => {
  try {
    const dayName = dayjs(date).format("dddd");
    const activeSchedules = await mongoose
      .model("doctor_schedules")
      .find({ day_of_week: dayName });
    const doctorIds = activeSchedules
      .filter((s) =>
        shift === "Morning" ? s.start_time < "12:00" : s.start_time >= "12:00",
      )
      .map((s) => s.doctor_id);

    return await mongoose
      .model("doctors")
      .find({
        _id: { $in: doctorIds },
        department_id: new mongoose.Types.ObjectId(deptId),
      })
      .populate("user_id", "username avatar");
  } catch (error) {
    throw error;
  }
};

const getPatientAppointments = async (pid) => {
  return await appointmentModel.getAppointmentsByPatient(pid);
};

const getDoctorAppointments = async (did) => {
  return await appointmentModel.getAppointmentsByDoctorPopulated(did);
};

const updateAppointmentStatus = async (id, status) => {
  return await appointmentModel.updateAppointment(id, { status });
};

export const appointmentService = {
  bookAppointment,
  checkStatus, // Export mới
  getAvailableDoctors,
  getPatientAppointments,
  getDoctorAppointments,
  updateAppointmentStatus,
};
