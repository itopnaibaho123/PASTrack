import CardKelasMurid from "@/components/CardKelasMurid";
import { H3 } from "@/components/Typography";
import React from "react";
import Button from "@/components/Button";
import { KELAS } from "@/components/Hooks/Kelas";
import {
  CURRENT_KLS_MURID,
  KLS_MURID,
  getAllKelasByMurid,
  getCurrentKelasMurid,
} from "@/components/Hooks/Murid";
import { useRouter } from "next/router";
import checkRole from "@/components/Helper/CheckRole";
import { getListSemester } from "@/components/Hooks/Semester";
import { getListGuru } from "@/components/Hooks/Guru";
import { GURU_KELAS } from "@/components/Hooks/Guru";
import Breadcrumb from "@/components/Breadcrumb";

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
          <H3>Kelas pada Semester Ini</H3>
          {props.current_kelas_murid ? (
            <div className="flex justify-center mt-4 gap-2">
              <CardKelasMurid
                key={props.current_kelas_murid.id}
                id={props.current_kelas_murid.id}
                namaKelas={props.current_kelas_murid.namaKelas}
              />
            </div>
          ) : (
            <p>Anda tidak sedang berada di kelas manapun di semester ini.</p>
          )}
        </div>

        <div className="mt-8 text-center">
          <H3>Daftar Kelas Kamu</H3>
        </div>

        <div className="flex flex-wrap justify-center mt-4 gap-2">
          {props.list_kelas_murid.length > 0 ? (
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
                {props.list_kelas_murid.map((kls, index) => {
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
                <p className="text-white text-center font-semibold">Anda belum pernah terdaftar dikelas manapun.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const authentications = checkRole(context, ["MURID", "ORANGTUA"]);
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
    if ((role === "MURID", "ORANGTUA")) {
      const list_kelas_murid = await getAllKelasByMurid(
        `${KLS_MURID}${username}`,
        token
      );
      const semester = await getListSemester();
      const current_kelas_murid = await getCurrentKelasMurid(
        `${CURRENT_KLS_MURID}${username}`,
        token
      );
      return {
        props: {
          role: role,
          list_kelas_murid: list_kelas_murid,
          current_kelas_murid: current_kelas_murid,
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
