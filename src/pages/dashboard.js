import checkRole from "@/components/Helper/CheckRole";
import { P, B, H2, H3 } from "@/components/Typography";
import Button from "@/components/Button";

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

function handleDetailRankingClick() {
  // Tambahkan kode untuk membuka jendela popup atau memindahkan pengguna ke halaman baru di sini
}

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
      data: ["50", "60", "55", "70", "90"],
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

export default function dashboard(props) {
  const API_ROUTE = process.env.NEXT_PUBLIC_API_ROUTE;
  console.log(API_ROUTE);
  if (props.role === "GURU") {
    dashboardTitle = "DASHBOARD GURU";
    return (
      <div className="ml-auto mr-auto">
        <h2 className="text-center my-4 text-2xl font-bold">{dashboardTitle}</h2>
        <div className="bg-gray-100 p-6 rounded-md">
          <div className="flex flex-wrap">
            <div className="w-full md:w-1/2 xl:w-1/3 p-3">
              <div className="bg-white rounded-lg shadow-md p-5">
                <h3 className="text-xl font-medium mb-4">Bar Chart 1</h3>
                <div className="h-40">
                  <Bar options={optionsBar} data={data} />
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2 xl:w-1/3 p-3">
              <div className="bg-white rounded-lg shadow-md p-5">
                <h3 className="text-xl font-medium mb-4">Bar Chart 2</h3>

                <div className="h-40">
                  <Bar options={optionsBar} data={data2} />
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2 xl:w-1/3 p-3">
              <div className="bg-white rounded-lg shadow-md p-5">
                <h3 className="text-xl font-medium mb-4">Line Chart</h3>
                <div className="h-40">
                  <Line options={options} data={data} />
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
                        <th className="px-4 py-2">#</th>
                        <th className="px-4 py-2">Nama Siswa</th>
                        <th className="px-4 py-2">Kelas</th>
                        <th className="px-4 py-2">Ranking</th>
                      </tr>
                    </thead>
                    <tbody>
                      {studentRanking.map((student, index) => (
                        <tr key={index}>
                          <td className="border px-4 py-2">{index + 1}</td>
                          <td className="border px-4 py-2">{student.name}</td>
                          <td className="border px-4 py-2">{student.class}</td>
                          <td className="border px-4 py-2">{student.rank}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <Button varian="secondary"
                  onClick={handleDetailRankingClick}>Detail Ranking</Button>
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
        <h2 className="text-center my-4 text-2xl font-bold">{dashboardTitle}</h2>
        <div className="bg-gray-100 p-6 rounded-md">
          <div className="flex flex-wrap">
            <div className="w-full md:w-1/2 xl:w-1/3 p-3">
              <div className="bg-white rounded-lg shadow-md p-5">
                <h3 className="text-xl font-medium mb-4">Ranking Kelas</h3>
                <div className="text-center text-3xl font-bold p-4 rounded-lg shadow-md bg-blue-200">{kelasRank}</div>
              </div>
            </div>
            <div className="w-full md:w-1/2 xl:w-1/3 p-3">
              <div className="bg-white rounded-lg shadow-md p-5">
                <h3 className="text-xl font-medium mb-4">Ranking Angkatan</h3>
                <div className="text-center text-3xl font-bold p-4 rounded-lg shadow-md bg-green-200">{angkatanRank}</div>
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
  const { role } = context.req.cookies;
  return {
    props: {
      role: role,
    },
  };
}
