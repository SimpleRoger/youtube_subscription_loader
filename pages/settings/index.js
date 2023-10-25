import React, { useEffect, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
// import { database } from "../firebase";
import getChannelId from "../api/getChannnelId";

import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  arrayUnion,
  setDoc,
  getDoc,
  arrayRemove,
} from "firebase/firestore";
import { auth, db } from "@/firebase";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/Header";
import { setUser } from "@/redux/userSlice";

export default function index() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      const user = auth.currentUser;
      if (currentUser) {
        const userEmail = user.email;
        console.log(user);
        console.log("HELLO");
        dispatch(
          setUser({
            name: user.name,
            email: user.email,
            uid: user.uid,
          })
        );
        if (user.uid != null) {
          getEntries(user.uid);
          console.log("ENTIRES", entries);
          if (entries != []) {
            console.log("ENTIRES", entries);
            getChannelId(entries);
          }
        }
      }
    });

    return unsubscribe;
  }, [dispatch]);
  const getEntries = async (uid) => {
    if (loading == true) {
      console.log(uid);
      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const posts = docSnap.data();
        console.log("POSTS", posts);
        console.log(posts.subscriptions);
        setEntries(posts.subscriptions);
        console.log("ENTRIES", entries);
      } else {
        createUser();
      }
    }
  };
  const [newEntry, setNewEntry] = useState("");
  const user = useSelector((state) => state.user);
  console.log(user);

  const deleteEntry = async (entry) => {
    const userRef = doc(db, "users", user.uid);
    console.log(entry);
    await updateDoc(userRef, {
      subscriptions: arrayRemove(entry),
    });
    getEntries();
  };
  const addEntry = async () => {
    const userRef = doc(db, "users", user.uid);
    await updateDoc(userRef, {
      subscriptions: arrayUnion(newEntry),
    });
    getEntries();
    setNewEntry("");
  };
  const createUser = async () => {
    await setDoc(doc(db, "users", user.uid), {
      subscriptions: [],
    });
  };
  console.log(user);

  return (
    <>
      <Header />
      <div className="max-w-[700px] mx-auto text-center flex flex-col gap-y-10">
        <h1>Subscriptions</h1>
        <ul className="flex flex-col gap-y-8">
          {entries?.map((entry) => (
            <li key={entry.id}>
              {entry}
              <button onClick={() => deleteEntry(entry)}>
                <AiFillDelete />
              </button>
            </li>
          ))}
        </ul>
        <input
          type="text"
          className="text-center"
          placeholder="Add an entry"
          value={newEntry}
          onChange={(e) => setNewEntry(e.target.value)}
        />
        <button onClick={addEntry}>Add</button>
      </div>
    </>
  );
}
