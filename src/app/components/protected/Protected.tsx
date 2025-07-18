"use client";
import { useAuthStore } from "@/app/stores/auth.store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { user, isLoading } = useAuthStore();
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (isHydrated && !isLoading && !user) {
      router.push("/login");
    }
  }, [user, isLoading, router, isHydrated]);

  if (!isHydrated || isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="w-12 h-12 border-4 border-t-transparent border-[#f57708] rounded-full animate-spin" />
        <p>Loading...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="w-12 h-12 border-4 border-t-transparent border-[#f57708] rounded-full animate-spin" />
        <p>Redirecting to login...</p>
      </div>
    );
  }

  return <>{children}</>;
}
