import { Fraction } from '../code/fractions.js';

[1, 2]; // This is a fraction (1/2);
[1, 4]; // This is also a fraction (1/4); 
[1, 4]; // This is the same fraction(1/4);

var body = [[1, 2], [1, 4], [1, 4]]; // Fractions need a "body";
// *Tip - All methods return fractions. If you want slash notation, simply join them;

console.log(
    '\n',
    `Adding ${Fraction.add(body).join('/')}\n`,
    `Subtracting ${Fraction.sub(body).join('/')}\n`,
    `Multipling ${Fraction.mul(body).join('/')}\n`,
    `Dividing ${Fraction.div(body).join('/')}`
);

console.log(' --------------');

// Now, if you want to evaluate an arithmetric expression...

var body = [[9, 1], '+', [3, 1], '*', [7, 1], '-', [15, 1], '/', [5, 1]]

console.log(` Evaluating ${Fraction.evaluate(body).join('/')}`);
console.log(' --------------');

// Also, there are others features like sorting, 
// converting repeating decimals, comparison operators, 
// greatest common divisor and least common multiple that you might find useful.

var body = [[1, 4], [1, 8], [1, 2]];


console.log(` Biggest ${Fraction.max(...body).join('/')}`);
console.log(` Smallest ${Fraction.min(...body).join('/')}`);
console.log(` Sorting ${Fraction.sort(body).reverse().map(a => a.join('/')).join(', ')}`);
console.log(' --------------');

console.log(` Converting ${Fraction.cvrt('1.3...').join('/')}`);
console.log(` Converting ${Fraction.cvrt('4.555...').join('/')}`);
console.log(` Converting ${Fraction.cvrt('20.456...').join('/')}`);
console.log(` Converting ${Fraction.cvrt('12.345345...').join('/')}`);

// How to convert a decimal?

// You need to repeat the repeating digits at least twice to identify them;

// 12.345345... == 12.345345345345...
// 12.34534... == 12.3453444444444...
// 12.3434... == 12.34343434343434...
// 12.343... == 12.343333333333333...
// 12.34... == 12.3444444444444444...
// 12.3... == 12.33333333333333333...







