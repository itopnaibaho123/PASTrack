import CardSubject from "@/components/CardSubject";
import { H1, H3 } from "@/components/Typography";
import React from "react";
import Button from "@/components/Button";
import { useRouter } from "next/router";
import { MATPEL_GURU } from "@/components/Hooks/Matpel";
import { getAllMatpel } from "@/components/Hooks/Matpel";
import checkRole from "@/components/Helper/CheckRole";
import { getListSemester } from "@/components/Hooks/Semester";
import Head from "next/head";
import Breadcrumb from "@/components/Breadcrumb";

export default function index(props) {
  const router = useRouter();
  console.log(props.semester);
  return (
    <div>
      <div className="h-full flex flex-col">
        <Breadcrumb
          links={[
            { label: "Home", href: "/" },
            { label: "Daftar Pelajaran", href: "/pelajaran" },
           
          ]}
          active={"Daftar Pelajaran"}
        />
      </div>

      <div className="flex flex-col p-5">
        <Head>
          <title>{`Page List Mata pelajaran`}</title>
        </Head>
        <div className="flex flex-col text-center items-center">
          <H3>Kelola Mata Pelajaran</H3>
        </div>
        <div className="flex justify-center gap-2 ">
          <Button onClick={() => router.back()}>Kembali</Button>
          {props.role === "GURU" && (
            <Button
              variant="secondary"
              onClick={() => router.push("/pelajaran/CreatePelajaran")}
            >
              Tambah Mata Pelajaran
            </Button>
          )}
        </div>

        <div className="flex flex-wrap justify-center gap-2 py-2">
          {props.matpel.map((matkul, index) => {
            const semester = props.semester.find(
              (s) => s.id === matkul.semester.id
            );
            console.log(semester);
            const awalSemester = new Date(
              semester.awalTahunAjaran
            ).toLocaleDateString("id-ID");
            const akhirSemester = new Date(
              semester.akhirTahunAjaran
            ).toLocaleDateString("id-ID");
            return (
              <CardSubject
                namaMataPelajaran={matkul.namaMataPelajaran}
                deskripsi={matkul.deskripsi}
                semester={`Semester: ${
                  semester.semester ? "Ganjil" : "Genap"
                } ${awalSemester} - ${akhirSemester}`}
                id={matkul.id}
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
  const authentications = checkRole(context, ["GURU", "MURID"]);
  if (!authentications.tokenTrue) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  const { role, token, username } = context.req.cookies;

  if (authentications.rolesTrue) {
    if ((role === "GURU", "MURID")) {
      const matpel = await getAllMatpel(`${MATPEL_GURU}${username}`, token);
      const semester = await getListSemester();

      return {
        props: {
          role: role,
          matpel: matpel,
          semester: semester,
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
