import Button from "@/components/Button";
export default function StudentAddPage() {
	const students = [
		"Amelia",
		"Bella",
		"Karlina",
		"Sintia",
		"Sabyna",
		"Udin",
		"Ainun",
		"Caryn",
		"Kylie",
		"Dyta",
	];

	return (
			<div className="bg-white p-16">
				<div className="flex justify-between items-center mb-8">
					<div className="">
						<h1 className="text-2xl font-medium">Tambah Siswa</h1>
						<p className="mt-4">
							Daftar Siswa yang ingin ditambahkan
						</p>
					</div>
				</div>
				<div className="flex flex-col">
					{/* create form */}
					<form>
						{/* checkbox */}
						<div className="mb-4">
							<div className="flex flex-col">
								{students.map((student) => (
									<label className="flex items-center" key={student}>
										<input
											className="mr-2 accent-blue-500 w-4 h-4"
											type="checkbox"
											name="student"
											value={student}
										/>
										<span className="text-gray-700">{student}</span>
									</label>
								))}
							</div>
						</div>
						{/* button */}
						<div className="flex justify-end mt-8">
                        <Button
                            variant="primary"
                            onClick={() => router.push("/kelas/CreateKelas")}
                            >
                            Simpan
                        </Button>
						</div>
					</form>
				</div>
			</div>
	);
}