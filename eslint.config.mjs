import javascript from '@eslint/js';
import astro from 'eslint-plugin-astro';
import jsxAccessibility from 'eslint-plugin-jsx-a11y-x';
import globals from 'globals';
import typescriptEslint from 'typescript-eslint';

const typedFiles = ['**/*.ts', '**/*.tsx'];
const astroClientScripts = ['**/*.astro/*.ts', '**/*.astro/*.js'];
const typed = (configurations) =>
  configurations.map((configuration) => ({
    ...configuration,
    files: typedFiles,
    ignores: astroClientScripts,
  }));

export default typescriptEslint.config(
  { ignores: ['dist', '.astro', 'storybook-static', 'node_modules'] },
  { linterOptions: { reportUnusedDisableDirectives: 'error' } },

  javascript.configs.recommended,
  ...typed(typescriptEslint.configs.strictTypeChecked),
  ...typed(typescriptEslint.configs.stylisticTypeChecked),
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

  { files: ['**/*.tsx'], ...jsxAccessibility.configs.strict },

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
