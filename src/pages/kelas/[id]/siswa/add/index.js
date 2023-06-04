import Button from "@/components/Button";
import Checkbox from "@/components/Checkbox";
import FormCheckboxContextProvider from "@/components/context/FormCheckboxContext";
import FormCheckboxSiswa from "@/components/Form/FormCheckboxSiswa";
import { GET_ALL_SISWA, ADD_SISWA_TO_KELAS } from "@/components/Hooks/Murid";
import { getAllSiswa, addSiswaToKelas } from "@/components/Hooks/Murid";
import checkRole from "@/components/Helper/CheckRole";
import { useRouter } from "next/router";
import { getCookie } from "@/components/Helper/cookies";
import Head from "next/head";
import Breadcrumb from "@/components/Breadcrumb";
import { toast } from "react-hot-toast";

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

      <div className="bg-white p-16">
        <Head>
          <title>{`Page Input Siswa`}</title>
        </Head>
        <div className="flex justify-between items-center mb-8">
          <div className="">
            <h1 className="text-2xl font-medium">Tambah Siswa</h1>
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
                    toast.success("Berhasil Menambahkan Siswa")
                    router.back();
                  }else{
                    toast.error("Gagal Menambahkan Murid")
                  }
                } catch (err) {
                  toast.error("Gagal Menambahkan Murid")
                  console.log(err);
                } finally {
                  setFormData({});
                }
              }}
            >
              <div className="mb-4">
                <div className="flex flex-col">
                  {/* checkbox */}
                  {students.map((student) => (
                    <Checkbox
                      name={"username"}
                      value={student.nama}
                      id={student.id}
                      username={student.username}
                    />
                  ))}
                </div>
              </div>
              {/* button */}
              <div className="flex justify-end mt-8"></div>
            </FormCheckboxSiswa>
          </FormCheckboxContextProvider>
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
      const students = await getAllSiswa(`${GET_ALL_SISWA}`, token);
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
