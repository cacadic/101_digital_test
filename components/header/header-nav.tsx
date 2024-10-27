import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import React from "react";
import { Button } from "@/components/ui/button";
import HeaderNavProfile from "./header-nav-profile";
import Image from "next/image";
import Link from "next/link";
import SignoutButton from "../auth/signout-button";

const HeaderNav = () => {
  return (
    <nav className="w-full lg:p-2 p-4 pl-2 lg:pl-0 flex justify-between items-center border-b-[1px] sm:max-w-[1280px] mx-auto">
      <Link href="/" className="relative w-[166px] h-[33px]">
        <Image src="/images/logo.png" alt="101 Digital" fill sizes="100%" />
      </Link>
      <DropdownMenu defaultOpen={false}>
        <DropdownMenuTrigger>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" side="bottom" sideOffset={8}>
          <DropdownMenuItem>
            <Button variant="ghost" asChild className="w-full">
              <Link href="/add">Add New Invoice</Link>
            </Button>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <HeaderNavProfile />
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <SignoutButton />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  );
};

export default HeaderNav;
