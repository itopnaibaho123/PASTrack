import { useRouter } from "next/router";
import React from "react";
import Button from "./Button";
import { B, H2, H3, P } from "./Typography";


export default function ({
  id,
  namaKelas,
  semester,
}) {
  const router = useRouter()
  return (
    <div className="w-auto sm:w-1/2 p-8 mb-1 bg-blue-800 rounded-2xl shadow-lg border-4 border-yellow-400 my-1 py-4">
      <div className="py-5">
        <h1 className="text-white font-bold text-3xl">Kelas: {namaKelas}</h1>
      </div>
      <P>{semester}</P>
      <div className="py-4">
         <Button variant="natural" onClick={()=> router.push(`${router.asPath}/${id}`)}>Detail Kelas</Button>
      </div>
    </div>
  );
}
