import type { z } from "zod";
import type { formSchema } from "@/constants/filter";

export type FormDataSchema = z.infer<typeof formSchema>;
