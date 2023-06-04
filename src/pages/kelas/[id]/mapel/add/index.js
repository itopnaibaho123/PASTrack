import Button from "@/components/Button";
import { ALL_MATPEL, ADD_MATPEL_TO_KELAS } from "@/components/Hooks/Matpel";
import checkRole from "@/components/Helper/CheckRole";
import {
  getAllMatpelByKelas,
  postMatpelToKelas,
} from "@/components/Hooks/Matpel";
import FormCheckboxContextProvider from "@/components/context/FormCheckboxContext";
import FormCheckboxSiswa from "@/components/Form/FormCheckboxSiswa";
import Checkbox from "@/components/Checkbox";
import { getCookie } from "@/components/Helper/cookies";
import { useRouter } from "next/router";
import Head from "next/head";
import Breadcrumb from "@/components/Breadcrumb";
import { toast } from "react-hot-toast";


export default function SubjectAddPage(props) {
  const mataPelajaran = props.matpel;
  const router = useRouter();
  const id = router.query.id;

  return (
    <div>
      <div className="h-full flex flex-col">
        <Breadcrumb
          links={[
            { label: "Home", href: "/" },
            { label: "Daftar Kelas", href: "/kelas" },
            { label: `Kelas Id: ${id}`, href: `/kelas/${id}`},
            { label: "Tambah Mata Pelajaran", href: router.asPath }
          ]}
          active={"Tambah Mata Pelajaran"}
        />
      </div>

      <div className="bg-white p-16">
        <Head>
          <title>{`Page Input Matpel`}</title>
        </Head>
        <div className="flex justify-between items-center mb-8">
          <div className="">
            <h1 className="text-2xl font-medium">Tambah Mata Pelajaran</h1>
            <p className="mt-4">Daftar Mata Pelajaran yang bisa diambil</p>
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
                    toast.success("Berhasil Menambahkan Mata Pelajaran")
                    router.back();
                  }else{
                    toast.error("Gagal Menambahkan Mata Pelajaran")
                  }
                } catch (err) {
                  toast.error("Gagal Menambahkan Mata Pelajaran")
                } finally {
                  setFormData([]);
                }
              }}
            >
              <div className="mb-4">
                <div className="flex flex-col">
                  {/* checkbox */}
                  {mataPelajaran.map((matpel) => (
                    <Checkbox
                      name={"namaMatpel"}
                      value={matpel.namaMataPelajaran}
                      id={matpel.id}
                      idMatpel={matpel.id} // Menambahkan properti "idMatpel"
                      username={matpel.namaMataPelajaran}
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
      const matpel = await getAllMatpelByKelas(`${ALL_MATPEL}`, token);
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
