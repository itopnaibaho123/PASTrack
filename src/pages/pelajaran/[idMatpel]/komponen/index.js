import Button from "@/components/Button";
import Table from "@/components/Table";
import TableBody from "@/components/Table/TableBody";
import TableHead from "@/components/Table/TableHead";
import { B, P } from "@/components/Typography";
import { useRouter } from "next/router";
import React from "react";

const data = [
  {
    "id": 1,
    "Komponen Penilaian": "Tugas 1",
    "Bobot Penilaian": 10,
  },
  {"id":2,
    "Komponen Penilaian": "Tugas 1",
    "Bobot Penilaian": 10,
  },
  {"id":3,
    "Komponen Penilaian": "Tugas 1",
    "Bobot Penilaian": 10,
  },
  { "id":4,
    "Komponen Penilaian": "Tugas 1",
    "Bobot Penilaian": 10,
  },
  {
    "id":5,
    "Komponen Penilaian": "Tugas 1",
    "Bobot Penilaian": 10,
  },
];

export default function index() {
  const router = useRouter()
  const kalkulasi = () => {
    let a = 0;
    data.map((item, index) => {
      a = a + item["Bobot Penilaian"]
    })
    
    return a;
  };
  return (
    <div>
      <Button onClick={() => router.back()}>Back</Button>
      <Button onClick={() => router.push(`${router.asPath}/addKomponen`)}>Tambah Komponen</Button>
      <Table>
        <TableHead cols={["Komponen Penilaian", "Bobot Penilaian"]} />
        <TableBody
          cols={["Komponen Penilaian", "Bobot Penilaian"]}
          komponen={true}
          data={data}
        />
      </Table>
      <div className="flex gap-4">
        <B>Result</B>
        <P>{kalkulasi()}</P>
      </div>
    </div>
  );
}
