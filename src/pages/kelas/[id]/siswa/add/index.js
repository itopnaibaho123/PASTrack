import Button from "@/components/Button";
import Checkbox from "@/components/Checkbox";
import FormCheckboxContextProvider from "@/components/context/FormCheckboxContext";
import FormCheckboxSiswa from "@/components/Form/FormCheckboxSiswa";
import { GET_ALL_SISWA, NOT_ASSIGNED_MURID, ADD_SISWA_TO_KELAS } from "@/components/Hooks/Murid";
import { getAllSiswa, addSiswaToKelas, getNotAssignedMurid } from "@/components/Hooks/Murid";
import checkRole from "@/components/Helper/CheckRole";
import { useRouter } from "next/router";
import { getCookie } from "@/components/Helper/cookies";
import Head from "next/head";
import Breadcrumb from "@/components/Breadcrumb";
import { toast } from "react-hot-toast";

import { H1, H2 } from "@/components/Typography";

export default function StudentAddPage(props) {
  const router = useRouter();
  const students = props.students;
  const id = router.query.id;

  return (
    <div>
      <div className="h-full flex flex-col">
        <Breadcrumb
          links={[
            { label: "Home", href: "/" },
            { label: "Daftar Kelas", href: "/kelas" },
            { label: `Kelas Id: ${id}`, href: `/kelas/${id}` },
            { label: "Tambah Siswa", href: router.asPath },
          ]}
          active={"Tambah Siswa"}
        />
      </div>
      <Head>
        <title>{`Page Input Siswa`}</title>
      </Head>
      <div className="flex justify-center items-center mb-8 mt-8">
        <div className="text-center">
          <H2 className="text-2xl font-medium">Tambah Siswa ke Kelas</H2>
          <p className="mt-4">Daftar Siswa yang ingin ditambahkan</p>
        </div>
      </div>
      <div className="flex flex-col">
        {/* create form */}
        <FormCheckboxContextProvider>
          <FormCheckboxSiswa
            handleSubmit={async (formData, setFormData) => {
              try {
                console.log(formData);
                const res = await addSiswaToKelas(
                  `${ADD_SISWA_TO_KELAS}${id}`,
                  formData,
                  getCookie("token")
                );
                console.log(res);
                if (res.ok) {
                  toast.success("Murid Berhasil Ditambahkan")
                  router.back();
                }else {
                  toast.error("Murid Gagal Ditambahkan")
                }
              } catch (err) {
                toast.error("Murid Gagal Ditambahkan")
                console.log(err);
              } finally {
                setFormData({});
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
                  {students.map((student, index) => (
                    <tr key={student.id} className={`${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}>
                      <td className="flex justify-center py-2 px-4">
                        <Checkbox
                          name={"username"}
                          id={student.id}
                          username={student.username}
                        />
                      </td>
                      <td className="py-2 px-4 text-center" style={{ minWidth: '1000px' }}>{student.nama}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
      const students = await getNotAssignedMurid(`${NOT_ASSIGNED_MURID}`, token);
      return {
        props: {
          role: role,
          students: students,
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
