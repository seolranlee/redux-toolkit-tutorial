module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  extends: [
    // ESLint: 문법 검사 도구
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  // Prettier: 코드 정리 도구(fomatter)
  plugins: ['prettier', '@typescript-eslint'],
  // .eslintrc.js안에서 prettier 포매팅 함께 적용
  rules: {
    'prettier/prettier': [
      // 하기 규칙들이 지켜지지 않으면 에러로 간주한다. // error / warn / off
      'error',
      {
        singleQuote: true,
        semi: true,
        useTabs: false,
        tabWidth: 2,
        printWidth: 80,
        bracketSpacing: true,
        arrowParens: 'avoid',
      },
    ],
  },
  parserOptions: {
    parser: '@typescript-eslint/parser',
  },
};
