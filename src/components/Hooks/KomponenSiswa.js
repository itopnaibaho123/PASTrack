import axios from "axios";
const API_ROUTE = process.env.NEXT_PUBLIC_API_ROUTE;

export const KOMPONENSISWA = API_ROUTE + "api/matpel/";


const KomponenSiswaAPI  = (idMatpel, kodeKomponen, username) => {
    return `${KOMPONENSISWA}${idMatpel}/komponen/${kodeKomponen}/siswa/${username}`
}

const getDetailKomponenSiswa = async (url, token) => {
  
  const response = await axios.get(`${url}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  
  const { data } = response;
 
  return data;
};

const updateKomponenSiswa = async(url, formData, token) => {
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
const getListKomponenSiswa = async (url, token) => {
  
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    
    const { data } = response;
    return data;
  };


export {getDetailKomponenSiswa, updateKomponenSiswa, getListKomponenSiswa, KomponenSiswaAPI}