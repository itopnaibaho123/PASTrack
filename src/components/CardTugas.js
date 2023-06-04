import { useRouter } from "next/router";
import React, { useState } from "react";
import Button from "./Button";
import { B, H2, H3, P } from "./Typography";
import { POSTINGAN_TUGAS } from "@/components/Hooks/Tugas";
import { deleteTugas } from "@/components/Hooks/Tugas";
import { getCookie } from "@/components/Helper/cookies";
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

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const handleConfirmClick = () => {
    setIsModalOpen(false);
  };

  const handleCancelClick = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="w-2/3 p-10 mb-5 bg-blue-800 rounded-2xl shadow-lg border-4 border-yellow-400">
      <div className="flex justify-between items-center">
        <div className="w-3/4">
          <h1 className="text-2xl leading-10 font-bold text-white"> Tugas: {judulPostingan} </h1>
          <h2 className="text-white"> Mata Pelajaran: {mataPelajaran}</h2>
          <h2 className="text-white"> Due Date: {tanggalDeadline}</h2>
          <h2 className="text-white"> Deskripsi Tugas: {deskripsi} </h2>
        </div>
        <div className="flex flex-col justify-between h-full">
          <div className="py-1">
            <Button
              variant="natural"
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
        // <Modals
        //   title="Delete Tugas"
        //   desc="Apakah Anda yakin ingin menghapus tugas ini?"
        //   confirmButtonName="Hapus Tugas"
        //   onClick={() => {
        //     handleDelete();
        //     setIsModalOpen(false);
        //   }}
        //   onClose={() => setIsModalOpen(false)}
        //   cancelButtonName="Batal"
        // />
        <div>
              {/* Overlay */}
              <div
                className="fixed inset-0 w-screen h-screen bg-black/20"
                onClick={handleClose}
              ></div>
              <div className="fixed inset-0 w-screen h-screen grid place-items-center">
                <div className="px-4">
                  {/* Modal */}
                  <div className="bg-white rounded-lg max-w-[448px] mx-auto p-6">
                    <B className="text-xl mb-2">Delete Mata Pelajaran</B>
                    <p className="text-gray-500 mb-4">
                      Are You Sure Want To Delete This Matpel
                    </p>
                    <div className="flex justify-end space-x-2">
                      <Button  variant="secondary" onClick={handleCancelClick}>
                        Cancel
                      </Button>
                      <Button onClick={() => {
                        handleDelete() 
                        handleConfirmClick()}}>
                        Submit
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
