"use client";
import { Adventurer } from "@/components/Adventurer";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import {
  useMutationWithAuth,
  useQueryWithAuth,
} from "@convex-dev/convex-lucia-auth/react";
import { Syne } from "next/font/google";
import { AuthForm } from "../../auth";
import { Logo } from "@/components/Logo";

const syne = Syne({ subsets: ["latin"], weight: ["700"], variable: "--syne" });

export default function Party({ params: { id } }: { params: { id: string } }) {
  const event = useQueryWithAuth(api.party.getEvent, { id });

  const joinParty = useMutationWithAuth(api.party.joinParty);
  const handleJoinParty = async () => {
    console.log("calling...");
    await joinParty({ eventId: id });
  };

  if (!event) return <div>loading</div>;

  const { loggedIn } = event;

  return (
    <div className="flex flex-col items-center">
      <h1
        className={`text-5xl font-extrabold my-4 mt-12 text-center ${syne.className}`}
      >
        {event.title}
      </h1>
      <p className="text-l font-semibold my-6 text-center">
        {event.description}
      </p>
      {event.isFull && (<>
        <h2
          className={`text-5xl font-extrabold my-6 text-center ${syne.className}`}
        >
          {event.viewerIsMember ? "Your party is full!" : "Party is full!"}
        </h2>
       { event.viewerIsMember && <p className="text-l font-semibold my-6 text-center"> 
        Contact Axe and Ledger&#8482; today to solve your get help sending someone home without hurting any feelings.
      </p>}
        </>
      )}
      {!loggedIn && (
        <div>
          <p className="text-xl text-center my-2">
            {event.isFull
              ? "Sign up to try to join this party anyway"
              : "Sign up to join this party"}
          </p>
          <AuthForm />
        </div>
      )}
      <Button
        className="bg-slate-600 my-2"
        onClick={() => {
          void navigator.clipboard.writeText(window.location.toString());
        }}
      >
        Copy party link to share
      </Button>
      {loggedIn && !event.isFull && !event.viewerIsMember && (
        <Button className="text-center my-2" onClick={handleJoinParty}>
          Join party
        </Button>
      )}
      {loggedIn && event.isFull && !event.viewerIsMember && (
        <Button className="text-center my-2">Try to join party</Button>
      )}
      <div className="flex flex-col gap-2">
        {event.members.map((member) => (
          <Adventurer user={member} key={member?._id} />
        ))}
      </div>
      <div className="my-10" />
    </div>
  );
}
