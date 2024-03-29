import dashboard from "@/pages/dashboard";
import axios from "axios";
const API_ROUTE = process.env.NEXT_PUBLIC_API_ROUTE;
export const DASHBOARD = API_ROUTE + "api/dashboard/siswa/";
export const DASHBOARD_SISWA = API_ROUTE + "api/dashboard/siswa/nilai-per-semester/";

const getAllRank = async (username, token) => {
    const APIS = `${DASHBOARD}all-ranking/${username}`
   
    const response = await axios.get(APIS,{
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    
    const { data } = response;
    return data;
  };


  const getPencapaianNilai = async (username, token) => {
    const APIS = `${DASHBOARD_SISWA}${username}`
    const response = await axios.get(APIS,{
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    
    const { data } = response;
    return data;
  };

  const getPeminatanMurid = async (username, token) => {
    const APIS = `${DASHBOARD}peminatan/${username}`
   
    const response = await axios.get(APIS,{
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    
    const { data } = response;
    return data;
  };
  const getListPerkembanganNilai = async (username,idPeminatan, token) => {
    const APIS = `${DASHBOARD}${username}/perkembangan/${idPeminatan}`
    console.log(APIS)
    console.log(token)
    const response = await axios.get(APIS,{
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    
    const { data } = response;
    return data;
  };

export {getAllRank, getPencapaianNilai, getPeminatanMurid, getListPerkembanganNilai}