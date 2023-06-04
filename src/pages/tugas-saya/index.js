import CardTugasMurid from "@/components/CardTugasMurid";
import { H1, H3 } from "@/components/Typography";
import React from "react";
import Button from "@/components/Button";
import { useRouter } from "next/router";
import { POSTINGAN_TUGAS } from "@/components/Hooks/Tugas";
import { getAllTugas } from "@/components/Hooks/Tugas";
import checkRole from "@/components/Helper/CheckRole";
import Breadcrumb from "@/components/Breadcrumb";

export default function index(props) {
  const router = useRouter();
  return (
    <div>
      <div className="h-full flex flex-col">
        <Breadcrumb
          links={[
            { label: "Home", href: "/" },
            { label: "Tugas Saya", href: router.asPath },
          ]}
          active={"Tugas Saya"}
        />
      </div>
      <div className="flex flex-col">
        <div className="flex flex-col text-center items-center py-4">
          <H3>Daftar Postingan Tugas</H3>
        </div>
        <div className="flex justify-center gap-2 pb-4">
          <Button onClick={() => router.back()}>Kembali</Button>
        </div>

        <div className="flex flex-wrap justify-center gap-2 py-2">
          {props.postingan.map((tugas) => {
            return (
              <CardTugasMurid
                judulPostingan={tugas.judulPostingan}
                mataPelajaran={tugas.mataPelajaran}
                tanggalDeadline={tugas.tanggalDeadline}
                deskripsi={tugas.deskripsi}
                kodePostingan={tugas.kodePostingan}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  // context.req.query
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
