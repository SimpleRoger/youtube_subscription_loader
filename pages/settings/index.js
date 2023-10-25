import React, { useEffect, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
// import { database } from "../firebase";
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
      }
    });

    return unsubscribe;
  }, [dispatch]);
  const getEntries = async () => {
    if (loading == true) {
      console.log(user.uid);

      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const posts = docSnap.data();
        console.log(posts);
        setEntries(posts.subscriptions);
      } else {
        createUser();
      }
    }
  };
  const [entries, setEntries] = useState([]);
  const [newEntry, setNewEntry] = useState("");
  const user = useSelector((state) => state.user);
  console.log(user);
  if (user.uid != null) {
    getEntries();
  }
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
      <div className="max-w-[1200px] mx-auto text-center">
        <h1>Subscriptions</h1>
        <ul>
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
          placeholder="Add an entry"
          value={newEntry}
          onChange={(e) => setNewEntry(e.target.value)}
        />
        <button onClick={addEntry}>Add</button>
      </div>
    </>
  );
}
