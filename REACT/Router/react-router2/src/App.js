import {Routes, Route, NavLink} from 'react-router-dom';
import Home from "./sub/Home"
import Javascript from "./sub/Javascript"
import Typescript from './sub/Typescript';
import React  from './sub/React';
import NotFound from './sub/NotFound';

function App() {
  return (
    <>
      <div>
        <p>

    <NavLink to='/'>Home</NavLink>&nbsp;
    <NavLink to='./sub/javascript'>Javascript</NavLink>&nbsp;
    <NavLink to='/sub/typescript'>typescript</NavLink>&nbsp;
    <NavLink to='/sub/react'>React</NavLink><br />
    </p>
    </div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/sub/javascript' element={<Javascript />} />
        <Route path='/sub/javascript/*' element={<Javascript />} />{/* nested router */}
        <Route path='/sub/typescript' element={<Typescript />} />
        <Route path='/react' element={<React />} />
        <Route path='/*' element={<NotFound />} />
      </Routes>
    </>
  );

}
export default App;
