/* eslint-disable @typescript-eslint/no-explicit-any */
import Cookies from 'js-cookie';
import axios from '@/utils/axios';
import jwt from 'jsonwebtoken';
export const login = async (email: string, password: string) => {
  const response = await axios.post('/auth/login', { email, password });

  const { access_token } = response.data.data;
  if (response.status === 200) {
    const decodedToken = jwt.decode(access_token) as jwt.JwtPayload;

    if (decodedToken && decodedToken.role) {
      const userRole = decodedToken.role;

      Cookies.set('user_role', userRole, {
        expires: 7,
        sameSite: 'Lax',
      });

      Cookies.set('access_token', access_token, {
        expires: 15 / 1440,
        sameSite: 'Lax',
      });
    } else {
      console.error('Failed to decode JWT or missing role.');
    }
  }

  return response.data;
};

export const register = async (data: {
  email: string;
  password: string;
  fullName: string;
}) => {
  const { email, password, fullName } = data;
  const response = await axios.post('/auth/register', {
    email,
    password,
    full_name: fullName,
  });

  return response.data;
};

export const registerStudent = async (data: {
  email: string;
  password: string;
  fullName: string;
  nis: number;
  name: string;
  major: string;
  birthplace: string;
  birthdate: Date;
  sex: string;
}) => {
  const {
    email,
    password,
    fullName,
    nis,
    name,
    major,
    birthplace,
    birthdate,
    sex,
  } = data;
  const response = await axios.post('/auth/register-student', {
    email,
    password,
    full_name: fullName,
    nis: String(nis),
    name,
    major,
    birthplace,
    birthdate,
    sex,
  });

  return response.data;
};

export const resetPassword = async (email: string) => {
  const response = await axios.post('/auth/forgot-password', { email });

  return response.data;
};

export const logout = async () => {
  await axios.post('/auth/logout');
  Cookies.remove('access_token');
  Cookies.remove('user_role');
};
