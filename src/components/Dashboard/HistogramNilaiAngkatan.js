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
import { useEffect, useState, useContext } from "react";
import { FormModalContext } from "../context/FormModalContext";
import { Bar } from "react-chartjs-2";
import { getCookie } from "../Helper/cookies";
import { getListDataHisto } from "../Hooks/DashboardGuru";

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
export default function HistogramNilaiAngkatan(options, name, kategori) {
  const { setFormData, formData } = useContext(FormModalContext);
  const {data, setData,  } = useState({});
    const { setRenderData, renderData } = useState();

  async function fetchData(id) {
    try {
      const token = getCookie("token");
      // const username = getCookie("username")
      //   console.log(token)
      const tempData = await getListDataHisto(id, token);
      setData(tempData);
        
    //   const labels = Object.keys(data);
      //   console.log(getCookie("token"))

    //   if (data != null) {
    //     setRenderData({
    //       labels,
    //       datasets: [
    //         {
    //           label: kategori,
    //           data: Object.values(data),
    //           borderColor: "rgb(14, 49, 120)",
    //           backgroundColor: "rgba(14, 49, 120, 1)",
    //         },
    //       ],
    //     });
    //   }
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    // if (typeof window !== undefined) {
      console.log(name)
      fetchData(formData[name]);
    // }
  }, [formData]);
//   const labels = kategori
//   const data = Object.values(data)



const labels = [
    "Semester 1",
    "Semester 2",
    "Semester 3",
    "Semester 4",
    "Semester 5",
  ];
const data2 = {
    labels,
    datasets: [
      {
        label: "Histogram Distribusi Nilai Angkatan",
        data: ["50", "65", "95", "70", "90"],
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 213, 3, 1)",
      },
    ],
  };
  return (
    <Bar
      options={options}
      data={data2}
    />
  );
}
