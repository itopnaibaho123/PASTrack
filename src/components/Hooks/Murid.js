import { data } from "autoprefixer";
import axios from "axios";

import * as React from "react";
import { getCookie } from "../Helper/cookies";

const API_ROUTE = process.env.NEXT_PUBLIC_API_ROUTE;

export const API_KELAS = API_ROUTE + "api/kelas/";
export const GET_ALL_SISWA = API_KELAS + "allSiswa";
export const ADD_SISWA_TO_KELAS = API_KELAS + "addMurid/";

const getAllSiswa = async (url, token) => {
  const response = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const { data } = response;
  return data;
};
const addSiswaToKelas = async (url, formData, token) => {
  const response = await fetch(url, {
    method: "PUT",
    body: JSON.stringify(formData),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};
const getSiswaByKelas = async (url, token) => {
  const response = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const { data } = response;
  return data;
};

const getKelas = async (url, token) => {
  const response = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const { data } = response;
  return data;
};

export { getAllSiswa, addSiswaToKelas, getSiswaByKelas, getKelas };
