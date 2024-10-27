"use client";

import React, { useEffect, useState } from "react";
import ProfileModal from "../modals/profile-modal";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";

interface ModalProviderProps {
  session?: Session | null;
}

const ModalProvider = ({ session }: ModalProviderProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <SessionProvider session={session}>
      <ProfileModal />
    </SessionProvider>
  );
};

export default ModalProvider;
