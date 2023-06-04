import CardTugas from "@/components/CardTugas";
import { H1, H3 } from "@/components/Typography";
import React from "react";
import Button from "@/components/Button";
import { useRouter } from "next/router";
import { POSTINGAN_TUGAS } from "@/components/Hooks/Tugas";
import { getAllTugas } from "@/components/Hooks/Tugas";
import checkRole from "@/components/Helper/CheckRole";
import Head from "next/head";
import Breadcrumb from "@/components/Breadcrumb";

export default function index(props) {
  const router = useRouter();

  return (
    <div className="flex flex-col">
      <div className="h-full flex flex-col">
          <Breadcrumb
            links={[
              { label: "Home", href: "/" },
              { label: "Tugas", href: router.asPath },
            ]}
            active={"Tugas"}
          />
        </div>
      <Head>
        <title>{`List Tugas`}</title>
      </Head>
      <div className="flex flex-col text-center items-center py-4">
        <H3>Daftar Postingan Tugas</H3>
      </div>
      <div className="flex justify-center gap-2 pb-4 items-center">
        <Button onClick={() => router.back()}>Kembali</Button>
        <div className="flex flex-wrap justify-center"></div>
        <button
          variant="secondary"
          onClick={() => router.push("/tugas/CreateTugas")}
          className="flex flex-wrap items-center bg-main-color-yellow text-white px-20 py-1.5 rounded-[4px]">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor-navy" className="bi bi-plus-circle-fill" viewBox="0 0 16 16">
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z" />
          </svg>
          <span className="px-2 text-main-color-navy">Tambah Tugas</span>
        </button>
      </div>

      <div className="flex flex-wrap justify-center gap-2 py-2">
        {props.postingan.map((tugas) => {
          const tanggalDeadline = tugas.tanggalDeadline.split("T")[0];
          return (
            <CardTugas
              judulPostingan={tugas.judulPostingan}
              mataPelajaran={tugas.mataPelajaran}
              tanggalDeadline={tanggalDeadline}
              deskripsi={tugas.deskripsi}
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
  const authentications = checkRole(context, ["ADMIN", "GURU"]);
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
    if ((role === "ADMIN", "GURU")) {
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
