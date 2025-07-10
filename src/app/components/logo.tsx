import Link from "next/link";
import { motion } from "framer-motion";

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary text-primary-foreground"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-6 h-6"
        >
          <path d="M12 2v4" />
          <path d="m16 6-3 3" />
          <path d="M18 12h4" />
          <path d="m16 18 3 3" />
          <path d="M12 20v4" />
          <path d="m8 18-3 3" />
          <path d="M6 12H2" />
          <path d="m8 6 3-3" />
          <circle cx="12" cy="12" r="4" />
        </svg>
      </motion.div>
      <span className="text-xl font-bold">ExpensePro</span>
    </Link>
  );
}