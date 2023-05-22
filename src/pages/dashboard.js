import React, { useState, useEffect } from "react";
import checkRole from "@/components/Helper/CheckRole";
import { P, B, H2, H3 } from "@/components/Typography";
import Button from "@/components/Button";
import { getListAngkatan } from "@/components/Hooks/Angkatan";

let dashboardTitle = "";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Line, Bar } from "react-chartjs-2";
import FormModalContextProvider, {
  FormModalContext,
} from "@/components/context/FormModalContext";
import SelectDashboard from "@/components/DropDown/SelectDashboard";
import HistogramNilaiAngkatan from "@/components/Dashboard/HistogramNilaiAngkatan";
import {
  getAverageScorePerAngkatan,
  getAverageScorePerMatpel,
  getRank,
} from "@/components/Hooks/DashboardGuru";

import { useCookie } from "@/components/Hooks/useCookie";
import { getCookie } from "@/components/Helper/cookies";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const optionsBar = {
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: "Bar Chart Rata-Rata Nilai",
    },
  },
};

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Perkembangan Nilai Siswa",
    },
  },
};

const labels = [
  "Semester 1",
  "Semester 2",
  "Semester 3",
  "Semester 4",
  "Semester 5",
];

export const data = {
  labels,
  datasets: [
    {
      label: "perkembangan",
      data: [50, 60, 55, 70, 90],
      borderColor: "rgb(14, 49, 120)",
      backgroundColor: "rgba(14, 49, 120, 1)",
    },
  ],
};

export const data2 = {
  labels,
  datasets: [
    {
      label: "perkembangan",
      data: ["50", "60", "55", "70", "90"],
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 213, 3, 1)",
    },
  ],
};

// Data untuk tabel ranking siswa
const studentRanking = [
  { name: "Chris", class: "IPA 2", rank: 1 },
  { name: "Dyta", class: "IPA 2", rank: 2 },
  { name: "Viona", class: "IPA 2", rank: 3 },
  { name: "Bina", class: "IPA 2", rank: 4 },
];

export default function dashboard({
  role,
  angkatan,
  averageScoreAngkatan,
  averageScoreMatpel,
  token,
}) {
  const [lblavgAngkatan, setlblAvgAngkatan] = useState([]);
  const [avgAngkatan, setAvgAngkatan] = useState([]);
  const [lblAvgMatpel, setlblAvgMatpel] = useState([]);
  const [avgMatpel, setAvgMatpel] = useState([]);
  const [page, setPage] = useState(1);
  const [rank, setRank] = useState();

  useEffect(() => {
    if (role === "GURU") {
      const permittedAvgLabelAngkatan = [];
      const permittedAvgAngkatan = [];
      for (let i = 0; i < averageScoreAngkatan.length; i++) {
        permittedAvgLabelAngkatan.push(averageScoreAngkatan[i]["namaAngkatan"]);
        permittedAvgAngkatan.push(averageScoreAngkatan[i]["averageScore"]);
      }

      setlblAvgAngkatan(permittedAvgLabelAngkatan);
      setAvgAngkatan(permittedAvgAngkatan);

      const permittedAvgLabelMatpel = [];
      const permittedAvgMatpel = [];
      for (let i = 0; i < averageScoreMatpel.length; i++) {
        permittedAvgLabelMatpel.push(
          averageScoreMatpel[i]["matpel"]["namaMataPelajaran"]
        );
        permittedAvgMatpel.push(averageScoreMatpel[i]["nilaiAkhirMatpel"]);
      }
      setlblAvgMatpel(permittedAvgLabelMatpel);
      setAvgMatpel(permittedAvgMatpel);
    } else if (props.role === "MURID") {
    }
  }, []);

  async function fetchRank(page) {
    try {
    
      const rankOfData = await getRank(page, getCookie("token"))
      setRank(rankOfData)
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    fetchRank(page);
  }, [page]);
 
  console.log(rank)
  console.log(averageScoreAngkatan)
  console.log(averageScoreMatpel)
  if (role === "GURU") {
    dashboardTitle = "DASHBOARD GURU";
    return (
      <div className="ml-auto mr-auto">
        <h2 className="text-center my-4 text-2xl font-bold">
          {dashboardTitle}
        </h2>
        <div className="bg-gray-100 p-6 rounded-md">
          <div className="flex flex-wrap">
            <div className="w-full md:w-1/2 xl:w-1/3 p-3">
              <div className="bg-white rounded-lg shadow-md p-5">
                <FormModalContextProvider>
                  <h3 className="text-xl font-medium mb-4">
                    Bar Chart DIstribusi Nilai Angkatan
                  </h3>
                  <SelectDashboard
                    label={"Angkatan"}
                    name={"angkatan"}
                    placeholder="id"
                  >
                    {angkatan}
                  </SelectDashboard>
                  <div className="h-40">
                    <HistogramNilaiAngkatan
                      options={optionsBar}
                      name={"angkatan"}
                      kategori={"Distribusi Nilai Angkatan"}
                    />
                    {/* <Bar options={optionsBar} data={data} />
                     */}
                  </div>
                </FormModalContextProvider>
              </div>
            </div>
            <div className="w-full md:w-1/2 xl:w-1/3 p-3">
              <div className="bg-white rounded-lg shadow-md p-5">
                <h3 className="text-xl font-medium mb-4">
                  Bar Chart Score Per Angkatan
                </h3>

                <div className="h-40">
                  <Bar
                    options={optionsBar}
                    data={{
                      labels: lblavgAngkatan,
                      datasets: [
                        {
                          label: "Average Score Per Angkatan",
                          data: avgAngkatan,
                          borderColor: "rgb(255,99,132)",
                          backgroundColor: "rgba(255,213,3,1)",
                        },
                      ],
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2 xl:w-1/3 p-3">
              <div className="bg-white rounded-lg shadow-md p-5">
                <h3 className="text-xl font-medium mb-4">
                  Bar Score Per Matpel
                </h3>
                <div className="h-40">
                  <Bar
                    options={optionsBar}
                    data={{
                      labels: lblAvgMatpel,
                      datasets: [
                        {
                          label: "Average Score Per Matpel",
                          data: avgMatpel,
                          borderColor: "rgb(255,99,132)",
                          backgroundColor: "rgba(255,213,3,1)",
                        },
                      ],
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2 xl:w-1/3 p-3">
              <div className="bg-white rounded-lg shadow-md p-5">
                <h3 className="text-xl font-medium mb-4">Ranking Siswa</h3>
                <div className="overflow-x-auto">
                  <table className="table-auto w-full">
                    <thead>
                      <tr>
                        <th className="px-4 py-2">Nama Siswa</th>
                        <th className="px-4 py-2">Ranking</th>
                      </tr>
                    </thead>
                    <tbody>
                      {rank != null && rank.map((student, index) => (
                        <tr key={index}>
                          <td className="border px-4 py-2">
                            {student["student"]["nama"]}
                          </td>
                          <td className="border px-4 py-2">{index + 1}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="flex">
                    {page > 1 && (
                      <Button
                        varian="secondary"
                        onClick={(e) => setPage(page - 1)}
                      >
                        Previous
                      </Button>
                    )}
                    <p className="px-4">{page}</p>
                    <Button
                      varian="secondary"
                      onClick={(e) => setPage(page + 1)}
                    >
                      Next
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else if (props.role === "MURID") {
    dashboardTitle = "DASHBOARD MURID";
    const kelasRank = 5; // contoh nilai ranking kelas
    const angkatanRank = 10; // contoh nilai ranking angkatan
    return (
      <div className="ml-auto mr-auto">
        <h2 className="text-center my-4 text-2xl font-bold">
          {dashboardTitle}
        </h2>
        <div className="bg-gray-100 p-6 rounded-md">
          <div className="flex flex-wrap">
            <div className="w-full md:w-1/2 xl:w-1/3 p-3">
              <div className="bg-white rounded-lg shadow-md p-5">
                <h3 className="text-xl font-medium mb-4">Ranking Kelas</h3>
                <div className="text-center text-3xl font-bold p-4 rounded-lg shadow-md bg-blue-200">
                  {kelasRank}
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2 xl:w-1/3 p-3">
              <div className="bg-white rounded-lg shadow-md p-5">
                <h3 className="text-xl font-medium mb-4">Ranking Angkatan</h3>
                <div className="text-center text-3xl font-bold p-4 rounded-lg shadow-md bg-green-200">
                  {angkatanRank}
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2 xl:w-1/3 p-3">
              <div className="bg-white rounded-lg shadow-md p-5">
                <h3 className="text-xl font-medium mb-4">Line Chart 1</h3>
                <div className="h-40">
                  <Line options={options} data={data2} />
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2 xl:w-1/3 p-3">
              <div className="bg-white rounded-lg shadow-md p-5">
                <h3 className="text-xl font-medium mb-4">Line Chart 2</h3>
                <div className="h-40">
                  <Line options={options} data={data2} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export async function getServerSideProps(context) {
  // context.req.query
  const authentications = checkRole(context);
  if (!authentications.tokenTrue) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const { role, token, username } = context.req.cookies;

  if (role === "GURU") {
    const angkatan = await getListAngkatan();
    const dataAverageScorePerMatpel = await getAverageScorePerMatpel(
      username,
      token
    );
    const dataAverageScorePerAngkatan = await getAverageScorePerAngkatan(token);

    return {
      props: {
        role: role,
        angkatan: angkatan,
        averageScoreAngkatan: dataAverageScorePerAngkatan,
        averageScoreMatpel: dataAverageScorePerMatpel,
        token: token,
      },
    };
  } else if (role === "MURID") {
  }
}
