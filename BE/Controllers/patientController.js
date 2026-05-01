import { patientModel } from "../Models/patientModel.js";
import { userModel } from "../Models/userModel.js";

// 1. Lấy danh sách bệnh nhân cơ bản (Cho Bác sĩ/Admin)
const getPatients = async (req, res) => {
  try {
    const patients = await userModel.getUsersByRole("patient");
    res.json({ success: true, data: patients });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 2. Tạo hồ sơ bệnh nhân (Dùng khi đăng ký)
const createPatient = async (req, res) => {
  try {
    const patient = await patientModel.createPatient(req.body);
    res.status(201).json({ success: true, data: patient });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// 3. Cập nhật hồ sơ chung (SĐT, Địa chỉ...)
const updatePatientProfile = async (req, res) => {
  try {
    const { gender, birth_date, address, cccd, phone, username } = req.body;
    await userModel.updateUser(req.user.id, { phone, username });
    const patient = await patientModel.updatePatientByUserId(req.user.id, {
      gender,
      birth_date,
      address,
      cccd,
    });
    res.status(200).json({ success: true, data: patient });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 4. User gửi yêu cầu xác thực BHYT
const updateBHYTInfo = async (req, res) => {
  try {
    const updateData = {
      bhyt_code: req.body.bhyt_code,
      bhyt_initial_clinic: req.body.bhyt_initial_clinic,
      bhyt_expiration_date: req.body.bhyt_expiration_date,
      bhyt_status: "pending",
      bhyt_note: "",
    };
    if (req.file) {
      updateData.bhyt_proof_image = req.file.path.replace(/\\/g, "/");
    }
    const patient = await patientModel.updatePatientByUserId(
      req.user.id,
      updateData,
    );
    res.status(200).json({ success: true, data: patient });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 5. Admin lấy toàn bộ danh sách để duyệt BHYT
const getAllPatients = async (req, res) => {
  try {
    const patients = await patientModel.getAllPatients();
    res.status(200).json({ success: true, data: patients });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 6. Admin phê duyệt/từ chối BHYT
const adminVerifyBHYT = async (req, res) => {
  try {
    const { status, bhyt_note } = req.body;
    const patient = await patientModel.updatePatient(req.params.id, {
      bhyt_status: status,
      bhyt_note: status === "rejected" ? bhyt_note : "",
    });
    res.status(200).json({ success: true, data: patient });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ĐẢM BẢO EXPORT ĐẦY ĐỦ 6 HÀM TRÊN
export const patientController = {
  getPatients,
  createPatient,
  updatePatientProfile,
  updateBHYTInfo,
  getAllPatients,
  adminVerifyBHYT,
};
