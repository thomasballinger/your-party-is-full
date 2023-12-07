import { api } from "@/convex/_generated/api"
import { useQueryWithAuth } from "@convex-dev/convex-lucia-auth/react"
import { useRouter } from "next/router"

export function Party(){

    const router = useRouter();

   // TODO server-side rendering instead
   const event = useQueryWithAuth(api.myFunctions.getEvent, { id: router.query.id as string })
   if (!event) return <div>loading</div>;
 
    return <div>
        <h1>{event.title}</h1>
        This is a page!
    </div>
}