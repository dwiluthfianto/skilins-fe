/* eslint-disable @typescript-eslint/no-explicit-any */
import Cookies from "js-cookie";
import axios from "@/utils/axios";
import jwt from "jsonwebtoken";
export const login = async (email: string, password: string) => {
  const response = await axios.post("/auth/login", { email, password });

  const { accessToken } = response.data;
  if (response.status === 200) {
    const decodedToken = jwt.decode(accessToken) as jwt.JwtPayload;

    if (decodedToken && decodedToken.role) {
      const userRole = decodedToken.role;
      console.log("Decoded userRole:", userRole);

      Cookies.set("userRole", userRole, {
        expires: 7,
      });

      Cookies.set("accessToken", accessToken, {
        expires: 15 / 1440,
      });
    } else {
      console.error("Failed to decode JWT or missing role.");
    }
  }

  return response.data;
};

export const register = async (
  data: { email: string; password: string; fullName: string },
  role: string
) => {
  const { email, password, fullName } = data;
  const response = await axios.post("/auth/register", {
    email,
    password,
    full_name: fullName,
    role,
  });

  return response.data;
};

export const resetPassword = async (email: string) => {
  const response = await axios.post("/auth/forgot-password", { email });

  return response.data;
};

export const logout = async () => {
  await axios.post("/auth/logout");
  Cookies.remove("accessToken");
  Cookies.remove("userRole");
};
