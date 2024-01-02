"use client";
import React from "react";
import { useRouter } from "next/router";
import { auth } from "@/firebase";
import { signOutUser } from "@/redux/userSlice";
import { signOut } from "firebase/auth";
import { useDispatch } from "react-redux";
import Image from "next/image";
import { CiLogout, CiSettings } from "react-icons/ci";

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
    <div className="flex items-center justify-center w-full my-10 text-center flex-col md:flex-row">
      <div
        className="flex justify-center items-center cursor-pointer w-[50%]"
        onClick={() => {
          router.push("/videos");
        }}
      >
        <Image
          src="/assets/logo.png" // Path relative to the public directory
          alt="My Image Alt Text"
          width={200} // Set the width of the image
          height={30} // Set the height of the image
        />
      </div>
      {/* <div
        className="absolute right-[30%] cursor-pointer"
        onClick={() => {
          router.push("/terms");
        }}
      >
        Terms Of Service
      </div> */}

      {router.pathname === "/videos" && (
        <div className="flex space-x-10">
          <div
            onClick={() => {
              router.push("/settings");
            }}
            className=" cursor-pointer flex items-center"
          >
            <CiSettings />
            Settings
          </div>

          <div className="cursor-pointer flex items-center" onClick={logOut}>
            <CiLogout />
            Logout
          </div>
        </div>
      )}
    </div>
  );
}
