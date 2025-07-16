import "@testing-library/jest-dom";

// Mock localStorage
const localStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};

Object.defineProperty(window, "localStorage", {
  value: localStorage,
});

// Mock styled-components
jest.mock("styled-components", () => ({
  __esModule: true,
  default: jest.fn(() => {
    return (props: any) => props.children;
  }),
  createGlobalStyle: jest.fn(() => () => null),
}));

// Mock fetch
global.fetch = jest.fn();

// Reset all mocks after each test
afterEach(() => {
  jest.clearAllMocks();
});
