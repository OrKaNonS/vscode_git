// 1. function문법 component

// function App() {
//     return (
//         // <>
//         //     <h1>Hello React!</h1>
//         //     <h1>안뇽 리액트!</h1>
//         //     <Hello />
//         //  </>
//         <ReactComponent />
//     );
// }

// 2. class문법 component
import {Component} from "react";
export default class ReactComponent extends Component {
    render() {
        const message = 'Class문법 Component';
        return (
            <h1> {message}</h1>
        );
    }
}