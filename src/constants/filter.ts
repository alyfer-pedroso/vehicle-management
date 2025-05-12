import { z } from "zod";
import { Type } from "@/models/api";

export const formSchema = z.object({
  type: z.nativeEnum(Type),
  filter: z.string().optional(),
});

export const isValidType = (type: string) => type.toUpperCase() in Type;
