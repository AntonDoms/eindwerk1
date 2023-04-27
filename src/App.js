import React from 'react';
import Signin from './components/Signin';
import Signup from './components/Signup';
import Home from './components/Home';
import Admin from './components/Admin';
import Account from './components/Account';
import Cart from './components/Cart';
import { Route, Routes, Link } from 'react-router-dom';


function App() {
  return (   
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/admin' element={<Admin />} />
          <Route path='/signin' element={<Signin />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/account' element={<Account />} />
        </Routes>
  );
}

export default App;
