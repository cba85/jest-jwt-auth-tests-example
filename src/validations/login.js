import { z } from "zod";

export default function loginValidation(params) {
  const emailSchema = z.string().email();
  const passwordSchema = z.string().min(8);

  try {
    emailSchema.parse(params.email);
    passwordSchema.parse(params.password);
  } catch (error) {
    //console.error(error);
    return false;
  }

  return true;
}
