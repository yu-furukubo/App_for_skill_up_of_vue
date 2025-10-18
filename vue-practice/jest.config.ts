import type { Config } from 'jest'

const config: Config = {
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['vue', 'ts', 'tsx', 'js', 'jsx', 'json'],

  transform: {
    '^.+\\.vue$': '@vue/vue3-jest',
    '^.+\\.(t|j)sx?$': ['ts-jest', { isolatedModules: true, tsconfig: 'tsconfig.json' }],
  },

  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.(css|scss|sass)$': 'identity-obj-proxy',

    '^@vue/test-utils$': '<rootDir>/node_modules/@vue/test-utils/dist/vue-test-utils.cjs.js',
  },

  // ESM な依存を必要に応じて変換
  transformIgnorePatterns: [
    '/node_modules/(?!(@vue|vue|@testing-library)/)'
  ],

  testMatch: [
    '**/__tests__/**/*.[jt]s?(x)',
    '**/?(*.)+(spec|test).[tj]s?(x)',
  ],

  setupFilesAfterEnv: ['@testing-library/jest-dom'],
}

export default config
