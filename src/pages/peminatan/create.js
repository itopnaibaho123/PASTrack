import React from "react";

import checkRole from "@/components/Helper/CheckRole";
import FormModalContextProvider from "@/components/context/FormModalContext";
import RegisterGuruForm from "@/components/Form/RegisterGuruForm";
import Input from "@/components/Input";
import { useRouter } from "next/router";
import Button from "@/components/Button";
import { H3 } from "@/components/Typography";
import FormKomponen from "@/components/Form/FormKomponen";
import { getCookie } from "@/components/Helper/cookies";
import Head from "next/head";
import Breadcrumb from "@/components/Breadcrumb";
import { toast } from "react-hot-toast";

export default function Create() {
  const router = useRouter();
  return (
    <div>
      <div className="h-full flex flex-col">
        <Breadcrumb
          links={[
            { label: "Home", href: "/" },
            { label: "Daftar Peminatan", href: "/peminatan" },
            { label: "Create Peminatan", href: router.asPath },
          ]}
          active={"Create Peminatan"}
        />
      </div>
      <div className="border border-gray-300 rounded-lg shadow-md p-5 max-w-2xl mx-auto my-5">
        <Head>
          <title>{`Page Create Peminatan`}</title>
        </Head>
        <div className="flex flex-col flex-wrap place-items-center">
          <Button variant="ghost" onClick={() => router.back()}>
            Back
          </Button>
          <H3>Create Peminatan</H3>
        </div>
        <FormModalContextProvider>
          <FormKomponen
            onClick={() => router.back()}
            handleSubmit={async (formData, setFormData) => {
              console.log(formData);
              // setIsError(false);
              try {
                const res = await fetch(
                  `${process.env.NEXT_PUBLIC_API_ROUTE}api/peminatan/add`,
                  {
                    method: "POST",
                    body: JSON.stringify(formData),
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: `Bearer ${getCookie("token")}`,
                    },
                  }
                );
                console.log(res);
                if (res.ok) {
                  toast.success("Peminatan Berhasil Dibuat")
                  router.push("/");
                }else{
                  toast.error("Peminatan Gagal Dibuat")
                }
              } catch (err) {
                // console.log(err)
                console.log(err);
              } finally {
                setFormData({});
              }
            }}
          >
            <Input
              label={"Nama Pemiantan"}
              name={"namaPeminatan"}
              placeholder="Type Nama Peminatan"
              required
            />
          </FormKomponen>
        </FormModalContextProvider>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
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
      return {
        props: {
          role: role,
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
