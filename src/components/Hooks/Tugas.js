import { data } from "autoprefixer";
import axios from "axios";

import * as React from "react";
import { getCookie } from "../Helper/cookies";

const API_ROUTE = process.env.NEXT_PUBLIC_API_ROUTE;

export const POSTINGAN_TUGAS = API_ROUTE + "api/postingan/";
// export const LIST_POSTINGAN = API_ROUTE + "api/postingan/"

const getAllTugas= async (url, token) => {
  
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    
    const { data } = response;
    return data;
  };

const postTugas = async(url, formData, token) => {
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

const getTugas = async (url, token) => {
  
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    
    const { data } = response;
    console.log(data)
    return data;
};

const updateTugas = async(url, formData, token) => {
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

const deleteTugas = async (url, token) => {
  try {
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    }
    throw new Error('Failed to delete the tugas');
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export {postTugas, getAllTugas, getTugas, updateTugas, deleteTugas}