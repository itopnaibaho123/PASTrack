import Button from "@/components/Button";

export default function SubjectAddPage() {
	const subjects = ["Matematika", "Bahasa Indonesia", "Bahasa Inggris", "IPA", "IPS"];

	return (

			<div className="bg-white p-16">
				<div className="flex justify-between items-center mb-8">
					<div className="">
						<h1 className="text-2xl font-medium">Tambah Mata Pelajaran</h1>
						<p className="mt-4">
							Daftar Mata Pelajaran yang bisa diambil
						</p>
					</div>
				</div>
				<div className="flex flex-col">
					{/* create form */}
					<form>
						{/* checkbox */}
						<div className="mb-4">
							<div className="flex flex-col">
								{subjects.map((subject) => (
									<label className="flex items-center" key={subject}>
										<input
											className="mr-2 accent-blue-500 w-4 h-4"
											type="checkbox"
											name="subject"
											value={subject}
										/>
										<span className="text-gray-700">{subject}</span>
									</label>
								))}
							</div>
						</div>
						{/* button */}
						<div className="flex justify-end mt-8">
                        <Button
                            variant="secondary"
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