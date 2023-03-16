import React, { useState, useEffect } from "react";
import { B, H3, P } from "@/components/Typography";
import { getCookie } from "@/components/Helper/cookies";
import { useRouter } from "next/router";
import axios from "axios";
import checkRole from "@/components/Helper/CheckRole";
import Button from "@/components/Button";
import Table from "@/components/Table";
import TableHead from "@/components/Table/TableHead";
import TableBody from "@/components/Table/TableBody";
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
        setProfile((previous) => ({
          ...previous,
          ["role"]: props.role,
        }));
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, []);
  return (
    <div className="p-8 flex flex-col gap-4 place-items-center">
      <div className="grow flex">
        <Button
          onClick={() => {
            router.back();
          }}
        >
          Go back
        </Button>
        <H3>Detail User</H3>
      </div>
      <div className="w-fit bg-background rounded-xl">
        <Table>
          <TableHead cols={["username", "nama", "role"]} detailUser={true} />
          <TableBody
            cols={["username", "nama", "role"]}
            data={profile}
            detailUser={true}
          />
        </Table>
      </div>
      <div className="">
        <Button
          variant="secondary"
          onClick={() => router.push("/profile/ChangePassword")}
        >
          Ganti Password
        </Button>
      </div>
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
