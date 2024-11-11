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
import { CreditCard, Home, LogOut, Menu, User, Wallet } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { PropsWithChildren } from "react";

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className="bg-gray-100">
      {/* Header */}
      <header className="p-4 bg-white dark:bg-gray-800 shadow-md">
        <div className="flex items-center justify-between md:me-10">
          <div className="flex items-center justify-end space-x-2 ">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu size={48} />
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <SheetHeader>
                  <SheetTitle>Shamim Reza</SheetTitle>
                  <SheetDescription>
                    Access your account settings and more.
                  </SheetDescription>
                </SheetHeader>
                <div className="grid gap-4 py-4">
                  <Link href={"/user/dashboard"}>
                    <Button variant="ghost" className="justify-start">
                      <Home className="mr-2 h-4 w-4" />
                      Dashboard
                    </Button>
                  </Link>
                  <Link href={"/user/sendmoney"}>
                    <Button variant="ghost" className="justify-start">
                      <Wallet className="mr-2 h-4 w-4" />
                      Send Money
                    </Button>
                  </Link>
                  <Button variant="ghost" className="justify-start">
                    <CreditCard className="mr-2 h-4 w-4" />
                    Cash Out
                  </Button>
                  <Button variant="ghost" className="justify-start">
                    <CreditCard className="mr-2 h-4 w-4" />
                    Cash In
                  </Button>
                  <Button variant="ghost" className="justify-start">
                    <User className="mr-2 h-4 w-4" />
                    Transaction History
                  </Button>
                  <Button variant="ghost" className="justify-start">
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
          <Image
            className="md:hidden"
            src="/logo.png"
            width={150}
            height={150}
            alt="logo"
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Avatar>
                  <AvatarImage src="/placeholder-user.jpg" alt="@user" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
      <div className="mx-auto my-0 max-w-4xl h-[90vh] ">{children}</div>
      <nav className="hidden md:block fixed top-0 left-0 h-full w-64 font-semibold  bg-white dark:bg-gray-800 border-r p-4">
        <div className="flex items-center justify-center mb-8">
          <Image src="/logo.png" width={200} height={200} alt="logo" />
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
          <li>
            <Button variant="ghost" className="w-full justify-start">
              <CreditCard className="mr-2 h-4 w-4" />
              Cash In
            </Button>
          </li>
          <li>
            <Button variant="ghost" className="w-full justify-start">
              <CreditCard className="mr-2 h-4 w-4" />
              Cash Out
            </Button>
          </li>
          <li>
            <Button variant="ghost" className="w-full justify-start">
              <CreditCard className="mr-2 h-4 w-4" />
              Transaction History
            </Button>
          </li>

          <li>
            <Button variant="ghost" className="w-full justify-start">
              <User className="mr-2 h-4 w-4" />
              Profile
            </Button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Layout;
