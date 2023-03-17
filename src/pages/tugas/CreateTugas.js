import FormModalContextProvider from "@/components/context/FormModalContext";
import FormCreatePostinganTugas from "@/components/Form/FormCreatePostinganTugas";
import React from "react";
import Input from "@/components/Input";
import Textarea from "@/components/Textarea";
import { useRouter } from "next/router";

export default function CreatePostinganTugas() {
    const router = useRouter()
  return (
    <div>
      <FormModalContextProvider>
        <FormCreatePostinganTugas 
        onClick={() => router.back()}
          handleSubmit={async (formData, setFormData) => {
            // setIsError(false);
            try {
              const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_ROUTE}/api/postingan/`,
                {
                  method: "POST",
                  body: JSON.stringify(formData),
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${getCookie('token')}`,
                  },
                }
              );
              if (res.ok) {
                router.push("/");
              }
            } catch (err) {
              // console.log(err)
            } finally {
              setFormData({});
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
