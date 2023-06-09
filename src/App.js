import React from 'react';
import Signin from './components/Signin';
import Signup from './components/Signup';
import Home from './components/Home';
import Admin from './components/Admin';
import Account from './components/Account';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import Ceramics from './components/Ceramics';
import { Route, Routes, Link } from 'react-router-dom';
import Extra from './components/Extra';
import { useAuth } from './firebase';


function App() {
  const currentUser = useAuth();
  return (   
    
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/ceramics' element={<Ceramics />} />
          <Route path='/extra' element={<Extra />} />
          <Route path='/admin' element={<Admin />} />
          <Route path='/signin' element={<Signin />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/account' element={<Account />} />
          <Route path='/checkout' element={<Checkout />} />
        </Routes>
  );
}

export default App;
