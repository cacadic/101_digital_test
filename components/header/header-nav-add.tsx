"use client";

import { useModal } from "@/hooks/use-modal-store";
import React from "react";
import { Button } from "@/components/ui/button";

const HeaderNavAdd = () => {
  const { onOpen } = useModal();

  return (
    <Button variant="ghost" onClick={() => onOpen("createInvoice")}>
      Add New Invoice
    </Button>
  );
};

export default HeaderNavAdd;
