import valid from "validator"

export const validateCreateUser = (
  email: string,
  name: string,
  password: string,
  passwordConfrim: string
): void => {
  // Validate user input
  if (!valid.isEmail(email)) {
    throw new Error("Invalid email format")
  }
  if (valid.isEmpty(password) || !valid.isLength(password, { min: 6 })) {
    throw new Error("Password must be at least 6 characters long")
  }
  if (!valid.equals(password, passwordConfrim)) {
    throw new Error("Passwords do not match")
  }
  if (valid.isEmpty(name)) {
    throw new Error("Name is required ")
  }
}
