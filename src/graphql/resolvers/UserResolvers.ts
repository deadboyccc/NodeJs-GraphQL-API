import { User } from "../../Models/userMode"
import valid from "validator"
import { validateCreateUser } from "../../utils/validators"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"

export interface UserInput {
  name: string
  email: string
  password: string
  passwordConfirm: string
}

interface LoginInput {
  email: string
  password: string
}

const JWT_SECRET = "your_jwt_secret" // Replace with your actual secret

// Define the root resolver
export const root = {
  users: async () => {
    return User.find()
  },
  createUser: async ({ input }: { input: UserInput }) => {
    try {
      // Destructuring the input & creating the error record
      const { name, email, password, passwordConfirm } = input
      //log all values
      // console.log("name:", name)
      // console.log("email:", email)
      // console.log("password:", password)
      // console.log("passwordConfirm:", passwordConfirm)

      // Validate input using custom validator function
      validateCreateUser(email, name, password, passwordConfirm)

      // Check if the email already exists
      const existingUser = await User.findOne({ email })
      if (existingUser) {
        throw new Error("Email already exists")
      }

      // Outside Model Validation

      const user = await User.create({
        name,
        email,
        password,
        passwordConfirm
      })

      console.log(user)
      return user
    } catch (error: any) {
      console.error("Error creating user:", error.message, error.stack)

      // Re-throw the error to be handled by the GraphQL server or returned to the client
      throw new Error("Failed to create user")
    }
  },
  login: async (input: LoginInput) => {
    try {
      const { email, password } = input
      const user = await User.findOne({ email }).select("+password").exec()

      if (!user) {
        throw new Error("User not found")
      }

      const isMatch = await bcrypt.compare(password, user.password)
      if (!isMatch) {
        throw new Error("Incorrent email or password")
      }

      const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
        expiresIn: "1h"
      })

      return { token, id: user.id }
    } catch (err: any) {
      throw new Error("Invalid credentials")
    }
  }
}
