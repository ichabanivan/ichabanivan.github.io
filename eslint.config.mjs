import js from '@eslint/js';
import astro from 'eslint-plugin-astro';
import jsxA11y from 'eslint-plugin-jsx-a11y-x';
import globals from 'globals';
import tseslint from 'typescript-eslint';

const typedFiles = ['**/*.ts', '**/*.tsx'];
const astroClientScripts = ['**/*.astro/*.ts', '**/*.astro/*.js'];
const typed = (configs) =>
  configs.map((config) => ({ ...config, files: typedFiles, ignores: astroClientScripts }));

export default tseslint.config(
  { ignores: ['dist', '.astro', 'storybook-static', 'node_modules'] },
  { linterOptions: { reportUnusedDisableDirectives: 'error' } },

  js.configs.recommended,
  ...typed(tseslint.configs.strictTypeChecked),
  ...typed(tseslint.configs.stylisticTypeChecked),
  {
    files: typedFiles,
    ignores: astroClientScripts,
    languageOptions: {
      parserOptions: { projectService: true, tsconfigRootDir: import.meta.dirname },
    },
    rules: {
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/restrict-template-expressions': ['error', { allowNumber: true }],
      '@typescript-eslint/no-confusing-void-expression': ['error', { ignoreArrowShorthand: true }],
      '@typescript-eslint/no-empty-function': ['error', { allow: ['arrowFunctions'] }],
      '@typescript-eslint/prefer-nullish-coalescing': [
        'error',
        { ignorePrimitives: { string: true, boolean: true } },
      ],
      '@typescript-eslint/no-unnecessary-condition': 'off',
      '@typescript-eslint/non-nullable-type-assertion-style': 'off',
    },
  },

  { files: ['**/*.tsx'], ...jsxA11y.configs.strict },

  ...astro.configs['flat/recommended'],
  ...astro.configs['flat/jsx-a11y-strict'],
  {
    files: astroClientScripts,
    languageOptions: { globals: globals.browser },
    rules: { 'no-unused-vars': ['error', { caughtErrors: 'none' }] },
  },

  {
    files: ['src/scripts/**', 'src/lib/**', 'src/stories/**', '.storybook/**'],
    languageOptions: { globals: globals.browser },
  },
  {
    files: ['*.mjs', 'scripts/**'],
    languageOptions: { globals: globals.node },
    rules: { 'no-unused-vars': ['error', { ignoreRestSiblings: true }] },
  },

  {
    files: ['src/**/*.ts', 'src/**/*.tsx'],
    ignores: ['**/*.stories.tsx'],
    rules: {
      'no-restricted-syntax': [
        'error',
        { selector: 'ExportDefaultDeclaration', message: 'Use named exports only.' },
      ],
    },
  },
  {
    files: ['src/**/index.ts'],
    rules: {
      'no-restricted-syntax': [
        'error',
        {
          selector: 'Program > :not(ExportNamedDeclaration[source], ExportAllDeclaration)',
          message: 'An index.ts contains only re-exports.',
        },
      ],
    },
  },
);
