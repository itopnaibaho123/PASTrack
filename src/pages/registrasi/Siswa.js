import React, { useEffect } from "react";
import FormModalContextProvider from "@/components/context/FormModalContext";
import RegisterSiswaForm from "@/components/Form/RegisterSiswaForm";
import { B } from "@/components/Typography";
import Input from "@/components/Input";
import { getCookie } from "@/components/Helper/cookies";
import { useRouter } from "next/router";

export default function Siswa() {
    const router = useRouter()
  return (
    <div>
      <B>Register SIswa</B>
      <FormModalContextProvider>
        <RegisterSiswaForm
          handleSubmit={async (formData, setFormData) => {
            try {
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
              console.log(err)
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
          />
        </RegisterSiswaForm>
      </FormModalContextProvider>
    </div>
  );
}
