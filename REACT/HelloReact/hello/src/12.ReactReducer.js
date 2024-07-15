//Reducer
// - reducer는 상태(state)와 명령(action)을 인자로 받아서
//   명령에 따른 상태를 반환하는 리액트훅(함수)이다.
// - dispatcher(나눠주는, 분배기, 자판기 같은 거?)는  reducer에게 명령(action)을 전달하는 역할을 하는 함수
// - reducer를 통해 컴포넌트의 상태를 컴포넌트와 분리하여 별도로 관리하고
//   상태처리를 일원화 할 수 있다는 장점이 있다.
// - 디자인패턴(프로그램 설계 할 때 이렇게 하니 좋았다고 하는 경험치 축적된 것.)
//   facade패턴, command패턴을 사용해서 상태관리를 일원화 및 역할 분리할 수 있다.
// - 형식(고정) : const [state, dispatcher] = useReducer(reducer, initialState)  - initialState:초기값
// - 작동순서 : action(명령) > dispatcher(명령분배기) > reducer > new state > component 전달

import {useReducer} from 'react';

export default function ReactReducer() {
    // count는 변수 즉 state, reducer는 명령을 받아서 state 반환,  0은 초기값
    //  1. state 2.dispatcher            3. reducer 4. state의 초기값
    const [count, dispatcher] = useReducer(reducer, 0); 

    // dispatcher(명령)
    function decrement() {dispatcher('decrement'); }
    function increment() {dispatcher('increment'); }
    function initialize() {dispatcher('initialize'); }

    return (
        <div>
            <p>
                <button value='-' onClick={decrement}>감소</button>&nbsp;
                <button value='0' onClick={initialize}>초기화</button>&nbsp;
                <button value='+' onClick={increment}>증가</button>&nbsp;
                <span>{count}</span>
            </p>
        </div>
    );
}

// 명령을 전달받아서 디스패치받아 명령에 따라 해당되는 것을 리듀서 한테 전달. 리듀서는  변경된 상태를 리턴
function reducer(count, action) {
    switch (action) {
        case 'decrement' :
            return count -1;
        case 'increment' :
            return count +1;
        case 'initialize' :
            return 0;
    }
}