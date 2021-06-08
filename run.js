//4. 프로미스 객체를 생성하는 방식은 아래 세가지이다
const p1 = new Promise((resolve, reject) => {}); // resolve, reject의 매개변수는 모두 함수이다. {} 내부처리가 끝나면 둘 중 하나를 호출한다
const p2 = Promise.reject('error message'); //reject상태가 된다.
const p3 = Promise.resolve(param); //fulfilled상태가 된다.

/* 
Promise객체는 세 개의 상태를 가지고 있다.
그리고 해당 세가지 객체중에 하나로 그 상태를 지닌다.
fulfilled, rejected를 묶어서 settled라고도 한다.
각 상태에 대해서 데이터를 가질 수도 있다.
// 대기 중(pending)
// 성공(fulfilled)
// 실패(rejected)
*/

//5. 프로미스의 객체는 then메서드를 가지고 있다
requestData().then(onResolve, onReject);
Promise.resolve(123).then(data => console.log(data)); //fulfilled처리가 끝난 경우에 대해서 처리
Promise.reject('error').then(null, data => console.log(data)); //reject처리가 끝난 경우에 대해서 처리

/* 
비동기 처리가 끝난 다음에 처리해야되는 작업을 then을 통해서 처리 할 수 있다.
*/

//5-1. then은 이렇게 chain형식으로도 연결하는 것이 가능하다
requestData1()
    .then(data => {
        console.log(data);
        return requestData2();
    })
    .then(data => {
        console.log(data);
        return data + 1; //fulfilled상태가 된다 해당 부분을 데이터로하는 promise객체가 반환된다
    })
    .then(data => {
        console.log(data);
        throw new Error('some Error'); //rejcted상태가 된다 해당 부분을 데이터로하는 promise객체가 반환된다
    })
    .then(null, error => {
        console.log('error!!!'); //undefined를 데이터로 하는 프로미스객체를 반환한다
    })
    .then(data => {
        console.log(data);
    });

//5-2. rejected상태일 때의 프로미스객체의 then()처리
Promise.reject('err')
    .then(() => console.log('then 1'))
    .then(() => console.log('then 2'))
    .then(
        () => console.log('then 3'),
        () => console.log('then 4'),
    )
    .then(
        () => console.log('then 5'),
        () => console.log('then 6'),
    )
/* 
rejected상태인데 두번째 함수 (rejected에 대한 처리를 해주는 함수)를 정의 하지 않앗을 때에는 해당 then메서드는
해당 promise객체를 그대로 반환한다. 따라서 then1과 then2는 실행되어지지 않고 Promise.reject객체를 반환한다

그리고 다음 부분에서 rejected자리의 () => console.log('then 4') 가 호출 된다

마지막 부분에서는 상위의 undefiend를 받아서 fulfilled상태가 되어지기 때문에, fulfilled자리에 () => console.log('then 5')가 출력된다

then메서드의 가장 중요한 포인트는 항상 연결되어진 순서대로 호출되어진다는 것이다
*/