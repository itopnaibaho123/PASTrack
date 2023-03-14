import React, { useState, useEffect } from "react";
import { B } from "@/components/Typography";
import { getCookie } from "@/components/Helper/cookies";
import { useRouter } from "next/router";
import axios from "axios";
import checkRole from "@/components/Helper/CheckRole";
import Button from "@/components/Button";
export default function profile(props) {
  const router = useRouter();
  // const { id } = router.query;
  const [profile, setProfile] = useState({});

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await axios.get(
          `${process.env.NEXT_PUBLIC_API_ROUTE}api/user/${props.id}`,
          {
            headers: {
              Authorization: `Bearer ${getCookie("token")}`,
            },
          }
        );

        setProfile(data.data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, []);
  console.log(profile)
  return (
    <div className="">
      <Button onClick={() => {
        router.back()
      }}>Go back</Button>
      <B>{profile.id}</B>
      <B>{profile.nama}</B>
      <B>{profile.username}</B>
      <div className="flex ">
        <B>{profile.password}</B>
        <Button>Ganti Password</Button>
      </div>
      <B>{props.role}</B>
      <Button>Edit Profile</Button>
    </div>
  );
}
export async function getServerSideProps(context) {
  // context.req.query
  const authentications = checkRole(context);
  if (!authentications.tokenTrue) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  const { role, username } = context.req.cookies;
  return {
    props: {
      id: username,
      role: role,
    },
  };
}
