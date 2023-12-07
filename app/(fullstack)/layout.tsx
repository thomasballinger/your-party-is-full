import "../globals.css";
import "../../components/logo-styles.css"
import type { Metadata } from "next";
import { Inter, Syne } from "next/font/google";
import ConvexClientProvider from "./ConvexClientProvider";
import { StickyHeader } from "@/components/layout/sticky-header";
import { Logo } from "@/components/Logo";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PART(y) I(s) FUL(l)",
  description: "Party balance consultancy helping you find the optimal party balance for your adventure... without hurting anyone's feelings.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <StickyHeader className="p-2"><Logo/></StickyHeader>
      <main className="min-h-full">
        <ConvexClientProvider>{children}</ConvexClientProvider>
        </main>
      </body>
    </html>
  );
}
