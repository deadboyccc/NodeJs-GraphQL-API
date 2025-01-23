import dotenv from "dotenv"
import { faker } from "@faker-js/faker"
import mongoose from "mongoose"
import { User } from "../Models/userMode"

// Start the timer
const start = Date.now()

// Load environment variables
dotenv.config({ path: `${__dirname}/config.env` })

const db = process.env.DATA_LOCAL || "mongodb://127.0.0.1:27017/graphql"

if (!db) {
  console.error("❌ DATABASE URL is missing in environment variables!")
  process.exit(1)
}

const main = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(db)
    console.log("✅ DB Connection Successful!")

    // Check for the "--import" argument
    if (process.argv.includes("--import")) {
      console.log("⏳ Importing data...")

      // Clear existing data
      await User.deleteMany({})
      console.log("⚡ Existing data cleared.")

      // Generate data
      const data: any[] = []
      for (let i = 0; i < 5; i++) {
        const password = faker.internet.password()
        data.push({
          name: faker.person.fullName(),
          email: faker.internet.email().toLowerCase(),
          password: password,
          passwordConfirm: password
        })
      }

      // Save each user to ensure pre-save middleware is triggered
      for (let i = 0; i < data.length; i++) {
        const user = new User(data[i])
        await user.save()
        console.log(`${i + 1}/${data.length} user saved!`)
      }

      console.log("✅ Data imported successfully!")
    } else {
      console.warn(
        "⚠️ No valid arguments provided. Use --import to import data."
      )
    }
  } catch (err: any) {
    console.error("❌ Error occurred:", err.message)
  } finally {
    // Close MongoDB connection
    await mongoose.connection.close()
    console.log("🔒 Database connection closed.")
    const end = Date.now()
    console.log(`⏱️ Process took ${(end - start) / 1000} seconds.`)
  }
}

// Execute the script
main()
