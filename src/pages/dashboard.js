import checkRole from "@/components/Helper/CheckRole";
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

export const optionsBar = {
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: "Bar Chart Rata-rata nilai",
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
      text: "Perkembangan nilai Siswa",
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

export default function dashboard(props) {
  const API_ROUTE = process.env.NEXT_PUBLIC_API_ROUTE;
  console.log(API_ROUTE);
  if (props.role === "GURU") {
    return (
      <div className="ml-auto mr-auto px-56">
        {/* <img width={1400} height={1400} src="/assets/PASTrack.svg"></img> */}
        
        <div className="h-25 w-25">
          <Bar options={optionsBar} data={data} />
        </div>
        <div className="h-25 w-25">
          <Bar options={optionsBar} data={data2} />
        </div>
        
      </div>
    );
  }
  else if (props.role === "MURID"){
    return (
        <div className="ml-auto mr-auto px-56">
         
          <div className="h-25 w-25">
            <Line options={options} data={data} />
          </div>
          <div className="h-25 w-25">
            <Line options={options} data={data} />
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
