import React from 'react';
import Header from './Header';
import db from "../firebase";
import { useEffect, useState, useRef} from 'react';
import { collection, onSnapshot, setDoc, doc, addDoc, deleteDoc, query, where, getDocs, serverTimestamp} from 'firebase/firestore';
import { useAuth} from '../firebase';

function Admin() {
     
     const [producten, setProducten] = useState([]);
     const [naam, setNaam] = useState([]);
     const [besch, setBesch] = useState([]);
     const [prijs, setPrijs] = useState([]);
     const [fotoURL, setFotoURL] = useState([]);
    useEffect(
        () => 
        onSnapshot(collection(db, "producten"), (snapshot) => 
            setProducten(snapshot.docs.map((doc) => ({...doc.data(), id: doc.id})))
        ),
     []
    )

     const nieuw = async () => {
        const naam = prompt("geef een naam: ")
        const besch = prompt("geef een besch: ")
        const prijs = prompt("geef een prijs: ")
        const fotoURL = prompt("geef een foto link: ")
        
        const collectionRef = collection(db, "producten")
        const payload = {naam, besch, prijs, fotoURL, timeStamp: serverTimestamp(), aantal: 1}
        await addDoc(collectionRef, payload)
     }   

     const wijzig = async (id) => {
        const docRef = doc(db, "producten", id);
        const payload = {naam, besch, prijs};
      
        setDoc(docRef, payload);
     }

     const verwijder = async (id) => {
        const docRef = doc(db, "producten", id);
        await deleteDoc(docRef);
     }

     const handleNaamChange = (e) => {
      setNaam(e.target.value)
     }

     const handleBeschChange = (e) => {
      setBesch(e.target.value)
     }

     const handlePrijsChange = (e) => {
      setPrijs(e.target.value)
     }

     const queryVerwijder = async (id) => { 
        const collectionRef = collection(db, "producten")
        const naam = prompt("geef een naam: ");

        const q = query(collectionRef, where("naam", "==", naam));
        const snapshot = await getDocs(q);

        const resultaat = snapshot.docs.map((doc) => ({...doc.data(), id: doc.id }));
        
        resultaat.forEach(async (resultaat) => {
          const docRef = doc(db, "producten", resultaat.id);
          await deleteDoc(docRef);
        })
     }

  return (
  
    <div className=' justify-center'>
      <Header />  
      
      <button onClick={nieuw} className='px-3 py-1 bg-gray-800 text-white text-sm font-semibold rounded m-5'>voeg toe</button>
      <button onClick={queryVerwijder} className='px-3 py-1 bg-gray-800 text-white text-sm font-semibold rounded'>bepaalde verwijderen</button>
      <div className='grid place-items-center text-4xl'>Admin</div>
      <ul className='text-center mt-20  items-center justify-center h-64 grid grid-cols-4'>
        {producten.map((producten) =>( 
            <li className='m-10 p-3 border items-center w-80 h-60 '>
                  <input type="text" onChange={handleNaamChange} value={producten.naam}/>
                  <input type="text" onChange={handleBeschChange} placeholder={producten.besch}/>
                  <input type="text" onChange={handlePrijsChange} placeholder={producten.prijs}/>
                  <input type="text"/>
                  
                <img className='w-1/6 mx-auto' src={producten.fotoURL} alt="geen foto"/> NAAM: {producten.naam} <br /> BESCHRIJVING: {producten.besch} <br/> PRIJS: € {producten.prijs}   <br/>
                <button onClick={() => wijzig(producten.id)} className='px-3 py-1 bg-gray-800 text-white text-sm font-semibold rounded m-3'>wijzig</button>
                <button onClick={() => verwijder(producten.id)} className='px-3 py-1 bg-gray-800 text-white text-sm font-semibold rounded'>verwijder</button>
            </li>
        ))}
      </ul>
      
      
    </div>
  );
}

export default Admin;