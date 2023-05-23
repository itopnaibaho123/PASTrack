import { useRouter } from "next/router";
import React from "react";
import Button from "../Button";
import Input from "../Input";

export default function TableBody({
  data,
  cols,
  komponen,
  profile,
  studentScore,
  detailUser,
}) {
  const router = useRouter();

  if (detailUser) {
    let totalBobotNilai = 0;

    return (
      <tbody>
        {data.map((item, index) => {
          const kalkulasiBobotNilai = (item["bobot"] * item["nilai"]) / 100;
          totalBobotNilai += kalkulasiBobotNilai;

          return (
            <tr key={index}>
              {cols.map((col, colIndex) => (
                <td
                  key={colIndex}
                  className={`py-3 border border-gray/50 px-4 relative z-10 ${colIndex === 0 && "font-bold"
                    }`}
                >
                  {col === "kalkulasiBobotNilai" ? kalkulasiBobotNilai : item[col]}
                </td>
              ))}
            </tr>
          );
        })}
        {detailUser && (
          <tr>
            <td
              className={`font-bold py-3 border border-gray/50 px-4 relative z-10`}
              colSpan={cols.length}
            >
              Total Nilai: {totalBobotNilai}
            </td>
          </tr>
        )}
      </tbody>
    );
  }

  if (studentScore) {
    let totalBobotNilai = 0;

    return (
      <tbody>
        {data.map((item, index) => {
          return (
            Object.entries(item).length > 1 && (
              <tr key={index}>
                <td
                  className={`py-3 border border-gray/50 px-4 relative z-10`}
                >
                  {index + 1}
                </td>
                {cols.map((col, colIndex) => {
                  const nilai =
                    col === "kalkulasiBobotNilai"
                      ? (item["bobot"] * item["nilai"]) / 100
                      : item[col];

                  if (col === "kalkulasiBobotNilai") {
                    totalBobotNilai += nilai;
                  }

                  return (
                    <td
                      key={colIndex}
                      className={`py-3 border border-gray/50 px-4 relative z-10 ${colIndex === 0 && "font-bold"
                        }`}
                    >
                      {nilai}
                    </td>
                  );
                })}
                <td className="py-3 border border-gray/50 px-4 relative z-10">
                  <Button
                    onClick={() => router.push(`${router.asPath}/${item.id}`)}
                  >
                    Edit
                  </Button>
                </td>
              </tr>
            )
          );
        })}
        <tr>
          <td
            className={`font-bold py-3 border border-gray/50 px-4 relative z-10`}
            colSpan={cols.length + 2}
          >
            Total Nilai: {totalBobotNilai}
          </td>
        </tr>
      </tbody>
    );
  }
  else {
    return (
      <tbody>
        {data.map((item, index) => {
          return (
            Object.entries(item).length > 1 && (
              <tr key={index}>
                <td
                  className={`py-3  border border-gray/50 px-4 relative z-10`}
                >
                  {index + 1}
                </td>
                {cols.map((col, index) => (
                  <td
                    key={col}
                    className={`py-3  border border-gray/50 px-4 relative z-10 ${index === 0 && "font-bold"
                      }`}
                  >
                    {item[col]}
                  </td>
                ))}
                <td
                  className={`py-3  border border-gray/50 px-4 relative z-10 ${index === 0 && "font-bold"
                    }`}
                >
                  {profile && (
                    <div className="flex gap-2">
                      <Button
                        onClick={() =>
                          router.push(`/profile/${item["username"]}`)
                        }
                      >
                        Detail
                      </Button>
                      <Button
                        onClick={() =>
                          router.push(
                            `/profile/${item["username"]}/EditProfile`
                          )
                        }
                      >
                        Edit
                      </Button>
                    </div>
                  )}
                  {komponen && (
                    <div className="flex gap-2">
                      <Button
                        onClick={() =>
                          router.push(`${router.asPath}/${item.kode}`)
                        }
                      >
                        Edit
                      </Button>
                    </div>
                  )}
                </td>
              </tr>
            )
          );
        })}
      </tbody>
    );
  }
}

export async function getServerSideProps(context) {
  const authentications = checkRole(context, ["ADMIN", "GURU", "MURID", "ORANGTUA"]);
  if (!authentications.tokenTrue) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  const { role, token, username } = context.req.cookies;

  if (authentications.rolesTrue) {
    if (role === "ADMIN", "GURU", "MURID", "ORANGTUA") {
      return {
        props: {
          role: role,
        }
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
