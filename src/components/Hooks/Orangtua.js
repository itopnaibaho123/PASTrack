
import axios from "axios";
const API_ROUTE = process.env.NEXT_PUBLIC_API_ROUTE;

export const ORANGTUA = API_ROUTE + "api/orangtua/";

const getUsernameMurid = async (usernameOrtu, token) => {
  
    const response = await axios.get(ORANGTUA + usernameOrtu, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    
    const { data } = response;
    return data;
  };


export {getUsernameMurid}