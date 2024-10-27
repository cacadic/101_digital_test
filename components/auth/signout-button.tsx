"use client";

import React from "react";
import { Button } from "../ui/button";
import { signOut } from "next-auth/react";

const SignoutButton = () => {
  const onSignoutHandler = async () => {
    await signOut({ callbackUrl: "/" });
  };

  return (
    <Button
      variant="ghost"
      type="submit"
      onClick={onSignoutHandler}
      className="w-full"
    >
      <p className="text-left w-full">Sign Out</p>
    </Button>
  );
};

export default SignoutButton;
