import CardSubject from "@/components/CardSubject";
import { H1, H2 } from "@/components/Typography";
import React, { useState } from "react";
import Button from "@/components/Button";
import { useRouter } from "next/router";
import { MATPEL_GURU } from "@/components/Hooks/Matpel";
import { getAllMatpel } from "@/components/Hooks/Matpel";
import checkRole from "@/components/Helper/CheckRole";
import { getListSemester } from "@/components/Hooks/Semester";
import Head from "next/head";
import Breadcrumb from "@/components/Breadcrumb";
import { FaSearch } from "react-icons/fa";
export default function Index(props) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const matpelPerPage = 10;

  const filteredMatpel = props.matpel.filter((matkul) =>
    matkul.namaMataPelajaran.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  // Calculate pagination values
  const indexOfLastMatpel = currentPage * matpelPerPage;
  const indexOfFirstMatpel = indexOfLastMatpel - matpelPerPage;
  const currentMatpel = filteredMatpel.slice(indexOfFirstMatpel, indexOfLastMatpel);
  const totalPages = Math.ceil(filteredMatpel.length / matpelPerPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  return (
    <div>
      <div className="h-full flex flex-col">
        <Breadcrumb
          links={[
            { label: "Home", href: "/" },
            { label: "Daftar Pelajaran", href: "/pelajaran" },
          ]}
          active={"Daftar Pelajaran"}
        />
      </div>

      <div className="flex flex-col p-5">
        <Head>
          <title>Page List Mata Pelajaran</title>
        </Head>
        <div className="flex flex-col text-center items-center">
          <H2>Kelola Mata Pelajaran</H2>
        </div>
        <div className="flex justify-center gap-2">
          <Button onClick={() => router.back()}>Kembali</Button>
          {props.role === "GURU" && (
            <Button
              variant="secondary"
              onClick={() => router.push("/pelajaran/CreatePelajaran")}
            >
              Tambah Mata Pelajaran
            </Button>
          )}
        </div>
        <div className="flex flex-wrap justify-start gap-2 py-2">
          <div className="mb-4">
            <div className="flex items-center border p-2 rounded-md shadow-sm border-blue-300">
              <FaSearch className="mr-2 text-blue-500" /> {/* Ikon pencarian */}
              <input
                type="text"
                placeholder="Cari mata pelajaran..."
                value={searchQuery}
                onChange={handleSearch}
                className="border-none focus:outline-none flex-grow"
                style={{ backgroundColor: "transparent" }}
              />
            </div>
          </div>
          <table className="w-full border-collapse rounded-full shadow-md">
            <thead>
              <tr>
                <th
                  className="border p-2"
                  style={{ backgroundColor: "#000080", color: "white" }}
                >
                  Mata Pelajaran
                </th>
                <th
                  className="border p-2"
                  style={{ backgroundColor: "#000080", color: "white" }}
                >
                  Semester
                </th>
                {props.role === "GURU" && (
                  <th
                    className="border p-2"
                    style={{ backgroundColor: "#000080", color: "white" }}
                  >
                    Action
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              {currentMatpel.map((matkul, index) => {
                const semester = props.semester.find(
                  (s) => s.id === matkul.semester.id
                );
                const awalSemester = new Date(
                  semester.awalTahunAjaran
                ).toLocaleDateString("id-ID");
                const akhirSemester = new Date(
                  semester.akhirTahunAjaran
                ).toLocaleDateString("id-ID");
                return (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
                  >
                    <td className="border p-2">{matkul.namaMataPelajaran}</td>
                    <td className="border p-2">
                      {`Semester: ${semester.semester ? "Ganjil" : "Genap"
                        } ${awalSemester} - ${akhirSemester}`}
                    </td>
                    {props.role === "GURU" && (
                      <td className="border p-2 text-center">
                        <Button
                          onClick={() =>
                            router.push(`/pelajaran/${matkul.id}`)
                          }
                          variant="secondary"
                        >
                          Kelola Penilaian
                        </Button>
                      </td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
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
  );
}


export async function getServerSideProps(context) {
  const authentications = checkRole(context, ["GURU", "MURID"]);
  if (!authentications.tokenTrue) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  const { role, token, username } = context.req.cookies;

  if (authentications.rolesTrue) {
    if ((role === "GURU", "MURID")) {
      const matpel = await getAllMatpel(`${MATPEL_GURU}${username}`, token);
      const semester = await getListSemester();
      
      return {
        props: {
          role: role,
          matpel: matpel,
          semester: semester,
        },
      };
    }
  } else {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
}
