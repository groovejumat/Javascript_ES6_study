//1. 등호를 입력해서 자바스크릡트 기본값을 입력하는 방식
function printLog(a = 1){
    console.log({ a });
}
printLog();
printLog(3);

//2. 기본값에 함수를 호출하는 형태로 입력하는 것도 가능하다.
function getDefault() {
    console.log('called getDefault');
    return 1;
}
function printLog(a = getDefault()){
    console.log({ a });
}
printLog(); // ! 해당 경우에만 함수가 호출된다.
printLog(3);

//3. 매개변수가 undefined라는 경우에 대해서만 해당 함수가 호출 된다면, 매개변수를 필수값으로 만들수도 있다.
function required() {
    throw new Error('no parameter')
}
function printLog( a = required() ){
    console.log({a});
}
printLog(10);
//printLog();

//4. 나머지 매개변수 정의하기
function printLog(a, ...rest) { //rest parameter 라고 말한다
    console.log( { a, rest } );
}
printLog(1, 2, 3);

//5. 나머지의 매개변수는 ES6에서 추가되어진 기능이다.
//ES6전에서 사용했던 "arguments 방식"
function printLog(a) {
    const rest = Array.from(arguments).splice(1);
    console.log({ a, rest}); 
}
printLog(1, 2, 3);
//같은 결과가 나오지만, 가독성이 매우 좋지 못하므로, 사용 안하는 것이 좋다.

//6. 명명되어진 매개변수 알아보기
function getValues1(numbers, greaterThan, lessThan){
    return numbers.filter(item => greaterThan < item && item < lessThan);
}
function getValues2({numbers, greaterThan, lessThan}){
    return numbers.filter(item => greaterThan < item && item < lessThan);
}

const numbers = [10, 20, 30 ,40];
const result1 = getValues1(numbers, 5, 25); //기본 매개변수를 넣는 방식
const result2 = getValues2({ numbers, greaterThan:5, lessThan: 25}); //named parameter방식

//6-2. 명명되어진 매개변수에 기본값을 입력하는 것 또한 가능하다.
function getValues({ numbers, greaterThan = 0, lessThan = Number.MAX_VALUE }){
    return numbers.filter(item => greaterThan < item && item < lessThan);
}

const numbers = [10, 20, 30, 40];
console.log(getValues({ numbers, greaterThan: 5, lessThan: 25}));
console.log(getValues({ numbers, greaterThan: 15 })); //이렇게 선택적으로 매개변수를 입력하는 것이 가능해 진다
console.log(getValues({ lessThan: 25, numbers }));

//7. 명명되어진 매개변수에서 rest parameter를 사용하는 것 또한 가능하다.
function f1({ p1, p3, ...rest }) {
    console.log({ p1, p3, rest });
}
f1({ p1: 'a', p2: 'b', p3: 'c', p4: 'd'});
f1({ p1: 'a', p3: 'b'});
// { p1: 'a', p3: 'c', rest: { p2: 'b', p4: 'd' } }
// { p1: 'a', p3: 'b', rest: {} }

//8. 화살표 함수를 이용해서 간결하게 함수 사용하기
const add = (a,b) => a + b;
const add5 = a => a + 5;
const addAndReturnObject = (a, b) => ({ result : a + b}); // "객체"를 반환해야 한다면, 해당 객체를 소괄호로 둘러싸서 반환하면 된다.

//9. 화살표 함수에 대해서 여러줄에 대한 코드가 필요하다면, 중괄호로 해당 코드 부분을 묶어주는 방법이 있다.
//해당 방식을 사용하는 경우에 대해서는 "return"키워드를 명시해주어야 한다.
const add = (a,b) => {
    if (a <=0 || b <=0 ){
        throw new Error('must be positive number');
    }
    return a+b; 
}

//10. 화살표함수와 일반함수의 다른점은 this, arguments가 바인딩이 되어지지 않는다는 점이다.
const printLog = (...rest) => console.log(rest); //arguments를 사용하고 싶다면, '...rest'키워드를 활용하면 된다.
printLog(1, 2);
