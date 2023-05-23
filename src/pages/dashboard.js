import React, { useState, useEffect } from "react";
import checkRole from "@/components/Helper/CheckRole";
import { P, B, H2, H3 } from "@/components/Typography";
import Button from "@/components/Button";
import { getListAngkatan } from "@/components/Hooks/Angkatan";
import {
  getAllRank,
  getListPerkembanganNilai,
  getPencapaianNilai,
  getPeminatanMurid
} from "@/components/Hooks/DashboardSiswa";

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

import {
  getAverageScorePerAngkatan,
  getAverageScorePerMatpel,
  getListDataHisto,
  getRank,
} from "@/components/Hooks/DashboardGuru";

import { getCookie } from "@/components/Helper/cookies";
import Head from "next/head";


let dashboardTitle = "";



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
  tension: 0.4,
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

export default function dashboard(props) {
  const [lblavgAngkatan, setlblAvgAngkatan] = useState([]);
  const [avgAngkatan, setAvgAngkatan] = useState([]);
  const [lblAvgMatpel, setlblAvgMatpel] = useState([]);
  const [avgMatpel, setAvgMatpel] = useState([]);
  const [page, setPage] = useState(1);
  const [rank, setRank] = useState();
  const [angkatan, setAngkatan] = useState(1);
  const [angkatanDist, setAngkatanDist] = useState(1);
  const [distribusiLabel, setDistribusiLabel] = useState([]);
  const [distribusiValue, setDistribusiValue] = useState([]);
  const [averageLineLabel, setAverageLineLabel] = useState([]);
  const [averageLineValue, setAverageLineValue] = useState([]);
  const [peminatan, setPeminatan] = useState(props.peminatan !== undefined ? props.peminatan[0]['id'] : '');
  const [peminatanLineLabel, setPeminatanLineLabel] = useState([]);
  const [peminatanLineValue, setpeminatanLineValue] = useState([]);

  useEffect(() => {
    if (props.role === "GURU") {
      const permittedAvgLabelAngkatan = [];
      const permittedAvgAngkatan = [];
      for (let i = 0; i < props.averageScoreAngkatan.length; i++) {
        permittedAvgLabelAngkatan.push(
          props.averageScoreAngkatan[i]["namaAngkatan"]
        );
        permittedAvgAngkatan.push(
          props.averageScoreAngkatan[i]["averageScore"]
        );
      }

      setlblAvgAngkatan(permittedAvgLabelAngkatan);
      setAvgAngkatan(permittedAvgAngkatan);

      const permittedAvgLabelMatpel = [];
      const permittedAvgMatpel = [];
      for (let i = 0; i < props.averageScoreMatpel.length; i++) {
        permittedAvgLabelMatpel.push(
          props.averageScoreMatpel[i]["matpel"]["namaMataPelajaran"]
        );
        permittedAvgMatpel.push(
          props.averageScoreMatpel[i]["nilaiAkhirMatpel"]
        );
      }
      setlblAvgMatpel(permittedAvgLabelMatpel);
      setAvgMatpel(permittedAvgMatpel);
    } else if (props.role === "MURID") {
      const permittedAvgLabel = [];
      const permittedAvgValue = [];

      for (let i = 0; i < props.pencapaianNilai.length; i++) {
        permittedAvgLabel.push(props.pencapaianNilai[i]["semester"]);
        permittedAvgValue.push(props.pencapaianNilai[i]["avgScore"]);
      }
      setAverageLineLabel(permittedAvgLabel);
      setAverageLineValue(permittedAvgValue);
    }
  }, []);

  async function fetchRank(page) {
    try {
      const rankOfData = await getRank(angkatan, page, getCookie("token"));
      setRank(rankOfData);
    } catch (e) {
      console.log(e);
    }
  }

  async function fetchDistribusi(angkatan) {
    try {
      const dataDistribusi = await getListDataHisto(
        angkatan,
        getCookie("token")
      );
      const unpermitLabelDistribusi = [];
      const unpermitValueDistribusi = [];
      for (const key in dataDistribusi) {
        unpermitLabelDistribusi.push(key);
        unpermitValueDistribusi.push(dataDistribusi[key]);
      }

      setDistribusiLabel(unpermitLabelDistribusi);
      setDistribusiValue(unpermitValueDistribusi);
    } catch (e) {
      console.log(e);
    }
  }
  async function fetchNilaiPeminatan(username,peminatan) {
    try {
 
      const dataNilai = await getListPerkembanganNilai(username, peminatan, getCookie("token"));
      const unpermitLabelPeminatan = [];
      const unpermitValuePeminatan = [];
      console.log(dataNilai)
      for (let i = 0; i < dataNilai.length; i++) {
        unpermitLabelPeminatan.push(dataNilai[i]["semester"]);
        unpermitValuePeminatan.push(dataNilai[i]["nilaiAkhir"]);
      }

      setPeminatanLineLabel(unpermitLabelPeminatan);
      setpeminatanLineValue(unpermitValuePeminatan);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    fetchRank(page, angkatan);
  }, [page]);

  useEffect(() => {
    fetchRank(page, angkatan);
  }, [angkatan]);

  useEffect(() => {
    
    fetchDistribusi(angkatanDist);
  }, [angkatanDist]);

  useEffect(() => {
    fetchNilaiPeminatan(props.username, peminatan)
  }, [peminatan]);

  if (props.role === "GURU") {
    dashboardTitle = "DASHBOARD GURU";
    return (
      <div className="ml-auto mr-auto">
        <Head>
          <title>{`dashboard ${props.role}`}</title>
        </Head>
        <h2 className="text-center my-4 text-4xl font-bold">
          {dashboardTitle}
        </h2>
        <div className="bg-white-100 p-6 rounded-md">
          <div className="flex flex-wrap">
            <div className="w-full md:w-1/2 xl:w-1/3 p-3">
              <div className="bg-white rounded-lg p-5" style={{ boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", border: "1px solid #87CEEB" }}>
                <h3 className="text-xl font-medium mb-4">
                  Bar Chart Distribusi Nilai Angkatan
                </h3>
                <div className='className={`flex flex-col gap-2 py-1.5 ${full && "w-full"} mb-2`'>
                  <label>Angkatan</label>
                  <div className="flex ring-gray/50 ring-[1.5px] rounded-sm items-stretch">
                    <select
                      placeholder="Try"
                      className="px-3 py-1.5 flex-1 !outline-none"
                      value={angkatanDist}
                      onChange={(e) => {
                        setAngkatanDist(e.target.value);
                      }}
                    >
                      {props.angkatan.map((item, index) => {
                        return (
                          <option value={item["id"]} key={index}>
                            {item["angkatan"]}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
                <Bar
                  options={optionsBar}
                  data={{
                    labels: distribusiLabel,
                    datasets: [
                      {
                        order: 0,
                        label: "Garis Distribusi Nilai Angkatan",
                        data: distribusiValue,
                        type: "line",
                        backgroundColor: "rgb(255,213,3 )",
                        borderColor: "rgba(255,213,3,1)",
                      },
                      {
                        order: 1,
                        label: "Distribusi Nilai Angkatan",
                        data: distribusiValue,
                        borderColor: "rgb(14, 49, 120)",
                        backgroundColor: "rgba(14, 49, 120, 1)",
                      },
                    ],
                  }}
                />
              </div>
            </div>
            <div className="w-full md:w-1/2 xl:w-1/3 p-3">
              <div className="bg-white rounded-lg p-5" style={{ boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", border: "1px solid #87CEEB" }}>
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
              <div className="bg-white rounded-lg p-5" style={{ boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", border: "1px solid #87CEEB" }}>
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
              <div className="bg-white rounded-lg p-5" style={{ boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", border: "1px solid #87CEEB" }}>
                <h3 className="text-xl font-medium mb-4">Ranking Siswa</h3>
                <div className='className={`flex flex-col gap-2 py-1.5 ${full && "w-full"} mb-2`'>
                  <label>Angkatan</label>
                  <div className="flex ring-gray/50 ring-[1.5px] rounded-sm items-stretch">
                    <select
                      placeholder="Try"
                      className="px-3 py-1.5 flex-1 !outline-none"
                      value={angkatan}
                      onChange={(e) => {
                        setAngkatan(e.target.value);
                        setPage(1);
                      }}
                    >
                      {props.angkatan.map((item, index) => {
                        return (
                          <option value={item["id"]} key={index}>
                            {item["angkatan"]}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="table-auto w-full">
                    <thead>
                      <tr>
                        <th className="px-4 py-2">Nama Siswa</th>
                        <th className="px-4 py-2">Ranking</th>
                        <th className="px-4 py-2">Average Score</th>
                      </tr>
                    </thead>
                    <tbody>
                      {rank != null &&
                        rank.map((student, index) => (
                          <tr key={index}>
                            <td className="border px-4 py-2">
                              {student["student"]["nama"]}
                            </td>
                            <td className="border px-4 py-2">
                              {student["ranking"]}
                            </td>
                            <td className="border px-4 py-2">
                              {student["averageScore"]}
                            </td>
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
                    <div className="mt-4">
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
      </div>
    );
  } else if (props.role === "MURID") {
    
    dashboardTitle = "DASHBOARD MURID";
    const kelasRank = props.ranking.rankingKelasCurrentSemester; // contoh nilai ranking kelas
    const angkatanRank = props.ranking.rankingAngkatanCurrentSemester; // contoh nilai ranking angkatan
    const angkatanRankAllSemester = props.ranking.rankingAngkatanAllSemester;
    return (
      <div className="ml-auto mr-auto">
        <Head>
          <title>{`dashboard ${props.role}`}</title>
        </Head>
        <h2 className="text-center my-4 text-4xl font-bold">
          {dashboardTitle}
        </h2>
        <div className="bg-white-100 p-6 rounded-md">
          <div className="flex flex-wrap">
            <div className="w-full md:w-1/2 xl:w-1/3 p-3">
              <div className="bg-white rounded-lg p-5" style={{ boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", border: "1px solid #87CEEB" }}>
                <h3 className="text-xl font-medium mb-4">Ranking Kelas</h3>
                <div className="text-center text-3xl font-bold p-4 rounded-lg shadow-md bg-blue-200">
                  {kelasRank}
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2 xl:w-1/3 p-3">
              <div className="bg-white rounded-lg p-5" style={{ boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", border: "1px solid #87CEEB" }}>
                <h3 className="text-xl font-medium mb-4">Ranking Angkatan</h3>
                <div className="text-center text-3xl font-bold p-4 rounded-lg shadow-md bg-green-200">
                  {angkatanRank}
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2 xl:w-1/3 p-3">
              <div className="bg-white rounded-lg p-5" style={{ boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", border: "1px solid #87CEEB" }}>
                <h3 className="text-xl font-medium mb-4">
                  Ranking di Semester Ini
                  
                </h3> 
                
                <div className="text-center text-3xl font-bold p-4 rounded-lg shadow-md bg-yellow-200">
                  {angkatanRankAllSemester}
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2 xl:w-1/3 p-3">
              <div className="bg-white rounded-lg p-5" style={{ boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", border: "1px solid #87CEEB" }}>
                <h3 className="text-xl font-medium mb-4">Rata-Rata Pencapaian Mata Pelajaran</h3>
                <div className='className={`flex flex-col gap-2 py-1.5 ${full && "w-full"} mb-2`'>
                  <label>Peminatan</label>
                  <div className="flex ring-gray/50 ring-[1.5px] rounded-sm items-stretch">
                    <select
                      placeholder="Try"
                      className="px-3 py-1.5 flex-1 !outline-none"
                      value={peminatan}
                      onChange={(e) => {
                        setPeminatan(e.target.value);
                      }}
                    >
                      {props.peminatan.map((item, index) => {
                        return (
                          <option value={item["id"]} key={index}>
                            {item["namaPeminatan"]}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
                <div className="h-40">
                  <Line
                    options={options}
                    data={{
                      labels: peminatanLineLabel,
                      datasets: [
                        {
                          label: "Perkembangan Nilai Per Semester",
                          data: peminatanLineValue,
                          backgroundColor: "rgb(255,213,3 )",
                          borderColor: "rgba(255,213,3,1)",
                        },
                      ],
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2 xl:w-1/3 p-3">
              <div className="bg-white rounded-lg p-5" style={{ boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", border: "1px solid #87CEEB" }}>
                <h3 className="text-xl font-medium mb-4">
                  Rata-Rata Pencapaian Semester
                </h3>

                <div className="h-40">
                  <Line
                    options={options}
                    data={{
                      labels: averageLineLabel,
                      datasets: [
                        {
                          label: "Perkembangan Nilai Per Semester",
                          data: averageLineValue,
                          backgroundColor: "rgb(255,213,3 )",
                          borderColor: "rgba(255,213,3,1)",
                        },
                      ],
                    }}
                  />
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
    // const dataDistribusi = await getListDataHisto(4, token);

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
    const ranking = await getAllRank(username, token);
    const pencapaianNilai = await getPencapaianNilai(username, token);
    const peminatan = await getPeminatanMurid(username, token);
    return {
      props: {
        role: role,
        ranking: ranking,
        token: token,
        pencapaianNilai: pencapaianNilai,
        peminatan: peminatan,
        username: username,
      },
    };
  }
}
