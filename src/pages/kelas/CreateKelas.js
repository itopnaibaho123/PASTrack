import FormModalContextProvider from "@/components/context/FormModalContext";
import FormCreateKelas from "@/components/Form/FormCreateKelas";
import React from "react";
import Input from "@/components/Input";
import Select from "@/components/DropDown/Select";
import Textarea from "@/components/Textarea";
import { KELAS } from "@/components/Hooks/Kelas";
import { postKelas } from "@/components/Hooks/Kelas";
import { getCookie } from "@/components/Helper/cookies";
import { useRouter } from "next/router";

export default function CreateKelas() {
  const semester = [
    { id: 1, nama: "GENAP" },
    {
      id: 2,
      nama: "GANJIL",
    },
  ];

  const router = useRouter();
  return (
    <div>
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
          <Select label={"Semester"} name={"semester"} placeholder="nama">
            {semester}
          </Select>
          <Input
            type="date"
            label={"Awal Tahun Ajaran"}
            name={"awalTahunAjaran"}
            required
          />
          <Input
            type="date"
            label={"Akhir Tahun Ajaran"}
            name={"akhirTahunAjaran"}
            required
          />
          <Select
            label={"Wali Kelas"}
            name={"usernameGuru"}
            placeholder="Wali Kelas"
          >
            {["guru2", "guru1"]}
          </Select>
        </FormCreateKelas>
      </FormModalContextProvider>
    </div>
  );
}
