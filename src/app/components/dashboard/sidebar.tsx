"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Home,
  Wallet,
  LineChart,
  PiggyBank,
  Bell,
  Settings,
  LogOut,
  User,
} from "lucide-react";
import { useAuthStore } from "@/app/stores/auth.store";

const navItems = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: Home,
  },
  {
    name: "Transactions",
    href: "/transactions",
    icon: Wallet,
  },
  {
    name: "Budgets",
    href: "/budgets",
    icon: PiggyBank,
  },
  {
    name: "Analytics",
    href: "/reports",
    icon: LineChart,
  },
  {
    name: "Reminders",
    href: "/reminders",
    icon: Bell,
  },
  {
    name: "Accounts",
    href: "/accounts",
    icon: User,
  },
  {
    name: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

export function Sidebar({ className }: { className?: string }) {
  const pathname = usePathname();
  const { logout } = useAuthStore();
  const navigate = useRouter();

  const handleLogout = () => {
    logout();
    navigate.push("/");
  };

  return (
    <div
      className={cn(
        "w-[250px] border-r bg-background lg:flex flex-col",
        className
      )}
    >
      <div className="p-4 border-b">
        <h1 className="text-xl font-bold">XpensePro</h1>
      </div>
      <nav className="flex-1 p-4 space-y-1 ">
        {navItems.map((item) => (
          <Button
            key={item.href}
            asChild
            variant="ghost"
            className={cn(
              "w-full justify-start text-sm md:text-lg text-gray-600 py-7",
              pathname.startsWith(item.href)
                ? "bg-[#f6dfcb] border-r-5 hover:bg-[#f6dfcb] border-[#f57708] text-accent-foreground"
                : ""
            )}
          >
            <Link href={item.href}>
              <item.icon className="w-8 h-8 mr-2 font-bold text-[#f57708]" />
              <span className="flex flex-col">{item.name}</span>
            </Link>
          </Button>
        ))}
      </nav>
      <div className="p-4 border-t">
        <Button
          variant="ghost"
          className="w-full justify-start text-red-600"
          onClick={handleLogout}
        >
          <LogOut className="w-4 h-4 mr-2" />
          Sign Out
        </Button>
      </div>
    </div>
  );
}
