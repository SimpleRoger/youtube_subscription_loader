import React from "react";
import { useRouter } from "next/router";

export default function Header() {
  const router = useRouter();

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
        <div className="absolute right-10">Logout</div>
      )}
    </div>
  );
}
