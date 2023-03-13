import Table from "@/components/Table";
import TableHead from "@/components/Table/TableHead";
import React, {useState, useEffect} from "react";
import checkRole from "@/components/Helper/CheckRole";
import axios from "axios";
import { getCookie } from "@/components/Helper/cookies";
import { P } from "@/components/Typography";
import TableBody from "@/components/Table/TableBody";
import { useRouter } from "next/router";
import Button from "@/components/Button";

export default function list(props) {
  const router = useRouter()
 if(!props.data){
  return (
    <div>
      <P>KOSONG BOSS</P>
    </div>
  )
 }
 let keys = Object.keys(props.data[0])
  return (
    <>
      <div>
        <Button onClick= {() => router.back()}>Back</Button>
        <Table> 
           <TableHead cols={keys} />
          <TableBody data={props.data} cols={keys} /> 
        </Table>
        
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
    `${process.env.NEXT_PUBLIC_API_ROUTE}api/user/`  ,
    {
      headers: {
        Authorization: `Bearer ${context.req.cookies.token}`,
      },
    }
  );


  return {
    props: {
      data: data
    },
  };
}
