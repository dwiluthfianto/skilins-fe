import { AxiosError } from "axios";
import axios from "./axios";

class FetchError extends Error {
  status?: number;

  constructor(message: string, status?: number) {
    super(message);
    this.status = status;
    this.name = "FetchError";
  }
}

export const fetcher = async (url: string) => {
  try {
    const response = await axios.get(url);
    return response.data; // Mengembalikan data dari response
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      throw new FetchError(
        "An error occurred while fetching the data.",
        error.response.status
      );
    } else {
      throw new FetchError("Network error");
    }
  }
};
