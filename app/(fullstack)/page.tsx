"use client";

import { CreateAdventure } from "@/components/CreateAdventure";
import { Progress } from "@/components/ui/progress";
import { api } from "@/convex/_generated/api";
import {
  useQueryWithAuth,
  useSessionId,
} from "@convex-dev/convex-lucia-auth/react";
import { useConvex } from "convex/react";
import { Syne } from "next/font/google";
import { useForm } from "react-hook-form";
import { AuthForm } from "./auth";

const syne = Syne({ subsets: ["latin"], weight: ["700"], variable: "--syne" });

export default function Home() {
  const sessionId = useSessionId();

  return (
    <>
      <h1
        className={`text-5xl font-extrabold my-4 mt-12 text-center ${syne.className}`}
      >
        Building a party is hard, choosing who waits in camp is harder
      </h1>
      <h2
        className={`text-3xl font-extrabold my-4 text-center ${syne.className}`}
      >
        Hometown management consultancy Axe and Ledger&#8482; is here to help with Party Is Full.
      </h2>
      
      {sessionId ? <SignedIn /> : <AuthForm />}

    <h2
        className={`text-xl my-4 text-center`}
      >
Everyone knows that four is the ideal size for a party of adventurers. It's a party, not a fellowship!
</h2>
      <p className="text-center text-xl">
      When someone new wants to join we help decide who goes home and come up with reasons why it isn{"'"}t you.
      </p>
    </>
  );
}
// pass down the session Id more. If it's there render extra content.

function SignedIn() {
  const viewer = useQueryWithAuth(api.myFunctions.getCurrentUser, {});
  const convex = useConvex();

  const form = useForm();

  // TODO server-side render instead
  if (!viewer) return <Progress />;

  return (
    <>
      <p className="text-center">
        <CreateAdventure />
      </p>
    </>
  );
}
