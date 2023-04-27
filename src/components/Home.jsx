import React from 'react';
import Header from './Header';
import db from "../firebase";
import { useEffect, useState } from 'react';
import { collection, onSnapshot, addDoc , doc, setDoc, deleteDoc} from 'firebase/firestore';


function Home() {
     const [producten, setProducten] = useState([])
     const [cart, setCart] = useState([])
  const [products, setProducts] = useState([])

     
    useEffect(
        () => 
        onSnapshot(collection(db, "producten"), (snapshot) => 
            setProducten(snapshot.docs.map((doc) => ({...doc.data(), id: doc.id})))
        ),
     []
    );

    useEffect(() => {
      onSnapshot(collection(db, "cart"), (querySnapshot) => {
          var p = [];
          querySnapshot.forEach((doc) => {
            p.push(doc.data());
            products.map((i) => {
              if (i.id == doc.data().id) {
                i.cart = true
              }
            })
          });
  
          setCart(p)
        });
  
    }, []);

    

    function addtocart(producten) {

      products.map((i) => {
        if (i.id == producten.id) {
          i.cart = true
        }
      })
  
      setDoc(doc(collection(db, 'cart'), `${producten.id}`), producten, { merge: true });
  
    }

    


  return (
    <div className='text-white justify-center '>
      <Header />  
      <ul className='text-center mt-20 grid grid-cols-4'>
        {producten.map((producten) =>(
            <div className='grid grid-cols-auto items-center justify-center'> 
                <div class="bg-white rounded-lg shadow-md overflow-hidden m-3 w-80 ">
                <div class=" flex items-center justify-center h-64 ">
                    <img src={producten.fotoURL} alt="" className='w-1/4'/>
                </div>
                <div className='grid-cols-auto'>
                  <div class="px-4 py-2">
                      <h3 class="text-lg font-medium text-gray-800">{producten.naam}</h3>
                      <p class="text-gray-600 text-sm mt-1">{producten.besch}</p>
                      <div class=" justify-between items-center mt-1">
                      <div class="text-gray-800 font-medium">€ {producten.prijs}</div>
                      <button class="px-3 py-1 bg-gray-800 text-white text-sm font-semibold rounded" onClick={() => addtocart(producten)}>Add to Cart</button>
                  </div>
                </div>
                </div>
                </div>
            </div>
        ))}
      </ul>
      
    </div>
  );
}

export default Home;