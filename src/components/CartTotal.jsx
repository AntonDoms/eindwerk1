import React from 'react';
import db from "../firebase";
import { useEffect, useState, createContext } from 'react';
import { QuerySnapshot, collection, onSnapshot, deleteDoc, doc, updateDoc, increment } from 'firebase/firestore';

export default function total(cart) {
    let x = 0
    cart.map((i) => {
      x += i.prijs * i.aantal
    })
    return (x)


  };
