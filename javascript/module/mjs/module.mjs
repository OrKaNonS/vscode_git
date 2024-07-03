// module.mjs
// export한 것들만 외부에서 사용 가능

// 모듈(파일) 스코프
var x = 1;
let y = 2;
const z = 3;
const func = () => {
    console.log('module.mjs');
};

// 값만 뽑을 때 사용
export default val => 100;

export {x as mx, y as my, z as mz, func as mfunc}