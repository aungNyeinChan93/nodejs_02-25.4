
// divide
const divide = require('./baseFunction').divide;
console.log(divide(10, 2)); // 5


// square ,multiply
const { square, multiply } = require('./baseFunction');
console.log(square(4)); // 16
console.log(multiply(4, 5)); // 20

// math subtract
const math = require('./baseFunction');
console.log(math.subtract(5, 3)); // 2

// factorial
const { factorial, fibonacci } = require('./baseFunction');
console.log(factorial(5)); // 120
console.log(fibonacci(125)); // 5

