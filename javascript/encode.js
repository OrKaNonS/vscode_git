// encode / decode
// encode : 코드를 변환
// decode : 변환된 코드 원복

const name = '홍길동';
const age = 20;
const gender = '남';

let uri = `https://www.naver.com/shop/product/1000?name=${name}&age=${age}&{gender}=${gender}`

console.log(uri, '\n');
const enURI = encodeURI(uri);
console.log(enURI, '\n');
const deURI = decodeURI(uri);
console.log(decodeURI, '\n');


console.log(uri, '\n');
const unURIComp = encodeURIComponent(uri);
console.log(unURIComp, '\n');
const deURIComp = decodeURIComponent(enURI);
console.log(deURIComp, '\n');