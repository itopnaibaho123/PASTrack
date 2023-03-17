import Button from "@/components/Button";
import StudentCard from "@/components/StudentCard";
import { B, H3 } from "@/components/Typography";
import { useRouter } from "next/router";
import React from "react";
import { MATPEL_LIST_SISWA } from "@/components/Hooks/Matpel";
import { getListSiswa } from "@/components/Hooks/Matpel";
import checkRole from "@/components/Helper/CheckRole";

export default function index(props) {
  const router = useRouter();
  return (
    <>
      <div className="flex flex-col gap-3 p-5">
        <div className="flex flex-col text-center items-center gap-4">
          <H3>list murid mata pelajaran Matematika</H3>
          <img width={600} height={300} src="/assets/PASTrack.svg"/>
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
              nama = {student.nama}
              username={student.username}
            />
          );
        })}
        </div>
      </div>
    </>
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
      const siswa = await getListSiswa(`${MATPEL_LIST_SISWA}${context.query.idMatpel}`, token);

      return {
        props: {
          role: role,
          siswa: siswa,
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

