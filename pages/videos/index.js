import React from "react";
import Videos from "../components/Videos";
import { useSelector } from "react-redux";
import Header from "../components/Header";

export default function Index() {
  const user = useSelector((state) => state.user);
  console.log(user);
  return (
    <div className="max-w-[1060px] mx-auto flex flex-col items-center justify-center">
      {/* <h1>HIGH</h1> */}
      <Header />
      <h1>Welcome {user.name}</h1>
      <Videos />
    </div>
  );
}
