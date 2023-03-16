import Button from "@/components/Button";
import Table from "@/components/Table";
import TableBody from "@/components/Table/TableBody";
import TableHead from "@/components/Table/TableHead";
import { B, H3, P } from "@/components/Typography";
import { useRouter } from "next/router";
import React from "react";

const data = [
  {
    id: 1,
    "Komponen Penilaian": "Tugas 1",
    "Bobot Penilaian": 10,
  },
  { id: 2, "Komponen Penilaian": "Tugas 1", "Bobot Penilaian": 10 },
  { id: 3, "Komponen Penilaian": "Tugas 1", "Bobot Penilaian": 10 },
  { id: 4, "Komponen Penilaian": "Tugas 1", "Bobot Penilaian": 10 },
  {
    id: 5,
    "Komponen Penilaian": "Tugas 1",
    "Bobot Penilaian": 10,
  },
];

export default function index() {
  const router = useRouter();
  const kalkulasi = () => {
    let a = 0;
    data.map((item, index) => {
      a = a + item["Bobot Penilaian"];
    });

    return a;
  };
  return (
    <div className="flex flex-col place-items-center p-10 gap-4">
      <div>
        <img width={600} height={300} src="assets/PASTrack.svg"></img>
      </div>
      <div className="flex justify-center gap-3">
        <Button onClick={() => router.back()}>Back</Button>
        <Button
          variant="secondary"
          onClick={() => router.push(`${router.asPath}/addKomponen`)}
        >
          Tambah
        </Button>
      </div>
      <div className="text-center">
        <H3>Komponen Penilaian</H3>
      </div>
      <div className="w-fit bg-background rounded-xl">
        <Table>
          <TableHead cols={["Komponen Penilaian", "Bobot Penilaian"]} />
          <TableBody
            cols={["Komponen Penilaian", "Bobot Penilaian"]}
            komponen={true}
            data={data}
          />
        </Table>
      </div>
      <div className="flex gap-4">
        <H3>Result</H3>
        <H3>{kalkulasi()}</H3>
      </div>
    </div>
  );
}
