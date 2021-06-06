//7. 명명되어진 매개변수에서 rest parameter를 사용하는 것 또한 가능하다.
function f1({ p1, p3, ...rest }) {
    console.log({ p1, p3, rest });
}
f1({ p1: 'a', p2: 'b', p3: 'c', p4: 'd'});
f1({ p1: 'a', p3: 'b'});