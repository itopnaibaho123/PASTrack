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
import { FaChevronLeft } from "react-icons/fa";
import Breadcrumb from "@/components/Breadcrumb";
import { toast } from "react-hot-toast";

export default function Siswa(props) {
  const router = useRouter();
  console.log(props.angkatan);

  const handleBack = () => {
    router.push("/profile/listuser");
  };
  return (
    <div>
      <div className="h-full flex flex-col">
        <Breadcrumb
          links={[
            { label: "Home", href: "/" },
            { label: "Register Siswa", href: router.asPath },
          ]}
          active={"Register Siswa"}
        />
      </div>
      <div className="border border-gray-300 rounded-lg shadow-md p-5 max-w-2xl mx-auto my-5">
        <div className="flex justify-between items-center mb-4">
          <Button variant="ghost" onClick={handleBack}>
            <FaChevronLeft className="mr-2" />
          </Button>
          <H3>Register Siswa</H3>
          <div style={{ width: "32px" }}></div> {/* Spacing for alignment */}
        </div>
        <FormModalContextProvider>
          <RegisterSiswaForm
            handleSubmit={async (formData, setFormData) => {
              try {
                console.log(formData);
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
                  toast.success("Akun Murid Berhasil Dibuat")
                  router.push("/");
                }else {
                  toast.error("Akun Murid Gagal Dibuat")
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
              label={"NISN"}
              name={"studentNumber"}
              placeholder="NISN"
              required
              type="number"
            />
            <Select label={"Angkatan"} name={"angkatan"} placeholder="id">
              {props.angkatan}
            </Select>
          </RegisterSiswaForm>
        </FormModalContextProvider>
      </div>
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
      angkatan: angkatan,
    },
  };
}
