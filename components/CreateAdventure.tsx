import { useConvex, useMutation } from "convex/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { api } from "@/convex/_generated/api";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useMutationWithAuth } from "@convex-dev/convex-lucia-auth/react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  title: z.string().min(2).max(100),
  description: z.optional(z.string()),
});

export function CreateAdventure() {
  const [expanded, setExpanded] = useState(false);

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "A short walk in the woods",
      description: "",
    },
  });

  const createAdventure = useMutationWithAuth(api.party.createAdventure);
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const eventId = await createAdventure(values);
    setExpanded(false);
    router.push(`/e/${eventId}`);
  };

  return (
    <>
      {!expanded && (
        <Button onClick={() => setExpanded(!expanded)}>
          Start a new adventure party
        </Button>
      )}
      {expanded && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="A Short Walk in the Woods" {...field} />
                  </FormControl>
                  <FormDescription>
                    The adventure for which you{"'"}d like to gather a party.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Let's go for a little walk, there should be room for four of us on the little trail."
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Goals, where and when to meet, and how to get what we{"'"}
                    re after.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      )}
    </>
  );
}
