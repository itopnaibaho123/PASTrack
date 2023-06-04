import Table from "@/components/Table";
import TableHead from "@/components/Table/TableHead";
import React, { useState, useEffect } from "react";
import checkRole from "@/components/Helper/CheckRole";
import axios from "axios";
import { getCookie } from "@/components/Helper/cookies";
import { P } from "@/components/Typography";
import TableBody from "@/components/Table/TableBody";
import { useRouter } from "next/router";
import Button from "@/components/Button";
import { H3 } from "@/components/Typography";
import Head from "next/head";
import { Road_Rage } from "next/font/google";
import Breadcrumb from "@/components/Breadcrumb";
export default function list(props) {
  const router = useRouter();
  if (!props.data) {
    return (
      <div>
        <P>KOSONG BOSS</P>
      </div>
    );
  }
  let keys = Object.keys(props.data[0]);
  return (
    <>
      <div>
        <div className="h-full flex flex-col">
        <Breadcrumb
          links={[
            { label: "Home", href: "/" },
            { label: "Daftar User", href: router.asPath },
          ]}
          active={"Daftar User"}
        />
      </div>
        <div className="flex flex-col p-5 place-items-center">
          <Head>
            <title>{`Users Page`}</title>
          </Head>
          <div className="flex flex-col">
            <img src="/assets/PASTrack.svg" />
            <div className="flex p-4">
              <div className="grow text-center">
                <H3>List All User</H3>
              </div>
            </div>
          </div>
          <div className="w-fit bg-background rounded-xl">
            <Table>
              <TableHead cols={keys} />
              <TableBody data={props.data} cols={keys} profile={true} />
            </Table>
          </div>
          <div className="flex flex-col items-center mt-4">
            <Button onClick={() => router.back()}>Back</Button>
          </div>
        </div>
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
  let { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_API_ROUTE}api/user/`,
    {
      headers: {
        Authorization: `Bearer ${context.req.cookies.token}`,
      },
    }
  );

  return {
    props: {
      data: data,
    },
  };
}
