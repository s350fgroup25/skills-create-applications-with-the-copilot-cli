const { parseOperands, doAdd, doMultiply, doSubtract, doDivide } = require('../calculator');

describe('Calculator core functions', () => {
  test('addition: 2 + 3 = 5', () => {
    expect(doAdd([2, 3])).toBe(5);
  });

  test('subtraction: 10 - 4 = 6', () => {
    expect(doSubtract([10, 4])).toBe(6);
  });

  test('multiplication: 45 * 2 = 90', () => {
    expect(doMultiply([45, 2])).toBe(90);
  });

  test('division: 20 / 5 = 4', () => {
    expect(doDivide([20, 5])).toBe(4);
  });

  test('addition with multiple operands: 1 + 2 + 3 = 6', () => {
    expect(doAdd([1,2,3])).toBe(6);
  });

  test('subtraction with multiple operands: 10 - 3 - 2 = 5', () => {
    expect(doSubtract([10,3,2])).toBe(5);
  });

  test('multiplication with multiple operands: 2 * 3 * 4 = 24', () => {
    expect(doMultiply([2,3,4])).toBe(24);
  });

  test('division with multiple operands: 100 / 2 / 5 = 10', () => {
    expect(doDivide([100,2,5])).toBe(10);
  });

  test('floating point addition: 0.1 + 0.2 ~= 0.3', () => {
    expect(doAdd([0.1, 0.2])).toBeCloseTo(0.3, 10);
  });

  test('parseOperands: valid numeric strings', () => {
    expect(parseOperands(['1','2.5','3'])).toEqual([1,2.5,3]);
  });

  test('parseOperands: invalid numeric strings return null', () => {
    expect(parseOperands(['1', 'foo'])).toBeNull();
  });

  test('division by zero should throw', () => {
    expect(() => doDivide([10, 0])).toThrow('Division by zero');
  });

  test('divide single operand returns the operand', () => {
    expect(doDivide([42])).toBe(42);
  });

  test('subtract single operand returns the operand', () => {
    expect(doSubtract([7])).toBe(7);
  });
});
