import { useRouter } from "next/router";
import React from "react";
import Button from "./Button";
import { B, H2, H3, P } from "./Typography";
export default function ({
  namaMataPelajaran,
  deskripsi,
  id
}) {
  const router = useRouter()
  return (
    <div className="py-8 px-8 bg-orange-200 justify-center w-fit min-w-[230px] max-w-md max-h-[300px] ring-2 ring-orange-400">
      <div className="py-5">
        <H3>{namaMataPelajaran}</H3>
      </div>
      <P>{deskripsi}</P>
      <div className="py-4">
        <Button onClick={()=> router.push(`${router.asPath}/${id}`)}>Kelola Penilaian</Button>
      </div>
    </div>
  );
}
