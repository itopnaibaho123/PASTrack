import FormModalContextProvider from "@/components/context/FormModalContext";
import FormKomponen from "@/components/Form/FormKomponen";
import Input from "@/components/Input";
import Textarea from "@/components/Textarea";
import { useRouter } from "next/router";
import React from "react";
import Button from "@/components/Button";
import checkRole from "@/components/Helper/CheckRole";
import { KOMPONEN } from "@/components/Hooks/Komponen";
import { addNewKomponen } from "@/components/Hooks/Komponen";
import { getCookie } from "@/components/Helper/cookies";
import { H1, H3 } from "@/components/Typography";
import Breadcrumb from "@/components/Breadcrumb";
import { toast } from "react-hot-toast";
export default function addKomponen(props) {
  const router = useRouter();
  return (
    <div>
      <div className="h-full flex flex-col">
        <Breadcrumb
          links={[
            { label: "Home", href: "/" },
            { label: "Daftar Mata Pelajaran", href: "/pelajaran" },
            { label: `Matpel id: ${props.idMatpel}`, href: `/pelajaran/${props.idMatpel}` },
            { label: `Daftar Komponen`, href: `/pelajaran/${props.idMatpel}/komponen` },
            { label: `Tambah Komponen`, href: router.asPath },
          ]}
          active={`Tambah Komponen`}
        />
      </div>
      <div className="flex flex-col text-center items-center py-4">
        <H3>Buat Komponen Penilaian</H3>
      </div>
      <div className="flex justify-center">
      <Button onClick={() => router.back()}>Back</Button>
      </div>
      <FormModalContextProvider>
        <FormKomponen
          handleSubmit={async (formData, setFormData) => {
            try {
              console.log(formData);

              const res = await addNewKomponen(
                `${KOMPONEN}${props.idMatpel}/komponen`,
                formData,
                getCookie('token')
              );
              console.log(res);
              if (res.ok) {
                toast.success("Berhasil Menambahkan Komponen")
                router.back();
              }else{
                toast.error("Gagal Menambahkan Komponen")
              }
            } catch (err) {
              toast.error("Gagal Menambahkan Komponen")
              console.log(err);
            } finally {
              setFormData({});
            }
          }}
        >
          <Input
            type="text"
            label={"Title"}
            name={"namaKomponen"}
            placeholder={"TItle Komponen"}
            required
          />
          <Textarea
            type="text"
            label={"Description"}
            name={"desc"}
            placeholder={"Description"}
            required
          />
          <Input
            type="date"
            label={"Tanggal Tenggat"}
            name={"dueDate"}
            placeholder={"Tanggal Tenggat"}
            required
          />
          <Input
            type="number"
            label={"Bobot"}
            name={"bobot"}
            placeholder={"Bobot"}
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
      return {
        props: {
          role: role,
          idMatpel: context.query.idMatpel,
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
