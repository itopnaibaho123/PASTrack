import dashboard from "@/pages/dashboard";
import axios from "axios";
const API_ROUTE = process.env.NEXT_PUBLIC_API_ROUTE;
export const DASHBOARD = API_ROUTE + "api/dashboard/siswa/";

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

export {getAllRank}