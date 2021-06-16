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

//6. Promise객체는 catch라는 메서드가 있는데, rejected상태인 Promise객체를 처리하기 위해서 사용한다.
Promise.reject(1).then(null, error => {
    console.log(error);
});
Promise.reject(1).catch(error => {
    console.log(error);
});

/* then, catch 둘다 사용을 할 수 있지만 가독성을 위해서
reject상태의 경우 catch를 사용하는 것을 권장한다. 

*/

//7. Promise는 개당 객체의 상태에 따라서 함수를 호출한다.
Promise.resolve().then(
    () => {
        throw new Error('come error');
    },
    error => {
        console.log(error);
    },
);
/* 
상위에서 Error가 발생한다고 하더라도, error로 가지는 않는다. resolove객체를 반환해 주기 때문에
*/

//8. 7번에서 원하는 그림으로 처리를 하려면 아래처럼 표현하는 것이 좋다.
Promise.resolve()
    .then(() => {
        throw new Error('some error');
    })
    .catch(error => {
        console.log(error);
    });
/* 
이렇게 하게되면 발행한 에러에 대해서 catch를 통해 처리하는 것이 가능해 진다.
*/

//9. then과 마찬가지로 catch또한 Promise객체를 반환한다. => catch이후에도 then을 사용가능하다

Promise.reject(10)
    .then(data => {
        console.log('then:', data);
        return 20;
    })
    .catch(data => {
        console.log('catch:', data);
        return 30;
    })
    .then(data => {
        console.log('then2:', data);
    });

/* 
catch : 10 
then2 : 30
*/


//10. Promise객체에서는 finally라는 메서드가 있다. 이는 fullfield와 rejected상태 모두 처리할 수 있다.
Promise.reject(10)
    .then(data => {
        console.log('onThen', data);
        return data + 1;
    })
    .catch(error => {
        console.log('onCatch');
        return 100;
    })
    .finally(() => {
        console.log('onFinally');
    })
    .then(data => {
        console.log('onThen', data);
        return data + 1;
    });
/* 
onThen 10
onFinally
onThen 11

반환하는 값을 Promise - reject로 반환 할 때
onCatch
onFinally
onThen 100
*/    

//11. 서버통신으로 데이터를 받아오는 경우에 대한 Promise
function requestData() {
    return fetch()
        .catch(error => {
            //...
            return null
        })
        .finally(() => {
            sendLogToServer('requestData Finished');
        });
}
requestData().then(data => console.log(data)); 
//finally의 처리덕분에, 대부분에 상황에서 Promise의 객체가 fullfiled인 상태로 넘어오게 된다.
//문제가 생겨서 reject상태인 catch상태를 탓더라도, finally에서 null값을 그대로 전달 받아온다. (Promise객체 (fullfilled상태를 그대로 가져오기 때문))