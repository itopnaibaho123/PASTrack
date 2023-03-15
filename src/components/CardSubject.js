import { useRouter } from "next/router";
import React from "react";
import Button from "./Button";
import { B, H2, H3, P } from "./Typography";
export default function () {
  const router = useRouter()
  return (
    <div className="py-8 px-8 bg-orange-200 justify-center w-fit min-w-[230px] max-w-md max-h-[300px] ring-2 ring-orange-400">
      <div className="py-5">
        <H3>Matematika</H3>
      </div>

      <P>
        Apapun Terjadi harus tetap maju walaupun pelajaran matematika
        membutuhkan waktu yang cukup besar untuk mempahami
      </P>

      <div className="py-4">
        <Button onClick={()=> router.push(`${router.asPath}/4`)}>Kelola Penilaian</Button>
      </div>
    </div>
  );
}
