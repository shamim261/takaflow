"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { logout } from "@/redux/slices/userSlice";
import { userInfoType } from "@/types";
import axios from "axios";
import { CreditCard, Home, LogOut, Menu, User, Wallet } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

interface NavbarProps {
  children?: React.ReactNode;
  user: userInfoType;
}

const Navbar: React.FC<NavbarProps> = ({ children, user }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const router = useRouter();
  const dispatch = useDispatch();

  const handleSheetClick = (to: string) => {
    toggleMobileMenu();
    router.push(to);
  };
  const handleLogOut = async () => {
    await axios.get("/api/user/logout");
    dispatch(logout());
    router.push("/user/login");
  };

  // const { userInfo } = useSelector((state: selectorStateType) => state.user);
  // const { name } = userInfo;

  return (
    <div className="bg-gray-100">
      {/* Header */}
      <header className="!z-50 p-4 bg-white dark:bg-gray-800 shadow-md">
        <div className="flex items-center justify-between md:me-10">
          <div className="flex items-center justify-end space-x-2 ">
            <Sheet open={isMobileMenuOpen} onOpenChange={toggleMobileMenu}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu size={48} />
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <SheetHeader>
                  <SheetTitle>Welcome, {user?.name}</SheetTitle>
                  <SheetDescription>
                    Access your account settings and more.
                  </SheetDescription>
                </SheetHeader>
                <div className="grid gap-4 py-4">
                  <Button
                    onClick={() => handleSheetClick("/user/dashboard")}
                    variant="ghost"
                    className="justify-start"
                  >
                    <Home className="mr-2 h-4 w-4" />
                    Dashboard
                  </Button>

                  <Button
                    onClick={() => handleSheetClick("/user/sendmoney")}
                    variant="ghost"
                    className="justify-start"
                  >
                    <Wallet className="mr-2 h-4 w-4" />
                    Send Money
                  </Button>

                  <Button
                    onClick={() => handleSheetClick("/user/cashout")}
                    variant="ghost"
                    className="justify-start"
                  >
                    <CreditCard className="mr-2 h-4 w-4" />
                    Cash Out
                  </Button>
                  <Button
                    onClick={() => handleSheetClick("/user/cashin")}
                    variant="ghost"
                    className="justify-start"
                  >
                    <CreditCard className="mr-2 h-4 w-4" />
                    Cash In
                  </Button>
                  <Button
                    onClick={() => handleSheetClick("/user/transactions")}
                    variant="ghost"
                    className="justify-start"
                  >
                    <User className="mr-2 h-4 w-4" />
                    Transaction History
                  </Button>
                  <Button
                    onClick={() => handleSheetClick("/user/profile")}
                    variant="ghost"
                    className="justify-start"
                  >
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </Button>
                  <hr />
                  <Button
                    onClick={handleLogOut}
                    variant="ghost"
                    className="justify-start"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
          <Link href="/">
            <Image
              className="md:hidden"
              src="/logo.png"
              width={150}
              height={150}
              alt="logo"
            />
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Avatar>
                  <AvatarImage src="/placeholder-user.jpg" alt="@user" />
                  <AvatarFallback>
                    {user?.name.split(" ")[0].toUpperCase().charAt(0)}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => router.push("/user/profile")}>
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push("/user/profile")}>
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogOut}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
      <div className="mx-auto my-0 max-w-4xl min-h-[93vh] ">{children}</div>
      <nav className="hidden md:block fixed top-0 left-0 h-full w-64 font-semibold  bg-white dark:bg-gray-800 border-r p-4">
        <div className="flex items-center justify-center mb-8">
          <Link href="/">
            <Image src="/logo.png" width={200} height={200} alt="logo" />
          </Link>
        </div>
        <ul className="space-y-2 ">
          <li>
            <Link href={"/user/dashboard"}>
              <Button variant="ghost" className="w-full justify-start">
                <Home className="mr-2 h-4 w-4" />
                Dashboard
              </Button>
            </Link>
          </li>
          <li>
            <Link href={"/user/sendmoney"}>
              {" "}
              <Button variant="ghost" className="w-full justify-start">
                <Wallet className="mr-2 h-4 w-4" />
                Send Money
              </Button>
            </Link>
          </li>
          <Link href={"/user/cashout"}>
            <li>
              <Button variant="ghost" className="w-full justify-start">
                <CreditCard className="mr-2 h-4 w-4" />
                Cash Out
              </Button>
            </li>
          </Link>
          <Link href={"/user/cashin"}>
            <li>
              <Button variant="ghost" className="w-full justify-start">
                <CreditCard className="mr-2 h-4 w-4" />
                Cash In
              </Button>
            </li>
          </Link>
          <Link href={"/user/transactions"}>
            <li>
              <Button variant="ghost" className="w-full justify-start">
                <CreditCard className="mr-2 h-4 w-4" />
                Transaction History
              </Button>
            </li>
          </Link>

          <Link href={"/user/profile"}>
            <li>
              <Button variant="ghost" className="w-full justify-start">
                <User className="mr-2 h-4 w-4" />
                Profile
              </Button>
            </li>
          </Link>
          <hr className="my-1" />

          <li>
            <Button
              onClick={handleLogOut}
              variant="ghost"
              className="w-full justify-start"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Log out
            </Button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
