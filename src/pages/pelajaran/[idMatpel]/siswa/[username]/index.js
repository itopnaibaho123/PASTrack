import FormModalContextProvider from "@/components/context/FormModalContext";
import FormKomponen from "@/components/Form/FormKomponen";
import Table from "@/components/Table";
import TableBody from "@/components/Table/TableBody";
import TableHead from "@/components/Table/TableHead";
import React from "react";
import Button from "@/components/Button";
import checkRole from "@/components/Helper/CheckRole";
import { useRouter } from "next/router";
import { H3 } from "@/components/Typography";
import {
  getListKomponenSiswa,
  KOMPONENSISWA,
} from "@/components/Hooks/KomponenSiswa";

export default function komponen(props) {
  const columnsKomponen = [
    "Nama Komponen",
    "Bobot Penilaian",
    "Nilai",
    "Kalkulasi Bobot Nilai",
  ];
  const columnsForIterate = [
    "namaKomponen",
    "bobot",
    "nilai",
    "kalkulasiBobotNilai",
  ];
  const router = useRouter();

  if(props.role === "MURID"){
    return (
      <div className="flex flex-col place-items-center p-5 gap-5">
        <div className="flex gap-2">
          <Button onClick={() => router.back()}>Back</Button>
          <H3>Nilai Siswa</H3>
        </div>
  
        <div className="bg-background rounded-xl w-fit">
          <Table>
            <TableHead detailUser={true} cols={columnsKomponen}/>
            <TableBody
              cols={columnsForIterate}
              data={props.komponen}
              detailUser={true}
            />
          </Table>
        </div>
      </div>
    );
  }else {
    return (
      <div className="flex flex-col place-items-center p-5 gap-5">
        <div className="flex gap-2">
          <Button onClick={() => router.back()}>Back</Button>
          <H3>Nilai Siswa</H3>
        </div>
  
        <div className="bg-background rounded-xl w-fit">
          <Table>
            <TableHead cols={columnsKomponen} studentScore={true} />
            <TableBody
              cols={columnsForIterate}
              studentScore={true}
              data={props.komponen}
            />
          </Table>
        </div>
      </div>
    );
  }
}

export async function getServerSideProps(context) {
  // context.req.query
  const authentications = checkRole(context, ["GURU"]);
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
    if (role === "GURU") {
      const komponen = await getListKomponenSiswa(
        `${KOMPONENSISWA}${context.query.idMatpel}/siswa/${context.query.username}`,
        token
      );

      return {
        props: {
          role: role,
          komponen: komponen,
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
