import CardSubject from "@/components/CardSubject";
import { H1, H3 } from "@/components/Typography";
import React from "react";
import Button from "@/components/Button";
import { useRouter } from "next/router";
import { MATPEL_GURU } from "@/components/Hooks/Matpel";
import { getAllMatpel } from "@/components/Hooks/Matpel";
import checkRole from "@/components/Helper/CheckRole";
export default function index(props) {
  const router = useRouter();
  return (
    <div className="flex flex-col p-5">
      <div className="flex flex-col text-center items-center">
        <H3>Kelola Mata Pelajaran</H3>
        <img width={600} height={600} src="assets/PASTrack.svg"></img>
      </div>
      <div className="flex justify-center gap-2 ">
        <Button onClick={() => router.back()}>Kembali</Button>
        <Button
          variant="secondary"
          onClick={() => router.push("/pelajaran/CreatePelajaran")}
        >
          Tambah Kelas
        </Button>
      </div>

      <div className="flex flex-wrap justify-center gap-2 py-2">
        {props.matpel.map((matkul, index) => {
          return (
            <CardSubject
              namaMataPelajaran={matkul.namaMataPelajaran}
              deskripsi={matkul.deskripsi}
              id={matkul.id}
              key={index}
            />
          );
        })}
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
      const matpel = await getAllMatpel(`http://localhost:8080/api/matpel/guru/${username}`, token);
  
      return {
        props: {
          role: role,
          matpel: matpel,
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
