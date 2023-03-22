import Button from "@/components/Button";
import Checkbox from "@/components/Checkbox";
import FormCheckboxContextProvider from "@/components/context/FormCheckboxContext";
import FormCheckboxSiswa from "@/components/Form/FormCheckboxSiswa";
import { GET_ALL_SISWA, ADD_SISWA_TO_KELAS } from "@/components/Hooks/Murid";
import { getAllSiswa, addSiswaToKelas } from "@/components/Hooks/Murid";
import checkRole from "@/components/Helper/CheckRole";
import { useRouter } from "next/router";
import { getCookie } from "@/components/Helper/cookies";
export default function StudentAddPage(props) {
  const router = useRouter();
  const students = props.students;
  const id = router.query.id;
  return (
    <div className="bg-white p-16">
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
                  router.back();
                }
              } catch (err) {
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
            <div className="flex justify-end mt-8">
              <Button
                variant="primary"
                onClick={() => router.push("/kelas/CreateKelas")}
              >
                Simpan
              </Button>
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
