"use strict"

// --------------------- Dependecies ----------------------- //

import { MathAbstractions } from './math.js';
import { ArrayAbstractions } from './array.js';
import { StringAbstractions } from './string.js'

MathAbstractions(Math);
ArrayAbstractions(Array);
StringAbstractions(String);

// ---------------------- Fractions ------------------------ //

const Fraction = {

// ------------------ Simple Operations --------------------- //

    add: (fractions) => addSub(0, fractions),
    sub: (fractions) => addSub(1, fractions),
    mul: (fractions) => mulDiv(0, fractions),
    div: (fractions) => mulDiv(1, fractions),


// Abstraction that mixes all others and lets you 
// apply operations with those above easily

    evaluate: (operations) => {

        if (operations.length == 1) return Fraction.simp(operations[0]);

        const details = find();
        const before = operations[details.index - 1]; 
        const after = operations[details.index + 1];
        const body = [before, after];
        let result;

            if (details.type === '*') result = Fraction.mul(body);
            if (details.type === '/') result = Fraction.div(body);;
            if (details.type === '+') result = Fraction.add(body);;
            if (details.type === '-') result = Fraction.sub(body);;

            operations.splice(details.index - 1, 3, result);
                return Fraction.evaluate(operations);
    
        function find() {

            const precedence = operations.some(element => /^[*\/]$/.exec(String(element)))
            const regX = precedence? /^[*\/]$/ : /^[+\-]$/;
            
                return operations.reduce((a, b, c) => { 
                    if (regX.test(b) && a.length == 0) {

                        const information = {
                            index: Number(c),
                            type: b,
                        };

                        a.push(information);
                    };

                    return a;
                }, [])[0];
        };
    },

// ------------------- Comparison Functions --------------------- //

    min: (...array) => minMax(0, array),
    max: (...array) => minMax(1, array),


// These functions simulate the comparison operators but with fractions. 
// It uses the deep equal abstraction.

    lst: (one, two) => one.deepEqual(Fraction.min(one, two)),
    grt: (one, two) => one.deepEqual(Fraction.max(one, two)),
    
    eqto: (one, two) => one.deepEqual(two),
    grte: (one, two) => one.deepEqual(two) || one.deepEqual(Fraction.max(one, two)),
    lste: (one, two) => one.deepEqual(two) || one.deepEqual(Fraction.min(one, two)),

// ------------------------- Utilities ---------------------------- //

// This function simplifies a fraction by getting the gcd of both 
// the numerator and denominator and then, dividing them by it.

    simp: (array) => {
        const gcd = Math.gcd(array);
        return array.map(a => !Number.isNaN(gcd)? a / gcd : a)
    },

// This functions converts the fraction into decimals by dividing its
// numerator by its denominator.

    deci: (array) => {
        return array[0] / array[1];
    },

// This function sorts an array of fractions. It follows the Array.prototype.sort() rule.
// It returns a positive number where A is greater than B, 0 if both are equal and -1 if 
// A is less than B.

    sort: (array) => {
        return array.sort((a, b) => {
            return Fraction.grt(a, b)? -1 : Fraction.eqto(a, b)? 0 : 1;
        });
    },

// This function returns a booolean value indicating when two fractions are equivalent.

    eqvl: (array) => {
        const reference = array[0];
        return array.every(frac = reference[0] * frac[1] == reference[1] * frac[0]);
    },


// ------------------------ Complex Operations ------------------------- //

// This funcion validates the array of fractions and then simplify them all
// It gets one part and calculates the GCD. Take them out and put the new result
// It repeats that process until we have the final GCD.

    gcd: (array) => {

        if (validate(array)) return NaN;
        const simplified = array.map(a => Fraction.simp(a));

        for (;;) {
            const part = simplified.slice(0, 2);

                for (;;) {
                    Fraction.sort(part)
                    const result = Fraction.sub(part);

                        if (Fraction.deci(result) == 0) {
                            simplified.splice(0, 2, part[1]);
                            break;
                        }; 

                        const index = part.indexOf(Fraction.max(...part));
                         part[index] = result;
                };

            if (simplified.length == 1) return simplified[0]
        };
    },

// By knowing the GCD of two number, you can calculate their LCM. It means
// that with fractions wouldn't be different. 

    lcm: (array) => {
        if (validate(array)) return NaN;

        const numerator = Fraction.mul(array);
        const denominator = Fraction.gcd(array);
        const fraction = Fraction.div([numerator, denominator]);

        return Fraction.simp(fraction);
    },

    cvrt: (string) => {

        const matchRepeating = /\.\.\./;
        const matchDecimal = /\d+\.\d+/;

        const type = matchRepeating.test(string);
        const decimal = matchDecimal.test(string);

            if (!type) {

                !decimal? string += '.0' : false;

                const [_, decimals] = string.split('.');
                const expoent = Number(decimals)? decimals.length : 0;  

                const denominator = 10 ** expoent;
                const numerator = string ** denominator;

                return Fraction.simp([numerator, denominator]);

            };

            if (type) {

                string = string.replace('...', '');

                const [interger, decimal] = string.split('.');
                const info = identify(decimal);

                const part = decimal.replace(info.part, '');

                const nines = '9'.repeat(info.digits.length);
                const zeros = '0'.repeat(part.length);
                const smaller = interger + part;
                const bigger = interger + part + info.digits;

                const numerator = Number(bigger - smaller);
                const denominator = Number(nines + zeros)

                return Fraction.simp([numerator, denominator]);
        };

        function identify(decimals) {

            const length = decimals.length;
            decimals = decimals.invert(); 

            let result;

            for (let t = 0; t < length; t++) {

                const slice = decimals.slice(0, t + 1)
                const length = slice.length;
                const slice_= decimals.slice(length, length + t + 1)

                if (slice == slice_) {

                    result = slice.invert();
                    break
                };
            };

            const part = [];
            const digits = result || decimals[0];
            const splitted = decimals.splitBy(digits.length);

            let ongoing = true;

            splitted.forEach(a => {

                digits == a && ongoing?
                 part.unshift(a.invert()) :
                 ongoing = false;

            });

            return {

                part: part.join(''),
                digits
            };
        };
    },
}


export { Fraction };

// Private functions



// This Method calculates both add and subtract operations.
// In order to do that, you divide the lcm of the denominators by
// the denominator and then multiply the numerator. To add or subtract,
// we sum or subtract all numerators.

function addSub(type, fractions) {

    const denominator = Math.lcm(fractions.map(frac => frac[1]));
    const numerator = fractions.map(frac => denominator / frac[1] * frac[0]).reduce((a, b) => type == 0? a + b : a - b);

    return Fraction.simp([numerator, denominator]);
};

// This method calculates both multiplication and division.
// The rule is - If it is multiplication, multiply all numerators by themselves
// and all denominatros by themselves. If it is divion, invert all the elements expect the first. 

function mulDiv(type, fractions) {

    if (type == 1) {
        fractions = fractions.map((a, i) => i == 0? a : [a[1], a[0]]);
    };

    const numerator = fractions.map(frac => frac[0]).reduce((a, b) => a * b);
    const denominator = fractions.map(frac => frac[1]).reduce((a, b) => a * b);

    return Fraction.simp([numerator, denominator]);
};

// This function gets the modified numerators -
// lcm / denominator * numerator - and maps an array.
// It gets the index of highest or lowest number and returns
// that same index of the original array.

function minMax(type, array) {

    const denominators = array.map(a => a[1]);
    const lcm = Math.lcm(denominators);
    const numerators = array.map(a => lcm / a[1] * a[0]);

    const index = numerators.indexOf((
        type == 0?
         Math.min(...numerators) :
         Math.max(...numerators) 
    ))

    return array[index]
};

// This function checks if some of the fractions is equal to 0, since the gcd of 0 is infinity and 
// the code breaks if it does;

function validate(array) {
    return array.some(a => a.some(b => b == 0));
};


