import Button from "@/components/Button";
import StudentCard from "@/components/StudentCard";
import { B, H3 } from "@/components/Typography";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { MATPEL_LIST_SISWA } from "@/components/Hooks/Matpel";
import { getListSiswa } from "@/components/Hooks/Matpel";
import checkRole from "@/components/Helper/CheckRole";
import Head from "next/head";
import Breadcrumb from "@/components/Breadcrumb";

export default function index(props) {
  const router = useRouter();
  const [listMurid, setListMurid] = useState(props.siswa); // Menyimpan daftar kelas
  const [searchQueryMurid, setSearchQueryMurid] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const muridPerPage = 10;

  const filteredMurid = listMurid.filter(
    (murid) =>
      murid.nama.toLowerCase().includes(searchQueryMurid.toLowerCase())
  )

  // Calculate pagination values
  const indexOfLastMurid = currentPage * muridPerPage;
  const indexOfFirstMurid = indexOfLastMurid - muridPerPage;
  const currentMurid = filteredMurid.slice(indexOfFirstMurid, indexOfLastMurid);
  const totalPages = Math.ceil(filteredMurid.length / muridPerPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <div className="h-full flex flex-col">
        <Breadcrumb
          links={[
            { label: "Home", href: "/" },
            { label: "Daftar Mata Pelajaran", href: "/pelajaran" },
            {
              label: `Matpel id: ${props.idMatpel}`,
              href: `/pelajaran/${props.idMatpel}`,
            },
          ]}
          active={`Matpel id: ${props.idMatpel}`}
        />
      </div>
      <div className="flex flex-col gap-3 p-5">
        <Head>
          <title>{`Mata Pelajaran`}</title>
        </Head>
        <div className="flex flex-col text-center items-center gap-4">
          <H3>Daftar Murid Mata Pelajaran</H3>
          <div className="flex justify-center gap-3">
            <Button onClick={() => router.back()}>Back</Button>
            <Button
              variant="secondary"
              onClick={() => router.push(`${router.asPath}/komponen`)}
            >
              Lihat Komponen
            </Button>
          </div>
        </div>
        <table className="table-auto shadow-lg">
          <thead>
            <tr>
              <th className="px-4 py-2 bg-blue-800 text-white">Nama Siswa</th>
              <th className="px-4 py-2 bg-blue-800 text-white">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {currentMurid.map((student, index) => {
              const { nama, username } = student;
              return (
                <tr
                  key={index}
                  className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
                >
                  <td className="border px-4 py-2">{nama}</td>
                  <td className="border px-4 py-2 text-center">
                    <Button
                      variant="secondary"
                      onClick={() => router.push(`${router.asPath}/siswa/${username}`)}
                    >
                      Lihat Nilai
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {totalPages > 1 && (
          <div className="flex justify-end mt-4 gap-2 pr-5">
            {" "}
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
  );
}


export async function getServerSideProps(context) {
  // context.req.query
  const authentications = checkRole(context, ["GURU"]);
  if (!authentications.tokenTrue) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  const { role, token } = context.req.cookies;

  if (authentications.rolesTrue) {
    if (role === "GURU") {
      const siswa = await getListSiswa(
        `${MATPEL_LIST_SISWA}${context.query.idMatpel}`,
        token
      );

      return {
        props: {
          role: role,
          siswa: siswa,
          idMatpel: context.query.idMatpel,
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
