"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Sidebar } from "./sidebar";

export function MobileSidebar() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button  size="icon" className="lg:hidden bg-white border  border-[#fbb111] p-0 m-2">
          <Menu className="h-5 w-5 text-black" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0">
        <Sidebar className="w-full border-0" />
        <SheetTitle></SheetTitle>
      </SheetContent>
    </Sheet>
  );
}