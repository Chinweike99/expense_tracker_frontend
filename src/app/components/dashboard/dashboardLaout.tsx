"use client";


import { useMediaQuery } from "@/app/hooks/use-media-query";
import { useAuthStore } from "@/app/stores/auth.store";
import { cn } from "@/lib/utils";
import { Sidebar } from "./sidebar";
import { MobileSidebar } from "./mobileSidebar";
import { TopBar } from "./topbar";


export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const user = useAuthStore((state) => state.user);

  return (
    <div className="min-h-screen bg-background">
      {isDesktop ? (
        <Sidebar className="fixed inset-y-0 left-0 z-50" />
      ) : (
        <MobileSidebar />
      )}
      <div
        className={cn(
          "transition-[margin] duration-300",
          isDesktop ? "ml-[250px]" : "ml-0"
        )}
      >
        <TopBar user={user} />
        <main className="p-4 lg:p-6">{children}</main>
      </div>
    </div>
  );
}