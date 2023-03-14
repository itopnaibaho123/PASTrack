import FormModalContextProvider from "@/components/context/FormModalContext";
import RegisterGuruForm from "@/components/Form/RegisterGuruForm";
import { getCookie } from "@/components/Helper/cookies";
import Input from "@/components/Input";
import { B } from "@/components/Typography";
import { useRouter } from "next/router";
import React from "react";


export default function Guru() {
    const router = useRouter()
  return (
    <div>
        <B>Register Guru</B>
      <FormModalContextProvider>
        <RegisterGuruForm
            onClick={() => router.back()}
          handleSubmit={async (formData, setFormData) => {
            // setIsError(false);
            try {
              const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_ROUTE}api/register/guru`,
                {
                  method: "POST",
                  body: JSON.stringify(formData),
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${getCookie('token')}`,
                  },
                }
              );
              if (res.ok) {
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
