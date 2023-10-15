// SignIn.js
import { useState } from "react";
import firebase from "firebase/app";
import "firebase/auth";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async () => {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
    } catch (error) {
      console.error("Sign-in error:", error);
    }
  };

  return (
    <div className="flex flex-col max-w-[600px] gap-y-5 border-2 p-10">
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
