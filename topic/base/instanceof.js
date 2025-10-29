function hand(L, R) {

    if (L === null) {
        return false;
    }
    while (true) {
        L = L.__proto__;
        console.log(L, typeof L);
        if (L === null) {
            return false;
        }
        if (L === R.prototype) {
            return true;
        }
    }
}

class A {}

class B extends A {}

let a = new A();

let b = new B();


console.log(hand(a, A), a instanceof A);
console.log(hand(a, B), a instanceof B);

console.log(hand(b, A), b instanceof A);
