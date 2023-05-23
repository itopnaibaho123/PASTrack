import { useRouter } from "next/router";
import React from "react";
import Button from "./Button";
import { B, H2, H3, P } from "./Typography";


export default function ({
  id,
  namaKelas,
  semester,
  namaGuru,
}) {
  const router = useRouter()
  return (
    <div className="py-2 px-3 bg-blue-100 justify-center w-min-w-[230px] max-w-md max-h-[300px] ring-2 ring-blue-200 rounded p-4 shadow overflow-hidden">
      <div className="py-5">
        <H3>Kelas: {namaKelas}</H3>
      </div>
      <P>{semester}</P>
      <P>Wali Kelas: {namaGuru}</P>
      <div className="py-4">
         <Button onClick={()=> router.push(`${router.asPath}/${id}`)}>Detail Kelas</Button>
      </div>
    </div>
  );
}
