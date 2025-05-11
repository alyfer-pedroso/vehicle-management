import type { AxiosResponse } from "axios";
import { toast } from "sonner";

import { api, getError } from "@/constants/api";
import type { Root } from "@/models/vehicles";
import { isValidType } from "@/constants/filter";

interface Params {
  page: number;
  type: string;
  pageParam?: number;
  perPage?: number;
  filter?: string;
}

const getVehicles = async ({ pageParam = 1, ...params }: Params) => {
  try {
    if (!isValidType(params.type)) {
      return Promise.reject(new Error());
    }

    const { data }: AxiosResponse<Root> = await api.get("/vehicles/list-with-paginate", {
      params: { pageParam, ...params },
    });
    return data;
  } catch (err) {
    if (getError(err)) {
      toast.error(getError(err, "Não foi possível carregar os veículos, tentando novamente!"), {
        dismissible: true,
        closeButton: true,
      });
    }

    return Promise.reject(err);
  }
};

export { getVehicles };
