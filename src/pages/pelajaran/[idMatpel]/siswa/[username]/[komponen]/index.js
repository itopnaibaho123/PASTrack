import FormModalContextProvider, {
  FormModalContext,
} from "@/components/context/FormModalContext";
import FormKomponen from "@/components/Form/FormKomponen";
import React, { useState } from "react";
import Input from "@/components/Input";
import { useRouter } from "next/router";
import Button from "@/components/Button";
import { KomponenSiswaAPI } from "@/components/Hooks/KomponenSiswa";
import {
  updateKomponenSiswa,
  getDetailKomponenSiswa,
} from "@/components/Hooks/KomponenSiswa";
import { getCookie } from "@/components/Helper/cookies";
import checkRole from "@/components/Helper/CheckRole";
import Head from "next/head";
import Breadcrumb from "@/components/Breadcrumb";
import { toast } from "react-hot-toast";
export default function index(props, komponen, username) {
  const [path, setPath] = useState({});

  const router = useRouter();

  return (
    <div>
      <div className="h-full flex flex-col">
          <Breadcrumb
            links={[
              { label: "Home", href: "/" },
              { label: "Daftar Mata Pelajaran", href: "/pelajaran" },
              {
                label: `Matpel id: ${props.idMatpel}`,
                href: `/pelajaran/${props.idMatpel}`,
              },
              {
                label: `${props.username}`,
                href: `/pelajaran/${props.idMatpel}/siswa/${props.username}/`,
              },
              {
                label: `Komponen`,
                href: `${router.asPath}`,
              },
            ]}
            active={"Komponen"}
          />
        </div>
      <Head>
        <title>{`Edit Komponen Siswa`}</title>
      </Head>
      <Button onClick={() => router.back()}>Back</Button>
      <FormModalContextProvider>
        <FormKomponen
          handleSubmit={async (formData, setFormData) => {
            try {
              const res = await updateKomponenSiswa(
                KomponenSiswaAPI(props.idMatpel,props.idKomponen, props.username),
                formData,
                getCookie("token")
              );
              console.log(res);
              if (res.ok) {
                toast.success(`Berhasil Mengupdate Komponen Murid ${props.username}`)
                router.back();
              } else{
                toast.error(`gagal Mengupdate Komponen Murid ${props.username}`)
              }
            } catch (err) {
              toast.error(`gagal Mengupdate Komponen Murid ${props.username}`)
              console.log(err);
            } finally {
              setFormData({});
            }
          }}
        >
          <Input
            label={"Nilai"}
            name={"nilai"}
            placeholder={"nilai"}
            inputvalue={props.komponen.nilai}
            type="number"
            required
          />
        </FormKomponen>
      </FormModalContextProvider>
    </div>
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

      const komponen = await getDetailKomponenSiswa(
        KomponenSiswaAPI(context.query.idMatpel,context.query.komponen, context.query.username),
        token
      );

      return {
        props: {
          role: role,
          komponen: komponen,
          idKomponen: context.query.komponen,
          username: context.query.username,
          idMatpel: context.query.idMatpel
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
