import { useRouter } from "next/router";
import { H1, H3 } from "@/components/Typography";
import React from "react";
import Button from "@/components/Button";
import Table from "@/components/Table";
import TableBody from "@/components/Table/TableBody";
import TableHead from "@/components/Table/TableHead";
import { getMatpelByKelas } from "@/components/Hooks/Matpel";
import { getSiswaByKelas, getKelas } from "@/components/Hooks/Murid";
import { API_KELAS } from "@/components/Hooks/Murid";
import checkRole from "@/components/Helper/CheckRole";

export default function detailKelas(props) {
  const router = useRouter();
	const id = router.query.id;

	// TODO: get class detail
	const matpel = props.matpel;
	const students = props.students;
  return (
    <div className="flex flex-col place-items-center p-10 gap-4">
      <div>
      <img width={250} height={250} src="/assets/PASTrack.svg"/>
      </div>
      <div className="bg-blue-100 p-16">
				<div className="flex justify-between items-center mb-8">
					<div className="max-w-xl">
						<h1 className="text-2xl font-medium">{props.kelas.namaKelas}</h1>
						<p className="mt-4">
							{/* Ini adalah kelas IPA 1. Dengan peminatan IPA. */}
							{`Ini adalah kelas ${props.kelas.namaKelas}. Dengan Peminatan IPA`}
						</p>
					</div>
					<Button
						onClick={() => router.push(`${router.asPath}/mapel/add`)}
						className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg">
						Tambah Mata Pelajaran
					</Button>
				</div>
				{/* subject chips */}
				<div className="flex flex-wrap gap-2">
					{matpel.map((s) => (
						<div className="bg-white text-emerald-500 border border-blue-500 px-4 py-2 rounded-lg">
							{s.namaMataPelajaran}
						</div>
					))}
				</div>
			</div>
			<div className="bg-white p-16">
				<div className="flex flex-col">
					<div className="flex justify-between items-center mb-8">
						<div className="max-w-xl">
							<h1 className="text-2xl font-medium">Daftar Siswa</h1>
						</div>
						<Button
							onClick={() => router.push(`${router.asPath}/siswa/add`)}
							className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg">
							Tambah Siswa
						</Button>
					</div>
					{/* card separated with line */}
					<div className="mt-0">
						<div className="flex justify-between items-center mb-8 border border-gray-500 rounded-lg">
							<ul className="w-full">
								{students.map((s) => (
									<li className="border-b border-gray-500 w-full py-2 px-4">{s.nama}</li>
								))}
							</ul>
						</div>
					</div>
					<div className="overflow-x-auto">
						<div className="align-middle inline-block min-w-full shadow overflow-hidden">
							{/* create grid 2 card */}
						</div>
					</div>
				</div>
			</div>
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
	const { role, token } = context.req.cookies;
  
	if (authentications.rolesTrue) {
	  if (role === "ADMIN") {
		const students = await getSiswaByKelas(`${API_KELAS}${context.query.id}/siswa`, token);
		const matpel = await getMatpelByKelas(`${API_KELAS}${context.query.id}/matpel`, token);
		const kelas = await getKelas(`${API_KELAS}${context.query.id}`, token);
		
		return {
		  props: {
			role: role,
			students: students,
			matpel: matpel,
			kelas: kelas
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