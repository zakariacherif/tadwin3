'use client'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { useOthers, useSelf } from "@liveblocks/react/suspense";

const Avatars = () => {
  const others = useOthers();
  const self = useSelf();
  const all = [self, ...others];

  return (
    <div className="flex flex-row gap-2 items-center justify-center">
      <p className="text-gray-500 font-alex text-sm">
        المستخدمون الحاضرون الآن!!!
      </p>
      <div className="relative h-20 w-20">
        {all.map((other, i) => (
          <TooltipProvider key={other?.id + i}>
            <Tooltip>
              <TooltipTrigger>
                <Avatar
                  className="border-2 absolute right-[calc(15px_*_var(--index))]  transform transition-transform duration-200 hover:z-50 hover:scale-110 "
                  style={{ "--index": i }}
                >
                  <AvatarImage src={other?.info.avatar} />
                  <AvatarFallback>{other?.info.name}</AvatarFallback>
                </Avatar>
              </TooltipTrigger>
              <TooltipContent>
                <p className="font-alex">
                  {self?.id === other?.id
                    ? "أنت"
                    : other?.info.name || other?.info.email}
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </div>
    </div>
  );
};

export default Avatars;
