import axios from "axios";
const API_ROUTE = process.env.NEXT_PUBLIC_API_ROUTE;

export const GURU_KELAS = API_ROUTE + "api/kelas/allGuru";
export const KLS_GURU_WALAS = API_ROUTE + "api/kelas/guru/"
export const CURRENT_KLS_WALAS = API_ROUTE + "api/kelas/guru/currentClass/"

const getListGuru = async (url, token) => {
  
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    
    const { data } = response;
    return data;
  };


  const getAllKelasByWalas = async (url, token) => {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  
    const { data } = response;
    return data;
  };

  const getCurrentKelasWalas = async (url, token) => {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  
    const { data } = response;
    return data;
  };

export { getListGuru, getAllKelasByWalas, getCurrentKelasWalas }