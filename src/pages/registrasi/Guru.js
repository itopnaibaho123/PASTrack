import FormModalContextProvider from "@/components/context/FormModalContext";
import RegisterGuruForm from "@/components/Form/RegisterGuruForm";
import { getCookie } from "@/components/Helper/cookies";
import Input from "@/components/Input";
import { B, H2, H3 } from "@/components/Typography";
import { useRouter } from "next/router";
import React from "react";
import { FaChevronLeft } from "react-icons/fa";
import Button from "@/components/Button";
import Head from "next/head";
import Breadcrumb from "@/components/Breadcrumb";
import { toast } from "react-hot-toast";

export default function Guru() {
  const router = useRouter();
  const handleBack = () => {
    router.push("/profile/listuser");
  };
  return (
    <div>
      <div className="h-full flex flex-col">
        <Breadcrumb
          links={[
            { label: "Home", href: "/" },
            { label: "Register Guru", href: router.asPath },
          ]}
          active={"Register Guru"}
        />
      </div>
      <div className="ml-12 py-10">
          <H2>Register Guru</H2>
        </div>
      <div className="float-left ml-10">
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
                  toast.success("Akun Guru Berhasil Dibuat")
                  router.push("/profile/listuser");
                }else{
                  toast.error("Akun Guru Tidak Berhasil Dibuat")
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
              label={"Password"}
              name={"password"}
              placeholder="Type password"
              required
            />
            <Input
              label={"Nama"}
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
    </div>
  );
}
