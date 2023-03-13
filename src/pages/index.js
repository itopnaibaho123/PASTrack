import { useEffect, useState } from "react";
import Logout from "../components/logout";
import checkRole from "@/components/Helper/CheckRole";
// import { getCookie, useCookie } from "@/components/Helper/cookies";
import { getCookie } from "@/components/Helper/cookies";
import { useCookie } from "@/components/Hooks/useCookie";
import { useRouter } from "next/router";
import axios from "axios";
import Profile from '../components/Profile';
import Button from "@/components/Button";

export default function index(props) {
  const router = useRouter();
  
  const setAllProfile = () => {
    
    router.push("/profile/listuser");
  };

  if(props.role==="ADMIN"){

    return (
      <div className="">
        <p>Index</p>
        <Logout />
        <Profile/>
        <Button onClick={setAllProfile}>See All Profile</Button>
      </div>
    );
  }
  if (props.role ==="SISWA"){
    return (
      <div className="">
        <p>Index</p>
        <Logout />
        <Profile/>
      </div>
    );
  }
  if(props.role==="GURU"){
    return (
      <div className="">
        <p>Index</p>
        <Logout />
        <Profile/>
      </div>
    );
  }
  if(props.role==="ORANGTUA"){
    return (
      <div className="">
        <p>Index</p>
        <Logout />
        <Profile/>
      </div>
    );
  }
}

export async function getServerSideProps(context) {
  // context.req.query
  const authentications = checkRole(context)
  if(!authentications.tokenTrue) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      }
    }
  }
  const { role } = context.req.cookies;
  return {
    props: {
      role: role
    }
  }
}
