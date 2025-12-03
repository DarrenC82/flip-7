import { isBust } from '../utils/bust';

describe('isBust', () => {
  test('returns false for empty hand', () => {
    expect(isBust([])).toBe(false);
  });

  test('returns false for single basic card', () => {
    const hand = [{ name: '5', type: 'basic', value: 5 }];
    expect(isBust(hand)).toBe(false);
  });

  test('returns false for unique basic cards', () => {
    const hand = [
      { name: '5', type: 'basic', value: 5 },
      { name: '7', type: 'basic', value: 7 },
      { name: '2', type: 'basic', value: 2 }
    ];
    expect(isBust(hand)).toBe(false);
  });

  test('returns true for duplicate basic cards', () => {
    const hand = [
      { name: '5', type: 'basic', value: 5 },
      { name: '5', type: 'basic', value: 5 }
    ];
    expect(isBust(hand)).toBe(true);
  });

  test('ignores non-basic cards when checking duplicates', () => {
    const hand = [
      { name: '5', type: 'basic', value: 5 },
      { name: 'plus 2', type: 'modifier', value: 2 },
      { name: 'plus 2', type: 'modifier', value: 2 }
    ];
    expect(isBust(hand)).toBe(false);
  });

  test('returns true when basic cards have duplicates among other card types', () => {
    const hand = [
      { name: '5', type: 'basic', value: 5 },
      { name: '5', type: 'basic', value: 5 },
      { name: 'plus 2', type: 'modifier', value: 2 }
    ];
    expect(isBust(hand)).toBe(true);
  });
});