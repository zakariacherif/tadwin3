import type { Metadata } from "next";
import { Alexandria } from 'next/font/google';
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
} from '@clerk/nextjs';
import Landing from "./b-component/Landing";
import Header from "@/app/b-component/Header";
import Sidebar from "./s-component/Sidebar";
import { I18nextProvider } from "react-i18next";
import i18n from "@/i18n";

// Load the Alexandria font
const alexandria = Alexandria({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-alex',
  subsets: ['latin'],
  display: 'swap',
});

// Metadata for the page
export const metadata: Metadata = {
  title: "تدوين",
  description: "أول برنامج عربي لتسهيل الكتابة والتحرير",
};

// Main layout component
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
        <html lang="ar" dir="rtl" className={alexandria.className}>
          <body>
            <SignedOut>
              <Landing />
            </SignedOut>
            <SignedIn>
              <Header />
              <div className="flex min-h-[89vh]">
                <Sidebar />
                <div className="flex-1 p-7 bg-gray-100 overflow-y-auto scrollbar-hide"> 
                  {children}
                </div>
              </div>
              <Toaster position="top-left"/>
            </SignedIn>
          </body>
        </html>
    </ClerkProvider>
  );
}
