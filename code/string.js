"use strict"

function StringAbstractions(constructor) {

    constructor.prototype.invert = function() {
        return this.split('').reverse().join('')
    };

    constructor.prototype.splitBy = function(step = 1) {
        const result = [];
        const length = this.length - 1

        let tracker = '';
        for (let i = 0; i <= length; i++) {

            tracker += this[i]
            const length_ = tracker.length

            if (length_ % step == 0 && length_ != 0 || i == length) {
                result.push(tracker);
                tracker = ''
            };
        };

        return result;
    };
};

export { StringAbstractions }
