// this란 무엇인가
function Counter() {
    this.value = 0;
    this.add = amount => {
        this.value += amount;//this의 값을 증가 시키고 있다
    }
}

const counter = new Counter(); // new 호출을 통해 인스턴스를 생성한다
console.log(counter.value); // counter라는 객체는 value라는 값을 가지게 된다
counter.add(5);
console.log(counter.value);
const add = counter2.add; //add2에 객체를 할당하여 실행흘 하였지만,
add(5); 
console.log(counter2.value); //값은 여전히 5이다
/* 결과
0
5
10
=> 화살표 함수의 this는 해당 함수가 생성되어질 당시의 this를 가리킨다. 
따라서 정적이다. 주체가 누구인지 상관없이 고정되어져 있기 때문.
*/

//이번에는 this의 함수를 화살표 함수로 사용하지 않고, 내부함수로 사용하였다.
function Counter2() {
    this.value = 0;
    this.add = function (amount) {
        this.value += amount;
        console.log(this === global); //해당 함수를 통해 해당 this가 어디에 소속되어진 객체인지 확인이 가능하다 
    };
}
const counter2 = new Counter2();
console.log(counter2.value);
counter2.add(5);
console.log(counter2.value);
const add2 = counter2.add; //add2에 객체를 할당하여 실행흘 하였지만,
add2(5); 
console.log(counter2.value); //값은 여전히 5이다
/* 실행결과 
0
5
5
=> 일반함수의 this는 해당 함수를 호출한 주체를 가리킨다.
=> 주체가 없는 add2의 경우에는 전역객체를 가리키게 된다. 현재 노드객체에서는 global객체를 가리킨다
=> 상황에 따라 바뀌어지기 때문에, 동적이라고 할 수 있다
*/

//3. 함수와 마찬가지로, 클래스의 경우에도 같은 맥락이 적용된다
class Counter3 {
    value = 0;
    add(amount) { //일반 함수로 정의 했기 때문에, this가 동적으로 결정된다
        this.value += amount;
    }

    add = (amount) => { //하지만 일반 함수로 정의하는 경우에는 this가 정적으로 해당 클래스객체만을 바라본다
        this.value += amount;
    }
}


//4. 다른예제로 한번더 이해하기
const counter3 = {
    value: 0,
    add: (amount) => {
        this.value += amount; //여기서 this가 가리키는 대상이 없기 때문에, 전역객체로써 취급되어져 버린다. 따라서 value를 참조 할 수 없다
    },
};
console.log(counter3.value);
counter3.add(5);
console.log(counter3.value);
const add3 = counter3.add;
add3(5);
console.log(counter3.value);
/* 
0
0
0
=> 해당 화살표를 감싸고 있는 일반 함수가 없기 때문에, 전역의 this로 취급되어져 버리고, value를 사용할 수 없게 된다.
*/