import React from "react";
import Videos from "../components/Videos";
import { useSelector } from "react-redux";

export default function Index() {
  const user = useSelector((state) => state.user);
  console.log(user);
  return (
    <div>
      {/* <h1>HIGH</h1> */}
      <h1>Welcome {user.name}</h1>
      <Videos />
    </div>
  );
}
