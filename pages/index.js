import Image from "next/image";
import { Inter } from "next/font/google";
import Videos from "./components/Videos";
import SignIn from "./components/SignIn";
import Header from "./components/Header";
import SignUp from "./components/SignUp";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [isSignIn, setIsSignIn] = useState(true);

  return (
    <div className="flex items-center justify-center flex-col">
      <Header />
      <div className="text-center">
        {isSignIn ? <SignIn /> : <SignUp />}
        <button
          className="text-center mx-auto"
          onClick={() => setIsSignIn(!isSignIn)}
        >
          {isSignIn
            ? "(Don't have an account), Sign Up"
            : "(Already have an account) Sign In"}
        </button>
      </div>{" "}
    </div>
  );
}
