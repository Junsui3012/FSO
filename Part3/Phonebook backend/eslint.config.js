import globals from 'globals'
import {defineConfig} from 'eslint/config'
import js from '@eslint/js'
import stylisticJS from '@stylistic/eslint-plugin'

export default defineConfig([
  {
    ignores: ['dist/**', 'node_modules/**'],
  },

  js.configs.recommended,

  {
    plugins: {
      '@stylistic/js': stylisticJS,
    },
    rules: {
      '@stylistic/js/indent': ['error', 2],
      '@stylistic/js/linebreak-style': ['error', 'unix'],
      '@stylistic/js/quotes': ['error', 'single'],
      '@stylistic/js/semi': ['error', 'never'],
    },
  },

  {
    files: ['**/*.{js,mjs,cjs}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.node
      },
    },
    rules: {
      'eqeqeq': 'error',
      'no-trailing-spaces': 'error',
      'object-curly-spacing': 'error',
    }
  },
])
