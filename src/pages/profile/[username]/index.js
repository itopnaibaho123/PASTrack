import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import checkRole from "@/components/Helper/CheckRole";
import Button from "@/components/Button";
import { B, P, H3 } from "@/components/Typography";
import axios from "axios";
import { getCookie } from "@/components/Helper/cookies";
import Table from "@/components/Table";
import TableHead from "@/components/Table/TableHead";
import TableBody from "@/components/Table/TableBody";
import Head from "next/head";
import Breadcrumb from "@/components/Breadcrumb";

export default function EditProfile(props) {
  const [profile, setProfile] = useState({});

  const router = useRouter();

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
          ["role"]: data.data.role.role,
        }));
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, []);
  console.log(profile);
  return (
    <div>
      <div className="h-full flex flex-col">
        <Breadcrumb
          links={[
            { label: "Home", href: "/" },
            { label: props.id, href: router.asPath },
          ]}
          active={props.id}
        />
      </div>
      <div className="p-8 flex flex-col gap-4 place-items-center">
        <Head>
          <title>{`Profile ${props.id}`}</title>
        </Head>
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
      </div>
    </div>
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
