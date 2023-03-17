import { data } from "autoprefixer";
import axios from "axios";

import * as React from "react";
import { getCookie } from "../Helper/cookies";


const API_ROUTE = process.env.NEXT_PUBLIC_API_ROUTE;

export const KOMPONEN = API_ROUTE + "api/matpel/";

const getListKomponen = async (url, token) => {
  
  const response = await axios.get(`${url}/komponen`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  
  const { data } = response;
 
  return data;
};

const addNewKomponen = async(url, formData, token) => {
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

const updateKomponen = async(url, formData, token) => {
    const response = await fetch(url, {
        method: "PUT",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      })
      return response;
}
const getKomponen = async (url, token) => {
  
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    
    const { data } = response;
    return data;
  };


export {getListKomponen, addNewKomponen, updateKomponen, getKomponen}