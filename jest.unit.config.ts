/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

import config from './jest.config'

export default { ...config, testMatch: ['**/*.test.ts'] }
