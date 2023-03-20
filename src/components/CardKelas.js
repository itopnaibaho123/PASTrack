import { useRouter } from "next/router";
import React from "react";
import Button from "./Button";
import { B, H2, H3, P } from "./Typography";


export default function ({
	id,
  namaKelas,
  semester,
  awalTahunAjaran,
  akhirTahunAjaran
}) {
  const router = useRouter()
  return (
    <div className="py-8 px-8 bg-orange-200 justify-center w-min-w-[230px] max-w-md max-h-[300px] ring-2 ring-orange-400">
      <div className="py-5">
        <H3>Kelas: {namaKelas}</H3>
      </div>
      <P>Semester: {semester}</P>
      <P>Akhir Tahun Pelajaran: {akhirTahunAjaran}</P>
      <P>Awal Tahun Pelajaran: {awalTahunAjaran}</P>
      
      <div className="py-4">
         <Button onClick={()=> router.push(`${router.asPath}/{id}`)}>Detail Kelas</Button>
    </div>
    </div>
  );
}
