import React, { useState, useEffect } from "react";
import checkRole from "@/components/Helper/CheckRole";
import { P, B, H2, H3 } from "@/components/Typography";
import Button from "@/components/Button";
import { getListAngkatan } from "@/components/Hooks/Angkatan";
import {
  getAllRank,
  getListPerkembanganNilai,
  getPencapaianNilai,
  getPeminatanMurid,
} from "@/components/Hooks/DashboardSiswa";
import { FaSearch } from "react-icons/fa";
import { getUsernameMurid } from "@/components/Hooks/Orangtua";

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
import Breadcrumb from "@/components/Breadcrumb";

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
  const [rank, setRank] = useState([]);
  const [angkatan, setAngkatan] = useState(1);
  const [angkatanDist, setAngkatanDist] = useState(1);
  const [distribusiLabel, setDistribusiLabel] = useState([]);
  const [distribusiValue, setDistribusiValue] = useState([]);
  const [averageLineLabel, setAverageLineLabel] = useState([]);
  const [averageLineValue, setAverageLineValue] = useState([]);
  const [peminatan, setPeminatan] = useState(
    props.peminatan !== undefined ? props.peminatan[0]["id"] : ""
  );
  const [peminatanLineLabel, setPeminatanLineLabel] = useState([]);
  const [peminatanLineValue, setpeminatanLineValue] = useState([]);
  const [searchQueryNama, setSearchQueryNama] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 2;

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = rank.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(rank.length / usersPerPage);

  const handleSearchNama = (e) => {
    setSearchQueryNama(e.target.value);
    setCurrentPage(1); // Reset halaman saat melakukan pencarian
  };
  useEffect(() => {
    if (props.role === "GURU") {
      const permittedAvgLabelAngkatan = [];
      const permittedAvgAngkatan = [];
      console.log(props.averageScoreAngkatan);
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
      console.log(rankOfData);
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
  async function fetchNilaiPeminatan(username, peminatan) {
    try {
      const dataNilai = await getListPerkembanganNilai(
        username,
        peminatan,
        getCookie("token")
      );
      const unpermitLabelPeminatan = [];
      const unpermitValuePeminatan = [];

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
    const filteredUsers = rank.filter((murid) =>
      murid["student"]["nama"].includes(searchQueryNama.toLowerCase())
    );
    setRank(filteredUsers);
  }, [angkatan]);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    fetchDistribusi(angkatanDist);
  }, [angkatanDist]);

  useEffect(() => {
    fetchNilaiPeminatan(props.username, peminatan);
  }, [peminatan]);

  if (props.role === "GURU") {
    dashboardTitle = "DASHBOARD GURU";
    return (
      <div>
        <div className="h-full flex flex-col">
          <Breadcrumb
            links={[
              { label: "Home", href: "/" },
              { label: "Dashboard", href: "/dashboard" },
            ]}
            active={"Dashboard"}
          />
        </div>
        <div className="ml-auto mr-auto">
          <Head>
            <title>{`dashboard ${props.role}`}</title>
          </Head>
          <h2 className="text-center my-4 text-4xl font-bold">
            {dashboardTitle}
          </h2>
          <div className="bg-white-100 p-6 rounded-md">
            <div className="grid grid-cols-2">
              <div className="w-full p-3">
                <div
                  className="bg-white rounded-lg p-5"
                  style={{
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                    border: "1px solid #87CEEB",
                  }}
                >
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
                  <div className="h-full">
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
              </div>
              <div className="w-full p-3">
                <div
                  className="bg-white h-full rounded-lg p-5 "
                  style={{
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                    border: "1px solid #87CEEB",
                  }}
                >
                  <h3 className="text-xl font-medium mb-4">
                    Bar Chart Score Per Angkatan
                  </h3>
                  <div className="h-full">
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
              <div className="w-full p-3">
                <div
                  className="bg-white rounded-lg p-5"
                  style={{
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                    border: "1px solid #87CEEB",
                  }}
                >
                  <h3 className="text-xl font-medium mb-4">
                    Bar Score Per Matpel
                  </h3>
                  <div className="h-full">
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
              <div className="w-full p-3">
                <div
                  className="bg-white h-full rounded-lg p-5"
                  style={{
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                    border: "1px solid #87CEEB",
                  }}
                >
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
                  <div className="mb-4">
                    <div className="flex items-center border p-2 rounded-md shadow-sm border-blue-300">
                      <FaSearch className="mr-2 text-blue-500" />{" "}
                      {/* Ikon pencarian */}
                      <input
                        type="text"
                        placeholder="Cari Nama..."
                        value={searchQueryNama}
                        onChange={handleSearchNama}
                        className="border-none focus:outline-none flex-grow"
                        style={{ backgroundColor: "transparent" }}
                      />
                    </div>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse rounded-full shadow-md">
                      <thead>
                        <tr>
                          <th
                            className="border p-2"
                            style={{
                              backgroundColor: "#000080",
                              color: "white",
                            }}
                          >
                            Nama Siswa
                          </th>
                          <th
                            className="border p-2"
                            style={{
                              backgroundColor: "#000080",
                              color: "white",
                            }}
                          >
                            Ranking
                          </th>
                          <th
                            className="border p-2"
                            style={{
                              backgroundColor: "#000080",
                              color: "white",
                            }}
                          >
                            Average Score
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {rank.map((user, index) => {
                          const rowBackgroundColor =
                            index % 2 === 0 ? "bg-white" : "bg-gray-200";

                          return (
                            <tr key={index} className={rowBackgroundColor}>
                              <td className="border p-2">
                                {user["student"]["nama"]}
                              </td>
                              <td className="border p-2">{user["ranking"]}</td>
                              <td className="border p-2">
                                {user["averageScore"]}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                    {/* <table className="table-auto w-full">
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
                    </table> */}
                    {/* <div className="flex">
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
                    </div> */}
                  </div>
                  {totalPages > 1 && (
                    <div className="flex justify-end mt-4 gap-2">
                      {" "}
                      {/* Use "justify-end" class to align buttons to the right */}
                      <Button
                        variant="secondary"
                        onClick={() => paginate(currentPage - 1)}
                        disabled={currentPage === 1}
                      >
                        &lt; Previous
                      </Button>
                      <Button
                        variant="secondary"
                        onClick={() => paginate(currentPage + 1)}
                        disabled={currentPage === totalPages}
                      >
                        Next &gt;
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else if ((props.role === "MURID", "ORANGTUA")) {
    dashboardTitle = "DASHBOARD MURID";
    const kelasRank = props.ranking.rankingKelasCurrentSemester; // contoh nilai ranking kelas
    const angkatanRank = props.ranking.rankingAngkatanCurrentSemester; // contoh nilai ranking angkatan
    const angkatanRankAllSemester = props.ranking.rankingAngkatanAllSemester;
    return (
      <div>
        <div className="h-full flex flex-col">
          <Breadcrumb
            links={[
              { label: "Home", href: "/" },
              { label: "Dashboard", href: "/dashboard" },
            ]}
            active={"Dashboard"}
          />
        </div>
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
                <div
                  className="bg-white rounded-lg p-5"
                  style={{
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                    border: "1px solid #87CEEB",
                  }}
                >
                  <h3 className="text-xl font-medium mb-4">Ranking Kelas</h3>
                  <div className="text-center text-3xl font-bold p-4 rounded-lg shadow-md bg-blue-200">
                    {kelasRank}
                  </div>
                </div>
              </div>
              <div className="w-full md:w-1/2 xl:w-1/3 p-3">
                <div
                  className="bg-white rounded-lg p-5"
                  style={{
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                    border: "1px solid #87CEEB",
                  }}
                >
                  <h3 className="text-xl font-medium mb-4">Ranking Angkatan</h3>
                  <div className="text-center text-3xl font-bold p-4 rounded-lg shadow-md bg-green-200">
                    {angkatanRank}
                  </div>
                </div>
              </div>
              <div className="w-full md:w-1/2 xl:w-1/3 p-3">
                <div
                  className="bg-white rounded-lg p-5"
                  style={{
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                    border: "1px solid #87CEEB",
                  }}
                >
                  <h3 className="text-xl font-medium mb-4">
                    Ranking di Semester Ini
                  </h3>

                  <div className="text-center text-3xl font-bold p-4 rounded-lg shadow-md bg-yellow-200">
                    {angkatanRankAllSemester}
                  </div>
                </div>
              </div>
              <div className="w-full md:w-1/2 xl:w-1/3 p-3">
                <div
                  className="bg-white rounded-lg p-5"
                  style={{
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                    border: "1px solid #87CEEB",
                  }}
                >
                  <h3 className="text-xl font-medium mb-4">
                    Rata-Rata Pencapaian Mata Pelajaran
                  </h3>
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
              <div className="w-full md:w-1/2 xl:w-1/3 p-3">
                <div
                  className="bg-white h-full rounded-lg p-5"
                  style={{
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                    border: "1px solid #87CEEB",
                  }}
                >
                  <h3 className="text-xl font-medium mb-4">
                    Rata-Rata Pencapaian Semester
                  </h3>

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
  } else if (role === "ORANGTUA") {
    const usernameAnak = await getUsernameMurid(username, token);
    const ranking = await getAllRank(usernameAnak[0]['usernameAnak'], token);
    const pencapaianNilai = await getPencapaianNilai(usernameAnak[0]['usernameAnak'], token);
    const peminatan = await getPeminatanMurid(usernameAnak[0]['usernameAnak'], token);

    return {
      props: {
        role: role,
        ranking: ranking,
        token: token,
        pencapaianNilai: pencapaianNilai,
        peminatan: peminatan,
        username: usernameAnak[0]['usernameAnak'],
      },
    };
  }
}
