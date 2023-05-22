import React from "react";
import FormModalContextProvider from "@/components/context/FormModalContext";
import RegisterGuruForm from "@/components/Form/RegisterGuruForm";
import checkRole from "@/components/Helper/CheckRole";
import DropdownSemester from "@/components/DropDown/DropdownSemester";
import { useRouter } from "next/router";
import { getCookie } from "@/components/Helper/cookies";
import Button from "@/components/Button";
import { H3 } from "@/components/Typography";
import Input from "@/components/Input";
import EditProfileForm from "@/components/Form/EditProfileForm";
import Head from "next/head";

const typeSemester = [
  { semester: "Genap", value: false },
  { semester: "Ganjil", value: true },
];

export default function create() {
  const router = useRouter();
  return (
    <div className="border border-gray-300 rounded-lg shadow-md p-5 max-w-2xl mx-auto my-5">
      <Head>
        <title>{`Create Semester`}</title>
      </Head>
      <div className="flex flex-col flex-wrap place-items-center">
        <Button variant="ghost" onClick={() => router.back()}>
          Back
        </Button>
        <H3>Create Semester</H3>
      </div>
      <FormModalContextProvider>
        <EditProfileForm
          onClick={() => router.back()}
          handleSubmit={async (formData, setFormData) => {
            console.log(formData);
            // setIsError(false);
            try {
              const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_ROUTE}api/semester/add`,
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
                setFormData({});
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
            label={"Awal Tahun Ajaran"}
            name={"awalTahunAjaran"}
            placeholder="TAwal Tahun Ajaran"
            type="date"
            required
          />
          <Input
            label={"Akhir Tahun Ajaran"}
            name={"akhirTahunAjaran"}
            placeholder="Akhir Tahun Ajaran"
            type="date"
            required
          />
          <DropdownSemester
            label={"Semester"}
            name={"semester"}
            placeholder="value"
            required
          >
            {typeSemester}
          </DropdownSemester>
        </EditProfileForm>
      </FormModalContextProvider>
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
