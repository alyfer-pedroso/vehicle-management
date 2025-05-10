import { z } from "zod";
import { Type } from "@/models/api";

export const formSchema = z.object({
  type: z.nativeEnum(Type),
  filter: z.string().optional(),
});
