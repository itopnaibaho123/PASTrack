import { useRouter } from "next/router";
import { H1, H3 } from "@/components/Typography";
import React from "react";
import Button from "@/components/Button";
import { getMatpelByKelas } from "@/components/Hooks/Matpel";
import { getSiswaByKelas, getKelas } from "@/components/Hooks/Murid";
import { API_KELAS } from "@/components/Hooks/Murid";
import checkRole from "@/components/Helper/CheckRole";
import CardMatpelKelas from "@/components/CardMatpelKelas";
import { PEMINATAN } from "@/components/Hooks/Peminatan";
import { getListPeminatan } from "@/components/Hooks/Peminatan";
import Breadcrumb from "@/components/Breadcrumb";

export default function detailKelasMurid(props) {
  const router = useRouter();
  const id = router.query.id;

  // TODO: get class detail
  const matpel = props.matpel;
  const students = props.students;
  console.log(props.matpel);

  return (
    <div>
      <div className="h-full flex flex-col">
        <Breadcrumb
          links={[
            { label: "Home", href: "/" },
            { label: "Kelas Saya", href: "/murid-kelas-saya" },
            { label: props.kelas.namaKelas, href: router.asPath },
          ]}
          active={props.kelas.namaKelas}
        />
      </div>
      <div className="container mx-auto p-10">
        <div className="flex justify-center items-center mb-8">
          <H1>Detail Kelas</H1>
        </div>
        <div className="bg-blue-100 p-8 rounded-lg mb-8">
          <div className="max-w-xl mx-auto">
            <h1 className="text-2xl font-medium mb-4">
              Kelas {props.kelas.namaKelas}
            </h1>
            <p className="text-gray-700">
              Ini adalah kelas {props.kelas.namaKelas}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-lg">
            <h1 className="text-2xl font-medium mb-4">Daftar Siswa</h1>
            <ul className="divide-y divide-gray-300">
              {students.map((s) => (
                <li key={s.id} className="py-2">
                  {s.namaSiswa}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white p-8 rounded-lg">
            <h1 className="text-2xl font-medium mb-4">Mata Pelajaran</h1>
            <div className="flex flex-wrap gap-2">
              {matpel.map((s, index) => {
                return (
                  <CardMatpelKelas
                    key={index}
                    matpel={s}
                    username={props.username}
                    role={props.role}
                  />
                );
              })}
              {/* {matpel.map((s) => (
              <div
                key={s.id}
                className="bg-white border border-blue-500 px-4 py-2 rounded-lg text-emerald-500"
              >
                {s.namaMataPelajaran}
              </div>
            ))} */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const authentications = checkRole(context, ["ADMIN", "MURID"]);
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
    if ((role === "ADMIN", "MURID")) {
      const students = await getSiswaByKelas(
        `${API_KELAS}${context.query.id}/siswa`,
        token
      );
      const matpel = await getMatpelByKelas(
        `${API_KELAS}${context.query.id}/matpel`,
        token
      );
      const kelas = await getKelas(`${API_KELAS}${context.query.id}`, token);
      const peminatan = await getListPeminatan(`${PEMINATAN}`, token);

      return {
        props: {
          role: role,
          students: students,
          matpel: matpel,
          kelas: kelas,
          peminatan: peminatan,
          username: username,
        },
      };
    } else if ((role === "MURID", "GURU")) {
      const students = await getSiswaByKelas(
        `${API_KELAS}${context.query.id}/siswa`,
        token
      );
      const matpel = await getMatpelByKelas(
        `${API_KELAS}${context.query.id}/matpel`,
        token
      );
      const kelas = await getKelas(`${API_KELAS}${context.query.id}`, token);

      return {
        props: {
          role: role,
          students: students,
          matpel: matpel,
          kelas: kelas,
          username: username,
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
