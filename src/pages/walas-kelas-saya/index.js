import CardKelasWalas from "@/components/CardKelasWalas";
import { H3 } from "@/components/Typography";
import React from "react";
import Button from "@/components/Button";
import { KELAS } from "@/components/Hooks/Kelas";
import {
  CURRENT_KLS_WALAS,
  KLS_GURU_WALAS,
  getAllKelasByWalas,
  getCurrentKelasWalas,
} from "@/components/Hooks/Guru";
import { useRouter } from "next/router";
import checkRole from "@/components/Helper/CheckRole";
import { getListSemester } from "@/components/Hooks/Semester";
import { getListGuru } from "@/components/Hooks/Guru";
import { GURU_KELAS } from "@/components/Hooks/Guru";
import Breadcrumb from "@/components/Breadcrumb";
import Table from "@/components/Table";

export default function Index(props) {
  const router = useRouter();

  return (
    <div>
      <div className="h-full flex flex-col">
        <Breadcrumb
          links={[
            { label: "Home", href: "/" },
            { label: "Kelas Saya", href: router.asPath },
          ]}
          active={"Kelas Saya"}
        />
      </div>
      <div className="p-8">
        <div className="text-center">
          <H3>Kelas yang Dipegang di Semester ini</H3>
          {props.current_kelas_walas && props.current_kelas_walas.id !== null ? (
            <div className="flex justify-center mt-4 gap-2">
              <CardKelasWalas
                key={props.current_kelas_walas.id}
                id={props.current_kelas_walas.id}
                namaKelas={props.current_kelas_walas.namaKelas}
              />
            </div>
          ) : (
            <div className="flex justify-center mt-4 gap-2">
              <div className="w-1/2 p-8 mb-1 bg-blue-800 rounded-2xl shadow-lg border-4 border-yellow-400 my-1 py-4">
                <p className="text-white text-center font-semibold">Anda tidak menjadi wali kelas di semester ini.</p>
              </div>
            </div>
          )}
        </div>

        <div className="mt-8 text-center">
          <H3>Daftar Kelas yang Pernah Dipegang</H3>
        </div>

        <div className="flex flex-wrap justify-center mt-4 gap-2">
          {props.list_kelas_walas.length > 0 ? (
            <table className="w-full border-collapse rounded-full shadow-md">
              <thead>
                <tr>
                  <th
                    className="border p-2"
                    style={{ backgroundColor: "#000080", color: "white" }}
                  >
                    Kelas
                  </th>
                  <th
                    className="border p-2"
                    style={{ backgroundColor: "#000080", color: "white" }}
                  >
                    Semester
                  </th>
                  <th
                    className="border p-2"
                    style={{ backgroundColor: "#000080", color: "white" }}
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {props.list_kelas_walas.map((kls, index) => {
                  const semester = props.semester.find(
                    (s) => s.id === kls.semesterId
                  );
                  const awalSemester = new Date(
                    semester.awalTahunAjaran
                  ).toLocaleDateString("id-ID");
                  const akhirSemester = new Date(
                    semester.akhirTahunAjaran
                  ).toLocaleDateString("id-ID");

                  const rowBackgroundColor =
                    index % 2 === 0 ? "bg-white" : "bg-gray-200";

                  return (
                    <tr key={kls.idKelas} className={rowBackgroundColor}>
                      <td className="border p-2 text-center">{kls.namaKelas}</td>
                      <td className="border p-2 text-center">{`${semester.semester ? "Ganjil" : "Genap"
                        } ${awalSemester} - ${akhirSemester}`}</td>
                      <td className="border p-2">
                        <div className="flex justify-center gap-2">
                          <Button
                            variant="secondary"
                            onClick={() =>
                              router.push(`${router.asPath}/${kls.id}`)
                            }
                          >
                            Detail Kelas
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <div className="flex justify-center mt-4 gap-2">
              <div className="w-4/4 p-8 mb-1 bg-blue-800 rounded-2xl shadow-lg border-4 border-yellow-400 my-1 py-4">
                <p className="text-white text-center font-semibold">Anda belum pernah menjadi wali kelas.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const authentications = checkRole(context, ["GURU"]);
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
    if (role === "GURU") {
      const list_kelas_walas = await getAllKelasByWalas(
        `${KLS_GURU_WALAS}${username}`,
        token
      );
      const semester = await getListSemester();
      const current_kelas_walas = await getCurrentKelasWalas(
        `${CURRENT_KLS_WALAS}${username}`,
        token
      );

      return {
        props: {
          role: role,
          list_kelas_walas: list_kelas_walas,
          current_kelas_walas: current_kelas_walas ? current_kelas_walas : null,
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
