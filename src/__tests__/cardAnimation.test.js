import { animateCardDraw } from '../utils/cardAnimation';

// Mock DOM methods
Object.defineProperty(document, 'querySelector', {
  value: jest.fn(() => ({
    getBoundingClientRect: () => ({ left: 100, top: 100, width: 80, height: 100 })
  })),
  writable: true
});

Object.defineProperty(document.body, 'appendChild', {
  value: jest.fn(),
  writable: true
});

Object.defineProperty(document.body, 'removeChild', {
  value: jest.fn(),
  writable: true
});

// Mock setTimeout
jest.useFakeTimers();

describe('animateCardDraw', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();
  });

  test('creates animated card element', () => {
    const card = { name: '5', type: 'basic', value: 5 };
    const onComplete = jest.fn();

    animateCardDraw(card, onComplete);

    expect(document.body.appendChild).toHaveBeenCalled();
  });

  test('calls onComplete after animation sequence', () => {
    const card = { name: '5', type: 'basic', value: 5 };
    const onComplete = jest.fn();

    animateCardDraw(card, onComplete);

    // Fast-forward through all timers
    jest.runAllTimers();

    expect(onComplete).toHaveBeenCalled();
  });

  test('removes animated element after completion', () => {
    const card = { name: '5', type: 'basic', value: 5 };
    const onComplete = jest.fn();

    animateCardDraw(card, onComplete);

    // Fast-forward through all timers
    jest.runAllTimers();

    expect(document.body.removeChild).toHaveBeenCalled();
  });
});