import axios from "axios";
const API_ROUTE = process.env.NEXT_PUBLIC_API_ROUTE;

export const PEMINATAN = API_ROUTE + "api/matpel/peminatan";

const getListPeminatan = async (url, token) => {
  
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    
    const { data } = response;
    return data;
  };


export {getListPeminatan}