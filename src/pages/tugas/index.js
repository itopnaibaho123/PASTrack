import CardTugas from "@/components/CardTugas";
import { H1, H3 } from "@/components/Typography";
import React from "react";
import Button from "@/components/Button";
import { useRouter } from "next/router";
export default function index() {
  const router = useRouter();
  return (
    <div className="flex flex-col">
      <div className="flex flex-col text-center items-center">
        <H3>Daftar Tugas</H3>
        <img width={250} height={250} src="assets/PASTrack.svg"></img>
      </div>
      <div className="flex justify-center gap-2 ">
        <Button onClick={() => router.back()}>Kembali</Button>
        <Button
          variant="secondary"
          onClick={() => router.push("/tugas/CreateTugas")}
        >
          Tambah Tugas
        </Button>
      </div>

      <div className="flex flex-wrap justify-center gap-2 py-2">
        <CardTugas />
        <CardTugas/>
        
      </div>
    </div>
  );
}
