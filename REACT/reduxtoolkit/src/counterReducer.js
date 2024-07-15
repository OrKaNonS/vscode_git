// slice : redux-toolkit에서 state, action, reducer를 통합 관리하는 개념

import {createSlice} from '@reduxjs/toolkit';

const counterSlice = createSlice({
    name: 'counter',    // Slice 이름
    initialState : 0,   // state 초기값
    reducers: {         // reducer 들
        increment: state => state + 1,  // increment명령시 state 1 증가
        decrement: state => state - 1   // decrement명령시 state 1 감소
    }
})

export const {increment, decrement} = counterSlice.actions;
export default counterSlice.reducer;