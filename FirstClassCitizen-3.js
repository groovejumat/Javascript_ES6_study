function f1() {
    const v1 = 123;
    console.log(v1);
};
const v2 = 456;
function f2() {
    f1();
    console.log(v2);
}
f2();


/*

call stack :: 함수의 실행정보를 저장한다
javascript에서 이러한 call stack에 담기는 정보를 execution context라고 부른다
위의 function함수들을 감싸고있는 큰 함수가 하나 있고, 그것이 실행되어질 때 global execution context가 실행된다고 볼 수 있다
1. global execution context가 콜스택에 담긴다
2. f2()를 만났을 때 이를 실행하기 위한 execution context가 만들어진다
3. f2()를 실행하는 과정에서 f1()을 만나게 되고, 현재 실행중인 f2의 execution context를 콜스택에 넣는다
4. f1()이 실행되면서 새로운 e.c가 생성된다
5. f1()이 실행되어지는 과정에 const지역변수가 나오게 되는데, 
이 지역변수의 정보를 가지고 있는 것을 lexical enviroment라고 부른다(execution context안에 map자료형으로 존재 {v1 : 123}) 
6. f1()실행이 끝나면 현재의 execution context가 삭제된다.
7. call stack에서 마지막에 저장되어진 것 (f2의 e.c)을 가지고 온다
8. 현재 f2에 lexical enviroment값은 비어있는 값이다. f1이랑 다르게 지역변수가 없기 때문에
9. v2를 출력하려고 하지만 없다. 하지만 이런 경우 상위 지역변수인 v2를 찾게 된다. v2 = 456 왜 이런지는 나중에
10. f2() 에 대한 e.c가 삭제된다. 
11. 마지막 global e.c를 꺼내온다. global영영의 l.e에 v2가 존재한다. {v2 : 456}
12. f2() 에서 v2에 대한 변수를 여기서 찾게 된다
*/
