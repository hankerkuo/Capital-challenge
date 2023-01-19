// src/setupTests.js
import { server } from 'src/mocks/server'
import { cleanup } from '@testing-library/react'

// Establish API mocking before all tests.
beforeAll(() => server.listen())
// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => {
  server.resetHandlers();
  // clean up rendered components in each test
  cleanup();
})
// Clean up after the tests are finished.
afterAll(() => server.close())
