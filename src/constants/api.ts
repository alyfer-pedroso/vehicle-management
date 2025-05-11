import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_APIBASEURL,
  headers: { Authorization: `Bearer ${import.meta.env.VITE_APITOKEN}` },
});

const getError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.message ?? error.message;
  }
  return String(error);
};

export { api, getError };
