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
    if (loading == true && uid) {
      console.log("UID", uid);
      console.log("DB", db);
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
    getEntries(user.uid);
  };
  const addEntry = async () => {
    const userRef = doc(db, "users", user.uid);
    await updateDoc(userRef, {
      subscriptions: arrayUnion(newEntry),
    });
    getEntries(user.uid);
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
      <div className="max-w-[700px] mx-auto text-center flex flex-col gap-y-10 pb-10">
        <h1>Subscriptions</h1>
        <h2>Paste your Youtube Channel ID below</h2>
        <h5>
          If you want to find the YouTube user ID from a YouTube channel link,
          you can use the following method: <br />
          Visit the YouTube Channel: Open the YouTube channel using the link
          provided. <br /> Access the Channel Page: Go to the channel's main
          page. <br /> Extract the User ID: The user ID is usually a part of the
          channel's URL. It appears after "channel/". For example, if the
          channel's URL is
          "https://www.youtube.com/channel/UC9c_6EJOhuEfg6swbv7-2Ew," then
          "UC9c_6EJOhuEfg6swbv7-2Ew" is the user ID.
        </h5>
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
