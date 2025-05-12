import type { FC, HTMLAttributes } from "react";

import { useScroll } from "@/hooks";
import { cn } from "@/lib/utils";

interface props extends HTMLAttributes<HTMLDivElement> {
  loading: boolean;
  onScrollEnd: VoidFunction | (() => Promise<void>);
}

export const InfiniteScroll: FC<props> = ({ loading, onScrollEnd, children, ...attributes }) => {
  const { isInBottom } = useScroll();

  const onScroll = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    if (loading || !isInBottom(e)) {
      return;
    }
    onScrollEnd();
  };

  return (
    <div {...attributes} onScroll={onScroll} className={cn("relative", attributes?.className)}>
      {children}
    </div>
  );
};
