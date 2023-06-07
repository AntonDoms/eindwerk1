import React from "react";
import Header from "./Header";
import db from "../firebase";
import { useEffect, useState, useRef } from "react";
import {
  collection,
  onSnapshot,
  setDoc,
  doc,
  addDoc,
  deleteDoc,
  query,
  where,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";
import { useAuth } from "../firebase";
import { useNavigate } from "react-router-dom";

function Admin() {
  const navigate = useNavigate();
  const currentUser = useAuth();

  // console.log("test: " + currentUser?.email);
  // useEffect(() => {
  //   if (currentUser?.email !== "admin@admin.com") {
  //     navigate("/");
  //   }
  // }, []);

  const [producten, setProducten] = useState([]);
  const [keramiek, setKeramiek] = useState([]);
  const [extra, setExtra] = useState([]);
  const [naam, setNaam] = useState([]);
  const [besch, setBesch] = useState([]);
  const [prijs, setPrijs] = useState([]);
  const [fotoURL, setFotoURL] = useState([]);
  useEffect(
    () =>
      onSnapshot(collection(db, "producten"), (snapshot) =>
        setProducten(
          snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        )
      ),
    []
  );

  useEffect(
    () =>
      onSnapshot(collection(db, "keramiek"), (snapshot) =>
        setKeramiek(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      ),
    []
  );

  useEffect(
    () =>
      onSnapshot(collection(db, "extra"), (snapshot) =>
        setExtra(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      ),
    []
  );

  const newCeramic = async () => {
    const naam = prompt("geef een naam: ");
    const besch = prompt("geef een besch: ");
    const prijs = prompt("geef een prijs: ");
    const fotoURL = prompt("geef een foto link: ");

    const collectionRef = collection(db, "keramiek");
    const payload = {
      naam,
      besch,
      prijs,
      fotoURL,
      timeStamp: serverTimestamp(),
      aantal: 1,
    };
    await addDoc(collectionRef, payload);
  };

  const newExtra = async () => {
    const naam = prompt("geef een naam: ");
    const besch = prompt("geef een besch: ");
    const prijs = prompt("geef een prijs: ");
    const fotoURL = prompt("geef een foto link: ");

    const collectionRef = collection(db, "extra");
    const payload = {
      naam,
      besch,
      prijs,
      fotoURL,
      timeStamp: serverTimestamp(),
      aantal: 1,
    };
    await addDoc(collectionRef, payload);
  };

  const wijzigCeramic = async (id) => {
    const naam = prompt("geef een naam: ");
    const besch = prompt("geef een besch: ");
    const prijs = prompt("geef een prijs: ");
    const fotoURL = prompt("geef een foto link: ");

    const docRef = doc(db, "keramiek", id);
    const payload = { naam, besch, prijs, fotoURL };

    setDoc(docRef, payload);
  };

  const wijzigExtra = async (id) => {
    const naam = prompt("geef een naam: ");
    const besch = prompt("geef een besch: ");
    const prijs = prompt("geef een prijs: ");
    const fotoURL = prompt("geef een foto link: ");

    const docRef = doc(db, "extra", id);
    const payload = { naam, besch, prijs };

    setDoc(docRef, payload);
  };

  const deleteCeramic = async (id) => {
    const docRef = doc(db, "keramiek", id);
    await deleteDoc(docRef);
  };

  const deleteExtra = async (id) => {
    const docRef = doc(db, "extra", id);
    await deleteDoc(docRef);
  };

  const handleNaamChange = (e) => {
    setNaam(e.target.value);
  };

  const handleBeschChange = (e) => {
    setBesch(e.target.value);
  };

  const handlePrijsChange = (e) => {
    setPrijs(e.target.value);
  };

  const queryVerwijder = async (id) => {
    const collectionRef = collection(db, "producten");
    const naam = prompt("geef een naam: ");

    const q = query(collectionRef, where("naam", "==", naam));
    const snapshot = await getDocs(q);

    const resultaat = snapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));

    resultaat.forEach(async (resultaat) => {
      const docRef = doc(db, "producten", resultaat.id);
      await deleteDoc(docRef);
    });
  };

  return (
    <div className="justify-center">
      <Header />
    
      <button
        onClick={newCeramic}
        className="px-3 py-1 bg-gray-800 text-white text-sm font-semibold rounded m-2"
      >
        add ceramic
      </button>
      <button
        onClick={newExtra}
        className="px-3 py-1 bg-gray-800 text-white text-sm font-semibold rounded m-2"
      >
        add extra
      </button>
      <button
        onClick={queryVerwijder}
        className="px-3 py-1 bg-gray-800 text-white text-sm font-semibold rounded m-2"
      >
        delete by name
      </button>
    
      <div className="grid place-items-center text-4xl">Admin</div>
    
      <div className="grid place-items-center text-3xl mt-5">Ceramics</div>
      <table className="mt-10 mx-auto w-full">
        <thead>
          <tr>
            <th>Image</th>
            <th>NAME</th>
            <th>PRICE</th>
            <th>ACTION</th>
          </tr>
        </thead>
        <tbody>
          {keramiek.map((producten) => (
            <tr key={producten.id}>
              <td className="p-2">
                <img
                  className="w-16 mx-auto"
                  src={producten.fotoURL}
                  alt="geen foto"
                />
              </td>
              <td className="p-2">{producten.naam}</td>
              <td className="p-2">€ {producten.prijs}</td>
              <td className="p-2">
                <button
                  onClick={() => wijzigCeramic(producten.id)}
                  className="px-3 py-1 bg-gray-800 text-white text-sm font-semibold rounded m-3"
                >
                  edit
                </button>
                <button
                  onClick={() => deleteCeramic(producten.id)}
                  className="px-3 py-1 bg-gray-800 text-white text-sm font-semibold rounded"
                >
                  delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    
      <div className="grid place-items-center text-3xl mt-20">Extra</div>
      <table className="mt-10 mx-auto w-full">
        <thead>
          <tr>
            <th>Image</th>
            <th>NAME</th>
            <th>PRICE</th>
            <th>ACTION</th>
          </tr>
        </thead>
        <tbody>
          {extra.map((producten) => (
            <tr key={producten.id}>
              <td className="p-2">
                <img
                  className="w-16 mx-auto"
                  src={producten.fotoURL}
                  alt="geen foto"
                />
              </td>
              <td className="p-2">{producten.naam}</td>
              <td className="p-2">€ {producten.prijs}</td>
              <td className="p-2">
                <button
                  onClick={() => wijzigExtra(producten.id)}
                  className="px-3 py-1 bg-gray-800 text-white text-sm font-semibold rounded m-3"
                >
                  edit
                </button>
                <button
                  onClick={() => deleteExtra(producten.id)}
                  className="px-3 py-1 bg-gray-800 text-white text-sm font-semibold rounded"
                >
                  delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Admin;
