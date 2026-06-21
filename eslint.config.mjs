import withNuxt from './.nuxt/eslint.config.mjs';

export default withNuxt({
    rules: {

        /*
         * =====================================================
         * JavaScript
         * =====================================================
         */

        // '
        quotes: ['error', 'single'],

        // ;
        semi: ['error', 'always'],

        // trailing comma
        'comma-dangle': ['error', 'always-multiline'],

        // 120 chars
        'max-len': [
            'warn',
            {
                code: 120,
                ignoreUrls: true,
                ignoreStrings: true,
                ignoreTemplateLiterals: true,
                ignoreComments: true,
                ignoreTrailingComments: true,
                ignoreRegExpLiterals: true,
            },
        ],

        // console.warn/error only
        'no-console': [
            'error',
            {
                allow: ['warn', 'error'],
            },
        ],

        // debugger forbidden
        'no-debugger': 'error',

        // no var
        'no-var': 'error',

        // prefer const
        'prefer-const': 'error',

        // === only
        eqeqeq: ['error', 'always'],

        // { foo }
        'object-shorthand': ['error', 'always'],

        // `hello ${name}`
        'prefer-template': 'error',

        // always braces
        curly: ['error', 'all'],

        // ()
        'arrow-body-style': ['error', 'as-needed'],

        // no multiple statements
        'max-statements-per-line': [
            'error',
            {
                max: 1,
            },
        ],

        // duplicate imports
        'no-duplicate-imports': 'error',

        'no-multiple-empty-lines': [
            'error',
            {
                max: 1,
            },
        ],

        /*
         * =====================================================
         * TypeScript
         * =====================================================
         */

        '@typescript-eslint/no-unused-vars': [
            'error',
            {
                argsIgnorePattern: '^_',
                varsIgnorePattern: '^_',
                caughtErrorsIgnorePattern: '^_',
                destructuredArrayIgnorePattern: '^_',
            },
        ],

        '@typescript-eslint/consistent-type-imports': ['error', {
            prefer: 'type-imports',
            disallowTypeAnnotations: false,
        }],

        '@typescript-eslint/no-explicit-any': 'warn',

        '@typescript-eslint/no-non-null-assertion': 'error',

        '@typescript-eslint/no-empty-function': [
            'error',
            {
                allow: ['arrowFunctions'],
            },
        ],

        // TS can infer types
        '@typescript-eslint/explicit-function-return-type': 'off',

        '@typescript-eslint/no-magic-numbers': [
            'warn',
            {
                ignore: [-1, 0, 1, 2, 1000],
                ignoreEnums: true,
                ignoreArrayIndexes: true,
                ignoreDefaultValues: true,
                ignoreClassFieldInitialValues: true,
                ignoreReadonlyClassProperties: true,
            },
        ],

        /*
         * =====================================================
         * Vue
         * =====================================================
         */

        'vue/html-self-closing': [
            'error',
            {
                html: {
                    void: 'always',
                    normal: 'always',
                    component: 'always',
                },

                svg: 'always',
                math: 'always',
            },
        ],

        'vue/attributes-order': 'error',
    },

    files: ['**/*.ts', '**/*.vue', '**/*.tsx', '**/*.jsx'],
    languageOptions: {
        parserOptions: {
            project: './tsconfig.json',
        },
    },

});
