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
export default function addKomponen(props) {
  const router = useRouter();
  return (
    <div>
      <Button onClick={() => router.back()}>Back</Button>
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
