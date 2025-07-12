// import type { Metadata } from "next";
// import { Inter } from "next/font/google";
// import "./globals.css";
// import { Providers } from "@/app/providers";
// import { Header } from "../components/landingPage/header";

// const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "Expense Tracker Pro | Take Control of Your Finances",
//   description: "The most intuitive expense tracker to help you save money, budget effectively, and achieve your financial goals.",
//   keywords: ["expense tracker", "budget app", "personal finance", "money management"],
//   openGraph: {
//     title: "Expense Tracker Pro",
//     description: "Take control of your finances with our intuitive expense tracking app",
//     url: "https://expense-tracker-pro.example.com",
//     siteName: "Expense Tracker Pro",
//     images: [
//       {
//         url: "https://expense-tracker-pro.example.com/og-image.jpg",
//         width: 1200,
//         height: 630,
//       },
//     ],
//     locale: "en_US",
//     type: "website",
//   },
//   twitter: {
//     card: "summary_large_image",
//     title: "Expense Tracker Pro",
//     description: "Take control of your finances with our intuitive expense tracking app",
//     images: ["https://expense-tracker-pro.example.com/og-image.jpg"],
//   },
// };

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="en" suppressHydrationWarning>
//       <body className={inter.className}>
//         <Providers>
//           <Header />
//           {children}
//         </Providers>
//       </body>
//     </html>
//   );
// }