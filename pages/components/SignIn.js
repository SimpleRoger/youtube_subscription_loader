import React, { useEffect, useState } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import { useRouter } from "next/router";
import {
  browserLocalPersistence,
  setPersistence,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "@/firebase";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/userSlice";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();

  const handleSignIn = async () => {
    try {
      await setPersistence(auth, browserLocalPersistence);
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/videos");
    } catch (error) {
      // console.log(error);
      setError(error.message);
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      const user = auth.currentUser;
      if (currentUser) {
        const userEmail = user.email;
        const userName = user.displayName;
        console.log("User Email:", userEmail);
        router.push("/videos");
        dispatch(
          setUser({
            name: userName,
            email: userEmail,
            uid: user.uid,
          })
        );
      }
    });
    return unsubscribe;
  }, [dispatch]);

  return (
    <div className="flex flex-col max-w-[600px] gap-y-5 border-2 p-10">
      <p>{error}</p>
      <input
        type="email"
        placeholder="Email"
        value={email}
        className="p-4"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        className="p-4"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSignIn}>Sign In</button>
    </div>
  );
};

export default SignIn;
