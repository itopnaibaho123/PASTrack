import React from 'react'
import StudentCard from "@/components/StudentCard";
import checkRole from '@/components/Helper/CheckRole';
import { H2 } from '@/components/Typography';
import Button from '@/components/Button';
import { useRouter } from 'next/router';
import Head from 'next/head';
import SemesterCard from '@/components/SemesterCard';
import { LIST_SEMESTER_KELAS, getAllListSemester } from '@/components/Hooks/Kelas';

export default function index(props) {
  const router = useRouter()
  return (
    <div className="flex flex-col p-5">
      <Head>
        <title>{`Page List Semester`}</title>
      </Head>
      <div className="flex flex-col text-center items-center">
        <H2>Kelola Semester</H2>
      </div>
      <div className="flex justify-center gap-2 ">
        <Button onClick={() => router.back()}>Kembali</Button>
        {props.role === "ADMIN" && (
          <Button
            variant="secondary"
            onClick={() => router.push(`${router.asPath}/create`)}
          >
            Tambah Semester
          </Button>
        )}
      </div>

      <div className="flex flex-wrap justify-center gap-2 py-2">
        {props.semester.map((semester) => (
          <SemesterCard
            key={semester.id}
            semester={semester.semester}
            awalTahunAjaran={semester.awalTahunAjaran}
            akhirTahunAjaran={semester.akhirTahunAjaran}
          />
        ))}
      </div>
    </div>
  )
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
  const { role, token } = context.req.cookies;

  if (authentications.rolesTrue) {
    if (role === "ADMIN") {
      const semester = await getAllListSemester(`${LIST_SEMESTER_KELAS}`, token);

      return {
        props: {
          role: role,
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
