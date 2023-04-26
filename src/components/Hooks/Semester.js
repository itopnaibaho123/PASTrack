import axios from "axios";
const API_ROUTE = process.env.NEXT_PUBLIC_API_ROUTE;

export const SEMESTER = API_ROUTE + "api/semester/";

const getListSemester = async () => {
  
    const response = await axios.get(SEMESTER);
    
    const { data } = response;
    return data;
  };


export {getListSemester}