"use client";
import { Adventurer } from "@/components/Adventurer";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { useQueryWithAuth } from "@convex-dev/convex-lucia-auth/react";
import { Syne } from "next/font/google";
import { AuthForm } from "../../auth";

const syne = Syne({ subsets: ["latin"], weight: ["700"], variable: "--syne" });

export default function Party({ params: { id } }: { params: { id: string } }) {
  const event = useQueryWithAuth(api.myFunctions.getEvent, { id });



  if (!event) return <div>loading</div>;

  const {loggedIn} = event;

  return (
    <div>
      <h1
        className={`text-5xl font-extrabold my-8 text-center ${syne.className}`}
      >
        {event.title}
      </h1>
      <p className="text-l font-semibold my-8 text-center">
        {event.description}
      </p>
      {!loggedIn && <div>
        <p className="text-xl text-center my-2">Sign up to join this party</p>
        <AuthForm />
        </div>}
      <Button onClick={() => {
        void navigator.clipboard.writeText(window.location.toString());
      }}>Copy party link to share</Button>
      {loggedIn && !event.isFull && <Button className="text-center">Join party</Button>}
      {loggedIn && event.isFull && <Button className="text-center">Try to join party</Button>}
      {!loggedIn}
      {event.members.map((member) => (
        <Adventurer user={member} key={member?._id} />
      ))}
    </div>
  );
}
