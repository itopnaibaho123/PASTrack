import axios from "axios";
const API_ROUTE = process.env.NEXT_PUBLIC_API_ROUTE;

export const GURU_KELAS = API_ROUTE + "api/kelas/allGuru";

const getListGuru = async (url, token) => {
  
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    
    const { data } = response;
    return data;
  };


export {getListGuru}