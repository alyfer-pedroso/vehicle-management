import { useCallback, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";

import { Type } from "@/models/api";

export function useType() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentType = searchParams.get("type") ?? "";

  const changeType = useCallback(
    (type: Type) => {
      if (type !== currentType) {
        setSearchParams((params) => {
          params.set("type", type);
          return params;
        });
      }
    },
    [currentType, setSearchParams]
  );

  const typeList = useMemo(() => {
    const trackedChecked = currentType === Type.TRACKED;
    const othersChecked = currentType === Type.OHTERS;

    return [
      { id: Type.TRACKED, checked: trackedChecked, label: "Rastreados", onChange: () => changeType(Type.TRACKED) },
      { id: Type.OHTERS, checked: othersChecked, label: "Outros", onChange: () => changeType(Type.OHTERS) },
    ];
  }, [changeType, currentType]);

  useEffect(() => {
    if (!currentType) changeType(Type.TRACKED);
  }, [changeType, currentType]);

  return { currentType, changeType, typeList };
}
