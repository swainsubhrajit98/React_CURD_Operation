import Joi from "joi";

const itemSchema = Joi.object({
  name: Joi.string().min(2).max(120).required().messages({
    "string.empty": "Name is required",
    "string.min": "Name must be at least 2 characters long",
    "string.max": "Name cannot exceed 120 characters",
  }),
  description: Joi.string().allow(null, ""),
  price: Joi.number().positive().precision(2).required().messages({
    "number.base": "Price must be a number",
    "number.positive": "Price must be greater than 0",
  }),
});

export const validateItem = (req, res, next) => {
  const { error } = itemSchema.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: error.details.map((err) => err.message),
    });
  }
  next();
};
