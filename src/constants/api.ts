import axios from "axios";
import { API_BASE_URL, API_TOKEN } from "./env";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { Authorization: `Bearer ${API_TOKEN}` },
});

const getError = (error: unknown, internalServerErroMsg?: string) => {
  if (axios.isAxiosError(error)) {
    if (error.response?.status === 500 && internalServerErroMsg) {
      return internalServerErroMsg;
    }

    return error.response?.data?.message ?? error.message;
  }
  return String(error);
};

export { api, getError };
