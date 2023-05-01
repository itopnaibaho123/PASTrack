import React, { useEffect } from "react";
import FormModalContextProvider from "@/components/context/FormModalContext";
import RegisterSiswaForm from "@/components/Form/RegisterSiswaForm";
import { B, H3 } from "@/components/Typography";
import Input from "@/components/Input";
import { getCookie } from "@/components/Helper/cookies";
import { useRouter } from "next/router";
import Button from "@/components/Button";
import { getListAngkatan } from "@/components/Hooks/Angkatan";
import checkRole from "@/components/Helper/CheckRole";
import Select from "@/components/DropDown/Select";

export default function Siswa(props) {
  const router = useRouter();
  console.log(props.angkatan)
  return (
    <div className="border border-gray-300 rounded-lg shadow-md p-5 max-w-2xl mx-auto my-5">
      <div className="flex flex-col flex-wrap place-items-center">
        <Button variant="ghost" onClick={() => router.back()}>
          Back
        </Button>
        <H3>Register Siswa</H3>
      </div>
      <FormModalContextProvider>
        <RegisterSiswaForm
          handleSubmit={async (formData, setFormData) => {
            
            try {
              console.log(formData)
              const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_ROUTE}api/register/student`,
                {
                  method: "POST",
                  body: JSON.stringify(formData),
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${getCookie("token")}`,
                  },
                }
              );
              if (res.ok) {
                router.push("/");
              }
            } catch (err) {
              console.log(err);
            } finally {
              setFormData({});
            }
          }}
        >
          <Input
            label={"Username"}
            name={"username"}
            placeholder="Type username"
            required
          />
          <Input
            label={"password"}
            name={"password"}
            placeholder="Type password"
            required
          />
          <Input
            label={"nama"}
            name={"nama"}
            placeholder="Type name"
            required
          />
          <Input
            label={"NISN"}
            name={"studentNumber"}
            placeholder="NISN"
            required
            type="number"
          />
          <Select
            label={"Angkatan"}
            name={"angkatan"}
            placeholder="id"
          >
            {props.angkatan}
          </Select>
          
        </RegisterSiswaForm>
      </FormModalContextProvider>
    </div>
  );
}

export async function getServerSideProps(context) {
  const authentications = checkRole(context);
  if (!authentications.tokenTrue) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  const angkatan = await getListAngkatan();
  const { role, username } = context.req.cookies;
  return {
    props: {
      id: username,
      role: role,
      angkatan: angkatan
    },
  };
}
