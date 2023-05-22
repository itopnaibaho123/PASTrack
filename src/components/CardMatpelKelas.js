import { useRouter } from "next/router";
import React from "react";

export default function CardMatpelKelas({ matpel, username, role }) {
  const router = useRouter();
  if (role === "MURID") {
    console.log(matpel.id)
    return (
      <div
        className="bg-white text-emerald-500 border border-blue-500 px-4 py-2 rounded-lg"
        onClick={() =>
          router.push(`/pelajaran/${matpel.id}/siswa/${username}`)}
      >
        {matpel.namaMataPelajaran}
      </div>
    );
  } else {
    return (
      <div className="bg-white text-emerald-500 border border-blue-500 px-4 py-2 rounded-lg">
        {matpel.namaMataPelajaran}
      </div>
    );
  }
}