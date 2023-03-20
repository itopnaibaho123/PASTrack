import { data } from "autoprefixer";
import axios from "axios";

import * as React from "react";
import { getCookie } from "../Helper/cookies";


const API_ROUTE = process.env.NEXT_PUBLIC_API_ROUTE;

export const KELAS = API_ROUTE + "api/kelas/";

const getAllKelas= async (url, token) => {
  
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    
    const { data } = response;
    return data;
  };

const postKelas = async(url, formData, token) => {
  const response = await fetch(`${url}`, {
    method: "POST",
    body: JSON.stringify(formData),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  })
  return response;
}

const postMatpelKelas = async (id, formData, token) => {
  try {
    const response = await axios.post(`${KELAS}addMatpel/${id}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

const getKelas = async (id, token) => {
  const response = await axios.get(`${KELAS}${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const { data } = response;
  return data;
};

export {postKelas, postMatpelKelas, getAllKelas, getKelas}