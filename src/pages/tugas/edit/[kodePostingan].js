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

/* untuk edit postingan tugas */
export default function ubahTugas(props) {
  const router = useRouter();
  return (
        <div>
          <FormModalContextProvider>
            <FormCreatePostinganTugas handleSubmit={async (formData, setFormData) => {
            try {
              console.log(formData);
              const res = await updateTugas(
                `${POSTINGAN_TUGAS}${props.kodePostingan}`,
                formData,
                getCookie('token')
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
          }}>
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
  const { role, token } = context.req.cookies;
  if (authentications.rolesTrue) {
    if (role === "ADMIN") {
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
    