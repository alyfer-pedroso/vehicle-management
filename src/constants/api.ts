import axios from "axios";

const api = axios.create({
  baseURL: process.env.VITE_APIBASEURL,
  headers: { Authorization: `Bearer ${process.env.VITE_APITOKEN}` },
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
