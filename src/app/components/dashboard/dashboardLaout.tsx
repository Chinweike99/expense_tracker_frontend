"use client";


import { useMediaQuery } from "@/app/hooks/use-media-query";
import { useAuthStore } from "@/app/stores/auth.store";
import { Sidebar } from "./sidebar";
import { MobileSidebar } from "./mobileSidebar";
import { TopBar } from "./topbar";


export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const user = useAuthStore((state) => state.user);

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      {isDesktop ? (
        <Sidebar className="w-[250px] shrink-0" />
      ) : (
        <MobileSidebar />
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        <TopBar user={user} />
        <main className="p-4 lg:p-6">{children}</main>
      </div>
    </div>
  );
}
