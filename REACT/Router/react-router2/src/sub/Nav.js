import '../css/Nav.css';
import {Routes, Route, NavLink} from 'react-router-dom';
import Home from "./Home"
import Javascript from "./Javascript"
import Typescript from './Typescript';
import React  from './React';
import NotFound from './NotFound';

export default function Nav() {
    return (
        <div id='nav'>
            <ul>
                <li><NavLink to='/'>Home</NavLink></li>
                <li><NavLink to='./javascript'>Javascript</NavLink></li>
                <li><NavLink to='/typescript'>Typescript</NavLink></li>
                <li><NavLink to='/react'>React</NavLink></li>
            </ul>        
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/javascript' element={<Javascript />} />
            <Route path='/javascript/*' element={<Javascript />} />{/* nested router */}
            <Route path='/typescript' element={<Typescript />} />
            <Route path='/react' element={<React />} />
            <Route path='/*' element={<NotFound />} />
        </Routes>
        </div>
    );
}