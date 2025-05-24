import js from '@eslint/js';
import globals from 'globals';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import prettier from 'eslint-config-prettier';

export default [
  { ignores: ['dist', 'build'] },

  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    // I need to add the rules for indentation
    rules: {
      // ✅ Base ESLint rules
      ...js.configs.recommended.rules,

      ...react.configs.recommended.rules,

      // ✅ React Hooks rules
      ...reactHooks.configs.recommended.rules,

      // ✅ Optional: Prettier (disables formatting rules to avoid conflicts)
      ...prettier.rules,

      // ✅ Custom rules
      'indent': ["error", 2],
      'no-unused-vars': ['warn', { varsIgnorePattern: '^[A-Z_]' }],
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      'prefer-template': 'warn',
      'no-useless-concat': 'warn',
      'template-curly-spacing': ['error', 'never'],
      'semi': ['error', 'always'],
      // Disallow trailing spaces
      'no-trailing-spaces': 'error',

      // Enforce a maximum line length (e.g., 100 characters)
      'max-len': ['warn', { code: 100, tabWidth: 2, ignoreUrls: true }],

      // Disallow nested ternary expressions
      'no-nested-ternary': 'error',

      // Enforce a newline at the end of files
      'eol-last': ['error', 'always'],
    },
  },
];
