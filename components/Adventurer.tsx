import { Doc, Id } from "@/convex/_generated/dataModel";
import { type getCurrentUser } from "@/convex/myFunctions";
import { Card } from "./ui/card";
import { ClassIcon } from "./ClassIcon";
import { classTailwindColor } from "@/lib/dnd";


export function Adventurer({ user }: { user: Doc<"users"> }) {
  const colorClass = `bg-${classTailwindColor(user.class)}`;
  console.log(colorClass);
  return (
    <Card className={`p-6 ${colorClass}`}>
      <div className="flex items-center gap-6">
        <div className="w-[100px]">
          <ClassIcon dndClass={user.class}/>
        </div>
        <div className="flex flex-col gap-2 min-w-[40%]">
          <div className="font-semibold">{user.email}</div>
          <div className="whitespace-nowrap">
            Level {user.level} {user.class}
          </div>
        </div>
        <div className="flex flex-row">I want to save the earth one tree at time! Pretend this is a bit longer</div>
      </div>
    </Card>
  );
}
