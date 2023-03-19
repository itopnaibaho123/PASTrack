import CardKelas from "@/components/CardKelas";
import { H1, H3 } from "@/components/Typography";
import React from "react";
import Button from "@/components/Button";
import { useRouter } from "next/router";
import checkRole from "@/components/Helper/CheckRole";
export default function index(props) {
  const router = useRouter();
  return (
    <div className="flex flex-col p-5">
      <div className="flex flex-col text-center items-center">
        <H3>Daftar Kelas</H3>
        <img width={250} height={250} src="assets/PASTrack.svg"></img>
      </div>
      <div className="flex justify-center gap-2 ">
        <Button onClick={() => router.back()}>Kembali</Button>
        <Button
          variant="secondary"
          onClick={() => router.push("/kelas/CreateKelas")}
        >
          Tambah Kelas
        </Button>
      </div>
      <div className="flex flex-wrap justify-center gap-2 py-2">
        <CardKelas />
        <CardKelas />
      </div>
    </div>
  );
}