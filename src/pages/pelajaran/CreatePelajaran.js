import FormModalContextProvider from "@/components/context/FormModalContext";
import FormCreateMataPelajaran from "@/components/Form/FormCreateMataPelajaran";
import React from "react";
import Input from "@/components/Input";
import Select from "@/components/DropDown/Select";
import Textarea from "@/components/Textarea";
export default function CreatePelajaran() {
  return (
    <div>
      <FormModalContextProvider>
        <FormCreateMataPelajaran>
          <Input
            type="text"
            label={"Nama"}
            name={"namaMataPelajaran"}
            placeholder={"Nama Mata Pelajaran"}
            required
          />
          <Textarea
            label={"Description"}
            name={"description"}
            placeholder={"Description"}
            required
          />
          <Input
            label={"Awal Tahun Ajaran"}
            name={"awalTahunAjaran"}
            type="date"
            required
          />
          <Input
            type="date"
            label={"Akhir Tahun Ajaran"}
            name={"awalTahunAjaran"}
            required
          />
          <Select
            label={"peminatan"}
            nama={"peminatan"}
            placeholder="Pilih Peminatan"
          >
            {["Matematika", "Ipa"]}
          </Select>
          <Select
            label={"Semester"}
            nama={"semester"}
            placeholder="Pilih semester"
          >
            {["Genap", "Ganjil"]}
          </Select>
        </FormCreateMataPelajaran>
      </FormModalContextProvider>
    </div>
  );
}
