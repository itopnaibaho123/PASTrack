import CardKelas from "@/components/CardKelas";
import { H1, H3 } from "@/components/Typography";
import React from "react";
import Button from "@/components/Button";
import { KELAS } from "@/components/Hooks/Kelas";
import { getAllKelas } from "@/components/Hooks/Kelas";
import { useRouter } from "next/router";
import checkRole from "@/components/Helper/CheckRole";
export default function index(props) {
  const router = useRouter();
  return (
    <div className="flex flex-col p-5">
      <div className="flex flex-col text-center items-center">
        <H3>Daftar Kelas</H3>
        <img width={250} height={250} src="assets/PASTrack.svg"></img>
      </div>
      <div className="flex justify-center gap-2 ">
        <Button onClick={() => router.back()}>Kembali</Button>
        <Button
          variant="secondary"
          onClick={() => router.push("/kelas/CreateKelas")}
        >
          Tambah Kelas
        </Button>
      </div>
      <div className="flex flex-wrap justify-center gap-2 py-2">
      {props.list_kelas.map((kls) => {
          return (
            <CardKelas
              namaKelas={kls.namaKelas}
              id={kls.id}
              semester={kls.semester}
              awalTahunAjaran={kls.awalTahunAjaran}
              akhirTahunAjaran={kls.akhirTahunAjaran}
            />
          );
        })}
        <CardKelas />
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  // context.req.query
  const authentications = checkRole(context, ["ADMIN"]);
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
    if (role === "ADMIN") {
      const list_kelas = await getAllKelas(`${KELAS}`, token);
      return {
        props: {
          role: role,
          list_kelas: list_kelas,
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


