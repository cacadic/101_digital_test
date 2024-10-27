"use client";

import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react"; // Biểu tượng mũi tên xuống
import { usePathname, useSearchParams, useRouter } from "next/navigation";

type SortOption = {
  label: string;
  value: string;
};

const sortOptions: SortOption[] = [
  { label: "Date (Newest)", value: "DESCENDING" },
  { label: "Date (Oldest)", value: "ASCENDING" },
];

export function SortBy() {
  const searchParams = useSearchParams();

  const ordering = searchParams.get("ordering");

  const [selectedOption, setSelectedOption] = useState<SortOption>(
    ordering === "ASCENDING" ? sortOptions[1] : sortOptions[0]
  );

  const router = useRouter();
  const pathname = usePathname();

  const handleSortChange = (option: SortOption) => {
    setSelectedOption(option);
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set("ordering", option.value);

    router.push(`${pathname}?${newSearchParams.toString()}`);
  };

  return (
    <div className="flex sm:justify-end sm:shrink-0 order-2 sm:order-1">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex items-center gap-4">
            <span>Sort by: </span>
            <Button variant="outline" className="">
              {selectedOption.label}
              <ChevronDown size={16} />
            </Button>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {sortOptions.map((option) => (
            <DropdownMenuItem
              key={option.value}
              onClick={() => handleSortChange(option)}
            >
              {option.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
