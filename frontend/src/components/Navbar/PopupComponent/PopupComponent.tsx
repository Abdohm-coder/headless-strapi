"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import React, { FC, useState } from "react";
import NavItem from "../NavItem";
import { INavbarLinks } from "@/types/generated";

interface IPopup {
  triggerText: string;
  content: INavbarLinks["children"];
}

export const PopupComponent: FC<IPopup> = ({ triggerText, content }) => {
  const [toggle, setToggle] = useState(false);
  return (
    <Popover open={toggle} onOpenChange={setToggle}>
      <PopoverTrigger className="flex items-center gap-1 opacity-80 hover:opacity-95 font-medium">
        {triggerText}{" "}
        <ChevronDownIcon
          className={
            toggle
              ? "rotate-180 transition-all duration-300"
              : "rotate-0 transition-all duration-300"
          }
        />
      </PopoverTrigger>
      <PopoverContent className="rounded-xl bg-[#ffffffbf] backdrop-blur-xl mt-2">
        <div className="flex flex-col">
          <NavItem data={content} />
        </div>
      </PopoverContent>
    </Popover>
  );
};
