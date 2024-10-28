import { body } from "express-validator";

export const AccountTransactionSchema = () => {
  return [
    body("amount")
    .isNumeric().withMessage("Amount must be a number")
    .isFloat({ gt: 0 }).withMessage("Amount must be greater than zero"),
  ];
};
