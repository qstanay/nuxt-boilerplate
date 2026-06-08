import eslintConfigPrettier from 'eslint-config-prettier';
import simpleImportSort from 'eslint-plugin-simple-import-sort';

import withNuxt from './.nuxt/eslint.config.mjs';

export default withNuxt(
    {
        plugins: {
            'simple-import-sort': simpleImportSort,
        },
        rules: {
            'no-console': ['warn', { allow: ['warn', 'error'] }],
            'no-debugger': 'error',
            eqeqeq: ['error', 'always', { null: 'ignore' }],
            curly: ['error', 'all'],
            'no-var': 'error',
            'prefer-const': 'error',
            'object-shorthand': ['error', 'always'],
            'no-implicit-coercion': 'error',
            'no-alert': 'error',
            'simple-import-sort/imports': 'error',
            'simple-import-sort/exports': 'error',
        },
    },
    eslintConfigPrettier,
);
