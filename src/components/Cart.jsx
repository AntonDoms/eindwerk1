import React from "react";
import db from "../firebase";
import { Link } from "react-router-dom";
import { useEffect, useState, createContext } from "react";
import {
  QuerySnapshot,
  collection,
  onSnapshot,
  deleteDoc,
  doc,
  updateDoc,
  increment,
} from "firebase/firestore";

function Cart() {
  const [producten, setProducten] = useState([]);
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(
    () =>
      onSnapshot(collection(db, "cart"), (snapshot) =>
        setCart(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
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
            i.cart = true;
          }
        });
      });

      setCart(p);
    });
  }, []);

  function removecart(product) {
    products.map((i) => {
      if (i.id == product.id) {
        i.cart = false;
      }
    });

    deleteDoc(doc(collection(db, "cart"), `${product.id}`));
  }

  function increase(product) {
    updateDoc(doc(collection(db, "cart"), `${product.id}`), {
      aantal: increment(1),
    });
  }

  function decrease(product) {
    if (product.aantal >= 1) {
      updateDoc(doc(collection(db, "cart"), `${product.id}`), {
        aantal: increment(-1),
      });
    }
  }

  function total() {
    let x = 0;
    cart.map((i) => {
      x += i.prijs * i.aantal;
    });
    let total = Math.round((x + Number.EPSILON) * 100) / 100;
    return total;
  }

  return (
    <>
      {cart.map((cart) => (
        <div class="border rounded p-4">
          <img
            className="w-1/6 mx-auto mb-5 float-right"
            src={cart.fotoURL}
            alt="nog geen foto"
          />
          <h2 class="text-lg font-bold">{cart.naam}</h2>
          <p class="text-gray-500">${cart.prijs}</p>

          <div class="flex ">
            <button
              class="px-1 py-1 bg-gray-800 text-white rounded"
              onClick={() => increase(cart)}
            >
              {" "}
              ↑{" "}
            </button>
            <div class="flex items-center m-0 p-0">{cart.aantal} </div>
            <button
              class="px-1 py-1 bg-gray-800 text-white rounded"
              onClick={() => decrease(cart)}
            >
              {" "}
              ↓{" "}
            </button>
          </div>
          <button
            className="mt-4 px-4 py-2 bg-gray-800 text-white rounded"
            onClick={() => removecart(cart)}
          >
            delete
          </button>
        </div>
      ))}
      <div>€ {total()}</div>
      <Link to="/checkout" className="text-black no-underline">
        <button>checkout</button>
      </Link>
    </>
  );
}

export default Cart;
