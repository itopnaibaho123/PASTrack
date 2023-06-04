import { useRouter } from "next/router";
import React from "react";
import Button from "./Button";
import { B, H2, H3, P } from "./Typography";

export default function CardKelas({ id, namaKelas, semester, namaGuru }) {
  const router = useRouter();
  return (
    <div className="py-2 px-3 bg-blue-100 w-full max-w-md ring-2 ring-blue-200 rounded p-4 shadow overflow-hidden">
      <table className="w-full">
        <tbody>
          <tr>
            <td className="py-2 font-bold">Kelas:</td>
            <td className="py-2">{namaKelas}</td>
          </tr>
          <tr>
            <td className="py-2 font-bold">Semester:</td>
            <td className="py-2">{semester}</td>
          </tr>
          <tr>
            <td className="py-2 font-bold">Wali Kelas:</td>
            <td className="py-2">{namaGuru}</td>
          </tr>
        </tbody>
      </table>
      <div className="py-4">
        <Button onClick={() => router.push(`${router.asPath}/${id}`)}>
          Detail Kelas
        </Button>
      </div>
    </div>
  );
}
