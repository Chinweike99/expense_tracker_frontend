"use client";

import { User } from "@/@types/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useMediaQuery } from "@/app/hooks/use-media-query";
import { useAuthStore } from "@/app/stores/auth.store";
import { useRouter } from "next/navigation";

interface TopBarProps {
  user: User | null;
}

export function TopBar({ user }: TopBarProps) {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const { logout } = useAuthStore();
    const navigate = useRouter();
  
    const handleLogout = () => {
      logout();
      navigate.push("/");
    };

  return (
    <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
      <div className="container flex items-center justify-between h-16">
        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar className=" w-full ">
                <AvatarImage src={user?.name} />
                <AvatarFallback className="flex flex-col items-start bg-white justify-left w-full px-5 text-sm font-semibold rounded-md ">
                  <span>{user?.name}</span>
                  {/* <span>{user?.email}</span> */}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={handleLogout} className="text-red-500">
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}