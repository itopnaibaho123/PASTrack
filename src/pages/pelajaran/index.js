import CardSubject from "@/components/CardSubject";
import { H1, H3 } from "@/components/Typography";
import React from "react";
import Button from "@/components/Button";
import { useRouter } from "next/router";
export default function index() {
  const router = useRouter();
  return (
    <div className="flex flex-col p-5">
      <div className="flex flex-col text-center items-center">
        <H3>Kelola Mata Pelajaran</H3>
        <img width={600} height={600} src="assets/PASTrack.svg"></img>
      </div>
      <div className="flex justify-center gap-2 ">
        <Button onClick={() => router.back()}>Kembali</Button>
        <Button
          variant="secondary"
          onClick={() => router.push("/pelajaran/CreatePelajaran")}
        >
          Tambah Kelas
        </Button>
      </div>

      <div className="flex flex-wrap justify-center gap-2 py-2">
        <CardSubject />
        <CardSubject />
        <CardSubject />
        <CardSubject />
        <CardSubject />
        <CardSubject />
        <CardSubject />
        <CardSubject />
        <CardSubject />
        <CardSubject />
        <CardSubject />
        <CardSubject />
        <CardSubject />
        <CardSubject />
        <CardSubject />
        
      </div>
    </div>
  );
}
