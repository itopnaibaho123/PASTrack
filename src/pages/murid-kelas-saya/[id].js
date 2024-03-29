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
import Table from "@/components/Table";
import { FaPlus } from "react-icons/fa";

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
            { label: "Daftar Kelas", href: "/kelas" },
            { label: props.kelas.namaKelas, href: router.asPath },
          ]}
          active={props.kelas.namaKelas}
        />
      </div>
      <div className="container mx-auto p-10">
        <div className="flex justify-center items-center mb-8">
          <H1>Detail Kelas</H1>
        </div>
        <div className="bg-blue-800 p-8 rounded-lg mb-8 shadow-lg">
          <div className="max-w-xl mx-auto">
            <h1 className="text-2xl font-medium mb-4 text-center text-white">
              Kelas {props.kelas.namaKelas}
            </h1>
            <p className="text-white ml-0 text-center">
              Ini adalah kelas {props.kelas.namaKelas}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8">
          <div className="border border-gray-300 bg-white p-8 rounded-lg shadow-lg">
            <h1 className="text-2xl font-medium mb-4 text-center">
              Daftar Siswa Terdaftar
            </h1>
            <Table>
              <thead>
                <tr className="bg-yellow-400">
                  <th className="px-4 py-2">Nama Siswa</th>
                </tr>
              </thead>
              <tbody>
                {students.map((s, index) => (
                  <tr
                    key={s.id}
                    className={index % 2 === 0 ? "bg-gray-100" : ""}
                  >
                    <td className="px-4 py-2">{s.namaSiswa}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
          <div className="border border-gray-300 bg-white p-8 rounded-lg shadow-lg">
            <h1 className="text-2xl font-medium mb-4 text-center">
              Mata Pelajaran Terdaftar
            </h1>
            <Table>
              <thead>
                <tr className="bg-yellow-400">
                  <th className="px-4 py-2">Nama Mata Pelajaran</th>
                  <th className="px-4 py-2">Action</th> {/* Tambah kolom Action */}
                </tr>
              </thead>
              <tbody>
                {matpel.map((s, index) => (
                  <tr
                    key={s.id}
                    className={index % 2 === 0 ? "bg-gray-100" : ""}
                  >
                    <td className="px-4 py-2">{s.namaMataPelajaran}</td>
                    <td className="px-4 py-2 text-center">
                      {props.role === "MURID" && (
                        <Button
                          variant="primary"
                          onClick={() =>
                            router.push(
                              `/pelajaran/${s.id}/siswa/${props.username}`
                            )
                          }
                        >
                          Lihat Nilai
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const authentications = checkRole(context, ["ADMIN", "MURID", "ORANGTUA"]);
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
    if ((role === "ADMIN", "MURID", "ORANGTUA")) {
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
    } else if ((role === "MURID", "GURU", "ORANGTUA")) {
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
