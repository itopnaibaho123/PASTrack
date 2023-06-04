import React from "react";
import FormModalContextProvider from "@/components/context/FormModalContext";
import FormCreatePostinganTugas from "@/components/Form/FormCreatePostinganTugas";
import Input from "@/components/Input";
import Textarea from "@/components/Textarea";
import Button from "@/components/Button";
import { POSTINGAN_TUGAS } from "@/components/Hooks/Tugas";
import { useRouter } from "next/router";
import { getCookie } from "@/components/Helper/cookies";
import { getTugas, updateTugas } from "@/components/Hooks/Tugas";
import checkRole from "@/components/Helper/CheckRole";
import Head from "next/head";
import Breadcrumb from "@/components/Breadcrumb";
import toast, { Toaster } from 'react-hot-toast';
import { H1, H2, H3 } from "@/components/Typography";

/* untuk edit postingan tugas */
export default function ubahTugas(props) {
  const notify = (error) => error? toast.error("Maaf tidak berhasil mengganti tugas") : toast.success("Tugas berhasil diganti");
  const router = useRouter();
  return (
    <div>
       <div className="h-full flex flex-col">
        <Breadcrumb
          links={[
            { label: "Home", href: "/" },
            { label: "Daftar Tugas", href: "/tugas" },
            { label: props.data["judulPostingan"], href: router.asPath },
          ]}
          active={props.data["judulPostingan"]}
        />
      </div>
      <Head>
        <title>{`Detail Tugas`}</title>
      </Head>
      <div className="ml-12 py-10">
        <H2>Ubah Postingan Tugas</H2>
      </div>
      <div className="float-left ml-10">
        <FormModalContextProvider>
          <FormCreatePostinganTugas
            handleSubmit={async (formData, setFormData) => {
              try {
                console.log(formData);
                const res = await updateTugas(
                  `${POSTINGAN_TUGAS}${props.kodePostingan}`,
                  formData,
                  getCookie("token")
                );
                console.log(res);
                if (res.ok) {
                  notify(false)
                  router.back();
                }
              } catch (err) {
                notify(true)
                console.log(err);
              } finally {
                setFormData({});
              }
            }}
          >
            <Input
              type="text"
              label={"Judul"}
              name={"judulPostingan"}
              placeholder={"Judul Postingan Tugas"}
              inputvalue={props.data["judulPostingan"]}
              required
            />
            <Input
              label={"Mata Pelajaran"}
              name={"mataPelajaran"}
              placeholder={"Mata Pelajaran Terkait"}
              inputvalue={props.data["mataPelajaran"]}
              required
            />
            <Input
              type="date-time"
              label={"Tanggal"}
              name={"tanggalDeadline"}
              inputvalue={props.data["tanggalDeadline"]}
              required
            />
            <Textarea
              label={"Deskripsi"}
              name={"deskripsi"}
              placeholder={"Deskripsi Penugasan"}
              inputvalue={props.data["deskripsi"]}
              required
            />
          </FormCreatePostinganTugas>
        </FormModalContextProvider>
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
  const { role, token } = context.req.cookies;
  if (authentications.rolesTrue) {
    if (role === "ADMIN", "GURU") {
      const postingan = await getTugas(
        `${POSTINGAN_TUGAS}${context.query.kodePostingan}`,
        token
      );

      return {
        props: {
          role: role,
          data: postingan,
          kodePostingan: context.query.kodePostingan,
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
