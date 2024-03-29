import FormModalContextProvider from "@/components/context/FormModalContext";
import FormCreateKelas from "@/components/Form/FormCreateKelas";
import React from "react";
import Input from "@/components/Input";
import SelectGuru from "@/components/DropDown/SelectGuru";
import Select from "@/components/DropDown/Select";
import { H1, H3 } from "@/components/Typography";
import { KELAS } from "@/components/Hooks/Kelas";
import { postKelas } from "@/components/Hooks/Kelas";
import { getCookie } from "@/components/Helper/cookies";
import { useRouter } from "next/router";
import checkRole from "@/components/Helper/CheckRole";
import { getListGuru } from "@/components/Hooks/Guru";
import { GURU_KELAS } from "@/components/Hooks/Guru";
import { getListSemester } from "@/components/Hooks/Semester";
import Head from "next/head";
import Breadcrumb from "@/components/Breadcrumb";
import { toast } from "react-hot-toast";
// const semester = [
//   { id: 1, nama: "GANJIL" },
//   { id: 2, nama: "GENAP" },
// ];

export default function CreateKelas(props) {
  const router = useRouter();
  console.log(props.list_guru);
  return (
    <div>
      <div className="h-full flex flex-col">
        <Breadcrumb
          links={[
            { label: "Home", href: "/" },
            { label: "Daftar Kelas", href: "/kelas" },
            { label: "Create Kelas", href: "/kelas/CreateKelas" },
          ]}
          active={"Create Kelas"}
        />
      </div>
      <div className="">
        <Head>
          <title>{`Create Kelas`}</title>
        </Head>
        <div className="flex flex-col text-center items-center py-4">
          <H3>Buat Kelas</H3>
        </div>
        <FormModalContextProvider>
          <FormCreateKelas
            handleSubmit={async (formData, setFormData) => {
              try {
                console.log(formData);
                const res = await postKelas(
                  `${KELAS}`,
                  formData,
                  getCookie("token")
                );
                console.log(res);
                if (res.ok) {
                  toast.success("Berhasil Membuat Kelas")
                  router.back();
                }else{
                  toast.error("Gagal Membuat Kelas")
                }
              } catch (err) {
                toast.error("Gagal Membuat Kelas")
              } finally {
                setFormData({});
              }
            }}
          >
            <Input
              type="text"
              label={"Nama Kelas"}
              name={"namaKelas"}
              placeholder={"Nama Kelas"}
              required
            />
            <Select
              label={"Semester"}
              name="semesterId"
              placeholder="id"
              semester={true}
            >
              {props.semester}
            </Select>
            <SelectGuru
              label={"Wali Kelas"}
              name={"usernameGuru"}
              placeholder="username"
            >
              {props.list_guru}
            </SelectGuru>
          </FormCreateKelas>
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
      const list_guru = await getListGuru(`${GURU_KELAS}`, token);
      const semester = await getListSemester();
      return {
        props: {
          role: role,
          list_guru: list_guru,
          semester: semester,
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
