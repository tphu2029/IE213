import Joi from "joi";

// Định nghĩa bộ quy tắc cho việc đặt lịch khám
const bookAppointmentSchema = Joi.object({
  // Bắt buộc phải truyền lên ID của bác sĩ (Định dạng ObjectId của MongoDB là chuỗi hex 24 ký tự)
  doctor_id: Joi.string().hex().length(24).required().messages({
    "string.empty": "Vui lòng chọn bác sĩ",
    "string.hex": "ID bác sĩ không hợp lệ",
    "string.length": "ID bác sĩ không đúng định dạng chuẩn",
    "any.required": "Trường doctor_id là bắt buộc",
  }),

  // Ngày khám bắt buộc phải lớn hơn thời điểm hiện tại ('now')
  appointment_date: Joi.date().greater("now").required().messages({
    "date.base": "Ngày giờ khám không đúng định dạng",
    "date.greater":
      "Không thể đặt lịch khám trong quá khứ. Vui lòng chọn thời gian tương lai!",
    "any.required": "Vui lòng chọn ngày giờ khám",
  }),

  // Lý do khám: Không bắt buộc, nhưng nếu nhập thì không được dài quá 500 ký tự để tránh spam
  reason: Joi.string().max(500).allow("").optional().messages({
    "string.max": "Lý do khám không được vượt quá 500 ký tự",
  }),
});

// Middleware xác thực
export const validateBookAppointment = (req, res, next) => {
  const { error } = bookAppointmentSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
  }

  next();
};
