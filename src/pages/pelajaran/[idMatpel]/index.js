import Button from "@/components/Button";
import StudentCard from "@/components/StudentCard";
import { B, H3 } from "@/components/Typography";
import { useRouter } from "next/router";
import React from "react";
import { MATPEL_LIST_SISWA } from "@/components/Hooks/Matpel";
import { getListSiswa } from "@/components/Hooks/Matpel";
import checkRole from "@/components/Helper/CheckRole";
import Head from "next/head";
import Breadcrumb from "@/components/Breadcrumb";

export default function index(props) {
  const router = useRouter();
  return (
    <div>
      <div className="h-full flex flex-col">
        <Breadcrumb
          links={[
            { label: "Home", href: "/" },
            { label: "Daftar Mata Pelajaran", href: "/pelajaran" },
            {
              label: `Matpel id: ${props.idMatpel}`,
              href: `/pelajaran/${props.idMatpel}`,
            },
          ]}
          active={`Matpel id: ${props.idMatpel}`}
        />
      </div>
      <div className="flex flex-col gap-3 p-5">
        <Head>
          <title>{`Mata Pelajaran`}</title>
        </Head>
        <div className="flex flex-col text-center items-center gap-4">
          <H3>Daftar Murid Mata Pelajaran</H3>
          <div className="flex justify-center gap-3">
            <Button onClick={() => router.back()}>Back</Button>
            <Button
              variant="secondary"
              onClick={() => router.push(`${router.asPath}/komponen`)}
            >
              Lihat Komponen
            </Button>
          </div>
        </div>
        <div className="flex flex-wrap gap-3 justify-center">
          {props.siswa.map((student, index) => {
            return (
              <StudentCard
                nama={student.nama}
                username={student.username}
                key={index}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
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
      const siswa = await getListSiswa(
        `${MATPEL_LIST_SISWA}${context.query.idMatpel}`,
        token
      );

      return {
        props: {
          role: role,
          siswa: siswa,
          idMatpel: context.query.idMatpel,
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
