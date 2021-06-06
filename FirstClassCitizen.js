//1급 함수이기에 가능한 것들
let b = 10;

//1급 함수이기에 매개변수에 함수를 선언하는 것이 가능하다
const add10 = function (a) {
    return 10 + b;
};

//1급 함수이기에 함수를 인자로 전달하는 것이 가능하다
function apply(arr, op) {
    return arr.map(op);
}
apply([1,2,3], add10);

//1급 함수이기에 함수안에서 또다른 함수를 반환하는 것이 가능하다
function makeAdd(v1){
    return function(v2){
        return v1 + v2;
    };
}

//반환되어진 함수를 이렇게 사용할 수가 있다
const add3 = makeAdd(3);
console.log(add3(10));
const add7 = makeAdd(7);
console.log(add7(10));


