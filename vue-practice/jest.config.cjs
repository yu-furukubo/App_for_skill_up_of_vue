/** @type {import('jest').Config} */
const config = {
  testEnvironment: 'jsdom',
  preset: 'ts-jest',
  transform: {
    '^.+\\.vue$': '@vue/vue3-jest',
    '^.+\\.(ts|tsx|js)$': ['ts-jest', { tsconfig: 'tsconfig.spec.json' }],
  },
  moduleFileExtensions: ['vue', 'ts', 'js', 'json'],
  roots: ['<rootDir>/src', '<rootDir>/tests'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
  },
  setupFilesAfterEnv: ['<rootDir>/tests/setup.ts'],
  testEnvironmentOptions: {
    customExportConditions: ['node', 'require', 'default'],
  },
}

module.exports = config
