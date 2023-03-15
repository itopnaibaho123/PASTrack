import FormModalContextProvider from "@/components/context/FormModalContext";
import FormKomponen from "@/components/Form/FormKomponen";
import Table from "@/components/Table";
import TableBody from "@/components/Table/TableBody";
import TableHead from "@/components/Table/TableHead";
import React from "react";
import Button from "@/components/Button";
import { useState } from "react";
import { useRouter } from "next/router";
const datum = [
  {
    id:1,
    komponenPenilaian: "tugas 1",
    bobotPenilaian: 30,
    nilai: 20,
  },
  {
    id:2,
    komponenPenilaian: "tugas 2",
    bobotPenilaian: 20,
    nilai: 70,
  },
  {
    id:3,
    komponenPenilaian: "tugas 3",
    bobotPenilaian: 25,
    nilai: 90,
  },
];

export default function komponen() {
  
  const columnsKomponen = [
    "Komponen Penilaian",
    "Bobot Penilaian",
    "Nilai",
    "Kalkulasi Bobot Nilai",
  ];
  const columnsForIterate = ["komponenPenilaian", "bobotPenilaian", "nilai", 'kalkulasiBobotNilai'];
  const router = useRouter()
  return (
    <div>
        
        <div className="flex gap-2">

            <Button onClick={() => router.back() }>Back</Button>
        </div>
        
      <FormModalContextProvider>
        <FormKomponen>
          <Table>
            <TableHead cols={columnsKomponen} studentScore={true} />
            <TableBody
              cols={columnsForIterate}
              studentScore={true}
              data={datum}
            />
          </Table>
        </FormKomponen>
      </FormModalContextProvider>
    </div>
  );
}
