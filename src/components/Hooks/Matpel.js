import { data } from "autoprefixer";
import axios from "axios";

import * as React from "react";
import { getCookie } from "../Helper/cookies";


const API_ROUTE = process.env.NEXT_PUBLIC_API_ROUTE;

export const MATPEL_GURU = API_ROUTE + "api/matpel/guru/";
export const MATPEL_LIST_SISWA = API_ROUTE + "api/matpel/"

const getAllMatpel = async (url, token) => {
  
  const response = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  
  const { data } = response;
  return data;
};

const postMatpel = async(url, formData, token) => {
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

const getListSiswa = async(url, token) => {
  const response = await axios.get(`${url}/siswa`,{
    headers:{
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  })
  const { data } = response
  return data;
}

export {getAllMatpel, postMatpel, getListSiswa}