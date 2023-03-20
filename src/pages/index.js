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
  const gantiPassword = () => {
    router.push("/profile/ChangePassword")
  }
  const registerGuru = () => {
    router.push("/registrasi/Guru")
  }
  const registerSiswa = () => {
    router.push("/registrasi/Siswa")
  }

  if(props.role==="ADMIN"){

    return (
      <div className="ml-auto mr-auto px-56">
        <img width={1400} height={1400} src="assets/PASTrack.svg"></img>
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
