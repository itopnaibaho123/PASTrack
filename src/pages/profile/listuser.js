import Table from "@/components/Table";
import TableHead from "@/components/Table/TableHead";
import React, { useState, useEffect } from "react";
import checkRole from "@/components/Helper/CheckRole";
import axios from "axios";
import { getCookie } from "@/components/Helper/cookies";
import { P } from "@/components/Typography";
import TableBody from "@/components/Table/TableBody";
import { useRouter } from "next/router";
import Button from "@/components/Button";
import { H2, H3 } from "@/components/Typography";
import Head from "next/head";
import { Road_Rage } from "next/font/google";
import Breadcrumb from "@/components/Breadcrumb";
import { FaSearch } from "react-icons/fa";

export default function list(props) {
    const [listUser, setListUser] = useState(props.data); // Menyimpan daftar pengguna
    const [searchQueryNama, setSearchQueryNama] = useState("");
    const [searchQueryUsername, setSearchQueryUsername] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 15;
  
    const handleSearchNama = (e) => {
      setSearchQueryNama(e.target.value);
      setCurrentPage(1); // Reset halaman saat melakukan pencarian
    };
  
    const handleSearchUsername = (e) => {
      setSearchQueryUsername(e.target.value);
      setCurrentPage(1); // Reset halaman saat melakukan pencarian
    };
  
    useEffect(() => {
      // Filter daftar pengguna berdasarkan query pencarian
      const filteredUsers = props.data.filter(
        (user) =>
          user.nama.toLowerCase().includes(searchQueryNama.toLowerCase()) &&
          user.username.toLowerCase().includes(searchQueryUsername.toLowerCase())
      );
  
      setListUser(filteredUsers);
    }, [searchQueryNama, searchQueryUsername, props.data]);
  
    // Calculate pagination values
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = listUser.slice(indexOfFirstUser, indexOfLastUser);
    const totalPages = Math.ceil(listUser.length / usersPerPage);
  
    const paginate = (pageNumber) => {
      setCurrentPage(pageNumber);
    };
  

  const router = useRouter();

  if (!props.data) {
    return (
      <div>
        <P>KOSONG BOSS</P>
      </div>
    );
  }

  let keys = Object.keys(props.data[0]);

  return (
    <>
      <div>
        <div className="h-full flex flex-col">
          <Breadcrumb
            links={[
              { label: "Home", href: "/" },
              { label: "Daftar User", href: router.asPath },
            ]}
            active={"Daftar User"}
          />
        </div>
        <div className="flex flex-col p-8">
          <Head>
            <title>List User</title>
          </Head>
          <div className="flex flex-col text-center items-center">
            <H2>Daftar User</H2>
          </div>
          <div className="flex justify-center gap-2">
            <Button onClick={() => router.back()}>Kembali</Button>
            <Button
              variant="secondary"
              onClick={() => router.push("/registrasi/Guru")}
            >
              Tambah Guru
            </Button>
            <Button
              variant="secondary"
              onClick={() => router.push("/registrasi/Siswa")}
            >
              Tambah Murid
            </Button>
          </div>
          <div className="flex flex-wrap justify-start gap-2 py-2">
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
            <div className="mb-4">
              <div className="flex items-center border p-2 rounded-md shadow-sm border-blue-300">
                <FaSearch className="mr-2 text-blue-500" />{" "}
                {/* Ikon pencarian */}
                <input
                  type="text"
                  placeholder="Cari Username..."
                  value={searchQueryUsername}
                  onChange={handleSearchUsername}
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
                    Username
                  </th>
                  <th
                    className="border p-2"
                    style={{ backgroundColor: "#000080", color: "white" }}
                  >
                    Nama
                  </th>
                  <th
                    className="border p-2"
                    style={{ backgroundColor: "#000080", color: "white" }}
                  >
                    Role
                  </th>
                  <th
                    className="border p-2"
                    style={{ backgroundColor: "#000080", color: "white" }}
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentUsers.map((user, index) => {
                  const rowBackgroundColor =
                    index % 2 === 0 ? "bg-white" : "bg-gray-200";

                  return (
                    <tr key={index} className={rowBackgroundColor}>
                      <td className="border p-2">{user.username}</td>
                      <td className="border p-2">{user.nama}</td>
                      <td className="border p-2">{user.role}</td>
                      <td className="border p-2">
                        <div className="flex justify-center gap-2">
                          <Button
                            variant="secondary"
                            onClick={() =>
                              router.push(`${router.asPath}/${user.username}`)
                            }
                          >
                            Detail User
                          </Button>
                          <Button
                            variant="primary"
                            onClick={() =>
                              router.push(`/profile/${user.username}/EditProfile`)
                            }
                          >
                            Edit User
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
    </>
  );
}

export async function getServerSideProps(context) {
  // context.req.query
  const authentications = checkRole(context, ["ADMIN"]);
  if (!authentications.tokenTrue) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  // const { role, username } = context.req.cookies;
  if (!authentications.rolesTrue) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  let { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_API_ROUTE}api/user/`,
    {
      headers: {
        Authorization: `Bearer ${context.req.cookies.token}`,
      },
    }
  );

  return {
    props: {
      data: data,
    },
  };
}
