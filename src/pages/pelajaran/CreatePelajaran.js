import FormModalContextProvider from "@/components/context/FormModalContext";
import FormCreateMataPelajaran from "@/components/Form/FormCreateMataPelajaran";
import React from "react";
import Input from "@/components/Input";
import Select from "@/components/DropDown/Select";
import Textarea from "@/components/Textarea";
import { MATPEL_GURU } from "@/components/Hooks/Matpel";
import { postMatpel } from "@/components/Hooks/Matpel";
import { getCookie } from "@/components/Helper/cookies";
import { useRouter } from "next/router";
import { PEMINATAN } from "@/components/Hooks/Peminatan";
import { getListPeminatan } from "@/components/Hooks/Peminatan";
import checkRole from "@/components/Helper/CheckRole";
import { getListSemester } from "@/components/Hooks/Semester";
import Head from "next/head";

const semester = [
  { id: 1, nama: "GANJIL" },
  { id: 2, nama: "GENAP" },
];


export default function CreatePelajaran(props) {
  const router = useRouter();

  return (
    <div>
      <Head>
        <title>{`Create Pelajaran`}</title>
      </Head>
      <FormModalContextProvider>
        <FormCreateMataPelajaran
          handleSubmit={async (formData, setFormData) => {
            console.log(formData)
            try {
              console.log(formData);
              const res = await postMatpel(
                `${MATPEL_GURU}${getCookie("username")}`,
                formData,
                getCookie("token")
              );
              console.log(res);
              if (res.ok) {
                router.back();
              }
            } catch (err) {
              console.log(err);
            } finally {
              setFormData({});
            }
          }}
        >
          <Input
            type="text"
            label={"Nama"}
            name={"namaMataPelajaran"}
            placeholder={"Nama Mata Pelajaran"}
            required
          />
          <Textarea
            label={"Description"}
            name={"desc"}
            placeholder={"Description"}
            required
          />
          <Select
            label={"peminatan"}
            name={"namaPeminatan"}
            placeholder="id"
          >
            {props.peminatan}
          </Select>
          <Select
            label={"Semester"}
            name="semester"
            placeholder="id"
            semester = {true}
          >
            {props.semester}
          </Select>
        </FormCreateMataPelajaran>
      </FormModalContextProvider>
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
  const { role, token } = context.req.cookies;

  if (authentications.rolesTrue) {
    if (role === "GURU") {
      const peminatan = await getListPeminatan(`${PEMINATAN}`, token);
      const semester = await getListSemester();
      return {
        props: {
          role: role,
          peminatan: peminatan,
          semester:semester
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
