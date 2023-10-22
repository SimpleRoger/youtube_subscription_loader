"use client";
import React from "react";
import { useRouter } from "next/router";
import { auth } from "@/firebase";
import { signOutUser } from "@/redux/userSlice";
import { signOut } from "firebase/auth";
import { useDispatch } from "react-redux";

export default function Header() {
  const router = useRouter();
  const dispatch = useDispatch();

  async function logOut() {
    await signOut(auth);
    dispatch(signOutUser());
    router.push("/");
    // dispatch(closeSignUpModal());
    // dispatch(closeLogInModal());
  }

  return (
    <div className="flex items-center justify-center w-full mx-10 my-10 text-center">
      <div className="flex justify-center items-center">
        <img
          src="./assets/YouTube_social_white_square_(2017).svg.webp"
          className="w-10"
        />
        Youtube Subscription Loader !
      </div>
      {router.pathname === "/videos" && (
        <>
          <div
            onClick={() => {
              router.push("/settings");
            }}
            className="absolute right-[15%] cursor-pointer"
          >
            Settings
          </div>

          <div
            className="absolute right-[5%] cursor-pointer"
            onClick={logOut}
          >
            Logout
          </div>
        </>
      )}
    </div>
  );
}
