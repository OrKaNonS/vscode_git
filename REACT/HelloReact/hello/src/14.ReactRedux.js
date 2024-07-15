// redux : 상태관리를 위한 외부라이브러리
// 설치
// - npm install redux
// - npm install react-redux
// 상태(action), dispatcher, reducer, store(상태관리를 일원화 - reducer를 관리함)
// reducer가 많아지면 어떤게 어떤 것을 실행하는지 일일히 확인하기 어려움 - store 활용
// 상태관리 흐름 : action > dispatcher > reducer > store > UI
// 모든 상태관리를  store를 통해서 하게 됨

import {createStore} from 'redux';
import {Provider, useSelector, useDispatch} from 'react-redux';

// reducer(상태, 명령) : 명령에 따른 상태 리턴
function reducer(currState, action) {
    if (currState==undefined) return {count:0};

    // ... 을 쓰는 이유 :  배열이 아닌 값을 가져오기 위해
    if(action.type==='plus1') {
        return {...currState, count: currState.count + 1};
    }
    if(action.type==='plus2') {
        return {...currState, count: currState.count + 2};
    }
    if(action.type==='plus3') {
        return {...currState, count: currState.count + 3};
    }
}

// reducer를 가지고 store 생성
const store = createStore(reducer);

// Provider : 하위컴포넌트(Plus1 ~ 3)에 store 전달
export default function ReactRedux() {
    return (
        <div>
            <Provider store={store}>
                <Plus1 />
                <Plus2 />
                <Plus3 />
            </Provider>
        </div>
    );
}

function Plus1() {
    // dispatcher 생성
    const dispatch = useDispatch();
    // selector 생성 _ 현재 상태 currState를 가져온다.
    const selector = useSelector(currState => currState.count);
    return (
        <div>
            <h2>Plus1 : 클릭시 모두 1 증가</h2>
            <p><button onClick={() => dispatch({type: 'plus1'})}> + </button>
                : {selector} </p>
        </div>
    );
}

function Plus2() {
    const dispatch = useDispatch();
    const selector = useSelector(currState => currState.count);
    return (
        <div>
            <h2>Plus1 : 클릭시 모두 2 증가</h2>
            <p><button onClick={() => dispatch({type: 'plus2'})}> + </button>
                : {selector} </p>
        </div>
    );
}

function Plus3() {
    const dispatch = useDispatch();
    const selector = useSelector(currState => currState.count);
    return (
        <div>
            <h2>Plus1 : 클릭시 모두 3 증가</h2>
            <p><button onClick={() => dispatch({type: 'plus3'})}> + </button>
                : {selector} </p>
        </div>
    );
}


