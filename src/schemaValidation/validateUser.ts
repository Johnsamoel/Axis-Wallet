import { body } from "express-validator";

export const loginSchema = () => {
  return [
    body("email").isEmail().withMessage("invalid email format"),
    body("password")
      .isStrongPassword({ minLength: 6, minLowercase: 1, minUppercase: 1 })
      .withMessage("invalid password"),
  ];
};

export const registerUserSchema = () => {
  return [
    body("email").isEmail().withMessage("invalid email format"),
    body("password")
      .isStrongPassword()
      .withMessage(
        "Password must be at least 6 characters long and include at least one lowercase letter, and one uppercase letter"
      ),
    body("name")
      .isLength({ min: 4 })
      .withMessage("Name must be at least 4 characters long"),
  ];
};
