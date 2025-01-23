# NodeJs-GraphQL Project

## Overview

This project is a simple Node.js application designed to experiment with GraphQL API designs. It is not intended for production use but rather serves as a learning and experimentation platform.

## Features

- **GraphQL API**: Implemented using Apollo Server and GraphQL.
- **User Authentication**: Basic user authentication with JWT.
- **MongoDB Integration**: Uses Mongoose for MongoDB interactions.
- **TypeScript**: Written in TypeScript for type safety and better development experience.
- **Validation**: Input validation using `validator` library.
- **Environment Configuration**: Managed using `dotenv`.

## Project Structure

- **src/graphql**: Contains GraphQL schema and resolvers.
- **src/Models**: Mongoose models for MongoDB collections.
- **src/utils**: Utility functions for database connection and validation.
- **src/server.ts**: Entry point of the application.

## Getting Started

### Prerequisites

- Node.js
- MongoDB

### Installation

1. Clone the repository:
  ```sh
  git clone https://github.com/yourusername/nodets-graphql.git
  cd nodets-graphql
  ```

2. Install dependencies:
  ```sh
  npm install
  ```

3. Set up environment variables:
  Create a `.env` file in the root directory and add your MongoDB URI:
  ```env
  MONGODB_URI=mongodb://127.0.0.1:27017/graphql
  ```

### Running the Application

1. Start the server:
  ```sh
  npm start
  ```

2. The server will be running at `http://localhost:4000/graphql`.

### Importing Test Data

To import test data, run the following command:
```sh
ts-node src/utils/testData.ts --import
```

## Note

This project is for learning and experimenting with GraphQL API designs. It is not intended for production use.
