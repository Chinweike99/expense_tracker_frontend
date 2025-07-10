"use client";

import { User } from "@/@types/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MobileSidebar } from "./mobileSidebar";
import { useMediaQuery } from "@/app/hooks/use-media-query";
import { signOut } from "@/app/lib/auth";
// import { signOut } from "@/lib/auth";

interface TopBarProps {
  user: User | null;
}

export function TopBar({ user }: TopBarProps) {
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  return (
    <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
      <div className="container flex items-center justify-between h-16">
        {!isDesktop && <MobileSidebar />}
        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar className="h-8 w-8">
                <AvatarImage src={user?.name} />
                <AvatarFallback>
                  {user?.name
                    ?.split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => signOut()} className="text-red-500">
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}