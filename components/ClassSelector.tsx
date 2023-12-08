"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { DndClass, classes as classValues } from "@/lib/dnd";
import {
  useMutationWithAuth,
  useQueryWithAuth,
} from "@convex-dev/convex-lucia-auth/react";
import { api } from "@/convex/_generated/api";

const classes = classValues.map((c) => ({ value: c.toLowerCase(), label: c }));

export function ClassSelector(props: { className?: string }) {
  const user = useQueryWithAuth(api.party.getCurrentUser, {});
  if (!user) return "";
  return <ClassSelectorInner {...props} />;
}

function ClassSelectorInner(props: { className?: string }) {
  const user = useQueryWithAuth(api.party.getCurrentUser, {});

  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(user?.class.toLowerCase() || "");

  const update = useMutationWithAuth(api.party.updateCurrentUser);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={`w-[110px] justify-between ${props.className || ""}`}
        >
          {value
            ? classes.find((c) => c.value === value)?.label
            : "Select class..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search class..." />
          <CommandEmpty>No class found</CommandEmpty>
          <CommandGroup>
            {classes.map((c) => (
              <CommandItem
                key={c.value}
                value={c.value}
                onSelect={(currentValue) => {
                  setValue(currentValue);
                  void update({
                    class: (currentValue.slice(0, 1).toUpperCase() +
                      currentValue.slice(1)) as DndClass,
                  });
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === c.value ? "opacity-100" : "opacity-0"
                  )}
                />
                {c.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
