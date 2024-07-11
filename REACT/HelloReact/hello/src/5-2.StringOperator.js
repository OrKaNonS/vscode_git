export default function StringOperator (props) {

    return (
        <p>
            문자열 : <input type='text' id="num1" onKeyUp={props.onChangeMode} />
        </p> 
    )
}