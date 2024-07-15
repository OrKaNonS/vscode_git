// reducer 실습

// 파일 : 13.ReactCalc.js, 13. ReactCalc.html
// 명령 : plus, minus, multi, devide
// 기능 : 두 수의 합, 차, 곱, 몫 구하기

import {useReducer} from 'react';

export default function ReactCalc() {

    const [count, dispatcher] = useReducer(reducer,0);

    function plus() {dispatcher('plus');}
    function minus() {dispatcher('minus');}
    function devide() {dispatcher('devide');}
    function multi() {dispatcher('multi');}    

    return (
        <div>
            <p>
                <input id='num1' type='text' ></input>
                <input id='num2' type='text' ></input>
                <button onClick={minus}>-</button>&nbsp;
                <button onClick={plus}>+</button>&nbsp;
                <button onClick={devide}>/</button>&nbsp;
                <button onClick={multi}>*</button>
                <span>{count}</span>
            </p>
        </div>
    )
}

    function reducer(count, action) {
        const num1 = Number(document.querySelector('#num1').value);
        const num2 = Number(document.querySelector('#num2').value);
        switch(action) {
            case 'minus' :
                return num1 - num2;
                break;

            case 'plus' :
                return num1 + num2;
                break;

            case 'devide' :
                return num1 / num2;
                break;

            case 'multi' :
                return num1 * num2;            
        }
    }




