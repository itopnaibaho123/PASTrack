import React, { useEffect } from "react";
import FormModalContextProvider from "@/components/context/FormModalContext";
import RegisterSiswaForm from "@/components/Form/RegisterSiswaForm";
import { B, H3 } from "@/components/Typography";
import Input from "@/components/Input";
import { getCookie } from "@/components/Helper/cookies";
import { useRouter } from "next/router";
import Button from "@/components/Button";

export default function Siswa() {
  const router = useRouter();
  return (
    <div>
      <div className="flex flex-col flex-wrap place-items-center">
        <img width={600} height={600} src="assets/PASTrack.svg"></img>
        <Button variant="ghost" onClick={() => router.back()}>
          Back
        </Button>
        <H3>Register Siswa</H3>
      </div>
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
          />
          <Input
            label={"role"}
            name={"role"}
            disabled={true}
            inputvalue={'MURID'}
            required

          />
        </RegisterSiswaForm>
      </FormModalContextProvider>
    </div>
  );
}
