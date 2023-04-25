import FormModalContextProvider from "@/components/context/FormModalContext";
import FormCreatePostinganTugas from "@/components/Form/FormCreatePostinganTugas";
import { H1, H3 } from "@/components/Typography";
import React from "react";
import Input from "@/components/Input";
import Textarea from "@/components/Textarea";
import { POSTINGAN_TUGAS } from "@/components/Hooks/Tugas";
import { postTugas } from "@/components/Hooks/Tugas";
import { getCookie } from "@/components/Helper/cookies";
import { useRouter } from "next/router";

export default function CreatePostinganTugas() {
  const router = useRouter()
  return (
    <div className="border border-gray-300 rounded-lg shadow-md p-5 max-w-2xl mx-auto my-5">
      <div className="flex flex-col text-center items-center py-4">
        <H3>Buat Postingan Tugas</H3>
      </div>
      <FormModalContextProvider>
        <FormCreatePostinganTugas handleSubmit={async (formData, setFormData) => {
          try {
            console.log(formData)
            const res = await postTugas(`${POSTINGAN_TUGAS}`, formData, getCookie('token'))
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
            label={"Judul"}
            name={"judulPostingan"}
            placeholder={"Judul Postingan Tugas"}
            required
          />
          <Input
            label={"Mata Pelajaran"}
            name={"mataPelajaran"}
            placeholder={"Mata Pelajaran Terkait"}
            required
          />
          <Input
            type="date"
            label={"Tanggal"}
            name={"tanggalDeadline"}
            required
          />
          <Textarea
            label={"Deskripsi"}
            name={"deskripsi"}
            placeholder={"Deskripsi Penugasan"}
            required
          />
        </FormCreatePostinganTugas>
      </FormModalContextProvider>
    </div>
  );
}
