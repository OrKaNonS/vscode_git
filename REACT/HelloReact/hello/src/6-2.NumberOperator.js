export default function NumberOperator (props) {
    return (
        <p>
            숫자1 : <input type='text' id="num1"/> <br/>
            숫자2 : <input type='text' id="num2"/> <br/>
            <input id='btn' type='button' value='합계' onClick={props.onChangeMode}/><br/>
            <span id='result'></span>
        </p>

    )
}