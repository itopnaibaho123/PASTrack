import { data } from "autoprefixer";
import axios from "axios";

import * as React from "react";
import { getCookie } from "../Helper/cookies";


const API_ROUTE = process.env.NEXT_PUBLIC_API_ROUTE;

export const KELAS = API_ROUTE + "api/kelas/";
export const LIST_MATPEL_KELAS = API_ROUTE + "api/kelas/allMatpel";
export const ADD_MATPEL_TO_KELASS = KELAS + "addMatpel/";
export const LIST_SEMESTER_KELAS = API_ROUTE + "api/kelas/allSemester";

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

const postMatpelKelas = async (url, formData, token) => {
  const response = await fetch(`${url}`, {
    method: "PUT",
    body: JSON.stringify(formData),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
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

const getAllListMatpel = async (url, token) => {
  const response = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const { data } = response;
  return data;
};

const getAllListSemester = async (url, token) => {
  const response = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const { data } = response;
  return data;
};

export {postKelas, postMatpelKelas, getAllKelas, getKelas, getAllListMatpel, getAllListSemester}