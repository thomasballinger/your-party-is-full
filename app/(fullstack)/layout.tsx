import "../globals.css";
import "../../components/logo-styles.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ConvexClientProvider from "./ConvexClientProvider";
import { StickyHeader } from "@/components/layout/sticky-header";
import { Logo, LogoLink } from "@/components/Logo";
import { Profile } from "@/components/Profile";
import { SignOutButton } from "./auth";
import { HeaderAuth } from "./HeaderAuth";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Part(y) i(s) ful(l)",
  description:
    "Party balance consultancy helping you find the optimal party balance for your adventure... without hurting anyone's feelings.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ConvexClientProvider>
          <StickyHeader className="p-2 flex items-center justify-between">
            <LogoLink />
            <div className="flex">
              <HeaderAuth/>
            </div>
          </StickyHeader>
          <main className="container max-w-2xl flex flex-col gap-8">
            {children}
          </main>
        </ConvexClientProvider>
      </body>
    </html>
  );
}
/*
const sessionId = useSessionId();

return (
  <>
    <h1 className={`text-4xl font-extrabold my-8 text-center ${syne.className}`}>
      The best way to plan an adventuring party
    </h1>
    {sessionId ? <SignedIn /> : <AuthForm />}
    */
