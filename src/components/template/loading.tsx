import type { FC } from "react";
import { Loader } from "lucide-react";

import { cn } from "@/lib/utils";

interface props {
  className?: string;
}

export const Loading: FC<props> = ({ ...props }) => {
  return (
    <div className={cn("flex justify-center items-center", props?.className)}>
      <Loader className="size-12 animate-spin" color="white" />
    </div>
  );
};
