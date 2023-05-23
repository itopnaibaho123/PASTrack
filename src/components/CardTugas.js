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
    <div className="align-middle inline-block shadow overflow-hidden">
      <div className="grid grid-cols-1 gap-y-4">
        <div className="bg-blue-100 border-4 border-blue-200 rounded p-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="flex">
                <div className="flex flex-col">
                  <H3 className="text-xl font-medium"> Tugas: {judulPostingan} </H3>
                  <P className="text-xl font-medium"> Mata Pelajaran: {mataPelajaran}</P>
                  <P className="text-xl font-medium"> Due Date: {tanggalDeadline}</P>
                  <P className="text-gray-500"> Deskripsi Tugas: {deskripsi} </P>
                </div>
                <div className="flex flex-col w-full items-end justify-end">
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
                    <Button onClick={() => setIsModalOpen(true)}>Hapus Tugas</Button>
                  </div>
                </div>
              </div>
            </div>
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
          <Toast variant="success" duration={15000} onClose={() => setIsToastOpen(false)}>
            Tugas berhasil dihapus
          </Toast>
        </div>
      )}
    </div>
  );
}
