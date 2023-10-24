import React, { useEffect, useState } from "react";
import Videos from "../components/Videos";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/Header";
import { auth } from "@/firebase";
import { setUser } from "@/redux/userSlice";

export default function Index() {
  const user = useSelector((state) => state.user);
  const [Loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  let [userName, setUserName] = useState("");
  console.log("INDEX PAGE");
  console.log(user);

  //checking if user has signed in
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      const user = auth.currentUser;
      if (currentUser) {
        const userEmail = user.email;
        userName = user.displayName;
        setUserName(userName);
        dispatch(
          setUser({
            name: userName,
            email: userEmail,
            uid: user.uid,
          })
        );
        setLoading(false);
      }
    });
    return unsubscribe;
  }, [dispatch]);
  return (
    <div className="max-w-[1060px] mx-auto flex flex-col items-center justify-center">
      {/* <h1>HIGH</h1> */}
      {!Loading && (
        <>
          <Header />
          <h1 className="pb-8">Welcome {userName}</h1>
          <Videos user={user} />
        </>
      )}
    </div>
  );
}
