import Button from "@/components/Button";
import { ALL_MATPEL, ADD_MATPEL_TO_KELAS, NOT_ASSIGNED_MATPEL, getNotAssignedMatpel } from "@/components/Hooks/Matpel";
import checkRole from "@/components/Helper/CheckRole";
import { getAllMatpelByKelas, postMatpelToKelas } from "@/components/Hooks/Matpel";
import FormCheckboxContextProvider from "@/components/context/FormCheckboxContext";
import FormCheckboxSiswa from "@/components/Form/FormCheckboxSiswa";
import Checkbox from "@/components/Checkbox";
import { getCookie } from "@/components/Helper/cookies";
import { useRouter } from "next/router";
import Head from "next/head";
import { H1, H2 } from "@/components/Typography";

export default function SubjectAddPage(props) {
  const mataPelajaran = props.matpel;
  const router = useRouter()
  const id = router.query.id

  return (
    <div className="bg-white p-16">
      <Head>
        <title>{`Page Input Matpel`}</title>
      </Head>
      <div className="flex justify-center items-center mb-8 mt-8">
        <div className="text-center">
          <H2 className="text-2xl font-medium">Tambah Mata Pelajaran ke Kelas</H2>
          <p className="mt-4">Daftar Mata Pelajaran yang ingin ditambahkan</p>
        </div>
      </div>
      <div className="flex flex-col">
        {/* create form */}
        <FormCheckboxContextProvider>
          <FormCheckboxSiswa
            handleSubmit={async (formData, setFormData) => {
              try {
                console.log(formData);
                const res = await postMatpelToKelas(
                  `${ADD_MATPEL_TO_KELAS}${id}`,
                  formData,
                  getCookie("token")
                );
                console.log(res);
                if (res.ok) {
                  router.back();
                }
              } catch (err) {
                console.log(err);
              } finally {
                setFormData([]);
              }
            }}
          >
            <div className="mb-8 flex justify-center items-center">
              <table className="w-full border mb-4 shadow-lg">
                <thead className="bg-blue-800">
                  <tr>
                    <th className="py-2 px-4 text-white text-center">Action</th>
                    <th className="py-2 px-4 text-white">Nama</th>
                  </tr>
                </thead>
                <tbody>
                  {/* checkbox */}
                  {mataPelajaran.map((matpel, index) => (
                    <tr key={matpel.id} className={`${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}>
                      <td className="flex justify-center py-2 px-4">
                        <Checkbox
                          name={matpel.id.toString()}
                          id={matpel.id}
                          idMatpel={matpel.id} // Menambahkan properti "idMatpel" dengan nilai matpel.id
                          username={matpel.namaMataPelajaran}
                        />
                      </td>
                      <td className="py-2 px-4 text-center" style={{ minWidth: '1000px' }}>{matpel.namaMataPelajaran}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* button */}
            <div className="flex justify-end mt-8">
            </div>
          </FormCheckboxSiswa>
        </FormCheckboxContextProvider>
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
      const matpel = await getNotAssignedMatpel(`${NOT_ASSIGNED_MATPEL}`, token);
      return {
        props: {
          role: role,
          matpel: matpel,
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
