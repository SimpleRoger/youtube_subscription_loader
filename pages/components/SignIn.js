// SignIn.js
import { useState } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import { useRouter } from "next/router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/userSlice";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();
  const handleSignIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/videos");
      const { currentUser } = useAuth(); // Replace with how you access the Firebase user
      useEffect(() => {
        if (currentUser) {
          const email = currentUser.email;
          const name = currentUser.name;
          console.log('User Email:', email);
        }
      }, [currentUser]);
      dispatch(
        setUser({
          name: "hi",
          email: email,
        })
      );
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
