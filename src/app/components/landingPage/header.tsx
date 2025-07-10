"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
;
import { usePathname } from "next/navigation";
import { useAuthStore } from "@/app/stores/auth.store";
import { Logo } from "../logo";

const navItems = [
  { name: "Features", href: "#features" },
  { name: "Pricing", href: "#pricing" },
  { name: "Testimonials", href: "#testimonials" },
];

export function Header() {
  const pathname = usePathname();
  const user = useAuthStore((state) => state.user);

  return (
    <header className="fixed top-0 z-50 w-full border bg-[#fcbe88]/80 rounded-full backdrop-blur-md max-w-[1260px]">
      <div className="container flex items-center justify-between h-16 px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Logo />
        </motion.div>

        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link
                href={item.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  pathname === item.href ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {item.name}
              </Link>
            </motion.div>
          ))}
        </nav>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2"
        >
          <Button variant="ghost" asChild>
            {/* <Link href={user ? "/dashboard" : "/login"}>Sign In</Link> */}
            <Link href={'/login'}>Sign In</Link>
          </Button>
          <Button asChild>
            <Link href={user ? "/dashboard" : "/register"}>Get Started</Link>
          </Button>
        </motion.div>
      </div>
    </header>
  );
}