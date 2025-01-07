import Scard from "@/components/Card";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ArrowRight,
  BarChart,
  Shield,
  Store,
  UserCircle,
  Zap,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className=" flex flex-col min-h-screen max-w-7xl mx-auto ">
      <header className="px-4 lg:px-6 h-20 flex items-center justify-center">
        <Link className="flex items-center justify-center" href="#">
          <Image src="/logo.png" width={200} height={200} alt="TakaFlow Logo" />
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link href="/user/login">
            {" "}
            <Button
              className="w-28 h-10 bg-blue-500 text-white hover:bg-blue-600 hover:text-white"
              variant="outline"
            >
              Login
            </Button>
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Your Digital Wallet – Anytime, Anywhere
                  </h1>
                  <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                    Experience a faster, safer, and more convenient way to
                    manage your money with TakaFlow.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row   ">
                  <Link href="/user/login">
                    <Button
                      size={"lg"}
                      className="bg-blue-500 hover:bg-blue-600"
                    >
                      Get Started
                    </Button>
                  </Link>
                  <Link href="#services">
                    <Button size={"lg"} variant="outline">
                      Learn More
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <Image
                  alt="TakaFlow Hero Image"
                  className="mx-auto aspect-video overflow-hidden rounded-xl  object-center sm:w-full lg:order-last"
                  height="550"
                  src="/mobilepay.svg"
                  width="550"
                />
              </div>
            </div>
          </div>
        </section>
        {/* <section
          id="services"
          className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800"
        >
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-8">
              Our Services
            </h2>
            <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Send className="w-6 h-6 mr-2 text-blue-500" />
                    Send Money
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Transfer money to friends and family quickly and securely.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CreditCard className="w-6 h-6 mr-2 text-blue-500" />
                    Cash Out
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Withdraw cash from your TakaFlow account at any time.</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Download className="w-6 h-6 mr-2 text-blue-500" />
                    Cash In Request
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Request cash deposits to your TakaFlow account easily.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section> */}

        {/* Our Promise Section */}
        <section className="bg-gray-100 py-20">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-12">
              Our Promise to You
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Scard
                title="Safe & Secure"
                icon={
                  <Shield size={32} className="text-[var(--primary-color)]" />
                }
              >
                Industry-standard encryption and authentication for peace of
                mind.
              </Scard>
              <Scard
                title="Simple & Fast"
                icon={<Zap size={32} className="text-[var(--primary-color)]" />}
              >
                Intuitive design and quick transactions to save you time.
              </Scard>
              <Scard
                title="Reliable & Transparent"
                icon={
                  <BarChart size={32} className="text-[var(--primary-color)]" />
                }
              >
                Always know where your money is and what you're paying for.
              </Scard>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-8">
              Choose Your Role
            </h2>
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-center text-2xl">
                    <UserCircle className="w-8 h-8 mr-2 text-blue-500" />
                    User
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center mb-4">
                    Access your personal TakaFlow account for everyday
                    transactions.
                  </p>
                  <Link href="/user/login">
                    <Button
                      size={"lg"}
                      className="w-full bg-blue-500 hover:bg-blue-600"
                    >
                      Login as User
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-center text-2xl">
                    <Store className="w-8 h-8 mr-2 text-blue-500" />
                    Agent
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center mb-4">
                    Manage your TakaFlow agent account and serve customers.
                  </p>
                  <Link href="/agent/login">
                    <Button
                      size={"lg"}
                      className="w-full bg-blue-500 hover:bg-blue-600"
                    >
                      Login as Agent
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 justify-center items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © {new Date().getFullYear()} TakaFlow. Developed By{" "}
          <Link
            target="_blank"
            href="https://github.com/shamim261"
            className="text-blue-500 underline"
          >
            Shamim
          </Link>
          .
        </p>
      </footer>
    </div>
  );
}
