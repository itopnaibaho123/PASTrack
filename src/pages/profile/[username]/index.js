import { useRouter } from "next/router";
import React, {useState, useEffect} from "react";
import checkRole from "@/components/Helper/CheckRole";
import Button from "@/components/Button";
import { B } from "@/components/Typography";
import axios from "axios";
import { getCookie } from "@/components/Helper/cookies";
export default function EditProfile(props) {
  const [profile, setProfile] = useState({});
  const [role, setRole] = useState("");
  const router = useRouter()
    
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
        setRole(data.data.role.role)
        
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, []);
  return (
    <>
      <div className="">
        <Button
          onClick={() => {
            router.back();
          }}
        >
          Go back
        </Button>
        <B>{profile.id}</B>
        <B>{profile.nama}</B>
        <B>{profile.username}</B>

        <B>{profile.password}</B>

        <B>{role}</B>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  // context.req.query
  const authentications = checkRole(context, ["ADMIN"]);
  if (!authentications.tokenTrue) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  // const { role, username } = context.req.cookies;
  if (!authentications.rolesTrue) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: {
      id: context.params.username,
    },
  };
}
