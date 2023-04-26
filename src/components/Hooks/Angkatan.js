import axios from "axios";
const API_ROUTE = process.env.NEXT_PUBLIC_API_ROUTE;

export const ANGKATAN = API_ROUTE + "api/angkatan/";

const getListAngkatan = async () => {
  
    const response = await axios.get(ANGKATAN);
    
    const { data } = response;
    return data;
  };


export {getListAngkatan}