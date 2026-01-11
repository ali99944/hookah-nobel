'use client'


import axios from "axios";
import AppConstants from "../constants/app-constants";
import { getCartToken } from "./cart-token";
// import { useAppSelector } from "../redux/redux-hooks";

export const useAxios = (
  contentType?: "application/json" | "multipart/form-data"
) => {
  // const { token } = useAppSelector(state => state.auth)
  const token = "1|FVULu2OwAlPcOsI6LugYlyKvW4tNoOD0fuKIXfbZb1c4d0f4"

  return axios.create({
    baseURL: AppConstants.api_url,
    headers: {
      "Content-Type": contentType as string,
      accept: "application/json",
      lang: "en",
      authorization: `Bearer ${token}`,
      "Access-Control-Allow-Origin": "*",
      "X-Cart-Token": getCartToken()
    },
  });
};
