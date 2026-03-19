import Joi from "joi";

// Định nghĩa bộ quy tắc cho Đăng ký
const registerSchema = Joi.object({
  username: Joi.string().min(3).max(30).required().messages({
    "string.empty": "Username không được để trống",
    "string.min": "Username phải có ít nhất 3 ký tự",
    "string.max": "Username không được vượt quá 30 ký tự",
    "any.required": "Trường username là bắt buộc",
  }),
  email: Joi.string().email().required().messages({
    "string.empty": "Email không được để trống",
    "string.email": "Email không đúng định dạng hợp lệ",
    "any.required": "Trường email là bắt buộc",
  }),
  password: Joi.string()
    .min(8)
    .max(32)
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).*$/)
    .required()
    .messages({
      "string.empty": "Mật khẩu không được để trống",
      "string.min": "Mật khẩu phải có ít nhất 8 ký tự",
      "string.max": "Mật khẩu không được vượt quá 32 ký tự",
      "string.pattern.base":
        "Mật khẩu phải bao gồm ít nhất 1 chữ hoa, 1 chữ thường, 1 chữ số và 1 ký tự đặc biệt",
      "any.required": "Trường mật khẩu là bắt buộc",
    }),
});

//Định nghĩa bộ quy tắc cho Đăng nhập
const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.empty": "Email không được để trống",
    "string.email": "Email không đúng định dạng",
    "any.required": "Trường email là bắt buộc",
  }),
  password: Joi.string().required().messages({
    "string.empty": "Mật khẩu không được để trống",
    "any.required": "Trường mật khẩu là bắt buộc",
  }),
});

// registerValidate
export const registerValidate = (req, res, next) => {
  const { error } = registerSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
  }

  next();
};

//Viết lại hàm loginValidate
export const loginValidate = (req, res, next) => {
  const { error } = loginSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
  }

  next();
};
