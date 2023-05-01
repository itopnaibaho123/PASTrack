import { useRouter } from "next/router";
import React from "react";
import Button from "./Button";
import { B, H2, H3, P } from "./Typography";
export default function ({
  namaMataPelajaran,
  deskripsi,
  semester,
  id

}) {
  const router = useRouter()
  return (
    <div className="py-2 px-3 bg-blue-100 justify-center w-min-w-[230px] max-w-md max-h-[300px] ring-2 ring-blue-200 rounded p-4 shadow overflow-hidden">
      <div className="py-5">
        <H3>{namaMataPelajaran}</H3>
      </div>
      <P>Semester: {semester}</P>
      <P>{deskripsi}</P>
      <div className="py-4">
        <Button onClick={()=> router.push(`${router.asPath}/${id}`)}>Kelola Penilaian</Button>
      </div>
    </div>
  );
}
