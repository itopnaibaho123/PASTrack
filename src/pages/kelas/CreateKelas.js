import FormModalContextProvider from "@/components/context/FormModalContext";
import FormCreateKelas from "@/components/Form/FormCreateKelas";
import React from "react";
import Input from "@/components/Input";
import Select from "@/components/DropDown/Select";
import Textarea from "@/components/Textarea";
import { useRouter } from "next/router";

export default function CreateKelas() {
    const router = useRouter()
  return (
    <div>
      <FormModalContextProvider>
        <FormCreateKelas>
          <Input
            type="text"
            label={"Nama Kelas"}
            name={"namaKelas"}
            placeholder={"Nama Kelas"}
            required
          />
          <Input
            label={"Semester"}
            name={"semester"}
            placeholder={"Semester"}
            required
          />
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
            name={"guru"}
            placeholder="Wali Kelas"
          >
            {["VIO", "KARLINA"]}
          </Select>
        </FormCreateKelas>
      </FormModalContextProvider>
    </div>
  );
}
