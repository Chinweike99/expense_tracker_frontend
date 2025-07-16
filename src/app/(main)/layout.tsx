import type { Metadata } from "next";
import { DashboardLayout } from "../components/dashboard/dashboardLaout";


export const metadata: Metadata = {
  title: "Expense Tracker Pro",
  description: "Manage your finances with ease",
};
 

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex justify-center bg-muted min-h-screen">
      <div className="w-full max-w-[1440px]">
        <DashboardLayout>{children}</DashboardLayout>
      </div>
    </div>
  );
}
