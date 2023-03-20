import CardTugas from "@/components/CardTugas";
import { H1, H3 } from "@/components/Typography";
import React from "react";
import Button from "@/components/Button";
import { useRouter } from "next/router";
import { POSTINGAN_TUGAS } from "@/components/Hooks/Tugas";
import { getAllTugas } from "@/components/Hooks/Tugas";
import checkRole from "@/components/Helper/CheckRole";

export default function index(props) {
  const router = useRouter();
  return (
    <div className="flex flex-col">
      <div className="flex flex-col text-center items-center">
        <H3>Daftar Tugas</H3>
        <img width={250} height={250} src="assets/PASTrack.svg"></img>
      </div>
      <div className="flex justify-center gap-2 ">
        <Button onClick={() => router.back()}>Kembali</Button>
        <Button
          variant="secondary"
          onClick={() => router.push("/tugas/CreateTugas")}
        >
          Tambah Tugas
        </Button>
      </div>

      <div className="flex flex-wrap justify-center gap-2 py-2">
        {props.postingan.map((tugas) => {
          return (
            <CardTugas
              judulPostingan={tugas.judulPostingan}
              mataPelajaran={tugas.mataPelajaran}
              tanggalDeadline={tugas.tanggalDeadline}
              deskripsi={tugas.deskrispi}
              kodePostingan={tugas.kodePostingan}
            />
          );
        })}
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
      const postingan = await getAllTugas(`${POSTINGAN_TUGAS}`, token);
      return {
        props: {
          role: role,
          postingan: postingan,
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


