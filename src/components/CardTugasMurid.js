import { useRouter } from "next/router";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faBullhorn } from '@fortawesome/free-solid-svg-icons';

export default function CardTugasMurid({
  kodePostingan,
  judulPostingan,
  mataPelajaran,
  tanggalDeadline,
  deskripsi,
}) {
  const router = useRouter();

  return (
    <div className="w-2/3 p-10 mb-5 bg-blue-800 rounded-2xl shadow-lg border-4 border-yellow-400">
      <div className="flex justify-between items-center">
        <div className="w-3/4">
          <h1 className="text-2xl leading-10 font-bold text-white"> Tugas: {judulPostingan} </h1>
          <h2 className="text-white"> Mata Pelajaran: {mataPelajaran}</h2>
          <h2 className="text-white"> Due Date: {tanggalDeadline}</h2>
          <h2 className="text-white"> Deskripsi Tugas: {deskripsi} </h2>
        </div>
        <div>
          <FontAwesomeIcon
            icon={faBullhorn}
            size="3x"
            className="text-yellow-500"
          />
        </div>
      </div>
    </div>
  );
}
