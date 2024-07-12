import JavascriptSub from './JavascriptSub';
import {Routes, Route, NavLink} from 'react-router-dom';

export default function Javascript() {
    return(
        <>
            <div>
                <h2>JavaScript 페이지</h2>
                <p>
                    <NavLink to='/Javascript/1'>sub1</NavLink>&nbsp;
                    <NavLink to='/Javascript/2'>sub2</NavLink>
                </p>
            </div>
            <Routes>
                <Route path='/:pid' element={<JavascriptSub />} />
            </Routes>
        </>
    );
}