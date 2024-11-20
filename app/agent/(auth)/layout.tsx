"use client";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Lock, Menu, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PropsWithChildren, useState } from "react";

const Layout = ({ children }: PropsWithChildren) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const router = useRouter();

  const handleSheetClick = (to: string) => {
    toggleMobileMenu();
    router.push(to);
  };

  return (
    <div className="bg-gray-100">
      {/* Header */}
      <header className="p-4 bg-white dark:bg-gray-800 shadow-md">
        <div className="flex items-center  md:me-10">
          <div className="flex items-center justify-end space-x-2 ">
            <Sheet open={isMobileMenuOpen} onOpenChange={toggleMobileMenu}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu size={48} />
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <SheetHeader>
                  <SheetTitle>Authentication</SheetTitle>
                  <SheetDescription>
                    Access your account, settings and more.
                  </SheetDescription>
                </SheetHeader>
                <div className="grid gap-4 py-4">
                  <Button
                    onClick={() => handleSheetClick("/agent/login")}
                    variant="ghost"
                    className="justify-start"
                  >
                    <Lock className="mr-2 h-4 w-4" />
                    Login
                  </Button>

                  <Button
                    onClick={() => handleSheetClick("/agent/signup")}
                    variant="ghost"
                    className="justify-start"
                  >
                    <User className="mr-2 h-4 w-4" />
                    Register
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
          <Link href={"/"}>
            <Image
              className="md:hidden ml-20"
              src="/logo.png"
              width={150}
              height={150}
              alt="logo"
            />
          </Link>
        </div>
      </header>
      <div className="mx-auto my-0 max-w-4xl min-h-[93vh] ">{children}</div>
      <nav className="hidden md:block fixed top-0 left-0 h-full w-64 font-semibold  bg-white dark:bg-gray-800 border-r p-4">
        <div className="flex items-center justify-center mb-8">
          <Link href={"/"}>
            {" "}
            <Image src="/logo.png" width={200} height={200} alt="logo" />
          </Link>
        </div>
        <ul className="space-y-2 ">
          <li>
            <Link href={"/agent/login"}>
              <Button variant="ghost" className="w-full justify-start">
                <Lock className="mr-2 h-4 w-4" />
                Login
              </Button>
            </Link>
          </li>

          <li>
            <Link href={"/agent/signup"}>
              <Button variant="ghost" className="w-full justify-start">
                <User className="mr-2 h-4 w-4" />
                Register
              </Button>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Layout;
