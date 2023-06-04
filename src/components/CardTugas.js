import { useRouter } from "next/router";
import React, { useState } from "react";
import Button from "./Button";
import { B, H2, H3, P } from "./Typography";
import { POSTINGAN_TUGAS } from "@/components/Hooks/Tugas";
import { deleteTugas } from "@/components/Hooks/Tugas";
import { getCookie } from "@/components/Helper/cookies";
import Modals from "./Modals";
import Toast from "./Toast";

export default function CardTugas({
  kodePostingan,
  judulPostingan,
  mataPelajaran,
  tanggalDeadline,
  deskripsi,
}) {
  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isToastOpen, setIsToastOpen] = useState(false);

  const handleDelete = async () => {
    const token = getCookie("token");
    try {
      await deleteTugas(`${POSTINGAN_TUGAS}${kodePostingan}`, token);
      setIsToastOpen(true);
      router.replace("/tugas");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-2/3 p-10 mb-5 bg-blue-100 rounded-2xl shadow-xl border border-blue-400">
      <div className="flex justify-between items-center">
        <div className="w-3/4">
          <h1 className="text-2xl leading-10 font-bold text-blue-900"> Tugas: {judulPostingan} </h1>
          <P className="text-slate-500"> Mata Pelajaran: {mataPelajaran}</P>
          <P className="text-slate-500"> Due Date: {tanggalDeadline}</P>
          <P className="text-slate-500"> Deskripsi Tugas: {deskripsi} </P>
        </div>
        <div className="flex flex-col justify-between h-full">
          <div className="py-1">
            <Button
              onClick={() =>
                router.push(`${router.asPath}/edit/${kodePostingan}`)
              }
            >
              Edit Tugas
            </Button>
          </div>
          <div className="mt-2">
            <Button variant="delete" onClick={() => setIsModalOpen(true)}>Hapus Tugas</Button>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <Modals
          title="Delete Tugas"
          desc="Apakah Anda yakin ingin menghapus tugas ini?"
          confirmButtonName="Hapus Tugas"
          onClick={() => {
            handleDelete();
            setIsModalOpen(false);
          }}
          onClose={() => setIsModalOpen(false)}
          cancelButtonName="Batal"
        />
      )}
      {isToastOpen && (
        <div className="flex justify-center absolute bottom-4">
          <Toast variant="success" duration={12000} onClose={() => setIsToastOpen(false)}>
            Tugas berhasil dihapus
          </Toast>
        </div>
      )}
    </div>
  );
}
