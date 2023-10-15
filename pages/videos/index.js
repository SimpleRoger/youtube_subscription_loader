import React from "react";
import Videos from "../components/Videos";
import { useSelector } from "react-redux";

export default function Index() {
  const user = useSelector((state) => state.user);

  return (
    <div>
      <h1>HIGH</h1>
      <h1>Welcome {user}</h1>
      <Videos />
    </div>
  );
}
