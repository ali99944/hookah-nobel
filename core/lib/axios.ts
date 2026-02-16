'use client'

import axios from "axios";
import AppConstants from "../constants/app-constants";
import { getCartToken } from "./cart-token";

export const useAxios = (
  contentType?: "application/json" | "multipart/form-data"
) => {
  const token = typeof window !== "undefined" ? localStorage.getItem("access_token") : null;

  return axios.create({
    baseURL: AppConstants.api_url,
    headers: {
      ...(contentType ? { "Content-Type": contentType } : {}),
      accept: "application/json",
      lang: "en",
      ...(token ? { authorization: `Bearer ${token}` } : {}),
      "X-Cart-Token": getCartToken(),
    },
  });
};
