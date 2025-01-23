# NodeTS Project

This is a simple `Node.js Starter` using TypeScript.

## Project Structure

- `.vscode/launch.json`: Configuration for debugging with VSCode.
- `.vscode/tasks.json`: Configuration for TypeScript tasks in VSCode.
- `.gitignore`: Specifies files and directories to be ignored by Git.
- `.prettierrc`: Configuration for Prettier code formatter.
- `src/index.ts`: Entry point of the application.
- `eslint.config.mjs`: Configuration for ESLint.
- `tsconfig.json`: TypeScript compiler options.
- `package.json`: Project metadata and dependencies.

## Getting Started

### Prerequisites

- Node.js
- npm

### Installation

1. Clone the repository:
  ```sh
  git clone <repository-url>
  cd nodets
  ```

2. Install dependencies:
  ```sh
  npm install
  ```

### Running the Application

To start the application:
```sh
npm start
```

To start the application with Nodemon for automatic restarts:
```sh
npm run nodemon
```

### Development

To watch for TypeScript changes and compile automatically:
```sh
npm run tsc:watch
```

### Linting

To lint the code using ESLint:
```sh
npm run lint
```
