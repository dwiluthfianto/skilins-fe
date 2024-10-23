import { AxiosError } from "axios";
import axios from "./axios";

export const fetcher = async (url: string) => {
  try {
    const response = await axios.get(url);
    return response.data; // Mengembalikan data dari response
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      const err = new Error("An error occurred while fetching the data.");
      err.status = error.response.status;
      throw err;
    } else {
      throw new Error("Network error");
    }
  }
};
