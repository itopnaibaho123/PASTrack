import React from "react";
import FormModalContextProvider from "@/components/context/FormModalContext";
import FormCreatePostinganTugas from "@/components/Form/FormCreatePostinganTugas";
import Input from "@/components/Input";
import Textarea from "@/components/Textarea";
import Button from "@/components/Button";
import { useRouter } from "next/router";
import { getCookie } from "@/components/Helper/cookies";
/* untuk edit postingan tugas */
export default function ubahTugas() {
  const router = useRouter();
  return (
        <div>
          <FormModalContextProvider>
            <FormCreatePostinganTugas >
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
    