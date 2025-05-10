import { useCallback, useLayoutEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { formSchema } from "@/constants/filter";
import type { FormDataSchema } from "@/models/filter";
import { Type } from "@/models/api";

export function useFilterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: { type: Type.TRACKED },
  });

  const [searchParams, setSearchParams] = useSearchParams();

  const typeParam = searchParams.get("type") || "";
  const filterParam = searchParams.get("filter") || "";

  function handleFilter(data: FormDataSchema) {
    setSearchParams((params) => {
      Object.keys(data).forEach((key) => {
        const newKey = (key as keyof FormDataSchema) ?? "";

        if (data[newKey]) {
          params.set(newKey, data[newKey]);
        }
      });
      return params;
    });
  }

  function handleErrors() {
    if (Object.keys(errors).length) {
      Object.keys(errors).forEach((key) => {
        if (errors[key as keyof FormDataSchema]?.message) {
          toast.error(errors[key as keyof FormDataSchema]?.message);
        }
      });
    }
  }

  const setTypeParamToDefault = useCallback(() => {
    searchParams.set("type", Type.TRACKED);
    setSearchParams(searchParams);
  }, [searchParams, setSearchParams]);

  useLayoutEffect(() => {
    if (typeParam.toUpperCase() in Type) return;
    setTypeParamToDefault();
  }, [typeParam, setTypeParamToDefault]);

  return {
    register,
    handleSubmit: handleSubmit(handleFilter, handleErrors),
    typeParam,
    filterParam,
  };
}
