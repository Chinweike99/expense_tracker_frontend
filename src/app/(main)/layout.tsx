import type { Metadata } from "next";
// import { Providers } from "@/app/providers";
import { DashboardLayout } from "../components/dashboard/dashboardLaout";
import { Providers } from "../providers";
import { Afacad } from "next/font/google";

// const inter = Inter({ subsets: ["latin"] });

const afacad = Afacad({
  variable: "--font-afacad",
  subsets: ["latin"],
});


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
    
        <div>
          <DashboardLayout>{children}</DashboardLayout>
        </div>
  );
}