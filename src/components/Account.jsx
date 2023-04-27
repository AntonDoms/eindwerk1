import { async } from '@firebase/util';
import React, { useState } from 'react';
import { useAuth, logout} from '../firebase';
import Header from './Header';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Account() {
    const navigate = useNavigate();
    const currentUser = useAuth();
    const [ loading, setLoading ] = useState(false);
    

     async function handleLogout() {
        setLoading(false);
        try {
            await logout();
            navigate("/")
        } catch {
           alert("mislukt!") 
        }
        setLoading(true);
    }

    return(
        
        <div>

            <Header/>
            <div class=" flex flex-col justify-center py-12 sm:px-6 lg:px-8"></div>

            <div class="max-w-md mx-auto bg-white rounded-xl overflow-hidden md:max-w-2xl">
            <div class="md:flex">
                <div class="md:flex-shrink-0">
                </div>
                <div class="p-8">
                <div class="uppercase tracking-wide text-sm text-black font-semibold">Account</div>
                <p class="mt-2 text-gray-500">{currentUser?.email}</p>
                {currentUser && <button disabled={loading || !currentUser} onClick={handleLogout} className='mt-3 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500'>
                    Log uit
                </button>}
                </div>
            </div>
            </div>

        </div>
    )
} 
