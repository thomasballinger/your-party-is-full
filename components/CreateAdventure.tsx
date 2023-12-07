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

const formSchema = z.object({
  title: z.string().min(2).max(100),
  description: z.optional(z.string().min(10).max(1000)),
});

export function CreateAdventure() {
  const [createAdventureExpanded, setCreateAdventureExpanded] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "A short walk in the woods",
      description: undefined,
    },
  });

  const createAdventure = useMutationWithAuth(api.myFunctions.createAdventure);
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    await createAdventure(values);
  };

  return (
    <>
      <Button onClick={() => setCreateAdventureExpanded(!createAdventureExpanded)}>New Adventure</Button>
      {createAdventureExpanded && (
        <p>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="A Short Walk in the Woods"
                        {...field}
                      />
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
                      Goals, where and when to meet, and how to get what we{"'"}re after.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </p>
      )}
    </>
  );
}
