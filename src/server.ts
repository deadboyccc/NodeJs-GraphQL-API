import express from "express"
import { createHandler } from "graphql-http/lib/use/node"
import { buildSchema, GraphQLError } from "graphql"
import { readFileSync } from "fs"
import path from "path"
import connectDB from "./utils/db"
import { root } from "./graphql/resolvers/UserResolvers"
connectDB()
// Define the schema
const file = readFileSync(
  path.join(__dirname, "./graphql/schema.graphql"),
  "utf8"
)
const schema = buildSchema(file)

const app = express()
// GraphQL endpoint - (schema + resolvers)
app.use(
  "/graphql",
  createHandler({
    schema,
    rootValue: root
  })
)

// Start the server
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}/graphql`)
})
