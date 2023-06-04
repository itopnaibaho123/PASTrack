import CardKelas from "@/components/CardKelas";
import { H2, H3 } from "@/components/Typography";
import React, { useState } from "react";
import Button from "@/components/Button";
import { KELAS } from "@/components/Hooks/Kelas";
import { getAllKelas, deleteKelas, HAPUS_KELAS } from "@/components/Hooks/Kelas";
import { useRouter } from "next/router";
import checkRole from "@/components/Helper/CheckRole";
import { getListSemester } from "@/components/Hooks/Semester";
import { getListGuru } from "@/components/Hooks/Guru";
import { GURU_KELAS } from "@/components/Hooks/Guru";
import Head from "next/head";
import { FaSearch } from "react-icons/fa";

export default function Index(props) {
  const router = useRouter();
  const [listKelas, setListKelas] = useState(props.list_kelas); // Menyimpan daftar kelas
  const [searchQueryGuru, setSearchQueryGuru] = useState("");
  const [searchQueryKelas, setSearchQueryKelas] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const kelasPerPage = 15;

  const filteredKelas = props.list_kelas.filter(
    (kls) =>
      kls.namaGuru.toLowerCase().includes(searchQueryGuru.toLowerCase()) ||
      kls.namaKelas.toLowerCase().includes(searchQueryKelas.toLowerCase())
  );

  const handleSearchGuru = (e) => {
    setSearchQueryGuru(e.target.value);
  };

  const handleSearchKelas = (e) => {
    setSearchQueryKelas(e.target.value);
  };

  // Calculate pagination values
  const indexOfLastKelas = currentPage * kelasPerPage;
  const indexOfFirstKelas = indexOfLastKelas - kelasPerPage;
  const currentKelas = filteredKelas.slice(indexOfFirstKelas, indexOfLastKelas);
  const totalPages = Math.ceil(filteredKelas.length / kelasPerPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleDeleteKelas = async (idKelas) => {
    try {
      await deleteKelas(`${HAPUS_KELAS}${idKelas}`, props.token);
      console.log("Kelas berhasil dihapus!");

      // Perbarui daftar kelas setelah penghapusan
      const updatedKelas = listKelas.filter((kls) => kls.idKelas !== idKelas);
      setListKelas(updatedKelas);
      // Perbarui halaman dengan mengarahkan pengguna ke halaman yang sama
      router.replace(router.asPath);
    } catch (error) {
      console.error("Gagal menghapus kelas:", error);
    }
  };

  return (
    <div className="flex flex-col p-8">
      <Head>
        <title>Page List Kelas</title>
      </Head>
      <div className="flex flex-col text-center items-center">
        <H2>Daftar Kelas</H2>
      </div>
      <div className="flex justify-center gap-2">
        <Button onClick={() => router.back()}>Kembali</Button>
        <Button
          variant="secondary"
          onClick={() => router.push("/kelas/CreateKelas")}
        >
          Tambah Kelas
        </Button>
      </div>
      <div className="flex flex-wrap justify-start gap-2 py-2">
        <div className="mb-4">
          <div className="flex items-center border p-2 rounded-md shadow-sm border-blue-300">
            <FaSearch className="mr-2 text-blue-500" /> {/* Ikon pencarian */}
            <input
              type="text"
              placeholder="Cari wali kelas..."
              value={searchQueryGuru}
              onChange={handleSearchGuru}
              className="border-none focus:outline-none flex-grow"
              style={{ backgroundColor: "transparent" }}
            />
          </div>
        </div>
        <div className="mb-4">
          <div className="flex items-center border p-2 rounded-md shadow-sm border-blue-300">
            <FaSearch className="mr-2 text-blue-500" /> {/* Ikon pencarian */}
            <input
              type="text"
              placeholder="Cari nama kelas..."
              value={searchQueryKelas}
              onChange={handleSearchKelas}
              className="border-none focus:outline-none flex-grow"
              style={{ backgroundColor: "transparent" }}
            />
          </div>
        </div>
        <table className="w-full border-collapse rounded-full shadow-md">
          <thead>
            <tr>
              <th className="border p-2" style={{ backgroundColor: "#000080", color: "white" }}>Kelas</th>
              <th className="border p-2" style={{ backgroundColor: "#000080", color: "white" }}>Semester</th>
              <th className="border p-2" style={{ backgroundColor: "#000080", color: "white" }}>Wali Kelas</th>
              <th className="border p-2" style={{ backgroundColor: "#000080", color: "white" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentKelas.map((kls, index) => {
              const semester = props.semester.find((s) => s.id === kls.semesterId);
              const awalSemester = new Date(semester.awalTahunAjaran).toLocaleDateString("id-ID");
              const akhirSemester = new Date(semester.akhirTahunAjaran).toLocaleDateString("id-ID");
              const guru = props.list_guru.find((g) => g.username === kls.usernameGuru);

              kls.namaGuru = guru ? guru.nama : "-";

              const rowBackgroundColor = index % 2 === 0 ? "bg-white" : "bg-gray-200";

              return (
                <tr key={kls.idKelas} className={rowBackgroundColor}>
                  <td className="border p-2">{kls.namaKelas}</td>
                  <td className="border p-2">{`${semester.semester ? "Ganjil" : "Genap"
                    } ${awalSemester} - ${akhirSemester}`}</td>
                  <td className="border p-2">{guru ? guru.nama : "-"}</td>
                  <td className="border p-2">
                    <div className="flex justify-center gap-2">
                      <Button
                        variant="secondary"
                        onClick={() => router.push(`${router.asPath}/${kls.idKelas}`)}
                      >
                        Detail Kelas
                      </Button>
                      <Button
                        variant="delete"
                        onClick={() => handleDeleteKelas(kls.idKelas)}
                      >
                        Hapus Kelas
                      </Button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {totalPages > 1 && (
        <div className="flex justify-end mt-4 gap-2"> {/* Use "justify-end" class to align buttons to the right */}
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
  const authentications = checkRole(context, ["ADMIN"]);
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
    if (role === "ADMIN") {
      const list_kelas = await getAllKelas(`${KELAS}`, token);
      const semester = await getListSemester();
      const list_guru = await getListGuru(`${GURU_KELAS}`, token);
      // add "namaGuru" property to each kls object based on the teacher's username
      list_kelas.forEach((kls) => {
        const guru = list_guru.find((g) => g.username === kls.usernameGuru);
        if (guru) {
          kls.namaGuru = guru.nama;
        }
      });
      return {
        props: {
          role: role,
          list_kelas: list_kelas,
          semester: semester,
          list_guru: list_guru,
          token: token,
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
