import FormModalContextProvider from "@/components/context/FormModalContext";
import FormKomponen from "@/components/Form/FormKomponen";
import Table from "@/components/Table";
import TableBodyKomponen from "@/components/Table/TableBodyKomponen";
import TableHead from "@/components/Table/TableHead";
import React from "react";
import Button from "@/components/Button";
import checkRole from "@/components/Helper/CheckRole";
import { useRouter } from "next/router";
import { H3, H2, B } from "@/components/Typography";
import Head from "next/head";
import Breadcrumb from "@/components/Breadcrumb";
import { useState } from "react";
import {
  getListKomponenSiswa,
  KOMPONENSISWA,
} from "@/components/Hooks/KomponenSiswa";

export default function komponen(props) {
  const [currentPage, setCurrentPage] = useState(1);

  const kelasPerPage = 15;
  const indexOfLastKelas = currentPage * kelasPerPage;
  const indexOfFirstKelas = indexOfLastKelas - kelasPerPage;
  const currentKelas = props.komponen.slice(
    indexOfFirstKelas,
    indexOfLastKelas
  );
  const totalPages = Math.ceil(props.komponen.length / kelasPerPage);
  const router = useRouter();
  console.log(props.komponen);

  const kalkulasi = () => {
    let a = 0;
    props.komponen.map((item, index) => {
      a = a + ((item["bobot"] * item["nilai"])/100);
    });

    return a;
  };

  if (props.role === "MURID") {
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
              {
                label: `${props.username}`,
                href: `${router.asPath}`,
              },
            ]}
            active={props.username}
          />
        </div>
        <div className="flex flex-col p-8">
          <Head>
            <title>List Komponen</title>
          </Head>
          <div className="flex flex-col text-center items-center">
            <H2>Daftar Komponen</H2>
          </div>
          <div className="flex justify-center gap-2">
            <Button onClick={() => router.back()}>Kembali</Button>
          </div>
          <div className="flex flex-wrap justify-start gap-2 py-2">
            <table className="w-full border-collapse rounded-full shadow-md">
              <thead>
                <tr>
                  <th
                    className="border p-2"
                    style={{ backgroundColor: "#000080", color: "white" }}
                  >
                    Komponen Penilaian
                  </th>
                  <th
                    className="border p-2"
                    style={{ backgroundColor: "#000080", color: "white" }}
                  >
                    Bobot Penilaian
                  </th>
                  <th
                    className="border p-2"
                    style={{ backgroundColor: "#000080", color: "white" }}
                  >
                    Nilai
                  </th>
                  <th
                    className="border p-2"
                    style={{ backgroundColor: "#000080", color: "white" }}
                  >
                    Kalkulasi Bobot Nilai
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentKelas.map((komponen, index) => {
                  const rowBackgroundColor =
                    index % 2 === 0 ? "bg-white" : "bg-gray-200";

                  return (
                    <tr key={index} className={rowBackgroundColor}>
                      <td className="border p-2">{komponen["namaKomponen"]}</td>
                      <td className="border p-2">{komponen.bobot}</td>
                      <td className="border p-2">{komponen.nilai}</td>
                      <td className="border p-2">{`${
                        (komponen.nilai * komponen.bobot) / 100
                      }%`}</td>
                    </tr>
                  );
                })}
                <tr className="bg-main-color-yellow">
                  <td colSpan={4} className="border py-4 px-2">
                    <B>{`Total semua komponen ${kalkulasi()}%`}</B>
                  </td>
                </tr>
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
  } else {
    console.log(props.komponen);
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
              {
                label: `${props.username}`,
                href: `${router.asPath}`,
              },
            ]}
            active={props.username}
          />
        </div>
        <div className="flex flex-col p-8">
          <Head>
            <title>List Komponen</title>
          </Head>
          <div className="flex flex-col text-center items-center">
            <H2>Daftar Komponen</H2>
          </div>
          <div className="flex justify-center gap-2">
            <Button onClick={() => router.back()}>Kembali</Button>
            <Button
              variant="secondary"
              onClick={() =>
                router.push(`/pelajaran/${props.idMatpel}/komponen`)
              }
            >
              Lihat Komponen
            </Button>
          </div>
          <div className="flex flex-wrap justify-start gap-2 py-2">
            <table className="w-full border-collapse rounded-full shadow-md">
              <thead>
                <tr>
                  <th
                    className="border p-2"
                    style={{ backgroundColor: "#000080", color: "white" }}
                  >
                    Komponen Penilaian
                  </th>
                  <th
                    className="border p-2"
                    style={{ backgroundColor: "#000080", color: "white" }}
                  >
                    Bobot Penilaian
                  </th>
                  <th
                    className="border p-2"
                    style={{ backgroundColor: "#000080", color: "white" }}
                  >
                    Nilai
                  </th>
                  <th
                    className="border p-2"
                    style={{ backgroundColor: "#000080", color: "white" }}
                  >
                    Kalkulasi Bobot Nilai
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
                {currentKelas.map((komponen, index) => {
                  const rowBackgroundColor =
                    index % 2 === 0 ? "bg-white" : "bg-gray-200";

                  return (
                    <tr key={index} className={rowBackgroundColor}>
                      <td className="border p-2">{komponen["namaKomponen"]}</td>
                      <td className="border p-2">{komponen.bobot}</td>
                      <td className="border p-2">{komponen.nilai}</td>
                      <td className="border p-2">{`${
                        (komponen.nilai * komponen.bobot) / 100
                      }%`}</td>
                      <td className="border p-2">
                        <div className="flex justify-center gap-2">
                          <Button
                            variant="primary"
                            onClick={() =>
                              router.push(
                                `/pelajaran/${props.idMatpel}/siswa/${props.username}/${komponen.id}`
                              )
                            }
                          >
                            Edit Komponen
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
                <tr className="bg-main-color-yellow">
                  <td colSpan={5} className="border py-4 px-2">
                    <B>{`Total semua komponen ${kalkulasi()}`}</B>
                  </td>
                </tr>
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
}

export async function getServerSideProps(context) {
  // context.req.query
  const authentications = checkRole(context, ["GURU", "MURID"]);
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
    if ((role === "GURU", "MURID")) {
      const komponen = await getListKomponenSiswa(
        `${KOMPONENSISWA}${context.query.idMatpel}/siswa/${context.query.username}`,
        token
      );

      return {
        props: {
          role: role,
          komponen: komponen,
          idMatpel: context.query.idMatpel,
          username: context.query.username,
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
