#!/usr/bin/env node

// Node.js CLI Calculator
// Supported operations: addition (add), subtraction (subtract), multiplication (multiply), division (divide)
// Usage examples:
//   node src/calculator.js add 1 2 3
//   node src/calculator.js subtract 10 3 2
//   node src/calculator.js multiply 2.5 4
//   node src/calculator.js divide 10 2

function showUsage() {
  console.error('Usage: node src/calculator.js <operation> <num1> <num2> [num3 ...]');
  console.error('Operations: add, subtract, multiply, divide');
}

function parseOperands(rawOperands) {
  if (!rawOperands || rawOperands.length === 0) return null;
  const nums = rawOperands.map(s => {
    const n = Number(s);
    return Number.isFinite(n) ? n : NaN;
  });
  if (nums.some(n => Number.isNaN(n))) return null;
  return nums;
}

function doAdd(nums) {
  return nums.reduce((acc, v) => acc + v, 0);
}

function doMultiply(nums) {
  return nums.reduce((acc, v) => acc * v, 1);
}

function doSubtract(nums) {
  // a - b - c - ...
  if (nums.length === 1) return nums[0];
  return nums.slice(1).reduce((acc, v) => acc - v, nums[0]);
}

function doDivide(nums) {
  // a / b / c / ...  - guard division by zero
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] === 0) {
      throw new Error('Division by zero');
    }
  }
  if (nums.length === 1) return nums[0];
  return nums.slice(1).reduce((acc, v) => acc / v, nums[0]);
}

function main(argv) {
  const args = argv.slice(2);
  if (args.length < 2) {
    showUsage();
    process.exit(1);
  }

  const op = args[0].toLowerCase();
  const operands = parseOperands(args.slice(1));
  if (!operands || operands.length === 0) {
    console.error('Error: invalid or missing numeric operands');
    showUsage();
    process.exit(1);
  }

  try {
    let result;
    switch (op) {
      case 'add':
        result = doAdd(operands);
        break;
      case 'subtract':
      case 'sub':
      case 'minus':
        result = doSubtract(operands);
        break;
      case 'multiply':
      case 'mul':
      case 'times':
        result = doMultiply(operands);
        break;
      case 'divide':
      case 'div':
      case '÷':
        result = doDivide(operands);
        break;
      default:
        console.error(`Error: unknown operation '${op}'`);
        showUsage();
        process.exit(1);
    }

    // Print result with sensible formatting for floating point numbers
    if (Number.isFinite(result) && Math.abs(result) < 1e15) {
      // Limit to 12 significant digits to avoid long floats
      const out = Number.parseFloat(result.toPrecision(12));
      console.log(out);
    } else {
      console.log(result);
    }

    process.exit(0);
  } catch (err) {
    console.error('Error:', err.message || err);
    process.exit(1);
  }
}

// Export functions for testing and programmatic use
module.exports = {
  parseOperands,
  doAdd,
  doMultiply,
  doSubtract,
  doDivide,
  main
};

if (require.main === module) {
  main(process.argv);
}
