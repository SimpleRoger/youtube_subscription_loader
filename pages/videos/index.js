import React, { useEffect, useState } from "react";
import Videos from "../components/Videos";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/Header";
import { auth } from "@/firebase";
import { setUser } from "@/redux/userSlice";

export default function Index() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  let [userName, setUserName] = useState("");
  console.log(user);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      const user = auth.currentUser;
      console.log(userName);
      if (currentUser) {
        const userEmail = user.email;
        userName = user.displayName;
        setUserName(userName);
        // console.log("User Email:", userEmail);
        dispatch(
          setUser({
            name: userName,
            email: userEmail,
          })
        );
      }
    });
    return unsubscribe;
  }, [dispatch]);
  return (
    <div className="max-w-[1060px] mx-auto flex flex-col items-center justify-center">
      {/* <h1>HIGH</h1> */}
      <Header />
      <h1>Welcome {userName}</h1>
      <Videos />
    </div>
  );
}
