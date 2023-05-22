import FormModalContextProvider from "@/components/context/FormModalContext";
import RegisterGuruForm from "@/components/Form/RegisterGuruForm";
import { getCookie } from "@/components/Helper/cookies";
import Input from "@/components/Input";
import { B, H3 } from "@/components/Typography";
import { useRouter } from "next/router";
import React from "react";
import Button from "@/components/Button";
import Head from "next/head";

export default function Guru() {
  const router = useRouter();
  return (
    <div className="border border-gray-300 rounded-lg shadow-md p-5 max-w-2xl mx-auto my-5">
      <Head>
        <title>{`Register Guru`}</title>
      </Head>
      <div className="flex flex-col flex-wrap place-items-center">
        <Button variant="ghost" onClick={() => router.back()}>
          Back
        </Button>
        <H3>Register Guru</H3>
      </div>
      <FormModalContextProvider>
        <RegisterGuruForm
          onClick={() => router.back()}
          handleSubmit={async (formData, setFormData) => {
            console.log(formData)
            // setIsError(false);
            try {
              const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_ROUTE}api/register/guru`,
                {
                  method: "POST",
                  body: JSON.stringify(formData),
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${getCookie("token")}`,
                  },
                }
              );
              console.log(res)
              if (res.ok) {
                setFormData({})
                router.push("/");
              }
            } catch (err) {
              // console.log(err)
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
            label={"NIP"}
            name={"guruId"}
            placeholder="NIP"
            required
            type="number"
          />
          
        </RegisterGuruForm>
      </FormModalContextProvider>
    </div>
  );
}
