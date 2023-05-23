import CardKelasWalas from "@/components/CardKelasWalas";
import { H3 } from "@/components/Typography";
import React from "react";
import Button from "@/components/Button";
import { KELAS } from "@/components/Hooks/Kelas";
import { CURRENT_KLS_WALAS, KLS_GURU_WALAS, getAllKelasByWalas, getCurrentKelasWalas } from "@/components/Hooks/Guru";
import { useRouter } from "next/router";
import checkRole from "@/components/Helper/CheckRole";
import { getListSemester } from "@/components/Hooks/Semester";
import { getListGuru } from "@/components/Hooks/Guru";
import { GURU_KELAS } from "@/components/Hooks/Guru";

export default function Index(props) {
  const router = useRouter();

  return (
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
          <p>Anda tidak menjadi wali kelas di semester ini.</p>
          </div>
        )}
      </div>

      <div className="mt-8 text-center">
        <H3>Daftar Kelas yang Pernah Dipegang</H3>
      </div>

      <div className="flex flex-wrap justify-center mt-4 gap-2">
        {props.list_kelas_walas.length > 0 ? (
          props.list_kelas_walas.map((kls) => {
            const semester = props.semester.find((s) => s.id === kls.semesterId);
            const awalSemester = new Date(semester.awalTahunAjaran).toLocaleDateString("id-ID");
            const akhirSemester = new Date(semester.akhirTahunAjaran).toLocaleDateString("id-ID");

            return (
              <CardKelasWalas
                key={kls.id}
                id={kls.id}
                namaKelas={kls.namaKelas}
                semester={`Semester: ${semester.semester ? "Ganjil" : "Genap"} ${awalSemester} - ${akhirSemester}`}
              />
            );
          })
        ) : (
          <p>Anda belum pernah menjadi wali kelas.</p>
        )}
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
      const list_kelas_walas = await getAllKelasByWalas(`${KLS_GURU_WALAS}${username}`, token);
      const semester = await getListSemester();
      const current_kelas_walas = await getCurrentKelasWalas(`${CURRENT_KLS_WALAS}${username}`, token);

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
