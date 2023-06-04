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
import Head from "next/head";
import Breadcrumb from "@/components/Breadcrumb";
import { toast } from "react-hot-toast";
export default function CreatePostinganTugas() {
  const router = useRouter();
  return (
    <div>
      <div className="h-full flex flex-col">
        <Breadcrumb
          links={[
            { label: "Home", href: "/" },
            { label: "Daftar Tugas", href: "/tugas" },
            { label: "Create Tugas", href: router.asPath },
          ]}
          active={"Create Tugas"}
        />
      </div>
      <div className="border border-gray-300 rounded-lg shadow-md p-5 max-w-2xl mx-auto my-5">
        <Head>
          <title>{`Create Tugas`}</title>
        </Head>
        <div className="flex flex-col text-center items-center py-4">
          <H3>Buat Postingan Tugas</H3>
        </div>
        <FormModalContextProvider>
          <FormCreatePostinganTugas
            handleSubmit={async (formData, setFormData) => {
              try {
                console.log(formData);
                const res = await postTugas(
                  `${POSTINGAN_TUGAS}`,
                  formData,
                  getCookie("token")
                );
                console.log(res);
                if (res.ok) {
                  toast.success("Tugas Berhasil Dibuat")
                  router.back();
                }
              } catch (err) {
                console.log(err);
                toast("Tugas Tidak Berhasil Dibuat")
              } finally {
                setFormData({});
              }
            }}
          >
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
    </div>
  );
}
