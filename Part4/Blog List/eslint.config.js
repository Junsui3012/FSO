import globals from 'globals'
import { defineConfig } from 'eslint/config'
import js from '@eslint/js'
import stylistic from '@stylistic/eslint-plugin'

export default defineConfig([
  js.configs.recommended,

  {
    ignores: ['node_modules/**'],
  },

  {
    plugins: {
      '@stylistic/js': stylistic,
    },
    rules: {
      '@stylistic/js/indent': ['error', 2],
      '@stylistic/js/linebreak-style': ['error', 'unix'],
      '@stylistic/js/quotes': ['error', 'single'],
      '@stylistic/js/semi': ['error', 'never'],
    }
  },

  {
    files: ['**/*.{js,mjs,cjs}'],
    languageOptions: {
      sourceType: 'module',
      ecmaVersion: 'latest',
      globals: { ...globals.node },
    }
  },
])
