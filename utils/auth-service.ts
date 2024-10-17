import Cookies from "js-cookie";
import axios from "@/utils/axios";
import jwt from "jsonwebtoken";

export const login = async (email: string, password: string) => {
  const response = await axios.post("/auth/login", { email, password });
  const { accessToken } = response.data;

  // Decode the JWT to get user role
  const decodedToken = jwt.decode(accessToken) as jwt.JwtPayload;
  const userRole = decodedToken.role; // Assuming 'role' is the key in your JWT

  // Store tokens and role in cookies
  Cookies.set("accessToken", accessToken);
  Cookies.set("userRole", userRole); // Store user role

  return response.data;
};

export const logout = async () => {
  await axios.post("/auth/logout");
  Cookies.remove("accessToken");
  Cookies.remove("userRole");
};
