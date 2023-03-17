import FormModalContextProvider from "@/components/context/FormModalContext";
import FormCreateMataPelajaran from "@/components/Form/FormCreateMataPelajaran";
import React from "react";
import Input from "@/components/Input";
import Select from "@/components/DropDown/Select";
import Textarea from "@/components/Textarea";
import { MATPEL_GURU } from "@/components/Hooks/Matpel";
import { postMatpel } from "@/components/Hooks/Matpel";
import { getCookie } from "@/components/Helper/cookies";
import { useRouter } from "next/router";
export default function CreatePelajaran() {
  const router = useRouter()
  return (
    <div>
      <FormModalContextProvider>
        <FormCreateMataPelajaran handleSubmit={async (formData, setFormData) => {
          try {
            console.log(formData)
             const res = await postMatpel(`${MATPEL_GURU}${getCookie('username')}`, formData, getCookie('token'))
            console.log(res)
            if(res.ok){
              router.back()
            }
          } catch(err) {
            console.log(err)
          }finally {
            setFormData({})
          }
        }}>
          <Input
            type="text"
            label={"Nama"}
            name={"namaMataPelajaran"}
            placeholder={"Nama Mata Pelajaran"}
            required
          />
          <Textarea
            label={"Description"}
            name={"desc"}
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
            name={"akhirTahunAjaran"}
            required
          />
          <Select
            label={"peminatan"}
            name={"namaPeminatan"}
            placeholder="Pilih Peminatan"
          >
            {["MATEMATIKA", "IPA"]}
          </Select>
          <Select
            label={"Semester"}
            name={"semester"}
            placeholder="Pilih semester"
          >
            {["GENAP", "GANJIL"]}
          </Select>
        </FormCreateMataPelajaran>
      </FormModalContextProvider>
    </div>
  );
}
