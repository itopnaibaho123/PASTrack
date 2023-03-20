import { useRouter } from "next/router";
import React from "react";
import Button from "./Button";
import { B, H2, H3, P } from "./Typography";
import { POSTINGAN_TUGAS } from "@/components/Hooks/Tugas";
import { deleteTugas } from "@/components/Hooks/Tugas";
import { getCookie } from "@/components/Helper/cookies";

export default function ({
	kodePostingan,
	judulPostingan,
	mataPelajaran, 
	tanggalDeadline,
	deskripsi
}) {

	// bikin function delete 
	
    const router = useRouter()
	const handleDelete = async () => {
		const token = getCookie("token");
		try {
		  await deleteTugas(`${POSTINGAN_TUGAS}${kodePostingan}`, token);
		  router.push("/postingan");
		} catch (error) {
			/* Disini masih error logic */
		  console.error(error);
		  alert("Failed to delete the postingan");
		}
	  };
	
    return (
			<div className="align-middle inline-block min-w-full shadow overflow-hidden">
				{/* create grid 2 card */}
					<div className="grid grid-cols-1 gap-y-4">
						<div className="bg-orange-100 border-4 border-orange-200 rounded p-4">
							<div className="flex justify-between items-center">
								<div className="flex items-center">
									<div className="flex">
										<div className="flex flex-col">
											<h1 className="text-xl font-medium"> {judulPostingan} </h1>
											<h1 className="text-xl font-medium"> {mataPelajaran}</h1>
											<h1 className="text-xl font-medium"> {tanggalDeadline}</h1>
												<p className="text-gray-500"> {deskripsi} </p>
												</div>
												{/* button end */}
												<div className="flex flex-col w-full items-end justify-end">
                                                    <div className="py-1">
                                                        <Button onClick={()=> router.push(`${router.asPath}/edit/${kodePostingan}`)}>Edit Tugas</Button>
                                                    </div>
													/* This Button Hapus Tugas */
                                                    <div className="mt-2">
													<Button onClick={handleDelete}>Hapus Tugas</Button>
                                                    </div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
	                	</div>
  );
}
