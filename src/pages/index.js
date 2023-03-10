import { useEffect, useState } from "react";
import Logout from "../components/logout";
import checkRole from "@/components/Helper/CheckRole";
// import { getCookie, useCookie } from "@/components/Helper/cookies";
import { getCookie } from "@/components/Helper/cookies";
import { useCookie } from "@/components/Hooks/useCookie";
import { useRouter } from "next/router";
import axios from "axios";
import Profile from '../components/Profile';

export default function index() {
  const router = useRouter();

  return (
    <div className="">
      <p>Index</p>
      <Logout />
      <Profile/>
    </div>
  );
}

export async function getServerSideProps(context) {
  // context.req.query

  checkRole(context)
  
  // if(!cookies.token){
  //   return {
  //     redirect: {
  //       destination: "/login",
  //       permanent: false,
  //     }
  //   }
  // }
  return {
    props: {},
  };
}
