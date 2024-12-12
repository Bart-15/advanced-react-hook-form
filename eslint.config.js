import js from '@eslint/js';
import eslintPluginImport from 'eslint-plugin-import';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { ignores: ['dist', 'coverage'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      import: eslintPluginImport,
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'no-console': ['warn'],
      'no-unused-vars': ['warn'],
      'max-lines-per-function': ['warn', 40],
      'import/extensions': ['error', 'never'],
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
      'sort-imports': 'off',
      'import/order': 'off',
      'import/extensions': 'off',
      'import/prefer-default-export': 0,
      'import/no-extraneous-dependencies': 0, //Disable the rule
      'import/no-unresolved': 0,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
    overrides: [
      {
        files: ['*.test.js', '*.test.jsx', '*.test.ts', '*.test.tsx'], // Target test files
        rules: {
          'max-lines-per-function': 'off', // Disable the rule for test files
        },
      },
    ],
  },
);
