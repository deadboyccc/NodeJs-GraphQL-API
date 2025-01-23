import globals from "globals"
import pluginJs from "@eslint/js"
import tseslint from "@typescript-eslint/eslint-plugin"
import tsParser from "@typescript-eslint/parser"

/** @type {import('eslint').Linter.Config} */
export default {
  overrides: [
    {
      files: ["**/*.{js,mjs,cjs,ts}"],
      languageOptions: {
        parser: tsParser,
        globals: globals.browser
      },
      ...pluginJs.configs.recommended,
      ...tseslint.configs.recommended,
      rules: {
        "no-unused-vars": "off"
      }
    }
  ]
}
