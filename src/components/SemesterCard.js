import { useRouter } from 'next/router'
import React from 'react'
import Button from './Button'
import { B } from './Typography'

export default function SemesterCard({
  semester,
  awalTahunAjaran,
  akhirTahunAjaran
}) {
  const router = useRouter()

  const formatTanggal = (tanggal) => {
    const date = new Date(tanggal);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  return (
    <div className="w-1/2 p-8 mb-1 bg-blue-800 rounded-2xl shadow-lg border-4 border-yellow-400 my-1 py-4">
      <h1 className="text-center text-white font-bold text-xl">{semester ? 'Semester Ganjil' : 'Semester Genap'}</h1>
      <p className="text-center text-white mt-2">
        {formatTanggal(awalTahunAjaran)} - {formatTanggal(akhirTahunAjaran)}
      </p>
    </div>
  )
}
