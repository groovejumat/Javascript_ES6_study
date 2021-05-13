//자바스크립트에서의 closure(클로져)
//closure :: 함수와 그 함수를 둘러싸고 있는 주변의 "상태"를 기억하는 기능을 말한다
//closure 기능 덕분에 "내부함수"는 "외부함수"의 지역변수와 전역변수에 대한 접근이 가능하다. 
//일반적인 언어에서 함수의 지역변수와 매개변수는 함수가 실행되어지는 동안에만 존재한다.


function makeAdd(v1) {
    return function(v2) {
        return v1 + v2; //closure기능이 없다면, 해당언어 안에서 v1이라는 변수를 참조 할 수 없다. makeAdd라는 함수가 끝이나면 없어지기 때문이다.
    };
}

const add3 = makeAdd(3); //1. makeAdd를 사용할 때에 매개변수 3이 들어가게 된다.
console.log(add3(10));
const add7 = makeAdd(7);
console.log(add7(10));