
import { async } from '@firebase/util';
import React, { useState } from 'react';
import { signup } from '../firebase';
import Header from './Header';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Signup(){
  const navigate = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();
  const [loading, setLoading] = useState(false );

  async function handleRegister(){
    setLoading(true);
    try {
    await signup(emailRef.current.value, passwordRef.current.value);
    navigate("/account")
    } catch{
      alert('minstens 8 tekens')
    }
    setLoading(false);
  }

  return(
    <div>
      <Header />
      <div className=" flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Make an account
        </h2>
      </div>
          <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className=" py-8 px-4 shadow sm:rounded-lg sm:px-10">
              <form className="space-y-6" action="#" method="POST">
                <div>
                  <label for="email" class="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <div className="mt-1">
                    <input type="email" ref={emailRef} autocomplete="email" required
                      className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-gray-500 focus:border-gray-500 focus:z-10 sm:text-sm"/>
                  </div>
                </div>

                <div>
                  <label for="password" class="block text-sm font-medium text-gray-700">
                    Wachtwoord
                  </label>
                  <div className="mt-1">
                    <input ref={passwordRef}  type="password" required
                      className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-gray-500 focus:border-gray-500 focus:z-10 sm:text-sm"/>
                  </div>
                </div>
                <div>
                  <button disabled={loading}  onClick={handleRegister} type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                    Register
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

      </div>
  )
}