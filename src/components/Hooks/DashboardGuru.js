import dashboard from "@/pages/dashboard";
import axios from "axios";
const API_ROUTE = process.env.NEXT_PUBLIC_API_ROUTE;
export const DASHBOARD = API_ROUTE + "api/dashboard/guru/";

const getListDataHisto = async (id, token) => {
    const APIS = `${DASHBOARD}distribusi-nilai-angkatan/${id}`
    console.log(APIS)
    const response = await axios.get(APIS,{
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    
    const { data } = response;
    return data;
  };

  const getAverageScorePerAngkatan = async (token) => {
  
    const response = await axios.get(`${DASHBOARD}average-score-per-angkatan`,{
      headers:{
        Authorization: `Bearer ${token}`
      }
    });
    
    const { data } = response;
    return data;
  };
  
  const getAverageScorePerMatpel = async (username, token) => {
  
    const response = await axios.get(`${DASHBOARD}average-nilai-matpel/${username}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    
    const { data } = response;
    return data;
  };

  const getRank = async (angkatan, page, token) => {
  
    const response = await axios.get(`${DASHBOARD}rankingSiswa/${angkatan}/${page}/5`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    
    
    const { data } = response;
    return data;
  };
export {getListDataHisto, getAverageScorePerAngkatan, getAverageScorePerMatpel, getRank}