import { useRouter } from "next/router";
import React from "react";

export default function CardMatpelKelas({ matpel, role, username }) {
  const router = useRouter();
  if (role === "MURID") {
    matpel.map((s) => {
      return (
        <div
          className="bg-white text-emerald-500 border border-blue-500 px-4 py-2 rounded-lg"
          onClick={() =>
            router.push(`${router.push(`pelajaran/${s.id}/siswa/${username}`)}`)
          }
        >
          {s.namaMataPelajaran}
        </div>
      );
    });
  } else {
    matpel.map((s) => {
      return (
        <div className="bg-white text-emerald-500 border border-blue-500 px-4 py-2 rounded-lg">
          {s.namaMataPelajaran}
        </div>
      );
    });
  }
}
