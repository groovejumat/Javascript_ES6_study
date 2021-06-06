function main() {
    let v = 0;
    function f1() {
        v++;
        console.log(v);
    }
    function f2() {
        v++;
        console.log(v);
    }
    return { f1, f2 };
}
const obj = main();
obj.f1();
obj.f2();
obj.f1();
obj.f2();