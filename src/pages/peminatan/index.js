import React from 'react'
import { PEMINATAN } from "@/components/Hooks/Peminatan";
import { getListPeminatan } from "@/components/Hooks/Peminatan";
import StudentCard from "@/components/StudentCard";
import checkRole from '@/components/Helper/CheckRole';
import { H3 } from '@/components/Typography';
import Button from '@/components/Button';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function index(props) {
  const router = useRouter()
  return (
    <div className="flex flex-col p-5">
      <Head>
        <title>{`Page Peminatan`}</title>
      </Head>
      <div className="flex flex-col text-center items-center">
        <H3>Kelola Peminatan</H3>
      </div>
      <div className="flex justify-center gap-2 ">
        <Button onClick={() => router.back()}>Kembali</Button>
        {props.role === "ADMIN" && (
        <Button
          variant="secondary"
          onClick={() => router.push(`${router.asPath}/create`)}
        >
          Tambah Peminatan 
        </Button>
         )}
      </div>

      <div className="flex flex-wrap justify-center gap-2 py-2">
        {props.peminatan.map((peminatan, index) => {
          return (
            <StudentCard
              nama={peminatan.namaPeminatan}
              username={peminatan.id}
              peminatan={true}
              key={index}
            />
          );
        })}
      </div>
    </div>
  )
}

export async function getServerSideProps(context) {
    const authentications = checkRole(context, ["ADMIN"]);
    if (!authentications.tokenTrue) {
      return {
        redirect: {
          destination: "/login",
          permanent: false,
        },
      };
    }
    const { role, token } = context.req.cookies;
  
    if (authentications.rolesTrue) {
      if (role === "ADMIN") {
        const peminatan = await getListPeminatan(`${PEMINATAN}`, token);
  
        return {
          props: {
            role: role,
            peminatan: peminatan,
          },
        };
      } 
    } else {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }
  }
