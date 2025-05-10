import { cn } from "@/lib/utils";
import type { FC } from "react";

interface props {
  children?: React.ReactNode;
  className?: string;
}

export const Container: FC<props> = ({ children, ...props }) => {
  return <section className={cn("bg-blue-15 border border-blue-30 rounded-2xl", props?.className)}>{children}</section>;
};
