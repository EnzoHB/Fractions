"use strict"

function MathAbstractions(globalObject) {

    globalObject.gcd = (array) => {

        const some = () => array.some(a => a % primes[0] == 0); 
        const every = () => array.every(a => a % primes[0] == 0);
        const update = () => array = array.map(a => a % primes[0] == 0? a / primes[0] : a);
        const decimal = () => array.map(a => String(a).split('.')[1] || '').reduce((a, b) => a.length > b.length? a : b).length;

        if (array.some(a => a == 0)) return NaN;

            const commonFactors = [1];
            const primes = [2, 3, 5, 7, 11];
            const expo = 10 ** decimal();

            array = array.map(a => a * expo); 

            for (;;) {
                const someB = some();
                const everyB = every();
                const length = primes.length;

                if (length == 0) break;

                    everyB? commonFactors.push(primes[0]) : false; 
                    someB? update() : primes.shift();
            };

                return commonFactors.reduce((a, b) => a * b) / expo;
    };

    globalObject.lcm = (array) => {

        const numerator = array.reduce((a, b) => a * b);
        const denominator = globalObject.gcd(array);

            return numerator / denominator;
    };
};

export { MathAbstractions }