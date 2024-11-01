"use client";

import { useRouter } from "next/navigation";
import React from "react";

interface LoginButtonProps {
  children: React.ReactNode;
  mode?: "modal" | "redirect";
}

const LoginButton = ({ children, mode = "redirect" }: LoginButtonProps) => {
  const router = useRouter();

  const onClick = () => {
    router.push("/auth/login");
  };

  if (mode === "modal") {
    return <span>TODO</span>;
  }

  return (
    <span className="cursor-pointer" onClick={onClick}>
      {children}
    </span>
  );
};

export default LoginButton;
