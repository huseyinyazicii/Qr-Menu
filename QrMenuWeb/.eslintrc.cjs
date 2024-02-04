module.exports = {
    root: true,
    env: { browser: true, es2020: true },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react-hooks/recommended',
    ],
    ignorePatterns: ['dist', '.eslintrc.cjs'],
    parser: '@typescript-eslint/parser',
    plugins: ['react-refresh'],
    rules: {
        'react-refresh/only-export-components': 'off',
        '@typescript-eslint/no-explicit-any': 'off',        // any kullanılan yerler için
        '@typescript-eslint/no-empty-function': 'off',      // empty function'lar için
        'react-hooks/exhaustive-deps': 'off',               // useEffect dependencies
    },
};