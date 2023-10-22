import { useState, useEffect } from "react";
import firebase from "firebase/app";
import { auth } from "@/firebase";
import {
  browserLocalPersistence,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  setPersistence,
  updateProfile,
} from "firebase/auth";
import { useRouter } from "next/router"; // Changed "next/navigation" to "next/router"
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/userSlice";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) return;
      // console.log(currentUser.uid)
      dispatch(
        setUser({
          name: currentUser.displayName,
          email: currentUser.email,
          uid: currentUser.uid,
        })
      );
    });

    // Don't forget to return the cleanup function
    return () => unsubscribe();
  }, [dispatch]);

  const router = useRouter();
  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await setPersistence(auth, browserLocalPersistence);
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await updateProfile(auth.currentUser, {
        displayName: displayName,
      });

      router.push("/videos"); // Changed "videos" to "/videos" assuming it's a route
    } catch (error) {
      console.error("Error signing up:", error);
      // Handle and display the error to the user
    }
  };

  return (
    <div className="flex flex-col max-w-[600px] gap-y-5 border-2 p-10">
      <input
        type="text"
        placeholder="First Name"
        value={displayName}
        className="p-4"
        onChange={(e) => setDisplayName(e.target.value)}
      />
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
      <button onClick={handleSignUp}>Sign Up</button>
    </div>
  );
};

export default SignUp;
