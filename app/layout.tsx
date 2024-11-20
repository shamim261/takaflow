import QueryProvider from "@/providers/QueryProvider";
import ReduxProvider from "@/providers/ReduxProvider";
import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import type { Metadata } from "next";
import { Signika } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const signika = Signika({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-signika",
});

export const metadata: Metadata = {
  title: "TakaFlow - Your trusted Mobile Financial Service provider",
  description:
    "Your trusted Mobile Financial Service provider. Send money, cash out, and manage your finances with ease.",
  icons: { icon: "/favicon.ico" },
  openGraph: {
    title: "TakaFlow - Mobile Financial Service provider",
    description: "Send money, cash out, and manage your finances with ease",
    images: [
      {
        url: "/takaflowThumbnail.png",
        width: 800,
        height: 600,
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${signika.variable} !font-signika antialiased`}>
        <Toaster />
        <ReduxProvider>
          <QueryProvider>
            <Theme>{children}</Theme>
          </QueryProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
