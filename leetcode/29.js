/**
 * @param {number} dividend
 * @param {number} divisor
 * @return {number}
 */
var divide = function (dividend, divisor) {
    if (divisor === 0) {
        return 0
    }

    let flag = ''
    if (dividend > 0 && divisor > 0 || dividend < 0 && divisor < 0) {
        flag = '+'
    } else {
        flag = '-'
    }

    dividend = Math.abs(dividend)
    divisor = Math.abs(divisor)

    let count = 0
    while (dividend >= divisor) {
        let q = 1
        let value = divisor

        while (dividend >= value + value) {
            q = q + q
            value = value + value
        }

        count = count + q
        dividend = dividend - value
    }

    if (flag === '-') {
        count = -count;
    }

    if (count > Math.pow(2, 31) - 1) {
        return Math.pow(2, 31) - 1
    } else if (count < -Math.pow(2, 31)) {
        return -Math.pow(2, 31)
    } else {
        return count
    }
}



var divide = function (dividend, divisor) {
    if (divisor === 0) {
        return 0
    }

    let flag = ''
    if (dividend > 0 && divisor > 0 || dividend < 0 && divisor < 0) {
        flag = '+'
    } else {
        flag = '-'
    }

    dividend = Math.abs(dividend)
    divisor = Math.abs(divisor)

    let count = 0

    while (dividend >= divisor) {

        let q = 1
        let value = divisor

        while (dividend >= value + value) {
            q = q + q
            value = value + value
        }

        count = count + q

        dividend = dividend - value

    }

    if (flag === '-') {
        count = -count;
    }

    if (count > Math.pow(2, 31) - 1) {
        return Math.pow(2, 31) - 1
    } else if (count < -Math.pow(2, 31)) {
        return -Math.pow(2, 31)
    } else {
        return count
    }
}

console.log(divide(30, 7))