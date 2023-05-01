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

// const semester = [
//   { id: 1, nama: "GANJIL" },
//   { id: 2, nama: "GENAP" },
// ];

export default function CreateKelas(props) {

  const router = useRouter();
  console.log(props.list_guru);
  return (
    <div className="border border-gray-300 rounded-lg shadow-md p-5 max-w-2xl mx-auto my-5">
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
                router.back();
              }
            } catch (err) {
              console.log(err);
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
            semester = {true}
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
