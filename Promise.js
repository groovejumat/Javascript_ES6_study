//1. 프로미스가 많이 사용되어지기 이전에는 callback패턴 방식이 많이 사용되었다.
function requestData(callback) {
    setTimeout(() => {
        callback({ name: 'abc', age: 23});
    }, 1000);
}

function onSuccess(data) {
    console.log(data);
}
console.log('call requestData');
requestData(onSuccess);
/* 
call requestData
{ name: 'abc', age: 23 }
*/

//2. 콜백함수는 조금만 중첩이 되어져도, 그 로직이 상당히 복잡해지는 단점이 있다.
function requestData1(callback) {
    //...
    callback(data);
}
function requestData2(callback) {
    //...
    callback(data);
}
function onSuccess1(data) {
    console.log(data);
    requestData2(onSuccess2);
}
function onSuccess2(data) {
    console.log(data);
    //...
}
requestData1(onSuccess1);

/*
위처럼 여러 콜백함수가 중첩된 경우 매우 복잡해진다는 단점이 있다.
*/


//3. 2번 에서의 상황을 그대로 promise로 처리해 보자
requestData1() // 비동기 함수를 먼저 호출한다
    .then(data => {
        console.log(data); // 해당 처리가 끝나게 되면 데이터를 받아서 필요한 처리를한다
        return requestData2(); // 그리고 두번째 함수를 호출한다
    })
    .then(data => { // 그리고 두번째 비동기 처리가 끝나면 데이터를 받아서 필요한 처리를 진행한다
        console.log(data);
        // ...
    })
/* 
promise를 사용하면 비동기 코드를 동기처리 방식으로 작성하는 것이 가능해 진다
*/    