import Head from "next/head";
import { B } from "@/components/Typography";
import { useState } from "react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Button from "@/components/Button";
import { getCookie } from "@/components/Helper/cookies";

export default function Home() {
  const [login, setIsLogin] = useState(false);
  const router = useRouter();
  useEffect(() => {
      if (getCookie("token")) {
          setIsLogin(true);
      }
  }, []);
  return (
    <div>
      <Head>
        <title>Landing Page</title>
        <link rel="stylesheet" href="/input.css" />
        <link rel="stylesheet" href="/output.css" />
      </Head>
      <div>
        <header class="bg-gray absolute top-0 left-0 w-full flex items-center z-10"></header>
        <section id="home">
          <div class="w-full relative bg-dark-blue h-[324px] mt-72">
            <div class="container">
              <div class="flex flex-wrap pt-40">
                <div class="w-full flex">
                  <div class="w-1/2 self-center px-4">
                    <img
                      src="../assets/img/union.png"
                      width="444"
                      height="444"
                      alt=""
                      class="absolute -top-12"
                    />
                  </div>
                  <div class="w-1/2 self-end px-4">
                    <div class="w-[377px] h-[228px] bg-gray rounded-lg border-4 border-dark-blue p-10">
                      <h3 class="text-2xl font-bold">
                        Perguruan Advent Salemba
                      </h3>
                      <p class="pt-3">
                        JL Salemba Raya, No. 47, Paseban, Senen, Jakarta Pusat,
                        DKI Jakarta, 10440, Indonesia
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section class="pt-48">
          <div class="container">
            <div class="flex flex-wrap">
              <div class="w-1/2">
                <h1 class="font-bold text-4xl pb-5">PASTrack</h1>
                <p class="py-5 text-justify">
                  PASTrack merupakan sistem informasi terintegrasi yang
                  berfungsi untuk membantu melacak nilai dan pengumuman sekolah.
                </p>
                <p class="text-justify">
                  Proses pengumuman tugas serta perekapan nilai yang dilakukan
                  oleh tenaga pengajar di Perguruan Advent Salemba (PAS) menjadi
                  lebih efisien dengan prinsip transparansi dimana siswa dan
                  orang tua dapat melihat setiap pengumuman tugas serta
                  pencatatan nilai sepanjang semester.
                </p>
                <div className="py-4">
                  {!login && (
                    <Button
                      variant="secondary"
                      onClick={() => router.push("/login")}
                    >
                      <B>{`Login >`}</B>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section class="pt-48">
          <div class="container">
            <div class="w-full text-center">
              <h1 class="font-bold text-4xl py-5">Our Exclusive Features</h1>
            </div>
            <div class="w-full">
              <div class="flex flex-wrap items-start">
                <div class="w-1/3 p-10">
                  <div class="bg-yellow-high rounded-2xl border-4 border-white shadow-lg p-10 text-dark-blue flex flex-col items-center">
                    <img
                      src="../assets/img/stacked_line_chart.png"
                      alt="Feature 1"
                    />
                    <h3 class="font-bold p-5 text-center text-xl">
                      Tracker <br />
                      Progress & Nilai
                    </h3>
                  </div>
                  <p class="text-center px-10 py-10">
                    Lacak progress nilai dan perkembangan siswa untuk mengetahui
                    hasil belajar siswa selama di sekolah.{" "}
                  </p>
                </div>
                <div class="w-1/3 p-10">
                  <div class="bg-yellow-high rounded-2xl border-4 border-white shadow-lg p-10 text-dark-blue flex flex-col items-center">
                    <img
                      src="../assets/img/stacked_bar_chart.png"
                      alt="Feature 2"
                    />
                    <h3 class="font-bold p-5 text-center text-xl">
                      All-in one <br />
                      Dashboard
                    </h3>
                  </div>
                  <p class="text-center px-10 py-10">
                    Satu tampilan Dashboard yang telah mencakup banyak insight
                    mengenai perkembangan siswa.
                  </p>
                </div>
                <div class="w-1/3 p-10">
                  <div class="bg-yellow-high rounded-2xl border-4 border-white shadow-lg p-10 text-dark-blue flex flex-col items-center">
                    <img src="../assets/img/campaign.png" alt="Feature 3" />
                    <h3 class="font-bold p-5 text-center text-xl">
                      Pengumuman <br />
                      Terintegrasi
                    </h3>
                  </div>
                  <p class="text-center px-10 py-10">
                    Pengumuman tugas di dalam satu platform bersama untuk
                    memastikan siswa updated akan informasi terbaru.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section class="pt-40">
          <div class="container">
            <div class="w-full text-center">
              <h1 class="font-bold text-4xl py-5">How to Use</h1>
            </div>

            <div class="w-full">
              <h3 class="font-bold text-2xl py-10">Manajemen Kelas</h3>
              <div class="flex flex-wrap justify-between items-start">
                <div class="w-1/9 justify-center items-center flex flex-col">
                  <img
                    src="../assets/img/icons/people_alt.png"
                    height="34"
                    width="46"
                    alt=""
                  />
                  <p class="text-center font-bold">Login sebagai Guru</p>
                </div>
                <div class="w-1/9 justify-center items-center flex flex-col">
                  <img
                    src="../assets/img/icons/arrow-right.png"
                    height="34"
                    width="46"
                    alt=""
                  />
                </div>
                <div class="w-1/9 justify-center items-center flex flex-col">
                  <img
                    src="../assets/img/icons/library_books.png"
                    height="34"
                    width="46"
                    alt=""
                  />
                  <p class="text-center font-bold">Buat Mata Pelajaran</p>
                </div>
                <div class="w-1/9 justify-center items-center flex flex-col">
                  <img
                    src="../assets/img/icons/arrow-right.png"
                    height="34"
                    width="46"
                    alt=""
                  />
                </div>
                <div class="w-1/9 justify-center items-center flex flex-col">
                  <img
                    src="../assets/img/icons/emoji_people.png"
                    height="34"
                    width="46"
                    alt=""
                  />
                  <p class="text-center font-bold">Daftarkan Siswa</p>
                </div>
                <div class="w-1/9 justify-center items-center flex flex-col">
                  <img
                    src="../assets/img/icons/arrow-right.png"
                    height="34"
                    width="46"
                    alt=""
                  />
                </div>
                <div class="w-1/9 justify-center items-center flex flex-col">
                  <img
                    src="../assets/img/icons/school.png"
                    height="34"
                    width="46"
                    alt=""
                  />
                  <p class="text-center font-bold">Buat Kelas:</p>
                  <ul class="list-disc list-inside font-bold">
                    <li>Masukkan mata pelajaran</li>
                    <li>Masukkan siswa terdaftar</li>
                  </ul>
                </div>
                <div class="w-1/9 justify-center items-center flex flex-col">
                  <img
                    src="../assets/img/icons/arrow-right.png"
                    height="34"
                    width="46"
                    alt=""
                  />
                </div>
                <div class="w-1/9 justify-center items-center flex flex-col">
                  <img
                    src="../assets/img/icons/school.png"
                    height="34"
                    width="46"
                    alt=""
                  />
                  <p class="text-center font-bold">Kelas berhasil terbuat</p>
                </div>
              </div>
            </div>

            <div class="w-full">
              <h3 class="font-bold text-2xl py-10">
                Manajemen Mata Pelajaran & Penilaian
              </h3>
              <div class="flex flex-wrap justify-between items-start">
                <div class="w-1/9 justify-center items-center flex flex-col">
                  <img
                    src="../assets/img/icons/people_alt.png"
                    height="34"
                    width="46"
                    alt=""
                  />
                  <p class="text-center font-bold">Login sebagai Guru</p>
                </div>
                <div class="w-1/9 justify-center items-center flex flex-col">
                  <img
                    src="../assets/img/icons/arrow-right.png"
                    height="34"
                    width="46"
                    alt=""
                  />
                </div>
                <div class="w-1/9 justify-center items-center flex flex-col">
                  <img
                    src="../assets/img/icons/library_books.png"
                    height="34"
                    width="46"
                    alt=""
                  />
                  <p class="text-center font-bold">Buat Mata Pelajaran</p>
                </div>
                <div class="w-1/9 justify-center items-center flex flex-col">
                  <img
                    src="../assets/img/icons/arrow-right.png"
                    height="34"
                    width="46"
                    alt=""
                  />
                </div>
                <div class="w-1/9 justify-center items-center flex flex-col">
                  <img
                    src="../assets/img/icons/emoji_people.png"
                    height="34"
                    width="46"
                    alt=""
                  />
                  <p class="text-center font-bold">Kelola Penilaian</p>
                </div>
                <div class="w-1/9 justify-center items-center flex flex-col">
                  <img
                    src="../assets/img/icons/arrow-right.png"
                    height="34"
                    width="46"
                    alt=""
                  />
                </div>
                <div class="w-1/9 justify-center items-center flex flex-col">
                  <img
                    src="../assets/img/icons/poll_24px.png"
                    height="34"
                    width="46"
                    alt=""
                  />
                  <p class="text-center font-bold">Buat Komponen Penilaian:</p>
                  <ul class="list-disc list-inside font-bold">
                    <li>Masukkan bobot</li>
                    <li>Masukkan nilai</li>
                  </ul>
                </div>
                <div class="w-1/9 justify-center items-center flex flex-col">
                  <img
                    src="../assets/img/icons/arrow-right.png"
                    height="34"
                    width="46"
                    alt=""
                  />
                </div>
                <div class="w-1/9 justify-center items-center flex flex-col">
                  <img
                    src="../assets/img/icons/subject.png"
                    height="48"
                    width="56"
                    alt=""
                  />
                  <p class="text-center font-bold">
                    Mata pelajaran & nilai <br />
                    berhasil terbuat
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
