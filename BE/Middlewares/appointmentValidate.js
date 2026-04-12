import Joi from "joi";

const bookAppointmentSchema = Joi.object({
  doctor_id: Joi.string().hex().length(24).required().messages({
    "string.empty": "Vui lòng chọn bác sĩ",
    "any.required": "Trường doctor_id là bắt buộc",
  }),

  // SỬA LỖI: Sử dụng .min('now') để chặn đặt lịch vào các ngày trước hôm nay
  appointment_date: Joi.date().min("now").required().messages({
    "date.base": "Ngày khám không hợp lệ",
    "date.min": "Không thể đặt lịch khám cho các ngày trong quá khứ",
    "any.required": "Vui lòng chọn ngày khám",
  }),

  shift: Joi.string().valid("Morning", "Afternoon").required().messages({
    "any.only": "Buổi khám không hợp lệ",
  }),

  hasInsurance: Joi.boolean().required().messages({
    "any.required": "Vui lòng xác nhận trạng thái bảo hiểm",
  }),

  reason: Joi.string().max(500).allow("").optional(),
});

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
