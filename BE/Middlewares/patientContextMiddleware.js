import { patientModel } from "../Models/patientModel.js";

/**
 * Gắn req.patientId / req.patient từ user đang đăng nhập (role patient).
 * Dùng sau verifyToken + checkRole("patient").
 */
export const requirePatient = async (req, res, next) => {
  try {
    const patient = await patientModel.getPatientByUserId(req.user.id);
    if (!patient) {
      return res.status(403).json({
        message:
          "Tài khoản chưa có hồ sơ bệnh nhân. Vui lòng hoàn tất đăng ký hồ sơ.",
      });
    }
    req.patient = patient;
    req.patientId = patient._id;
    next();
  } catch (error) {
    next(error);
  }
};
