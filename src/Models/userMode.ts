import mongoose, { Model, Schema } from "mongoose"
import bcrypt from "bcryptjs"
// Define the interface for your document
export interface IUserDocument extends Document {
  name: string
  email: string
  password: string
  passwordConfirm: string | undefined
  isModified: (path: string) => boolean
}
// Define the interface for your model
export interface IUserModel extends Model<IUserDocument> {}

const userSchema = new mongoose.Schema<IUserDocument>({
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
      message: "Invalid email format"
    }
  },
  password: { type: String, required: true },
  passwordConfirm: {
    type: String,
    required: false,
    min: 6,
    validate: {
      validator: function (this: IUserDocument, value: string) {
        return value === this.password
      },
      message: "Passwords must match"
    }
  }
})

// Pre-save middleware for hashing passwords
userSchema.pre("save", async function (this: IUserDocument, next) {
  //encrypt run the function if passwords was actually modified
  if (!this.isModified("password")) return next()
  //bcrypt the password
  this.password! = await bcrypt.hash(this.password!, 1)
  this.passwordConfirm = undefined

  next()
})
// Compile model from schema
export const User: IUserModel = mongoose.model<IUserDocument, IUserModel>(
  "User",
  userSchema
)
