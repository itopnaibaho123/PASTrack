import CardKelas from "@/components/CardKelas";
import { H3 } from "@/components/Typography";
import React from "react";
import Button from "@/components/Button";
import { KELAS } from "@/components/Hooks/Kelas";
import { getAllKelas } from "@/components/Hooks/Kelas";
import { useRouter } from "next/router";
import checkRole from "@/components/Helper/CheckRole";
import { getListSemester } from "@/components/Hooks/Semester";
import { getListGuru } from "@/components/Hooks/Guru";
import { GURU_KELAS } from "@/components/Hooks/Guru";
import Head from "next/head";

export default function Index(props) {
  const router = useRouter();

  return (
    <div className="flex flex-col p-8">
      <Head>
        <title>{`Page List Kelas`}</title>
      </Head>
      <div className="flex flex-col text-center items-center">
        <H3>Daftar Kelas</H3>
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
          const semester = props.semester.find((s) => s.id === kls.semesterId);
          const awalSemester = new Date(
            semester.awalTahunAjaran
          ).toLocaleDateString("id-ID");
          const akhirSemester = new Date(
            semester.akhirTahunAjaran
          ).toLocaleDateString("id-ID");
          // get guru from props.list_guru and find guru by username
          const guru = props.list_guru.find(
            (g) => g.username === kls.usernameGuru
          );

          // add "namaGuru" property to kls object
          kls.namaGuru = guru ? guru.nama : "-";

          return (
            <CardKelas
              key={kls.idKelas}
              id={kls.idKelas}
              namaKelas={kls.namaKelas}
              semester={`Semester: ${
                semester.semester ? "Ganjil" : "Genap"
              } ${awalSemester} - ${akhirSemester}`}
              namaGuru={guru ? guru.nama : "-"}
            />
          );
        })}
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
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
      const semester = await getListSemester();
      const list_guru = await getListGuru(`${GURU_KELAS}`, token);
      // add "namaGuru" property to each kls object based on the teacher's username
      list_kelas.forEach((kls) => {
        const guru = list_guru.find((g) => g.username === kls.usernameGuru);
        if (guru) {
          kls.namaGuru = guru.nama;
        }
      });
      return {
        props: {
          role: role,
          list_kelas: list_kelas,
          semester: semester,
          list_guru: list_guru,
        },
      };
    } else if (role === "MURID") {
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
