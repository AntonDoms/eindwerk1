import React, { useState, useEffect } from 'react'
import {Link} from 'react-router-dom';
import { useAuth} from '../firebase';
import Cart from './Cart';
import { collection, onSnapshot, getDocs } from 'firebase/firestore';
import db from "../firebase";
import {Button, Modal} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import Account from './Account';

function Header() {
  const currentUser = useAuth();
  const [ loading, setLoading ] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const collectionRef = collection(db, 'cart');
  const snapshot = getDocs(collectionRef);
  
  

  return (
    <>
        <section className="relative mx-auto">
            <nav className="flex justify-between bg-gray w-screen">
            <div className="px-5 xl:px-12 py-6 flex w-full items-center bg-gray-200 text-black">
                <a className="text-3xl font-bold font-heading text-black no-underline">
                Jack&June
                </a>
                <div className='flex md:flex md:flex-grow flex-row-reverse gap-4 text-lg float-right'>
                <button className='px-3 py-1 bg-gray-800 text-white text-sm font-semibold rounded' onClick={handleShow}>cart {snapshot.size}</button>
                  {!currentUser && 
                    <>
                      <Link to='/signup' className='text-black no-underline'>
                          Register
                      </Link>
                      <Link to='/signin' className='text-black no-underline'>
                          Log in
                      </Link>
                    </>
                  }
                  {currentUser && 
                    <Link to='/account' className='text-black no-underline'>
                        Account
                    </Link>
                  }
                  <div className='content-center mx-auto space-x-5 '>
                    <Link to='/' className='text-black no-underline'>
                          Home
                    </Link>
                    <Link to='/ceramics' className='text-black no-underline'>
                          Ceramics
                    </Link>
                    <Link to='/extra' className='text-black no-underline'>
                          Extra
                    </Link>
                  </div>
                  
                </div>
                
            </div>
            </nav>
        </section>

        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Shopping cart</Modal.Title>
            </Modal.Header>    
            <Modal.Body>
                 <Cart/>
            </Modal.Body>      
        </Modal>
      </>
      )
}

export default Header