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
    <div className="flex items-center justify-center w-full my-10 text-center">
      <div
        className="flex justify-center items-center cursor-pointer"
        onClick={() => {
          router.push("/videos");
        }}
      >
        Subscription Loader !
      </div>
      <div
        className="absolute right-[30%] cursor-pointer"
        onClick={() => {
          router.push("/terms");
        }}
      >
        Terms Of Service
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

          <div className="absolute right-[5%] cursor-pointer" onClick={logOut}>
            Logout
          </div>
        </>
      )}
    </div>
  );
}
