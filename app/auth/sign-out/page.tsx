"use client";

import { signOut } from "next-auth/react";
import React, { useEffect } from "react";

const SignOutPage = () => {
  useEffect(() => {
    signOut({
      callbackUrl: "/",
    });
  }, []);

  return (
    <div className="w-full flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-2xl font-bold mb-4">Access Token expired</h1>
      <p className="mb-4">Please Sign Out and Sign In again</p>
    </div>
  );
};

export default SignOutPage;
