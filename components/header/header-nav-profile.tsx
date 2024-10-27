"use client";

import { useModal } from "@/hooks/use-modal-store";
import React from "react";
import { Button } from "@/components/ui/button";

const HeaderNavProfile = () => {
  const { onOpen } = useModal();
  return (
    <Button
      variant="ghost"
      onClick={() => onOpen("profile")}
      className="w-full"
    >
      <p className="text-left w-full">Profile</p>
    </Button>
  );
};

export default HeaderNavProfile;
