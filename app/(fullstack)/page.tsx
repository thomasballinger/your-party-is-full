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
        Hometown management consultancy Axe and Ledger&#8482; is here to help
        with Party Is Full.
      </h2>

      {sessionId ? <SignedIn /> : <AuthForm />}

      <h2 className={`text-xl my-4 text-center`}>
        Adventures across the land report that four is the ideal size for quests of all kinds.
        It{"'"}s a party, not a fellowship!
      </h2>
      <p className="text-center text-xl">
        When someone new wants to join Axe and Ledger&#8482; help decide who goes home and comes up
        with reasons why it isn{"'"}t you.
      </p>
      <h2
        className={`text-3xl font-extrabold my-4 text-center ${syne.className}`}
      >
        Two is company, four is a party, three is a crowd.
      </h2>
      <h2
        className={`text-3xl font-extrabold my-4 text-center ${syne.className}`}
      >
        Five isn't anything. 
      </h2>
    </>
  );
}
// pass down the session Id more. If it's there render extra content.

function SignedIn() {
  const viewer = useQueryWithAuth(api.party.getCurrentUser, {});
  const convex = useConvex();

  const form = useForm();

  // TODO server-side render instead
  if (!viewer) return <Progress />;

  return (
    <>
      <div className="text-center">
        <CreateAdventure />
      </div>
    </>
  );
}
