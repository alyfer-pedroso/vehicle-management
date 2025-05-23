import { useCallback, useLayoutEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { formSchema, isValidType } from "@/constants/filter";
import type { FormDataSchema } from "@/models/filter";
import { Type } from "@/models/api";

export function useFilterForm() {
  const [searchParams, setSearchParams] = useSearchParams();

  const typeParam = searchParams.get("type") || "";
  const filterParam = searchParams.get("filter") || "";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataSchema>({
    resolver: zodResolver(formSchema),
    values: {
      type: isValidType(typeParam) ? (typeParam as Type) : Type.TRACKED,
      filter: filterParam,
    },
  });

  function handleFilter(data: FormDataSchema) {
    setSearchParams((params) => {
      params.delete("filter");
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

  const resetFilter = useCallback(() => {
    const searchParams = new URLSearchParams();
    searchParams.set("type", Type.TRACKED);
    setSearchParams(searchParams);
  }, [setSearchParams]);

  useLayoutEffect(() => {
    if (isValidType(typeParam)) return;
    setTypeParamToDefault();
  }, [typeParam, setTypeParamToDefault]);

  return {
    register,
    handleSubmit: handleSubmit(handleFilter, handleErrors),
    typeParam,
    filterParam,
    resetFilter,
  };
}
