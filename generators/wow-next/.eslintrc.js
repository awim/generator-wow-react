module.exports = { 
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: 'tsconfig.json',
        tsconfigRootDir: __dirname, 
        sourceType: 'module',
      },
    extends: [
        'next/core-web-vitals',
        'prettier',
        'plugin:@typescript-eslint/recommended'
    ],
    rules: {
        semicolon: 0,
        'react/jsx-key': 'off',
        'react/no-unescaped-entities': 'off',
        '@next/next/no-page-custom-font': 'off',
        'prefer-const': 'error',
        '@next/next/no-img-element': 'off',
        '@typescript-eslint/no-unused-vars': 'off',

    }
}
