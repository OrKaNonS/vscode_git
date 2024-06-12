window.onload = function() {

    /* JSON에서 사용하는 javascript의 데이터타입 */
    const obj = {};     // object_객체
    const arr = [];     // array_배열
    // cf) const func = function() {}; // function
    const str = "";     // string_ car 타입도 string로 씀
    const num = 0;      // number
    const bool = false; // boolean
    const nul = null;   // null

    const result = document.getElementById("result");

    //JSON Object
    const person = {
        "name": "홍길동",
        "age": 20,
        "gender": "M",
        "married": false
    };

        /* 아래의 형식은 문자열 형태, 위의 형식은 객체
    '{
        "name": "홍길동",
        "age": 20,
        "gender": "M",
        "married": false
    }';
     */

    person.age = 30;

    result.innerHTML = person.name + ", " + person.age + ", " + person.gender + ", " + person.married;

    // JSON Array
    const persons = [
        {"name": "강감찬", "age": 60},
        {"name": "장보고", "age": 70},
        {"name": "이순신", "age": 30}
    ];
    persons[1] = {"name": "권율", "age": 80};
    result.innerHTML = persons[1].name + ", " + persons[1].age;

    const personsleng = persons.length;
    let printStr = "";
    for(let i=0; i<personsleng; i++) {
        printStr += persons[i].name + ", " + persons[i].age + "<br />";
    }
    result.innerHTML = printStr;

    // json형태의 문자열
    const jsonObjStr = '{"name": "홍길동", "age": 20}';
    result.innerHTML = jsonObjStr;
    //result.innerHTML = jsonObjStr.name; // 문자열 형태이기 때문에 name만으로는 출력이 안됨

    // json 문자열을 json object로
    const jsonObj = eval("(" + jsonObjStr + ")");
    result.innerHTML = jsonObj.name;

    // json object를 json 문자열로
    const jsonStr = JSON.stringify(jsonObj);
    result.innerHTML = jsonStr;
    
}



   