import { cn } from "@/lib/utils";
import type { FC } from "react";

interface props extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  labelText?: string;
}

export const RadioInput: FC<props> = ({ labelText, ...attributes }) => {
  return (
    <label htmlFor={attributes?.id} className=" flex items-center gap-4 text-white ![font-family:'Inter'] text-sm cursor-pointer">
      <div className="relative size-5">
        <input
          type="radio"
          {...attributes}
          className={cn("relative peer w-full h-full appearance-none rounded-full border-2 border-blue-40", attributes?.className)}
        />

        <span
          className="
            absolute
            bg-blue-40
            size-3
            rounded-full
            opacity-0
            peer-checked:opacity-100
            duration-200
            top-1/2
            left-1/2
            -translate-x-1/2
            -translate-y-1/2
        "
        ></span>
      </div>

      {labelText && labelText}
    </label>
  );
};
