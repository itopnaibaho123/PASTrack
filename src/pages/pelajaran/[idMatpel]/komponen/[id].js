import React from "react";
import FormModalContextProvider from "@/components/context/FormModalContext";
import FormKomponen from "@/components/Form/FormKomponen";
import Input from "@/components/Input";
import Textarea from "@/components/Textarea";
import Button from "@/components/Button";
import { useRouter } from "next/router";
import { KOMPONEN } from "@/components/Hooks/Komponen";
import { getKomponen, updateKomponen } from "@/components/Hooks/Komponen";
import checkRole from "@/components/Helper/CheckRole";
import { getCookie } from "@/components/Helper/cookies";
import Head from "next/head";


export default function detailKomponen(props) {
  const router = useRouter();
  return (
    <div>
      <Head>
        <title>{`Page Detail Komponen`}</title>
      </Head>
      <Button onClick={router.back}>Back</Button>
      <FormModalContextProvider>
        <FormKomponen
          handleSubmit={async (formData, setFormData) => {
            try {
              console.log(formData);

              const res = await updateKomponen(
                `${KOMPONEN}${props.idMatpel}/komponen/${props.id}`,
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
            inputvalue={props.data["namaKomponen"]}
            required
          />
          <Textarea
            type="text"
            label={"Description"}
            name={"desc"}
            placeholder={"Description"}
            inputvalue={props.data["desc"]}
            required
          />
          <Input
            type="date"
            label={"Tanggal Tenggat"}
            name={"dueDate"}
            placeholder={"Tanggal Tenggat"}
            inputvalue={props.data["dueDate"]}
            required
          />
          <Input
            type="number"
            label={"Bobot"}
            name={"bobot"}
            placeholder={"Bobot"}
            inputvalue={props.data["bobot"]}
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
      const komponen = await getKomponen(
        `${KOMPONEN}${context.query.idMatpel}/komponen/${context.query.id}`,
        token
      );

      return {
        props: {
          role: role,
          data: komponen,
          idMatpel: context.query.idMatpel,
          id: context.query.id,
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
