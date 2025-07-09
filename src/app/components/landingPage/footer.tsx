import Link from "next/link";
import { Facebook, Twitter, Instagram, Github } from "lucide-react";
import { Logo } from "../logo";

export function Footer() {
  return (
    <footer className="py-12 border-t bg-muted/40">
      <div className="container px-4 mx-auto">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <Logo />
            <p className="text-sm text-muted-foreground">
              The most intuitive expense tracker to help you save money and achieve your financial goals.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <Facebook className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <Twitter className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <Instagram className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <Github className="w-5 h-5" />
              </Link>
            </div>
          </div>
          
          <div className="space-y-2">
            <h3 className="font-medium">Product</h3>
            {/* <nav className="flex flex-col space-y-2">
              <Link href="/features" className="text-sm text-muted-foreground hover:text-foreground">
                Features
              </Link>
              <Link href="/pricing" className="text-sm text-muted-foreground hover:text-foreground">
                Pricing
              </Link>
              <Link href="/blog" className="text-sm text-muted-foreground hover:text-foreground">
                Blog
              </Link>
              <Link href="/changelog" className="text-sm text-muted-foreground hover:text-foreground">
                Changelog
              </Link>
            </nav> */}
          </div>
          
          <div className="space-y-2">
            <h3 className="font-medium">Company</h3>
            {/* <nav className="flex flex-col space-y-2">
              <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground">
                About
              </Link>
              <Link href="/careers" className="text-sm text-muted-foreground hover:text-foreground">
                Careers
              </Link>
              <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground">
                Privacy
              </Link>
              <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground">
                Terms
              </Link>
            </nav> */}
          </div>
          
          <div className="space-y-2">
            <h3 className="font-medium">Resources</h3>
            {/* <nav className="flex flex-col space-y-2">
              <Link href="/help" className="text-sm text-muted-foreground hover:text-foreground">
                Help Center
              </Link>
              <Link href="/tutorials" className="text-sm text-muted-foreground hover:text-foreground">
                Tutorials
              </Link>
              <Link href="/api" className="text-sm text-muted-foreground hover:text-foreground">
                API Docs
              </Link>
              <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground">
                Contact
              </Link>
            </nav> */}
          </div>
        </div>
        
        <div className="pt-8 mt-8 text-sm text-center text-muted-foreground border-t">
          © {new Date().getFullYear()} Expense Tracker Pro. All rights reserved.
        </div>
      </div>
    </footer>
  );
}