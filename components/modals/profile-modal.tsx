"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useModal } from "@/hooks/use-modal-store";
import { getSession } from "next-auth/react";
import { Profile, User } from "@/types/common";

const ProfileModal = () => {
  const [userData, setUserData] = useState<Profile>();

  const { isOpen, onClose, type } = useModal();

  const isModalOpen = useMemo(
    () => isOpen && type === "profile",
    [isOpen, type]
  );

  const retrieveSession = useCallback(async () => {
    try {
      const sessionData = await getSession();
      const user = sessionData?.user as User;
      setUserData(user.profile);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    if (isModalOpen) {
      retrieveSession();
    }
  }, [isModalOpen, retrieveSession]);

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle className="pb-2">Profile Information</DialogTitle>
          <div className="space-y-4 border-t-[1px] pt-4 text-left">
            <div>
              <strong>ID:</strong> {userData?.userId}
            </div>
            <div>
              <strong>Username:</strong> {userData?.userName}
            </div>
            <div>
              <strong>Name:</strong> {userData?.firstName} {userData?.lastName}
            </div>
            <div>
              <strong>Mobile Number:</strong> {userData?.mobileNumber}
            </div>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileModal;
