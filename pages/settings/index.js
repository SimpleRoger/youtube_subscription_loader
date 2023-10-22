import React, { useEffect, useState } from "react";
// import { database } from "../firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "@/firebase";
import { useSelector } from "react-redux";

export default function index() {
  const [entries, setEntries] = useState([]);
  const [newEntry, setNewEntry] = useState("");
  const user = useSelector((state) => state.user);
  useEffect(() => {
    const getEntries = async () => {
      // Fetch data from Firebase when the component mounts
      const data = await getDocs(collection(db, "posts"));
      const posts = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      console.log(posts);
    };
    getEntries();
  }, []);
  const addEntry = async () => {
    const post = {
      [user.name]: newEntry,
    };
    console.log(user.uid)
    await addDoc(collection(db, user.uid), post);
  };

  const deleteEntry = (entryId) => {
    const entryRef = database.ref(`/entries/${entryId}`);
    entryRef.remove();
  };

  return (
    <div className="max-w-[1200px] mx-auto">
      <div>Settings</div>
      <h1>My List</h1>
      <ul>
        {entries.map((entry) => (
          <li key={entry.id}>
            {entry.text}
            <button onClick={() => deleteEntry(entry.id)}>Delete</button>
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
  );
}
