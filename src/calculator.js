#!/usr/bin/env node

// Node.js CLI Calculator
// Supported operations: addition (add), subtraction (subtract), multiplication (multiply), division (divide)
// Additional operations added per issue: modulo (mod), power (pow), square root (sqrt)
// Usage examples:
//   node src/calculator.js add 1 2 3
//   node src/calculator.js subtract 10 3 2
//   node src/calculator.js multiply 2.5 4
//   node src/calculator.js divide 10 2
//   node src/calculator.js mod 10 3
//   node src/calculator.js pow 2 8
//   node src/calculator.js sqrt 9

function showUsage() {
  console.error('Usage: node src/calculator.js <operation> <num1> <num2> [num3 ...]');
  console.error('Operations: add, subtract, multiply, divide, mod, pow, sqrt');
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

// New functions requested in issue #3
// modulo(a, b) - returns the remainder of a divided by b
function modulo(a, b) {
  if (b === 0) throw new Error('Modulo by zero');
  return a % b;
}

// power(base, exponent) - returns base raised to the exponent
function power(base, exponent) {
  return Math.pow(base, exponent);
}

// squareRoot(n) - returns the square root of n with error handling for negative numbers
function squareRoot(n) {
  if (n < 0) throw new Error('Square root of negative number');
  return Math.sqrt(n);
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
      case 'mod':
      case 'modulo':
      case '%':
        if (operands.length < 2) {
          console.error('Error: modulo requires two operands');
          process.exit(1);
        }
        result = modulo(operands[0], operands[1]);
        break;
      case 'pow':
      case 'power':
      case '^':
        if (operands.length < 2) {
          console.error('Error: power requires base and exponent');
          process.exit(1);
        }
        result = power(operands[0], operands[1]);
        break;
      case 'sqrt':
      case 'squareroot':
      case 'squareroot':
        // apply square root sequentially if multiple operands provided
        result = operands.reduce((acc, v, i) => {
          if (i === 0) return squareRoot(v);
          return squareRoot(acc);
        }, null);
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
  modulo,
  power,
  squareRoot,
  main
};

if (require.main === module) {
  main(process.argv);
}
