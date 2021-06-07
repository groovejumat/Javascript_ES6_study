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