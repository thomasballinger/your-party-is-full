"use client";
import { Profile } from "@/components/Profile";
import { useSessionId } from "@convex-dev/convex-lucia-auth/react";
import { SignOutButton } from "./auth";
import { ClassSelector } from "@/components/ClassSelector";

export function HeaderAuth() {
  const sessionId = useSessionId();
  if (sessionId) return (<div className="flex gap-2">
<ClassSelector/>
<Profile/>
<SignOutButton/>
    </div>);
  return '';
}