const add = (a, b) => {
    return a + b;
}

const subtract = (a, b) => {
    return a - b;
}

const multiply = (a, b) => {
    return a * b;
}

const divide = (a, b) => {
    if (b === 0) {
        throw new Error("Cannot divide by zero");
    }
    return a / b;
}

const square = (a) => {
    return a * a;
}

const squareRoot = (a) => {
    if (a < 0) {
        throw new Error("Cannot take square root of negative number");
    }
    return Math.sqrt(a);
}

const power = (a, b) => {
    return Math.pow(a, b);
}

const factorial = (n) => {
    if (n < 0) {
        throw new Error("Cannot take factorial of negative number");
    }
    if (n === 0 || n === 1) {
        return 1;
    }
}

const isPrime = (n) => {
    if (n <= 1) return false;
    for (let i = 2; i <= Math.sqrt(n); i++) {
        if (n % i === 0) return false;
    }
    return true;
}

const gcd = (a, b) => {
    if (b === 0) return a;
    return gcd(b, a % b);
}

const lcm = (a, b) => {
    return (a * b) / gcd(a, b);
}

const fibonacci = (n) => {
    if (n < 0) {
        throw new Error("Cannot calculate Fibonacci of negative number");
    }
    if (n === 0) return 0;
    if (n === 1) return 1;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

const primeFactors = (n) => {
    const factors = [];
    for (let i = 2; i <= n; i++) {
        while (n % i === 0) {
            factors.push(i);
            n /= i;
        }
    }
    return factors;
}

const isPalindrome = (str) => {
    const reversed = str.split('').reverse().join('');
    return str === reversed;
}

const isAnagram = (str1, str2) => {
    const sortedStr1 = str1.split('').sort().join('');
    const sortedStr2 = str2.split('').sort().join('');
    return sortedStr1 === sortedStr2;
}

const reverseString = (str) => {
    return str.split('').reverse().join('');
}

const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

const removeVowels = (str) => {
    return str.replace(/[aeiou]/gi, '');
}

module.exports = {
    add,
    subtract,
    multiply,
    divide,
    square,
    squareRoot,
    power,
    factorial,
    isPrime,
    gcd,
    lcm,
    fibonacci,
    primeFactors,
    isPalindrome,
    isAnagram,
    reverseString,
    capitalizeFirstLetter,
    removeVowels
};
// This module exports a set of mathematical and string manipulation functions.
