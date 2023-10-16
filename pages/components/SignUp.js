// SignIn.js
import { useState } from "react";
import firebase from "firebase/app";
import { auth } from "@/firebase";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/userSlice";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState(""); // New state variable for name
  const dispatch = useDispatch();

  const router = useRouter();
  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      ); // User signed up successfully, you can redirect or show a success message
      await updateProfile(auth.currentUser, {
        displayName: displayName,
      });
      dispatch(
        setUser({
          name: displayName,
          email: email,
        })
      );
      router.push("videos");
    } catch (error) {
      console.error("Error signing up:", error);
      // Handle and display the error to the user
    }
  };

  return (
    <div className="flex flex-col max-w-[600px] gap-y-5 border-2 p-10">
      <input
        type="text" // Change to text for the name field
        placeholder="First Name" // Change to "Name"
        value={displayName}
        className="p-4"
        onChange={(e) => setDisplayName(e.target.value)} // Update the state variable
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
