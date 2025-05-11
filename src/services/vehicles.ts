import type { AxiosResponse } from "axios";
import { toast } from "sonner";

import { api, getError } from "@/constants/api";
import type { Root } from "@/models/vehicles";

interface Params {
  page: number;
  type: string;
  pageParam?: number;
  perPage?: number;
  filter?: string;
}

const getVehicles = async ({ pageParam = 1, ...params }: Params) => {
  try {
    const { data }: AxiosResponse<Root> = await api.get("/vehicles/list-with-paginate", {
      params: { pageParam, ...params },
    });
    return data;
  } catch (err) {
    toast.error(getError(err), { dismissible: true });
    return Promise.reject(err);
  }
};

export { getVehicles };
