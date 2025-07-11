import type { Metadata } from "next";
import { 
  Outfit, 
  Afacad, 
  Poppins, 
  Nunito, 
  Lexend, 
  Inter, 
  DM_Sans, 
} from "next/font/google";
// import "./globals.css";
import '@/app/globals.css'
import { Providers } from "./providers";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: "400",
});

const afacad = Afacad({
  variable: "--font-afacad",
  subsets: ["latin"],
});

const lexend = Lexend({
  variable: "--font-lexend",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const dmsans = DM_Sans({
  variable: "--font-dmsans",
  subsets: ["latin"]
});

export const metadata: Metadata = {
  metadataBase: new URL("https://expensetracker.com"), // Update with your domain
  title: {
    default: "ExpensePro - Smart Personal Finance Management",
    template: "%s | ExpensePro",
  },
  description: "Take control of your finances with ExpenseTracker. Track expenses, manage budgets, analyze spending patterns, and achieve your financial goals with our intuitive expense tracking platform.",
  keywords: [
    "expense tracker",
    "budget management",
    "personal finance",
    "money management",
    "spending tracker",
    "financial planning",
    "budget planner",
    "expense management",
    "financial analytics",
    "money tracking app",
    "budget tracker",
    "expense categories",
    "financial goals",
    "spending analysis",
  ],
  authors: [{ name: "chinweike" }],
  creator: "Chinweike",
  publisher: "Chinweike",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://expense-tracker-frontend-fuxw.onrender.com/",
    siteName: "ExpenseTracker",
    title: "ExpenseTracker - Smart Personal Finance Management",
    description: "Take control of your finances with ExpenseTracker. Track expenses, manage budgets, analyze spending patterns, and achieve your financial goals with our intuitive platform.",
  },
  twitter: {
    card: "summary_large_image",
    title: "ExpenseTracker - Smart Personal Finance Management",
    description: "Take control of your finances with ExpenseTracker. Track expenses, manage budgets, and achieve your financial goals.",
    creator: "@ExpenseTracker",
    // images: ['https://expensetracker.com/twitter-image.jpg'],
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-32x32.png", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png" },
      { url: "/apple-icon-72x72.png", sizes: "72x72", type: "image/png" },
      { url: "/apple-icon-114x114.png", sizes: "114x114", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
  applicationName: "ExpenseTracker",
  category: "Finance",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body 
        className={`${outfit.variable} ${poppins.variable} ${afacad.variable} ${nunito.variable} ${lexend.variable} ${inter.variable} ${dmsans.variable} antialiased`}
      >
        <Providers>
        {children}
        </Providers>
      </body>
    </html>
  );
}