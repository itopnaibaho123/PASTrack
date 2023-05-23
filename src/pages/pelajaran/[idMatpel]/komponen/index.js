import Button from "@/components/Button";
import Table from "@/components/Table";
import TableBodyKomponen from "@/components/Table/TableBodyKomponen";
import TableHead from "@/components/Table/TableHead";
import { B, H3, P } from "@/components/Typography";
import { useRouter } from "next/router";
import React from "react";
import { KOMPONEN } from "@/components/Hooks/Komponen";
import { getListKomponen } from "@/components/Hooks/Komponen";
import checkRole from "@/components/Helper/CheckRole";
export default function index(props) {
  const router = useRouter();
  const kalkulasi = () => {
    let a = 0;
    props.komponen.map((item, index) => {
      a = a + item["bobot"];
    });

    return a;
  };
  return (
    <div className="flex flex-col place-items-center p-10 gap-4">
      <div>
      </div>
      <div className="flex justify-center gap-3">
        <Button onClick={() => router.back()}>Back</Button>
        <Button
          variant="secondary"
          onClick={() => router.push(`${router.asPath}/addKomponen`)}
        >
          Tambah
        </Button>
      </div>
      <div className="text-center">
        <H3>Komponen Penilaian</H3>
      </div>
      <div className="w-fit bg-background rounded-xl">
        <Table>
          <TableHead cols={["Komponen Penilaian", "Bobot Penilaian"]} />
          <TableBodyKomponen
            cols={["title", "bobot"]}
            komponen={true}
            data={props.komponen}
          />
        </Table>
      </div>
      <div className="flex gap-4">
        <H3>Result</H3>
        <H3>{kalkulasi()}</H3>
      </div>
    </div>
  );
}
export async function getServerSideProps(context) {
  // context.req.query
  const authentications = checkRole(context, ["GURU"]);
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
    if (role === "GURU") {
      const komponen = await getListKomponen(`${KOMPONEN}${context.query.idMatpel}`, token);

      return {
        props: {
          role: role,
          komponen: komponen,
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
