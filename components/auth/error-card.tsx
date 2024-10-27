import React from "react";
import CardWrapper from "@/components/auth/card-wrapper";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

const ErrorCard = () => {
  return (
    <CardWrapper headerLabel="Oops! Something went wrong">
      <div className="w-full flex items-center justify-center">
        <ExclamationTriangleIcon className="text-destructive size-10" />
      </div>
    </CardWrapper>
  );
};

export default ErrorCard;