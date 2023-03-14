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
      <div className="">
        <p>Index</p>
        <Logout />
        <Profile/>
        <Button onClick={setAllProfile}>See All Profile</Button>
        <Button onClick={gantiPassword}>Change Password</Button>
        <Button onClick={registerGuru}>Register Guru</Button>
        <Button onClick={registerSiswa}>Register Siswa</Button>
      </div>
    );
  }
  if (props.role ==="SISWA"){
    return (
      <div className="">
        <p>Index</p>
        <Logout />
        <Profile/>
        <Button onClick={gantiPassword}>Change Password</Button>
      </div>
    );
  }
  if(props.role==="GURU"){
    return (
      <div className="">
        <p>Index</p>
        <Logout />
        <Profile/>
        <Button onClick={gantiPassword}>Change Password</Button>
      </div>
    );
  }
  if(props.role==="ORANGTUA"){
    return (
      <div className="">
        <p>Index</p>
        <Logout />
        <Profile/>
        <Button onClick={gantiPassword}>Change Password</Button>
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
