"use client";

import { CreateAdventure } from "@/components/CreateAdventure";
import { Code } from "@/components/typography/code";
import { Link } from "@/components/typography/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Form, FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { api } from "@/convex/_generated/api";
import {
  useMutationWithAuth,
  useQueryWithAuth,
  useSessionId,
  useSignOut,
  useSignUpSignIn,
} from "@convex-dev/convex-lucia-auth/react";
import { AuthLoading, useConvex, useMutation } from "convex/react";
import { Syne } from "next/font/google";
import { useState } from "react";
import { useForm } from "react-hook-form";

const syne = Syne({ subsets: ["latin"], weight: ["700"], variable: "--syne" });

export default function Home() {
  const sessionId = useSessionId();

  return (
    <main className="container max-w-2xl flex flex-col gap-8">
      <h1 className={`text-4xl font-extrabold my-8 text-center ${syne.className}`}>
        The best way to plan an adventuring party
      </h1>
      {sessionId ? <SignedIn /> : <AuthForm />}
    </main>
  );
}
// pass down the session Id more. If it's there render extra content.


function SignedIn() {
  const viewer = useQueryWithAuth(api.myFunctions.getCurrentUser, {});
  const convex = useConvex();
  const [createAdventureExpanded, setCreateAdventureExpanded] = useState(false);

  const form = useForm();

  // TODO server-side render instead
  if (!viewer) return <Progress/>;

  return (
    <>
      <p className="flex gap-4 items-center">
        <Card>
        Welcome {viewer.email}! (level {viewer.level} {viewer.class})
        <SignOutButton />
        </Card>
      </p>
      <p>
        Create a new party for an adventure
      </p>
      <p>
        <Button onClick={() => setCreateAdventureExpanded(true)}/>
      </p>
      <p>
        <CreateAdventure/>
      </p>
      <p>
        Edit <Code>convex/myFunctions.ts</Code> to change your backend
      </p>
      <p>
        Edit <Code>app/(fullstack)/page.tsx</Code> to change your frontend
      </p>
      <p>
        Check out{" "}
        <Link target="_blank" href="https://docs.convex.dev/home">
          Convex docs
        </Link>
      </p>
      <p>
        To build a full page layout copy one of the included{" "}
        <Link target="_blank" href="/layouts">
          layouts
        </Link>
      </p>
    </>
  );
}

function SignOutButton() {
  const signOut = useSignOut();
  return <Button onClick={signOut}>Sign out</Button>;
}

function AuthForm() {
  const { flow, toggleFlow, error, onSubmit } = useSignUpSignIn({
    signIn: useMutationWithAuth(api.auth.signIn),
    signUp: useMutationWithAuth(api.auth.signUp),
  });
  console.log(error);

  return (
    <div className="flex flex-col items-center px-20 gap-4">
      <form
        className="flex flex-col w-[18rem]"
        onSubmit={(event) => {
          void onSubmit(event);
        }}
      >
        <label htmlFor="username">Email</label>
        <Input name="email" id="email" className="mb-4" />
        <label htmlFor="password">Password</label>
        <Input
          type="password"
          name="password"
          id="password"
          className="mb-4 "
        />
        <Button type="submit">
          {flow === "signIn" ? "Sign in" : "Sign up"}
        </Button>
      </form>
      <Button variant="link" onClick={toggleFlow}>
        {flow === "signIn"
          ? "Don't have an account? Sign up"
          : "Already have an account? Sign in"}
      </Button>
      <div className="font-medium text-sm text-red-500">
        {error !== undefined
          ? flow === "signIn"
            ? "Could not sign in, did you mean to sign up?"
            : "Could not sign up, did you mean to sign in?"
          : null}
      </div>
    </div>
  );
}
