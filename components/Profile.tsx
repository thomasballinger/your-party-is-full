"use client";

import { api } from "@/convex/_generated/api";
import { useQueryWithAuth } from "@convex-dev/convex-lucia-auth/react";
import { ClassIcon } from "./ClassIcon";

export function Profile() {
  const user = useQueryWithAuth(api.myFunctions.getCurrentUser, {});
  if (!user) return "";
  return (
    <div className="flex items-center">
      {user.email}
      <div className="w-8">
        <ClassIcon dndClass={user.class} />
      </div>
    </div>
  );
}
