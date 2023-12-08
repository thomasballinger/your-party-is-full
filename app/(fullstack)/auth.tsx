"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { api } from "@/convex/_generated/api";
import {
  useMutationWithAuth,
  useSignOut,
  useSignUpSignIn,
} from "@convex-dev/convex-lucia-auth/react";
import { useEffect, useState } from "react";

export function SignOutButton() {
  const signOut = useSignOut();
  return <Button onClick={signOut}>Sign out</Button>;
}

export function AuthForm() {
  const { flow, toggleFlow, error, onSubmit } = useSignUpSignIn({
    signIn: useMutationWithAuth(api.auth.signIn),
    signUp: useMutationWithAuth(api.auth.signUp),
  });
  console.log(error);
  const [isFirstTime, setIsFirstTime] = useState(true);
  useEffect(() => {
    if (isFirstTime) {
      toggleFlow();
      setIsFirstTime(false);
    }

  }, [isFirstTime, toggleFlow]);

  return (
    <div className="flex flex-col items-center px-20 gap-4">
      <form
        className="flex flex-col w-[18rem]"
        onSubmit={(event) => {
          void onSubmit(event);
        }}
      >
        <label htmlFor="username">Name</label>
        <Input name="email" id="email" className="mb-4" placeholder="Jenevelle Hallowleaf" />
        <label htmlFor="password">Password</label>
        <Input
          type="password"
          name="password"
          id="password"
          className="mb-4"
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
