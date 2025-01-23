import mongoose from "mongoose"

async function connectDB() {
  try {
    await mongoose.connect(
      process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/graphql"
    )
    console.log("Connected to MongoDB")
  } catch (error) {
    console.error("Error connecting to MongoDB:", error)
    process.exit(1) // Exit process on connection failure
  }
}

export default connectDB
